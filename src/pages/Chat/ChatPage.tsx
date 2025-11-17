import React, { useEffect, useState } from 'react'
import { ChatMessageType } from '../../api/chat-api'
import { useDispatch, useSelector } from 'react-redux'
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chatReducer'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'

const ChatPage = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat = () => {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  )
}

const Messages = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)

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
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  const dispatch: AppDispatch = useDispatch()

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
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
        <button disabled={false} onClick={sendMessageHandler}>
          Отправить
        </button>
      </div>
    </div>
  )
}

export default ChatPage
