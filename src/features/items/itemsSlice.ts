import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchItems } from '../../api/itemsApi';
import type { Item } from '../../types/item';

export type DetailsTab = 'properties' | 'image';

export interface ItemsState {
  entities: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedGuid: string | null;
  activeTab: DetailsTab;
}

const initialState: ItemsState = {
  entities: [],
  status: 'idle',
  error: null,
  selectedGuid: null,
  activeTab: 'properties',
};

export const loadItems = createAsyncThunk('items/load', async () => {
  return fetchItems();
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<string>) {
      state.selectedGuid = action.payload;
    },
    setActiveTab(state, action: PayloadAction<DetailsTab>) {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload;
        if (!state.selectedGuid && action.payload.length > 0) {
          state.selectedGuid = action.payload[0].guid;
        }
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load items';
      });
  },
});

export const { selectItem, setActiveTab } = itemsSlice.actions;
export default itemsSlice.reducer;
