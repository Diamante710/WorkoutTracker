import styled from '@emotion/styled';

const Button = styled.button`
  background-color: ${props => props.theme.primaryColor};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.primaryColorHover};
  }
`;

function MyComponent() {
  return <Button>Click me</Button>;
}