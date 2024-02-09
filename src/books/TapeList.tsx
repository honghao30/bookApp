import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OtherList: React.FC = ({ tapeList }) => {

const List = styled.ul `
  display: block;
`;
const ListItem = styled.li `
  font-size: 15px;
  padding: 6px 0;
`

  return (
    <List>
      {tapeList.map((book: {
        [x: string]: ReactNode; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
}, index: Key | null | undefined) => (
        <ListItem key={index}>
          <Link to={`/ReadTapeDetail/${book.id}`} state={{ cates: book.subject, index: index, bookId: book.id }}>
            {book.subject} {book.id} 
          </Link>
        </ListItem>
      ))}            
    </List>
    
  );
}
export default OtherList