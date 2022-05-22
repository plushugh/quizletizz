function parseToTerms(str) {
  let terms = {};

  let tstr = str.split("%");

  tstr.forEach((itstr) => {
    let [term, def] = itstr.split("`");
    terms[term] = def;
  });

  delete terms[""];

  let termarr = Object.keys(terms);
  let defarr = Object.values(terms);

  return { termarr, defarr, terms };
}

function genFITB(terms) {
  let defs = objectFlip(terms);
  let fitb = [];

  Object.keys(defs).forEach((def) => {
    fitb.push({
      question: def,
      answer: defs[def],
    });
  });

  let shuffled = fitb.sort(() => 0.5 - Math.random());
  return shuffled;
}

function genDefsMCQ(termarr, defarr, terms) {
  let mcqs = [];
  termarr.forEach((termname) => {
    let randDefs = get3RandDefs(defarr, terms[termname]);
    let ansDef = terms[termname];
    let choices = [ansDef, ...randDefs];
    mcqs.push({
      question: termname,
      choices,
      answer: ansDef,
      answerIdx: choices.indexOf(ansDef), // USELESS NOW
    });
  });

  let shuffled = mcqs.sort(() => 0.5 - Math.random());

  return shuffled;
}
function genTermsMCQ(termarr, defarr, terms) {
  let mcqs = [];

  let defs = objectFlip(terms);

  defarr.forEach((defname) => {
    let randTerms = get3RandTerms(termarr, defs[defname]);
    let ansTerm = defs[defname];
    let choices = [ansTerm, ...randTerms];
    mcqs.push({
      question: defname,
      choices,
      answer: ansTerm,
      answerIdx: choices.indexOf(ansTerm), // USELESS NOW
    });
  });

  let shuffled = mcqs.sort(() => 0.5 - Math.random());

  return shuffled;
}

function get3RandDefs(defarr, exclude) {
  defarr = defarr.filter((item) => item !== exclude);
  let shuffled = defarr.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 3);
}
function get3RandTerms(termarr, exclude) {
  termarr = termarr.filter((item) => item !== exclude);

  let shuffled = termarr.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 3);
}

function objectFlip(obj) {
  const ret = {};
  Object.keys(obj).forEach((key) => {
    ret[obj[key]] = key;
  });
  return ret;
}

export { parseToTerms, genFITB, genDefsMCQ, genTermsMCQ };
