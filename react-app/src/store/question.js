import { csrfFetch } from "./csrf";

const ADD_QUESTION = "question/ADD_QUESTION";
const REMOVE_QUESTION = "question/REMOVE_QUESTION";
const GET_ALL_QUESTIONS = "question/GET_ALL_QUESTIONS";
const GET_QUESTION_BY_ID = "question/GET_QUESTION_BY_ID";
const EDIT_QUESTION = "question/EDIT_QUESTION";
const GET_PROFILE_QUESTION = "question/GET_PROFILE_QUESTION";

const getProfileQuestion = (questions) => ({
  type: GET_PROFILE_QUESTION,
  questions
})

const getQuestionById = (question) => ({
  type: GET_QUESTION_BY_ID,
  question,
});

const editQuestion = (question) => ({
  type: EDIT_QUESTION,
  payload: question,
});

const getAllQuestions = (questions) => ({
    type: GET_ALL_QUESTIONS,
    questions
  });
  
  const addQuestion = (question) => ({
    type: ADD_QUESTION,
    payload: question,
  });
  
  const removeQuestion = (question) => ({
    type: REMOVE_QUESTION,
    question,
  });
  

export const getQuestionByIdThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/questions/${Number(id)}`);
  const { question } = await res.json();
  if (res.ok) {
    dispatch(getQuestionById(question));
  }
  return res;
};

export const getProfileQuestionThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/profile/`);
  const { questions } = await res.json();
  if (res.ok) {
    dispatch(getProfileQuestion(questions));
  }
  return res;
};

export const editQuestionThunk = (id, question) => async (dispatch) => {
  const response = await csrfFetch(`/api/questions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  });
  if (response.ok) {
    const updatedQuestion = await response.json();
    dispatch(editQuestion(updatedQuestion));
  }
  return response;
};

export const getAllQuestionsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/questions/`);
    const { questions } = await res.json();
    if (res.ok) {
      dispatch(getAllQuestions(questions));
    }
    return res;
  };
  
  export const addQuestionThunk = (question) => async (dispatch) => {
    const response = await csrfFetch(`/api/questions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    if (response.ok) {
      const newQuestion = await response.json();
      dispatch(addQuestion(newQuestion));
    }
    return response;
  };
  
  export const removeQuestionThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/questions/${Number(id)}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(removeQuestion(id));
      return data;
    }
  };
  

const initialState = {};

const questionsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case ADD_QUESTION:
        newState = { ...state, ...action.payload };
        return newState;
    case GET_QUESTION_BY_ID:
      return { ...action.question };
    case EDIT_QUESTION:
      return { ...state, ...action.payload };
    case GET_ALL_QUESTIONS:
        newState.questions = action.questions;
        return newState;
    case GET_PROFILE_QUESTION:
        newState.questions = action.questions;
        return newState;
    case REMOVE_QUESTION:
      newState.questions = newState.questions.filter(n => n.id !== action.question )
      return newState;
    
    default:
        return state;
  }
};

export default questionsReducer;
