import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "fileUpload" &&
    css`
      width: 50rem;
    `}

  padding: 2.4rem 4rem;

  /* Box */
  background-color: var(--color-grey-0);
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
