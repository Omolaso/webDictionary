import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import SearchedWord from "./SearchedWord";
import { useNavigate } from "react-router-dom";
import { dictionaryURLs } from "../URLS";

const Dictionary = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [bgToggle, setBgToggle] = useState(false);
  const [userSignOut, setUserSignOut] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [errorMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    window.addEventListener("scroll", removeUserSignOutPrompt);
    window.addEventListener("resize", removeUserSignOutPrompt);

    return () => {
      checkUser();
      removeEventListener("scroll", removeUserSignOutPrompt);
      removeEventListener("resize", removeUserSignOutPrompt);
    };
  }, []);

  const handleSearch = () => {
    if (!inputValue) return;

    setSearchResult([]);
    setErrMsg(false);
    setLoading(true);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setErrMsg(true);
        throw response;
      })
      .then((data) => {
        setSearchResult(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
        // console.log("Error", err);
      })
      .finally(() => setLoading(false));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserSignOut(false);
        navigate(dictionaryURLs.home);
      })
      .catch((err) => console.log("Error:", err))
      .finally(() => setUserSignOut(false));
  };

  const removeUserSignOutPrompt = () => {
    setUserSignOut(false);
  };

  return (
    <main
      className={
        bgToggle
          ? "relative flex min-h-screen items-start justify-center bg-white p-6 font-sans text-grey md:p-8"
          : "relative flex min-h-screen items-start justify-center bg-black p-6 font-sans text-grey md:p-8"
      }
    >
      <section
        className={
          userSignOut
            ? "mx-auto flex w-full max-w-4xl flex-col gap-8 blur-lg"
            : "mx-auto flex w-full max-w-4xl flex-col gap-8"
        }
      >
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={() => setUserSignOut(true)}
            className="rounded-full border border-purple bg-purple p-2 font-semibold text-white"
          >
            {currentUser && currentUser.email.substring(0, 2).toUpperCase()}
          </button>

          <h1
            className={
              bgToggle
                ? "text-[18px] font-bold text-black md:text-[30px]"
                : "text-[18px] font-bold text-grey md:text-[30px]"
            }
          >
            WEB DICO.
          </h1>

          <button
            type="button"
            title="Toggle Mode"
            onClick={() => setBgToggle(!bgToggle)}
            disabled={userSignOut ? true : false}
            className={
              bgToggle
                ? "flex min-h-[10px] w-full max-w-[40px] items-center rounded-xl bg-white p-[3px] text-grey shadow-[0px_0px_0px_2px_] shadow-purple"
                : "flex min-h-[10px] w-full max-w-[40px] items-center rounded-xl bg-purple p-[3px] text-grey shadow-[0px_0px_0px_2px_] shadow-purple"
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
        </div>

        {/* <div className="flex w-full items-start justify-center text-grey md:items-center"> */}
        <div
          className={
            bgToggle
              ? "flex min-h-[60px] w-full flex-row items-center gap-4 rounded-xl bg-[transparent] px-3 shadow-[0px_0px_0px_2px_] shadow-black hover:shadow-purple md:rounded-3xl"
              : "flex min-h-[60px] w-full flex-row items-center gap-4 rounded-xl bg-[transparent] px-3 shadow-[0px_0px_0px_2px_] shadow-grey hover:shadow-purple md:rounded-3xl"
          }
        >
          <input
            type="text"
            name="word"
            id="word"
            placeholder="Search for any word..."
            readOnly={userSignOut ? true : false}
            className={
              bgToggle
                ? "min-h-[40px] min-w-[200px] flex-[1] bg-[transparent] px-3 text-[18px] text-black placeholder:font-extralight placeholder:opacity-50 placeholder:duration-500 focus:outline-0 focus:placeholder:opacity-0 focus:placeholder:duration-500 md:text-[22px]"
                : "min-h-[40px] min-w-[200px] flex-[1] bg-[transparent] px-3 text-[18px] placeholder:font-extralight placeholder:opacity-50 placeholder:duration-500 focus:outline-0 focus:placeholder:opacity-0 focus:placeholder:duration-500 md:text-[22px]"
            }
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            type="button"
            disabled={userSignOut ? true : false}
            className={
              bgToggle
                ? "flex-[0.05] text-[18px] text-black md:text-[30px]"
                : "flex-[0.05] text-[18px] md:text-[30px]"
            }
            onClick={() => handleSearch()}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
        {/* </div> */}

        <SearchedWord
          searchResult={searchResult}
          loading={loading}
          bgToggle={bgToggle}
          userSignOut={userSignOut}
          errorMsg={errorMsg}
        />
      </section>

      {/* signOut Toggle Logic */}
      <section
        className={
          userSignOut
            ? "fixed top-[30%] flex min-h-[150px] w-full max-w-[300px] scale-[1] items-center justify-center rounded-lg bg-white p-4 shadow-[0px_0px_0px_2px_] shadow-purple duration-500 ease-in-out"
            : "fixed top-[30%] flex min-h-[150px] w-full max-w-[300px] scale-[0] items-center justify-center rounded-lg bg-white p-4 shadow-[0px_0px_0px_2px_] shadow-purple duration-500 ease-in-out"
        }
      >
        <div className="flex min-h-[120px] w-full flex-col items-center justify-between">
          <h1>Do you want to log out?</h1>
          <div className="flex w-full max-w-[220px] items-center justify-between">
            <button
              type="button"
              onClick={() => handleSignOut()}
              className="h-full min-h-[50px] w-full max-w-[80px] rounded-md bg-purple text-white duration-500 hover:opacity-80"
            >
              Yes
            </button>

            <button
              type="button"
              onClick={() => removeUserSignOutPrompt()}
              className="h-full min-h-[50px] w-full max-w-[80px] rounded-md bg-purple text-white duration-500 hover:opacity-80"
            >
              No
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dictionary;
