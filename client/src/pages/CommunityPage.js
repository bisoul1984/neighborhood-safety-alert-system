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
  Close,
  Forum,
  Comment,
  ThumbUp,
  Share,
  MoreVert,
  Send
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
  const [suggestEventDialogOpen, setSuggestEventDialogOpen] = useState(false);
  const [suggestEventForm, setSuggestEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: '',
    organizerName: '',
    organizerEmail: '',
    organizerPhone: ''
  });
  const [showEventSuccess, setShowEventSuccess] = useState(false);
  const [forumDialogOpen, setForumDialogOpen] = useState(false);
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [showPostSuccess, setShowPostSuccess] = useState(false);

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

  const forumPosts = [
    {
      id: 1,
      title: 'Suspicious Activity on Main Street',
      content: 'I noticed some suspicious activity near the corner store on Main Street yesterday evening. Has anyone else seen anything unusual in that area?',
      author: 'Sarah Johnson',
      authorAvatar: 'S',
      category: 'Safety Alert',
      timestamp: '2024-02-10T14:30:00',
      likes: 12,
      comments: 8,
      isLiked: false
    },
    {
      id: 2,
      title: 'Neighborhood Watch Success Story',
      content: 'Thanks to our neighborhood watch program, we were able to prevent a potential break-in last week. The quick response from our community members made all the difference!',
      author: 'Michael Chen',
      authorAvatar: 'M',
      category: 'Success Story',
      timestamp: '2024-02-08T10:15:00',
      likes: 25,
      comments: 15,
      isLiked: true
    },
    {
      id: 3,
      title: 'Community Garden Project Proposal',
      content: 'I\'m proposing we start a community garden in the vacant lot on Oak Street. This could help bring neighbors together and improve the area. What do you think?',
      author: 'Amina Hassan',
      authorAvatar: 'A',
      category: 'Community Project',
      timestamp: '2024-02-05T16:45:00',
      likes: 18,
      comments: 12,
      isLiked: false
    },
    {
      id: 4,
      title: 'Street Light Outage Report',
      content: 'The street light on Pine Street has been out for 3 days now. I\'ve reported it to the city, but thought I should let everyone know to be extra careful when walking in that area at night.',
      author: 'David Wilson',
      authorAvatar: 'D',
      category: 'Infrastructure',
      timestamp: '2024-02-03T19:20:00',
      likes: 9,
      comments: 6,
      isLiked: false
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

  const handleSuggestEventClick = () => {
    setSuggestEventDialogOpen(true);
  };

  const handleSuggestEventClose = () => {
    setSuggestEventDialogOpen(false);
    setSuggestEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: '',
      organizerName: '',
      organizerEmail: '',
      organizerPhone: ''
    });
  };

  const handleSuggestEventSubmit = () => {
    // Simulate API call
    console.log('Suggesting event:', suggestEventForm);
    
    // Show success message
    setShowEventSuccess(true);
    setSuggestEventDialogOpen(false);
    
    // Reset form
    setSuggestEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: '',
      organizerName: '',
      organizerEmail: '',
      organizerPhone: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowEventSuccess(false);
    }, 5000);
  };

  const handleEventInputChange = (field, value) => {
    setSuggestEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleForumClick = () => {
    setForumDialogOpen(true);
  };

  const handleForumClose = () => {
    setForumDialogOpen(false);
    setNewPostForm({
      title: '',
      content: '',
      category: ''
    });
  };

  const handleNewPostSubmit = () => {
    // Simulate API call
    console.log('Creating new forum post:', newPostForm);
    
    // Show success message
    setShowPostSuccess(true);
    setForumDialogOpen(false);
    
    // Reset form
    setNewPostForm({
      title: '',
      content: '',
      category: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowPostSuccess(false);
    }, 5000);
  };

  const handlePostInputChange = (field, value) => {
    setNewPostForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLikePost = (postId) => {
    // Simulate like functionality
    console.log('Liked post:', postId);
  };

  const handleCommentPost = (postId) => {
    // Simulate comment functionality
    console.log('Comment on post:', postId);
  };

  const handleSharePost = (postId) => {
    // Simulate share functionality
    console.log('Share post:', postId);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Safety Alert': return 'error';
      case 'Success Story': return 'success';
      case 'Community Project': return 'primary';
      case 'Infrastructure': return 'warning';
      default: return 'default';
    }
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

      {showEventSuccess && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setShowEventSuccess(false)}>
          🎉 Event suggestion submitted successfully! We'll review your suggestion and get back to you soon.
        </Alert>
      )}

      {showPostSuccess && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setShowPostSuccess(false)}>
          🎉 Forum post created successfully! Your post is now visible to the community.
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
                onClick={handleSuggestEventClick}
              >
                Suggest Event
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Community Forum Section */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Forum color="primary" />
                  Community Forum
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={handleForumClick}
                  startIcon={<Add />}
                >
                  New Post
                </Button>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Connect with your neighbors, share updates, and discuss community matters. Stay informed about what's happening in your neighborhood.
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Forum Posts */}
              <Box>
                {forumPosts.map((post) => (
                  <Card key={post.id} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {post.authorAvatar}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {post.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              by {post.author} • {new Date(post.timestamp).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={post.category} 
                            size="small" 
                            color={getCategoryColor(post.category)}
                            variant="outlined"
                          />
                          <IconButton size="small">
                            <MoreVert />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {post.content}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                          size="small"
                          startIcon={<ThumbUp />}
                          onClick={() => handleLikePost(post.id)}
                          color={post.isLiked ? "primary" : "inherit"}
                          variant={post.isLiked ? "contained" : "text"}
                        >
                          {post.likes}
                        </Button>
                        <Button
                          size="small"
                          startIcon={<Comment />}
                          onClick={() => handleCommentPost(post.id)}
                        >
                          {post.comments}
                        </Button>
                        <Button
                          size="small"
                          startIcon={<Share />}
                          onClick={() => handleSharePost(post.id)}
                        >
                          Share
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
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

      {/* Suggest Event Dialog */}
      <Dialog open={suggestEventDialogOpen} onClose={handleSuggestEventClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Event color="primary" />
            Suggest Community Event
          </Typography>
          <IconButton onClick={handleSuggestEventClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Suggest a community event to help bring neighbors together and improve neighborhood safety. We'll review your suggestion and get back to you.
            </Typography>
          </Alert>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                value={suggestEventForm.title}
                onChange={(e) => handleEventInputChange('title', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Description"
                multiline
                rows={3}
                value={suggestEventForm.description}
                onChange={(e) => handleEventInputChange('description', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={suggestEventForm.date}
                onChange={(e) => handleEventInputChange('date', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={suggestEventForm.time}
                onChange={(e) => handleEventInputChange('time', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={suggestEventForm.location}
                onChange={(e) => handleEventInputChange('location', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={suggestEventForm.type}
                  label="Event Type"
                  onChange={(e) => handleEventInputChange('type', e.target.value)}
                  required
                >
                  <MenuItem value="meeting">Community Meeting</MenuItem>
                  <MenuItem value="training">Training Session</MenuItem>
                  <MenuItem value="volunteer">Volunteer Event</MenuItem>
                  <MenuItem value="social">Social Gathering</MenuItem>
                  <MenuItem value="safety">Safety Workshop</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Organizer Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Organizer Name"
                value={suggestEventForm.organizerName}
                onChange={(e) => handleEventInputChange('organizerName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Organizer Email"
                type="email"
                value={suggestEventForm.organizerEmail}
                onChange={(e) => handleEventInputChange('organizerEmail', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organizer Phone"
                value={suggestEventForm.organizerPhone}
                onChange={(e) => handleEventInputChange('organizerPhone', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleSuggestEventClose}>Cancel</Button>
          <Button 
            onClick={handleSuggestEventSubmit} 
            variant="contained"
            disabled={!suggestEventForm.title || !suggestEventForm.description || !suggestEventForm.date || !suggestEventForm.location || !suggestEventForm.type || !suggestEventForm.organizerName || !suggestEventForm.organizerEmail}
          >
            Submit Event Suggestion
          </Button>
        </DialogActions>
      </Dialog>

      {/* Community Forum Dialog */}
      <Dialog open={forumDialogOpen} onClose={handleForumClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Forum color="primary" />
            Create New Forum Post
          </Typography>
          <IconButton onClick={handleForumClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Share updates, ask questions, or start discussions with your neighbors. Keep the community informed about what's happening in your area.
            </Typography>
          </Alert>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Post Title"
                value={newPostForm.title}
                onChange={(e) => handlePostInputChange('title', e.target.value)}
                required
                placeholder="What would you like to discuss?"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newPostForm.category}
                  label="Category"
                  onChange={(e) => handlePostInputChange('category', e.target.value)}
                  required
                >
                  <MenuItem value="Safety Alert">Safety Alert</MenuItem>
                  <MenuItem value="Success Story">Success Story</MenuItem>
                  <MenuItem value="Community Project">Community Project</MenuItem>
                  <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                  <MenuItem value="General Discussion">General Discussion</MenuItem>
                  <MenuItem value="Question">Question</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Post Content"
                multiline
                rows={6}
                value={newPostForm.content}
                onChange={(e) => handlePostInputChange('content', e.target.value)}
                required
                placeholder="Share your thoughts, updates, or questions with the community..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleForumClose}>Cancel</Button>
          <Button 
            onClick={handleNewPostSubmit} 
            variant="contained"
            startIcon={<Send />}
            disabled={!newPostForm.title || !newPostForm.content || !newPostForm.category}
          >
            Create Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CommunityPage; 