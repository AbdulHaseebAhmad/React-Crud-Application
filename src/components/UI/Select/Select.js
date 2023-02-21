import React from "react";
import classes from "./Select.module.css";

const Select = (props) => {
    return (
        <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor={props.id}>{props.label}</label>
          <select id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur}>
            <option value="0">Please Choose a Sector</option>
            {
                props.sectorType === "sectors"?
                props.sectors.map(sector => {return <option className={classes.options} value={sector.id} key={sector.id}>{sector.id}</option>})
              : props.subSectors.map(sector => {return <option className={classes.options} value={sector} key={sector}>{sector}</option>})
            }
           </select>
        </div>
    )   
}

 

export default Select;

