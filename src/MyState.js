import React,{useState} from 'react'
import AppContext from './AppContext'

const MyState = (props) => {
    const [displayTop , setDisplayTop] = useState(false);
    const [url , setUrl] = useState('');
    const [feat , setFeat] = useState(false);

    const state = {
       'displayTop' : displayTop,
        'setDisplayTop' : setDisplayTop,
        'url' : url,
        'setUrl' : setUrl,
        'feat' : feat,
        'setFeat' : setFeat
        
    }
    const updateFeat = () => {
        setFeat(true)
    }
    const update = () => {
        setDisplayTop(true)
    }
    const updateUrl = (url) => {
        setUrl(url)
    }
  
  
  return (
    <AppContext.Provider value={{state , update , updateUrl, updateFeat }}>
        {props.children}
    </AppContext.Provider>
    
  )
}
export default MyState
