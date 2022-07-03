import { configureStore, createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
        name: "register",
        initialState: {
            currentRegister: false,
        },
        reducers: {
            setCurrentRegister(state, action){
               state.currentRegister = action.payload;
            }
        }
    });

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isFetching: false,
        access_token: null,
        currentLogin: false,
    },
    reducers: {
        setFetching(state, action){
            state.isFetching = !state.isFetching;
        },
        setAccessToken(state, action){
            state.access_token = action.payload;
        },
        setCurrentLogin(state, action){
            if(state.currentLogin){
                state.currentLogin = false;
            }else{
                state.currentLogin = true;
            }
        }
    }
});

const colorSlice = createSlice({
    name: 'color',
    initialState: {
        color: 'white'
    },
    reducers: {
        setColor(state, action){
            state.color = action.payload;
        }
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    
    },
    reducers: {
        setUser(state, action){
            return state.user = action.payload;
        }
    }
});

const profilePictureSlice = createSlice({
    name: 'profielpicture',
    initialState: {
        profilePicture: ''
    },
    reducers: {
        setProfielPicture(state, action){
            state.profilePicture = action.payload;
        }
    }
});

export const pictureActions = profilePictureSlice.actions;
export const registerActions = registerSlice.actions;
export const loginActions = loginSlice.actions;
export const colorActions = colorSlice.actions;
export const userActions = userSlice.actions;


const reducer = {
    registerReducer: registerSlice.reducer,
    loginReducer: loginSlice.reducer,
    colorReducer: colorSlice.reducer,
    userReducer: userSlice.reducer,
    pictureReducer: profilePictureSlice.reducer
}

const store = configureStore({
    reducer: reducer
});


export default store;