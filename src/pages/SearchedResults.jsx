import React, { memo } from "react";
import spinner from "../svg/spinner.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faLinkSlash } from "@fortawesome/free-solid-svg-icons";

const SearchedResults = ({
  searchResult,
  loading,
  bgToggle,
  userSignOut,
  errorMsg,
}) => {
  //   console.log(searchResult);

  const getAudio = (param) => {
    let wordAudio;
    const audioURL = param.phonetics.find((item) => item.audio !== "");
    if (audioURL) {
      wordAudio = new Audio(audioURL.audio);
    }

    return wordAudio.play();
  };

  const errorMessage = errorMsg && (
    <div
      className={
        bgToggle
          ? "flex flex-col items-center justify-center gap-5 text-center text-black"
          : "flex flex-col items-center justify-center gap-5 text-center"
      }
    >
      <h1 className="text-[20px] font-bold">No Definition Found</h1>
      <p className="text-[18px] font-bold">
        You can try the search again at later time or head to the google.
      </p>
    </div>
  );

  const arrOutput =
    searchResult &&
    searchResult.map((result, index) => (
      <section
        key={index}
        className={
          bgToggle
            ? "flex flex-col gap-6 text-black"
            : "flex flex-col gap-6 text-white"
        }
      >
        <div className="flex min-h-[10vh] flex-row items-center justify-between">
          <div className="flex flex-col gap-5">
            <h1 className="text-[32px] font-bold md:text-[48px]">
              {result.word}
            </h1>
            <i className="text-[18px] font-bold text-purple md:text-[25px]">
              {result.phonetic}
            </i>
          </div>

          <button
            type="button"
            disabled={userSignOut ? true : false}
            onClick={() => getAudio(result)}
            className={
              result.phonetics.find((item) => item.audio !== "")
                ? "block font-semibold text-white opacity-70 duration-300 hover:opacity-100 active:scale-90"
                : "hidden"
            }
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="rounded-full border-purple bg-purple p-4"
            />
          </button>
        </div>

        <div className="flex min-h-[20vh] w-full flex-col gap-8">
          {result.meanings.map((meaning, index) => (
            <div key={index} className="flex w-full flex-col gap-6">
              <div className="flex w-full flex-row flex-wrap items-center justify-between gap-4">
                <h1 className="text-[20px]">{meaning.partOfSpeech}</h1>
                <div className="ml-6 w-full max-w-[500px]">
                  <hr
                    className={
                      bgToggle
                        ? "w-full border-[0.1px] border-black"
                        : "w-full border-[0.1px] border-grey"
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <small className="text-[15px] text-grey">
                  {meaning.definitions.length > 1 ? "Meanings:" : "Meaning:"}
                </small>
                <ul className="flex flex-col gap-8">
                  {meaning.definitions.map((item) => (
                    <div key={item.definition}>
                      <li className="">{item.definition}</li>
                      <i className="text-grey">
                        {item.example && item.example}
                      </i>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className=" flex min-h-[10vh] w-full flex-col items-start justify-between border-t border-grey py-2">
          <p className="text-grey underline">Source</p>
          {result.sourceUrls.map((source) => (
            <p key={source} className="flex flex-row flex-wrap">
              {source}
              <a
                href={source}
                target="_blank"
                rel="noreferrer"
                className="ml-2"
              >
                <FontAwesomeIcon icon={faLinkSlash} />
              </a>
            </p>
          ))}
        </div>
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

      <section>{arrOutput}</section>

      <section>{errorMessage}</section>
    </main>
  );
};

export default memo(SearchedResults);
