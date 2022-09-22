import styled, { css, keyframes } from "styled-components";

interface ContainerProps {
  backgroundColor: string;
  isShine?: boolean;
}

const slide = keyframes`
0% {
  top: -30%;
    left: -30%;
}
	100% {
    top: -110%;
    left: -210%;
  }
`;

export const Container = styled.div<ContainerProps>`
  width: 11.5rem;
  height: 16.4rem;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 20px;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;

  padding: 0.5rem 0;
  overflow: hidden;

  cursor: pointer;

  ${(props) =>
    props.isShine &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: -110%;
        left: -210%;
        width: 200%;
        height: 200%;
        transform: rotate(30deg);

        background: rgba(255, 255, 255, 0.13);
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.13) 77%,
          rgba(255, 255, 255, 0.5) 92%,
          rgba(255, 255, 255, 0) 100%
        );
        animation-name: ${slide};
        animation-duration: 1.5s;
        animation-delay: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease;
        animation-direction: alternate-reverse;
      }
    `}
`;
