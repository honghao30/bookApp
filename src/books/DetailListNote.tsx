import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
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
    const cates = location.state.cates;
    
    useEffect(() => {
      const fetchBook = async () => {
        const response = await axios.get(`https://tasty-tricolor-tango.glitch.me/note`);
        setBook(response.data);
      };
      fetchBook();
    }, [book_id]);

    if (!book) {
      return <div>Loading...</div>;
    }

    return (
      <div className='book-content'>
        <SubTitle>
          {cates}
        </SubTitle>ddd
           {/* <List>
            {book.map((book: {
              [x: string]: ReactNode; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
      }, index: Key | null | undefined) => (
              <ListItem key={index}>                
                <Link to={`/ReadDetail/${book.bookLisId}`} state={{ cates: book.subject }}>
                  {book.subject}
                </Link>
              </ListItem>
            ))}            
          </List> */}
      </div>
    )
}

export default DetailListNote;
