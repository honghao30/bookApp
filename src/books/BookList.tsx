import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Loading from './compornents/Loading';

// fire base
import { db } from '../../src/firebase';
import { collection, getDocs } from "firebase/firestore";
import { Button, Stack } from '@mui/material';

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
const ButtonArea = styled.div `
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  .MuiStack-root {
    gap: 5px;
  }
`
const BookList: React.FC = () => {  
    const [book, setBook] = useState([]);
    const { bookId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { cates, index, bookIds, realVoice, onlyAudio, hasBible } = location.state;

    const getBookList = async () => {    
      const querySnapshot = await getDocs(collection(db, bookIds));
      const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
      setBook(newData);                   
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
           {book
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((book, index) => (
              <ListItem key={index}>
                {onlyAudio ? (
                  <div>
                    <iframe 
                      src={`https://player.audiop.naver.com/player?cpId=audioclip&cpMetaId=${book.url}&partnerKey=f8ae3b53&partnerId=audioclip&extra=`} 
                      title="오디오 플레이어" 
                      width="100%" 
                      height="100px"
                    >
                    </iframe>                   
                  </div>
                ) : (
                  <Link to={`/ReadCommon/${book.id}`}  state={{ cates: cates, bookCates: book.subject, index: index, bookId: bookIds, hasBible }}>
                    {book.subject}
                  </Link>
                )}
              </ListItem>
            ))}

            <ButtonArea>
                <Stack direction="row">          
                    <Button variant="outlined" onClick={ addPost }>등록</Button>                                               
                </Stack>
            </ButtonArea>                         
          </List>
      </div>
    )
}

export default BookList;
