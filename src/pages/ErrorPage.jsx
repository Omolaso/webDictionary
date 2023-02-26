import React from "react";
import { dictionaryURLs } from "../URLS";
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-black p-4 font-mono text-[16px] font-medium text-grey md:p-8 md:text-[20px] md:font-semibold">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button
        type="button"
        onClick={() => navigate(dictionaryURLs.login)}
        className="min-h-[60px] w-full max-w-xs rounded-[6px] border text-[18px] font-medium duration-500 ease-out hover:opacity-70 active:scale-95 md:rounded-[10px] md:text-[24px] md:font-semibold"
      >
        Back To Login
      </button>
    </main>
  );
};

export default ErrorPage;
