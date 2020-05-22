const questions = [
    {
        active: true,
        answer: '10',
        question: 'What is 9 + 1?'
    },
    {
        active: false,
        answer: '17',
        question: 'What is 15 + 2?'
    }
];

const question = document.querySelector('.question.active');
const inputs = document.querySelectorAll('input');

inputs.forEach((input, index) => {
    input.addEventListener('click', (event) => {
        const targetId = event.target.id.substring(0, event.target.id.length - 1);
        const targetValue = event.target.value;
        const isCorrect = targetValue === questions[targetId - 1].answer;

        console.log('answer', questions[targetId - 1].answer);
        console.log('value', targetValue);
        console.log('question', question.nextSibling);
        console.log('inputs', inputs);

        isCorrect
            ? alert('right on')
            : alert('try again noob');

        question.classList.remove('active');
        question.nextSibling.classList.add('active');
    });
});