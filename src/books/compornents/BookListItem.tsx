import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const ListItem = styled.li `
  font-size: 15px;
  padding: 6px 0;
`

const BookListItem = ({ book, onlyAudio, cates, bookIds, hasBible }) => (
  <ListItem>
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
);

export default BookListItem;
