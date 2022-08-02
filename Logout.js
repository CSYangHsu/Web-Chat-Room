import {auth} from "../config"

const SignOut = ({setShowSideBar}) => auth.currentUser&&(
    <div className = "login">
        <button 
            className="logout"
            onClick={()=>{
            auth.signOut();
            }}
        >
        SignOut    
        </button>
        

    </div>
    
);

export default SignOut;