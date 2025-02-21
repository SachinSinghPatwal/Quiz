import React, { useEffect, useState } from "react";
import { allQuestions } from "../Questions/Questions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../Store/Slice";
import LeaderBoard from "./LeaderBoard";
function Questions({ questionNumber, setQuestionNumber }) {
  const CurrentTime = useSelector((state) => state.quiz.time);
  const dispatch = useDispatch();

  // to prevent timeOut pilling / for clean up
  let timer;

  // setting timer on each question and mounting new questions on ran out
  useEffect(() => {
    if (CurrentTime <= 0) {
      setTimeout(() => {
        dispatch(setTime(30));
        setQuestionNumber((prev) => prev + 1);
      }, 999);
    } else if (CurrentTime > 0 && questionNumber <= 10) {
      timer = setInterval(() => {
        dispatch(setTime(CurrentTime - 1));
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [CurrentTime]);

  return (
    <div>
      {questionNumber <= 10 ? (
        <div className="grid grid-flow-col justify-between items-center mr-[6rem]">
          <h3
            className="p-[1.5rem] pt-[2rem] text-[16px] text-gray-500 
            font-medium"
          >
            Questions {questionNumber} out of {allQuestions.length}
          </h3>
          <div className="grid grid-cols-[1rem_1rem] justify-center gap-[.7rem] items-center ">
            <FontAwesomeIcon
              icon={faClock}
              size="lg"
              style={{ color: "black" }}
            />
            <h1 className="text-[19px]">{CurrentTime}s</h1>
          </div>
        </div>
      ) : (
        <LeaderBoard />
      )}
      <h1 className="px-[2rem] pt-[.1rem] text-[1.6rem]">
        {allQuestions.map((q) =>
          q.id == questionNumber && questionNumber <= 10
            ? `${q.id}. ${q.questions}`
            : null
        )}
      </h1>
    </div>
  );
}

export default Questions;
