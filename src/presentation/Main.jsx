import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import VotingScreen from './votingScreen/VotingScreen'
import NavigationHoster from './NavigationHoster'
import './style/voting.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavigationHoster/>
  </StrictMode>,
)
