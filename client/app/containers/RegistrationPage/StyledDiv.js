import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: #001529;

  h1 {
    color: white;
  }

  img {
    height: 150px;
  }

  form {
    max-width: 300px;
    width: 300px;
    border: 1px solid #4cbbcf;
    border-radius: 20px;
    padding: 10px;
    align-self: center;
  }

  input {
    width: 100%;
  }

  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
`;

export default StyledDiv;
