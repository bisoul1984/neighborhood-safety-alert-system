import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Alert,
  Skeleton,
  Pagination
} from '@mui/material';
import {
  Search,
  People,
  Phone,
  Email,
  LocationOn,
  Security,
  CheckCircle,
  Visibility,
  Message
} from '@mui/icons-material';


const AllMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const membersPerPage = 10;
  const { user, token } = useAuth();

  // Fetch real members from API
  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!user || !token) {
      setError('You must be logged in to view members.');
      setLoading(false);
      return;
    }
    const fetchMembers = async () => {
      try {
        let response;
        if (user.role === 'admin') {
          response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/admin/all`);
          setMembers(response.data.users || []);
          setFilteredMembers(response.data.users || []);
        } else {
          response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/community`);
          setMembers(response.data.users || []);
          setFilteredMembers(response.data.users || []);
        }
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error && err.response.data.error.includes('location')) {
          setError('Please set your location in your profile to view community members.');
        } else {
          setError('Failed to load members.');
        }
        setLoading(false);
      }
    };
    fetchMembers();
  }, [user, token]);

  // Filter and search members
  useEffect(() => {
    let filtered = members;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(member => {
        const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
        const searchLower = searchQuery.toLowerCase();
        const matchesName = fullName.includes(searchLower);
        const matchesEmail = member.email.toLowerCase().includes(searchLower);
        const matchesArea = member.area.toLowerCase().includes(searchLower);
        const matchesNeighborhood = member.neighborhood.toLowerCase().includes(searchLower);
        
        return matchesName || matchesEmail || matchesArea || matchesNeighborhood;
      });
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.status === statusFilter);
    }

    console.log('Search query:', searchQuery);
    console.log('Filtered members:', filtered.length);
    console.log('All members:', members.length);

    setFilteredMembers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [members, searchQuery, roleFilter, statusFilter]);

  // Get current page members
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setMemberDialogOpen(true);
  };

  const handleMemberDialogClose = () => {
    setMemberDialogOpen(false);
    setSelectedMember(null);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Coordinator': return 'error';
      case 'Patrol Leader': return 'warning';
      case 'Member': return 'primary';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
  };

  const getStatusIcon = (status) => {
    return status === 'active' ? <CheckCircle /> : null;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <People />
        All Community Members
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Connect with your neighbors and community members. Find contact information and see who's active in your neighborhood.
      </Alert>

      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      )}

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search members by name, email, or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={roleFilter}
                  label="Role"
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="Coordinator">Coordinator</MenuItem>
                  <MenuItem value="Patrol Leader">Patrol Leader</MenuItem>
                  <MenuItem value="Member">Member</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Members ({filteredMembers.length})
            </Typography>
            <Chip 
              label={`${filteredMembers.filter(m => m.status === 'active').length} Active`}
              color="success"
              size="small"
            />
          </Box>

          {loading ? (
            // Loading skeletons
            <List>
              {[...Array(5)].map((_, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Skeleton variant="text" width="60%" />}
                    secondary={<Skeleton variant="text" width="40%" />}
                  />
                  <Skeleton variant="rectangular" width={100} height={32} />
                </ListItem>
              ))}
            </List>
          ) : currentMembers.length > 0 ? (
            <>
              <List>
                {currentMembers.map((member) => (
                  <ListItem 
                    key={member.id} 
                    sx={{ 
                      px: 0, 
                      borderBottom: 1, 
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 0 }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {member.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">
                            {member.firstName} {member.lastName}
                          </Typography>
                          <Chip 
                            label={member.role} 
                            size="small" 
                            color={getRoleColor(member.role)}
                            variant="outlined"
                          />
                          <Chip 
                            label={member.status} 
                            size="small" 
                            color={getStatusColor(member.status)}
                            icon={getStatusIcon(member.status)}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {member.area} • {member.neighborhood}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Joined: {new Date(member.joinedDate).toLocaleDateString()} • 
                            Last active: {new Date(member.lastActive).toLocaleDateString()} • 
                            Incidents reported: {member.incidentsReported}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small" 
                          onClick={() => handleMemberClick(member)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Call">
                        <IconButton 
                          size="small" 
                          onClick={() => window.open(`tel:${member.phone}`)}
                        >
                          <Phone />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Email">
                        <IconButton 
                          size="small" 
                          onClick={() => window.open(`mailto:${member.email}`)}
                        >
                          <Email />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))}
              </List>

              {/* Pagination */}
              {filteredMembers.length > membersPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination
                    count={Math.ceil(filteredMembers.length / membersPerPage)}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No members found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search or filters
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Member Details Dialog */}
      <Dialog 
        open={memberDialogOpen} 
        onClose={handleMemberDialogClose}
        maxWidth="sm"
        fullWidth
      >
        {selectedMember && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  {selectedMember.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Chip 
                      label={selectedMember.role} 
                      size="small" 
                      color={getRoleColor(selectedMember.role)}
                    />
                    <Chip 
                      label={selectedMember.status} 
                      size="small" 
                      color={getStatusColor(selectedMember.status)}
                      icon={getStatusIcon(selectedMember.status)}
                    />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Email color="action" />
                    <Typography variant="body2">
                      {selectedMember.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Phone color="action" />
                    <Typography variant="body2">
                      {selectedMember.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOn color="action" />
                    <Typography variant="body2">
                      {selectedMember.area} • {selectedMember.neighborhood}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Security color="action" />
                    <Typography variant="body2">
                      Incidents reported: {selectedMember.incidentsReported}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Member Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Joined: {new Date(selectedMember.joinedDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last active: {new Date(selectedMember.lastActive).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleMemberDialogClose}>Close</Button>
              <Button 
                variant="contained" 
                startIcon={<Message />}
                onClick={() => window.open(`mailto:${selectedMember.email}`)}
              >
                Send Message
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default AllMembersPage; 