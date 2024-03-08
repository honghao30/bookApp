import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BookSubCate from '../books/compornents/bookListLayer';

//UI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//FIRE
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../src/firebase';
import { useEffect, useState } from 'react';

const TopUtilDetail: React.FC<{ cates: string, bookCates:string, bookId: string }> = ({ cates, bookCates, bookId, realVoice, onlyAudio }) => {  
  const navigate = useNavigate();
  const [openList, setOpenList] = useState(false);

  const handleMenuClick = () => {
    console.log('책 목록 열기')
    setOpenList(!openList);
  };
  const handleClose = () => {
    setOpenList(false);
  }
  const handleFaveClick = () => {
    alert('준비중')
    console.log('즐겨찾기 추가')
  }
  const handleGoBackClick = () => {
    navigate(-1)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
            {realVoice || onlyAudio ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleGoBackClick}
              >
                <ArrowBackIosNewIcon />
              </IconButton>              
            ) : (
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
            )}         
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <p className='bookName'>{cates} {bookId}</p>
                {bookCates && <p className='bookCates'>- {bookCates}</p> }
            </Typography>   
            <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleFaveClick}
                >
                  <FavoriteIcon />
            </IconButton>                 
        </Toolbar>
      </AppBar>
      {openList && <BookSubCate handleClose={handleClose} bookId={ bookId } />}
    </Box>
  );
};

export default TopUtilDetail;