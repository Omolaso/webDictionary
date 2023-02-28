import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle, faMoon } from "@fortawesome/free-regular-svg-icons";
import { dictionaryURLs } from "../URLS";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const [bgToggle, setBgToggle] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);
  const [accountFail, setAccountFail] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const emailRegExp =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;

  const passwordRegExp = /^.{8,}$/;
  // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; FULL PASSWORD REGEX

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(emailRegExp, "Invalid email address"),

      password: Yup.string()
        .required("Required")
        .matches(passwordRegExp, "Minimum of 8 characters."),
    }),

    onSubmit: () => {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          // console.log(userDetails);
          setAccountSuccess(true);

          setTimeout(() => {
            setAccountSuccess(false);
          }, 5000);
        })
        .catch((err) => {
          console.log("Error:", err);
          setAccountFail(true);

          setTimeout(() => {
            setAccountFail(false);
          }, 5000);
        })
        .finally(() => {
          setAccountSuccess(false);
          setAccountFail(false);
        });
    },
  });

  return (
    <main
      className={
        bgToggle
          ? "relative flex min-h-screen flex-col gap-8 bg-white p-4 font-mono md:p-8"
          : "relative flex min-h-screen flex-col gap-8 bg-black p-4 font-mono md:p-8"
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
            Sign up for the best experience!
          </h1>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-[16px] font-medium text-red">
                  {formik.errors.email}
                </div>
              ) : null}
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
                  {...formik.getFieldProps("password")}
                />
                <button
                  type="button"
                  onClick={() => setPasswordToggle(!passwordToggle)}
                  className="text-[16px]"
                >
                  {passwordToggle ? "HIDE" : "SHOW"}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-[16px] font-medium text-red">
                  {formik.errors.password}
                </div>
              ) : null}
            </label>

            <button
              type="submit"
              className="mt-8 min-h-[50px] w-full rounded-[6px] border text-[18px] font-medium duration-500 ease-out active:scale-95 md:min-h-[60px] md:rounded-[10px] md:text-[24px] md:font-semibold"
            >
              Create account
            </button>
          </form>

          <span className="flex flex-row gap-2 text-[16px] font-medium md:text-[20px] md:font-semibold">
            Already have an account?
            <Link to={dictionaryURLs.login} className="link">
              Login!
            </Link>
          </span>
        </div>
      </section>

      {/* SUCCESS MESSAGE FOR ACCOUNT CREATION SUCCESS */}
      <div
        className={
          accountSuccess
            ? "fixed top-[2%] left-[10%] flex min-h-[50px] w-full max-w-[200px] flex-col bg-green p-2 text-white duration-300 md:left-[30%] md:max-w-[420px]"
            : "fixed top-[-50%] left-[10%] flex w-full max-w-[200px] flex-col bg-green p-2 text-white duration-300 md:left-[30%] md:max-w-[420px]"
        }
      >
        <button
          type="button"
          onClick={() => setAccountSuccess(false)}
          className="self-end"
        >
          <FontAwesomeIcon icon={faXmarkCircle} />
        </button>
        <h1>Account created successfully. Proceed to login page.</h1>
      </div>

      {/* ERROR MESSAGE FOR ACCOUNT CREATION FAILURE */}
      <div
        className={
          accountFail
            ? "fixed top-[2%] left-[10%] flex min-h-[50px] w-full max-w-[200px] flex-col bg-red p-2 text-white duration-300 md:left-[30%] md:max-w-[420px]"
            : "fixed top-[-50%] left-[10%] flex w-full max-w-[200px] flex-col bg-red p-2 text-white duration-300 md:left-[30%] md:max-w-[420px]"
        }
      >
        <button
          type="button"
          onClick={() => setAccountFail(false)}
          className="self-end"
        >
          <FontAwesomeIcon icon={faXmarkCircle} />
        </button>
        <h1>There was an error, please try again.</h1>
      </div>
    </main>
  );
};

export default SignUp;
