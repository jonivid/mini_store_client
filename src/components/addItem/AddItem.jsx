import { Button, Grid, Snackbar, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as itemsSlice from "../../store/items/itemSlice";

export const AddItem = ({ setItemsList, itemsList, setIsAddNewItem }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    img: "",
  });
  const newItemHandler = (value, key) => {
    setNewItem({ ...newItem, [`${key}`]: value });
  };
  const addNewItem = () => {
    const arr = [];
    const keys = Object.keys(newItem);
    keys.map((key) => {
      if (newItem[`${key}`] === "") {
        arr.push(`${key} value cannot be empty`);
      } else if (
        newItem[`${key}`] !== "" &&
        key === "price" &&
        newItem[`${key}`] < 0
      ) {
        arr.push(`${key} should be greater then 0`);
      }
    });
    if (arr.length > 0) {
      setMessage(arr[0]);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, [5000]);
    } else if (arr.length === 0) {
      dispatch(itemsSlice.addNewItemHandler(newItem));
      setIsAddNewItem("");
    }
  };
  return (
    <Grid
      container
      flexDirection={"column"}
      alignItems={"center"}
      display={"flex"}
      gap={"25px"}
      style={{
        border: "4px solid black",
        padding: "25px",
        borderRadius: "8px",
        marginTop: "30px",
      }}
    >
      <Grid item>
        <h1>Create Item</h1>
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => {
            newItemHandler(e.target.value, "name");
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          onChange={(e) => {
            newItemHandler(e.target.value, "description");
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          onChange={(e) => {
            newItemHandler(e.target.value, "price");
          }}
          inputProps={{
            type: "number",
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Image URL"
          variant="outlined"
          onChange={(e) => {
            newItemHandler(e.target.value, "img");
          }}
        />
      </Grid>
      <Grid>
        <Button variant="contained" onClick={() => addNewItem()}>
          Add Item
        </Button>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} message={`${message}`} />
    </Grid>
  );
};
