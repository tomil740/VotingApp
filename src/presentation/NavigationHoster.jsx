import Repository from "../domain/repository"
import {useEffect, useState} from "react";
import VotingScreen from "./votingScreen/VotingScreen";
import AdminScreen from "./adminScreen/AdminScreen";


/*
    this component should controll our navigation between main features / screens while keep track on the 
    needed navigation arguments and mange the navigation itself
*/



function NavigationHoster(){
    //the repository will be shared across all screens,and its life sycle will be of the navigationHoster(the app)
    const repo = useState(new Repository())[0];
    const [isSignIn,setIsSignIn] = useState(false);
    const [exposeAdminScreen,setExposeAdminScreen] = useState(false);

    const signInScreen = <button onClick={
        ()=>{
        repo.signIn("yahav@somthing","yahav-p-yahav")
        setIsSignIn(true)
    }}>sign In</button>

    const [currentScreen,setCurrentScreen] = useState(signInScreen); 

    useEffect(()=>{
        if(isSignIn){
            if(exposeAdminScreen){
                setCurrentScreen(<AdminScreen repo={repo} signOut={()=>setIsSignIn(false)} exposeAdmin={()=>setExposeAdminScreen(false)}/>)
            }else{
                setCurrentScreen(<VotingScreen repo={repo} signOut={()=>setIsSignIn(false)} exposeAdmin={()=>setExposeAdminScreen(true)}/>)
            }
        }else{
            setCurrentScreen(signInScreen)
        }
    },[isSignIn,exposeAdminScreen])

    
    


  return (
    <>
        {currentScreen}
    </>
  )
}

export default NavigationHoster
