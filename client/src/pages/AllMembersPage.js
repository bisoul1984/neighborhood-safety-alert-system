import React, { useState, useEffect, useMemo } from 'react';
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
  const membersPerPage = 10;

  // Mock community members data - in a real app, this would come from API
  const mockMembers = useMemo(() => [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@email.com',
      phone: '+251 91 123 4567',
      role: 'Coordinator',
      area: 'Bole District',
      status: 'active',
      joinedDate: '2023-01-15',
      lastActive: '2024-02-10',
      incidentsReported: 5,
      neighborhood: 'Bole Community',
      avatar: 'SJ'
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.c@email.com',
      phone: '+251 92 234 5678',
      role: 'Patrol Leader',
      area: 'Kazanchis District',
      status: 'active',
      joinedDate: '2023-02-20',
      lastActive: '2024-02-11',
      incidentsReported: 3,
      neighborhood: 'Kazanchis Community',
      avatar: 'MC'
    },
    {
      id: 3,
      firstName: 'Amina',
      lastName: 'Hassan',
      email: 'amina.h@email.com',
      phone: '+251 93 345 6789',
      role: 'Member',
      area: 'Piazza District',
      status: 'active',
      joinedDate: '2023-03-10',
      lastActive: '2024-02-09',
      incidentsReported: 2,
      neighborhood: 'Piazza Community',
      avatar: 'AH'
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.w@email.com',
      phone: '+251 94 456 7890',
      role: 'Member',
      area: 'Bole District',
      status: 'active',
      joinedDate: '2023-04-05',
      lastActive: '2024-02-12',
      incidentsReported: 1,
      neighborhood: 'Bole Community',
      avatar: 'DW'
    },
    {
      id: 5,
      firstName: 'Fatima',
      lastName: 'Ahmed',
      email: 'fatima.a@email.com',
      phone: '+251 95 567 8901',
      role: 'Member',
      area: 'Kazanchis District',
      status: 'inactive',
      joinedDate: '2023-05-12',
      lastActive: '2024-01-15',
      incidentsReported: 0,
      neighborhood: 'Kazanchis Community',
      avatar: 'FA'
    },
    {
      id: 6,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.s@email.com',
      phone: '+251 96 678 9012',
      role: 'Patrol Leader',
      area: 'Piazza District',
      status: 'active',
      joinedDate: '2023-06-18',
      lastActive: '2024-02-11',
      incidentsReported: 4,
      neighborhood: 'Piazza Community',
      avatar: 'JS'
    },
    {
      id: 7,
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.g@email.com',
      phone: '+251 97 789 0123',
      role: 'Member',
      area: 'Bole District',
      status: 'active',
      joinedDate: '2023-07-22',
      lastActive: '2024-02-10',
      incidentsReported: 2,
      neighborhood: 'Bole Community',
      avatar: 'MG'
    },
    {
      id: 8,
      firstName: 'Ahmed',
      lastName: 'Mohammed',
      email: 'ahmed.m@email.com',
      phone: '+251 98 890 1234',
      role: 'Coordinator',
      area: 'Kazanchis District',
      status: 'active',
      joinedDate: '2023-08-30',
      lastActive: '2024-02-12',
      incidentsReported: 6,
      neighborhood: 'Kazanchis Community',
      avatar: 'AM'
    },
    {
      id: 9,
      firstName: 'Fikerte',
      lastName: 'Tadesse',
      email: 'fikertetadesse1403@gmail.com',
      phone: '+251967044111',
      role: 'Member',
      area: 'Bole District',
      status: 'active',
      joinedDate: '2024-02-12',
      lastActive: '2024-02-12',
      incidentsReported: 0,
      neighborhood: 'Bole Community',
      avatar: 'FT'
    },
    {
      id: 10,
      firstName: 'Sisay',
      lastName: 'Tadesse',
      email: 'sisayt.f@gmail.com',
      phone: '+251912345678',
      role: 'Member',
      area: 'Bole District',
      status: 'active',
      joinedDate: '2024-02-12',
      lastActive: '2024-02-12',
      incidentsReported: 0,
      neighborhood: 'Bole Community',
      avatar: 'ST'
    }
  ], []);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setMembers(mockMembers);
      setFilteredMembers(mockMembers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Debug: Search query: "{searchQuery}" | Found: {filteredMembers.length} members | Total: {members.length} members
          <br />
          Note: This shows mock data. In production, this would fetch real registered users from the database.
        </Alert>
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