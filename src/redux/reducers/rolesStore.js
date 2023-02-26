import { configureStore } from "@reduxjs/toolkit";
import rolesReducer from "../actions/rolesSlice";

const rolesStore = configureStore({
    reducer: {
        roles: rolesReducer
    },

});

export default rolesStore;