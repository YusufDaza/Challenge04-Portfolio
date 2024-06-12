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
            question: "Who won the first UEFA Euro held in 1960?",
            choices: ["West Germany", "Soviet Union", "Italy", "Spain"],
            correctAnswer: "Soviet Union"
        },
        {
            question: "Which player holds the record for the most goals scored in a single UEFA Euro tournament?",
            choices: ["Michel Platini", "Marco Van Basten", "Cristiano Ronaldo", "Zinedine Zidane"],
            correctAnswer: "Michel Platini"
        },
        {
            question: "Which city hosted the UEFA Euro final in 2020?",
            choices: ["Budapest", "Rome", "Munich", "London"],
            correctAnswer: "London"
        },
        {
            question: "Which player scored the winning goal in the UEFA Euro final in 2004?",
            choices: ["Cristiano Ronaldo", "Theodorakis Zagorakis", "Angelos Charisteas", "Rui Costa"],
            correctAnswer: "Angelos Charisteas"
        },
        {
            question: "Who won the UEFA Euro Golden Boot award in 2016?",
            choices: ["Gareth Bale", "Antoine Griezmann", "Robert Lewandowski", "Luka Modric"],
            correctAnswer: "Antoine Griezmann"
        },
        {
            question: "Which of the following countries did not qualify to the UEFA Euro 2000?",
            choices: ["Turkey", "Romania", "England", "Croatia"],
            correctAnswer: "Croatia"
        },
        {
            question: "Which country Denmark replaced and participated in the UEFA Euro in 1992?",
            choices: ["Yugoslavia", "Spain", "Portugal", "Bulgaria"],
            correctAnswer: "Yugoslavia"
        },
        {
            question: "Who scored the last Golden Goal of the history of UEFA Euro in the 2000's final?",
            choices: ["Zinedine Zidane", "Lilian Thuram", "Didier Deschamps", "David Trezeguet"],
            correctAnswer: "David Trezeguet"
        },
        {
            question: "Which country won the UEFA Euro of 1976?",
            choices: ["Netherlands", "Yugoslavia", "Czechoslovakia", "West Germany"],
            correctAnswer: "Czechoslovakia"
        },
        {
            question: "What countries hosted the UEFA Euro 2008?",
            choices: ["Austria & Swizertland", "Poland & Ukraine", "Greece & Turkey", "Belgium & Netherlands"],
            correctAnswer: "Austria & Switzerland"
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

        if (isCorrect) {
            score += 10; 
        }

        showFeedback(isCorrect);

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

                window.location.href = "/C:/Users/josep/OneDrive/Desktop/bootcamp/Challenges/Challenge04-Portfolio/Challenge04-Portfolio/index.html";
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
