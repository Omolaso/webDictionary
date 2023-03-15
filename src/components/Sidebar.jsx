import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { dictionaryURLs } from "../URLS";
import closeIcon from "../svg/closeIcon.svg";

const Sidebar = ({ userSignOut, setUserSignOut, setToggleSidebar }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserSignOut(false);
        navigate(dictionaryURLs.home);
      })
      .catch((err) => console.log("Error:", err))
      .finally(() => setUserSignOut(false));
  };

  const removeHandleSignOutPrompt = () => {
    setUserSignOut(false);
  };

  const handleLogoutModalPrompt = () => {
    setUserSignOut(true);
  };

  return (
    <main className="relative flex items-center justify-center">
      <section
        className={
          userSignOut
            ? "mx-auto flex min-h-screen w-full max-w-4xl items-start justify-start p-5 blur-lg duration-300"
            : "mx-auto flex min-h-screen w-full max-w-4xl items-start justify-start p-5 duration-300"
        }
      >
        <ul className="flex w-full flex-col gap-5">
          <li className="self-end">
            <button
              type="button"
              className="rounded-full bg-purple p-3 font-semibold text-white duration-300 hover:opacity-90 active:scale-95"
              disabled={userSignOut ? true : false}
              title="Close Modal"
              onClick={() => setToggleSidebar(false)}
            >
              <img src={closeIcon} alt="close" />
            </button>
          </li>

          <li className="">
            <button
              type="button"
              className="rounded-lg bg-purple p-3 font-semibold text-white duration-300 hover:opacity-90 active:scale-95"
              disabled={userSignOut ? true : false}
              onClick={() => navigate(dictionaryURLs.storedWords)}
            >
              Check Your Searched Words
            </button>
          </li>

          <li className="">
            <button
              type="button"
              className="rounded-lg bg-purple p-3 font-semibold text-white duration-300 hover:opacity-90 active:scale-95"
              disabled={userSignOut ? true : false}
              onClick={() => handleLogoutModalPrompt()}
            >
              Logout
            </button>
          </li>
        </ul>
      </section>

      {/* signOut Toggle Logic */}
      <section
        className={
          userSignOut
            ? "fixed flex min-h-[150px] w-full max-w-[300px] scale-[1] items-center justify-center rounded-lg bg-white p-4 shadow-[0px_0px_0px_2px_] shadow-purple duration-500 ease-in-out"
            : "fixed flex min-h-[150px] w-full max-w-[300px] scale-[0] items-center justify-center rounded-lg bg-white p-4 shadow-[0px_0px_0px_2px_] shadow-purple duration-500 ease-in-out"
        }
      >
        <div className="flex min-h-[120px] w-full flex-col items-center justify-between">
          <h1>Confirm log out</h1>
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
              onClick={() => removeHandleSignOutPrompt()}
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

export default Sidebar;
