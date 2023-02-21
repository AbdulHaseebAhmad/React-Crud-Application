import {useReducer} from "react";

const useSectorValidation = (sectorInfo) => {

    const sectorReducer = (prevState , action) => {
        if(action.type === sectorInfo.typeChange){return({value:action.val,isValid:action.val !== "0",})}
        if(action.type === sectorInfo.typeFocus){return ({value:prevState.value,isValid:prevState.value !== "0",})}
        return {value:'',isValid:null}}

    const [sectorState, dispatchSector] = useReducer(sectorReducer,{value:'0',isValid:null});
    const sectorChangeHandler = (event) => {dispatchSector({type:"enteredSector",val:event.target.value,})};
    const validateSectorHandler = () => {dispatchSector({type:"selectUnFocus"})};

    return {
        sectorState,
        sectorChangeHandler,
        validateSectorHandler,
    }
}
export default useSectorValidation;