import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Grid,
  Button
} from '@mui/material';

const CommunityPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Community
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Neighborhood Watch
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Connect with your neighbors and stay informed about community safety.
              </Typography>
              <Button variant="contained">
                Join Neighborhood Watch
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Community Events
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No upcoming events scheduled.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommunityPage; 