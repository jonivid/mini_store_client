import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { ItemCard } from "../itemCard/ItemCard";

export const ItemsLayout = () => {
  const items = useSelector((state) => state.itemsSlice.items);
  return (
    <Grid
      container
      justifyContent={"center"}
      display={"flex"}
      style={{
        border: "1px solid blue",
        zIndex: 1,
      }}
    >
      <Grid
        container
        item
        lg={8}
        display={"flex"}
        style={{ border: "1px solid green" }}
        align={"center"}
        flexDirection={"row"}
      >
        {items.map((item) => {
          return (
            <Grid item lg={4} style={{ marginBottom: "50px" }}>
              <ItemCard itemObj={item} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
