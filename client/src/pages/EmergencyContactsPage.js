import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Alert,
  Divider,
  Chip
} from '@mui/material';
import { 
  Phone, 
  LocalPolice, 
  LocalFireDepartment, 
  LocalHospital,
  Warning,
  LocationOn,
  AccessTime,
  Language
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EmergencyContactsPage = () => {
  const navigate = useNavigate();

  const emergencyContacts = [
    {
      category: "Police Services",
      icon: <LocalPolice color="primary" />,
      contacts: [
        {
          name: "Emergency Police",
          number: "911",
          description: "General emergency number",
          available: "24/7",
          priority: "high"
        },
        {
          name: "Addis Ababa Police Commission",
          number: "+251 11 551 0000",
          description: "Main police headquarters",
          available: "24/7",
          priority: "high"
        },
        {
          name: "Traffic Police",
          number: "+251 11 551 0001",
          description: "Traffic incidents and violations",
          available: "24/7",
          priority: "medium"
        },
        {
          name: "Crime Prevention",
          number: "+251 11 551 0002",
          description: "Non-emergency crime reporting",
          available: "8:00 AM - 6:00 PM",
          priority: "medium"
        }
      ]
    },
    {
      category: "Fire & Rescue",
      icon: <LocalFireDepartment color="error" />,
      contacts: [
        {
          name: "Emergency Fire",
          number: "911",
          description: "Fire emergencies",
          available: "24/7",
          priority: "high"
        },
        {
          name: "Addis Ababa Fire Brigade",
          number: "+251 11 551 0003",
          description: "Fire department headquarters",
          available: "24/7",
          priority: "high"
        },
        {
          name: "Rescue Services",
          number: "+251 11 551 0004",
          description: "Search and rescue operations",
          available: "24/7",
          priority: "high"
        }
      ]
    },
    {
      category: "Medical Emergency",
      icon: <LocalHospital color="success" />,
      contacts: [
        {
          name: "Emergency Medical",
          number: "911",
          description: "Medical emergencies",
          available: "24/7",
          priority: "high"
        },
        {
          name: "Red Cross Ethiopia",
          number: "+251 11 551 0005",
          description: "Emergency medical services",
          available: "24/7",
          priority: "high"
        },
        {
          name: "Tikur Anbessa Hospital",
          number: "+251 11 551 0006",
          description: "Major trauma center",
          available: "24/7",
          priority: "high"
        },
        {
          name: "St. Paul's Hospital",
          number: "+251 11 551 0007",
          description: "Emergency care",
          available: "24/7",
          priority: "high"
        }
      ]
    },
    {
      category: "Other Emergency Services",
      icon: <Warning color="warning" />,
      contacts: [
        {
          name: "Poison Control",
          number: "+251 11 551 0008",
          description: "Poison information and treatment",
          available: "24/7",
          priority: "high"
        },
        {
          name: "Mental Health Crisis",
          number: "+251 11 551 0009",
          description: "Suicide prevention and crisis support",
          available: "24/7",
          priority: "high"
        },
        {
          name: "Child Protection",
          number: "+251 11 551 0010",
          description: "Child abuse and protection services",
          available: "8:00 AM - 6:00 PM",
          priority: "medium"
        },
        {
          name: "Domestic Violence Hotline",
          number: "+251 11 551 0011",
          description: "Domestic violence support",
          available: "24/7",
          priority: "high"
        }
      ]
    }
  ];

  const handleCall = (number) => {
    window.open(`tel:${number}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          🚨 Emergency Contacts
        </Typography>
        <Button 
          variant="outlined"
          onClick={() => navigate('/safety')}
        >
          Back to Safety Resources
        </Button>
      </Box>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          🚨 In case of emergency, dial 911 immediately!
        </Typography>
        <Typography variant="body2">
          This page contains important emergency contact numbers for Addis Ababa. Save these numbers in your phone for quick access.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {emergencyContacts.map((category) => (
          <Grid item xs={12} md={6} key={category.category}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {category.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {category.category}
                  </Typography>
                </Box>
                
                <List>
                  {category.contacts.map((contact, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <Phone color="action" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {contact.name}
                                  </Typography>
                                  <Chip 
                                    label={contact.priority.toUpperCase()} 
                                    color={getPriorityColor(contact.priority)}
                                    size="small"
                                  />
                                </Box>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {contact.description}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                    <AccessTime fontSize="small" color="action" />
                                    <Typography variant="caption" color="text.secondary">
                                      {contact.available}
                                    </Typography>
                                  </Box>
                                </Box>
                              }
                            />
                          </Box>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<Phone />}
                            onClick={() => handleCall(contact.number)}
                            sx={{ minWidth: 'auto' }}
                          >
                            {contact.number}
                          </Button>
                        </Box>
                      </ListItem>
                      {index < category.contacts.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Additional Information */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📋 Important Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                When to Call Emergency Services:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Life-threatening medical emergencies" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Active fires or fire hazards" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Crimes in progress or immediate danger" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Serious traffic accidents with injuries" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Emergency Preparedness Tips:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Save emergency numbers in your phone" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Know your exact location and address" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Stay calm and speak clearly when calling" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Follow emergency operator instructions" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmergencyContactsPage; 