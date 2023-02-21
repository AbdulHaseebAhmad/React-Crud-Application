import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import classess from "../Login/Login.module.css"
import EditForm from '../EditData/EditData';

const Home = () => {

  const [changeD, setChangeD] = useState(false);
  const [infor,setInfor] =useState([{}]);
  const userId = localStorage.getItem("isLoggedIn")

    const edit = async (newData) => {
        await fetch("https://chris-cd3a5-default-rtdb.firebaseio.com/Data/"+`${userId}`+".json",{
        method: 'PUT',
        headers: {
          'Content-type': 'application/json;',
           "cors":"true",},
          body:JSON.stringify({
            name:newData.name,
            sector:newData.sector,
            subSector:newData.subSector
          })},);
      setChangeD(false);
       
    }

    useEffect(()=>{
      const fetchuserDetails = async () => {
        const response = await fetch("https://chris-cd3a5-default-rtdb.firebaseio.com/Data.json");
        const recievedData = await response.json();
        const recievedDataArray = [];
            for(const key in recievedData){
                if(key === userId){
                recievedDataArray.push({
                    id:key,
                    name:recievedData[key].name,
                    sector:recievedData[key].sector,
                    subSector:recievedData[key].subSector})}}
        setInfor(recievedDataArray)}
        fetchuserDetails();
    },[userId,changeD])

    const goToEditForm = ()=> {
      setChangeD(true);}

  return (
    <React.Fragment>
    {!changeD? <Card className={classes.home}> 
      <h1>Welcome back!</h1>
      <p><b>Your Previously Saved Data</b></p>
       
      <form>
        <div className={classess.control}>
          <label htmlFor="email">Name</label>
          <input type="text" id="email" placeholder={infor[0].name} disabled/>
        </div>

        <div className={classess.control}>
          <label htmlFor="Sector">Sector</label>
          <select type="text" id="Sector" disabled>
            <option>{infor[0].sector}</option>
          </select>
        </div>

        <div className={classess.control}>
          <label htmlFor="SubSector">Sub Sector</label>
          <select type="text" id="SubSector" disabled>
           <option>{infor[0].subSector}</option>
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
