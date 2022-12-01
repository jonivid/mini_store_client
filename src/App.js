import "./App.css";
import { ItemList } from "./components/itemList/ItemList";
import { ItemDetails } from "./components/itemDetails/ItemDetails";
// import items from "./assets/products.json";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AddItem } from "./components/addItem/AddItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as itemsSlice from "./store/items/itemSlice";

function App() {
  const dispatch = useDispatch();
  const [itemListServer, setItemListServer] = useState([]);
  const [itemsList, setItemsList] = useState([...itemListServer]);
  const [selectedItem, setSelectedItem] = useState("");
  const [isAddNewItem, setIsAddNewItem] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortValues, setSortValue] = useState({ category: "", order: "ASC" });

  const handleSorting = (value) => {
    if (value === "name") {
      // console.log("in");
      const temp = [...itemsList].sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        console.log(x, y);
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      setItemsList(temp);
    } else if (value === "price") {
      let temp = [...itemsList].sort((a, b) => a.price - b.price);
      setItemsList(temp);
    }
    setSortValue({ ...sortValues, category: value });
  };

  useEffect(() => {
    dispatch(itemsSlice.getItemsListAsync());
  }, []);

  return (
    <Grid className="App" container justifyContent={"space-evenly"}>
      <Grid
        item
        xs={12}
        style={{
          border: "4px solid black",
          height: "100px",
          backgroundColor: "gray",
          color: "white",
        }}
        container
        justifyContent={"space-around"}
      >
        <Typography item variant="h2">
          My Store
        </Typography>
      </Grid>
      <Grid container item xs={12} style={{ margin: "10px" }}>
        <Grid item xs={2} lg={1}>
          {isAddNewItem === "" ? (
            <Button
              variant="contained"
              onClick={() => setIsAddNewItem("addNewItem")}
            >
              {" "}
              + Add
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setIsAddNewItem("")}>
              {" "}
              Return
            </Button>
          )}
        </Grid>
        <Grid item xs={6} lg={2}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => {
              dispatch(
                itemsSlice.filterItemsHandler(e.target.value, sortValues),
              );
              setSearchValue(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2} lg={1}>
          <Typography item>Sort By</Typography>{" "}
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              label="Sort"
              onChange={(e) => {
                dispatch(
                  itemsSlice.filterItemsHandler(searchValue, {
                    ...sortValues,
                    category: e.target.value,
                  }),
                );
                setSortValue({ ...sortValues, category: e.target.value });
              }}
            >
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"price"}>Price</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {isAddNewItem === "" ? (
        <Grid container justifyContent={"space-around"}>
          <Grid
            xs={5}
            lg={4}
            item
            style={{ overflow: "scroll", height: "60vh", overflowX: "hidden" }}
          >
            <ItemList setSelectedItem={setSelectedItem} />
          </Grid>
          <Grid xs={6} lg={2} item>
            <ItemDetails
              selectedItem={selectedItem}
              setItemsList={setItemsList}
              itemsList={itemsList}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid item lg={2}>
          <AddItem
            setItemsList={setItemsList}
            itemsList={itemsList}
            setIsAddNewItem={setIsAddNewItem}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default App;
