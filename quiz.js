document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("time-left");
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const submitButton = document.getElementById("submit-btn");
    const scoreInputElement = document.getElementById("score-input");
    const resultElement = document.getElementById("results");
    const questionSection = document.getElementById("question-sections");
    const introduction = document.getElementById("introduction");

    const questions = [
        {
            question: "What keyword is used to declare a variable in JavaScript?",
            choices: ["let", "const", "var", "declare"],
            correctAnswer: "let"
        },
        {
            question: "Which of the following is a front-end framework?",
            choices: ["Node.js", "React", "Express", "Django"],
            correctAnswer: "React"
        },
        {
            question: "What is the purpose of the 'typeof' operator in JavaScript?",
            choices: ["To check the type of a variable", "To declare a variable", "To create a loop", "To define a function"],
            correctAnswer: "To check the type of a variable"
        },
        {
            question: "What is a closure in JavaScript?",
            choices: ["A way to close a browser window", "A function combined with its lexical scope", "A method to hide code", "A data structure"],
            correctAnswer: "A function combined with its lexical scope"
        },
        {
            question: "Which method is used to remove the last element from an array in JavaScript?",
            choices: ["pop()", "remove()", "delete()", "shift()"],
            correctAnswer: "pop()"
        },
    ];

    let currentQuestionIndex = 0;
    let timeLeft = 60;
    let timer;
    let score = 0;

    function startQuiz() {
        console.log("Start quiz called");
        questionSection.classList.remove("hide");
        introduction.classList.add("hide");
        timerElement.textContent = `Time: ${timeLeft}s`;

        startTimer();

        displayQuestion();

        scoreInputElement.style.display = "none";
        resultElement.style.display = "none";
        score = 0;
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

        if (isCorrect) {
            score += 10;
        } else {
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
        clearInterval(timer);
        scoreInputElement.style.display = "block";
        scoreInputElement.innerHTML = `<p>Your Score: ${score}</p>`;
        resultElement.style.display = "block";
        resultElement.innerHTML = `<p>Thank you for completing the quiz!</p><p>Your final score is: ${score}</p>`;

        // Add a form for entering the name and submitting the score
        resultElement.innerHTML += `
            <form id="name-form">
                <label for="name">Enter your name:</label>
                <input type="text" id="name" name="name" required>
                <button type="button" id="submit-name">Submit Name</button>
            </form>
        `;

        const nameForm = document.getElementById("name-form");
        const submitNameButton = document.getElementById("submit-name");

        submitNameButton.addEventListener("click", function () {
            const playerName = document.getElementById("name").value;
            // Do something with the playerName, e.g., save it along with the score
            console.log(`Player Name: ${playerName}, Score: ${score}`);

            // Display a thank you message
            resultElement.innerHTML += `<p>Thank you for submitting your name, ${playerName}!</p>`;

            // Add a "Go Back" button
            resultElement.innerHTML += `
                <button type="button" id="go-back-btn">Go Back</button>
            `;

            // Event listener for the "Go Back" button
            const goBackButton = document.getElementById("go-back-btn");
            goBackButton.addEventListener("click", function () {
                // Reset quiz and timer
                currentQuestionIndex = 0;
                timeLeft = 60;
                clearInterval(timer);
                startQuiz();
            });
        });
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
