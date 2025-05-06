"use client";

import { signInWithGithub } from "../actions";

const LoginPage = () => {
  return (
    <>
      <h1>Login page</h1>
      <button onClick={signInWithGithub}>깃허브 로그인</button>
    </>
  );
};

export default LoginPage;
