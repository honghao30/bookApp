import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import parse from 'html-react-parser';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
const ReadDetail: React.FC = () => {  
  const [book, setBook] = useState(null);
  const { bookLisId } = useParams();
  const location = useLocation();
  const cates = location.state.cates;

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`https://various-sable-background.glitch.me/bookcontent${bookLisId}`);
      console.log(response.data);
      setBook(response.data);
    };
    fetchBook();
  }, [bookLisId]);

  if (!book) {
    return <div>
          <Box sx={{ width: '100%', height: '200px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <CircularProgress />
          </Box>
    </div>;
  }

  return (
    <div className='book-content'>
      <SubTitle>
        {cates}
      </SubTitle>
      {book.map((book: {
        [x: string]: ReactNode; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
}, index: Key | null | undefined) => (
        <BookContent key={index} dangerouslySetInnerHTML={{ __html: book.content }} />        
      ))}   
     
    </div>
  )
}

export default ReadDetail;
