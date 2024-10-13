
import './App.css'
import Chat from './Components/Chat'
import Header from './Components/Header'

function App() {


  return (
    <div className='container mx-auto'>
      <Header></Header>
      <div className='mt-10'>
        <Chat></Chat>
      </div>
    </div>
  )
}

export default App
