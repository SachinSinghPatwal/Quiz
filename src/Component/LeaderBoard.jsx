import React, { useEffect, useState } from "react";
import { getAttempts, clearAttempts } from "../DB/IndexedDb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faMedal,
  faAward,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
function LeaderBoard() {
  const [attempt, setAttempts] = useState([]);

  // fetching data
  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const data = await getAttempts();
        // Sorting by highest score first
        setAttempts(data.sort((a, b) => b[1] - a[1]));
      } catch (error) {
        console.error("Error fetching attempts:", error);
      }
    };
    fetchAttempts();
  }, []);

  // icon based on index of IndexDB for top 3 players
  const getRankIcon = (index) => {
    if (index === 0)
      return (
        <FontAwesomeIcon
          icon={faTrophy}
          size="lg"
          className="text-yellow-500 mr-2"
        />
      );
    if (index === 1)
      return (
        <FontAwesomeIcon
          icon={faMedal}
          size="lg"
          className="text-gray-500 mr-2"
        />
      );
    if (index === 2)
      return (
        <FontAwesomeIcon
          icon={faAward}
          size="lg"
          className="text-orange-600 mr-2"
        />
      );
    return null;
  };

  // clearing data
  const deleteDB = async () => {
    await clearAttempts();
    setAttempts([]);
    console.log("All attempts cleared!");
  };

  return (
    <div className="sm:px-0 px-[.3rem]">
      <div className="grid place-items-center sm:mt-[1rem] ">
        <button
          className="border-[1px] border-gray-600 sm:px-[1rem] sm:py-[.25rem] sm:rounded-[5px] sm:grid gap-[.5rem] grid-flow-col items-center
        hover:scale-[1.07] transition-[scale] duration-300 hover:cursor-pointer
        hover:bg-green-300
        "
          onClick={() => window.location.reload()}
        >
          <FontAwesomeIcon icon={faClockRotateLeft} />
          Replay
        </button>
      </div>
      <div
        className="grid justify-between grid-flow-col sm:mx-[2rem] sm:mt-[1rem] 
        sm:mb-[2rem] items-center gap-[1rem] mx-[.2rem] my-[2rem]
      "
      >
        <h2 className="text-xl sm:text-[2rem] font-medium">Leaderboard</h2>
        <button
          onClick={deleteDB}
          className="hover:cursor-pointer border-gray-800 border-[2px] 
          sm:rounded-[10px] rounded-[5px] hover:bg-red-300 transition-colors duration-300 
          sm:px-[1rem] sm:py-[.5rem] px-[.1rem]"
        >
          Delete records
        </button>
      </div>
      <ul className="grid grid-flow-row justify-around sm:gap-[.5rem] gap-[.6rem]">
        {attempt.length > 0 ? (
          attempt.map((item, index) => (
            <li
              key={index}
              className="grid grid-flow-col h-[3rem] rounded-[10px] justify-center  sm:gap-[6rem] items-center 
              border-gray-600 border-[2px] sm:px-[1rem]
              hover:scale-[1.08] transition-[scale] duration-300 ease-in-out
              "
            >
              <div className="grid grid-flow-col ">
                {getRankIcon(index)}
                <span
                  className="sm:font-medium"
                  style={{ marginLeft: index > 2 && "1.4rem" }}
                >
                  Attempt: {index + 1}
                </span>
              </div>
              <div className="grid grid-flow-col sm:gap-[6rem]">
                <h1>Score: {item[1]} </h1>
                <div className="grid grid-flow-col gap-[.2rem]">
                  <div>(IST)</div>
                  {new Date(item[0]).toLocaleString("en-US", {
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "IST",
                  })}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No attempts recorded yet.</p>
        )}
      </ul>
    </div>
  );
}
export default LeaderBoard;
