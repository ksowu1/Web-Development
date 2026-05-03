
// IT 3203 Final Project Quiz Script
// This file handles client-side quiz grading and reset behavior.

document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");

    if (submitBtn) {
        submitBtn.addEventListener("click", gradeQuiz);
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", resetQuiz);
    }
});

function gradeQuiz() {
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
    const maxScore = 5;
    let details = "";

    const q1Input = document.getElementById("q1").value.trim().toLowerCase();
    const q1Correct = q1Input === answers.q1;
    if (q1Correct) totalScore++;
    details += createResultHTML(1, q1Correct, q1Input || "(no answer)", "assistant");

    const q2Selected = document.querySelector('input[name="q2"]:checked');
    const q2Answer = q2Selected ? q2Selected.value : "(no answer)";
    const q2Correct = q2Answer === answers.q2;
    if (q2Correct) totalScore++;
    details += createResultHTML(2, q2Correct, q2Answer, answers.q2);

    const q3Selected = document.querySelector('input[name="q3"]:checked');
    const q3Answer = q3Selected ? q3Selected.value : "(no answer)";
    const q3Correct = q3Answer === answers.q3;
    if (q3Correct) totalScore++;
    details += createResultHTML(3, q3Correct, q3Answer, answers.q3);

    const q4Selected = document.querySelector('input[name="q4"]:checked');
    const q4Answer = q4Selected ? q4Selected.value : "(no answer)";
    const q4Correct = q4Answer === answers.q4;
    if (q4Correct) totalScore++;
    details += createResultHTML(4, q4Correct, q4Answer, answers.q4);

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

    const passed = totalScore >= 3;

    document.getElementById("overallResult").innerHTML = `
        <p class="${passed ? "pass-text" : "fail-text"}">
            Overall Result: ${passed ? "Pass" : "Fail"}
        </p>
    `;

    document.getElementById("scoreResult").innerHTML = `
        <p><strong>Total Score:</strong> ${totalScore} / ${maxScore}</p>
    `;

    document.getElementById("detailedResults").innerHTML = details;
}

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

function resetQuiz() {
    document.getElementById("quizForm").reset();
    document.getElementById("overallResult").innerHTML = "";
    document.getElementById("scoreResult").innerHTML = "";
    document.getElementById("detailedResults").innerHTML = "";
}