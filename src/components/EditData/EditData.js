import React, { useState, useEffect , useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from '../Login/Login.module.css';
import Button from '../UI/Button/Button';


  const nameReducer = (prevState , action) => {
   if(action.type === "enteredName"){return({value:action.val,isValid:action.val.trim().length > 0,})}           
   if(action.type === "nameUnFocus"){return ({value:prevState.value,isValid:prevState.value.trim().length > 0})}
   return {value:'',isValid:null}}

  const sectorReducer = (prevState , action) => {
    if(action.type === "enteredSector"){return({value:action.val,isValid:action.val != "0",})}
    if(action.type === "selectUnFocus"){return ({value:prevState.value,isValid:prevState.value != "0",})}
    return {value:'',isValid:null}}

  const subSectorReducer = (prevState , action) => {
    if(action.type === "enteredSubSector"){return({value:action.val,isValid:action.val != "0",})}
    if(action.type === "selectUnFocus"){return ({value:prevState.value,isValid:prevState.value != "0",})}
    return {value:'',isValid:null}}

     
     
   
const EditForm = (props) => {
   
      const [formIsValid, setFormIsValid] = useState(false);  
      const [marked, setMarked] = useState(false);
      const [sectors, setSectors] = useState([]);
      const [subSectors,setSubSectors]= useState([]);

      const [nameState, dispatchName] = useReducer(nameReducer,{value:'',isValid:null});
      const [sectorState, dispatchSector] = useReducer(sectorReducer,{value:'0',isValid:null});
      const [subSectorState, dispatchSubSector] = useReducer(subSectorReducer, {value:'0',isValid:null})

      const emailChangeHandler = (event) => {dispatchName({type:"enteredName",val:event.target.value});};
      const sectorChangeHandler = (event) => {dispatchSector({type:"enteredSector",val:event.target.value,})};
      const subSectorChangeHandler = (event) => {dispatchSubSector({type:"enteredSubSector",val:event.target.value})};
      
      const validateEmailHandler = () => {dispatchName({type:"nameUnFocus"})};
      const validateSectorHandler = () => {dispatchSector({type:"selectUnFocus"})};
      const validateSubSectorHandler = () => {dispatchSubSector({type:"selectUnFocus"})};
      const validateCheckboxHandler= () => {setMarked(!marked)};

      useEffect(() => {
        const timeOut = setTimeout(() => {
          setFormIsValid(
            nameState.isValid && sectorState.isValid && subSectorState.isValid && marked)}
        ,200)

      const fetchSectors = async () => {
        const response = await fetch("https://chris-cd3a5-default-rtdb.firebaseio.com/Sectors.json");
        const responseData = await response.json();
        const loadedSectors = [];
        const loadedSubSectors=[];

        for(const key in responseData){
            loadedSectors.push({
                id:key,
                jobs:responseData[key],})}
        setSectors(loadedSectors);

        for(const key in loadedSectors){
          loadedSubSectors.push(Object.values(loadedSectors[key].jobs))}
          setSubSectors(loadedSubSectors.flat(loadedSubSectors.length));} 
          fetchSectors();
          return () => {clearTimeout(timeOut);}},[nameState.isValid,sectorState.isValid,subSectorState.isValid,marked]) 

      const submitHandler = (event) => {
      event.preventDefault();
      
      props.onSubmitNewData(
        {
          name:nameState.value, 
          sector:sectorState.value,
          subSector:subSectorState.value});};


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${nameState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="Name">Name</label>
          <input type="text" id="Name" value={nameState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        </div>

        <div className={`${classes.control} ${sectorState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="Sector">Sector</label>
          <select type="text" id="Sector"vvalue={sectorState.value} onChange={sectorChangeHandler} onBlur={validateSectorHandler}>
            <option value="0">Please Choose a Sector</option>
            {sectors.map(sector => {return <option className={classes.options} value={sector.id} key={sector.id}>{sector.id}</option>})}
           </select>
        </div>

        <div className={`${classes.control} ${subSectorState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="SubSector">Sub Sector</label>
          <select type="text" id="SubSector" value={subSectorState.value} onChange={subSectorChangeHandler} onBlur={validateSubSectorHandler}>
            <option value="0">Please Choose a Sector</option>
            {subSectors.map(sector => {return <option className={classes.options} value={sector} key={sector}>{sector}</option>})}
           </select>
        </div>

        <div
          className={`${classes.control} ${
            !marked ? classes.invalid : ''
          }`}
        >
          <label htmlFor="SubSector">Agree To Terms</label>
          <input type="checkbox" onClick={validateCheckboxHandler} value={marked}/>
        </div>


        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid} >
            Submit New Data
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EditForm;
