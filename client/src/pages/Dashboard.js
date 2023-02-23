import React from 'react'
import { useEffect } from 'react'

const Dashboard = () => {
  const fetchData = async ()=>{

    try {
      
      const reponse = await fetch('http://localhost:5000/')
      const data = await reponse.json();
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <h1>Dashboard Page 1</h1>
  )
}

export default Dashboard
