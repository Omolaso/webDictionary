import React, { memo } from "react";
import spinner from "../svg/spinner.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const SearchedWord = ({ searchResult, loading, bgToggle }) => {
  //   console.log(searchResult);

  const getAudio = (param) => {
    let wordAudio;
    const playAudio = param.phonetics.find((item) => item.audio !== "");
    if (playAudio) {
      wordAudio = new Audio(playAudio.audio);
    }

    return wordAudio.play();
  };

  const output =
    searchResult &&
    searchResult.map((result, index) => (
      <section key={index} className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-5">
            <h1
              className={
                bgToggle
                  ? "text-[32px] font-bold text-black md:text-[48px]"
                  : "text-[32px] font-bold text-white md:text-[48px]"
              }
            >
              {result.word}
            </h1>
            <i className="text-[18px] font-bold text-purple md:text-[25px]">
              {result.phonetic}
            </i>
          </div>

          <button
            type="button"
            className="font-semibold text-white opacity-70 duration-300 hover:opacity-100 active:scale-90"
            onClick={() => getAudio(result)}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="rounded-full border-purple bg-purple p-4"
            />
          </button>
        </div>

        <div className="min-h-[30vh] border border-red"></div>
      </section>
    ));

  return (
    <main className="w-full">
      <section
        className={
          loading ? "flex min-h-[20vh] items-center justify-center" : "hidden"
        }
      >
        <img
          src={spinner}
          alt="Loading..."
          className={loading ? "block animate-spin" : "hidden"}
        />
      </section>

      <section>{output}</section>
    </main>
  );
};

export default memo(SearchedWord);
