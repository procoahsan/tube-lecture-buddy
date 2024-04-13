import './App.css';
import React, {useState , useContext, useEffect} from 'react';
import Logo from './logo.png';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import {Link } from "react-router-dom";
import validator from 'validator';
import AppContext from './AppContext';



function Home() {
    const myContext = useContext(AppContext);
    const [loading,setLoading] = useState(false);
    const [loadingStatus,setLoadingStatus] = useState('');
    const [URL,setURL] = useState('');
    const [data,setData] = useState('');
    const [but, showBut] = useState(false)
    const [noBut, showNoBut] = useState(false)
    const [errorMsg , setErrorMsg] = useState('');
    const[errorOccured , setErrorOccured] = useState(false);
    const [top , setTop] = useState(false);
    const PPTURL = 'http://localhost:5000/getPPT?url='+URL;
    const DocxURL = 'http://localhost:5000/getdocument?url='+URL;

    function downloadPPT(){
      window.location.href = PPTURL;
    }
    function downloadDocx(){
      window.location.href = DocxURL;
    }
  


   

    useEffect(() => {
      if(myContext.state.displayTop){
        setTop(true)
      }
    },[myContext.state.displayTop] )

    useEffect(() => {
      if(myContext.state.feat){
        showBut(true)
        setURL(myContext.state.url)
        axios.get('http://localhost:5000/lecturedetection?url='+URL)
        .then((res) => res.data)
        .then((data) => {
            setData(data.result)
        })
      }
     
    },[myContext.state.feat,myContext.state.url,URL] )

    function textFieldChange(e){
      setURL(e.target.value)
      myContext.updateUrl(e.target.value)
    }

    // useEffect(() => {
      
    //      if(top){
    //     axios.get('http://localhost:5000/lecturedetection?url='+URL)
    //     .then((res) => res.data)
    //     .then((data) => {
    //         setData(data.result)
    //     })
    //   }
    //  ;
     
     
    // },[top,URL] )

    function getResponse(){
      setErrorOccured(false);
      showNoBut(false)
        showBut(false)
        setTop(false)
        setLoading(true)
        setLoadingStatus('Buddy is fetching the lecture status')
        if(URL!==''){
            if(validator.isURL(URL)){
                axios.get('http://localhost:5000/lecturedetection?url='+URL)
                .then((res) => res.data)
                .then((data) => {
                    setData(data.result)
                    if(data.result==='Detected'){
                      setErrorOccured(false)
                        showBut(true)
                        setLoading(false)
                        myContext.updateFeat()
                        setTimeout(() => { window.scrollTo(830, 830) }, 1000);
                        
                        
                    }
                    else if(data.result==='Not Detected'){
                        showNoBut(true)
                        setLoading(false)
                    }
                })
            }
            else{
                setErrorMsg('Enter a valid URL')
                setErrorOccured(true)
                setLoading(false)
            }

        }
        else{
            setErrorMsg("Kindly Enter a URL");
            setErrorOccured(true)
            setLoading(false)
        }
    }
  return (
    <div>
      <header >
      <div className="logo">
      <em>Tube</em> Lecture Buddy
    </div>
      </header>
      <section className="section main-banner" id="top" data-section="section1">
      <video autoPlay muted loop id="bg-video">
          <source src="assets/images/course-video.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay header-text">
          <div className="caption">
            <img src={Logo} alt="logo" height='160' />
              <h2><em>Tube</em> Lecture Buddy</h2>
             
             
      <input type="text" className="searchTerm" placeholder="Enter the Youtube Video URL"   value={URL} onChange = {(e)=>(textFieldChange(e))}/><br/>
     
               <Button variant='danger' style = {{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px', margin:10 , borderRadius:'20px'}} onClick={getResponse}><b>Detect Lecture Video</b></Button><br/>
               {errorOccured && <h6 style={{color:'red'}}>{errorMsg}</h6>}
               {loading && <Spinner animation="border" variant="danger" />}
               {loading && <h6 style={{color:'white'}}>{loadingStatus}</h6>}
                {but && <h6 style={{color:'white'}}>The lecture video has been {data}</h6>}
                {noBut && <h6 style={{color:'white'}}>The lecture video has been {data}</h6>}
          </div>
      </div>
  </section>
  <section className="section video" data-section="section2">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
        
            <div className="section-heading">

               

                {(!top && but) && <h6 style={{color:'white'}}>All features will be unlocked after topics generation click the topic button below for this purpose</h6>  } <br/>
                <div className='button-collection' style={{border: '2px solid white'}}>
                  <h2>Main Features</h2><br/>
                  
                {but === true ? (<Link to="/topics"><Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}}><b>Topics in Video</b></Button></Link>) : (<Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'  }} disabled={true}><b>Topics in Video</b></Button>)}<br/>   
                <Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} disabled={!top} onClick={downloadPPT}><b>Audio notes Powerpoint Presentation</b></Button><br/>
                <Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} disabled={!top} onClick={downloadDocx}><b>Audio notes Word Document</b></Button><br/>
                {but===true ? (<Link to='/search' target={"_blank"}><Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}}><b>Interest Based Search</b></Button></Link>):(<Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} disabled={true}><b>Interest Based Search</b></Button>)} <br/>
                {top===true ? (<Link to="/analytics" > <Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} ><b>Analytics of Video</b></Button></Link>) : (<Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} disabled={true}><b>Analytics of Video</b></Button>)} <br/>
                {top===true ? ( <Link to= "/translation" ><Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} ><b>Translation of audio notes</b></Button></Link>):(<Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} disabled={true} ><b>Translation of audio notes</b></Button>)}  <br/>
                {but===true ? ( <Link to= "/clipping" ><Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} ><b>Clipping of Video</b></Button></Link>):(<Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} disabled={true} ><b>Clipping of Video</b></Button>)}  <br/>
                {but===true ? ( <Link to= "/content" ><Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} ><b>Lecture Content Extraction</b></Button></Link>):(<Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5, width:'400px'}} disabled={true} ><b>Lecture Content Extraction</b></Button>)}  <br/>
                </div>
                </div>
             
                
        </div>
      </div>
    </div>
  </section>
    </div>
  );
}

export default Home;