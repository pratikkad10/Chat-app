
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Button } from './components/ui/Button'
import Input from './components/ui/Input'

function App() {
  // const [room, setRoom]=useState<string>();
  const [socket, setSocket] = useState<WebSocket | undefined>();
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessage() {
    socket?.send(JSON.stringify({
      "type": "chat",
      "payload": {
        "message": inputRef.current?.value
      }
    }))

  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (event) => {
      setMessages(msg => [...msg, event.data])
    }

    ws.onopen = () => {
      ws.send(JSON.stringify({
        "type": "join",
        "payload": {
          "roomId": "red"
        }
      }))
    }
  }, [])

  return (
    <div className='bg-black h-[100vh] w-[100vw]'>
      <div className='h-[92vh] text-white p-4'>
        <div className='flex flex-col gap-2'> {messages.map((msg, index) => <span className='bg-zinc-900 px-4 py-2  rounded-xl text-zinc-100' key={index}>{msg}</span>)}</div>
      </div>
      <div className='flex gap-4 px-4'>
        <Input reference={inputRef} placeholder='Enter message here...' name='message' type='text' size='md' />
        <Button onClick={sendMessage} variant='secondary' text='send' size='md' />
      </div>
    </div>
  )
}

export default App
