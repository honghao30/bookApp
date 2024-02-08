import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
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

const BookSubList: React.FC = () => {  
    const [book, setBook] = useState(null);
    const { bookId } = useParams();
    const location = useLocation();
    const cates = location.state.cates;
    
    useEffect(() => {
      const fetchBook = async () => {
        const response = await axios.get(`/db/${bookId}.json`);
        const data = response.data;           
        console.log(data)       
        localStorage.setItem(`${bookId}`, JSON.stringify(data));
        const storedData = JSON.parse(localStorage.getItem(`${bookId}`));        
        console.log('ddd', storedData)
        if (storedData) {             
          setBook(storedData.data);
          console.log('상세2', storedData);
        }          
      };
      fetchBook();
    }, [bookId]);
    
    

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
           <List>
            {book.map((book: {
              [x: string]: ReactNode; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
      }, index: Key | null | undefined) => (
              <ListItem key={index}>
                <Link to={`/ReadDetail/${book.Id}`}  state={{ cates: book.subject, index: index, bookId: bookId }}>
                  {book.subject} 
                </Link>

              </ListItem>
            ))}            
          </List>
      </div>
    )
}

export default BookSubList;
