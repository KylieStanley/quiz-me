export const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
};

export const hasErrored = (state = '', action) => {
  switch (action.type) {
    case 'HAS_ERRORED':
      return action.message;
    default:
      return state;
  }
};

export const allQuestions = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_QUESTION_SUCCESS':
      return action.allQuestions;
    default:
      return state;
  }
};

export const questions = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_QUESTIONS':
      return action.questions;
    default:
      return state;
  }
};
