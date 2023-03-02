import React, { useEffect } from "react";
// import { auth } from "../firebase";

const Dictionary = () => {
  // https://api.dictionaryapi.dev/api/v2/entries/en/<word>

  useEffect(() => {
    console.log("HI");
  }, []);

  return (
    <main className="min-h-screen bg-black p-4 text-grey md:p-8">
      Dictionary
    </main>
  );
};

export default Dictionary;
