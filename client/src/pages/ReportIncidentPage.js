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

const ReportIncidentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const [formData, setFormData] = useState({
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
    
    if (!formData.type) {
      newErrors.type = 'Incident type is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Incident report submitted:', formData);
      
      setSnackbar({
        open: true,
        message: 'Incident report submitted successfully! Community members will be notified.',
        severity: 'success'
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          type: '',
          description: '',
          location: '',
          date: '',
          time: '',
          severity: 'medium'
        });
        setErrors({});
        navigate('/incidents');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      setSnackbar({
        open: true,
        message: 'Failed to submit report. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

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
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Incident Type *</InputLabel>
                <Select
                  value={formData.type}
                  label="Incident Type *"
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <MenuItem value="suspicious">🚨 Suspicious Activity</MenuItem>
                  <MenuItem value="theft">💰 Theft</MenuItem>
                  <MenuItem value="vandalism">🏚️ Vandalism</MenuItem>
                  <MenuItem value="traffic">🚦 Traffic Violation</MenuItem>
                  <MenuItem value="assault">👊 Assault</MenuItem>
                  <MenuItem value="vehicle">🚗 Vehicle Crime</MenuItem>
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
                  <MenuItem value="low">🟢 Low - Minor incident</MenuItem>
                  <MenuItem value="medium">🟡 Medium - Concerning activity</MenuItem>
                  <MenuItem value="high">🔴 High - Serious incident</MenuItem>
                  <MenuItem value="emergency">🚨 Emergency - Immediate attention required</MenuItem>
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