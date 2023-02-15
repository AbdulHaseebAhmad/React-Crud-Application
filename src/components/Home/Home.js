import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import classess from "../Login/Login.module.css"
import EditForm from '../EditData/EditData';

const Home = (props) => {

  const [infor,setInfor] =useState([{}]);
  const [changeD, setChangeD] = useState(false);

  useEffect(()=>{
    const fetchuserDetails = async () => {
      const response = await fetch("https://chris-cd3a5-default-rtdb.firebaseio.com/Data.json");
      const recievedData = await response.json();

      const recievedDataArray = [];

      for(const key in recievedData){
        if(key === props.userId){
          recievedDataArray.push({
            id:key,
            name:recievedData[key].name,
            sector:recievedData[key].sector,
            subSector:recievedData[key].subSector
          })}}

      setInfor(recievedDataArray)}
    fetchuserDetails()},[props.userId,changeD])

     
    const {name, sector, subSector} = infor[0]

    const edit = async (newData) => {
       const response = await fetch("https://chris-cd3a5-default-rtdb.firebaseio.com/Data/"+`${props.userId}`+".json",{
        method: 'PUT',
        headers: {
          'Content-type': 'application/json;',
           "cors":"true",},
          body:JSON.stringify({
            name:newData.name,
            sector:newData.sector,
            subSector:newData.subSector
          })},);

      const recievedData = await response.json();
      setChangeD(false);
    }

    const goToEditForm = ()=> {
      setChangeD(true);
    }
  return (
    <React.Fragment>
    {!changeD? <Card className={classes.home}> 
      <h1>Welcome back!</h1>
      <h4>Your Previously Saved Data</h4>
       
      <form>
        <div className={classess.control}>
          <label htmlFor="email">Name</label>
          <input type="text" id="email" placeholder={name} disabled/>
        </div>

        <div className={classess.control}>
          <label htmlFor="Sector">Sector</label>
          <select type="text" id="Sector" disabled>
            <option>{sector}</option>
          </select>
        </div>

        <div className={classess.control}>
          <label htmlFor="SubSector">Sub Sector</label>
          <select type="text" id="SubSector" value={subSector} disabled>
           <option>{subSector}</option>
          </select>
        </div>

        <div className={classess.actions}>
          <Button type="button" className={classes.btn} onClick={goToEditForm}>
            Edit
          </Button>
        </div>
      </form>
    </Card>:<EditForm onSubmitNewData={edit}/>}
    </React.Fragment>
  );
};

export default Home;
