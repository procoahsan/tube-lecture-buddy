import React,{useState} from 'react'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import DisplayVid from './DisplayVideos';
export default function InterestSearch() {
    const[Keyword,setKeyword] = useState('')
    const[Results , setResults] = useState([])
    const[loading,setLoading] = useState(false)
    const[Fetched , setFetched] = useState(false)
    function getResults(){
        setLoading(true)
      setFetched(false)
        axios.get('http://localhost:5000/search?keyword='+Keyword).then((res) => res.data).then((data) => {
          setResults(data.videos)
          setFetched(true)
          setLoading(false)
        })
  
      }
  
  return (
    <div>
      <header >
      <div className="logo">
      <em>Tube</em> Lecture Buddy
    </div>
      </header>
      <div className='InterestDiv' >
        <div className='helloSearch'>
         <h1 className='Topic-main-heading'><em>Interest</em> Based Search</h1><br/>
         <input type="text" className="searchTerm" placeholder="Search here"   value={Keyword} onChange = {(e)=>(setKeyword(e.target.value))}/><br/>
         <Button variant='danger' style = {{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px', margin:10 , borderRadius:'20px'}} onClick={getResults}><b>Search Videos</b></Button><br/>
          {loading && <Spinner animation="border" variant="danger" />}
          {loading && <h4 style={{color:'white'}}>Buddy is fetching videos</h4>}
         {Fetched && <DisplayVid videos={Results}/>}
        </div>

      </div>
     
       

    </div>
  )
}
