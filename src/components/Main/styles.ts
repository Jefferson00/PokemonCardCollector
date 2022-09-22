import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  min-height: 100vh;
  margin: 0 auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
`;

export const ButtonBox = styled.button`
  width: 11.5rem;
  height: 16.4rem;
  border-radius: 8px;

  border: none;
  border-top: 10px solid #ff842b;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(249, 195, 60, 1) 100%
  );
`;

export const CardList = styled.div`
  display: flex;

  justify-content: center;
  width: 100%;
  min-height: 262px;
  gap: 1rem;

  margin: 2rem auto;

  background: #ffffff20;

  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 0;

  button {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    border: none;
    align-self: center;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const AlbumList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2rem;
  gap: 1rem;
`;

export const RegionList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  gap: 1rem;
`;

interface RegionSelectorProps {
  spanText: string;
}

export const RegionSelector = styled.button<RegionSelectorProps>`
  position: relative;
  padding: 0 0.5rem;
  border: 0;
  border-radius: 8px;

  &::after {
    content: "${(props) => props.spanText}";
    position: absolute;
    top: -180%;
    left: -10%;
    font-size: 0.75rem;
    background: #d2d2d2;
    padding: 0.5rem;
    opacity: 0;
    width: 4rem;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const AlbumItem = styled.div`
  width: 11.5rem;
  height: 16.4rem;
  background-color: #ff842b;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Pagination = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 2rem;
  padding-bottom: 2rem;

  gap: 2rem;

  button {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    border: none;
    align-self: center;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export const SortButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 0.85rem 2rem;

  background-color: #ff842b;
  color: #fff;
  font-weight: 600;
`;
