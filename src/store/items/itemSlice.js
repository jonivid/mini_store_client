import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let itemSlice = createSlice({
  name: "itemSlice",
  initialState: {
    items: [],
  },
  reducers: {
    setItemList: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const getItemsListAsync = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/items`);
    dispatch(setItemList(res.data));
  } catch (error) {
    console.log("getItemsListAsync:", error);
  }
};
export const updateItemHandler = (editedItem) => async (dispatch, getState) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/items/update_item`,
      { editedItem },
    );
    if (res.status === 200) {
      const itemsList = [...getState().itemsSlice.items];
      const itemIndex = itemsList.findIndex(
        (item) => Number(item.id) === Number(editedItem.id),
      );
      itemsList.splice(itemIndex, 1, editedItem);
      dispatch(setItemList(itemsList));
    }
  } catch (error) {
    console.log("updateItemHandler:", error);
  }
};

export const filterItemsHandler =
  (searchValue,sortValues) => async (dispatch, getState) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/items/search_by_value`,
        { searchValue, sortValues },
      );
      dispatch(setItemList(res.data));
    } catch (error) {
      console.log("filterItemsHandler:", error);
    }
  };

export const { setItemList } = itemSlice.actions;

export default itemSlice.reducer;
