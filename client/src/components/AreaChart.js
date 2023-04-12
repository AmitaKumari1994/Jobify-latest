import React from 'react'
import {AreaChart , Area , XAxis , YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

const AreaChartContainer = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height ={300}>
      <AreaChart data ={data} margin = {{top:50}}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis data ='date'/>
        <YAxis allowDecimals={false}/>
        <Tooltip/>
        <Area type ="monotone" dataKey='count' stroke ='#2cb1bc' fill ='#bef8fd'></Area>
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartContainer
