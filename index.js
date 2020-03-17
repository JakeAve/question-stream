class QuestionStream {
    constructor(rlInterface, questions) {
        this.questions = questions.map(q => q.question);
        this.lastIndex = questions.length - 1;
        this.methodName = "cb";

        questions.reverse().forEach(({
            question,
            callback
        }, index) => {
            const prompt = () => rlInterface.question(question, answer => {
                callback(answer, prompt);
                if (index > 0) this[this.methodName + (index - 1)]();
            });
            this[this.methodName + index] = prompt;
        })
    }

    start() {
        this[this.methodName + this.lastIndex]();
    }
}

module.exports = QuestionStream;