import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import VotingScreen from './votingScreen/VotingScreen'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VotingScreen/>
  </StrictMode>,
)
