import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Avatar
} from '@mui/material';
import {
  Security,
  Notifications,
  Map,
  People,
  Speed,
  VerifiedUser,
  ArrowForward,
  Shield,
  LocationOn,
  Warning,
  Menu as MenuIcon,
  AccountCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Real-Time Alerts',
      description: 'Get instant notifications about safety incidents in your neighborhood',
      color: '#1976d2'
    },
    {
      icon: <Map sx={{ fontSize: 40 }} />,
      title: 'Interactive Map',
      description: 'View incidents on a live map with detailed location information',
      color: '#2e7d32'
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Community Reports',
      description: 'Anonymous reporting system for community members',
      color: '#ed6c02'
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40 }} />,
      title: 'Verified Information',
      description: 'Integration with police and emergency services for verified alerts',
      color: '#9c27b0'
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Fast Response',
      description: 'Quick incident reporting and emergency response coordination',
      color: '#d32f2f'
    },
    {
      icon: <Notifications sx={{ fontSize: 40 }} />,
      title: 'Smart Notifications',
      description: 'Customizable alerts based on location and incident type',
      color: '#1565c0'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10,000+', icon: <People /> },
    { label: 'Incidents Reported', value: '50,000+', icon: <Security /> },
    { label: 'Cities Covered', value: '100+', icon: <LocationOn /> },
    { label: 'Response Time', value: '< 2 min', icon: <Speed /> }
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
          boxShadow: 3
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            🛡️ Neighborhood Safety Alert System
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{ 
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          pt: { xs: 12, md: 16 }, // Add top padding to account for fixed navbar
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Stay Safe, Stay Informed
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6
                }}
              >
                Join thousands of community members who trust our real-time safety alert system to keep their neighborhoods secure.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: 'grey.100'
                    }
                  }}
                >
                  Get Started
                  <ArrowForward sx={{ ml: 1 }} />
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Box
                  sx={{
                    width: { xs: 300, md: 400 },
                    height: { xs: 300, md: 400 },
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Warning sx={{ fontSize: 120, opacity: 0.8 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 1
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Why Choose Our Platform?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Comprehensive safety features designed to keep your community informed and protected
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ color: feature.color, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Ready to Make Your Neighborhood Safer?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of community members who are already using our platform to stay informed and stay safe.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Start Protecting Your Community
              <ArrowForward sx={{ ml: 2 }} />
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Neighborhood Safety Alert System
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Empowering communities with real-time safety information and emergency alerts.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button color="inherit" onClick={() => navigate('/register')}>
                  Register
                </Button>
                <Button color="inherit" onClick={() => navigate('/safety')}>
                  Safety Tips
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Emergency: 911
                <br />
                Support: support@safetyalert.com
                <br />
                Phone: (555) 123-4567
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: 1, borderColor: 'grey.800', mt: 4, pt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2024 Neighborhood Safety Alert System. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 