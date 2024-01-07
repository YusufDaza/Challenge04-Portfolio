document.addEventListener("DOMContentLoaded", function () {
    // Questions array
    const questions = [
        {
            question: "What does API stand for?",
            choices: ["Application Programming Interface", "Advanced Programming Interface", "Automated Processing Interface", "All Purpose Interface"],
            correctAnswer: "Application Programming Interface"
        },
        // Add more questions as needed
    ];

    // DOM elements
    const quizContainer = document.getElementById("quiz-container");
    const timerElement = document.getElementById("timer");
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const submitButton = document.getElementById("submit-btn");
    const scoreInputElement = document.getElementById("score-input");

    // Other variables
    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 60; // Set your desired timer duration

    // Function to start the quiz
    function startQuiz() {
        quizContainer.style.display = "block";
        submitButton.style.display = "none";
        startTimer();
        displayQuestion();
    }

    // Function to display questions
    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question; 

        // Clear previous choices
        choicesElement.innerHTML = "";

       // Display answer choices
       currentQuestion.choices.forEach(function (choice) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", function (event) {
            handleUserInput(event);
        });
        choicesElement.appendChild(choiceButton);
    });
}

    // Function to handle user input
    function handleUserInput(event) {
       const selectedAnswer = event.target.textContent;
       const currentQuestion = questions[currentQuestionIndex];

       if (selectedAnswer === currentQuestion.correctAnswer) {
        // Correct answer, handle accondingly
       } else {
        //Incorrect answer, subtract time from the clock
        timeLeft -= 10; // Adjust the time penalty as needed
       }

       currentQuestionIndex++;

       if (currentQuestionIndex < questions.length) {
        // Move to the next question
        displayQuestion();
       } else {
        // End the quiz
        endQuiz();
       }
    }

    // Function to end the quiz
    function endQuiz() {
        clearInterval(timer); // Stop the timer
        // Display score input section
        scoreInputElement.style.display = "block";
        // Implement logic to save initials and score
    }

    // Function to start the timer
    function startTimer() {
        timer = setInterval(function() {
            timeLeft--;

            if (timeLeft <= 0) {
                endQuiz();
            }

            timerElement.textContent = `Time: ${timeLeft}s`; 
        }, 1000);
    }

    // Event listener for the start button
    submitButton.addEventListener("click", startQuiz);

    // Event delegation for answer choices
    choicesElement.addEventListener("click", function (event) {
        if (event.target.matches("button")) {
            handleUserInput(event);
        }
    });
});
