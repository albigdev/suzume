import styled from "styled-components";

const FilterField = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const FilterLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-blue-800);
`;

const FilterDropDown = styled.select`
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-blue-800);
  font-size: 1.4rem;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: var(--color-brand-600);
  }

  &:has(option[value="default"]:checked) {
    color: var(--color-grey-400);
  }
`;

function Filter({ options = [], label, value, onChange, disabled = false }) {
  const selectedValue = disabled
    ? "default"
    : value === null
    ? "default"
    : value;

  const sortedOptions = (options || []).slice().sort((a, b) => {
    const sa = String(a.value);
    const sb = String(b.value);
    return sb.localeCompare(sa);
  });

  return (
    <FilterField>
      <FilterLabel htmlFor={`filter-${label}`}>{label}:</FilterLabel>
      <FilterDropDown
        id={`filter-${label}`}
        value={selectedValue}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="default" disabled>
          Select {label}
        </option>
        <option value="all">All</option>

        {sortedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FilterDropDown>
    </FilterField>
  );
}

export default Filter;
