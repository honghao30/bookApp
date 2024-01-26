import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookMain: React.FC = () => {  
    const [book, setBook] = useState(null);
    const { book_id } = useParams();
  
    useEffect(() => {
      console.log(`${book_id}`)
      const fetchBook = async () => {
        const response = await axios.get(`https://factual-trail-jute.glitch.me/books/${book_id}`);
        setBook(response.data);
      };
      fetchBook();
    }, [book_id]);

    if (!book) {
      return <div>Loading...</div>;
    }

    return (
      <div className='book-content'>
        {/* 책의 세부 정보를 표시합니다 */}
        <h1>ddd</h1>
        <p>fff</p>
        {/* 기타 책의 세부 정보를 표시... */}
      </div>
    )
}

export default BookMain;
