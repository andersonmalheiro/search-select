import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const EmptyResults = styled.span`
  font-size: 14px;
  padding: 5px 0;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchInput = styled.input<{ showResults: boolean }>`
  width: calc(100% - 20px);
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 0 10px;
  height: 30px;
  background: #fff;
  border-radius: ${({ showResults }) => (showResults ? '6px 6px 0 0' : '6px')};
  font-size: 14px;
  z-index: 20;
  position: absolute;
  transition: all 0.3s ease-in-out;
  outline: none;

  &:placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

export const SearchInputLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
`;

export const Results = styled.div`
  align-self: center;
  background: #fff;
  border-radius: 0 0 6px 6px;
  max-height: 150px;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
  color: #6f738c;
  padding: 5px 10px;
  position: absolute;
  top: 30px;
  width: calc(100% - 20px);
  transition: all 0.3s ease-in-out;

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    list-style: none;
    padding: 10px;

    &:hover {
      background: #f0f1f4;
    }
  }
`;

export const TagContainer = styled.div`
  width: inherit;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 40px;
`;

export const Tag = styled.span`
  border-radius: 30px;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #4db6ac;
  color: #ffffff;
  width: fit-content;

  button {
    border-radius: 50%;
    background: transparent;
    height: 15px;
    width: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: #ffffff;
    cursor: pointer;
    line-height: 1;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;
