// IT 3203 Milestone 2
// Quiz processing using JavaScript

// Wait until the page is ready
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");

    submitBtn.addEventListener("click", gradeQuiz);
    resetBtn.addEventListener("click", resetQuiz);
});

// Function to grade the quiz
function gradeQuiz() {
    // Correct answers
    const answers = {
        q1: "assistant",
        q2: "JavaScript",
        q3: "HTML, CSS, and JavaScript suggestions",
        q4: "It can include errors or insecure code",
        q5: [
            "Suggest HTML structure",
            "Suggest CSS styling ideas",
            "Write JavaScript functions"
        ]
    };

    let totalScore = 0;
    let maxScore = 5;
    let details = "";

    // Question 1: fill in the blank
    const q1Input = document.getElementById("q1").value.trim().toLowerCase();
    const q1Correct = q1Input === answers.q1;
    if (q1Correct) totalScore++;
    details += createResultHTML(
        1,
        q1Correct,
        q1Input || "(no answer)",
        "assistant"
    );

    // Question 2: multiple choice
    const q2Selected = document.querySelector('input[name="q2"]:checked');
    const q2Answer = q2Selected ? q2Selected.value : "(no answer)";
    const q2Correct = q2Answer === answers.q2;
    if (q2Correct) totalScore++;
    details += createResultHTML(
        2,
        q2Correct,
        q2Answer,
        answers.q2
    );

    // Question 3: multiple choice
    const q3Selected = document.querySelector('input[name="q3"]:checked');
    const q3Answer = q3Selected ? q3Selected.value : "(no answer)";
    const q3Correct = q3Answer === answers.q3;
    if (q3Correct) totalScore++;
    details += createResultHTML(
        3,
        q3Correct,
        q3Answer,
        answers.q3
    );

    // Question 4: multiple choice
    const q4Selected = document.querySelector('input[name="q4"]:checked');
    const q4Answer = q4Selected ? q4Selected.value : "(no answer)";
    const q4Correct = q4Answer === answers.q4;
    if (q4Correct) totalScore++;
    details += createResultHTML(
        4,
        q4Correct,
        q4Answer,
        answers.q4
    );

    // Question 5: multi-selection
    const q5Checked = document.querySelectorAll('input[name="q5"]:checked');
    const q5Answers = Array.from(q5Checked).map(item => item.value).sort();
    const correctQ5 = [...answers.q5].sort();

    const q5Correct =
        q5Answers.length === correctQ5.length &&
        q5Answers.every((value, index) => value === correctQ5[index]);

    if (q5Correct) totalScore++;

    details += createResultHTML(
        5,
        q5Correct,
        q5Answers.length ? q5Answers.join(", ") : "(no answer)",
        correctQ5.join(", ")
    );

    // Overall pass/fail
    const passed = totalScore >= 3;

    const overallResult = document.getElementById("overallResult");
    const scoreResult = document.getElementById("scoreResult");
    const detailedResults = document.getElementById("detailedResults");

    overallResult.innerHTML = `
        <p class="${passed ? "pass-text" : "fail-text"}">
            Overall Result: ${passed ? "Pass" : "Fail"}
        </p>
    `;

    scoreResult.innerHTML = `
        <p><strong>Total Score:</strong> ${totalScore} / ${maxScore}</p>
    `;

    detailedResults.innerHTML = details;
}

// Function to build result HTML for each question
function createResultHTML(questionNumber, isCorrect, userAnswer, correctAnswer) {
    return `
        <div class="result-item ${isCorrect ? "correct-box" : "incorrect-box"}">
            <h3>Question ${questionNumber}</h3>
            <p><strong>Result:</strong> ${isCorrect ? "Correct" : "Incorrect"}</p>
            <p><strong>Score:</strong> ${isCorrect ? "1" : "0"}</p>
            <p><strong>Your Answer:</strong> ${userAnswer}</p>
            <p><strong>Correct Answer:</strong> ${correctAnswer}</p>
        </div>
    `;
}

// Function to reset quiz and results
function resetQuiz() {
    document.getElementById("quizForm").reset();
    document.getElementById("overallResult").innerHTML = "";
    document.getElementById("scoreResult").innerHTML = "";
    document.getElementById("detailedResults").innerHTML = "";
}

