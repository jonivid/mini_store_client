import { Button, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as itemsSlice from "../../store/items/itemSlice";

export const ItemCardDetails = () => {
  const params = useParams("id");
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.itemsSlice.selectedItem);
  useEffect(() => {
    dispatch(itemsSlice.getItemById(params.id));
  }, []);
  return (
    <Grid container style={{ display: "flex" }} justifyContent={"center"}>
      <Grid
        item
        style={{ border: "1px solid red", display: "flex" }}
        lg={4}
        sx={12}
        container
        justifyContent={"center"}
        //left grid
      >
        <Grid item lg={8} style={{ marginTop: "20px" }}>
          <img
            src={selectedItem.image}
            alt={"Not available"}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        style={{
          border: "1px solid blue",
          height: "fit-content",
          display: "flex",
        }}
        lg={4}
        sx={12}
        justifyContent={"center"}
        //right grid
      >
        <Grid
          item
          container
          style={{
            height: "fit-content",
            display: "flex",
          }}
          lg={10}
          // sx={12}
        >
          <Grid
            item
            lg={12}
            style={{ fontSize: "25px", fontWeight: "600", marginTop: "20px" }}
          >
            {selectedItem.name}
          </Grid>
          <Grid
            item
            lg={12}
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            {selectedItem.description}
          </Grid>
          <Grid item lg={12} style={{ marginBottom: "20px" }}>
            {selectedItem.price}
          </Grid>
          <Grid item lg={12} style={{ height: "32vh" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam
            eleifend mi in nulla posuere sollicitudin aliquam. Consectetur
            adipiscing elit duis tristique sollicitudin nibh sit amet. Dictum
            fusce ut placerat orci nulla pellentesque dignissim enim. Fermentum
            et sollicitudin ac orci. Sagittis vitae et leo duis ut diam quam.
            Amet tellus cras adipiscing enim. Urna id volutpat lacus laoreet non
            curabitur gravida. Tortor vitae purus faucibus ornare. Ornare lectus
            sit amet est placerat in egestas. Diam sit amet nisl suscipit
            adipiscing bibendum est ultricies. Ultrices gravida dictum fusce ut.
            Eros in cursus turpis massa tincidunt. Vehicula ipsum a arcu cursus
            vitae congue mauris rhoncus. Tellus molestie nunc non blandit massa
            enim. Non diam phasellus vestibulum lorem sed risus. Auctor neque
            vitae tempus quam.
          </Grid>
          <Grid
            item
            lg={12}
            justifyContent={"center"}
            style={{ display: "flex" }}
          >
            <Grid item lg={3} sx={4}>
              <Button variant="contained">Buy</Button>
            </Grid>
            <Grid item lg={3} sx={4}>
              <Button variant="outlined">Add to cart</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
