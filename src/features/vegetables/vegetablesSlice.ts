import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface VegetablesState {
  items: Product[],
  status: 'loading' | 'idle' | 'succeeded' | 'failed',
  error: string | null,
}

const initialState: VegetablesState = {
    items: [],
    status: 'idle',
    error: null,
}

export const fetchVegetables = createAsyncThunk<Product[]>(
    'vegetables/fetchVegetables',
    async function () {
            const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');

            if(!response.ok) {
                throw new Error('Ошибка сети')
            }

            const data: Product[] = await response.json();

            return data;
    }
)

const vegetablesSlice = createSlice({
    name: 'vegetables',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchVegetables.pending, (state) => {
           state.status = 'loading'
           state.error = null 
        })
        .addCase(fetchVegetables.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
        })
        .addCase(fetchVegetables.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message ?? 'Неизвестная ошибка'
        })
    },
})

export default vegetablesSlice.reducer