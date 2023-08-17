import React, {useState} from "react";
import axios from "axios";

function BackUp(){
    // const [data, setData]= useState();
    let num = 3;
    const [backupNumber,setBackupNumber] = useState(num)
    const HandleBackUp = () =>{
        setBackupNumber(backupNumber+1)
        console.log(backupNumber, "bakup number is here");
        axios.post('http://localhost:5000/createDatabase', {version: backupNumber})
          .then(response => {
            console.log(response, "response is here");
        })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        }
    return(
        <div>
            <button onClick={HandleBackUp}>Copy data</button>
        </div>
    )
}

export default BackUp;
