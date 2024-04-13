import React from 'react'
import { PieChart, Pie, Tooltip, Bar, BarChart, Legend, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

export default function TopicAnalytics({data}) {
  return (
    <>
    <br/>
    <h4 className='Topic-second-heading'><em>Topic</em> Analytics</h4><br/>
    <PieChart width={730} height={250}>
                        <Pie
                            dataKey="count"
                            nameKey="topic"
                            isAnimationActive={false}
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="red"
                            label
                        />
                        <Tooltip />
                    </PieChart><br />
                    <BarChart width={730} height={250} data={data} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="red" />
                    </BarChart><br />

                    <LineChart width={730} height={250} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="red" />
                    </LineChart>
                   
    
    <br />
   
    
 

  </>
  )
}
