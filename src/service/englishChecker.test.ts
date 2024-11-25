import { expect, test } from "vitest"
import { checkNegativePast } from "./englishChecker";

const testCases = [
    // Correct Sentences
    {
      sentence: "She did not go to the party last night.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "I did not eat breakfast yesterday.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "They did not finish their homework on time.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "He did not call me back after the meeting.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "We did not enjoy the movie.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "The teacher did not explain the topic well.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "I did not see the email you sent.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "The car did not start this morning.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "He did not like the food at the restaurant.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "We did not play soccer on Sunday.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "She didn't go to school yesterday.",
      expectedErrors: 0,
      expectedMessage: null,
    },
    {
      sentence: "Didn't he come to the meeting?",
      expectedErrors: 0,
      expectedMessage: null,
    },
  
    // Incorrect Sentences
    {
      sentence: "She did not went to the party.",
      expectedErrors: 1,
      expectedMessage: "The verb 'went' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "I did not ate breakfast.",
      expectedErrors: 1,
      expectedMessage: "The verb 'ate' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "They did not finished their homework.",
      expectedErrors: 1,
      expectedMessage: "The verb 'finished' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "He did not called me back.",
      expectedErrors: 1,
      expectedMessage: "The verb 'called' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "We did not enjoyed the movie.",
      expectedErrors: 1,
      expectedMessage: "The verb 'enjoyed' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "The teacher did not explained the topic well.",
      expectedErrors: 1,
      expectedMessage: "The verb 'explained' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "I did not saw the email you sent.",
      expectedErrors: 1,
      expectedMessage: "The verb 'saw' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "The car did not started this morning.",
      expectedErrors: 1,
      expectedMessage: "The verb 'started' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "He did not liked the food at the restaurant.",
      expectedErrors: 1,
      expectedMessage: "The verb 'liked' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "We did not played soccer on Sunday.",
      expectedErrors: 1,
      expectedMessage: "The verb 'played' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "She didn't went to school yesterday.",
      expectedErrors: 1,
      expectedMessage: "The verb 'went' should be in its base form after 'did not' or 'didn't'.",
    },
    {
      sentence: "Didn't he came to the meeting?",
      expectedErrors: 1,
      expectedMessage: "The verb 'came' should be in its base form after 'did not' or 'didn't'.",
    },
];
  
test.each(testCases)("checkNegativePast: %o", ({ sentence, expectedErrors, expectedMessage}) => {
    const result = checkNegativePast(sentence);

    expect(result).toHaveLength(expectedErrors);

    if (expectedErrors > 0) {
        expect(result[0].message).toBe(expectedMessage);
    }
})
