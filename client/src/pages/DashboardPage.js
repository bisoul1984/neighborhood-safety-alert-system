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
  LinearProgress
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back, {user?.firstName || 'User'}!
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        {user?.firstName 
          ? `Welcome to your neighborhood safety dashboard, ${user.firstName}! Stay informed about safety in your area and connect with your community.`
          : "Welcome to your neighborhood safety dashboard! Stay informed about safety in your area and connect with your community."
        }
      </Alert>

      <Grid container spacing={3}>
        {/* Recent Incidents */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Recent Incidents" 
              avatar={<Warning color="error" />}
              action={
                <Chip 
                  label={dashboardData.recentIncidents} 
                  color={dashboardData.recentIncidents > 0 ? "error" : "success"}
                  size="small"
                />
              }
            />
            <CardContent>
              {dashboardData.recentIncidents > 0 ? (
                <Typography variant="body2" color="text.secondary">
                  {dashboardData.recentIncidents} incident{dashboardData.recentIncidents !== 1 ? 's' : ''} reported in the last 24 hours.
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No recent incidents in your area. Great job keeping the community safe!
                </Typography>
              )}
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => navigate('/incidents')}
              >
                View All Incidents
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Neighborhood Stats */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Neighborhood Stats" 
              avatar={<People color="primary" />}
              action={
                <Chip 
                  label="Live" 
                  color="success" 
                  size="small"
                  icon={<CheckCircle />}
                />
              }
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Members: {dashboardData.activeMembers}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {dashboardData.activeMembers > 0 
                  ? `${dashboardData.activeMembers} community members are currently active and monitoring the neighborhood.`
                  : "Join your neighborhood to connect with neighbors and stay informed."
                }
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mb: 1 }}
                onClick={() => navigate('/members')}
              >
                View All Members
              </Button>
              <Typography variant="caption" color="text.secondary">
                Last updated: {dashboardData.lastUpdated}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Safety Score */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Neighborhood Safety Score" 
              avatar={<Security color="success" />}
              action={
                <Chip 
                  label={dashboardData.neighborhoodStatus} 
                  color="success"
                  size="small"
                />
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" sx={{ mr: 2, fontWeight: 'bold' }}>
                  {dashboardData.safetyScore}%
                </Typography>
                <TrendingUp color="success" />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={dashboardData.safetyScore} 
                sx={{ mb: 2, height: 8, borderRadius: 4 }}
                color={dashboardData.safetyScore >= 80 ? "success" : dashboardData.safetyScore >= 60 ? "warning" : "error"}
              />
              <Typography variant="body2" color="text.secondary">
                Your neighborhood has a {dashboardData.safetyScore >= 80 ? 'high' : dashboardData.safetyScore >= 60 ? 'moderate' : 'low'} safety rating.
                {dashboardData.safetyScore >= 80 && " Keep up the great work!"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Safety Tips */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Safety Tips" 
              avatar={<Security color="info" />}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                • Always lock your doors and windows
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Report suspicious activity immediately
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Keep emergency contacts handy
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Quick Actions" 
              avatar={<LocationOn color="action" />}
            />
            <CardContent>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mb: 1 }}
                onClick={() => navigate('/report')}
              >
                Report Incident
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mb: 1 }}
                onClick={() => navigate('/map')}
              >
                View Map
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => navigate('/safety')}
              >
                Safety Resources
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage; 