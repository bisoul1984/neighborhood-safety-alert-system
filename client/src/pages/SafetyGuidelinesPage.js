import React, { useState } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import { 
  Security, 
  Home, 
  DirectionsWalk, 
  DirectionsCar,
  Warning,
  ExpandMore,
  CheckCircle,
  Info,
  LocalHospital,
  School,
  Work,
  Public
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SafetyGuidelinesPage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState('general');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const safetyGuidelines = [
    {
      id: 'general',
      title: 'General Safety Guidelines',
      icon: <Security color="primary" />,
      description: 'Basic safety principles that apply to all situations',
      guidelines: [
        {
          title: 'Stay Alert and Aware',
          tips: [
            'Always be aware of your surroundings',
            'Trust your instincts - if something feels wrong, it probably is',
            'Keep your phone charged and easily accessible',
            'Share your location with trusted friends or family when traveling alone',
            'Avoid distractions like headphones in unfamiliar areas'
          ]
        },
        {
          title: 'Emergency Preparedness',
          tips: [
            'Have emergency contacts saved in your phone',
            'Know your exact location and address',
            'Keep important documents in a safe place',
            'Have a basic first aid kit available',
            'Know your evacuation routes'
          ]
        },
        {
          title: 'Communication Safety',
          tips: [
            'Share your travel plans with someone you trust',
            'Use location sharing apps when appropriate',
            'Have a code word for emergency situations',
            'Keep emergency numbers easily accessible',
            'Stay in touch during travel or late hours'
          ]
        }
      ]
    },
    {
      id: 'home',
      title: 'Home Security Guidelines',
      icon: <Home color="success" />,
      description: 'Protecting your home and family from potential threats',
      guidelines: [
        {
          title: 'Entry Point Security',
          tips: [
            'Install and maintain working locks on all doors and windows',
            'Use deadbolts on exterior doors',
            'Install security cameras at entry points',
            'Use motion-sensor lights around your property',
            'Keep bushes and trees trimmed away from windows'
          ]
        },
        {
          title: 'Home Safety Systems',
          tips: [
            'Install smoke detectors and carbon monoxide detectors',
            'Consider a home security system',
            'Use smart locks and security apps',
            'Install window sensors and glass break detectors',
            'Have a fire extinguisher in accessible locations'
          ]
        },
        {
          title: 'Neighborhood Awareness',
          tips: [
            'Get to know your neighbors',
            'Join or start a neighborhood watch program',
            'Report suspicious activity to authorities',
            'Keep your property well-lit at night',
            'Don\'t advertise when you\'re away from home'
          ]
        }
      ]
    },
    {
      id: 'walking',
      title: 'Walking Safety Guidelines',
      icon: <DirectionsWalk color="info" />,
      description: 'Staying safe while walking, especially at night or in unfamiliar areas',
      guidelines: [
        {
          title: 'Route Planning',
          tips: [
            'Plan your route in advance',
            'Choose well-lit and populated streets',
            'Avoid shortcuts through isolated areas',
            'Stay on main roads when possible',
            'Know alternative routes in case of detours'
          ]
        },
        {
          title: 'Personal Safety',
          tips: [
            'Walk with confidence and purpose',
            'Keep your head up and phone down',
            'Carry a personal safety device (whistle, pepper spray)',
            'Avoid walking alone at night when possible',
            'Wear reflective clothing in low-light conditions'
          ]
        },
        {
          title: 'Technology Safety',
          tips: [
            'Use location sharing apps with trusted contacts',
            'Keep your phone charged and accessible',
            'Use safety apps that can alert emergency contacts',
            'Don\'t use headphones that block out environmental sounds',
            'Have emergency numbers on speed dial'
          ]
        }
      ]
    },
    {
      id: 'driving',
      title: 'Vehicle Safety Guidelines',
      icon: <DirectionsCar color="warning" />,
      description: 'Protecting yourself and your vehicle while driving',
      guidelines: [
        {
          title: 'Vehicle Security',
          tips: [
            'Always lock your car doors when parked',
            'Keep valuables out of sight',
            'Park in well-lit areas when possible',
            'Have your keys ready before reaching your car',
            'Check your surroundings before entering/exiting'
          ]
        },
        {
          title: 'Road Safety',
          tips: [
            'Follow all traffic laws and speed limits',
            'Maintain a safe following distance',
            'Avoid distracted driving (phone, eating, etc.)',
            'Keep your vehicle well-maintained',
            'Have emergency roadside assistance contact'
          ]
        },
        {
          title: 'Emergency Preparedness',
          tips: [
            'Keep an emergency kit in your vehicle',
            'Have jumper cables and basic tools',
            'Know how to change a tire',
            'Keep important documents in your vehicle',
            'Have a backup phone charger'
          ]
        }
      ]
    },
    {
      id: 'workplace',
      title: 'Workplace Safety Guidelines',
      icon: <Work color="secondary" />,
      description: 'Maintaining safety in work environments',
      guidelines: [
        {
          title: 'Office Safety',
          tips: [
            'Know your workplace emergency procedures',
            'Keep emergency exits clear and accessible',
            'Report safety hazards immediately',
            'Participate in workplace safety training',
            'Know the location of first aid kits and fire extinguishers'
          ]
        },
        {
          title: 'Personal Security',
          tips: [
            'Don\'t share personal information with strangers',
            'Be cautious of suspicious packages or activities',
            'Keep your workspace organized and secure',
            'Lock your computer when stepping away',
            'Report any security concerns to management'
          ]
        }
      ]
    },
    {
      id: 'public',
      title: 'Public Places Safety Guidelines',
      icon: <Public color="error" />,
      description: 'Staying safe in public spaces like malls, parks, and events',
      guidelines: [
        {
          title: 'Crowd Safety',
          tips: [
            'Stay aware of your surroundings in crowds',
            'Keep your belongings close and secure',
            'Know where emergency exits are located',
            'Stay with your group when possible',
            'Have a meeting point if separated'
          ]
        },
        {
          title: 'Event Safety',
          tips: [
            'Arrive early to familiarize yourself with the venue',
            'Know the location of security personnel',
            'Keep your phone charged and accessible',
            'Don\'t accept drinks from strangers',
            'Trust your instincts if something feels wrong'
          ]
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          📋 Safety Guidelines
        </Typography>
        <Button 
          variant="outlined"
          onClick={() => navigate('/safety')}
        >
          Back to Safety Resources
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          🛡️ Comprehensive Safety Guidelines
        </Typography>
        <Typography variant="body2">
          These guidelines provide essential safety information for various situations. Review them regularly and share with family and friends.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {safetyGuidelines.map((category) => (
            <Accordion 
              key={category.id}
              expanded={expanded === category.id}
              onChange={handleAccordionChange(category.id)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {category.icon}
                  <Box>
                    <Typography variant="h6">{category.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {category.guidelines.map((guideline, index) => (
                    <Grid item xs={12} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle color="success" fontSize="small" />
                            {guideline.title}
                          </Typography>
                          <List dense>
                            {guideline.tips.map((tip, tipIndex) => (
                              <ListItem key={tipIndex} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 30 }}>
                                  <Info color="primary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={tip} />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🚨 Emergency Quick Actions
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Call 911 immediately for emergencies"
                    secondary="Life-threatening situations"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocalHospital color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Seek medical attention"
                    secondary="For injuries or health concerns"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Report suspicious activity"
                    secondary="Contact local authorities"
                  />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                📱 Safety Apps & Tools
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Emergency Contacts"
                    secondary="Save important numbers"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Location Sharing"
                    secondary="Share location with trusted contacts"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Safety Alerts"
                    secondary="Enable emergency notifications"
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => navigate('/safety/contacts')}
                  sx={{ mb: 1 }}
                >
                  View Emergency Contacts
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => navigate('/report')}
                >
                  Report Incident
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Resources */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📚 Additional Safety Resources
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Online Resources:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Red Cross Safety Tips" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• FEMA Emergency Preparedness" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Local Police Department Guidelines" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Community Programs:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Neighborhood Watch Programs" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Community Emergency Response Teams" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Local Safety Workshops" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SafetyGuidelinesPage; 