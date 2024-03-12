import React, { useEffect, useState } from 'react'
import style from "./weatherApp.module.css"
import axios from 'axios'
const WeatherApp = () => {
    let apiKey = "34dd105e2c4c4cf2b69154421240903"
 let api = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`
 
 const [data,setData] = useState([])
 const [search,setSearch] = useState("")
 const [loading,setLoading] = useState(false)
 console.log(search)
 useEffect(()=>{
  (async function (){
    if (search !== ""){
    try {
      let res = await axios.get(`${api}&q=${search}`)  
      console.log(res.data.current)
      setData(res.data.current)
      setLoading(true)
    } catch (error) {
        alert("Failed to fetch weather data") 
    }
    finally{
        setLoading(false)
    }
    return ()=>{setData(null)}
 }
  })()
 },[search,api])

    return (
    <div>
    <form onSubmit={(e)=>{
        e.preventDefault()
         setSearch(e.target.inp.value)
    }} className={style.parent}>
        <input name='inp' placeholder='Enter City Name' type="text" className={style.inp}/>
        <button type='submit' className={style.Btn}>Search</button>
    </form>
    {search !== "" ?
    <div className={style.flex}>
        <div className={style.flexChild}>
            <h3>Tempreture</h3>
            <p>{data.gust_kph}</p>
        </div>
        <div className={style.flexChild}>
            <h3>Humidity</h3>
            <p>{data.humidity}</p>
        </div>
        <div className={style.flexChild}>
            <h3>Condition</h3>
            <p>{data?.condition?.text}</p>
        </div>
        <div className={style.flexChild}>
            <h3>Wind Speed</h3>
            <p>{data.wind_kph}</p>
        </div>
        </div> : loading ? "Loading data..." : ""}
    </div>
  )
}

export default WeatherApp

