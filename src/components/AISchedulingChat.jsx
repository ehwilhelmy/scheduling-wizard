import React, { useState, useRef, useEffect } from 'react';
import { 
  Cross2Icon, 
  PaperPlaneIcon,
  DotsHorizontalIcon,
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  PersonIcon,
  ChevronDownIcon
} from '@radix-ui/react-icons';

const AISchedulingChat = ({ isOpen, onClose, eventTitle = "Research with Rally UXR" }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI scheduling assistant. I can help you find the perfect time for your meeting. Let me analyze everyone's calendars...",
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'ai',
      content: "I've found several time slots for your 30-minute meeting with Dave Chen and Oren Friedman. Here are the best options:",
      timestamp: new Date(),
      suggestions: [
        {
          time: 'Monday, 8:30am',
          date: 'Dec 9',
          status: 'has-conflicts',
          conflicts: ['Dave Chen has a conflicting meeting'],
          warnings: ['Outside of Oren\'s working hours'],
          score: 60
        },
        {
          time: 'Monday, 12:30pm',
          date: 'Dec 9',
          status: 'optimal',
          conflicts: [],
          warnings: [],
          score: 100
        },
        {
          time: 'Monday, 2:45pm',
          date: 'Dec 9',
          status: 'good',
          conflicts: [],
          warnings: ['Close to Dave\'s next meeting'],
          score: 85
        }
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = {
        'reschedule': "I'll help you reschedule. What new times work better for you?",
        'buffer': "I can add buffer time. How much time would you like between meetings? 15 or 30 minutes?",
        'weekly': "Would you like to make this a recurring weekly meeting? I can set that up for you.",
        'default': "I understand. Let me help you with that. Could you provide more details about your scheduling preferences?"
      };

      const response = Object.keys(aiResponses).find(key => 
        inputValue.toLowerCase().includes(key)
      ) || 'default';

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponses[response],
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: `I'd like to schedule for ${slot.time} on ${slot.date}`,
      timestamp: new Date()
    }]);

    setTimeout(() => {
      setIsTyping(true);
    }, 500);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        content: `Perfect! I've scheduled "${eventTitle}" for ${slot.time} on ${slot.date}. I'll send calendar invites to all participants. Is there anything else you'd like to adjust?`,
        timestamp: new Date(),
        action: 'scheduled',
        details: slot
      }]);
      setIsTyping(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">AI Scheduling Assistant</h2>
              <p className="text-xs text-gray-500">Finding the perfect time for everyone</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Cross2Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {message.type === 'ai' && (
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">AI Assistant</div>
                  </div>
                )}
                
                <div className={`rounded-2xl px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>

                {/* Time Slot Suggestions */}
                {message.suggestions && (
                  <div className="mt-3 space-y-2">
                    {message.suggestions.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectSlot(slot)}
                        className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-md ${
                          selectedSlot === slot 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4 text-gray-500" />
                              <span className="font-medium text-gray-900">{slot.time}</span>
                              <span className="text-sm text-gray-500">{slot.date}</span>
                              {slot.status === 'optimal' && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                  Best option
                                </span>
                              )}
                            </div>
                            
                            {slot.conflicts.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {slot.conflicts.map((conflict, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-orange-600">
                                    <ExclamationTriangleIcon className="w-3 h-3" />
                                    <span>{conflict}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {slot.warnings.length > 0 && (
                              <div className="mt-1 space-y-1">
                                {slot.warnings.map((warning, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                                    <ClockIcon className="w-3 h-3" />
                                    <span>{warning}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {slot.status === 'optimal' && (
                              <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                                <CheckIcon className="w-3 h-3" />
                                <span>No conflicts - everyone is available</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="ml-3">
                            <div className={`text-xs font-medium ${
                              slot.score === 100 ? 'text-green-600' :
                              slot.score >= 80 ? 'text-blue-600' :
                              'text-orange-600'
                            }`}>
                              {slot.score}% match
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Scheduled Confirmation */}
                {message.action === 'scheduled' && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckIcon className="w-5 h-5" />
                      <span className="font-medium">Meeting Scheduled Successfully</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      Calendar invites have been sent to all participants
                    </p>
                  </div>
                )}
                
                <div className="mt-1 text-xs text-gray-400">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <DotsHorizontalIcon className="w-5 h-5 text-gray-500 animate-pulse" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about scheduling, conflicts, or preferences..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PaperPlaneIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex gap-2">
            <button className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">
              Find another time
            </button>
            <button className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">
              Change duration
            </button>
            <button className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">
              Add participants
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISchedulingChat;