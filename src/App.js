import "./App.css";
import { ItemList } from "./components/itemList/ItemList";
import { ItemDetails } from "./components/itemDetails/ItemDetails";
// import items from "./assets/products.json";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import { AddItem } from "./components/addItem/AddItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as itemsSlice from "./store/items/itemSlice";
import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { Login } from "./components/login/Login";
import { Home } from "./components/home/Home";
import HomeLayout from "./components/homeLayout/HomeLayout";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemListServer, setItemListServer] = useState([]);
  const [itemsList, setItemsList] = useState([...itemListServer]);
  const [selectedItem, setSelectedItem] = useState("");
  const [isAddNewItem, setIsAddNewItem] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortValues, setSortValue] = useState({ category: "", order: "ASC" });

  useEffect(() => {
    dispatch(itemsSlice.getItemsListAsync());
  }, []);

  return (
    <Grid >
      <Navbar />
      <Outlet />
    </Grid>
    // <Grid className="App" container justifyContent={"space-evenly"}>
    //   <Grid
    //     item
    //     xs={12}
    //     style={{
    //       border: "4px solid black",
    //       height: "100px",
    //       backgroundColor: "gray",
    //       color: "white",
    //     }}
    //     container
    //     justifyContent={"space-around"}
    //   >
    //     <Typography item variant="h2">
    //       My Store
    //     </Typography>
    //   </Grid>
    //   <Grid container item xs={12} style={{ margin: "10px" }}>
    //     <Grid item xs={2} lg={1}>
    //       {isAddNewItem === "" ? (
    //         <Button
    //           variant="contained"
    //           onClick={() => setIsAddNewItem("addNewItem")}
    //         >
    //           {" "}
    //           + Add
    //         </Button>
    //       ) : (
    //         <Button variant="contained" onClick={() => setIsAddNewItem("")}>
    //           {" "}
    //           Return
    //         </Button>
    //       )}
    //     </Grid>
    //     <Grid item xs={6} lg={2}>
    //       <TextField
    //         id="outlined-basic"
    //         label="Search"
    //         variant="outlined"
    //         onChange={(e) => {
    //           dispatch(
    //             itemsSlice.filterItemsHandler(e.target.value, sortValues),
    //           );
    //           setSearchValue(e.target.value);
    //         }}
    //       />
    //     </Grid>
    //     <Grid item xs={2} lg={1}>
    //       <Typography item>Sort By</Typography>{" "}
    //     </Grid>
    //     <Grid item xs={2}>
    //       <FormControl fullWidth>
    //         <InputLabel id="demo-simple-select-label">Sort</InputLabel>
    //         <Select
    //           label="Sort"
    //           onChange={(e) => {
    //             dispatch(
    //               itemsSlice.filterItemsHandler(searchValue, {
    //                 ...sortValues,
    //                 category: e.target.value,
    //               }),
    //             );
    //             setSortValue({ ...sortValues, category: e.target.value });
    //           }}
    //         >
    //           <MenuItem value={"name"}>Name</MenuItem>
    //           <MenuItem value={"price"}>Price</MenuItem>
    //         </Select>
    //       </FormControl>
    //     </Grid>
    //   </Grid>

    //   {isAddNewItem === "" ? (
    //     <Grid container justifyContent={"space-around"}>
    //       <Grid
    //         xs={5}
    //         lg={4}
    //         item
    //         style={{ overflow: "scroll", height: "60vh", overflowX: "hidden" }}
    //       >
    //         <ItemList setSelectedItem={setSelectedItem} />
    //       </Grid>
    //       <Grid xs={6} lg={2} item>
    //         <ItemDetails
    //           selectedItem={selectedItem}
    //           setItemsList={setItemsList}
    //           itemsList={itemsList}
    //         />
    //       </Grid>
    //     </Grid>
    //   ) : (
    //     <Grid item lg={2}>
    //       <AddItem
    //         setItemsList={setItemsList}
    //         itemsList={itemsList}
    //         setIsAddNewItem={setIsAddNewItem}
    //       />
    //     </Grid>
    //   )}
    // </Grid>
  );
}

export default App;
