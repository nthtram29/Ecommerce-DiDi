import {  createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     avatar: '',
//     access_token: '',
//     id: ''
// }

export const UserSlice = createSlice({
    name: 'user',
    initialState : {
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        access_token: '',
        id: ''
    },
    reducers: {
        updateUser: (state, action) =>{
            const {name = '', email = '', access_token = '', phone = '', address = '', avatar = '', _id = ''} = action.payload;
            state.name = name;
            state.email = email;
            state.address = address;
            state.phone = phone;
            state.avatar = avatar;
            state.id = _id;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.name ='';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            
        },
    },
})

export const { updateUser, resetUser} = UserSlice.actions;
// const reducer = combineReducers({
//     user: user.reducer,
// })
// const store = createStore(reducer)
// export default UserSlice.reducer;

  export default UserSlice.reducer;