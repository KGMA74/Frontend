import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/utils/api";
import type{ NextRequest } from "next/server";
import { toast } from "react-toastify";
/*
import { PayloadAction } from '@reduxjs/toolkit';
#define the type of the slice state
interface CounterState {
    value: number;
}

#define the initial state using that type
const initialState = {
    value: 0,
} as CounterState;

const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: payloadAction<number>) => {
            state.value += action.payload;
        }
    }
})

export const { increment, decrement, incrementByAmount } = CounterSlice.actions;


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value


export dafault CounterSlice.reducer;


*/
/*
// Définir un type pour l'état du slice
interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error?: string;
}

// Définir l'état initial en utilisant le type défini ci-dessus
const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    error: undefined,
};

// la thunk asynchrone pour la connexion utilisateur
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { email: string; password: string }) => {
        const response = (await api
            .post("jwt/create/", { json: credentials })
            .json()) as { access: string; refresh?: string };
        return response;
    }
);

// la thunk asynchrone pour la connexion utilisateur
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    const response = (await api.post("logout/").json()) as {
        access: string;
        refresh?: string;
    };
    return response;
});

//la thunk asynchrone pour la verificcation de la presence de cookies access
export const checkAccessToken = createAsyncThunk(
    "auth/checkAccesToken",
    async (request: NextRequest) => {
      try{
        const access = request.cookies.get('access')
        console.log("[access Token = ", access, "]" )
      } catch(err){
        console.error(err)
      }
    }
);

// Créer le slice auth
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // pour la connexion d'un utilisateur
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.access) {
                    // si le access token est definie alors l'utilisateur est
                    state.isAuthenticated = true;
                }
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.error("login failed:", action.error.message);
                state.isLoading = false;
                //state.error = action.error.message || 'Login failed'
                state.error = "Login failed";
            })

            //pour la deconnexion
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                console.error("Logout failed:", action.error.message);
                state.isLoading = false;
            });
    },
});
*/

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

// Définir l'état initial en utilisant le type défini ci-dessus
const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    //error: undefined,
};


// Créer le slice auth
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state) => {
            state.isAuthenticated = true;
        },
        setLogout: (state) => {
            state.isAuthenticated = false;
        },
        finishInitialLoad: (state) => {
            state.isLoading = false
        }
    },
});

// Exporter les actions et le reducer
export const { setAuth, setLogout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;