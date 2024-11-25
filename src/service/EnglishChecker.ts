import nlp from "compromise";

// Lista de verbos irregulares en pasado
const irregularVerbs = ["went", "saw", "ate", "did", "ran"]; // Puedes expandir esta lista

export function checkPastSimple(sentence: string) {
  const doc = nlp(sentence);
  const tokens = doc.out("array"); // Dividimos la oración en tokens (palabras)
  const feedback = [];

  // Verificar estructura básica de afirmaciones
  if (doc.has("#PastTense") && !doc.has("did #Verb")) {
    // Oración en pasado simple correcta
    return { valid: true, feedback: "The sentence is correct!" };
  }

  // Verificar negaciones
  if (doc.has("did not") || doc.has("didn't")) {
    const afterDid = tokens[tokens.indexOf("did") + 1];
    if (afterDid && /ed$/.test(afterDid)) {
      feedback.push(
        "In negative sentences, use the base form of the verb after 'did not'."
      );
    }
  }

  // Verificar afirmaciones con verbos irregulares
  tokens.forEach((word: string, index: number) => {
    if (irregularVerbs.includes(word) && tokens[index - 1] === "did") {
      feedback.push(
        `Do not use '${word}' after 'did'. Replace it with the base form (e.g., 'go' instead of 'went').`
      );
    }
  });

  // Verificar estructura de preguntas
  if (doc.has("did #Noun")) {
    const verbAfterDid = tokens[tokens.indexOf("did") + 1];
    if (verbAfterDid && /ed$/.test(verbAfterDid)) {
      feedback.push(
        "In questions, use the base form of the verb after 'did'."
      );
    }
  }

  return {
    valid: feedback.length === 0,
    feedback: feedback.length ? feedback : "The sentence is correct!",
  };
}