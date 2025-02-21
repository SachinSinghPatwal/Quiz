import React, { useEffect, useState } from "react";
import { allQuestions } from "../Questions/Questions";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../Store/Slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { setCorrectAnswer } from "../Store/Slice";
import { saveAttempt } from "../DB/IndexedDb";
function Options({ questionNumber, setQuestionNumber }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const userCorrectAnswers = useSelector(
    (state) => state.quiz.correctAnswersCount
  );
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const options = allQuestions
    .filter((questions) => questions.options !== undefined)
    .map((question) => question.options);
  const dispatch = useDispatch();

  // indexDB
  const saveUserAttempt = async (...attemptData) => {
    try {
      await saveAttempt(attemptData);
      console.log("Attempt saved successfully!");
    } catch (error) {
      console.error("Error saving attempt:", error);
    }
  };

  // resetting MCQ styles
  useEffect(() => {
    setSelectedOption(null);
  }, [setQuestionNumber, questionNumber]);

  // Integer type input questions
  const handleKeydown = (e) => {
    setInputValue("");
    if (e.key == "Enter") {
      dispatch(
        setCorrectAnswer(
          allQuestions[questionNumber - 1]?.answer == Number(inputValue)
            ? userCorrectAnswers + 1
            : userCorrectAnswers
        )
      );
      if (questionNumber == 10) {
        saveUserAttempt(Date.now(), userCorrectAnswers);
      }
      setQuestionNumber((prev) => prev + 1);
    }
    return;
  };

  // MCQ options
  const answerClicked = (each) => {
    dispatch(
      setCorrectAnswer(
        allQuestions[questionNumber - 1].answer == each
          ? userCorrectAnswers + 1
          : userCorrectAnswers
      )
    );
    setIsOptionDisabled(true);
    setSelectedOption(each);
    setTimeout(() => {
      setQuestionNumber((prev) => prev + 1);
      dispatch(setTime(30));
      setIsOptionDisabled(false);
    }, 600);
  };
  return (
    <div className="my-[2rem] grid gap-[1rem] ">
      {questionNumber > 5 && questionNumber <= 10 && (
        <div className="grid gap-[.5rem] grid-flow-col justify-items-start w-fit">
          <label className="ml-[2rem]">Answer: </label>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && handleKeydown(e)}
            type="number"
            className={`border-b-[1px] border-gray-800
            focus:outline-none w-[90%]
          `}
          />
        </div>
      )}
      {questionNumber <= 5 &&
        options[questionNumber - 1].map((each) => (
          <div
            onClick={() => !isOptionDisabled && answerClicked(each)}
            key={each}
            className={`mx-[3rem] border-gray-800 border-[1px] 
                  rounded-[10px] h-[4rem] grid items-center 
                  pl-[1rem] transition-[scale] duration-300 cursor-pointer
                hover:scale-[1.02]  ${
                  selectedOption
                    ? each === allQuestions[questionNumber - 1].answer
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                    : "bg-white"
                }
                `}
            style={{
              gridTemplateColumns: selectedOption ? "25px auto" : "auto",
            }}
          >
            {selectedOption ? (
              each === allQuestions[questionNumber - 1].answer ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "green" }}
                  size="lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ color: "red" }}
                  size="lg"
                />
              )
            ) : null}
            {each}
          </div>
        ))}
    </div>
  );
}

export default Options;
