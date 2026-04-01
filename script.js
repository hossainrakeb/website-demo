const questions = [
    { q: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], correct: 1 },
    { q: "What is 5 + 5?", options: ["10", "12", "8", "15"], correct: 0 },
    { q: "Capital of France?", options: ["London", "Berlin", "Madrid", "Paris"], correct: 3 }
];

let currentIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = questions[currentIndex];
    // This line changes "Question Text" to the actual question
    document.getElementById("question").innerText = currentQuestion.q;
    
    // This loop fills the A, B, C, D buttons with text
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementsByClassName("option-btn")[i];
        document.getElementById(`text${i}`).innerText = currentQuestion.options[i];
        
        // Reset colors from previous round
        btn.classList.remove("correct", "wrong");
        btn.disabled = false;
    }
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentIndex].correct;
    const buttons = document.getElementsByClassName("option-btn");

    for (let btn of buttons) { btn.disabled = true; }

    if (selectedIndex === correctIndex) {
        score++;
        buttons[selectedIndex].classList.add("correct");
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }

    setTimeout(() => {
        currentIndex++;
        if (currentIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    document.getElementById("quiz-screen").classList.add("hide");
    document.getElementById("result-screen").classList.remove("hide");
    document.getElementById("final-score").innerText = score;

    let highScore = localStorage.getItem("quizHighScore") || 0;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("quizHighScore", highScore);
    }
    document.getElementById("high-score").innerText = highScore;
}

function resetQuiz() {
    currentIndex = 0;
    score = 0;
    document.getElementById("quiz-screen").classList.remove("hide");
    document.getElementById("result-screen").classList.add("hide");
    loadQuestion();
}

// This line makes the quiz start as soon as the page loads
loadQuestion();