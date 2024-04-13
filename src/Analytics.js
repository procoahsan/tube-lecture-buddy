import React,{useState , useContext , useEffect} from 'react'
// import { PieChart, Pie, Tooltip, Bar, BarChart, Legend, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import axios from 'axios';
import AppContext from './AppContext';
import TopicAnalytics from './TopicAnalytics';
import KeywordAnalytics from './KeywordAnalytics';
import Button from 'react-bootstrap/Button';

export default function Analytics() {
    // const data = [
    //     { name: 'Group A', value: 400 },
    //     { name: 'Group B', value: 300 },
    //     { name: 'Group C', value: 300 },
    //     { name: 'Group D', value: 200 },
    //     { name: 'Group E', value: 278 },
    //     { name: 'Group F', value: 189 },
    // ];
    const myContext = useContext(AppContext);
    const [displayTop , setDisplayTop] = useState(false);
    const [displayKeyword , setDisplayKeyword] = useState(false);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [URL , setURL] = useState('');

    function DisplayTopicAnalytics(){
        // setURL(myContext.state.url)
        setDisplayTop(true);
        setDisplayKeyword(false);
        axios.get('http://localhost:5000/getTopicAnalytics?url='+URL).then((response) => {
            setData(response.data);
        });

    }


    function DisplayKeywordAnalytics(){
        setDisplayKeyword(true);
        setDisplayTop(false);
        axios.get('http://localhost:5000//getKeywordAnalytics').then((response) => {
            setData2(response.data);
        });
    }

   
    useEffect(() => {
        window.scrollTo(0, 0)
        console.log(myContext.state.url);
        setURL(myContext.state.url)
      
    },[myContext.state.url])

    return (
        <div>
            <header >
                <div className="logo">
                    <em>Tube</em> Lecture Buddy
                </div>
            </header>
            <div className='anaDiv' >
                <div className='hello'>
                    <h1 className='Topic-main-heading'><em>Tube</em> Lecture Analytics</h1><br />
                    <Button variant="danger"  onClick={DisplayTopicAnalytics}  style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5,width:'40%'}}><strong>Get Topic Analytics</strong></Button><br />
                    <Button variant="danger"  onClick={DisplayKeywordAnalytics}  style={{backgroundColor:'red' , color:'white', height:'50px', fontSize: '20px',margin:5,width:'40%'}}><strong>Get Keyword Analytics</strong></Button><br />
                    {displayTop && <TopicAnalytics data={data} />} <br/>
                    {displayKeyword && <KeywordAnalytics data2={data2} />}
                    
                    {/* <PieChart width={730} height={250}>
                        <Pie
                            dataKey="count"
                            nameKey="topic"
                            isAnimationActive={false}
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="red"
                            label
                        />
                        <Tooltip />
                    </PieChart><br />
                    <BarChart width={730} height={250} data={data} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="red" />
                    </BarChart><br />

                    <LineChart width={730} height={250} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="red" />
                    </LineChart>
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
                    </LineChart> */}

                </div>

            </div>



        </div>
    )
}
