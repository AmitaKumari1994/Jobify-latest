import React from 'react'
import StatsOfItem from './StatsOfItem'
import { useAppContext } from '../context/appContext'
import { FaSuitcaseRolling,FaBug,FaCalendarCheck } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsOfContainer = () => {
    const {stats} = useAppContext()

    const defaultStats =[
        {
            title: 'pending applications',
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling/>,
            color:'#e9b949',
            bcg: '#fcefc7'
        },

        {
            title: 'interviews scheduled',
            count: stats.interview || 0,
            icon: <FaCalendarCheck/>,
            color:'#647acb',
            bcg: '#e0e8f9'
        },

        {
            title: 'jobs declined',
            count: stats.declined || 0,
            icon: <FaBug/>,
            color:'#d66a6a',
            bcg: 'ffeeee'
        }

    ]
  return (
    <Wrapper>
        {defaultStats.map((item,index)=>{
            return <StatsOfItem key={index} {...item}/>
        })}
    </Wrapper>
  )
}

export default StatsOfContainer
