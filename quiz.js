// 1. skicka en request
// 2. parsa vår json
// 3. visa upp frågorna - från js lägga till i vår html

const apiUrl = 'https://opentdb.com/api.php?amount=15&category=23&difficulty=easy';

const button = document.querySelector('#fetch');

button.addEventListener('click', async e => {
    console.log('1. button pressed');

    const response = await fetch(apiUrl);
    console.log('2. got response', response);

    const data = await response.json();

    console.log('3. got data:' , data);

    const allQuestions = data.results;

    const questionsContainer = document.querySelector('#questions');
    allQuestions.forEach( q => {
        const questionElement = createQuestionElement(q);
        questionsContainer.appendChild(questionElement);
    });
})

function createQuestionElement(question) {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';

    const questionHeading = document.createElement('h2');
    questionHeading.innerHTML = question.question;
    questionElement.appendChild(questionHeading);

    //let options = [...question.incorrect_answers, question.correct_answer ];
    //todo: shuffle
    let options = question.incorrect_answers;
    const randomIndex = Math.floor( Math.random() * options.length + 1);
    options.splice(randomIndex, 0, question.correct_answer);

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = option;

        optionElement.addEventListener('click', e => {
            console.log("Du valde: " + option);

            if(option === question.correct_answer) {
                console.log('correct');
                optionElement.classList.add('correct');
            } else {
                console.log('incorrect');
                optionElement.classList.add('incorrect');   
            }



        })

        questionElement.appendChild(optionElement);
    })

    return questionElement;
}


