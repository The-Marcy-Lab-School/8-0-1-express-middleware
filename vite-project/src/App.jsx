import { useState } from 'react'
import './App.css'

const SizeButtons = ({ increment, decrement }) => {
  return (
    <section id='size-buttons'>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>–</button>
    </section>
  )
}

const Greeting = ({ size, message }) => {
  return (
    <section id='greeting'>
      <h2 style={{ fontSize: size }}>{message}</h2>
    </section>
  )
}

const LanguageButtons = ({ setMessage }) => {
  return (
    <section id='language-buttons'>
      <button onClick={() => setMessage('Hello World')}>English</button>
      <button onClick={() => setMessage('Bonjour Le Monde')}>French</button>
      <button onClick={() => setMessage('Hola Mundo')}>Spanish</button>
      <button onClick={() => setMessage('你好世界')}>Chinese</button>
      <button onClick={() => setMessage('हैलो वर्ल्ड')}>Hindi</button>
    </section>
  )
}

function App() {
  const [size, setSize] = useState(20);
  const [message, setMessage] = useState('Hello World');
  const increment = () => setSize(size + 5);
  const decrement = () => setSize(size - 5);

  return (
    <>
      <SizeButtons increment={increment} decrement={decrement} />
      <Greeting size={size} message={message} />
      <LanguageButtons setMessage={setMessage} />
    </>
  )
}

export default App
