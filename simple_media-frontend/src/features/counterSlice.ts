import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface InitialState {
  counter: number;
}

const initialState: InitialState = {
  counter: 1
}


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>)=> {
      state.counter += action.payload
    }
  }
})

export const { increment } = counterSlice.actions;


export default counterSlice.reducer