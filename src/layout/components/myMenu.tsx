import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// ui
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

// fire base
import { authService } from '../../../src/firebase';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const MyMenuList: React.FC = () => {  
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const goMypage = () => {
      navigate('/MyPage');     
      setAnchorEl(null);
    }

    //Logout 하는 함수
    const logout = async () => {
      await signOut(authService);
      setAnchorEl(null);
      return;
    }

    useEffect(() => {
      authService.onAuthStateChanged((user: any) => {
        console.log(user);
        if (user) {            
          navigate('/BookMain');
        } else {
          alert('로그인 하셔야 합니다.');
          navigate('/');            
        }
      });
  }, []);
      
  return (
    <div>
        <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        >
        <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={ goMypage }>Profile</MenuItem>          
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
  </div>    
  );
}

export default MyMenuList;