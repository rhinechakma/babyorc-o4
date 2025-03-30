
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Paperclip, Send } from 'lucide-react';

interface ChatInputProps {
  onToolSelect: (tool: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onToolSelect }) => {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading } = useChat();

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      await sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const tools = [
    'verify document',
    'build a presentation',
    'build a website'
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Input field */}
      <div className="flex items-center bg-white dark:bg-lofty-darkInput border border-lofty-border dark:border-lofty-darkBorder rounded-full px-4 py-2">
        <button className="text-lofty-darkgray dark:text-gray-400 p-1 mr-2">
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="message lofty..."
          className="flex-1 outline-none bg-transparent dark:text-white dark:placeholder-gray-400"
          disabled={isLoading}
        />
        <button 
          className={`p-1 text-lofty-blue ${(!message.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSendMessage}
          disabled={!message.trim() || isLoading}
        >
          <Send size={20} />
        </button>
      </div>

      {/* Tool buttons */}
      <div className="flex gap-2">
        {tools.map((tool) => (
          <button
            key={tool}
            onClick={() => onToolSelect(tool)}
            className="flex-1 bg-lofty-gray dark:bg-lofty-darkInput hover:bg-lofty-gray/80 dark:hover:bg-lofty-darkInput/80 py-2 px-4 rounded-md text-sm text-black dark:text-white"
          >
            {tool}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;
