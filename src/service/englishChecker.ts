import nlp from "compromise";

interface Conjugation {
  Infinitive?: string;
  PastTense?: string;
  PresentTense?: string;
  Gerund?: string;
  FutureTense?: string;
}

export function checkNegativePast(sentence: string) {
  const doc = nlp(sentence);
  const errors: Array<Record<string, string>> = [];
  let correction = sentence;

  // Verificar si contiene "did not" o "didn't"
  const hasNegativeAuxiliary = doc.has("did not") || doc.has("didn't");

  if (!hasNegativeAuxiliary) {
    errors.push({
      type: "error",
      message: "La oración debe incluir 'did not' o 'didn't' para el pasado negativo.",
      correction: "Agrega 'did not' o 'didn't' para formar el pasado negativo."
    });
    return errors;
  }

  // Buscar el verbo principal después de la negación
  const matches = sentence.match(/(did not|didn't)\s+(\w+)/i);
  
  if (matches && matches[2]) {
    const verb = matches[2];
    const verbDoc = nlp(verb);
    const conjugations = verbDoc.verbs().conjugate()[0] as Conjugation;

    // Si hay conjugaciones disponibles
    if (conjugations) {
      // Comprobar si el verbo está en pasado o no está en forma base
      const isInPastTense = conjugations.PastTense === verb;
      const isNotInfinitive = conjugations.Infinitive && conjugations.Infinitive !== verb;

      if (isInPastTense || isNotInfinitive) {
        const baseForm = conjugations.Infinitive || verb.replace(/ed$/, '');
        correction = sentence.replace(verb, baseForm);
        
        errors.push({
          type: "error",
          message: `El verbo '${verb}' debe estar en su forma base después de 'did not/didn't'. La forma correcta es '${baseForm}'.`,
          correction
        });
      }
    }
  }

  // Verificar estructura general
  const hasCorrectOrder = /^(.*?)(did not|didn't) \w+/.test(sentence.toLowerCase());
  if (!hasCorrectOrder) {
    errors.push({
      type: "error",
      message: "La estructura de la oración es incorrecta. Usa: Sujeto + 'did not/didn't' + verbo en su forma base.",
      correction: ""
    });
  }

  return errors;
}