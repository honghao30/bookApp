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

const DetailListAudio: React.FC = () => {  
    const [audioBook, setAudioBook] = useState(null);
    const { audioId } = useParams();
    const location = useLocation();
    const { cates, index } = location.state;
    
    useEffect(() => {
      const fetchBook = async () => {
        const response = await axios.get(`https://nosy-billowy-bun.glitch.me/audioCont${audioId}`);
        setAudioBook(response.data);
        console.log(response.data)
      };
      fetchBook();
    }, [audioId]);

    if (!audioBook) {
      return <div>Loading...</div>;
    }

    return (
      <div className='book-content'>
        <SubTitle>
          {cates}
        </SubTitle>
           <List>
            {audioBook.map((book, index) => (
              <ListItem key={index}>
                  {/* {book.title}       */}
                  <div>                    
                  <iframe 
                    src={`https://player.audiop.naver.com/player?cpId=audioclip&cpMetaId=${book.url}&partnerKey=f8ae3b53&partnerId=audioclip&extra=`} 
                    title="오디오 플레이어" 
                    width="100%" 
                    height="160px">
                </iframe>                    
                  </div>          
              </ListItem>
            ))}            
          </List>
      </div>
    )
}

export default DetailListAudio;
