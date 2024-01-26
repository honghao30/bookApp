import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
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
          {note.title || note.subject} 
        </ListItem>
      ))}            
    </List>
  );
}
export default NoteList