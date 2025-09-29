import styled, { css } from "styled-components";

export const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 2rem;
      font-weight: 400;
      color: white;
      @media (max-width: 700px) {
        text-align: center;
        width: 360px;
      }
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 1.3rem;
      font-weight: 400;
      color: #11192d;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.1rem;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.2rem
      font-weight: 400;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
    `}
    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 1.3rem;
      font-weight: 400;
      color: white;
    `}
`;
