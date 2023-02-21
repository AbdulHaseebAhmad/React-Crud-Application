import React, {useReducer} from "react";


const nameReducer = (prevState , action) => {
    if(action.type === "enteredName"){return({value:action.val,isValid:action.val.trim().length > 0,})}           
    if(action.type === "nameUnFocus"){return ({value:prevState.value,isValid:prevState.value.trim().length > 0})}
    return {value:'',isValid:null}}

const useNameValidation = () => {

    const [nameState, dispatchName] = useReducer(nameReducer,{value:'',isValid:null});
    const nameChaneHandler = (event) => {dispatchName({type:"enteredName",val:event.target.value});};
    const validateNameHandler = () => {dispatchName({type:"nameUnFocus"});};

    return{
        nameState,
        nameChaneHandler,
        validateNameHandler,
    }

}


export default useNameValidation;