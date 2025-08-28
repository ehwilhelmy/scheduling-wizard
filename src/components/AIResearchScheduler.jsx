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
  BarChartIcon,
  LightningBoltIcon,
  MagicWandIcon,
  ReloadIcon
} from '@radix-ui/react-icons';

const AIResearchScheduler = ({ isOpen, onClose, studyTitle = "Rally UXR Study", hosts }) => {
  const [currentHost, setCurrentHost] = useState('Dave Chen');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hi! I'm analyzing the round robin schedule for ${studyTitle}. Let me check Dave and Oren's availability and workload...`,
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'ai',
      content: "Here's what I found:",
      timestamp: new Date(),
      analysis: {
        hosts: [
          {
            name: 'Dave Chen',
            currentLoad: 8,
            maxCapacity: 15,
            availability: 'High',
            nextSlot: 'Today 2:00 PM',
            color: 'orange'
          },
          {
            name: 'Oren Friedman',
            currentLoad: 12,
            maxCapacity: 15,
            availability: 'Medium',
            nextSlot: 'Tomorrow 10:00 AM',
            color: 'blue'
          }
        ],
        recommendation: 'Dave should take the next 2 participants to balance the workload',
        participantsWaiting: 5,
        averageWaitTime: '2.5 days'
      }
    },
    {
      id: 3,
      type: 'ai',
      content: "I've identified 5 participants waiting to be scheduled. Based on round robin rules and current workload, here's my recommendation:",
      timestamp: new Date(),
      participants: [
        {
          name: 'Sarah Johnson',
          timezone: 'PST',
          availability: ['Mon-Fri 9am-5pm'],
          preferredHost: null,
          suggestedHost: 'Dave Chen',
          suggestedTime: 'Mon Dec 9, 2:00 PM PST',
          reason: 'Dave has lower workload (53% vs Oren 80%)'
        },
        {
          name: 'Mike Wilson',
          timezone: 'EST',
          availability: ['Tue-Thu 1pm-6pm'],
          preferredHost: null,
          suggestedHost: 'Dave Chen',
          suggestedTime: 'Tue Dec 10, 4:00 PM EST',
          reason: 'Continuing to balance workload'
        },
        {
          name: 'Emily Davis',
          timezone: 'CST',
          availability: ['Mon-Wed 10am-3pm'],
          preferredHost: 'Oren',
          suggestedHost: 'Oren Friedman',
          suggestedTime: 'Wed Dec 11, 11:00 AM CST',
          reason: 'Participant preference + Oren available'
        },
        {
          name: 'James Lee',
          timezone: 'PST',
          availability: ['Any time'],
          preferredHost: null,
          suggestedHost: 'Oren Friedman',
          suggestedTime: 'Wed Dec 11, 3:00 PM PST',
          reason: 'Flexible participant, balancing to Oren'
        },
        {
          name: 'Ana Martinez',
          timezone: 'EST',
          availability: ['Thu-Fri 2pm-7pm'],
          preferredHost: null,
          suggestedHost: 'Dave Chen',
          suggestedTime: 'Thu Dec 12, 3:00 PM EST',
          reason: 'Back to Dave for true round robin'
        }
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptimization, setShowOptimization] = useState(false);
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

    // AI responses based on context
    setTimeout(() => {
      let aiResponse = {};
      
      if (inputValue.toLowerCase().includes('optimize')) {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: "I'll optimize the schedule for maximum efficiency. Here's my AI-powered solution:",
          timestamp: new Date(),
          optimization: {
            strategy: 'Timezone Clustering',
            description: 'Group participants by timezone to minimize context switching',
            benefits: [
              'Reduce host fatigue by 30%',
              'Improve participant satisfaction',
              'Minimize scheduling gaps'
            ],
            newSchedule: [
              { time: '9:00 AM - 12:00 PM PST', host: 'Dave', participants: ['PST participants'], count: 3 },
              { time: '1:00 PM - 4:00 PM EST', host: 'Oren', participants: ['EST participants'], count: 2 }
            ]
          }
        };
      } else if (inputValue.toLowerCase().includes('conflict')) {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: "I've detected potential conflicts. Here's how we can resolve them:",
          timestamp: new Date(),
          conflicts: [
            {
              issue: 'Dave has a team meeting during Sarah\'s preferred time',
              solution: 'Swap with Oren who is free, or offer Sarah an alternative slot 30 minutes later'
            },
            {
              issue: 'Both hosts are at capacity on Thursday',
              solution: 'Move 2 participants to Friday morning when both hosts have availability'
            }
          ]
        };
      } else if (inputValue.toLowerCase().includes('urgent') || inputValue.toLowerCase().includes('priority')) {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: "I can prioritize urgent participants while maintaining fairness. Here's my approach:",
          timestamp: new Date(),
          priority: {
            urgent: ['Sarah Johnson - Product launch deadline'],
            normal: ['Mike Wilson', 'Emily Davis'],
            flexible: ['James Lee - Marked as flexible'],
            suggestion: 'Move Sarah to Dave\'s next available slot (2 PM today), shift others accordingly'
          }
        };
      } else {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: "I understand. Based on your request, I recommend adjusting the schedule to ensure both hosts maintain a balanced workload while accommodating participant preferences. Would you like me to show you alternative scheduling strategies?",
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleAcceptSchedule = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        content: "Great! I'm sending calendar invites to all 5 participants and updating the host schedules. Dave and Oren will receive a summary of their upcoming interviews.",
        timestamp: new Date(),
        action: 'scheduled',
        summary: {
          totalScheduled: 5,
          daveCount: 3,
          orenCount: 2,
          nextInterview: 'Today 2:00 PM - Dave with Sarah Johnson'
        }
      }]);
      setIsTyping(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[700px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <MagicWandIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">AI Research Scheduler</h2>
              <p className="text-xs text-gray-500">Round Robin Optimization for {studyTitle}</p>
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
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {message.type === 'ai' && (
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <MagicWandIcon className="w-5 h-5 text-white" />
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

                {/* Host Analysis */}
                {message.analysis && (
                  <div className="mt-3 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {message.analysis.hosts.map((host) => (
                        <div key={host.name} className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full bg-${host.color}-500 text-white text-xs flex items-center justify-center`}>
                                {host.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium text-sm">{host.name}</span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              host.availability === 'High' ? 'bg-green-100 text-green-700' :
                              host.availability === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {host.availability}
                            </span>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Workload:</span>
                              <span className="font-medium">{host.currentLoad}/{host.maxCapacity} interviews</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Next slot:</span>
                              <span className="font-medium">{host.nextSlot}</span>
                            </div>
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`bg-${host.color}-500 h-2 rounded-full`}
                                  style={{ width: `${(host.currentLoad / host.maxCapacity) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-blue-700">
                        <LightningBoltIcon className="w-4 h-4" />
                        <span className="font-medium text-sm">AI Recommendation</span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">{message.analysis.recommendation}</p>
                      <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
                        <div>
                          <span className="text-blue-500">Participants waiting:</span>
                          <span className="ml-1 font-medium text-blue-700">{message.analysis.participantsWaiting}</span>
                        </div>
                        <div>
                          <span className="text-blue-500">Avg wait time:</span>
                          <span className="ml-1 font-medium text-blue-700">{message.analysis.averageWaitTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Participant Schedule */}
                {message.participants && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Suggested Schedule</span>
                      <button 
                        onClick={handleAcceptSchedule}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700"
                      >
                        Accept All
                      </button>
                    </div>
                    {message.participants.map((participant, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <PersonIcon className="w-4 h-4 text-gray-500" />
                              <span className="font-medium text-sm">{participant.name}</span>
                              <span className="text-xs text-gray-500">({participant.timezone})</span>
                              {participant.preferredHost && (
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                                  Prefers {participant.preferredHost}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
                              <div>
                                <span className="text-gray-500">Assigned to:</span>
                                <span className="ml-1 font-medium text-gray-900">{participant.suggestedHost}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Time:</span>
                                <span className="ml-1 font-medium text-gray-900">{participant.suggestedTime}</span>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600 italic">
                              💡 {participant.reason}
                            </div>
                          </div>
                          <div className="ml-3 flex gap-1">
                            <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                              <CheckIcon className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:bg-gray-50 rounded">
                              <ReloadIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optimization View */}
                {message.optimization && (
                  <div className="mt-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChartIcon className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-900">{message.optimization.strategy}</span>
                    </div>
                    <p className="text-sm text-purple-700 mb-3">{message.optimization.description}</p>
                    <div className="space-y-1 mb-3">
                      {message.optimization.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-purple-600">
                          <CheckIcon className="w-3 h-3" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conflict Resolution */}
                {message.conflicts && (
                  <div className="mt-3 space-y-2">
                    {message.conflicts.map((conflict, i) => (
                      <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <ExclamationTriangleIcon className="w-4 h-4 text-orange-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-orange-900">{conflict.issue}</p>
                            <p className="text-xs text-orange-700 mt-1">
                              <span className="font-medium">Solution:</span> {conflict.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Success Message */}
                {message.action === 'scheduled' && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckIcon className="w-5 h-5" />
                      <span className="font-medium">Schedule Confirmed</span>
                    </div>
                    <div className="mt-2 space-y-1 text-xs text-green-600">
                      <div>✓ {message.summary.totalScheduled} participants scheduled</div>
                      <div>✓ Dave: {message.summary.daveCount} interviews</div>
                      <div>✓ Oren: {message.summary.orenCount} interviews</div>
                      <div className="font-medium pt-1">Next: {message.summary.nextInterview}</div>
                    </div>
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <MagicWandIcon className="w-5 h-5 text-white" />
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
              placeholder="Ask about optimization, conflicts, urgent scheduling..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <PaperPlaneIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            <button 
              onClick={() => setInputValue('Optimize the schedule for timezone efficiency')}
              className="px-3 py-1 text-xs text-purple-600 bg-purple-100 rounded-full hover:bg-purple-200"
            >
              🎯 Optimize for timezones
            </button>
            <button 
              onClick={() => setInputValue('Show me scheduling conflicts')}
              className="px-3 py-1 text-xs text-orange-600 bg-orange-100 rounded-full hover:bg-orange-200"
            >
              ⚠️ Check conflicts
            </button>
            <button 
              onClick={() => setInputValue('Prioritize urgent participants')}
              className="px-3 py-1 text-xs text-red-600 bg-red-100 rounded-full hover:bg-red-200"
            >
              🚨 Handle urgent cases
            </button>
            <button 
              onClick={() => setInputValue('Balance host workload equally')}
              className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200"
            >
              ⚖️ Balance workload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResearchScheduler;