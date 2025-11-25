import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import styled from "styled-components";

const StyledSortHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & svg {
    margin-left: 0.4rem;
    width: 1.2rem;
    height: 1.2rem;
    color: var(--color-grey-500);
  }

  &:hover {
    color: var(--color-grey-800);
  }
`;

function TableSortHeader({ children, sortKey, sortBy, sortDirection, onSort }) {
  const isActive = sortBy === sortKey;

  return (
    <StyledSortHeader onClick={() => onSort(sortKey)}>
      {children} {isActive && sortDirection === "asc" && <FaArrowUp />}
      {isActive && sortDirection === "desc" && <FaArrowDown />}
    </StyledSortHeader>
  );
}

export default TableSortHeader;
