import axios from 'axios';
import fileDownload from 'js-file-download';
import React,{useEffect, useState, useContext} from 'react'
import Button from 'react-bootstrap/Button';
// import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import AppContext from './AppContext';
export default function Clipping() {
  const myContext = useContext(AppContext);
  const [url ,setURL] = useState('')
  const [loading , setLoading] = useState(false)
  const [startingPoint , setStartingPoint] = useState('')
  const [endingPoint , setEndingPoint] = useState('')
  const [errorMsg , setErrorMsg] = useState('');
  const[errorOccured , setErrorOccured] = useState(false);
  const ClippingUrl = "http://localhost:5000/clipping?url="+url+"&startingPoint="+startingPoint+"&endingPoint="+endingPoint;
  useEffect(() => {
    window.scrollTo(0, 0)
    // axios.get('http://localhost:5000/getURL')
    // .then((res) => res.data)                      
    // .then((data) => {
    //   setURL(data.url)
    // })
    setURL(myContext.state.url)
  },[myContext.state.url])
  function downloadVideo(e){
    e.preventDefault();
    setLoading(true)
   const startingPointToSeconds = startingPoint.split(':');
   const endingPointToSeconds = endingPoint.split(':');
   const startingSeconds = (+startingPointToSeconds[0]) * 60 * 60 + (+startingPointToSeconds[1]) * 60 + (+startingPointToSeconds[2]);
   const endingSeconds = (+endingPointToSeconds[0]) * 60 * 60 + (+endingPointToSeconds[1]) * 60 + (+endingPointToSeconds[2]);

  


   if(startingSeconds > endingSeconds){
      setErrorMsg("Starting point must be less than ending point");
      setErrorOccured(true);
    }
    
   else if(startingPoint === ''){
      setErrorMsg('Please enter starting point')
      setErrorOccured(true)
    }
    else if(endingPoint === ''){
      setErrorMsg('Please enter ending point')
      setErrorOccured(true)
    }
    else{
      
      setErrorOccured(false)
      // window.location.href = ClippingUrl
      axios.get(ClippingUrl, {responseType: 'blob'}).then(res => {
        fileDownload(res.data, 'Clipping video.mp4');
        setLoading(false)
      })
      
    }
    // setLoading(false)
  }
  
  return (
    <div>
    <header >
    <div className="logo">
    <em>Tube</em> Lecture Buddy
  </div>
    </header>
    <div className='topicsDiv' >
      <div className='hello'>
         <h1 className='Topic-main-heading'><em>Tube </em>Lecture Clipping</h1><br/>
          <h1 style={{color:'white'}}>Enter the Starting point</h1><br/>
          <input type="text" className="searchTerm" placeholder="Starting point pattern hh:mm:ss"  value={startingPoint} onChange = {(e)=>(setStartingPoint(e.target.value))}  /><br/><br/>
          <h1 style={{color:'white'}}>Enter the Ending point</h1><br/>
          <input type="text" className="searchTerm" placeholder="Ending point pattern hh:mm:ss"  value={endingPoint} onChange = {(e)=>(setEndingPoint(e.target.value))}/><br/><br/>
          <Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:10}} onClick = {downloadVideo} ><b>Download Clipped Video</b></Button><br/>
          {errorOccured && <h6 style={{color:'red'}}>{errorMsg}</h6>}
          {loading && <Spinner animation="border" variant="danger" />}<br/>
          {loading && <h6 style={{color:'white'}}>Clipped video is downloading please wait</h6>}
        
      </div>

    </div>  

  </div>
  )
}
