import {auth} from "../config"
import { firebaseRef } from "../config"
import {React,useState} from 'react'


const Login = () => {

        // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    
    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setError(true);
        } else {
            firebaseRef.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
                // Signed in 
    
            
                setSubmitted(true);
                setError(false);
                alert("success!!!")
                
                // ...
            }).catch(e => {setError(true);alert("ERROR!!!")});
            
           
        }

       //-----------signin 
        
        
      
        setPassword('');
        setEmail('');
        setName('');
        //------------signin done
    };
    
    
 
   
    
    return(
        <>
            
            <div>
                    <h3>                 </h3>
            </div>
             
            <div >
                
            
                
                <div className = "signin">
                    <button onClick={()=>{
                        auth.signInWithPopup( new firebaseRef.auth.GoogleAuthProvider() );}
                        }>
                    Login with GOOGLE    
                    </button>
                </div> 
            
                
            </div> 
            <div className = "signin">
                <button onClick={handleSubmit}>
                        Log in/Sign Up   
                </button>
                <div>
                    {/* Labels and inputs for form data */}
                    <label className="label">Name</label>
                    <input onChange={handleName} className="input"
                    value={name} type="text" />
            
                    <label className="label">Email</label>
                    <input onChange={handleEmail} className="input"
                    value={email} type="email" />
            
                    <label className="label">Password</label>
                    <input onChange={handlePassword} className="input"
                    value={password} type="password" />
            
                    
                </div>
                    

            </div>
                  

            

            

            
            
        
            
        </>
    );
    
    
    
};



export default Login;




// const Login = () => {
   
        
//     return(
//         <>
            

//             <div className = "login">
//                 <button onClick={()=>{
//                     auth.signInWithPopup( new firebaseRef.auth.GoogleAuthProvider() );}
//                     }>
//                 Login with GOOGLE    
//                 </button>

//             </div>
        

//             <div className = "login">
//                 <button onClick={LogIn}>
//                 Log in    
//                 </button>
//                 <button onClick={SignUp}>
//                 Sign Up    
//                 </button>
                
                

//             </div>

            

            
            
        
            
//         </>
//     );
    
    
    
// };



// export default Login;