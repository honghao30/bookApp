import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from "styled-components";
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';

// fire base
import { db } from '../../firebase';
import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../src/firebase';

const LayerList = styled.div `
  display: block;
  position: fixed;
  left:0;
  top: 0;
  width: 100%;
  height: 100vh;
  max-width: 60%;
  background-color: #fff;
  border-right: 1px solid #ddd;
  z-index:1500;
`;
const List = styled.ul `
  display: block;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  padding: 15px;
`;
const ListItem = styled.li `
  font-size: 15px;
  padding: 6px 0;
`
const LayerMask = styled.div `
    position: fixed;
    width: 100%;
    height: 100vh;
    left:0;
    top:0;
    background: rgba(0,0,0,0.5);
    z-index:1400;
`
interface Props {
    handleClose: () => void;
}

const BookSubCate: React.FC<{ handleClose: () => void, bookId: string }> = ({ handleClose, bookId, cates, bookCates, index, realVoice, onlyAudio, hasBible }) => {   
  const [book, setBook] = useState([]);     

  const getBookDetail = async () => {          
    await getDocs(collection(db, bookId))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id }));
        setBook(newData);                   
    })      
  }
  const getFireData = async () => {    
    const docRef = doc(db, "originVoice", id);  
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setBook(docSnap.data())
    }    
  }

  const handleMaskClick = () => {
    handleClose();
  }

  useEffect(() => {
    getBookDetail()
    // if (realVoice) {
    //   getFireData();
    // } else {
    //   getBookDetail();
    // }     
  }, []);

  return (
    <>
        <LayerList>
            <List>
            {book.map((book, index) => (
                <ListItem key={index}>
                  <Link to={`/ReadCommon/${book.id}`}  
                    state={{ cates: cates, bookCates: book.subject, index: index, bookId: bookId, hasBible }} 
                    onClick={handleMaskClick}
                  >
                    {book.subject}
                  </Link>
                </ListItem>
              ))}               
            </List>        
        </LayerList>
        <LayerMask onClick={handleMaskClick} />
    </>
  )
}

export default BookSubCate;