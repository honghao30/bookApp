import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import MyMenuList from './components/myMenu';

// ui part
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// ui part

const TopUtilMain: React.FC = ({ path }) => {  
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
              onClick={handleBackClick}
            >
              <ArrowBackIosIcon />
            </IconButton> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            진리책자 도서관
          </Typography>
          <MyMenuList />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopUtilMain;