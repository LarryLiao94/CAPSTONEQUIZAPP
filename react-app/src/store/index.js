import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import quizzesReducer from './quiz';
import categoriesReducer from './category';
import questionsReducer from './question';
import choicesReducer from './choice';
import userQuestionsReducer from './user_question';

const rootReducer = combineReducers({
  session,
  quizzes: quizzesReducer,
  categories: categoriesReducer,
  questions: questionsReducer,
  choices: choicesReducer,
  user_questions: userQuestionsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
