const readline = require('readline');
const QuestionStream = require('');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let name, age, book;
const printSummary = () => {
    console.log(`Name is ${name}, age is ${age}, ${book ? `favorite book is ${book}` : `hates to read.`}`)
}
const questions = [{
    question: "What is your name? ",
    callback: (answer, reprompt) => {
        if (!answer) {
            console.log("That name is not valid");
            reprompt();
        } else {
            name = answer;
            console.log(`Your name is saved as ${answer}.`)
        };
    }
}, {
    question: "What is your age? ",
    callback: (answer, reprompt) => {
        if (!Number(answer)) {
            console.log("That age is not a real number. Enter a number (example 42)");
            reprompt();
        } else {
            age = answer;
            console.log(`Your age is saved as ${answer}.`);
        }
    }
}, {
    question: "What is your favorite book? ",
    callback: (answer) => {
        if (!answer) console.log("I guess you're not much of a reader");
        else console.log(`Your favorite book is saved as ${answer}.`);
        book = answer;
        rl.close();
        printSummary();
    }
}]

new QuestionStream(rl, questions).start();