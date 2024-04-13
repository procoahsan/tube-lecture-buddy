import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function DisplayVideos({ videos }) {
  const[interest, setInterst] = useState([])
  const[filt, setFilt] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/getInterests').then((res) => res.data).then((data) => {
      setInterst(data)
      let arr = []
      for(let i = 0 ; i<interest.length ; i++){
        const filter = interest[i]
        let result = filter.replace(' ', '+')
        let link = 'https://www.youtube.com/results?search_query='+result
        arr.push(<a href={link} target="_blank" rel="noreferrer" >{filter.toUpperCase()}</a>)
      }
      setFilt(arr)
        
      //console.log(data)
    })},[interest])
    
  return (
    <div style={{ backgroundColor: 'rgba(22,34,57,0.95)' , padding : '5px' , margin:15  }}>
      <div  style={{ backgroundColor: 'black' , padding : '10px' , margin:20  }}>
                <h1 style={{color:'white'}}>Interests</h1>
                    {filt.map((data) => {
                        return (
                            <h4 style={{color:'white'}}>{data}</h4>
                        );
                    })}
    </div>
        {videos.map((data, index) => {
            return (
                <div key={index} style={{ backgroundColor: 'black' , padding : '10px' , margin:20  }}>
                    

                    <h1 style={{color:'white'}}> <a href= {data.link} target="_blank" rel="noreferrer">{data.title} </a> </h1>
                    <h2 style={{color:'white'}}>Video by: {data.channel}</h2>
                    <a href={data.link} target="_blank" rel="noreferrer"><img alt="Qries" src={data.Thumbnail} width="500" height="300"/></a>
                </div>
            )
        })}


    </div>
    
  )
}
