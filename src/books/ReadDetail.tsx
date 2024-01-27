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
const ReadDetail: React.FC = () => {  
  const [book, setBook] = useState(null);
  const { bookLisId } = useParams();
  const location = useLocation();
  const subject = location.state ? location.state.subject : null;
  const index = location.state ? location.state.index : null;

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`https://tasty-tricolor-tango.glitch.me/bookcontent${bookLisId}`);
      console.log(response.data);
      setBook(response.data);
    };
    fetchBook();
  }, [bookLisId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className='book-content'>
      <SubTitle>
        {subject ? subject : 'Loading...'}{index ? index : ''}
      </SubTitle>
      {book}
    </div>
  )
}

export default ReadDetail;
