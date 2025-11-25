import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  ${(props) =>
    props.type === "fileUpload" &&
    css`
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      padding: 1.2rem 0;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }
    `}

  ${(props) =>
    props.type === "regular" &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: 24rem 1fr 1.2fr;
      gap: 2.4rem;

      padding: 1.2rem 0;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }

      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.p`
  margin-top: 0.4rem;
  color: var(--color-red-600);
  font-size: 1.4rem;
`;

function FormRow({ type, label, children, error }) {
  return (
    <StyledFormRow type={type}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
