const matchers = require("jest-extended");
expect.extend(matchers);
/**

  Let's peer into the future using a Magic 8 Ball!
  https://en.wikipedia.org/wiki/Magic_8-Ball 

  There are a few steps to being able view the future though:
  * Ask a question
  * Shake the ball
  * Get an answer
  * Decide if it's positive or negative

  The question can be anything, but the answers are fixed,
  and have different levels of positivity or negativity.

  Below are the possible answers:

  ## Very positive
    It is certain.
    It is decidedly so.
    Without a doubt.
    Yes - definitely.
    You may rely on it.

  ## Positive
    As I see it, yes.
    Most likely.
    Outlook good.
    Yes.
    Signs point to yes.

  ## Negative
    Reply hazy, try again.
    Ask again later.
    Better not tell you now.
    Cannot predict now.
    Concentrate and ask again.

  ## Very negative
    Don't count on it.
    My reply is no.
    My sources say no.
    Outlook not so good.
    Very doubtful.
*/

let answers = {
    veryPositive: [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes - definitely.",
        "You may rely on it.",
    ],
    positive: [
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
    ],

    negative: [
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
    ],
    veryNegative: [
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
    ],
};

// This should log "The ball has shaken!"
// and return the answer.
function shakeBall() {
    //Write your code in here
    let positivity = Math.floor(Math.random() * 4); // random number between 0 and 4 - the possible outcomes for veryPositive - veryNegative
    let possibleAnswers = Math.floor(Math.random() * 5); // random number between 0 and 5 - the possible outcomes for each possible answer from the arrays veryPositive - veryNegative
    console.log("The ball has shaken!");
    if (positivity === 0) {
        return answers.veryPositive[possibleAnswers];
    } else if (positivity === 1) {
        return answers.positive[possibleAnswers];
    } else if (positivity === 2) {
        return answers.negative[possibleAnswers];
    } else if (positivity === 3) {
        return answers.veryNegative[possibleAnswers];
    }
}

/* 
  This function should say whether the answer it is given is
    - very positive
    - positive
    - negative
    - very negative

  This function should expect to be called with any value which was returned by the shakeBall function.
*/
function checkAnswer(answer) {
    //Write your code in here
    if (answers.veryPositive.includes(answer)) {
        return "very positive";
    } else if (answers.positive.includes(answer)) {
        return "positive";
    } else if (answers.negative.includes(answer)) {
        return "negative";
    } else if (answers.veryNegative.includes(answer)) {
        return "very negative";
    }
}

/* 
==================================
======= TESTS - DO NOT MODIFY =====

There are some Tests in this file that will help you work out if your code is working.

To run these tests type `npm run extraTo run the tests for just this one file, type `npm run extra-tests -- --testPathPattern 3-magic-8-ball` into your terminal
(Reminder: You must have run `npm install` one time before this will work!)
==================================
*/

test("whole magic 8 ball sequence", () => {
    const consoleLogSpy = jest.spyOn(global.console, "log");
    const answer = shakeBall();

    expect(typeof answer).toEqual("string");

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenLastCalledWith("The ball has shaken!");

    expect(checkAnswer(answer)).toBeOneOf([
        "very positive",
        "positive",
        "negative",
        "very negative",
    ]);
});

test("magic 8 ball returns different values each time", () => {
    const seenAnswers = new Set();
    for (let i = 0; i < 10; ++i) {
        seenAnswers.add(shakeBall());
    }
    if (seenAnswers.size < 2) {
        throw Error(
            "Expected to get different random answers each time shakeBall was called, but always got the same one"
        );
    }

    let seenPositivities = new Set(
        Array.from(seenAnswers.values()).map(checkAnswer)
    );
    if (seenPositivities.size < 2) {
        throw Error(
            "Expected to random answers with different positivities each time shakeBall was called, but always got the same one"
        );
    }
});

test("checkAnswer works for `It is decidedly so.`", () => {
    expect(checkAnswer("It is decidedly so.")).toEqual("very positive");
});

test("checkAnswer works for `My reply is no.`", () => {
    expect(checkAnswer("My reply is no.")).toEqual("very negative");
});