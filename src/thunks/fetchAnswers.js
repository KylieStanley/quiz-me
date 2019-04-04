import { isLoading, hasErrored, fetchAnswerSuccess } from '../actions';

export const fetchAnswers = url => {
  return async dispatch => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const data = await response.json();
      dispatch(fetchAnswerSuccess(data.answers));
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  };
};
