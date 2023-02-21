import React, { useState, useEffect , useReducer} from 'react';
import Card from '../UI/Card/Card';
import classes from '../Login/Login.module.css';
import Button from '../UI/Button/Button';
import Input from "../UI/Input/Input.js";
import Select from "../UI/Select/Select.js";
import useNameValidation from '../../hooks/name-validation';
import useSectorValidation from '../../hooks/sector-validation';

  const inputProp = {typeChange:"enteredSector",typeFocus:"selectUnFocus",} 
  const inputPropSubSector ={typeChange:"enteredSector",typeFocus:"selectUnFocus",}
     
const EditForm = (props) => {
   
      const [formIsValid, setFormIsValid] = useState(false);  
      const [marked, setMarked] = useState(false);
      const [sectors, setSectors] = useState([]);
      const [subSectors,setSubSectors]= useState([]);
      const {nameState,nameChaneHandler,validateNameHandler} = useNameValidation();
      const {sectorState,sectorChangeHandler,validateSectorHandler,} = useSectorValidation(inputProp)
      const {sectorState:subSectorState,sectorChangeHandler:subSectorChangeHandler,validateSectorHandler:validateSubSectorHandler,} = useSectorValidation(inputPropSubSector)
     
      const validateCheckboxHandler= () => {setMarked(!marked)};

      useEffect(() => {
        const timeOut = setTimeout(() => {
          setFormIsValid(
            nameState.isValid && sectorState.isValid && subSectorState.isValid && marked)}
        ,200)
        return () => {clearTimeout(timeOut);}},[nameState.isValid,sectorState.isValid,subSectorState.isValid,marked]) 

      useEffect(()=>{
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
      },[])

      const submitHandler = (event) => {
      event.preventDefault();
      props.onSubmitNewData({name:nameState.value, sector:sectorState.value,subSector:subSectorState.value});};

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="name"
          value={nameState.value}
          isValid={nameState.isValid}
          label="Name"
          onChange={nameChaneHandler}
          onBlur={validateNameHandler}/>

        <Select
          id="Select"
          value={sectorState.value}
          onChange={sectorChangeHandler}
          onBlur={validateSectorHandler}
          isValid={sectorState.isValid}
          label="Sector"
          sectors={sectors}
          sectorType="sectors"
          />

        <Select
          id="Select"
          value={subSectorState.value}
          onChange={subSectorChangeHandler}
          onBlur={validateSubSectorHandler}
          isValid={subSectorState.isValid}
          label="Sector"
          subSectors={subSectors}
          sectorType="subSectors"
          />

        <div
          className={`${classes.control} ${!marked ? classes.invalid : ''}`}>
          <label htmlFor="SubSector">Agree To Terms</label>
          <input type="checkbox" onClick={validateCheckboxHandler} value={marked}/>
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EditForm;
