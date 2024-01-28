import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NoteList: React.FC = ({ noteList }) => {

const List = styled.ul `
  display: block;
`;
const ListItem = styled.li `
  font-size: 15px;
  padding: 6px 0;
`

  return (
    <List>
      {noteList.map((note: {
        [x: string]: ReactNode; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
}, index: Key | null | undefined) => (
        <ListItem key={index}>
          <Link to={`/DetailListNote/${note.noteId}`} state={{ cates: note.title }}>          
            {note.title} 
          </Link>
        </ListItem>
      ))}            
    </List>
  );
}
export default NoteList