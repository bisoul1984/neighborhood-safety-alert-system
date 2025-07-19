import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Alert,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  People,
  Security,
  Event,
  LocationOn,
  Phone,
  Email,
  CheckCircle,
  Add,
  Close
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CommunityPage = () => {
  const navigate = useNavigate();
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    availability: '',
    interests: []
  });
  const [isJoined, setIsJoined] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample community data
  const neighborhoodWatchMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Coordinator',
      area: 'Bole District',
      phone: '+251 91 123 4567',
      email: 'sarah.j@email.com',
      status: 'active',
      joinedDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Patrol Leader',
      area: 'Kazanchis District',
      phone: '+251 92 234 5678',
      email: 'michael.c@email.com',
      status: 'active',
      joinedDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Amina Hassan',
      role: 'Member',
      area: 'Piazza District',
      phone: '+251 93 345 6789',
      email: 'amina.h@email.com',
      status: 'active',
      joinedDate: '2023-03-10'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Safety Meeting',
      date: '2024-02-15',
      time: '19:00',
      location: 'Bole Community Center',
      description: 'Monthly meeting to discuss neighborhood safety concerns and updates.',
      attendees: 25,
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Neighborhood Watch Training',
      date: '2024-02-22',
      time: '14:00',
      location: 'Kazanchis Police Station',
      description: 'Training session for new neighborhood watch members.',
      attendees: 15,
      type: 'training'
    },
    {
      id: 3,
      title: 'Community Clean-up Day',
      date: '2024-03-01',
      time: '09:00',
      location: 'Piazza Area',
      description: 'Volunteer event to clean up the neighborhood and improve safety.',
      attendees: 40,
      type: 'volunteer'
    }
  ];

  const handleJoinClick = () => {
    setJoinDialogOpen(true);
  };

  const handleJoinClose = () => {
    setJoinDialogOpen(false);
    setJoinForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      availability: '',
      interests: []
    });
  };

  const handleJoinSubmit = () => {
    // Simulate API call
    console.log('Joining neighborhood watch:', joinForm);
    
    // Show success message
    setShowSuccess(true);
    setIsJoined(true);
    setJoinDialogOpen(false);
    
    // Reset form
    setJoinForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      availability: '',
      interests: []
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleInputChange = (field, value) => {
    setJoinForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'meeting': return <People color="primary" />;
      case 'training': return <Security color="success" />;
      case 'volunteer': return <Event color="warning" />;
      default: return <Event color="action" />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'meeting': return 'primary';
      case 'training': return 'success';
      case 'volunteer': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        👥 Community
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setShowSuccess(false)}>
          🎉 Successfully joined the Neighborhood Watch! Welcome to the community. You'll receive updates about meetings and events.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Neighborhood Watch Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security color="primary" />
                  Neighborhood Watch
                </Typography>
                <Chip 
                  label={isJoined ? "Member" : "Join Now"} 
                  color={isJoined ? "success" : "primary"}
                  icon={isJoined ? <CheckCircle /> : <Add />}
                  onClick={!isJoined ? handleJoinClick : undefined}
                  clickable={!isJoined}
                  sx={{ cursor: !isJoined ? 'pointer' : 'default' }}
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Connect with your neighbors and stay informed about community safety. Join our neighborhood watch program to help keep our community safe.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button 
                  variant="contained" 
                  onClick={handleJoinClick}
                  disabled={isJoined}
                  startIcon={<People />}
                >
                  {isJoined ? 'Already Joined' : 'Join Neighborhood Watch'}
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/safety')}
                >
                  Safety Resources
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Current Members ({neighborhoodWatchMembers.length})
              </Typography>
              
              <List>
                {neighborhoodWatchMembers.map((member) => (
                  <ListItem key={member.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {member.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">
                            {member.name}
                          </Typography>
                          <Chip 
                            label={member.role} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {member.area} • {member.phone}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Joined: {new Date(member.joinedDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Call">
                        <IconButton size="small" onClick={() => window.open(`tel:${member.phone}`)}>
                          <Phone />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Email">
                        <IconButton size="small" onClick={() => window.open(`mailto:${member.email}`)}>
                          <Email />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Community Events Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Event color="primary" />
                Upcoming Events
              </Typography>
              
              {upcomingEvents.length > 0 ? (
                <List>
                  {upcomingEvents.map((event) => (
                    <ListItem key={event.id} sx={{ px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        {getEventIcon(event.type)}
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {event.title}
                        </Typography>
                        <Chip 
                          label={event.type} 
                          size="small" 
                          color={getEventColor(event.type)}
                          variant="outlined"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {event.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Event fontSize="small" color="action" />
                          <Typography variant="caption">
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOn fontSize="small" color="action" />
                          <Typography variant="caption">
                            {event.location}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                        <People fontSize="small" color="action" />
                        <Typography variant="caption">
                          {event.attendees} attending
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No upcoming events scheduled.
                </Typography>
              )}
              
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 2 }}
                startIcon={<Add />}
              >
                Suggest Event
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Join Neighborhood Watch Dialog */}
      <Dialog open={joinDialogOpen} onClose={handleJoinClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Security color="primary" />
            Join Neighborhood Watch
          </Typography>
          <IconButton onClick={handleJoinClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Join our neighborhood watch program to help keep our community safe. You'll receive updates about meetings, training sessions, and community events.
            </Typography>
          </Alert>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={joinForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={joinForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={joinForm.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={joinForm.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  value={joinForm.availability}
                  label="Availability"
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                >
                  <MenuItem value="weekdays">Weekdays</MenuItem>
                  <MenuItem value="weekends">Weekends</MenuItem>
                  <MenuItem value="evenings">Evenings</MenuItem>
                  <MenuItem value="flexible">Flexible</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleJoinClose}>Cancel</Button>
          <Button 
            onClick={handleJoinSubmit} 
            variant="contained"
            disabled={!joinForm.name || !joinForm.email || !joinForm.phone}
          >
            Join Program
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CommunityPage; 