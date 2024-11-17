import LoginVm from "./LoginVm";
import LoginUiState from './LoginUiState'
import { useState,useEffect,useRef } from "react";

function LoginScreen({repo,onSignIn,}){
    const [uiState,setUiState] = useState(new LoginUiState());
    const vm = useState(new LoginVm(repo,uiState,onSignIn))[0];

    //save the input field ref in order to mark them focus on errors
    const emailInputEle = useRef(null);
    const passWrodInputEle = useRef(null);


    //declare ui states for each input field and matched error message on need
    const [passWord,setPassWord] = useState("");
    const [email,setEmail] = useState("");
    const [emailErrorMes,setEmailErrorMes] = useState("");
    const [passWordErrorMes,setpassWordErrorMes] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
        setUiState(vm.uiState) 
        }, 10); 
            // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [vm]);


    //will be active on submition of our form...
    function onsubmitForm(e){
        e.preventDefault();
        vm.onSignIn(email,passWord);
    }

  return (
    <section className="loginContainer">
    <form onSubmit={onsubmitForm} action="" className="formContainer">
      <h2 className="formTitle">Vote</h2>
      <p className="formSubtitle">Sign In</p>
      
      <div className="inputGroup">
        <label htmlFor="email">Email Address</label>
        <input 
          ref={emailInputEle} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          name="email" 
          id="email"
          required 
        />
        {uiState.errorMesE && <p className="errorText">{uiState.errorMesE}</p>}
      </div>

      <div className="inputGroup">
        <label htmlFor="password">Password</label>
        <input 
          ref={passWrodInputEle} 
          value={passWord} 
          onChange={(e) => setPassWord(e.target.value)} 
          type="password" 
          name="password" 
          id="password"
          required 
        />
        {uiState.errorMesP && <p className="errorText">{uiState.errorMesP}</p>}
      </div>

      <button type="submit" className="submitBtn">Sign In</button>

    </form>
</section>
)
}

export default LoginScreen
