import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .login-form {
    max-width: 300px;
    width: 300px;
    border: 1px solid grey;
    border-radius: 20px;
    padding: 10px;
    align-self: center;
  }

  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
`;

export default StyledDiv;
