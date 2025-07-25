import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
  AppBar,
  Toolbar,
  Link
} from '@mui/material';
import {
  Security,
  Notifications,
  Map,
  People,
  Speed,
  VerifiedUser,
  ArrowForward,
  LocationOn,
  Warning
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
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
          background: 'linear-gradient(90deg, #081f37 0%, #1a4a6b 100%)',
          boxShadow: '0 4px 12px rgba(8, 31, 55, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          px: { xs: 1, md: 0 }
        }}
      >
        <Toolbar sx={{ px: { xs: 0, md: 2 } }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'white',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              },
              justifyContent: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' }
            }}
            onClick={() => navigate('/')}
          >
            🛡️ Neighborhood Safety Alert System
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
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
                color: '#081f37',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#f8f9fa'
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
          background: '#081f37',
          color: 'white',
          py: { xs: 6, md: 12 },
          pt: { xs: 18, md: 16 }, // Increase extra top padding for mobile
          px: { xs: 2, sm: 4, md: 0 }, // Add horizontal padding on mobile
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '1.7rem', sm: '2.2rem', md: '3.2rem' },
                    lineHeight: { xs: 1.25, md: 1.2 },
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Stay Safe, Stay Informed
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: { xs: 2.5, md: 4 },
                    opacity: 0.9,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    lineHeight: { xs: 1.5, md: 1.6 },
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Join thousands of community members who trust our real-time safety alert system to keep their neighborhoods secure.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { xs: 'center', sm: 'flex-start' }, mt: { xs: 2, md: 0 } }}>
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
                      },
                      width: { xs: '100%', sm: 'auto' }
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
                      },
                      width: { xs: '100%', sm: 'auto' },
                      mt: { xs: 1, sm: 0 }
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Box>
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
      <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: '#f8f9fa', px: { xs: 2, sm: 4, md: 0 }, mt: { xs: 2, md: 0 } }}>
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
                    boxShadow: '0 4px 12px rgba(8, 31, 55, 0.1)',
                    border: '1px solid rgba(8, 31, 55, 0.05)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(8, 31, 55, 0.15)'
                    },
                    mb: { xs: 2, md: 0 }
                  }}
                >
                  <Box sx={{ color: '#081f37', mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: '#081f37' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5a6c7d' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'white', px: { xs: 2, sm: 4, md: 0 }, mt: { xs: 2, md: 0 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: { xs: 'center', md: 'center' }, mb: 6 }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2, color: '#081f37', fontSize: { xs: '1.3rem', md: '2.2rem' }, lineHeight: { xs: 1.3, md: 1.2 } }}>
              Why Choose Our Platform?
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', color: '#5a6c7d', fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: { xs: 1.5, md: 1.6 } }}>
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
                    border: '1px solid rgba(8, 31, 55, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(8, 31, 55, 0.15)',
                      borderColor: '#081f37'
                    },
                    mb: { xs: 2, md: 0 }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ color: '#081f37', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2, color: '#081f37' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#5a6c7d' }}>
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
          background: 'linear-gradient(135deg, #081f37 0%, #1a4a6b 100%)',
          color: 'white',
          py: { xs: 5, md: 8 },
          px: { xs: 2, sm: 4, md: 0 },
          mt: { xs: 2, md: 0 }
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: { xs: 'center', md: 'center' } }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '1.3rem', md: '2.2rem' }, lineHeight: { xs: 1.3, md: 1.2 } }}>
              Ready to Make Your Neighborhood Safer?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: { xs: 1.5, md: 1.6 } }}>
              Join thousands of community members who are already using our platform to stay informed and stay safe.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{
                bgcolor: 'white',
                color: '#081f37',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#f8f9fa'
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
      <Box sx={{ bgcolor: '#081f37', color: 'white', py: { xs: 3, md: 4 }, px: { xs: 2, sm: 4, md: 0 }, mt: { xs: 2, md: 0 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', md: '1.25rem' }, textAlign: { xs: 'center', md: 'left' } }}>
                Neighborhood Safety Alert System
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Empowering communities with real-time safety information and emergency alerts.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', md: '1.25rem' }, textAlign: { xs: 'center', md: 'left' } }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Button 
                  onClick={() => navigate('/login')}
                  sx={{
                    color: 'white',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    padding: '8px 0',
                    minHeight: 'auto',
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#f0f0f0'
                    }
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  sx={{
                    color: 'white',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    padding: '8px 0',
                    minHeight: 'auto',
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#f0f0f0'
                    }
                  }}
                >
                  Register
                </Button>
                <Button 
                  onClick={() => navigate('/safety')}
                  sx={{
                    color: 'white',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    padding: '8px 0',
                    minHeight: 'auto',
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#f0f0f0'
                    }
                  }}
                >
                  Safety Tips
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', md: '1.25rem' }, textAlign: { xs: 'center', md: 'left' } }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Emergency: 911
                <br />
                Support: fikeretetadesse1403@gmail.com
                <br />
                Phone: +251967044111
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: 1, borderColor: 'rgba(255,255,255,0.2)', mt: { xs: 2, md: 4 }, pt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2024 Neighborhood Safety Alert System. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
              Built by{' '}
              <Link
                href="https://www.bisrat-tadesse.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  transition: 'color 0.2s',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                Bisrate Tadesse
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 