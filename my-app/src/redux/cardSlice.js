import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchRandomUser = createAsyncThunk(
  "card/fetchRandomUser",
  async () => {
    return fetch(`https://randomuser.me/api/`)
      .then((response) => response.json())
      .then((data) => data.results[0]);
  }
);

const initialState = {
  activeObject: null,
  loading: false,
  error: false,
  cardList: [],
  cardInformation: [
    {
      id: 1,  
      cardName: "",
      cardNumber: "1111 2222 3333 4444",
      cardMonth: "9",
      cardYear: "28",
      ccv: "111",
      bankName: "Visa",
      cardStateActive: false
    }
  ]
};

let cardIdCounter = 1; 


const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addNewCard: (state, action) => {
      const newCard = {
        id: cardIdCounter++, // Assign a unique ID and increment the counter
        ...action.payload, // Include other card properties from the action payload
      };
      state.cardInformation = [...state.cardInformation, newCard];
    },
    deleteCard: (state, action) => {
      const cardIdToDelete = action.payload;
      state.cardInformation = state.cardInformation.filter((card) => card.id !== cardIdToDelete);
    }
  },
  extraReducers: {
    [fetchRandomUser.pending]: (state) => {
      state.status = "loading...";

      console.log(state.status);
    },

    [fetchRandomUser.fulfilled]: (state, action) => {
      state.status = "success";
      const { first, last } = action.payload.name;
      let wholeName = first + " " + last;
      for (let i = 0; i < state.cardInformation.length; i++) {
        state.cardInformation[i].cardName = wholeName.toUpperCase();
      }
    },

    [fetchRandomUser.rejected]: (state) => {
      state.status = "rejected";
      console.log(state.status);
    }
  }
});

export const { addNewCard, deleteCard } = cardSlice.actions;

export default cardSlice.reducer;
