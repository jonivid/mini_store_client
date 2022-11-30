import { Button, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const ItemList = ({ setSelectedItem }) => {
  const items = useSelector((state) => state.itemsSlice.items);
  const handleSelected = (item) => {
    setSelectedItem(item);
  };
  return (
    <Grid container flexDirection={"column"} justifyContent={"space-evenly"}>
      {items.map((item) => {
        return (
          <Grid
            item
            container
            justifyContent={"space-evenly"}
            style={{
              border: "1px solid gray",
              // width: "150px",
              borderRadius: "8px",
              margin: "5px",
              paddingTop: "15px",
            }}
            onClick={() => handleSelected(item)}
          >
            {/* <Grid xs={1} lg={1}></Grid> */}
            <Grid xs={5} lg={1} item>
              <img
                src={item.image}
                alt={"null"}
                style={{
                  height: "50px",
                  width: "50px",
                }}
              />
            </Grid>
            <Grid xs={6} lg={8} item>
              <h2>{item.name}</h2>
            </Grid>
            <Grid xs={5} lg={7} item>
              <p>
                {item.description} {item.price}$
              </p>
            </Grid>
            <Grid
              xs={2}
              lg={2}
              item
              // style={{ marginTop: "15px" }}
            >
              <Button variant="contained" style={{ width: "30px" }}>
                Delete
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};
