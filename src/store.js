import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'


let user = createSlice({
    name : 'user',
    initialState: {name : 'kim', age : 20},
    reducers: {
         changeName(state){
            state.name = 'park'
        },
        increase(state,action){
            state.age += action.payload
        },
    }
})
export let {changeName,increase}= user.actions

let stock = createSlice({
    name : 'stock',
    initialState: [10,11,12]
})
let storage = createSlice({
    name : 'storage',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ], 
    reducers : {
        numberUp(state,action){
            let num = state.findIndex((a)=> a.id ===action.payload)
            state[num].count += 1;
        },
        addItem(state,action){
            let num = state.findIndex((a)=> a.name ===action.payload.name)
            if(num !== -1){
                state[num].count += 1;
                
            }
            else{
                state.push(action.payload)
            }
            
        },
        minusItem(state,action){
            let num = state.findIndex((a)=>a.name === action.payload)
            if(num !== -1){
                state[num].count -=1;
            }
            if(state[num].count ==0){
                state.splice(num,1)
            }
            }
        }
    }
)
export let{numberUp,addItem,minusItem} = storage.actions

export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    storage : storage.reducer
  }
}) 