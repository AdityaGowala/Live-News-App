import React , {useState} from 'react'
import Navbar from './components/Navbar'
import NewsApp from './components/NewsApp'

const App = () => {

   const [quary , setQuary] = useState('india');

  return (
    <div>
      <Navbar setQuary={setQuary}/>
      <NewsApp quary={quary}/>
    </div>
  )
}

export default App