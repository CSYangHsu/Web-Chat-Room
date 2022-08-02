
import { useState } from 'react'
import { db,auth,firebaseRef } from '../config';
import {useCollectionData } from "react-firebase-hooks/firestore"
import MessageCard from './MessageCard';



const Chatroom = ({currentRoom}) => {
    const [ message,setMessage] = useState("");
    // const message = {uid, photoURL, createdAt, text, room};
    const messagesRef = db.collection("messages");
    // console.log("[all ]",messagesRef);
    const query = messagesRef.where("room","==",currentRoom).orderBy("createdAt");
        // .limit(20);
    
    const [messages] = useCollectionData(query, { idField: "createdAt"});
    console.log("[all query]",query);

    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {uid,displayName,photoURL,email} = auth.currentUser;
        const createdAt = firebaseRef.firestore.FieldValue.serverTimestamp();
    
        await messagesRef.add({
            // id:{message.id},
            uid, 
            photoURL,
            createdAt,
            userName: email,//displayName,
            text: message,
            room: currentRoom,
            name: displayName
             
        }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          
          let cityDocRef = db.collection('messages').doc(docRef.id)
          cityDocRef.set({
              id: docRef.id,
              uid,
              photoURL,
              createdAt,
              text: message,
              room: currentRoom,
              userName: email,//displayName,
              name: displayName
              
          })
        })
        
        setMessage("");
    };
    
    const handleDelete = ( createdAt ,id) => {

        
        for (var i = 0; i < messages.length; i++) {
            if( messages[i].createdAt === createdAt ){
                // let idd = document.getElementsByTagName("message")[i].id;
                // db.collection("messages").doc(idd).delete();
                console.log("message[i]  ",messages[i]);
                let idd = document.getElementsByTagName("messages")[i];  
               
                db.collection("messages").doc(idd).delete(); 
            }
            
        }
      
        
      db.collection("messages").doc(id).delete();


    
        //console.log("true docc   ",db.collection("messages"));
        // console.log("true me ",id);
        
    };

    const handleAdd = ( messages ) => {
      
      
      for (var i = 0; i < messages.length; i++) {
          if( messages[i]=== messages[i].createdAt ){
              // let idd = document.getElementsByTagName("message")[i].id;
              // db.collection("messages").doc(idd).delete();
              console.log("message[i]  ",messages[i]);
              let idd = document.getElementsByTagName("messages")[i].id;  
             
              db.collection("messages").doc(idd).delete(); 
          }
          
      }
      console.log("true docc   ",db.collection("messages"));
      
      

    };

    return (
        <>
          <div className="messages">
            {messages &&
              messages.map((message) => (
                <MessageCard
                  message={message}
                  key={message.createdAt}
                 
                  handleDelete={handleDelete}
                />
              ))
            }
            
          </div>
    
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
            />
            <button type="submit" disabled={!message}>
              Send
            </button>
          </form>
        </>
      );
    
};
export default Chatroom;



