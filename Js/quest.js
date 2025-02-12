document.addEventListener("DOMContentLoaded", function() {
    let questionText = document.getElementById("question-text");
    let answersContainer = document.getElementById("answers");
    let timerElement = document.getElementById("timer");

    if (!questionText || !answersContainer || !timerElement) {
        console.error("Помилка: Один із необхідних елементів не знайдено!");
        return;
    }

    if (!localStorage.getItem("startTime")) {
        localStorage.setItem("startTime", Date.now());
    }

    let questions = [
        { text: "Скільки буде 2+2?", answers: ["3", "4", "5"], correct: 1 },
        { text: "Який колір неба?", answers: ["Зелений", "Синій", "Червоний"], correct: 1 }
    ];

    let currentQuestion = 0;
    let totalTimeLeft = 300; // 5 хвилин на весь тест
    let correctAnswers = 0; // Лічильник правильних відповідей
    let timer;

    function startTimer() {
        timer = setInterval(function() {
            timerElement.innerText = `Залишилось часу: ${totalTimeLeft} сек`;
            totalTimeLeft--;

            if (totalTimeLeft < 0) {
                clearInterval(timer);
                finishQuiz(); // Час вийшов — завершуємо тест
            }
        }, 1000);
    }

    function loadQuestion() {
        if (currentQuestion >= questions.length) {
            finishQuiz(); // Якщо всі питання пройдено, завершуємо тест
            return;
        }

        let q = questions[currentQuestion];
        questionText.innerText = q.text;
        answersContainer.innerHTML = "";

        q.answers.forEach((answer, index) => {
            let button = document.createElement("button");
            button.innerText = answer;
            button.addEventListener("click", function() {
                if (index === q.correct) {
                    correctAnswers++; // Збільшуємо лічильник правильних відповідей
                }
                currentQuestion++;
                loadQuestion();
            });
            answersContainer.appendChild(button);
        });
    }

    function finishQuiz() {
        let startTime = localStorage.getItem("startTime") || Date.now(); // Отримуємо стартовий час
        let totalTimeSpent = Math.floor((Date.now() - startTime) / 1000); // Обчислюємо витрачений час у секундах
    
        localStorage.setItem("timeSpent", totalTimeSpent); // Зберігаємо час у localStorage
        localStorage.removeItem("startTime"); // Очищаємо стартовий час
    
        localStorage.setItem("correctAnswers", correctAnswers);
        localStorage.setItem("totalQuestions", questions.length);
        window.location.href = "result.html"; // Перехід на сторінку результатів
    }
    startTimer(); // Запускаємо загальний таймер
    loadQuestion(); // Завантажуємо перше питання
});
