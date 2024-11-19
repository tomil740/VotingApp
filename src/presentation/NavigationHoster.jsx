import Repository from "../domain/repository"
import {useEffect, useState} from "react";
import VotingScreen from "./votingScreen/VotingScreen";
import AdminScreen from "./adminScreen/AdminScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
import { RecoilRoot } from "recoil";



/*
    this component should controll our navigation between main features / screens while keep track on the 
    needed navigation arguments and mange the navigation itself
*/



function NavigationHoster(){
    //the repository will be shared across all screens,and its life sycle will be of the navigationHoster(the app)
    const repo = useState(new Repository())[0];
    const [isSignIn,setIsSignIn] = useState(false);
    const [exposeAdminScreen,setExposeAdminScreen] = useState(false);

    const [currentScreen,setCurrentScreen] = useState(<LoginScreen repo={repo} onSignIn={()=>setIsSignIn(true)} />); 
 
    useEffect(()=>{
        if(isSignIn){
            if(exposeAdminScreen){
                setCurrentScreen(<AdminScreen repo={repo} signOut={()=>setIsSignIn(false)} exposeAdmin={()=>setExposeAdminScreen(false)}/>)
            }else{
                setCurrentScreen(<VotingScreen repo={repo} signOut={()=>setIsSignIn(false)} exposeAdmin={()=>setExposeAdminScreen(true)}/>)
            }
        }else{
            setCurrentScreen(<LoginScreen repo={repo} onSignIn={()=>setIsSignIn(true)} />)
        }
    },[isSignIn,exposeAdminScreen])

    
    


  return (
    <RecoilRoot>
        {currentScreen}
    </RecoilRoot>
  )
}

export default NavigationHoster
