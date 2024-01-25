import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import styled from "styled-components";

const InsetList: React.FC = ({ dataList }) => {

const List = styled.ul `
  display: block;
`;
const ListItem = styled.li `
  font-size: 14px;
`

  return (
    <List>
      {dataList.map((book: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
        <ListItem key={index}>
          {book.cates} 
        </ListItem>
      ))}            
    </List>
  );
}
export default InsetList