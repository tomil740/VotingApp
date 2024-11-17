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
        <input ref={emailInputEle} value={email} onChange={(email)=>setEmail(email.target.value)} type="text" name="email" />
        {uiState.errorMesE && <p style={{ color: 'red' }}>{uiState.errorMesE}</p>}
        <input ref={passWrodInputEle} value={passWord} onChange={(passWord)=>setPassWord(passWord.target.value)} type="text" name="userName" id="userName" />
        {uiState.errorMesP && <p style={{ color: 'red' }}>{uiState.errorMesP}</p>}
        <button>Submit :</button>
      </form>
    </section>
  )
}

export default LoginScreen
