// We should have a place to store questions and answers
const STORE = [
    {
        question: `Who recorded the song "Blitzkrieg Bop"?`,
        answers: [
            'The Sex Pistols',
            'The Ramones',
            'The Clash',
            'Green Day'
        ],
        correctAnswer: 'The Ramones'
    },
    {
        question: 'What band made the album "London Calling"?',
        answers: [
            'The Damned',
            'Stiff Little Fingers',
            'The Ramones',
            'The Clash'
        ],
        correctAnswer: 'The Clash'
    },
    {
        question: 'What band shared members with Operation Ivy?',
        answers: [
            'The Offspring',
            'Green Day',
            'Sum 41',
            'Rancid'
        ],
        correctAnswer: 'Rancid'
    },
    {
        question: 'Which punk band is from the USA?',
        answers: [
            'The Undertones',
            'The Clash',
            'The Ramones',
            'The Sex Pistols'
        ],
        correctAnswer: 'The Ramones'
    },
    {
        question: 'Which punk band was fronted by Iggy Pop?',
        answers: [
            'The Buzzcocks',
            'The Stooges',
            'The Sex Pistols',
            'The Damned'
        ],
        correctAnswer: 'The Stooges'
    }
]

// Mutable variables to track quiz score and question number
let score = 0;
let questionNumber = 0;


/*WE SHOULD HAVE A FUNCTION TO START QUIZ WHEN BUTTON IS CLICKED
HIDE QUIZ START DIV AND DISPLAY QUIZ FORM*/
function startQuiz() {
    $('.quizStart').on('click', '.startButton', function (event) {
        console.log('startQuiz ran');
        $('.quizStart').hide();
        //SHOWS THE QUIZ FORM
        $('.questionAnswerForm').css('display', 'flex');
        //UPDATES CURRENT QUESTION NUMBER
        $('.questionNumber').text(1);
    });
}

// WE NEED A FUNCTION TO GENERATE A FORM FOR THE QUIZ QUESTIONS AND ANSWERS FROM "STORE"
function generateQuestion () {
    console.log(`generateQuestion ran`);
    if (questionNumber < STORE.length) {
        // RETURNS HTML TO INSERT INTO INDEX
        return `<div class="question-${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>
        <form>
        <fieldset>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        renderResults();
        $('.questionNumber').text(5);
    }
}
  
// WE SHOULD HAVE A FUNCTION TO RENDER QUESTIONS (!!HELPER FUNCTION NEEDED!!)
function renderQuestion() {
    console.log(`renderQuestion ran`);
    //UPDATES HTML WITH RESULTS OF "generateQuestion" FUNCTION
    $('.questionAnswerForm').html(generateQuestion());
}



// WE SHOULD HAVE A WAY TO INCREMENT CURRENT QUESTION NUMBER
function changeQuestionNumber() {
    console.log(`changeQuestionNumber ran`);
    questionNumber++;
    // UPDATES THE HTML
    $('.questionNumber').text(questionNumber);
}

// WE SHOULD HAVE A BUTTON TO SUBMIT ANSWER (HELPER FUNCTIONS NEEDED TO UPDATE QUESTION AND SCORE)
function userSelectAnswer() {
    $('form').on('submit', function (event){
        event.preventDefault();
        console.log(`userSelectAnswer ran`);
        // SHORTHAND VARIABLES FOR CHECKING IF ANSWER IS CORRECT
        let selected = $('input:checked');
        let userAnswer = selected.val();
        let rightAnswer = STORE[questionNumber].correctAnswer;
        console.log(userAnswer);
        // CHECKS USER INPUT AGAINST CORRECT ANSWER
        if (userAnswer === rightAnswer) {
            answerIsCorrect();
        } else {
            answerIsWrong();
        }
    });
}

// WE SHOULD HAVE FUNCTIONS TO DETERMINE BEHAVIOR ON CORRECT OR WRONG ANSWER
function answerIsCorrect() {
    console.log('answerIsCorrect ran')
    correctAnswerFeedBack();
    updateScore();
}

function updateScore() {
    changeScore();
    $('.score').text(score);
}

function answerIsWrong() {
    console.log('answerIsWrong ran')
    wrongAnswerFeedback();
}

// WE SHOULD HAVE A WAY TO CHANGE SCORE ON CORRECT ANSWER
function changeScore() {
    console.log(`changeScore ran`);
    score++;
}

//  ACTIONS ON CORRECT OR WRONG ANSWER
function correctAnswerFeedBack() {
    //let rightAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="correctFeedback"><h2>You know your punk! Rock on!</h2><button type="button" class="nextButton">Next</button></div>`);
}

function wrongAnswerFeedback() {
    let rightAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="wrongFeedback"><h2>Sorry, the answer is <span>"${rightAnswer}"</span></h2><button type="button" class="nextButton">Next</button></div>`);
}

// WE SHOULD HAVE A FUNCTION TO DETERMINE WHAT HAPPENS WHEN THE USER CLICKS "NEXT"

function renderNextQuestion() {
    $('main').on('click', '.nextButton', function (event) {
        console.log(`renderNextQuestion ran`);
        changeQuestionNumber();
        renderQuestion();
        userSelectAnswer();
    });
}


// WE SHOULD HAVE A FUNCTION TO GENERATE A RESULTS DISPLAY
function renderResults() {
    if (score === 5) {
        $('.questionAnswerForm').html(`<div class="results"><h2>You are truly punk and disorderly!</h2><button class="restart">Try Again</button></div>`)
    } else if (score < 5 && score > 2) {
        $('.questionAnswerForm').html(`<div class="results"><h2>You're only a bit punk, but don't worry, you can still rock!</h2><button class="restart">Try Again</button></div>`)
    } else {
        $('.questionAnswerForm').html(`<div class="results"><h2>Sorry to interrupt your Steely Dan record. Better luck next time!</h2><button class="restart">Try Again</button></div>`)
    }
}

// FINALLY A FUNCTION TO RESTART THE QUIZ
function restartQuiz() {
    $('main').on('click', '.restart', function (event) {
        event.preventDefault();
        resetStats();
        $('.questionAnswerForm').hide();
        $('.quizStart').show();
    })
}

function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

function createQuiz () {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
    restartQuiz();
  }
  
  $(createQuiz);