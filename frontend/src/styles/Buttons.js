import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  font-size: 1.2rem;
  font-weight: 300;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textSecondary};
  cursor: pointer;
  border: none;
  padding: 10px 24px;
  width: auto;
`

export default Button;