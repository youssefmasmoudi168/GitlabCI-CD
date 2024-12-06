import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RoleState = {
  role: string;
  isVisitor: boolean;
};

const initialState: RoleState = {
  role: null,
  isVisitor: null
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
      state.isVisitor = action.payload === 'Visitor';
    }
  }
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
