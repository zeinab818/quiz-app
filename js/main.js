
'use strict';

let categoryMenu = document.getElementById('categoryMenu');
let difficultyOptions = document.getElementById('difficultyOptions');
let numberOfQuestions = document.getElementById('numberOfQuestions');
let btnStart = document.getElementById('btnStart');
let quizForm = document.getElementById('quizForm');
let questionForm = document.getElementById('questionForm');
let result = document.getElementById('result');

let questions;
let myQuiz;

btnStart.addEventListener('click', async function () {
    myQuiz = new Quiz(categoryMenu.value, difficultyOptions.value, numberOfQuestions.value);
    await myQuiz.getAllQuestions();
    quizForm.classList.replace('d-flex', 'd-none');

    let myQuestion = new Question(0);
    questionForm.classList.replace('d-none', 'd-flex');
    myQuestion.display();
});

class Quiz {
    constructor(category, difficulty, number) {
        this.category = category;
        this.difficulty = difficulty;
        this.number = number;
        this.score = 0;
    }

    getApi() {
        return `https://opentdb.com/api.php?amount=${this.number}&category=${this.category}&difficulty=${this.difficulty}`;
    }

    async getAllQuestions() {
        let res = await fetch(this.getApi());
        let data = await res.json();
        questions = data.results;
    }

    showResult() {
        return `
            <div class="inner w-100 d-flex justify-content-between align-items-center flex-column gab-3 shadow-lg p-4">
                <h2>${this.score == this.number ? `🎉 Congratulations! Full Score! 🎉` : `Your score is: ${this.score}/${this.number}`}</h2>
                <button id="againBtn" class="again btn btn-primary rounded-pill">
                    <i class="bi bi-arrow-repeat"></i> Try again
                </button>
            </div>
        `;
    }
}

class Question {
    constructor(index) {
        this.index = index;
        this.question = questions[index].question;
        this.category = questions[index].category;
        this.difficulty = questions[index].difficulty;
        this.correct_answer = questions[index].correct_answer;
        this.incorrect_answers = questions[index].incorrect_answers;
        this.allMyAnswers = this.getAllAnswers();
        this.isAnswered = false;
    }

    getAllAnswers() {
        let allAnswers = [...this.incorrect_answers, this.correct_answer];
        return allAnswers.sort(() => Math.random() - 0.5); // Shuffle
    }

    display() {
        let content = `
            <div class="inner d-flex justify-content-between align-items-center flex-column w-100">
                <header class="d-flex justify-content-between align-items-center w-100 px-3">
                    <p class="text-capitalize m-0">${this.category}</p>
                    <p class="m-0">${this.index + 1} of ${questions.length} Questions</p>
                </header>
                <div class="content d-flex justify-content-center align-items-center flex-column w-100 px-3">
                    <h3 class="mt-4 text-center">${this.question}</h3>
                    <ul class="choices row row-cols-1 row-cols-md-2 g-3 w-100 mt-4 list-unstyled">
                        ${this.allMyAnswers.map(choice => `
                            <li class="col">
                                <button class="choice btn btn-outline-dark w-100 py-2">${choice}</button>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <footer class="mt-5 w-100 text-center">
                    <h5>Score: ${myQuiz.score}</h5>
                </footer>
            </div>
        `;

        questionForm.innerHTML = content;

        let allButtons = document.querySelectorAll('.choice');
        allButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.checkAnswer(btn);
                this.nextQuestion();
            });
        });
    }

    checkAnswer(selectedBtn) {
        if (!this.isAnswered) {
            this.isAnswered = true;

            // Lock all buttons
            const allBtns = document.querySelectorAll('.choice');
            allBtns.forEach(btn => btn.disabled = true);

            if (selectedBtn.textContent.trim() === this.correct_answer.trim()) {
                selectedBtn.classList.add('btn-success');
                myQuiz.score++;
            } else {
                selectedBtn.classList.add('btn-danger');
            }

 
            document.querySelectorAll('.choice').forEach(btn => {
            if(btn.innerHTML === this.correct_answer){
                btn.classList.add('correct');
            }
});
            
        }
    }

    nextQuestion() {
        this.index++;
        setTimeout(() => {
            if (this.index < questions.length) {
                let nextQ = new Question(this.index);
                nextQ.display();
            } else {
                let res = myQuiz.showResult();
                questionForm.innerHTML = res;
                document.getElementById('againBtn').addEventListener("click", () => {
                    window.location.reload();
                });
            }
        }, 2000);
    }
}
