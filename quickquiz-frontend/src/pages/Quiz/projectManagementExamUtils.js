import { PROJECT_MANAGEMENT_QUESTION_TYPES } from './projectManagementQuestions.js';

export const normalizeAnswer = (value) => String(value ?? '').trim();

export const isProjectManagementQuestionAnswered = (question, answer) =>
  normalizeAnswer(answer).length > 0;

export const isProjectManagementObjectiveCorrect = (question, answer) => {
  if (question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE) return false;
  return normalizeAnswer(answer) === normalizeAnswer(question.answer);
};

export const calculateProjectManagementScore = (correctCount, scoredCount = 385) => {
  if (!scoredCount) return 0;
  return Number(((correctCount / scoredCount) * 100).toFixed(2));
};
