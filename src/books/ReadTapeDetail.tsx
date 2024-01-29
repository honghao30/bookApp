import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { green } from '@mui/material/colors';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SubTitle = styled.p `
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  margin-bottom: 20px;
`
const BookContent = styled.div `
  font-size: 18px;
  line-height:28px;
  margin-bottom: 10px;
  padding-bottom: 70px;
`
const ButtonArea = styled.div `
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const fabStyle = {
  position: 'fixed',
  bottom: 56,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

const ReadTapeDetail: React.FC = () => {  
  const [book, setBook] = useState(null);
  const { typeId } = useParams();
  const location = useLocation();
  const { cates, index } = location.state;
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const [showTopBtn, setShowTopBtn] = useState(false);

  const fabs = [
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <KeyboardArrowUpIcon />,
      label: '위로',
    }
  ];

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`https://nosy-billowy-bun.glitch.me/tape`);
      console.log(response.data);
      setBook(response.data);
    };
    fetchBook();
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    });    
  }, [typeId]);

  const goToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  };
  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <div className='book-content'>
      <SubTitle>
        {cates}
      </SubTitle>
      {showTopBtn && fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} size="medium" onClick={goToTop}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
      <BookContent dangerouslySetInnerHTML={{ __html: book[index].content }} />  
    </div>
  )
}

export default ReadTapeDetail;
