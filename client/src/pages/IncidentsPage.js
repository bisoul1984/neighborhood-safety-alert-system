import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  CardHeader,
  Button,
  Chip,
  Grid,
  Alert
} from '@mui/material';
import { Warning, Add } from '@mui/icons-material';

const IncidentsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Incidents
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Report Incident
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        View and track safety incidents in your neighborhood. Report new incidents to help keep your community safe.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary" align="center">
                No incidents reported yet. Be the first to report a safety concern in your neighborhood.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IncidentsPage; 