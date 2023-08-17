import React, {useEffect, useState} from "react";
import axios from 'axios';




function Home(){
    const [post, setPost] = useState();

  // useEffect(()=>{
  //   axios.get("http://localhost:5000/todos").then((response) => {
  //     setPost(response.data.rows);
  //   });
  // },[])

  console.log(post, 'post here ');
//   console.log(post.map((item)=>console.log(item.description)), 'post is here');

    const HandleBackUp=async () =>{
      try {
        await axios.post('http://localhost:5000/backup');
        console.log('Backup process initiated');
      } catch (error) {
        console.error('Error initiating backup:', error);
      }
    }

    return(
        <div>
            {post?.map((item)=>(
                <p key={item.tod_id}>{item.description}</p>
            ))}
        </div>
    )
}

export default Home;
