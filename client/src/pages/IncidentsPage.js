import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  CardHeader,
  Button,
  Chip,
  Grid,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
  Badge
} from '@mui/material';
import { 
  Warning, 
  Add, 
  FilterList, 
  Search, 
  LocationOn, 
  Schedule, 
  Person,
  Visibility,
  Edit,
  Delete
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const IncidentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [isMyReports, setIsMyReports] = useState(false);

  // Sample incidents data (same as map)
  const sampleIncidents = [
    {
      id: 1,
      title: "Suspicious Activity - Bole Area",
      description: "Suspicious person loitering around Bole International Airport area",
      location: "Bole, Addis Ababa",
      coordinates: [8.9779, 38.7997],
      severity: "Medium",
      status: "Active",
      date: "2024-01-15",
      time: "14:30",
      type: "Suspicious Activity",
      reporter: "Community Member",
      userId: "user123"
    },
    {
      id: 2,
      title: "Vehicle Break-in - Kazanchis",
      description: "Attempted break-in of parked vehicle near Kazanchis commercial area",
      location: "Kazanchis, Addis Ababa",
      coordinates: [9.0272, 38.7369],
      severity: "High",
      status: "Resolved",
      date: "2024-01-14",
      time: "22:15",
      type: "Vehicle Crime",
      reporter: "Local Business Owner",
      userId: "user456"
    },
    {
      id: 3,
      title: "Traffic Incident - Meskel Square",
      description: "Minor traffic accident at Meskel Square intersection",
      location: "Meskel Square, Addis Ababa",
      coordinates: [9.0054, 38.7636],
      severity: "Low",
      status: "Active",
      date: "2024-01-15",
      time: "08:45",
      type: "Traffic Incident",
      reporter: "Traffic Police",
      userId: "user789"
    },
    {
      id: 4,
      title: "Safety Alert - Piazza Area",
      description: "Increased pickpocket activity reported in Piazza area",
      location: "Piazza, Addis Ababa",
      coordinates: [9.0321, 38.7489],
      severity: "Medium",
      status: "Active",
      date: "2024-01-13",
      time: "16:20",
      type: "Theft",
      reporter: "Local Police",
      userId: "user101"
    },
    {
      id: 5,
      title: "Community Watch - Entoto",
      description: "Neighborhood watch meeting scheduled for Entoto area",
      location: "Entoto, Addis Ababa",
      coordinates: [9.0084, 38.7636],
      severity: "Info",
      status: "Scheduled",
      date: "2024-01-20",
      time: "19:00",
      type: "Community Event",
      reporter: "Community Leader",
      userId: "user202"
    },
    // Add some user's own reports
    {
      id: 6,
      title: "My Report - Suspicious Vehicle",
      description: "Suspicious vehicle parked outside my house for several hours",
      location: "Bole, Addis Ababa",
      coordinates: [8.9779, 38.7997],
      severity: "Medium",
      status: "Active",
      date: "2024-01-16",
      time: "10:30",
      type: "Suspicious Activity",
      reporter: "You",
      userId: "currentUser"
    },
    {
      id: 7,
      title: "My Report - Broken Street Light",
      description: "Street light broken on main road, creating safety hazard",
      location: "Kazanchis, Addis Ababa",
      coordinates: [9.0272, 38.7369],
      severity: "Low",
      status: "Pending",
      date: "2024-01-17",
      time: "18:45",
      type: "Infrastructure",
      reporter: "You",
      userId: "currentUser"
    }
  ];

  // Check URL parameters for filtering
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filterParam = searchParams.get('filter');
    
    if (filterParam === 'my-reports') {
      setIsMyReports(true);
    } else {
      setIsMyReports(false);
    }
  }, [location.search]);

  useEffect(() => {
    setIncidents(sampleIncidents);
    setFilteredIncidents(sampleIncidents);
  }, []);

  useEffect(() => {
    let filtered = incidents;

    // My Reports filter (highest priority)
    if (isMyReports) {
      filtered = filtered.filter(incident => incident.userId === 'currentUser');
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(incident =>
        incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(incident => incident.status === statusFilter);
    }

    // Severity filter
    if (severityFilter !== 'all') {
      filtered = filtered.filter(incident => incident.severity === severityFilter);
    }

    setFilteredIncidents(filtered);
  }, [incidents, searchQuery, statusFilter, severityFilter, isMyReports]);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'error';
      case 'resolved': return 'success';
      case 'pending': return 'warning';
      case 'scheduled': return 'info';
      default: return 'default';
    }
  };

  const handleViewDetails = (incidentId) => {
    navigate(`/incidents/${incidentId}`);
  };

  const handleEdit = (incidentId) => {
    // Navigate to edit page or open edit modal
    console.log('Edit incident:', incidentId);
  };

  const handleDelete = (incidentId) => {
    // Handle delete with confirmation
    console.log('Delete incident:', incidentId);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMyReports ? '📋 My Reports' : '🚨 All Incidents'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isMyReports && (
            <Button 
              variant="outlined"
              onClick={() => navigate('/incidents')}
            >
              View All Incidents
            </Button>
          )}
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => navigate('/report')}
          >
            Report Incident
          </Button>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        {isMyReports 
          ? "View and manage your reported incidents. Track their status and updates."
          : "View and track safety incidents in Addis Ababa. Report new incidents to help keep your community safe."
        }
      </Alert>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
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
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Severity</InputLabel>
                <Select
                  value={severityFilter}
                  label="Severity"
                  onChange={(e) => setSeverityFilter(e.target.value)}
                >
                  <MenuItem value="all">All Severity</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Info">Info</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" color="text.secondary">
                {filteredIncidents.length} incidents found
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <Grid container spacing={3}>
        {filteredIncidents.length > 0 ? (
          filteredIncidents.map((incident) => (
            <Grid item xs={12} key={incident.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {incident.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {incident.description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                      <Chip
                        label={incident.severity}
                        color={getSeverityColor(incident.severity)}
                        size="small"
                      />
                      <Chip
                        label={incident.status}
                        color={getStatusColor(incident.status)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">{incident.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2">
                        {new Date(incident.date).toLocaleDateString()} at {incident.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Person fontSize="small" color="action" />
                      <Typography variant="body2">{incident.reporter}</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip label={incident.type} size="small" variant="outlined" />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => handleViewDetails(incident.id)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => handleEdit(incident.id)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => handleDelete(incident.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="body1" color="text.secondary" align="center">
                  No incidents found matching your criteria. Try adjusting your filters or search terms.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default IncidentsPage; 