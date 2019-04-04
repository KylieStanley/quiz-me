import { combineReducers } from 'redux';
import {
  isLoading,
  hasErrored,
  questions,
  allQuestions
} from './questionReducer';
import { answers, allAnswers } from './answerReducer';

const rootReducer = combineReducers({
  allQuestions,
  questions,
  allAnswers,
  answers,
  isLoading,
  error: hasErrored
});
export default rootReducer;
