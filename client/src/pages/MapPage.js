import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  Alert,
  Chip,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup,
  Circle
} from 'react-leaflet';
import { 
  Warning,
  Security,
  LocationOn,
  FilterList,
  Refresh
} from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Addis Ababa coordinates
  const ADDIS_ABABA_CENTER = [9.145, 38.7636];
  
  // Sample incidents in Addis Ababa
  const sampleIncidents = [
    {
      id: 1,
      title: "Suspicious Activity - Bole Area",
      description: "Suspicious person loitering around Bole International Airport area",
      location: "Bole, Addis Ababa",
      coordinates: [8.9779, 38.7997],
      severity: "Medium",
      status: "Active",
      date: "2024-01-15",
      type: "Suspicious Activity",
      reporter: "Community Member"
    },
    {
      id: 2,
      title: "Vehicle Break-in - Kazanchis",
      description: "Attempted break-in of parked vehicle near Kazanchis commercial area",
      location: "Kazanchis, Addis Ababa",
      coordinates: [9.0272, 38.7369],
      severity: "High",
      status: "Resolved",
      date: "2024-01-14",
      type: "Vehicle Crime",
      reporter: "Local Business Owner"
    },
    {
      id: 3,
      title: "Traffic Incident - Meskel Square",
      description: "Minor traffic accident at Meskel Square intersection",
      location: "Meskel Square, Addis Ababa",
      coordinates: [9.0054, 38.7636],
      severity: "Low",
      status: "Active",
      date: "2024-01-15",
      type: "Traffic Incident",
      reporter: "Traffic Police"
    },
    {
      id: 4,
      title: "Safety Alert - Piazza Area",
      description: "Increased pickpocket activity reported in Piazza area",
      location: "Piazza, Addis Ababa",
      coordinates: [9.0321, 38.7489],
      severity: "Medium",
      status: "Active",
      date: "2024-01-13",
      type: "Theft",
      reporter: "Local Police"
    },
    {
      id: 5,
      title: "Community Watch - Entoto",
      description: "Neighborhood watch meeting scheduled for Entoto area",
      location: "Entoto, Addis Ababa",
      coordinates: [9.0084, 38.7636],
      severity: "Info",
      status: "Scheduled",
      date: "2024-01-20",
      type: "Community Event",
      reporter: "Community Leader"
    }
  ];

  useEffect(() => {
    setIncidents(sampleIncidents);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return '#d32f2f';
      case 'medium': return '#ed6c02';
      case 'low': return '#2e7d32';
      case 'info': return '#1976d2';
      default: return '#757575';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      case 'info': return '🔵';
      default: return '⚪';
    }
  };

  const customIcon = (color) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        font-weight: bold;
      ">⚠️</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  const handleRefresh = () => {
    // Simulate refreshing incidents
    console.log('Refreshing incidents...');
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          🗺️ Addis Ababa Safety Map
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh Map">
            <IconButton onClick={handleRefresh}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        View recent safety incidents and alerts in Addis Ababa. Click on markers for detailed information.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ height: '70vh', overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: '100%' }}>
              <MapContainer
                center={ADDIS_ABABA_CENTER}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Incident Markers */}
                {incidents.map((incident) => (
                  <Marker
                    key={incident.id}
                    position={incident.coordinates}
                    icon={customIcon(getSeverityColor(incident.severity))}
                    eventHandlers={{
                      click: () => setSelectedIncident(incident)
                    }}
                  >
                    <Popup>
                      <Box sx={{ minWidth: 200 }}>
                        <Typography variant="h6" gutterBottom>
                          {incident.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {incident.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <Chip 
                            label={incident.severity} 
                            size="small"
                            sx={{ 
                              bgcolor: getSeverityColor(incident.severity),
                              color: 'white'
                            }}
                          />
                          <Chip 
                            label={incident.status} 
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        <Typography variant="caption" display="block">
                          📍 {incident.location}
                        </Typography>
                        <Typography variant="caption" display="block">
                          📅 {new Date(incident.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" display="block">
                          👤 Reported by: {incident.reporter}
                        </Typography>
                      </Box>
                    </Popup>
                  </Marker>
                ))}

                {/* Safety Zones */}
                <Circle
                  center={[8.9779, 38.7997]}
                  radius={500}
                  pathOptions={{
                    color: '#1976d2',
                    fillColor: '#1976d2',
                    fillOpacity: 0.1
                  }}
                >
                  <Popup>
                    <Typography variant="body2">
                      🛡️ Bole Airport Security Zone
                    </Typography>
                  </Popup>
                </Circle>
              </MapContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Incident Summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Incidents: {incidents.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Alerts: {incidents.filter(i => i.status === 'Active').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Resolved: {incidents.filter(i => i.status === 'Resolved').length}
                </Typography>
              </Box>
              
              <Typography variant="h6" gutterBottom>
                🎯 Legend
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#d32f2f' }} />
                  <Typography variant="caption">High Severity</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ed6c02' }} />
                  <Typography variant="caption">Medium Severity</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#2e7d32' }} />
                  <Typography variant="caption">Low Severity</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#1976d2' }} />
                  <Typography variant="caption">Information</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {selectedIncident && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📋 Selected Incident
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {selectedIncident.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {selectedIncident.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip 
                    label={selectedIncident.severity} 
                    size="small"
                    sx={{ 
                      bgcolor: getSeverityColor(selectedIncident.severity),
                      color: 'white'
                    }}
                  />
                  <Chip 
                    label={selectedIncident.type} 
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MapPage; 