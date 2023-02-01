import { csrfFetch } from "./csrf";

const ADD_QUIZ = "quiz/ADD_QUIZ";
const REMOVE_QUIZ = "quiz/REMOVE_QUIZ";
const GET_ALL_QUIZZES = "quiz/GET_ALL_QUIZZES";
const GET_QUIZ_BY_ID = "quiz/GET_QUIZ_BY_ID";
const EDIT_QUIZ = "quiz/EDIT_QUIZ";

const addQuiz = (quiz) => ({
  type: ADD_QUIZ,
  payload: quiz,
});

const getAllQuizzes = (quizzes) => ({
  type: GET_ALL_QUIZZES,
  quizzes,
});

const editQuiz = (quiz) => ({
  type: EDIT_QUIZ,
  payload: quiz,
});

const getQuizById = (quiz) => ({
  type: GET_QUIZ_BY_ID,
  quiz,
});

const removeQuiz = (quiz) => ({
  type: REMOVE_QUIZ,
  quiz,
});

const initialState = {};

export const addQuizThunk = (quiz) => async (dispatch) => {
  console.log('got here!!!!!', quiz)
  const response = await csrfFetch(`/api/quizzes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });
  if (response.ok) {
    const newQuiz = await response.json();
    console.log('?>>>>>>>>>>>>>', newQuiz)
    dispatch(addQuiz(newQuiz));
  }
  console.log('asodfijaweo;ifja', response)
  return response;
};

export const editQuizThunk = (id, quiz) => async (dispatch) => {
  const response = await csrfFetch(`/api/quizzes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });
  if (response.ok) {
    const updatedQuiz = await response.json();
    dispatch(editQuiz(updatedQuiz));
  }
  return response;
};

export const getQuizByIdThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/quizzes/${Number(id)}`);

  const data = await res.json();

  console.log(data);

  if (res.ok) {
    dispatch(getQuizById(data));
  }
  return res;
};

export const getAllQuizzesThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/quizzes/`);
  const { quizzes } = await res.json();

  if (res.ok) {
    dispatch(getAllQuizzes(quizzes));
  }
  return res;
};

export const removeQuizThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/quizzes/${Number(id)}`, {
    method: "DELETE",
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(removeQuiz(id));
    return data;
  }
};

const quizzesReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case ADD_QUIZ:
      newState = { ...state, ...action.payload };
      return newState;
    case GET_QUIZ_BY_ID:
      return { ...action.quiz };
    case GET_ALL_QUIZZES:
      newState.quizzes = action.quizzes;
      return newState;
    case EDIT_QUIZ:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_QUIZ:
      newState.quizzes = newState.quizzes.filter(n => n.id !== action.quiz )
      return newState;

    default:
      return state;
  }
};

export default quizzesReducer;
