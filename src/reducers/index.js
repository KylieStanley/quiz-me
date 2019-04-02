import { combineReducers } from 'redux';
import { isLoading, hasErrored, questions } from './questionReducer';

const rootReducer = combineReducers({
  questions,
  isLoading,
  error: hasErrored
});
export default rootReducer;
