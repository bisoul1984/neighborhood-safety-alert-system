import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  Alert
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Safety Map
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        View recent incidents and safety alerts in your neighborhood. Click on markers for details.
      </Alert>

      <Paper elevation={3} sx={{ height: '70vh', overflow: 'hidden' }}>
        <Box sx={{ height: '100%', width: '100%' }}>
          <MapContainer
            center={[40.7128, -74.0060]} // Default to NYC coordinates
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Markers will be added here when incidents are loaded */}
          </MapContainer>
        </Box>
      </Paper>
    </Container>
  );
};

export default MapPage; 