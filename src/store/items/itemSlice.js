import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let itemSlice = createSlice({
  name: "itemSlice",
  initialState: {
    items: [],
    selectedItem: {},
    cartItems: [],
    cartItemsQuantity: 0,
  },
  reducers: {
    setItemList: (state, action) => {
      state.items = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartItemsQuantity: (state, action) => {
      state.cartItemsQuantity = action.payload;
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
  (searchValue, sortValues) => async (dispatch, getState) => {
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
export const addNewItemHandler = (newItem) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/items/add_new_item`,
      { newItem },
    );
    if (res.status === 200) {
      const itemsList = [...getState().itemsSlice.items];
      itemsList.push(newItem);
      dispatch(setItemList(itemsList));
    }
  } catch (error) {
    console.log("addNewItemHandler:", error);
  }
};
export const deleteItemHandler = (item) => async (dispatch, getState) => {
  console.log(item);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/items/delete_item`,
      { item },
    );
    if (res.status === 200) {
      const itemsList = [...getState().itemsSlice.items];
      const indexToRemove = itemsList.findIndex(
        (i) => Number(i.id) === Number(item.id),
      );
      itemsList.splice(indexToRemove, 1);
      dispatch(setItemList(itemsList));
    }
  } catch (error) {
    console.log("deleteItemHandler:", error);
  }
};

export const getItemById = (params) => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/items/${params}`,
    );
    dispatch(setSelectedItem(res.data[0]));
  } catch (error) {
    console.log("getItemById:", error);
  }
};
export const addToCart = (item) => async (dispatch, getState) => {
  const cartItems = [...getState().itemsSlice.cartItems];
  const index = cartItems.findIndex((i) => Number(i.id) === Number(item.id));
  if (index === -1) {
    cartItems.push(item);
  } else {
    item.quantity = Number(cartItems[index].quantity) + Number(item.quantity);
    cartItems.splice(index, 1, item);
  }

  try {
    let itemQ = 0;
    cartItems.forEach((item) => {
      itemQ += Number(item.quantity);
    });
    dispatch(setCartItems(cartItems));
    dispatch(setCartItemsQuantity(itemQ));
  } catch (error) {
    console.log("addToCart:", error);
  }
};
export const updateCart = (item, navigate) => async (dispatch, getState) => {
  const cartItems = [...getState().itemsSlice.cartItems];

  const index = cartItems.findIndex((i) => Number(i.id) === Number(item.id));
  if (index === -1) {
    cartItems.push(item);
  } else {
    if (Number(item.quantity) === 0) {
      cartItems.splice(index, 1);
      if (cartItems.length === 0) {
        navigate("/");
      }
    } else {
      cartItems.splice(index, 1, item);
    }
  }

  try {
    let itemQ = 0;
    cartItems.forEach((item) => {
      itemQ += Number(item.quantity);
    });
    dispatch(setCartItems(cartItems));
    dispatch(setCartItemsQuantity(itemQ));
  } catch (error) {
    console.log("addToCart:", error);
  }
};

export const {
  setItemList,
  setSelectedItem,
  setCartItems,
  setCartItemsQuantity,
} = itemSlice.actions;

export default itemSlice.reducer;
