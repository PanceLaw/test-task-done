import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getAllUsers } from './consts/api';
import './App.css'
import UserTable from './components/table/UserTable';

function App() {

  return (
    <main className='container'>
      <UserTable/>
    </main>
  )
}

export default App
