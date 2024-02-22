import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Loading from './compornents/Loading';

// fire base
import { db } from '../../src/firebase';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Button, Stack } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../src/firebase';

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

const BookList: React.FC = () => {  
    const [book, setBook] = useState(null);
    const { bookId } = useParams();
    const location = useLocation();
    const { cates, index, bookIds } = location.state;
    
    const getBookList = async () => {    
      await getDocs(collection(db, bookIds))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
          setBook(newData);                   
      })     
    }

    useEffect(() => {
      getBookList()      
    }, []);
    
    

    if (!book) {
      return <div>
            <Loading />
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
                <Link to={`/ReadCommon/${book.id}`}  state={{ cates: book.subject, index: index, bookId: bookIds }}>
                  {book.subject} {book.id} {bookId} {bookIds}
                </Link>
              </ListItem>
            ))}            
          </List>
      </div>
    )
}

export default BookList;
