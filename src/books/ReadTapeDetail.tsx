import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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

const ReadTapeDetail: React.FC = () => {  
  const [book, setBook] = useState(null);
  const { typeId } = useParams();
  const location = useLocation();
  const { cates, index } = location.state;

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`https://nosy-billowy-bun.glitch.me/tape`);
      console.log(response.data);
      setBook(response.data);
    };
    fetchBook();
  }, [typeId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className='book-content'>
      <SubTitle>
        {cates}
      </SubTitle>
      <BookContent dangerouslySetInnerHTML={{ __html: book[index].content }} />  
    </div>
  )
}

export default ReadTapeDetail;
