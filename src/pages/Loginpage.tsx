import React, { useState } from 'react';
import styled from 'styled-components';
import { LOGIN } from '../lib/graphql/query/User';
import { useQuery, useMutation } from 'react-apollo';

const LoginBlock = styled.form`
  @media only screen and (min-width: 1920px) {
    display: flex;
    flex-direction: column;
    text-align: center;

    height: 52.22em;

    padding: 13em 38em;

    box-sizing: border-box;

    font-family: 'NanumSquareRound';
  }
`;

const LoginTitle = styled.h1``;

const LoginInput = styled.input`
  @media only screen and (min-width: 1920px) {
    padding: 0.3em 0.5em;
    margin: 1em 0em;

    width: 100%;
    height: 3em;

    font-size: 1.2em;

    box-sizing: border-box;
    border-radius: 16px;
    border: 0.1em solid #ddd;

    :focus {
      outline: #ccc;
      border: 0.1em solid #ccc;
    }
  }
`;

const LoginButton = styled.button`
  margin-top: 0.5em;

  width: 100%;

  background: #505afc;

  font-size: 2em;
  color: white;

  font-family: 'NanumSquareRound';

  height: 2em;

  border: none;
  border-radius: 16px;

  box-sizing: border-box;

  cursor: pointer;
`;

const Loginpage: React.FC = () => {
  const [login] = useMutation(LOGIN);

  const Login = async () => {
    try {
      const response = await login({
        variables: {
          id,
          password,
        },
      });

      localStorage.setItem('accessToken', response.data.login.token);
      window.location.href = 'http://localhost:3000/';
    } catch (err) {
      alert(err.networkError.result.errors[0].message);
    }
  };

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LoginBlock
      onSubmit={(e) => {
        e.preventDefault();
        Login();
      }}
    >
      <LoginTitle>로그인</LoginTitle>
      <LoginInput
        onChange={(e) => {
          setId(e.target.value);
        }}
        placeholder="아이디를 입력해주세요"
      />
      <LoginInput
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
      <LoginButton type="submit">로그인</LoginButton>
    </LoginBlock>
  );
};

export default Loginpage;
