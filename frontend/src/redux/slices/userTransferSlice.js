import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

export const  userTransferThunk=createAsyncThunk('userTransfer',async(userTransferObj,thunkApi)=>{
    let res;
    console.log(userTransferObj)
      res=  await axios.post('http://localhost:4000/user-api/transfer',userTransferObj)
    if(res.data.message==='transfer success'){
        return res.data;
    }else{
        return thunkApi.rejectWithValue(res.data.message)
    }
})
console.log(userTransferThunk)




export const userTransferSlice=createSlice({
    name:'user-transfer-slice',
    initialState:{isPending:false,currentUser:{},errorStatus:false,errorMessage:"",transferStatus:false},
    reducers:{
        resetState:(state,payload)=>{
            state.isPending=false;
            state.currentUser={};
            state.errorStatus=false;
            state.errorMessage="";
            state.transferStatus=false;
        }
    },
    extraReducers:builder=>builder
    .addCase(userTransferThunk.pending,(state,action)=>{
        state.isPending=true;

    })
    .addCase(userTransferThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser=action.payload.user;
        state.errorStatus=false;
        state.errorMessage=""
        state.transferStatus=true;
    })
    .addCase(userTransferThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={};
        state.errorStatus=true;
        state.errorMessage=action.payload;
        state.transferStatus=false;
    })
})
export default userTransferSlice.reducer;
export const {resetState}=userTransferSlice.actions;