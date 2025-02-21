import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import { useState } from "react";
import Questions from "./Component/Questions";
import Options from "./Component/Options";
function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  return (
    <>
      <div
        style={{ fontFamily: "Poppins, sans-serif" }}
        className="text-gray-900 bg-[#F3F4F6]"
      >
        <header
          className="grid grid-flow-col h-[10rem] w-full gap-[1rem] items-center 
      justify-center"
        >
          <FontAwesomeIcon icon={faBrain} size="4x" />
          <h1 className="md:text-[4rem] sm:text-[3rem] text-[2rem]">
            Quiz Competition
          </h1>
        </header>
        <main className="grid place-items-center w-screen h-[33.8rem] ">
          <div
            className=" h-fit xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] border-[1px] border-black 
        rounded-[1rem]"
          >
            <Questions
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
            />
            <Options
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
