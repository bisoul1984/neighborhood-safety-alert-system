import React from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Switch,
  FormControlLabel
} from '@mui/material';

const SettingsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email notifications"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Push notifications"
              />
              <FormControlLabel
                control={<Switch />}
                label="SMS alerts"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Privacy
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Show profile to neighbors"
              />
              <FormControlLabel
                control={<Switch />}
                label="Share location"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsPage; 