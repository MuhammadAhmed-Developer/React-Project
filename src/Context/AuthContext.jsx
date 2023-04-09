import React from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext()
const initialState = {isAuthentication: true}

const reducer = ((state, action)=>{
   
    switch(action.type){
     case 'LOGIN':
     return {isAuthentication: true}
     case 'LOGOUT':
     return {isAuthentication: false}
     default:
      return state
    }


})

export default function AuthContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState)
   
  return (

    
      <AuthContext.Provider value={{state, dispatch}}>
        {props.Children}
      </AuthContext.Provider>

  )
}
