import { configureStore, PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  selectedTab: string | null
}

const initialState: InitialState = {
  selectedTab: null
}

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload
    },
  },
})


export const makeStore = () => {
  return configureStore({
    reducer: { 
      root: rootSlice.reducer,
     },
  })
}



// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const { setSelectedTab } = rootSlice.actions