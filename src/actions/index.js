export const isLoading = bool => ({
  type: 'IS_LOADING',
  isLoading: bool
});

export const hasErrored = message => ({
  type: 'HAS_ERRORED',
  message
});

export const fetchQuestionSuccess = allQuestions => ({
  type: 'FETCH_QUESTION_SUCCESS',
  allQuestions
});

export const updateQuestions = questions => ({
  type: 'UPDATE_QUESTIONS',
  questions
});
