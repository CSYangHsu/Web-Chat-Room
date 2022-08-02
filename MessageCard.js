import { useState  } from "react";
import { auth } from "../config";

const MessageCard = ( { message,handleDelete  }) => {
   
    const {id, text, uid, userName,createdAt, photoURL,name } = message;
    // const setPhotoURL=useState('');
    // if(!photoURL){
    //     setPhotoURL("https://lh3.googleusercontent.com/a-/AOh14GhPoiNmjsuR8BY8Wu-SKqzpj70X6Kva7tYzSIkx=s96-c");
    // }
    const setUserName = useState('')
    // console.log("so this is fk message   ",message);
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    const [ showActionsButtons, setShowActionsButtons ] = useState(false);
    const [ showTextarea, setShowTextarea ] = useState(false);
    const click_add = () => {
        console.log("for debug1")
 
        setShowTextarea(!showTextarea);
        console.log("for debug2")
    }
    const toggleCard = () => {
        if(!showTextarea)setShowActionsButtons(!showActionsButtons);
    };
  
       
    return( 
        
        <>
            <div className = { `message ${messageClass}`}  >
                <div className="contents" onClick={toggleCard}>
                    <div className="user-name">
                        <p>{userName}</p>
                    </div>
                    <div className="photo">
                        <img src = {photoURL}  className="avatar" alt=''/>
                       
                    </div> 
                    <div className="text">
                        <p>{text}</p>
                    </div>
                    <div
                        style={ {display: showActionsButtons&&auth.currentUser.uid===uid ? "block" : "none" }  }
                        className="actions_delete" 
                    >
                        <button onClick={ ()=> handleDelete(createdAt, id)}>Delete</button>

                    </div>

                    <div className="form-control" defaultValue="">
                        <textarea cols = '5' rows = '1' name='text' id='text_id' style={{display: showTextarea ?"block":"none" }}> </textarea>
                        
                    </div>

                    {/* <div
                        style={ {display: showActionsButtons&&auth.currentUser.uid!==uid ? "block" : "none" }  }
                        className="actions_add" 
                    >
                        
                        <button onClick={click_add} >ADD to Room</button>
                    </div> */}

                </div>
            </div>
        </>
        


    




    );




};
export default MessageCard;


