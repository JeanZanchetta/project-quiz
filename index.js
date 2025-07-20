// Estado do quiz

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer = 0;
let quizData = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        correct: 2
    },
    {
        question: "Quantos continentes existem no mundo?",
        options: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Terra", "Marte", "Júpiter", "Saturno"],
        correct: 2
    },
    {
        question: "Quem escreveu 'Dom Casmurro'?",
        options: ["Machado de Assis", "José de Alencar", "Clarice Lispector", "Jorge Amado"],
        correct: 0
    },
    {
        question: "Em que ano o Brasil foi descoberto?",
        options: ["1498", "1500", "1502", "1504"],
        correct: 1
    },
    {
        question: "Qual é a fórmula química da água?",
        options: ["H2O", "CO2", "O2", "H2SO4"],
        correct: 0
    },
    {
        question: "Quantos jogadores há em um time de futebol em campo?",
        options: ["10", "11", "12", "13"],
        correct: 1
    },
    {
        question: "Qual é o menor país do mundo?",
        options: ["Mônaco", "Vaticano", "Malta", "Liechtenstein"],
        correct: 1
    },
    {
        question: "Qual é a moeda oficial do Reino Unido?",
        options: ["Euro", "Dólar", "Libra", "Franco"],
        correct: 2
    },
    {
        question: "Quantos ossos tem o corpo humano adulto?",
        options: ["206", "256", "186", "216"],
        correct: 0
    }
];

// Elementos do DOM

const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionButtons = Array.from(document.querySelectorAll('.option-btn'));
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-question');
const currentScoreSpan = document.getElementById('current-score');
const timerElement = document.getElementById('timer');
const progressFill = document.getElementById('progress-fill');
const finalScoreSpan = document.getElementById('final-score');
const totalScoreSpan = document.getElementById('total-score');
const percentageSpan = document.getElementById('percentage');
const performanceText = document.getElementById('performance-text');

// Eventos 

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

// Função para Iniciar o quiz 
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showScreen(quizScreen);
    totalQuestionsSpan.textContent = quizData.length;
    updateScore();
    showQuestion();
}

// Função para mostrar uma tela 
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Função para mostrar a pergunta atual
function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    optionButtons.forEach((btn, index) => {
        btn.textContent = currentQuestion.options[index];
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = false;
        btn.onclick = () => selectAnswer(index);
    });

    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    updateProgressBar();
    startTimer();
}

// Função para selecionar uma resposta
function selectAnswer(selectedIndex) {
    clearInterval(timer);
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;

    // Desabilitar todos os botões
    optionButtons.forEach(btn => btn.disabled = true);

    // Mostrar feedback visual
    optionButtons[correctIndex].classList.add('correct');

    if (selectedIndex === correctIndex) {
        score++;
        updateScore();
        optionButtons[selectedIndex].classList.add('selected');
    } else {
        optionButtons[selectedIndex].classList.add('incorrect');
    }

    // Avançar para próxima pergunta após 2 segundos
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

// Função para iniciar o timer
function startTimer() {
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    timerElement.classList.remove('urgent');

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 5) {
            timerElement.classList.add('urgent');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeOut();
        }
    }, 1000);
}

// Função para quando o tempo acaba
function timeOut() {
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;

    // Desabilitar todos os botões
    optionButtons.forEach(btn => btn.disabled = true);

    // Mostrar resposta correta
    optionButtons[correctIndex].classList.add('correct');

    // Avançar para próxima pergunta após 2 segundos
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

// Função para atualizar a pontuação
function updateScore() {
    currentScoreSpan.textContent = score;
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
}

// Função para mostrar os resultados
function showResults() {
    showScreen(resultsScreen);

    finalScoreSpan.textContent = score;
    totalScoreSpan.textContent = quizData.length;

    const percentage = Math.round((score / quizData.length) * 100);
    percentageSpan.textContent = percentage + '%';

    // Mensagem de desempenho
    let message = '';
    if (percentage >= 90) {
        message = 'Excelente! Você é um verdadeiro expert!';
    } else if (percentage >= 70) {
        message = 'Muito bom! Você tem um ótimo conhecimento!';
    } else if (percentage >= 50) {
        message = 'Bom trabalho! Continue estudando!';
    } else if (percentage >= 30) {
        message = 'Não desista! Você pode melhorar!';
    } else {
        message = 'Que tal estudar um pouco mais e tentar novamente?';
    }

    performanceText.textContent = message;
}

// Função para reiniciar o quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    clearInterval(timer);
    showScreen(welcomeScreen);
}

// Embaralhar array (função auxiliar)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Embaralhar perguntas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    shuffle(quizData);
});
