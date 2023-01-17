import { csrfFetch } from "./csrf";

const GET_ALL_CATEGORIES = "categories/GET_ALL_CATEGORIES";
const GET_CATEGORY_BY_ID = "categories/GET_CATEGORY_BY_ID";

const getAllCategories = (categories) => ({
  type: GET_ALL_CATEGORIES,
  categories,
});

const getCategoryById = (category) => ({
  type: GET_CATEGORY_BY_ID,
  category,
});

const initialState = {};

export const getAllCategoriesThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/categories/`);
  const {categories} = await res.json();

  if (res.ok) {
    const data = {};
    categories.forEach((category) => (categories[category.id] = category));
    dispatch(getAllCategories(categories));
  }
  return res;
};

export const getCategoryByIdThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/categories/${Number(id)}`);
  const data = await res.json();

  if (res.ok) {
    dispatch(getCategoryById(data));
  }
  return res;
};

const categoriesReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_ALL_CATEGORIES:
      newState.categories = action.categories;
      return newState;
    case GET_CATEGORY_BY_ID:
      newState.category = action.category;
      return newState;
    default:
      return state;
  }
};

export default categoriesReducer;
