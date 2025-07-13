import { useState } from "react";


const Home = ()=>{
    const [rooms,setRooms] = useState([]);
    const [currentRoom,setCurrentRoom] = useState(null);
    const [messages,setMessages] = useState([]);

    

    return(
        <h1>home</h1>
    )
}
export default Home;