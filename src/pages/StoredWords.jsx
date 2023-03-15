import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dictionaryURLs } from "../URLS";

const StoredWords = ({ bgToggle }) => {
  const [words, setWords] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchedWords = Object.keys(localStorage);
    searchedWords && setWords(searchedWords);
  }, [reload]);

  if (words.length < 1 || !words) {
    return (
      <section
        className={
          bgToggle
            ? "flex min-h-screen flex-col items-center justify-center gap-8 bg-white font-sans text-black"
            : "flex min-h-screen flex-col items-center justify-center gap-8 bg-black font-sans text-grey"
        }
      >
        <h1 className="text-center text-[18px] font-bold md:text-[30px]">
          NO SEARCHED WORDS
        </h1>

        <button
          type="button"
          className="rounded-lg bg-purple p-3 font-semibold text-white duration-300 hover:opacity-90 active:scale-95"
          onClick={() => navigate(dictionaryURLs.dico)}
        >
          Back to Dico
        </button>
      </section>
    );
  }

  const mappedWords = words.map((word, index) => (
    <div
      key={index}
      className="flex w-full flex-row items-center justify-between"
    >
      <h2>{window.localStorage.getItem(word)}</h2>

      <button
        type="button"
        className="self-end rounded-lg bg-purple p-2 text-[16px] font-semibold text-white duration-300 hover:opacity-90 active:scale-95 md:text-[22px]"
        onClick={() => {
          window.localStorage.removeItem(word);
          setReload((prevReload) => !prevReload);
        }}
      >
        Remove
      </button>
    </div>
  ));

  return (
    <main
      className={
        bgToggle
          ? "flex min-h-screen items-start justify-center bg-white p-4 font-sans text-black md:p-6"
          : "flex min-h-screen items-start justify-center bg-black p-4 font-sans text-grey md:p-6"
      }
    >
      <section className="mx-auto flex h-full min-h-[95vh] w-full max-w-4xl flex-col justify-between gap-5">
        <div className="flex flex-col gap-6">
          <h1 className="self-center text-[18px] font-bold text-grey md:text-[30px]">
            {words.length > 1 ? "YOUR SEARCHED WORDS" : "YOUR SEARCHED WORD"}
          </h1>

          <section className="flex flex-col gap-6 text-[18px] md:text-[22px]">
            {mappedWords}
          </section>
        </div>

        <div
          className={
            words.length > 1
              ? "flex flex-row items-center justify-between"
              : "flex items-center justify-center"
          }
        >
          <button
            type="button"
            className={
              words.length > 1
                ? "block self-end rounded-lg bg-purple p-3 text-[16px] font-semibold text-white duration-300 hover:opacity-90 active:scale-95 md:text-[22px]"
                : "hidden self-end rounded-lg bg-purple p-3 font-semibold text-white duration-300 hover:opacity-90 active:scale-95"
            }
            onClick={() => {
              window.localStorage.clear();
              setReload((prevReload) => !prevReload);
            }}
          >
            Clear All
          </button>

          <button
            type="button"
            className="self-end rounded-lg bg-purple p-3 text-[16px] font-semibold text-white duration-300 hover:opacity-90 active:scale-95 md:text-[22px]"
            onClick={() => navigate(dictionaryURLs.dico)}
          >
            Back to Dico
          </button>
        </div>
      </section>
    </main>
  );
};

export default StoredWords;
