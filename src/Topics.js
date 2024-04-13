import React,{useState, useEffect , useContext} from 'react'
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayTopic from './DisplayTopic';
import axios from 'axios';
import AppContext from "./AppContext";

export default function Topics() {
  const myContext = useContext(AppContext);
  const[loading,setLoading] = useState(true);
  const [top,setTop] = useState(false);
  const [URL ,setURL] = useState('')
  const [topics , setTopics] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
   setURL(myContext.state.url)
      axios.get('http://localhost:5000/Topics?url='+URL)
      .then((res) => res.data)
      .then((data) => {
        setTopics(data)
        setLoading(false)
        setTop(true)
        myContext.update()

      })

  },[URL , myContext])

  
  return (
    <div>
      <header >
      <div className="logo">
      <em>Tube</em> Lecture Buddy
    </div>
      </header>
      <div className='topicsDiv' >
        <div className='hello'>
          {loading ? <h1 className='Topic-main-heading'><em>Topics</em> are generating</h1>: <h1 className='Topic-main-heading'><em>Topics</em> are generated</h1>}<br/>
          {loading && <Spinner animation="border" variant="danger" />}
          {top && <DisplayTopic topicsdata = {topics} /> }
          
        </div>

      </div>
     
     

             
      
     
               
            
      
       

    </div>
      
  )
}
