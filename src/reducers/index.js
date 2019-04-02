import { combineReducers } from 'redux';
import {
  isLoading,
  hasErrored,
  questions,
  allQuestions
} from './questionReducer';

const rootReducer = combineReducers({
  allQuestions,
  questions,
  isLoading,
  error: hasErrored
});
export default rootReducer;
