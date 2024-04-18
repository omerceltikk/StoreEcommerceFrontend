import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Slices/productSlice.js";
import userReducer from "../Slices/userSlice.js";
import basketReducer from "../Slices/basketSlice.js";
import ordersReducer from "../Slices/ordersSlice.js";
import favoritesReducer from "../Slices/favoritesSlice.js";
import categoriesReducer from "../Slices/categorySlice.js";
const store = configureStore({
  reducer:{
    products: productReducer,
    users: userReducer,
    baskets: basketReducer,
    orders: ordersReducer,
    favorites: favoritesReducer,
    categories: categoriesReducer
  }
})
export default store;