// import React, { useState } from 'react';

// function ChatBox() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Add user message
//     setMessages(prev => [...prev, { sender: 'user', text: input }]);

//     // Call backend API
//     try {
//       const res = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       });
//       const data = await res.json();

//       // Add bot reply
//       setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
//     } catch (err) {
//       setMessages(prev => [...prev, { sender: 'bot', text: 'Error fetching response.' }]);
//     }

//     setInput('');
//   };

//   return (
//     <div className="chatbox">
//       <div className="messages" style={{ maxHeight: '300px', overflowY: 'auto' }}>
//         {messages.map((msg, index) => (
//           <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
//             <p><strong>{msg.sender}:</strong> {msg.text}</p>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         placeholder="Ask me about college events..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default ChatBox;



import { useState } from 'react';
import axios from 'axios';
import { MessageSquare, X } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message });
      setReply(res.data.reply);
    } catch (err) {
      setReply('Error getting reply.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="bg-white w-80 shadow-xl rounded-lg border border-gray-300 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-primary-700">Event Assistant</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about events..."
            className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
            rows={3}
          />

          <button
            onClick={sendMessage}
            className="bg-primary-600 hover:bg-primary-700 text-white w-full py-2 mt-2 rounded text-sm"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>

          {reply && (
            <div className="mt-3 p-2 bg-gray-100 rounded text-sm">
              <strong>Assistant:</strong> {reply}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
