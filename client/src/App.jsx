import { useState } from 'react'
import './App.css'
import CenterLayout from './components/CenterLayout'
import TaskList from './components/TaskList'
import MembersFilter from './components/MembersFilter'

function App() {
  const [member, setMember] = useState('All');
  return (
    <CenterLayout>
      <MembersFilter member={member} onChange={(event) => {setMember(event.target.value)}} />
      <TaskList query={{ member }} />
    </CenterLayout>
  )
}

export default App
