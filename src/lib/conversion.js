// @ts-ignore
import { stringify } from "csv-stringify/browser/esm/sync";
import { genDefsMCQ, genFITB, genTermsMCQ, parseToTerms } from "./utils";

const getDefMCQ = (input) => {
  const { terms, termarr, defarr } = parseToTerms(input);

  const mcqs = genDefsMCQ(termarr, defarr, terms);

  const compat = mcqs.map((it) => {
    return {
      question: it.question,
      questionType: "Multiple Choice",
      option1: it.choices[0],
      option2: it.choices[1],
      option3: it.choices[2],
      option4: it.choices[3],
      option5: "",
      answer: it.answerIdx + 1,
      time: 30,
      imageLink: "",
    };
  });

  return toQuizizzCSV(compat);
};
const getTermMCQ = (input) => {
  const { terms, termarr, defarr } = parseToTerms(input);

  const mcqs = genTermsMCQ(termarr, defarr, terms);

  const compat = mcqs.map((it) => {
    return {
      question: it.question,
      questionType: "Multiple Choice",
      option1: it.choices[0],
      option2: it.choices[1],
      option3: it.choices[2],
      option4: it.choices[3],
      option5: "",
      answer: it.answerIdx + 1,
      time: 30,
      imageLink: "",
    };
  });

  return toQuizizzCSV(compat);
};
const getFITB = (input) => {
  const { terms } = parseToTerms(input);

  const fitbs = genFITB(terms);

  const compat = fitbs.map((it) => {
    return {
      question: it.question,
      questionType: "Fill-in-the-Blank",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      option5: "",
      answer: it.answer,
      time: 30,
      imageLink: "",
    };
  });

  return toQuizizzCSV(compat);
};

const toQuizizzCSV = (rows) => {
  return stringify(rows, {
    header: true,
    columns: {
      question: "Question Text",
      questionType: "Question Type",
      option1: "Option 1",
      option2: "Option 2",
      option3: "Option 3",
      option4: "Option 4",
      option5: "Option 5",
      answer: "Correct Answer",
      time: "Time In Seconds",
      imageLink: "Image Link",
    },
  });
};

export { getDefMCQ, getTermMCQ, getFITB };
