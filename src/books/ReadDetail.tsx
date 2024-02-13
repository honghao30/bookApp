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
const AudioSection = styled.div`
  padding: 30px 0;
`;
const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

const ReadDetail: React.FC = () => {  
  const [book, setBook] = useState(null);
  const [value, setValue] = useState(0);
  const location = useLocation();
  const { bookId, cates, index } = location.state;
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { id } = useParams();
  
  const fabs = [
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <KeyboardArrowUpIcon />,
      label: '위로',
    }
  ];

  useEffect(() => {
    // const fetchBook = async () => {
    //   const response = await axios.get(`/db/book${bookId}.json`);
    //   const data = response.data;       
    //   localStorage.setItem(`book${bookId}`, JSON.stringify(data));   
    //   const booksData = JSON.parse(localStorage.getItem(`book${bookId}`));
    //   if(booksData) {   
    //     setBook(booksData[`book${bookId}`]);
    //   }
    //   // const response = await axios.get(`https://nosy-billowy-bun.glitch.me/bookcontent${bookLisId}`);
    //   // console.log(response.data);
    //   // setBook(response.data);
    // };
    // fetchBook();
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
          setShowTopBtn(true);
      } else {
          setShowTopBtn(false);
      }
  });     
  }, []);

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

        <AudioSection>
        <iframe src={`https://player.audiop.naver.com/player?cpId=audioclip&cpMetaId=${book[index].url}&partnerKey=f8ae3b53&partnerId=audioclip&extra=`} title="오디오 플레이어" width="100%" height="60px"></iframe>
        </AudioSection>
       <BookContent dangerouslySetInnerHTML={{ __html: book[index].content }} />  
      </div>
      <BottomNav />  
    </> 
  )
}

export default ReadDetail;
