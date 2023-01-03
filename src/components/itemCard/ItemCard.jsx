import { Button, Grid, IconButton } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import * as itemsSlice from "../../store/items/itemSlice";
import "./style.css";
export const ItemCard = ({ itemObj }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Grid
      //card grid
      container
      display={"flex"}
    >
      <Grid
        //image grid
        item
        lg={12}
        sx={12}
      >
        <img
          src={itemObj.image}
          alt={"source is broken"}
          style={{ height: "200px", width: "300px" }}
          onClick={() => {
            dispatch(itemsSlice.setSelectedItem(itemObj));
            navigate(`${itemObj.id}`);
          }}
          className={"item-image"}
        ></img>
      </Grid>
      <Grid item lg={12} sx={12}>
        {/* <IconButton>
          <FavoriteIcon style={{ fill: "red" }} />
        </IconButton> */}
        <IconButton>
          <FavoriteBorderIcon style={{ fill: "red" }} />
        </IconButton>
      </Grid>
      <Grid
        //header grid
        item
        lg={12}
        sx={12}
        onClick={() => {
          dispatch(itemsSlice.setSelectedItem(itemObj));
        }}
      >
        <Link
          style={{ textDecoration: "none", color: "#89734b" }}
          to={`${itemObj.id}`}
          preventScrollReset={true}
        >
          {itemObj.name}
        </Link>
      </Grid>
      <Grid
        //Price grid
        item
        container
        display={"flex"}
        justifyContent={"center"}
      >
        <Grid
          item
          lg={2}
          sx={2}
          style={{
            textDecoration: "line-through",
            color: "#b9b9b9",
            fontSize: "23px",
          }}
        >
          ₪{itemObj.price}
        </Grid>
        <Grid
          item
          lg={2}
          sx={2}
          style={{ fontSize: "23px", fontWeight: "600" }}
        >
          ₪{itemObj.price}
        </Grid>
      </Grid>
      <Grid
        //buttons grid
        item
        container
        display={"flex"}
        justifyContent={"center"}
      >
        <Grid item lg={4} sx={4}>
          <Button variant="contained">Buy</Button>
        </Grid>
        <Grid item lg={4} sx={4}>
          <Button
            variant="outlined"
            onClick={() =>
              dispatch(
                itemsSlice.addToCart({
                  name: itemObj.name,
                  id: itemObj.id,
                  quantity: 1,
                  price: itemObj.price,
                }),
              )
            }
          >
            Add to cart
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
