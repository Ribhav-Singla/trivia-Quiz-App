
fetch(
  "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return data.results.map((item) => {
      return {
        question: item.question,
        options: [...item.incorrect_answers, item.correct_answer],
        correctAnswer: item.correct_answer,
      };
    });
  })
  .catch((err) => {
    console.log("err occured ", err);
  });


