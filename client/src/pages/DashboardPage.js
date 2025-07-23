import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Container,
  Alert,
  Button,
  Chip,
  LinearProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Warning, 
  LocationOn, 
  People, 
  Security,
  TrendingUp,
  CheckCircle
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Mock dashboard data - in a real app, this would come from API calls
  const [dashboardData, setDashboardData] = useState({
    activeMembers: 0,
    recentIncidents: 0,
    safetyScore: 85,
    neighborhoodStatus: 'Safe',
    lastUpdated: new Date().toLocaleDateString()
  });

  // Simulate loading real data
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setDashboardData({
        activeMembers: Math.floor(Math.random() * 50) + 10, // Random number between 10-60
        recentIncidents: Math.floor(Math.random() * 5), // Random number between 0-5
        safetyScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        neighborhoodStatus: 'Safe',
        lastUpdated: new Date().toLocaleDateString()
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        mt: { xs: 8, md: 4 }, 
        mb: 4,
        px: { xs: 2, md: 3 },
        pt: { xs: 2, md: 0 }
      }}
    >
      <Box>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            color: '#081f37',
            fontSize: { xs: '1.5rem', md: '2.125rem' },
            textAlign: { xs: 'center', md: 'left' },
            mb: { xs: 2, md: 3 },
            lineHeight: { xs: 1.3, md: 1.2 }
          }}
        >
          Welcome back, {user?.firstName || 'User'}!
        </Typography>
        <Alert 
          severity="info" 
          sx={{ 
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '0.875rem', md: '1rem' },
            '& .MuiAlert-message': {
              fontSize: { xs: '0.875rem', md: '1rem' },
              lineHeight: { xs: 1.4, md: 1.5 }
            }
          }}
        >
          {user?.firstName 
            ? `Welcome to your neighborhood safety dashboard, ${user.firstName}! Stay informed about safety in your area and connect with your community.`
            : "Welcome to your neighborhood safety dashboard! Stay informed about safety in your area and connect with your community."
          }
        </Alert>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Recent Incidents */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              bgcolor: 'white', 
              color: '#081f37', 
              borderRadius: 3, 
              boxShadow: '0 4px 12px rgba(8, 31, 55, 0.1)', 
              border: '1px solid rgba(8, 31, 55, 0.05)',
              height: '100%'
            }}>
              <CardHeader 
                title={
                  <Typography 
                    variant={isMobile ? "h6" : "h5"}
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      fontWeight: 600,
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    Recent Incidents
                  </Typography>
                }
                avatar={<Warning sx={{ color: '#d32f2f', fontSize: { xs: '1.5rem', md: '2rem' } }} />}
                action={
                  <Chip 
                    label={dashboardData.recentIncidents} 
                    sx={{ 
                      bgcolor: dashboardData.recentIncidents > 0 ? '#d32f2f' : '#4caf50', 
                      color: 'white', 
                      fontWeight: 600,
                      fontSize: { xs: '0.75rem', md: '0.875rem' }
                    }}
                    size="small"
                  />
                }
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  '& .MuiCardHeader-content': {
                    textAlign: { xs: 'center', md: 'left' }
                  }
                }}
              />
              <CardContent sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {dashboardData.recentIncidents > 0 ? (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#5a6c7d',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      lineHeight: { xs: 1.4, md: 1.5 },
                      mb: { xs: 2, md: 2 }
                    }}
                  >
                    {dashboardData.recentIncidents} incident{dashboardData.recentIncidents !== 1 ? 's' : ''} reported in the last 24 hours.
                  </Typography>
                ) : (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#5a6c7d',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      lineHeight: { xs: 1.4, md: 1.5 },
                      mb: { xs: 2, md: 2 }
                    }}
                  >
                    No recent incidents in your area. Great job keeping the community safe!
                  </Typography>
                )}
                <Button 
                  variant="outlined" 
                  sx={{ 
                    mt: 2, 
                    borderColor: '#081f37', 
                    color: '#081f37', 
                    fontWeight: 600, 
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    '&:hover': { bgcolor: '#f8f9fa', borderColor: '#1a4a6b' }
                  }}
                  onClick={() => navigate('/incidents')}
                >
                  View All Incidents
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {/* Neighborhood Stats */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              bgcolor: 'white', 
              color: '#081f37', 
              borderRadius: 3, 
              boxShadow: '0 4px 12px rgba(8, 31, 55, 0.1)', 
              border: '1px solid rgba(8, 31, 55, 0.05)',
              height: '100%'
            }}>
              <CardHeader 
                title={
                  <Typography 
                    variant={isMobile ? "h6" : "h5"}
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      fontWeight: 600,
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    Neighborhood Stats
                  </Typography>
                }
                avatar={<People sx={{ color: '#1976d2', fontSize: { xs: '1.5rem', md: '2rem' } }} />}
                action={
                  <Chip 
                    label="Live" 
                    sx={{ 
                      bgcolor: '#4caf50', 
                      color: 'white', 
                      fontWeight: 600,
                      fontSize: { xs: '0.75rem', md: '0.875rem' }
                    }}
                    size="small"
                    icon={<CheckCircle sx={{ color: 'white' }} />}
                  />
                }
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  '& .MuiCardHeader-content': {
                    textAlign: { xs: 'center', md: 'left' }
                  }
                }}
              />
              <CardContent sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '1.125rem', md: '1.25rem' },
                    fontWeight: 600,
                    mb: { xs: 1, md: 2 }
                  }}
                >
                  Active Members: {dashboardData.activeMembers}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#5a6c7d', 
                    mb: { xs: 2, md: 2 },
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: { xs: 1.4, md: 1.5 }
                  }}
                >
                  {dashboardData.activeMembers > 0 
                    ? `${dashboardData.activeMembers} community members are currently active and monitoring the neighborhood.`
                    : "Join your neighborhood to connect with neighbors and stay informed."
                  }
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ 
                    mb: 1, 
                    borderColor: '#081f37', 
                    color: '#081f37', 
                    fontWeight: 600, 
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    '&:hover': { bgcolor: '#f8f9fa', borderColor: '#1a4a6b' }
                  }}
                  onClick={() => navigate('/members')}
                >
                  View All Members
                </Button>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#5a6c7d',
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    display: 'block',
                    mt: 1
                  }}
                >
                  Last updated: {dashboardData.lastUpdated}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Safety Score */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              bgcolor: 'white', 
              color: '#081f37', 
              borderRadius: 3, 
              boxShadow: '0 4px 12px rgba(8, 31, 55, 0.1)', 
              border: '1px solid rgba(8, 31, 55, 0.05)',
              height: '100%'
            }}>
              <CardHeader 
                title={
                  <Typography 
                    variant={isMobile ? "h6" : "h5"}
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      fontWeight: 600,
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    Neighborhood Safety Score
                  </Typography>
                }
                avatar={<Security sx={{ color: '#4caf50', fontSize: { xs: '1.5rem', md: '2rem' } }} />}
                action={
                  <Chip 
                    label={dashboardData.neighborhoodStatus} 
                    sx={{ 
                      bgcolor: '#4caf50', 
                      color: 'white', 
                      fontWeight: 600,
                      fontSize: { xs: '0.75rem', md: '0.875rem' }
                    }}
                    size="small"
                  />
                }
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  '& .MuiCardHeader-content': {
                    textAlign: { xs: 'center', md: 'left' }
                  }
                }}
              />
              <CardContent sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Typography 
                    variant={isMobile ? "h4" : "h3"} 
                    sx={{ 
                      mr: 2, 
                      fontWeight: 'bold', 
                      color: '#081f37',
                      fontSize: { xs: '2rem', md: '3rem' }
                    }}
                  >
                    {dashboardData.safetyScore}%
                  </Typography>
                  <TrendingUp sx={{ color: '#4caf50', fontSize: { xs: '1.5rem', md: '2rem' } }} />
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={dashboardData.safetyScore} 
                  sx={{ 
                    mb: 2, 
                    height: { xs: 6, md: 8 }, 
                    borderRadius: 4, 
                    background: '#e3eaf6', 
                    '& .MuiLinearProgress-bar': { background: '#1976d2' } 
                  }}
                  color={dashboardData.safetyScore >= 80 ? "success" : dashboardData.safetyScore >= 60 ? "warning" : "error"}
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#5a6c7d',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: { xs: 1.4, md: 1.5 }
                  }}
                >
                  Your neighborhood has a {dashboardData.safetyScore >= 80 ? 'high' : dashboardData.safetyScore >= 60 ? 'moderate' : 'low'} safety rating.
                  {dashboardData.safetyScore >= 80 && " Keep up the great work!"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Safety Tips */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              bgcolor: 'white', 
              color: '#081f37', 
              borderRadius: 3, 
              boxShadow: '0 4px 12px rgba(8, 31, 55, 0.1)', 
              border: '1px solid rgba(8, 31, 55, 0.05)',
              height: '100%'
            }}>
              <CardHeader 
                title={
                  <Typography 
                    variant={isMobile ? "h6" : "h5"}
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      fontWeight: 600,
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    Safety Tips
                  </Typography>
                }
                avatar={<Security sx={{ color: '#1976d2', fontSize: { xs: '1.5rem', md: '2rem' } }} />}
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  '& .MuiCardHeader-content': {
                    textAlign: { xs: 'center', md: 'left' }
                  }
                }}
              />
              <CardContent sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#5a6c7d',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: { xs: 1.4, md: 1.5 },
                    mb: 1
                  }}
                >
                  • Always lock your doors and windows
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#5a6c7d',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: { xs: 1.4, md: 1.5 },
                    mb: 1
                  }}
                >
                  • Report suspicious activity immediately
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#5a6c7d',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: { xs: 1.4, md: 1.5 }
                  }}
                >
                  • Keep emergency contacts handy
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              bgcolor: 'white', 
              color: '#081f37', 
              borderRadius: 3, 
              boxShadow: '0 4px 12px rgba(8, 31, 55, 0.1)', 
              border: '1px solid rgba(8, 31, 55, 0.05)',
              height: '100%'
            }}>
              <CardHeader 
                title={
                  <Typography 
                    variant={isMobile ? "h6" : "h5"}
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      fontWeight: 600,
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    Quick Actions
                  </Typography>
                }
                avatar={<LocationOn sx={{ color: '#1a4a6b', fontSize: { xs: '1.5rem', md: '2rem' } }} />}
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  '& .MuiCardHeader-content': {
                    textAlign: { xs: 'center', md: 'left' }
                  }
                }}
              />
              <CardContent sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    mb: 1, 
                    bgcolor: '#1976d2', 
                    color: 'white', 
                    fontWeight: 600, 
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    py: { xs: 1, md: 1.5 },
                    '&:hover': { bgcolor: '#1565c0' } 
                  }}
                  onClick={() => navigate('/report')}
                >
                  Report Incident
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    mb: 1, 
                    borderColor: '#081f37', 
                    color: '#081f37', 
                    fontWeight: 600, 
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    py: { xs: 1, md: 1.5 },
                    '&:hover': { bgcolor: '#f8f9fa', borderColor: '#1a4a6b' } 
                  }}
                  onClick={() => navigate('/map')}
                >
                  View Map
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    borderColor: '#081f37', 
                    color: '#081f37', 
                    fontWeight: 600, 
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    py: { xs: 1, md: 1.5 },
                    '&:hover': { bgcolor: '#f8f9fa', borderColor: '#1a4a6b' } 
                  }}
                  onClick={() => navigate('/safety')}
                >
                  Safety Resources
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage; 