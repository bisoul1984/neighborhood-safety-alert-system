import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid,
  Alert,
  Paper
} from '@mui/material';

const ReportIncidentPage = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    date: '',
    time: '',
    severity: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Incident report:', formData);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Report Incident
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Help keep your neighborhood safe by reporting incidents. All reports are anonymous and will be reviewed by community moderators.
      </Alert>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Incident Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Incident Type"
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <MenuItem value="suspicious">Suspicious Activity</MenuItem>
                  <MenuItem value="theft">Theft</MenuItem>
                  <MenuItem value="vandalism">Vandalism</MenuItem>
                  <MenuItem value="traffic">Traffic Violation</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Time"
                InputLabelProps={{ shrink: true }}
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Severity</InputLabel>
                <Select
                  value={formData.severity}
                  label="Severity"
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth size="large">
                Submit Report
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReportIncidentPage; 