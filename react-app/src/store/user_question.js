import { csrfFetch } from "./csrf";

const GET_ALL_USER_QUESTIONS = "user_questions/GET_ALL_USER_QUESTIONS";
const GET_CORRECT_USER_QUESTIONS = "user_questions/GET_CORRECT_USER_QUESTIONS";
const POST_USER_QUESTION = "user_questions/POST_USER_QUESTION";

// Action creators
const getAllUserQuestions = (user_questions) => ({
  type: GET_ALL_USER_QUESTIONS,
  user_questions
});

const getCorrectUserQuestions = (user_questions) => ({
  type: GET_CORRECT_USER_QUESTIONS,
  user_questions
});

const postUserQuestion = (user_question) => ({
  type: POST_USER_QUESTION,
  user_question
});

// Asynchronous thunk action creators
export const fetchAllUserQuestions = () => {
  return async (dispatch) => {
    const response = await csrfFetch("/user_questions/");
    const data = await response.json();
    dispatch(getAllUserQuestions(data.user_questions));
  };
};

export const fetchCorrectUserQuestions = () => {
  return async (dispatch) => {
    const response = await csrfFetch("/user_questions/correct");
    const data = await response.json();
    dispatch(getCorrectUserQuestions(data.user_questions));
  };
};

export const createUserQuestion = (user_question) => async (dispatch) => {
    const response = await csrfFetch("/api/user_questions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_question)
    });
    if (response.ok) {
    const data = await response.json();
    dispatch(postUserQuestion(data));
  };
};

// Initial State
const initialState = {
  userQuestions: [],
};

const userQuestionsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_ALL_USER_QUESTIONS:
      newState.userQuestions = action.user_questions;
      return newState;
    case GET_CORRECT_USER_QUESTIONS:
      newState.userQuestions = action.user_questions;
      return newState;
    case POST_USER_QUESTION:
      newState.userQuestions.push(action.user_question);
      return newState;
    default:
      return state;
  }
};

export default userQuestionsReducer;