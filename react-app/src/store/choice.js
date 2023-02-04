import { csrfFetch } from "./csrf";

const EDIT_CHOICE = "choice/EDIT_CHOICE";

const editQuestion = (choice) => ({
  type: EDIT_CHOICE,
  payload: choice,
});

export const editChoiceThunk = (id, choice) => async (dispatch) => {
  const response = await csrfFetch(`/api/choices/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(choice),
  });
  if (response.ok) {
    const updatedChoice = await response.json();
    dispatch(editQuestion(updatedChoice));
  }
  return response;
};

const initialState = {};

const choicesReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case EDIT_CHOICE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default choicesReducer
