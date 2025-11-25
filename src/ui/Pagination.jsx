import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  align-self: center;
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-red-700)" : "var(--color-blue-700)"};
  color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 0.6rem 1rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-red-700);
  }
`;

const StyledSelection = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem 0.8rem;
  font-size: 1.4rem;
  margin-right: 1.2rem;
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageSize = Number(searchParams.get("pageSize")) || PAGE_SIZE;

  const pageCount = Math.ceil(count / pageSize);

  const from = (currentPage - 1) * pageSize + 1;
  const to = currentPage === pageCount ? count : currentPage * pageSize;

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    const previous = currentPage === 1 ? 1 : currentPage - 1;
    searchParams.set("page", previous);
    setSearchParams(searchParams);
  }

  function selectPage(e) {
    const selectedPage = Number(e.target.value);
    searchParams.set("page", selectedPage);
    setSearchParams(searchParams);
  }

  function selectPageSize(e) {
    const val = e.target.value;
    const selectedSize = val === "all" ? Math.max(1, count) : Number(val);
    searchParams.set("pageSize", selectedSize);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const selectedPageSize =
    pageSize === count || pageSize > count ? "all" : String(pageSize);

  if (pageCount <= 1)
    return (
      <StyledPagination>
        <P>
          Showing all <span>{count}</span> entries
        </P>
        <StyledSelection onChange={selectPageSize} value={selectedPageSize}>
          <option value={PAGE_SIZE}>{PAGE_SIZE}</option>
          <option value={PAGE_SIZE * 2}>{PAGE_SIZE * 2}</option>
          <option value={PAGE_SIZE * 3}>{PAGE_SIZE * 3}</option>
          <option value={PAGE_SIZE * 4}>{PAGE_SIZE * 4}</option>
          <option value={PAGE_SIZE * 5}>{PAGE_SIZE * 5}</option>
          <option value="all">All</option>
        </StyledSelection>
      </StyledPagination>
    );

  return (
    <StyledPagination>
      <P>
        Showing <span>{from}</span> to <span>{to}</span> of total{" "}
        <span>{count}</span> entries
      </P>
      <ButtonsContainer>
        <P>Results per page</P>
        <StyledSelection onChange={selectPageSize} value={pageSize}>
          <option value={PAGE_SIZE}>{PAGE_SIZE}</option>
          <option value={PAGE_SIZE * 2}>{PAGE_SIZE * 2}</option>
          <option value={PAGE_SIZE * 3}>{PAGE_SIZE * 3}</option>
          <option value={PAGE_SIZE * 4}>{PAGE_SIZE * 4}</option>
          <option value={PAGE_SIZE * 5}>{PAGE_SIZE * 5}</option>
          <option value="all">All</option>
        </StyledSelection>
        <P>Select page</P>
        <StyledSelection onChange={selectPage} value={currentPage}>
          {Array.from({ length: pageCount }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </StyledSelection>
        <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
        </PaginationButton>
      </ButtonsContainer>
    </StyledPagination>
  );
}

export default Pagination;
