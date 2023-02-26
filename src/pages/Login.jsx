import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { dictionaryURLs } from "../URLS";

const Login = () => {
  const [bgToggle, setBgToggle] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <main
      className={
        bgToggle
          ? "flex min-h-screen flex-col gap-8 bg-white p-4 font-mono md:p-8"
          : "flex min-h-screen flex-col gap-8 bg-black p-4 font-mono md:p-8"
      }
    >
      <section className="flex flex-row items-center justify-end gap-4">
        <button
          type="button"
          title="Toggle Mode"
          onClick={() => setBgToggle(!bgToggle)}
          className={
            bgToggle
              ? "flex min-h-[10px] w-full max-w-[40px] items-center self-end rounded-xl bg-white p-[3px] text-grey shadow-[0px_0px_0px_2px_] shadow-purple"
              : "flex min-h-[10px] w-full max-w-[40px] items-center self-end rounded-xl bg-purple p-[3px] text-grey shadow-[0px_0px_0px_2px_] shadow-purple"
          }
        >
          <div
            className={
              bgToggle
                ? "h-full min-h-[1rem] w-full max-w-[1rem] translate-x-[1.1rem] rounded-full bg-purple transition duration-300 ease-linear"
                : "h-full min-h-[1rem] w-full max-w-[1rem] rounded-full bg-white transition duration-300 ease-linear"
            }
          />
        </button>
        <FontAwesomeIcon icon={faMoon} className="text-[16px] text-purple" />
      </section>

      <section className="flex items-start justify-center text-grey md:items-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-artsy-text-greyBlack text-center text-[30px] font-bold md:text-left md:text-[48px] md:font-medium">
            Login to access your dictionary!
          </h1>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-4"
          >
            <label
              htmlFor="email"
              className="flex flex-col gap-1 text-[16px] font-medium md:text-[20px] md:font-semibold"
            >
              Email:
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                placeholder="johndoe@gmail.com"
                className="min-h-[50px] rounded-lg bg-[transparent] px-3 shadow-[0px_0px_0px_2px_] shadow-grey placeholder:font-extralight placeholder:opacity-50 placeholder:duration-500 hover:shadow-purple focus:outline-0 focus:placeholder:opacity-0 focus:placeholder:duration-500"
                autoComplete="off"
              />
            </label>

            <label
              htmlFor="password"
              className="flex flex-col gap-1 text-[16px] font-medium md:text-[20px] md:font-semibold"
            >
              Password:
              <div className="flex min-h-[50px] items-center justify-center gap-4 rounded-lg bg-[ransparent] px-3 shadow-[0px_0px_0px_2px_] shadow-grey  hover:shadow-purple">
                <input
                  type={passwordToggle ? "text" : "password"}
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="xxxxxxxxxxx"
                  className="h-full flex-1 bg-[transparent] placeholder:font-extralight placeholder:opacity-50 placeholder:duration-500 focus:outline-0 focus:placeholder:opacity-0 focus:placeholder:duration-500"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setPasswordToggle(!passwordToggle)}
                  className="text-[16px]"
                >
                  {passwordToggle ? "HIDE" : "SHOW"}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="mt-8 min-h-[50px] w-full rounded-[6px] border text-[18px] font-medium duration-500 ease-out active:scale-95 md:min-h-[60px] md:rounded-[10px] md:text-[24px] md:font-semibold"
            >
              Log In
            </button>
          </form>

          <span className="flex flex-row gap-2 text-[16px] font-medium md:text-[20px] md:font-semibold">
            Don&apos;t have an account?
            <Link to={dictionaryURLs.signUp} className="link">
              Create One!
            </Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Login;
