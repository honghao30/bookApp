import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import parse from 'html-react-parser';
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { green } from '@mui/material/colors';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Loading from './compornents/Loading';
import BottomNav from "../layout/BottomNav"
import TopUtilDetail from "../layout/TopUtilDetail"

const List = styled.ul `
  display: block;
`;
const ListItem = styled.li `
  font-size: 15px;
  padding: 6px 0;
`
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

const ReadDetail: React.FC = () => {  
  const [book, setBook] = useState(null);
  const { bookLisId } = useParams();
  const location = useLocation();
  const { cates, bookTitle } = location.state || { cates: '', bookTitle: '' };
  const [value, setValue] = useState(0);
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
      const response = await axios.get(`https://nosy-billowy-bun.glitch.me/bookcontent${bookLisId}`);
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
  }, [bookLisId]);

  const goToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  };

  if (!book) {
    return <div>
          <Loading />
    </div>;
  }

  return (
    <>
      {book && <TopUtilDetail book={book} />}
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
        {book.map((book: {
          [x: string]: ReactNode; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
  }, index: Key | null | undefined) => (
          <BookContent key={index} dangerouslySetInnerHTML={{ __html: book.content }} />        
        ))}   
      
      </div>
      <BottomNav />  
    </> 
  )
}

export default ReadDetail;
