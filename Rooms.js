import {auth} from "../config"
import { firebaseRef } from "../config"
import {React,useState} from 'react'
import { db } from '../config';
import {useCollectionData } from "react-firebase-hooks/firestore"



const Rooms = ({ currentRoom, setShowListMenu, setCurrentRoom }) => {
  const roomsRef = db.collection("rooms");
  const query = roomsRef.where("room","==",currentRoom).orderBy("createdAt");
  const [rooms] = useCollectionData(query, { idField: "createdAt"});
  console.log("[all query]",query);

  const handleAddMember = async (name) =>{
    const createdAt = firebaseRef.firestore.FieldValue.serverTimestamp();
    
    
    await roomsRef.add({
        // id:{message.id},
        
        room: currentRoom,
        alloweduser: name
         
    });

  }

  const handleRoomChange = (room) => {
    if(room!=="General1" && room!=="General2" && room!=="General3"){
      console.log("rooooom   ",query);

    }
    setCurrentRoom(room);
    setShowListMenu(false);
    alert(`CHANGE TO "${room}" room !!!`);
    
   
    
  };
    
  const [name, setName] = useState('');
  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    
   
  };
  return (
      <>
      
        <div className="login">
          <button
              onClick={() => {
                handleRoomChange("General");
              }}
              className={currentRoom === "General" ? "active" : ""}
            >
              General
          </button>
        </div>
        <div className="login">
          <button
              onClick={() => {
                handleRoomChange("General2");
              }}
              className={currentRoom === "General2" ? "active" : ""}
            >
              General2
          </button>
        </div>
        <div className="login">
          <button
              onClick={() => {
                handleRoomChange("General3");
              }}
              className={currentRoom === "General3" ? "active" : ""}
            >
              General3
          </button>
        </div>
        <div className="login">
          <button 
            onClick={()=>{
              console.log("name:    ",{name});
              handleRoomChange([name]);
              setName('');
            }}>
            Enter Room
          </button>
          {/* <button onClick={()=>{
              console.log("name:    ",{name});
              handleAddMember([name]);
              setName('');
            }}>
            ADD MEMBER
          </button> */}
          
        </div>
        <div className="login">
          <div>
              <label className="label">  type:  </label>
                        <input onChange={handleName} className="input"
                        value={name} type="text" />
          </div>
        </div>
        
      </>
        
      // <div className="rooms">
      //   <h2>Select room</h2>
      //   <ul>
      //     <li
      //       onClick={() => {
      //           handleRoomChange("HTML");
      //         }}
      //         className={currentRoom === "HTML" ? "active" : ""}
      //       >
      //         CREATE ROOM
      //     </li>
      //     <li
      //       onClick={() => {
      //         handleRoomChange("HTML");
      //       }}
      //       className={currentRoom === "HTML" ? "active" : ""}
      //     >
      //       HTML
      //     </li>
      //     <li
      //       onClick={() => {
      //         handleRoomChange("CSS");
      //       }}
      //       className={currentRoom === "CSS" ? "active" : ""}
      //     >
      //       CSS
      //     </li>
      //     <li
      //       onClick={() => {
      //         handleRoomChange("General");
      //       }}
      //       className={currentRoom === "General" ? "active" : ""}
      //     >
      //       General
      //     </li>
      //     <li
      //       onClick={() => {
      //         handleRoomChange("ReactJs");
      //       }}
      //       className={currentRoom === "ReactJs" ? "active" : ""}
      //     >
      //       ReactJs
      //     </li>
      //     <li
      //       onClick={() => {
      //         handleRoomChange("JavaScript");
      //       }}
      //       className={currentRoom === "JavaScript" ? "active" : ""}
      //     >
      //       JavaScript
      //     </li>
      //   </ul>
      // </div>
    );
  };
  
  export default Rooms;