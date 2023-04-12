import React from 'react'
import {BarChart , Bar , XAxis , YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

const BarChartComponent = ({data}) => {
  return (
    <ResponsiveContainer widht='100%' height = {300}>
      <BarChart data ={data}  margin ={{top:50}} >
      <CartesianGrid strokeDasharray='3 3'/>
      <XAxis datakey='date'/>
      <YAxis allowDecimals={false} />
      <Tooltip/>
      <Bar dataKey='count' fill ='#2cb1bc' barSize={75}/>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
