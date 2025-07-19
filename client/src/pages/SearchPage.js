import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import {
  Search,
  LocationOn,
  Security,
  Event,
  Clear,
  Visibility,
  Edit
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    incidents: [],
    locations: [],
    community: [],
    safety: []
  });

  // Mock search results for demonstration
  const mockSearchResults = {
    incidents: [
      {
        id: 1,
        title: 'Suspicious Activity Reported',
        description: 'Suspicious person loitering around the park area',
        location: 'Central Park',
        date: '2024-01-15',
        status: 'Active',
        severity: 'Medium',
        reporter: 'John Doe'
      },
      {
        id: 2,
        title: 'Vehicle Break-in Attempt',
        description: 'Attempted break-in of parked vehicle on Main Street',
        location: 'Main Street',
        date: '2024-01-14',
        status: 'Resolved',
        severity: 'High',
        reporter: 'Jane Smith'
      }
    ],
    locations: [
      {
        id: 1,
        name: 'Central Park',
        type: 'Public Space',
        safetyRating: 8.5,
        recentIncidents: 2,
        description: 'Popular community park with good lighting'
      },
      {
        id: 2,
        name: 'Main Street Shopping Center',
        type: 'Commercial',
        safetyRating: 7.2,
        recentIncidents: 1,
        description: 'Busy shopping area with security cameras'
      }
    ],
    community: [
      {
        id: 1,
        title: 'Neighborhood Watch Meeting',
        description: 'Monthly meeting to discuss community safety',
        date: '2024-01-20',
        participants: 15,
        organizer: 'Community Safety Committee'
      },
      {
        id: 2,
        title: 'Safety Awareness Campaign',
        description: 'Campaign to raise awareness about home security',
        date: '2024-01-25',
        participants: 8,
        organizer: 'Local Police Department'
      }
    ],
    safety: [
      {
        id: 1,
        title: 'Home Security Tips',
        description: 'Essential tips for securing your home',
        category: 'Home Security',
        rating: 4.8
      },
      {
        id: 2,
        title: 'Emergency Contact Numbers',
        description: 'Important emergency contact information',
        category: 'Emergency',
        rating: 4.9
      }
    ]
  };

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [performSearch]);

  const performSearch = useCallback(async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter mock results based on search query
    const filteredResults = {
      incidents: mockSearchResults.incidents.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      locations: mockSearchResults.locations.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      community: mockSearchResults.community.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      safety: mockSearchResults.safety.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
    
    setSearchResults(filteredResults);
    setLoading(false);
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      performSearch();
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'error';
      case 'resolved': return 'success';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const tabLabels = [
    { label: 'Incidents', count: searchResults.incidents.length },
    { label: 'Locations', count: searchResults.locations.length },
    { label: 'Community', count: searchResults.community.length },
    { label: 'Safety Resources', count: searchResults.safety.length }
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        🔍 Search Results
      </Typography>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search incidents, locations, community events, safety resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchQuery && (
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchParams({});
                      }}
                    >
                      <Clear />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Paper>

      {searchQuery && (
        <>
          {/* Search Filters and Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
              {tabLabels.map((tab, index) => (
                <Tab
                  key={index}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {tab.label}
                      <Chip
                        label={tab.count}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Search Results */}
          {!loading && (
            <Box>
              {/* Incidents Tab */}
              {activeTab === 0 && (
                <Grid container spacing={3}>
                  {searchResults.incidents.length > 0 ? (
                    searchResults.incidents.map((incident) => (
                      <Grid item xs={12} md={6} key={incident.id}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Typography variant="h6" component="h3">
                                {incident.title}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Chip
                                  label={incident.severity}
                                  color={getSeverityColor(incident.severity)}
                                  size="small"
                                />
                                <Chip
                                  label={incident.status}
                                  color={getStatusColor(incident.status)}
                                  size="small"
                                />
                              </Box>
                            </Box>
                            <Typography color="text.secondary" paragraph>
                              {incident.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocationOn fontSize="small" color="action" />
                                <Typography variant="body2">{incident.location}</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(incident.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              Reported by: {incident.reporter}
                            </Typography>
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                              <Button size="small" startIcon={<Visibility />}>
                                View Details
                              </Button>
                              <Button size="small" startIcon={<Edit />}>
                                Update
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Alert severity="info">No incidents found matching your search.</Alert>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Locations Tab */}
              {activeTab === 1 && (
                <Grid container spacing={3}>
                  {searchResults.locations.length > 0 ? (
                    searchResults.locations.map((location) => (
                      <Grid item xs={12} md={6} key={location.id}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Typography variant="h6" component="h3">
                                {location.name}
                              </Typography>
                              <Chip
                                label={`${location.safetyRating}/10`}
                                color="primary"
                                size="small"
                              />
                            </Box>
                            <Typography color="text.secondary" paragraph>
                              {location.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Chip label={location.type} size="small" variant="outlined" />
                              <Typography variant="body2" color="text.secondary">
                                {location.recentIncidents} recent incidents
                              </Typography>
                            </Box>
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                              <Button size="small" startIcon={<Visibility />}>
                                View Details
                              </Button>
                              <Button size="small" startIcon={<LocationOn />}>
                                View on Map
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Alert severity="info">No locations found matching your search.</Alert>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Community Tab */}
              {activeTab === 2 && (
                <Grid container spacing={3}>
                  {searchResults.community.length > 0 ? (
                    searchResults.community.map((event) => (
                      <Grid item xs={12} md={6} key={event.id}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Typography variant="h6" component="h3" gutterBottom>
                              {event.title}
                            </Typography>
                            <Typography color="text.secondary" paragraph>
                              {event.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(event.date).toLocaleDateString()}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {event.participants} participants
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              Organized by: {event.organizer}
                            </Typography>
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                              <Button size="small" startIcon={<Event />}>
                                Join Event
                              </Button>
                              <Button size="small" startIcon={<Visibility />}>
                                View Details
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Alert severity="info">No community events found matching your search.</Alert>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Safety Resources Tab */}
              {activeTab === 3 && (
                <Grid container spacing={3}>
                  {searchResults.safety.length > 0 ? (
                    searchResults.safety.map((resource) => (
                      <Grid item xs={12} md={6} key={resource.id}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Typography variant="h6" component="h3">
                                {resource.title}
                              </Typography>
                              <Chip
                                label={`${resource.rating}/5`}
                                color="primary"
                                size="small"
                              />
                            </Box>
                            <Typography color="text.secondary" paragraph>
                              {resource.description}
                            </Typography>
                            <Chip label={resource.category} size="small" variant="outlined" />
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                              <Button size="small" startIcon={<Visibility />}>
                                View Resource
                              </Button>
                              <Button size="small" startIcon={<Security />}>
                                Safety Tips
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Alert severity="info">No safety resources found matching your search.</Alert>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          )}
        </>
      )}

      {/* No Search Query State */}
      {!searchQuery && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Search sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Search for incidents, locations, community events, and safety resources
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your search query above to get started
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchPage; 