/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function Box(props) {
    // console.log(props);
  return (
    <>
      <main>
        <h2 className="text-2xl text-blue-900 font-bold">{props.question}</h2>
        <div className="option--box">
          {props.options.map((option, index) => (
            <div
              key={index}
              className="ques--option"
              onClick={() => props.handleSelect(props.questionIndex, index)}
              style={{
                backgroundColor: props.correct
                  ? props.correctIndex === index
                    ? "rgb(178, 246, 178)"
                    : "white"
                  : props.correct === false
                  ? props.correctIndex === index
                    ? "rgb(178, 246, 178)"
                    : option.isSelected
                    ? "rgb(254, 195, 191)"
                    : "white"
                  : option.isSelected
                    ? "rgb(206, 206, 250)"
                    : "white",
              }}
            >
              {option.optionValue}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
