import { isLoading, hasErrored, fetchQuestionSuccess } from '../actions';

export const fetchQuestions = url => {
  return async dispatch => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const data = await response.json();
      dispatch(fetchQuestionSuccess(data.questions));
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  };
};
