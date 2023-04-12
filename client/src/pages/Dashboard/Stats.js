import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsOfContainer,Loading,ChartsContainer } from '../../components'


const Stats = () => {

  const { showStats,isLoading,monthlyApplications} = useAppContext();
  
  useEffect(()=> { 
    showStats()
  },[])

  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
       <StatsOfContainer/>
        {monthlyApplications.length > 0 && <ChartsContainer/> } 
    </>
  )
  
  
}

export default Stats
