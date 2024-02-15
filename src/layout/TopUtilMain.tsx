import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import MyMenuList from './components/myMenu';
import { useRecoilValue,  } from 'recoil';
import { isLoggedInState } from '../recoil/authAtom'

// ui part
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// ui part

const TopUtilMain: React.FC = ({ path }) => {  
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const handleMenuClick = () => {

  };
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            {path !== '/BookMain' &&
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            }
            {path !== '/BookMain' &&
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
            }  
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            진리책자 도서관//{path}
          </Typography>
          <MyMenuList />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopUtilMain;