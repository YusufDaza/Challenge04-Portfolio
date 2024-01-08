document.addEventListener("DOMContentLoaded", function () {

    const timerElement = document.getElementById("time-left");
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const submitButton = document.getElementById("submit-btn");
    const scoreInputElement = document.getElementById("score-input");


    const questions = [
        {
            question: "What does API stand for?",
            choices: ["Application Programming Interface", "Advanced Programming Interface", "Automated Processing Interface", "All Purpose Interface"],
            correctAnswer: "Application Programming Interface"
        },
        {
            question: "Which of the following is a front-end framework?",
            choices: ["Node.js", "React", "Express", "Django"],
            correctAnswer: "React"
        },

    ];

    let currentQuestionIndex = 0;
    let timeLeft = 60;
    let timer;


    function startQuiz() {
        console.log("Start quiz called");

        timerElement.textContent = `Time: ${timeLeft}s`;

        startTimer();

        displayQuestion();

        scoreInputElement.style.display = "none";
    }


    function startTimer() {
        timer = setInterval(function () {
            timeLeft--;

            if (timeLeft <= 0) {
                endQuiz();
            }

            timerElement.textContent = `Time: ${timeLeft}s`;
        }, 1000);
    }


    function displayQuestion() {
        console.log("Display question called");
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerHTML = `<p>${currentQuestion.question}</p>`;

        choicesElement.innerHTML = currentQuestion.choices.map((choice, index) => `
            <button class="choice" data-index="${index}">${choice}</button>
        `).join("");
    }


    submitButton.addEventListener("click", startQuiz);


    choicesElement.addEventListener("click", function (event) {
        if (event.target.matches("button.choice")) {
            handleUserInput(event);
        }
    });


    function handleUserInput(event) {
        console.log("Handle user input called");
        const selectedAnswerIndex = parseInt(event.target.dataset.index);
        const currentQuestion = questions[currentQuestionIndex];


        const selectedAnswer = currentQuestion.choices[selectedAnswerIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;


        showFeedback(isCorrect);


        if (!isCorrect) {
            timeLeft -= 10;
        }


        if (currentQuestionIndex < questions.length - 1) {

            currentQuestionIndex++;
            displayQuestion();
        } else {

            endQuiz();
        }
    }


    function endQuiz() {
        console.log("Quiz ended");

    }


    function showFeedback(isCorrect) {
        console.log("Show feedback called");
        const feedbackElement = document.createElement("div");
        feedbackElement.classList.add("feedback");
        feedbackElement.textContent = isCorrect ? "Correct!" : "Incorrect!";
        document.body.appendChild(feedbackElement);


        setTimeout(() => {
            document.body.removeChild(feedbackElement);
        }, 1000);
    }
});
