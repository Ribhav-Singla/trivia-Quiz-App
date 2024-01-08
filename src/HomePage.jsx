/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function HomePage(props){
    // console.log(props);
    return(
        <>
        <div className="home--div">
            <h2 className=" text-7xl font-semibold">Quiz App</h2>
            <button onClick={props.handleStartQuiz} >Start Quiz</button>
        </div>
        </>
    )
}