import React, { useEffect, useState } from 'react'
import {FaListAlt} from 'react-icons/fa'
import {IoTimeSharp} from 'react-icons/io5'

export default function DisplayTopic({ topicsdata }) {
  const [count, setCount] = useState(0)
  const [topic, setTopic] = useState([])
  useEffect(() => {
    let num = Object.keys(topicsdata).length-2;
    num = num/2;
    setCount(num)
  }, [topicsdata])
  useEffect(() => {
    let Topc = []
    var number = 1
    for (let i = 0; i < count; i++) {
      let data = {}
      let topName = 'Topic'+i
      let timeName = 'Timestamp'+i
      data['id'] = number
      data['timestamp'] = topicsdata[timeName]
      data['topics'] = topicsdata[topName]
      
      Topc.push(data)
      number++
      
    }
    setTopic(Topc)
   


  },[count  , topicsdata])
  return (
    <div style={{ background: '#031a3d' , padding : '5px',  border:'solid white'}}>
      <br/>
      <h4 className='Topic-second-heading'><em>Title:</em> {topicsdata['title']}</h4><br/>
      <h4 className='Topic-third-heading'><em>Channel:</em> {topicsdata['author']}</h4>
      <br />
      {topic.map((data, index) => {
        return (
          <div key={index}>
            {/* <div className='timestampd'> */}
            <h2 style={{ color: 'red', fontSize : '35px' , fontWeight: '700' }}> <em style={{fontSize : '40px'}}><IoTimeSharp/></em> {'Timestamp '+(index+1)}:</h2><br/>
            <h4  style={{ color: 'white' ,fontWeight: '700' }}>{data.timestamp}</h4><br/>
            {/* </div> <br/> */}
            <h2 style={{ color: 'red', fontSize : '35px' , fontWeight: '700' }}><FaListAlt/> {'Topic '+(index+1)}:</h2>
            <div className='topicsList'>
              
            {data.topics.map((top, index) => {
              return (
                <div  key={index} >
                 
                  <h4 className='topicd' style={{ color: 'white' ,fontWeight: '200', fontFamily:'Times' }}>{top.replace('"','').replace('"','')}</h4>
               
                </div>
              );
            })}
            </div>

            <hr />
          </div>
        );
      })}
   

    </div>
  )
}
