
import styled from "styled-components";
// ui
import { Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface CateListProps {
    dataList: {
      bookId: string;
      subject: string; 
      id: string; 
    }[];
    realVoice: boolean;
    onlyAudio: boolean; 
    userAdds: boolean;   
}
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
const List = styled.ul `
display: block;
`;
const ListItem = styled.li `
font-size: 15px;
padding: 6px 0;
`
const CateList: React.FC<CateListProps> = ({ dataList, userAdds, realVoice, onlyAudio }) => {
  const navigate = useNavigate();

  const addPost = () => {
    const state = {      
      index: dataList.length,      
      bookCates: dataList.map((item) => item.bookcate)
    };
    navigate('/Form', { state });
  };

  return (
    <List>
      {dataList.map((book, index) => (
        <ListItem key={index}>
            {realVoice ? (
              <Link to={`/ReadCommon/${book.id}`} state={{ cates: book.subject, index: index, bookIds: book.bookId, realVoice, onlyAudio }}>
                {book.subject}
              </Link>
            ) : (
              <Link to={`/BookList/${book.id}`} state={{ cates: book.subject, index: index, bookIds: book.bookId, realVoice, onlyAudio }}>
                {book.subject}
              </Link>
            )} 
        </ListItem>
      ))} 
      {
        userAdds &&
          <ButtonArea>
            <Stack direction="row">          
                <Button variant="outlined" onClick={ addPost }>등록</Button>                                               
            </Stack>
          </ButtonArea> 
      }
    </List>
  );
}
export default CateList