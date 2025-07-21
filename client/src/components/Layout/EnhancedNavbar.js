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
  Search,
  Warning,
  ExpandLess,
  ExpandMore,
  Phone
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';



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
  const [expandedMenu, setExpandedMenu] = useState({});
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { sendTestNotification } = useSocket();

  // Mock notifications data with state management
  const [notifications, setNotifications] = useState([]);

  // Update notification count based on unread notifications
  const unreadNotifications = notifications.filter(n => !n.read);
  const currentNotificationCount = unreadNotifications.length;

  // Reset notifications when user authentication state changes
  useEffect(() => {
    if (user) {
      // User is logged in - set notifications
      setNotifications([
        {
          id: 1,
          title: 'New Incident Reported',
          message: 'Suspicious activity reported in your neighborhood',
          time: '2 minutes ago',
          type: 'incident',
          read: false
        },
        {
          id: 2,
          title: 'Community Meeting',
          message: 'Monthly neighborhood watch meeting scheduled for tomorrow',
          time: '1 hour ago',
          type: 'community',
          read: false
        },
        {
          id: 3,
          title: 'Safety Alert',
          message: 'Street light outage reported on Main Street',
          time: '3 hours ago',
          type: 'alert',
          read: false
        }
      ]);
    } else {
      // User is logged out - clear notifications
      setNotifications([]);
    }
  }, [user]);

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
        { text: 'All Members', path: '/members' },
        { text: 'Community Forum', path: '/community?section=community-forum' },
        { text: 'Neighborhood Watch', path: '/community?section=neighborhood-watch' },
        { text: 'Events', path: '/community?section=community-events' }
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
    console.log('Search submitted:', searchQuery);
    if (searchQuery.trim()) {
      console.log('Navigating to search page with query:', searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    } else {
      console.log('Search query is empty');
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

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleNotificationClick = (notificationId) => {
    // Mark notification as read
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    handleNotificationClose();
  };

  const handleMarkAllAsRead = () => {
    // Mark all notifications as read
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    handleNotificationClose();
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
    <Box sx={{ width: 280, height: '100%', background: 'linear-gradient(90deg, #081f37 0%, #1a4a6b 100%)', color: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'rgba(255,255,255,0.1)',
        background: 'transparent',
        color: 'white',
        boxShadow: '0 4px 12px rgba(8, 31, 55, 0.2)'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          🛡️ Safety Alert System
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Keeping our community safe
        </Typography>
      </Box>

      {/* User Info */}
      {user && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar 
              src={user.profile?.avatar} 
              sx={{ width: 40, height: 40, mr: 2, border: '2px solid #1a4a6b' }}
            />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
                {user.name || user.email}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                {user.role || 'Community Member'}
              </Typography>
            </Box>
          </Box>
          <Chip 
            label="Online" 
            size="small" 
            color="success" 
            variant="outlined"
            sx={{ fontSize: '0.7rem', color: 'white', borderColor: '#4caf50' }}
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
                    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
                    '& .MuiListItemIcon-root': { color: 'white' },
                  },
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                  color: 'white',
                  '&:hover': {
                    background: 'rgba(26, 74, 107, 0.2)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActiveRoute(item.path) ? 'white' : '#90caf9',
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  secondary={item.description}
                  sx={{ 
                    color: 'white',
                    '& .MuiListItemText-secondary': {
                      fontSize: '0.75rem',
                      opacity: 0.7,
                      color: '#b0bec5'
                    }
                  }}
                />
                {item.subItems && (
                  expandedMenu[item.text] ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />
                )}
              </ListItemButton>
            </ListItem>
            {/* Sub-menu items */}
            {item.subItems && (
              <Collapse in={expandedMenu[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ background: 'rgba(255,255,255,0.02)' }}>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      sx={{ pl: 4, py: 0.5, color: 'white', '&:hover': { background: 'rgba(26, 74, 107, 0.15)' } }}
                      onClick={() => handleNavigation(subItem.path)}
                    >
                      <ListItemText 
                        primary={subItem.text}
                        sx={{ fontSize: '0.9rem', color: 'white' }}
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
      <Box sx={{ p: 2, mt: 'auto', background: 'rgba(255,255,255,0.03)' }}>
        <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Typography variant="subtitle2" color="error" sx={{ mb: 1 }}>
          🚨 Emergency
        </Typography>
        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<Warning />}
          onClick={handleEmergencyAlert}
          sx={{ mb: 1, fontWeight: 600 }}
        >
          Emergency Alert
        </Button>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<Phone />}
          onClick={() => window.open('tel:911')}
          sx={{ fontWeight: 600, borderColor: '#d32f2f', color: '#d32f2f' }}
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
          background: 'linear-gradient(90deg, #081f37 0%, #1a4a6b 100%)',
          boxShadow: '0 4px 12px rgba(8, 31, 55, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, background: 'rgba(255,255,255,0.08)' }}
          >
            <MenuIcon />
          </IconButton>

          <Tooltip title="Go to Home Page">
            <Typography 
              variant="h6" 
              component="div" 
              onClick={() => navigate('/')} 
              sx={{ 
                flexGrow: 1,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'white',
                cursor: 'pointer',
                letterSpacing: 1,
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              🛡️ Neighborhood Safety Alert System
            </Typography>
          </Tooltip>

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
              backgroundColor: 'rgba(255, 255, 255, 0.10)',
              boxShadow: 'none',
              borderRadius: 2,
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
            <IconButton 
              type="submit" 
              sx={{ p: '10px', color: 'white' }}
              aria-label="search"
            >
              <Search />
            </IconButton>
          </Paper>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Emergency Alert Button - Only show when authenticated */}
            {user && (
              <Tooltip title="Emergency Alert">
                <IconButton
                  color="inherit"
                  onClick={handleEmergencyAlert}
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.10)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.20)',
                    }
                  }}
                >
                  <Warning />
                </IconButton>
              </Tooltip>
            )}

            {/* Notifications - Only show when authenticated */}
            {user && (
              <Tooltip title="Notifications">
                <IconButton
                  color="inherit"
                  onClick={handleNotificationOpen}
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.10)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.20)',
                    }
                  }}
                >
                  <Badge badgeContent={currentNotificationCount} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* User Menu - Only show when authenticated */}
            {user && (
              <Tooltip title="User Menu">
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ 
                    ml: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.10)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.20)',
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
            )}
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
            background: 'linear-gradient(90deg, #081f37 0%, #1a4a6b 100%)',
            color: 'white',
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

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { 
            minWidth: 350,
            maxHeight: 400
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Notifications fontSize="small" />
            Notifications
          </Typography>
        </Box>
        
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem 
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              sx={{ 
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                '&:last-child': { borderBottom: 0 }
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {notification.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {notification.message}
                </Typography>
                <Chip 
                  label={notification.type} 
                  size="small" 
                  color={notification.type === 'incident' ? 'error' : notification.type === 'alert' ? 'warning' : 'primary'}
                  variant="outlined"
                  sx={{ mt: 1, fontSize: '0.7rem' }}
                />
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', width: '100%', py: 2 }}>
              No new notifications
            </Typography>
          </MenuItem>
        )}
        
        <Divider />
        <MenuItem onClick={handleMarkAllAsRead}>
          <Typography variant="body2" color="primary" sx={{ textAlign: 'center', width: '100%' }}>
            Mark all as read
          </Typography>
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

      {/* Speed Dial for Quick Actions - Only show when authenticated */}
      {user && (
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
      )}
    </Box>
  );
};

export default EnhancedNavbar; 