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
  Paper,
  Snackbar,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import { 
  Warning,
  LocationOn,
  Schedule,
  Security,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';

const ReportIncidentPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { emitNewIncident } = useSocket();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    location: '',
    date: '',
    time: '',
    severity: 'medium'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || formData.title.trim().length < 5) {
      newErrors.title = 'Title is required (min 5 characters)';
    }
    if (!formData.type) {
      newErrors.type = 'Incident type is required';
    }
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'Description is required (min 10 characters)';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        severity: formData.severity,
        location: {
          address: {
            street: formData.location || '',
            city: 'Addis Ababa',
            state: '',
            zipCode: ''
          },
          coordinates: {
            lat: 9.03, // Default Addis Ababa
            lng: 38.74
          }
        },
        isAnonymous: false
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/incidents`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Emit real-time notification to others
      if (emitNewIncident) {
        emitNewIncident(response.data);
      }
      setSnackbar({
        open: true,
        message: 'Incident reported successfully!',
        severity: 'success'
      });
      setFormData({
        title: '',
        type: '',
        description: '',
        location: '',
        date: '',
        time: '',
        severity: 'medium'
      });
      setLoading(false);
      setTimeout(() => navigate('/incidents'), 1000);
    } catch (error) {
      setLoading(false);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to submit report. Please try again.',
        severity: 'error'
      });
    }
  };

  const severityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        🚨 Report Incident
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Help keep your neighborhood safe by reporting incidents. All reports are anonymous and will be reviewed by community moderators.
      </Alert>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title *"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                error={!!errors.title}
                helperText={errors.title || "Enter a short, descriptive title for the incident"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Incident Type *</InputLabel>
                <Select
                  value={formData.type}
                  label="Incident Type *"
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <MenuItem value="theft">💰 Theft</MenuItem>
                  <MenuItem value="vandalism">🏚️ Vandalism</MenuItem>
                  <MenuItem value="assault">👊 Assault</MenuItem>
                  <MenuItem value="suspicious-activity">🚨 Suspicious Activity</MenuItem>
                  <MenuItem value="fire">🔥 Fire</MenuItem>
                  <MenuItem value="accident">💥 Accident</MenuItem>
                  <MenuItem value="medical-emergency">🚑 Medical Emergency</MenuItem>
                  <MenuItem value="road-hazard">🛣️ Road Hazard</MenuItem>
                  <MenuItem value="broken-infrastructure">🏗️ Broken Infrastructure</MenuItem>
                  <MenuItem value="noise-disturbance">🔊 Noise Disturbance</MenuItem>
                  <MenuItem value="traffic-violation">🚦 Traffic Violation</MenuItem>
                  <MenuItem value="other">❓ Other</MenuItem>
                </Select>
                {errors.type && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.type}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description *"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                error={!!errors.description}
                helperText={errors.description || "Provide detailed description of the incident"}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location *"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                error={!!errors.location}
                helperText={errors.location || "Enter the specific location where the incident occurred"}
                placeholder="e.g., Bole, Kazanchis, Meskel Square, etc."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date *"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                error={!!errors.date}
                helperText={errors.date}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Time *"
                InputLabelProps={{ shrink: true }}
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                error={!!errors.time}
                helperText={errors.time}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Severity Level</InputLabel>
                <Select
                  value={formData.severity}
                  label="Severity Level"
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                >
                  {severityOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Security />}
              >
                {loading ? 'Submitting Report...' : 'Submit Report'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          icon={snackbar.severity === 'success' ? <CheckCircle /> : <Error />}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReportIncidentPage; 