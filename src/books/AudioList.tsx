import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AudioLists: React.FC = ({ audioList }) => {

const List = styled.ul `
  display: block;
`;
const ListItem = styled.li `
  font-size: 15px;
  padding: 6px 0;
`

  return (
    <List>
      {audioList.map((audio: {
        [x: string]: ReactNode; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
}, index: Key | null | undefined) => (
        <ListItem key={index}>
          <Link to={`/DetailListAudio/${audio.audioId}`} state={{ cates: audio.subject, index: index }}>
            {audio.subject} 
          </Link>
        </ListItem>
      ))}            
    </List>
    
  );
}
export default AudioLists