import { Button, Grid, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as itemsSlice from "../../store/items/itemSlice";

export const ItemDetails = ({ selectedItem }) => {
  const dispatch = useDispatch();
  const [editedItem, setEditedItem] = useState(selectedItem);
  const [isSendBtnActive, setIsSendBtnActive] = useState(false);
  const [open, setOpen] = useState(false);

  const updateItem = (value, key) => {
    if (
      (value !== "" && key !== "price") ||
      (value !== "" && value > 0 && key === "price")
    ) {
      setIsSendBtnActive(true);
    } else {
      setIsSendBtnActive(false);
    }
    setEditedItem({ ...editedItem, [`${key}`]: value });
  };

  const saveItemDetails = () => {
    dispatch(itemsSlice.updateItemHandler(editedItem));
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, [5000]);
    setIsSendBtnActive(false);
  };

  useEffect(() => {
    console.log("useEf")
    setEditedItem(selectedItem);
    setIsSendBtnActive(false);
  }, [selectedItem]);

  return (
    <Grid container>
      {selectedItem !== "" ? (
        <Grid
          item
          container
          style={{
            // marginLeft: "20px",
            border: "5px solid black",
            borderRadius: "8px",
            padding: "20px",
          }}
          justifyContent={"center"}
        >
          <Grid item xs={12} lg={11}>
            <img
              src={editedItem.image}
              style={{ height: "150px", width: "250px" }}
              alt={"null"}
            />
          </Grid>
          <Grid container item justifyContent={"center"}>
            <Grid item xs={12} lg={11}>
              <label htmlFor="">Name:</label>
            </Grid>
            <Grid item xs={12} lg={11}>
              <TextField
                type="text"
                value={editedItem.name}
                onChange={(e) => updateItem(e.target.value, "name")}
              />
            </Grid>
          </Grid>
          <Grid container item justifyContent={"center"}>
            <Grid item xs={12} lg={11}>
              <label htmlFor="">Description: </label>
            </Grid>
            <Grid item xs={12} lg={11}>
              <TextField
                type="text"
                value={editedItem.description}
                onChange={(e) => updateItem(e.target.value, "description")}
              />
            </Grid>
          </Grid>
          <Grid container item justifyContent={"center"}>
            <Grid item xs={12} lg={11}>
              <label htmlFor="">Price: </label>
            </Grid>
            <Grid item xs={12} lg={11}>
              <TextField
                type="number"
                value={editedItem.price}
                onChange={(e) => updateItem(e.target.value, "price")}
              />
            </Grid>
            <Grid item xs={12} lg={11}>
              <TextField
                type="text"
                value={editedItem.image}
                onChange={(e) => updateItem(e.target.value, "image")}
              />
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "10px" }} lg={4}>
            <Button
              variant="contained"
              onClick={() => saveItemDetails()}
              disabled={isSendBtnActive === false}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      ) : null}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        // onClose={handleClose}
        message={`Thank you for updating ${editedItem.name}`}
        // action={action}
      />
    </Grid>
  );
};
