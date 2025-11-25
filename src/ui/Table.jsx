import { useContext } from "react";
import styled from "styled-components";
import { TableContext } from "../../contexts/TableContext";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const BaseRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 1.8rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(BaseRow)`
  padding: 1.2rem 2rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(BaseRow)`
  padding: 1rem 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 1.2rem 2rem;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

Table.Header = function TableHeader({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" as="header" $columns={columns}>
      {children}
    </StyledHeader>
  );
};

Table.Row = function TableRow({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
};

Table.Body = function TableBody({ data, render }) {
  if (!data || data.length === 0) return <Empty>No data available</Empty>;

  return <StyledBody>{data.map((item) => render(item))}</StyledBody>;
};

Table.Footer = function TableFooter({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
};

export default Table;
