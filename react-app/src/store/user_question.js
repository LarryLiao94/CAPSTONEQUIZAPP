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
    const response = await csrfFetch("api/user_questions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_question)
    });
    if (response.ok) {
    const data = await response.json();
    console.log(data)
    dispatch(postUserQuestion(data.user_question));
  };
};

// Initial State
const initialState = {
  allUserQuestions: [],
  correctUserQuestions: []
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_QUESTIONS:
      return { ...state, allUserQuestions: action.user_questions };
    case GET_CORRECT_USER_QUESTIONS:
      return { ...state, correctUserQuestions: action.user_questions };
    case POST_USER_QUESTION:
      return { ...state, allUserQuestions: [...state.allUserQuestions, action.user_question] };
    default:
      return state;
  }
};
