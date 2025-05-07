import { type Character, type Question, characters, questions } from './characters';

export type Answer = 'yes' | 'no' | 'unknown';

export interface GameState {
  currentQuestion: number;
  askedQuestions: Answer[];
  possibleCharacters: Character[];
  guessedCharacter: Character | null;
  confidence: number;
  gameOver: boolean;
  difficulty: DifficultyLevel;
  category: Category;
  remainingQuestions: Question[];
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type Category = 'all' | 'movies' | 'books' | 'games' | 'history' | 'sports' | 'cartoons';

export const initialGameState: GameState = {
  currentQuestion: 0,
  askedQuestions: [],
  possibleCharacters: [...characters],
  guessedCharacter: null,
  confidence: 0,
  gameOver: false,
  difficulty: 'medium',
  category: 'all',
  remainingQuestions: [...questions],
};

/**
 * Calculate the information entropy of a boolean attribute in the character set
 * Higher entropy means the question will provide more information
 */
const calculateEntropy = (characters: Character[], attribute: string): number => {
  if (characters.length === 0) return 0;

  // Count how many characters have the attribute as true
  const trueCount = characters.filter(char => char.attributes[attribute]).length;

  // Calculate probabilities
  const pTrue = trueCount / characters.length;
  const pFalse = 1 - pTrue;

  // Handle edge cases where probability is 0 to avoid NaN
  const entropyTrue = pTrue === 0 ? 0 : -pTrue * Math.log2(pTrue);
  const entropyFalse = pFalse === 0 ? 0 : -pFalse * Math.log2(pFalse);

  // Total entropy
  return entropyTrue + entropyFalse;
};

/**
 * Calculate expected information gain for a question
 * Uses the concept of information entropy reduction
 */
const calculateInformationGain = (characters: Character[], attribute: string): number => {
  // Current entropy of the system
  const currentEntropy = calculateSetEntropy(characters);

  // Divide characters based on the attribute
  const trueSet = characters.filter(char => char.attributes[attribute]);
  const falseSet = characters.filter(char => !char.attributes[attribute]);

  // Calculate entropy after asking the question
  const pTrue = trueSet.length / characters.length;
  const pFalse = falseSet.length / characters.length;

  const entropyAfter =
    pTrue * calculateSetEntropy(trueSet) +
    pFalse * calculateSetEntropy(falseSet);

  // Information gain is the reduction in entropy
  return currentEntropy - entropyAfter;
};

/**
 * Calculate entropy of the entire character set
 * This measures how "uncertain" we are about which character is being thought of
 */
const calculateSetEntropy = (characters: Character[]): number => {
  if (characters.length === 0) return 0;

  // In a uniform distribution, each character has equal probability
  const probability = 1 / characters.length;

  // Entropy formula for a uniform distribution
  return -Math.log2(probability);
};

/**
 * Selects the next best question to ask based on information theory
 * Chooses the question that will provide the most information gain
 */
export const selectNextQuestion = (state: GameState): Question | null => {
  if (state.remainingQuestions.length === 0) {
    return null;
  }

  // If we have very few characters left, just pick the first question
  if (state.possibleCharacters.length <= 1) {
    return state.remainingQuestions[0];
  }

  // Apply different algorithms based on difficulty level
  if (state.difficulty === 'easy') {
    // For easy mode, just pick questions randomly to make it harder to guess correctly
    const randomIndex = Math.floor(Math.random() * state.remainingQuestions.length);
    return state.remainingQuestions[randomIndex];
  }

  // For medium and hard difficulty, use information theory
  // Hard difficulty uses pure information gain
  // Medium difficulty uses a combination of information gain and some randomness

  // Calculate information gain for each question
  const questionsWithGain = state.remainingQuestions.map(question => ({
    question,
    gain: calculateInformationGain(state.possibleCharacters, question.attribute)
  }));

  // Sort by information gain (highest first)
  questionsWithGain.sort((a, b) => b.gain - a.gain);

  if (state.difficulty === 'hard') {
    // In hard mode, always choose the question with the highest information gain
    return questionsWithGain[0].question;
  }

  // In medium mode, choose from the top 3 questions with some randomness
  const topQuestions = questionsWithGain.slice(0, Math.min(3, questionsWithGain.length));
  const randomIndex = Math.floor(Math.random() * topQuestions.length);
  return topQuestions[randomIndex].question;
};

/**
 * Updates the game state based on the user's answer
 */
export const updateGameState = (state: GameState, answer: Answer): GameState => {
  if (state.gameOver) {
    return state;
  }

  const currentQuestion = state.remainingQuestions[state.currentQuestion];
  if (!currentQuestion) {
    return state;
  }

  const askedQuestions = [...state.askedQuestions, answer];
  let possibleCharacters = [...state.possibleCharacters];

  if (answer !== 'unknown') {
    possibleCharacters = possibleCharacters.filter((character) => {
      const attributeValue = character.attributes[currentQuestion.attribute];
      return answer === 'yes' ? attributeValue : !attributeValue;
    });
  }

  const remainingQuestions = state.remainingQuestions.filter(
    (q) => q.id !== currentQuestion.id
  );

  // Check if game should end
  let gameOver = false;
  let guessedCharacter = null;
  let confidence = 0;

  // End the game if:
  // 1. We've asked enough questions, or
  // 2. We've narrowed down to 1 character, or
  // 3. We've narrowed down to a few characters, or
  // 4. We've run out of questions

  // Adjust the conditions based on difficulty level
  const maxQuestions = state.difficulty === 'easy' ? 15 : state.difficulty === 'medium' ? 12 : 8;
  const minCharactersToEnd = state.difficulty === 'easy' ? 1 : state.difficulty === 'medium' ? 2 : 3;

  if (
    askedQuestions.length >= maxQuestions ||
    possibleCharacters.length <= minCharactersToEnd ||
    remainingQuestions.length === 0
  ) {
    gameOver = true;

    // Select the most likely character (for now, just the first one)
    if (possibleCharacters.length > 0) {
      guessedCharacter = possibleCharacters[0];
      // Calculate confidence based on how many characters are left
      // More characters = less confidence
      confidence = Math.min(100, (100 / possibleCharacters.length));
    }
  }

  // Select the next question
  const nextQuestion = gameOver ? null : selectNextQuestion({
    ...state,
    remainingQuestions,
    possibleCharacters,
  });

  return {
    ...state,
    currentQuestion: state.currentQuestion + 1,
    remainingQuestions,
    askedQuestions,
    possibleCharacters,
    gameOver,
    guessedCharacter,
    confidence,
  };
};

/**
 * Starts a new game with the specified options
 */
export const startNewGame = (
  difficulty: DifficultyLevel = 'medium',
  category: Category = 'all'
): GameState => {
  let filteredCharacters = [...characters];

  if (category !== 'all') {
    filteredCharacters = filterCharactersByCategory(filteredCharacters, category);
  }

  if (filteredCharacters.length < 5) {
    filteredCharacters = [...characters];
  }

  return {
    ...initialGameState,
    possibleCharacters: filteredCharacters,
    remainingQuestions: [...questions],
    difficulty,
    category,
  };
};

/**
 * Filter characters by category
 */
const filterCharactersByCategory = (characters: Character[], category: Category): Character[] => {
  switch (category) {
    case 'movies':
      return characters.filter(char => char.attributes.isFromMovie);
    case 'books':
      return characters.filter(char => char.attributes.isFromBook);
    case 'games':
      return characters.filter(char => char.attributes.isFromGame || char.attributes.isFromVideoGame);
    case 'history':
      return characters.filter(char => char.attributes.isHistorical);
    case 'sports':
      return characters.filter(char => char.attributes.isSportsRelated);
    case 'cartoons':
      return characters.filter(char => char.attributes.isAnimated);
    default:
      return characters;
  }
};

export function getNextQuestion(state: GameState): string {
  if (state.gameOver || state.currentQuestion >= state.remainingQuestions.length) {
    return '';
  }
  return state.remainingQuestions[state.currentQuestion]?.text || '';
}
