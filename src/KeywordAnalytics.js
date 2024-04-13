import React from 'react'
import { PieChart, Pie, Tooltip, Bar, BarChart, Legend, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

export default function KeywordAnalytics({data2}) {
  return (

    <>
    <br/>
    <h4 className='Topic-second-heading'><em>Keyword</em> Analytics</h4><br/>
    <PieChart width={730} height={250}>
                        <Pie
                            dataKey="count"
                            nameKey="keyword"
                            isAnimationActive={false}
                            data={data2}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="red"
                            label 
                        />
                        <Tooltip />
                    </PieChart><br />
                    <BarChart width={730} height={250} data={data2} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="keyword" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="red" />
                    </BarChart><br />

                    <LineChart width={730} height={250} data={data2}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="keyword" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="red" />
                    </LineChart>
                   
    
    <br />
   
    
 </>
  )
 
  
}
