import React, { useState } from 'react'
import styles from '../Home/Home.module.css';
import { NavLink, redirect } from 'react-router-dom';
import LogOutComponent from '../../Components/LogOut/LogOutComponent';
import { useEffect } from 'react';
import axios from 'axios';

import { useContext } from 'react';
export default function GsnEntry() {
  const [backendData, setbackendData] = useState([])
 const [selectedvalue,setSelectedValue]=useState('')
 const [gsnDate, setGsnDate] = useState('');

  useEffect(() => {
    const getData = async () => {
        try {
            const url = process.env.REACT_APP_BACKEND_URL
            const token = localStorage.getItem('authToken')
            const res = await axios.get(`${url}/gsn/getdata`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
           console.log(res.data)
            setbackendData(res.data)
            

        } catch (err) {
            console.log(err)
        }
    }
    getData()
}, [])
const handleSelectChange = (event) => {
  // setSelectedValue(event.target.value);  // Store the selected option's value
  // setGsnDate(event.target.getAttribute('data-gsn-date'));

  const selectedOption = event.target.selectedOptions[0];
  setSelectedValue(selectedOption.value);
  setGsnDate(selectedOption.getAttribute('data-gsn-date'));


};
console.log(selectedvalue)
console.log(gsnDate)
  return (
    <div className={styles.outerContainer}>
        <LogOutComponent/>
      <video autoPlay muted loop className={styles.videoBackground}>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <div>
        <select onChange={handleSelectChange} name="" id="" 
        style={{
            width:'auto',
            height:"42px",
            padding:"5px",
            borderRadius:"8px",
            background:"transparent",
            border:"1px black solid"
            }}>
            <option value="">Select the GSN</option>
            {backendData.map((u,i)=>(
              <option key={i} 
              value={u.gsn}
              data-gsn-date={u.gsnDate}
              >{u.gsn}</option>
            ))}
        </select>
        <NavLink 
        to='/grin-dashboard/entry'
        state={{selectedvalue,gsnDate}}
        > <button style={{color:"Black"}}>Add inventry</button></NavLink>
    </div>
      
    </div>
  )
}
