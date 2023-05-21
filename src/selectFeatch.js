import { useEffect,useState } from "react";
import Orinak from"./orinak.js"

export default function FetchData(){
    const[data,setData]=useState('');
    const getData = async ()=>{
        try{
            const resp = await fetch(
                "https://api.sampleapis.com/countries/countries"
            );
            const json =await resp.json();
            setData(json);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
        getData();
    },[]);
    const [selectData,setSelectData] = useState({
        media: {flag: '', embiem: '', capital:'',}
    });
    const [flag,setFlag]= useState('');
    const [emb,setEmb]= useState('');
    const [cap,setCap]= useState('');
    return(
        <div>
        <select onChange={(e)=>{
            let obj = data.filter((elem) => elem.name === e.target.value);
            console.log(selectData);
            setSelectData(obj[0]);
            setFlag(obj[0].media.flag);
            setEmb(obj[0].media.embiem);
            setCap(obj[0].capital);
            
         
        }}>
            {/* {console.log(data[0].media.flag)} */}
            {
            data.length > 0
            ? data.map((elem,i) => <option key={i}>{elem.name}</option>)
            : console.log("error")}
        </select>
      {selectData.name ? (
        <Orinak fla={flag} gerb={emb} capital={setCap}/>
      ) : (
        console.log("error")
      )} 
       </div>
    );
}

