import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Container,
  Alert,
  Button
} from '@mui/material';
import { 
  Warning, 
  LocationOn, 
  People, 
  Security 
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back, {user?.firstName || 'User'}!
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Stay informed about safety in your neighborhood. Check the map for recent incidents and report any concerns.
      </Alert>

      <Grid container spacing={3}>
        {/* Recent Incidents */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Recent Incidents" 
              avatar={<Warning color="error" />}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                No recent incidents in your area.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
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
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Members: 0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join your neighborhood to connect with neighbors.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Safety Tips */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Safety Tips" 
              avatar={<Security color="success" />}
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
              <Button variant="contained" fullWidth sx={{ mb: 1 }}>
                Report Incident
              </Button>
              <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                View Map
              </Button>
              <Button variant="outlined" fullWidth>
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