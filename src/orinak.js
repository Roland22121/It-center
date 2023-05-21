

function Data(props){
    return(
        <div>
          <img src={props.fla}/>
          <img src={props.gerb}/>
          <p>{props.capital}</p>
        </div>
    )
}
export default Data