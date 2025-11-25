import styled, { css } from "styled-components";

const sizes = {};

const variations = {
  tableButton: css`
    background: none;
    transition: color 0.2s;

    &:hover {
      color: var(--color-red-800);
    }
  `,
  modalButton: css`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
      background-color: var(--color-grey-100);
    }

    & svg {
      width: 2.4rem;
      height: 2.4rem;
      /* Sometimes we need both */
      /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
      color: var(--color-grey-500);
    }
  `,
  primary: css`
    background-color: var(--color-blue-700);
    color: var(--color-grey-0);
    padding: 1.2rem 2.4rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.6rem;
    font-weight: 400;
  `,
  danger: css`
    background-color: var(--color-red-700);
    color: #ffffff;
    padding: 1.2rem 2.4rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.6rem;
    font-weight: 600;
  `,
  signupBtn: css`
    background-color: var(--color-red-700);
    color: #ffffff;
    padding: 1.2rem 2.4rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.6rem;
    font-weight: 500;
  `,
  forgotBtn: css`
    text-align: center;
    background: none;
    border: none;
    color: var(--color-blue-700);
    font-size: 1.4rem;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 1.6rem;
  `,
};

const Button = styled.button`
  border: none;
  cursor: pointer;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
