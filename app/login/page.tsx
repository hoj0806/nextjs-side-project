"use client";

import { signInWithGithub } from "../actions";

const LoginPage = () => {
  return (
    <>
      <h1>Login page</h1>
      <form>
        <button formAction={signInWithGithub}>깃허브 로그인</button>
      </form>
    </>
  );
};

export default LoginPage;
