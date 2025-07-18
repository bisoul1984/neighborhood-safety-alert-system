import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Chip,
  Grid,
  Alert
} from '@mui/material';
import { useParams } from 'react-router-dom';

const IncidentDetailPage = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Incident Details
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Incident ID: {id}
      </Alert>

      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary" align="center">
            Incident details will be displayed here when the backend is fully connected.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default IncidentDetailPage; 