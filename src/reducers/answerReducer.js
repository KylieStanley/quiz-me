export const allAnswers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ANSWER_SUCCESS':
      return action.allAnswers;
    default:
      return state;
  }
};

export const answers = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ANSWERS':
      return action.answers;
    default:
      return state;
  }
};
