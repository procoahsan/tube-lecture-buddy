import React, {useState , useEffect , useContext} from 'react'
import axios from 'axios';
import AppContext from './AppContext';
import Button from 'react-bootstrap/Button';
import  {Spinner}  from 'react-bootstrap';
import fileDownload from 'js-file-download';

export default function Translation() {
  const [url ,setURL] = useState('')
  const myContext = useContext(AppContext);
  const [loading , setLoading] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
    // axios.get('http://localhost:5000/getURL')
    // .then((res) => res.data)
    // .then((data) => {
    //   setURL(data.url)
    // })
    setURL(myContext.state.url)

  },[myContext.state.url])
    const options = ["urdu","french","arabic","chinese","turkish","german", "japenese"]
    const [language,setLanguage] = useState("")
    const trans = 'http://localhost:5000/translation?url='+url+'&language='+language;
    function downloadTranslation(){
    setLoading(true)
    axios.get(trans, {responseType: 'blob'}).then(res => {
      fileDownload(res.data, 'Translation.docx');
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
           <h1 className='Topic-main-heading'><em>Tube </em>Lecture Translate</h1><br/>
           <h1 style={{color:'white'}}>Kindly select a language</h1><br/>
              <select className="searchTerm" onChange={(e)=>setLanguage(e.target.value)}>
                <option >Select Language</option>
                    {options.map((option) => (
                        <option value={option}>{option}</option>
                    ))}
                </select><br />
               
                <Button variant='danger' style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:10}} onClick = {downloadTranslation} ><b>Download Translation</b></Button><br/>
                {loading && <Spinner animation="border" variant="danger" />}<br/>
                {loading && <h6 style={{color:'white'}}>Translation is Downloading</h6>}
         
          
        </div>

      </div>  

    </div>
  )
}
