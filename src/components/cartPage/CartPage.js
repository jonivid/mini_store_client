import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as itemsSlice from "../../store/items/itemSlice";

export const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.itemsSlice.cartItems);

  return (
    <Grid container display={"flex"} justifyContent={"center"}>
      {/* cart detail grid */}
      <Grid flexDirection={"column"} alignItems={"center"}>
        <Grid item container flexDirection={"row"} justifyContent={"center"}>
          <Grid item>
            <Typography fontWeight={"700"} fontSize={"200%"}>
              My Cart
            </Typography>
          </Grid>
        </Grid>
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            return (
              <Grid container>
                <Grid
                  item
                  container
                  sx={{ m: 4 }}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <Grid item>
                    <Typography>{item.name}</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      value={item.quantity}
                      inputProps={{ type: "number" }}
                      onChange={(e) =>
                        dispatch(
                          itemsSlice.updateCart(
                            {
                              name: item.name,
                              id: item.id,
                              quantity: e.target.value,
                              price: item.price,
                            },
                            navigate,
                          ),
                        )
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item sx={{ marginLeft: "30px" }}>
                  <Typography>{item.price}</Typography>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <Grid>
            <Typography>The cart is empty</Typography>
          </Grid>
        )}
      </Grid>
      <Grid item sx={{ marginLeft: 6 }}>
        <Grid item>
          <Typography fontWeight={"700"} fontSize={"200%"}>
            Client Details
          </Typography>
        </Grid>
      </Grid>
      <Grid item sx={{ marginLeft: 6 }}>
        <Grid item>
          <Typography fontWeight={"700"} fontSize={"200%"}>
            Payment Details
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
