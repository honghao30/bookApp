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

const DetailListNote: React.FC = () => {  
    const [book, setBook] = useState(null);
    const { book_id } = useParams();
    const location = useLocation();
    const { cates, index } = location.state;
    
    useEffect(() => {
      const fetchBook = async () => {
        const response = await axios.get(`https://nosy-billowy-bun.glitch.me/note`);
        setBook(response.data);
        console.log(response.data)
      };
      fetchBook();
    }, [book_id]);

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
            {book[index].titles.map((book, index) => (
              <ListItem key={index}>                
                <Link to={`/ReadNoteDetail/${book.typeId}`} state={{ cates: book.title, index: index }}>
                  {book.title}
                </Link>
              </ListItem>
            ))}            
          </List>
      </div>
    )
}

export default DetailListNote;
