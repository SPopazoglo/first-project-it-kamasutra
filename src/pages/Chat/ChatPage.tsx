import React, { useEffect, useState } from 'react'

const wsChanel = new WebSocket(
  'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
)

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  )
}

const Messages = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  useEffect(() => {
    wsChanel.addEventListener('message', (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    })
  }, [])

  return (
    <div style={{ height: 450, overflowY: 'auto' }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} style={{ width: '55px', borderRadius: '50%' }} />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  )
}

const AddMessageForm = () => {
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (!message) {
      return
    }
    wsChanel.send(message)
    setMessage('')
  }

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  )
}

export default ChatPage
