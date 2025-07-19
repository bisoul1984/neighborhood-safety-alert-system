import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Container,
  InputBase,
  Paper,
  Chip,
  Alert,
  Snackbar,
  Tooltip,
  Divider,
  ListItemButton,
  Collapse,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Map,
  Report,
  Security,
  People,
  Settings,
  Notifications,
  AccountCircle,
  Logout,
  Home,
  Search,
  Warning,
  Info,
  ExpandLess,
  ExpandMore,
  LocationOn,
  Phone,
  Email
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';

// Styled search component
const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const EnhancedNavbar = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [emergencyAlert, setEmergencyAlert] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [expandedMenu, setExpandedMenu] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { sendTestNotification } = useSocket();

  // Emergency alert state
  const [emergencySnackbar, setEmergencySnackbar] = useState({
    open: false,
    message: '',
    severity: 'warning'
  });

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
      description: 'Overview of safety metrics'
    },
    {
      text: 'Live Map',
      icon: <Map />,
      path: '/map',
      description: 'Real-time incident mapping'
    },
    {
      text: 'Incidents',
      icon: <Report />,
      path: '/incidents',
      description: 'View all reported incidents',
      subItems: [
        { text: 'All Incidents', path: '/incidents' },
        { text: 'My Reports', path: '/incidents?filter=my-reports' },
        { text: 'Recent Activity', path: '/incidents?filter=recent' }
      ]
    },
    {
      text: 'Report Incident',
      icon: <Report />,
      path: '/report',
      description: 'Report a new safety incident'
    },
    {
      text: 'Safety Resources',
      icon: <Security />,
      path: '/safety',
      description: 'Safety tips and resources',
      subItems: [
        { text: 'Safety Tips', path: '/safety' },
        { text: 'Emergency Contacts', path: '/safety/contacts' },
        { text: 'Safety Guidelines', path: '/safety/guidelines' }
      ]
    },
    {
      text: 'Community',
      icon: <People />,
      path: '/community',
      description: 'Connect with neighbors',
      subItems: [
        { text: 'Community Forum', path: '/community' },
        { text: 'Neighborhood Watch', path: '/community' },
        { text: 'Events', path: '/community' }
      ]
    },
    {
      text: 'Settings',
      icon: <Settings />,
      path: '/settings',
      description: 'Account and app settings'
    },
  ];

  // Handle search functionality
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Handle emergency alert
  const handleEmergencyAlert = () => {
    setEmergencySnackbar({
      open: true,
      message: 'Emergency alert sent to local authorities and community members!',
      severity: 'warning'
    });
    // Here you would typically send the emergency alert to the backend
    console.log('Emergency alert triggered');
  };

  // Handle menu expansion
  const handleMenuExpand = (text) => {
    setExpandedMenu(prev => ({
      ...prev,
      [text]: !prev[text]
    }));
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Speed dial actions for quick access
  const speedDialActions = [
    { icon: <Report />, name: 'Report Incident', action: () => navigate('/report') },
    { icon: <Warning />, name: 'Emergency Alert', action: handleEmergencyAlert },
    { icon: <Map />, name: 'Live Map', action: () => navigate('/map') },
    { icon: <Phone />, name: 'Call 911', action: () => window.open('tel:911') },
  ];

  const drawer = (
    <Box sx={{ width: 280 }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          🛡️ Safety Alert System
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Keeping our community safe
        </Typography>
      </Box>

      {/* User Info */}
      {user && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar 
              src={user.profile?.avatar} 
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {user.name || user.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.role || 'Community Member'}
              </Typography>
            </Box>
          </Box>
          <Chip 
            label="Online" 
            size="small" 
            color="success" 
            variant="outlined"
            sx={{ fontSize: '0.7rem' }}
          />
        </Box>
      )}

      {/* Navigation Menu */}
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.subItems) {
                    handleMenuExpand(item.text);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
                selected={isActiveRoute(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActiveRoute(item.path) ? 'primary.main' : 'inherit',
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  secondary={item.description}
                  sx={{ 
                    color: isActiveRoute(item.path) ? 'primary.main' : 'inherit',
                    '& .MuiListItemText-secondary': {
                      fontSize: '0.75rem',
                      opacity: 0.7
                    }
                  }}
                />
                {item.subItems && (
                  expandedMenu[item.text] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>
            
            {/* Sub-menu items */}
            {item.subItems && (
              <Collapse in={expandedMenu[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      sx={{ pl: 4, py: 0.5 }}
                      onClick={() => handleNavigation(subItem.path)}
                    >
                      <ListItemText 
                        primary={subItem.text}
                        sx={{ fontSize: '0.9rem' }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      {/* Emergency Section */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" color="error" sx={{ mb: 1 }}>
          🚨 Emergency
        </Typography>
        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<Warning />}
          onClick={handleEmergencyAlert}
          sx={{ mb: 1 }}
        >
          Emergency Alert
        </Button>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<Phone />}
          onClick={() => window.open('tel:911')}
        >
          Call 911
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
          boxShadow: 3
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            🛡️ Neighborhood Safety Alert System
          </Typography>

          {/* Search Bar */}
          <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: { xs: '200px', sm: '300px' },
              mr: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              },
            }}
          >
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search incidents, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Paper>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Emergency Alert Button */}
            <Tooltip title="Emergency Alert">
              <IconButton
                color="inherit"
                onClick={handleEmergencyAlert}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                <Warning />
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                onClick={sendTestNotification}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Tooltip title="User Menu">
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ 
                  ml: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                {user?.profile?.avatar ? (
                  <Avatar src={user.profile.avatar} sx={{ width: 32, height: 32 }} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? drawerOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            top: 0,
            height: '100%',
            zIndex: theme.zIndex.drawer,
          },
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 280px)` },
          mt: '64px', // AppBar height
        }}
      >
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { minWidth: 200 }
        }}
      >
        <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Emergency Snackbar */}
      <Snackbar
        open={emergencySnackbar.open}
        autoHideDuration={6000}
        onClose={() => setEmergencySnackbar({ ...emergencySnackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setEmergencySnackbar({ ...emergencySnackbar, open: false })} 
          severity={emergencySnackbar.severity}
          sx={{ width: '100%' }}
        >
          {emergencySnackbar.message}
        </Alert>
      </Snackbar>

      {/* Speed Dial for Quick Actions */}
      <SpeedDial
        ariaLabel="Quick actions"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default EnhancedNavbar; 