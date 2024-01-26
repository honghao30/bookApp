import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import styled from "styled-components";

const InsetList: React.FC = ({ dataList }) => {

const List = styled.ul `
  display: block;
`;
const ListItem = styled.li `
  font-size: 15px;
  padding: 6px 0;
`

  return (
    <List>
      {dataList.map((book: {
        [x: string]: ReactNode; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
}, index: Key | null | undefined) => (
        <ListItem key={index}>
          {book.cates} 
        </ListItem>
      ))}            
    </List>
  );
}
export default InsetList