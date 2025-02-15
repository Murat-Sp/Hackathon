// Отримуємо дані з localStorage
let correctAnswers = localStorage.getItem("correctAnswers") || 0;
let totalQuestions = localStorage.getItem("totalQuestions") || 0;
let timeSpent = localStorage.getItem("timeSpent") || 0; // Час у секундах

// Конвертуємо секунди у хвилини та секунди
let minutes = Math.floor(timeSpent / 60);
let seconds = timeSpent % 60;
let timeText = minutes > 0 ? `${minutes} хв ${seconds} сек` : `${seconds} сек`;

// Відображаємо результат
document.getElementById("result-text").innerText = 
    `Ви відповіли правильно на ${correctAnswers} із ${totalQuestions} питань!`;

document.getElementById("time-spent").innerText = `Витрачено часу: ${timeText}`;

// Функція для перезапуску тесту
function restartQuiz() {
    window.location.href = "quest"; 
}

// Функція для повернення в меню тестів
function goToDashboard() {
    window.location.href = "dashboard"; 
}

// Очищуємо дані після показу результату
localStorage.removeItem("correctAnswers");
localStorage.removeItem("totalQuestions");
localStorage.removeItem("timeSpent");
