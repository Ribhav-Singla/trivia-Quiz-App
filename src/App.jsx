/* eslint-disable no-unused-vars */
import React from "react"
import Box from "./Box"
import HomePage  from "./HomePage"


export default function App(){

    const [ques , setQues] = React.useState([
        // {
        //     question : "How long is an IPv6 address?",
        //     options:[
        //         {
        //             optionValue: "128 bits",
        //             isSelected : false
        //         },
        //         {
        //             optionValue: "32 bits",
        //             isSelected : false
        //         }, 
        //         {
        //             optionValue: "64 bits",
        //             isSelected : false
        //         }, 
        //         {
        //             optionValue: "128 bytes",
        //             isSelected : false
        //         }
        //     ],
        //     correctAnswer:"128 bits",
        // }
    ])

    const[startQuiz,setStartQuiz] = React.useState(false)

    // console.log(ques);

    function handleStartQuiz(){
        setStartQuiz(prevStartQuiz => !prevStartQuiz);
    }

    

    const [trivia , setTrivia] = React.useState(false)

    // console.log(trivia);

    const [restartQuizTrigger, setRestartQuizTrigger] = React.useState(false);

    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                let questionArray = data.results.map((item)=>{
                    let arr = (item.incorrect_answers).map((opt)=>{
                        return {
                            optionValue : opt,
                            isSelected:false
                        }
                    })
                    arr.push({
                        optionValue : item.correct_answer,
                        isSelected:false
                    })
                    return {
                        question : item.question,
                        options : arr,
                        correctAnswer : item.correct_answer,
                    }
                })
                setQues(questionArray);
            })
            .catch((err)=>{
                console.log("err occured ",err);
            })
    },[restartQuizTrigger])

    const [correctques , setCorrectQues] = React.useState(0)

    

    function evaluateAnswer() {
        setQues((prevques) => {
            let updatedQues = prevques.map((item) => {
                let isCorrect = false;
                for (let i = 0; i < item.options.length; ++i) {
                    if (item.options[i].isSelected && item.options[i].optionValue === item.correctAnswer) {
                        isCorrect = true;
                        break;
                    }
                }
    
                return {
                    ...item,
                    correct: isCorrect,
                };
            });
    
            let totalCorrect = updatedQues.reduce((acc, item) => (item.correct ? acc + 1 : acc), 0);
            setCorrectQues(totalCorrect);
            return updatedQues;
        });

        setTrivia(prevTrivia => !prevTrivia)
    }

    function restartQuiz(){
        setCorrectQues(0);
        setTrivia(false);
        setStartQuiz(true);
        setRestartQuizTrigger(prevTrigger => !prevTrigger);
    }
    

    function handleSelect(questionIndex, selectedOptionIndex) {
        setQues((prevQues) => {
            return ques.map((item, index) => {
                return index === questionIndex
                    ? {
                          ...item,
                          options: item.options.map((option, i) => {
                              return i === selectedOptionIndex
                                  ? {
                                        ...option,
                                        isSelected: !option.isSelected,
                                    }
                                  : {...option}
                          }),
                      }
                    : item;
            });
        });
    }

    function shuffleArray(arr){
        for(let i=0;i<arr.length;++i){
            let randomIndex = Math.floor(Math.random()*4);
            let temp =arr[i];
            arr[i]=arr[randomIndex];
            arr[randomIndex] = temp;
        }
        return arr;
    }

    React.useEffect(()=>{
        setTimeout(()=>{
            setQues((prevQues) => {
                return prevQues.map((item) => {
                    let arr = shuffleArray(item.options);
                    let correctIndex = -1;
                    for(let i=0;i<arr.length;++i){
                        if(item.correctAnswer === arr[i].optionValue){
                            correctIndex=i;
                            break;
                        }
                    }

                  return {
                    ...item,
                    options: arr,
                    correctIndex : correctIndex
                  };
                });
              });
        },1000)
    },[restartQuizTrigger,startQuiz])
    

    const quesElements = ques.map((item,index)=>{
        return ( <Box 
                    key={item.question}
                    question={item.question}
                    options={item.options} 
                    questionIndex={index}
                    handleSelect={handleSelect} 
                    correct = {item.correct!=undefined ? item.correct? true : false :undefined }
                    correctIndex = {item.correctIndex}
                />)
    })

    return (
        <>
        {
            startQuiz ? 
               ( 
                <div className="test--container">
                    {quesElements}
                    <div className="btn-container">
                        <h3 className="font-semibold text-2xl z-10">Correct Anwers: {correctques}/{ques.length}</h3>
                        {
                            trivia ? 
                            (
                                <button onClick={restartQuiz}>Try Again</button>
                            )
                            :
                            <button onClick={evaluateAnswer}>Check Answer</button>
                        }
                    </div>
                </div>
                )
                :
                (
                <HomePage handleStartQuiz={handleStartQuiz}/>
                )
        }
        </>
    )
}


