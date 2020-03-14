# Question Steam

Neatly pass and handle a series readline questions in Node.js with minimal setup.

## Setup

Clone this repo into a directory in your project.

## Specs

The `QuestionStream` constructor takes two parameters. The first parameter is a readline interface. The second parameter is an array of objects. Each object has two nodes called, `question` and `callback`.

```javascript
new QuestionStream(readlineInterface, questionsArray);
```

The `question` node takes in a string, which is used for the question promted to the user. It can be styled with chalk, have emojis or be a function that returns a string.

The `callback` node is a callback that takes in two parameters. The first parameter is the input from the user. The second parameter is the prompt for the question, which can be called to reprompt the question to the user.

```javascript
{
    question: "Enter File Path: ",
    callback: (answer, reprompt /* these two parameters can be used in every callback */) => {
        if (!answer || (fs.existsSync(path))) {
            console.log("That file path is not valid. Please enter a new file path.");
            reprompt(); // will repeat the question and the user will be able to enter a new answer
        } else {
            newPath = answer;
            console.log(`New path is set as ${chalk.yellow.bold(path.normalize(answer))}.`)
        }
    }
}
```

## Small Example

This little example brings the main pieces together.

```javascript
const readline = require('readline');
const QuestionStream = require('./question-stream-directory');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    {
        question: "What is your name? ",
        callback: answer => console.log(`${answer} is a cool name.`)
    },
    {
        question: "What is your occupation? ",
        callback: answer => console.log(`${answer} is a fun occupation.`)
    },
    {
        question: "What is your quest? ",
        callback: answer => {
            console.log(`${answer} is a noble quest.`); 
            rl.close();
            }
    }
]

new QuestionStream(rl, questions).start();
```