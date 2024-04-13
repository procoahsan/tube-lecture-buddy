import React,{useEffect, useState, useContext} from 'react'
// import axios from 'axios';
import fileDownload from 'js-file-download';
import Button from 'react-bootstrap/Button';
import AppContext from './AppContext';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

export default function Content() {
  const [url ,setURL] = useState('')
  const myContext = useContext(AppContext);
  const [loading , setLoading] = useState(false)
  const LecturePPTurl = 'http://localhost:5000/lecturePPT?url='+url;
  const LectureDocxurl = 'http://localhost:5000/lectureDoc?url='+url;
  useEffect(() => {
    window.scrollTo(0, 0)
    setURL(myContext.state.url)
    // axios.get('http://localhost:5000/getURL')
    // .then((res) => res.data)
    // .then((data) => {
    //   setURL(data.url)
    // })
  },[myContext.state.url])
  function downloadLecturePPT(){
    setLoading(true)
    axios.get(LecturePPTurl, {responseType: 'blob'}).then(res => {
      fileDownload(res.data, 'Lecture PPT.pptx');
      setLoading(false)
    })
  }
  function downloadLectureDoc(){
    setLoading(true)
    axios.get(LectureDocxurl, {responseType: 'blob'}).then(res => {
      fileDownload(res.data, 'Lecture Doc.docx');
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
    <div className='topicsDiv' >
      <div className='hello'>
         <h1 className='Topic-main-heading'><em>Tube </em>Lecture Content</h1><br/>
          <h1 style={{color:'white'}}>Kindly Select any Option</h1><br/>
        <Button variant="danger"  onClick={downloadLecturePPT}  style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5,width:'40%'}}><strong>Download Lecture PPT</strong></Button><br />
        <Button variant="danger"  onClick={downloadLectureDoc}  style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5,width:'40%'}}><strong>Download Lecture Document</strong></Button><br /><br />
       {loading && <Spinner animation="border" variant="danger" />}<br/>
       {loading && <h6 style={{color:'white'}}>Lecture Content is Downloading</h6>}
        
      </div>

    </div>  

  </div>
  )
}
