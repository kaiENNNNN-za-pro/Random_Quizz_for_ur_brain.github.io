// [] - list
// "" - string

const quizData = [
    {
        question: "Who founded McDonald's?",
        options: ["Jimmy Donaldson", "Ray Kroc", "Robert Downey Jr", "Gwyneth Paltrow"],
        answer: "Ray Kroc"
    },

    {
        question: "Fill in the blanks: 8 x 3/4 = 5 x 3/4 + 3/4 + ____ x 3/4",
        options: ["1", "4", "2", "7"],
        answer: "2"
    },

    {
        question: "What assotiation is singapore in?",
        options: ["NATO","ASEAN","OHIO","HACPOA"],
        answer: "ASEAN"
    },

    {
        question: "Fill in the blanks: 3 + [ 3 x 2 ] x 3 = ____",
        options: ["21", "34", "25", "19"],
        answer: "21"
    },    

    {
        question: "What is the smallest country in the world?",
        options: ["Vatican City", "Monaco", "Singapore", "Malta"],
        answer: "Vatican City"
    }, 

    {
        question: "How heavy is a Boeing 737? ",
        options: ["358,690 Kg", "43,570 Kg", "41,140 Kg", "1,351,740 Kg"],
        answer: "41,140 Kg"
    }, 
];


const StartButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const optionsElement = document.getElementById('options-container');
const resultElement = document.getElementById('result');        

progressBar.style.width = '0%';

let currentQuestion = 0;
let score = 0

StartButton.addEventListener('click', startQuiz)

function startQuiz()
{
    StartButton.style.display = 'none';
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer);   

    if(currentQuestion < quizData.length)
    {
        // update progress bar  
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;    

        // create a variable for the current 
        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question

        // set initial countdown value timerText.textCountent
        timerText.textContent = 10;

        // remove previous buttons
        optionsElement.innerHTML = '';

        // clone 4 option buttons here
        currentQuizData.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsElement.appendChild(button);       
            
            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });

        //start the countdown here
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0 )
            {
                // reset the timer
                clearInterval(timer);

                // update currentQuestion variable
                currentQuestion++; 

                loadQuestion();
            }
        }, 1000)
    } else 
    {
        endQuiz();
    } 
}

function checkAnswer(option)
{
    // load current question set
    const currentQuizData = quizData[currentQuestion];

    if(option === currentQuizData.answer)
    {
        score += 1
    }
    
    resultElement.textContent = `You scored ${score} points`;
    currentQuestion++;
    loadQuestion();
}

function endQuiz()
{
    progressBarContainer.style.display = 'none';
    questionElement.textContent = "Quiz has ended! congratulations!";
    optionsElement.style.display = 'none';
    timerElement.style.display = 'none';
}