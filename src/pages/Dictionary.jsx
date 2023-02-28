import React, { useEffect } from "react";
import { auth } from "../firebase";

const Dictionary = ({ onAuthStateChanged }) => {
  // https://api.dictionaryapi.dev/api/v2/entries/en/<word>

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <main className="min-h-screen bg-black p-4 text-grey md:p-8">
      Dictionary
    </main>
  );
};

export default Dictionary;
