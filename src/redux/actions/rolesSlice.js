import { createSlice } from "@reduxjs/toolkit";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_EMPLOYEE } from "./actionTypes";

const rolesReducer = createSlice({
    name: 'roles',
    initialState: {
        role: null
    },
    reducers: {
        user_role: (state, action) => {
            switch (action.payload) {
                case ROLE_ADMIN:
                    state.role = ROLE_ADMIN;
                    break;
                case ROLE_EMPLOYEE:
                    state.role = ROLE_EMPLOYEE;
                    break;
                case ROLE_CUSTOMER:
                    state.role = ROLE_CUSTOMER;
                    break;
                default:
                    state.role = null
            }
        },
    }
});

export const { user_role } = rolesReducer.actions;
export default rolesReducer.reducer;