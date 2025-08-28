import React, { useState, useRef, useEffect } from 'react';
import { 
  Cross2Icon, 
  PaperPlaneIcon,
  DotsHorizontalIcon,
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  PersonIcon,
  BarChartIcon,
  LightningBoltIcon,
  MagicWandIcon,
  PlusIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons';

const AIStudySetupAssistant = ({ isOpen, onClose, onStudyConfigured }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'll help you set up your research study. I understand you want to add Dave and Oren as hosts with a rotating schedule. Let me help you configure this properly.",
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'ai',
      content: "First, let me confirm the host setup:",
      timestamp: new Date(),
      hostSetup: {
        primary: {
          name: 'Dave Chen',
          role: 'Primary Host',
          availability: 'Mon-Fri 9am-5pm PST',
          maxPerDay: null,
          color: 'orange'
        },
        secondary: {
          name: 'Oren Friedman',
          role: 'Secondary Host',
          availability: 'Mon-Fri 10am-6pm EST',
          maxPerDay: null,
          color: 'blue'
        },
        rotation: 'Dave always takes first session with each participant',
        distribution: 'Round robin after first session'
      }
    },
    {
      id: 3,
      type: 'ai',
      content: "Now, let me calculate the optimal capacity. With 30-minute calls and 15-minute buffers, each interview slot takes 45 minutes total.",
      timestamp: new Date(),
      capacityAnalysis: {
        perSlot: {
          interview: 30,
          buffer: 15,
          total: 45
        },
        daily: {
          hoursAvailable: 8,
          slotsPerHost: 10,
          recommendedMax: 8,
          reason: 'Leaving room for breaks and unexpected overruns'
        },
        weekly: {
          daveCapacity: 40,
          orenCapacity: 40,
          combined: 80,
          recommended: 60,
          reason: 'Maintains quality and prevents burnout'
        }
      }
    },
    {
      id: 4,
      type: 'ai',
      content: "Based on both hosts' availability, here's my recommendation for the best date range and interview capacity:",
      timestamp: new Date(),
      recommendations: {
        dateRange: {
          optimal: 'Dec 9 - Dec 20 (2 weeks)',
          totalParticipants: 60,
          reasoning: [
            'Avoids holiday disruptions',
            'Both hosts fully available',
            'Allows for 30 participants per week',
            'Buffer for no-shows and reschedules'
          ]
        },
        dailySchedule: {
          monday: { dave: 6, oren: 4, total: 10 },
          tuesday: { dave: 6, oren: 6, total: 12 },
          wednesday: { dave: 6, oren: 6, total: 12 },
          thursday: { dave: 6, oren: 6, total: 12 },
          friday: { dave: 4, oren: 4, total: 8 }
        },
        firstWeekSample: [
          { time: 'Mon 9:00am PST', participant: 'P1', host: 'Dave (first session)' },
          { time: 'Mon 9:45am PST', participant: 'P1', host: 'Oren (second session)' },
          { time: 'Mon 10:30am PST', participant: 'P2', host: 'Dave (first session)' },
          { time: 'Mon 11:15am PST', participant: 'P2', host: 'Oren (second session)' }
        ]
      }
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [studyConfig, setStudyConfig] = useState({
    hosts: [],
    rotation: '',
    bufferTime: 15,
    sessionLength: 30,
    dateRange: null,
    dailyLimit: 8
  });
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

    // Process user input and generate appropriate response
    setTimeout(() => {
      let aiResponse = {};
      
      if (inputValue.toLowerCase().includes('more interviews') || inputValue.toLowerCase().includes('increase')) {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: "I can adjust the capacity, but I should warn you about the trade-offs:",
          timestamp: new Date(),
          capacityWarning: {
            current: 8,
            requested: 10,
            impacts: [
              'Reduced break time between interviews',
              'Higher risk of host fatigue',
              'Less time for notes and follow-up',
              'Potential quality decrease after 6th interview'
            ],
            alternative: 'Consider extending the study period to 3 weeks instead, maintaining quality while reaching more participants'
          }
        };
      } else if (inputValue.toLowerCase().includes('timezone') || inputValue.toLowerCase().includes('international')) {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: "Let me help you optimize for different timezones. Here's how we can adjust:",
          timestamp: new Date(),
          timezoneOptimization: {
            zones: [
              { zone: 'PST', bestHost: 'Dave', slots: '9am-12pm' },
              { zone: 'EST', bestHost: 'Oren', slots: '1pm-5pm' },
              { zone: 'Europe', bestHost: 'Dave', slots: '7am-9am PST' },
              { zone: 'Asia', bestHost: 'Oren', slots: '6pm-8pm EST (optional)' }
            ],
            recommendation: 'Group participants by timezone to minimize context switching'
          }
        };
      } else if (inputValue.toLowerCase().includes('holiday') || inputValue.toLowerCase().includes('december')) {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: "Good point about December timing. Let me show you the holiday impact:",
          timestamp: new Date(),
          holidayAnalysis: {
            risks: [
              'Dec 23-Jan 2: Most people unavailable',
              'Dec 16-22: Reduced availability (vacation starts)',
              'Participant no-show rate increases 40% after Dec 15'
            ],
            suggestion: 'Complete study by Dec 13 or postpone to January 6',
            alternativeDates: [
              { range: 'Dec 2-13', availability: 'Excellent', participants: 50 },
              { range: 'Jan 6-17', availability: 'Very Good', participants: 60 },
              { range: 'Jan 13-24', availability: 'Excellent', participants: 60 }
            ]
          }
        };
      } else if (inputValue.toLowerCase().includes('confirm') || inputValue.toLowerCase().includes('looks good')) {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: "Perfect! Let me finalize your study configuration:",
          timestamp: new Date(),
          finalConfig: {
            hosts: [
              { name: 'Dave Chen', type: 'Primary', firstSession: true },
              { name: 'Oren Friedman', type: 'Secondary', firstSession: false }
            ],
            schedule: {
              dates: 'December 9-20, 2024',
              totalSlots: 60,
              perDay: 8,
              perWeek: 40,
              sessionLength: '30 minutes',
              bufferTime: '15 minutes'
            },
            rotation: 'Dave takes all first sessions, then round-robin',
            nextSteps: [
              '✓ Calendar invites will be blocked for both hosts',
              '✓ Participant booking link will be generated',
              '✓ Automated reminders configured',
              '✓ Backup slots identified for reschedules'
            ]
          },
          action: 'ready-to-configure'
        };
      } else {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: `I understand. Let me help you with that. The current configuration gives you 60 interview slots over 2 weeks, with Dave handling all first sessions. Would you like me to adjust any of these parameters?`,
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
    setTimeout(() => handleSend(), 100);
  };

  const handleApplyConfiguration = () => {
    const config = {
      hosts: [
        { name: 'Dave Chen', role: 'Primary', firstSession: true },
        { name: 'Oren Friedman', role: 'Secondary', firstSession: false }
      ],
      sessionLength: 30,
      bufferTime: 15,
      dailyLimit: 8,
      weeklyLimit: 40,
      dateRange: { start: 'Dec 9', end: 'Dec 20' },
      rotation: 'primary-first-then-round-robin'
    };
    
    if (onStudyConfigured) {
      onStudyConfigured(config);
    }
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'ai',
      content: "Great! I've configured your study with Dave and Oren. The calendar blocks have been created and your participant booking link is ready. Dave will automatically get the first session with each participant, then they'll rotate for follow-ups.",
      timestamp: new Date(),
      action: 'configured'
    }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[750px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <MagicWandIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">AI Study Setup Assistant</h2>
              <p className="text-xs text-gray-500">Configure hosts and optimize capacity</p>
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
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <MagicWandIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">AI Assistant</div>
                  </div>
                )}
                
                <div className={`rounded-2xl px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>

                {/* Host Setup Display */}
                {message.hostSetup && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                          DC
                        </div>
                        <div>
                          <div className="font-medium text-sm">{message.hostSetup.primary.name}</div>
                          <div className="text-xs text-orange-700">{message.hostSetup.primary.role}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>📅 {message.hostSetup.primary.availability}</div>
                        <div>🎯 Always takes first session</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                          OF
                        </div>
                        <div>
                          <div className="font-medium text-sm">{message.hostSetup.secondary.name}</div>
                          <div className="text-xs text-blue-700">{message.hostSetup.secondary.role}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>📅 {message.hostSetup.secondary.availability}</div>
                        <div>🔄 Rotates after first session</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Capacity Analysis */}
                {message.capacityAnalysis && (
                  <div className="mt-3 space-y-3">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <ClockIcon className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Time Calculation</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="bg-white rounded p-2 text-center">
                          <div className="text-2xl font-bold text-purple-600">30</div>
                          <div className="text-xs text-gray-600">min interview</div>
                        </div>
                        <div className="bg-white rounded p-2 text-center">
                          <div className="text-2xl font-bold text-indigo-600">15</div>
                          <div className="text-xs text-gray-600">min buffer</div>
                        </div>
                        <div className="bg-white rounded p-2 text-center">
                          <div className="text-2xl font-bold text-green-600">45</div>
                          <div className="text-xs text-gray-600">min per slot</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Slots per day (per host):</span>
                          <span className="font-medium">{message.capacityAnalysis.daily.recommendedMax}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weekly capacity (both hosts):</span>
                          <span className="font-medium">{message.capacityAnalysis.weekly.recommended}</span>
                        </div>
                        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                          💡 {message.capacityAnalysis.weekly.reason}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {message.recommendations && (
                  <div className="mt-3 space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CalendarIcon className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Optimal Date Range</span>
                      </div>
                      <div className="text-lg font-semibold text-green-700 mb-1">
                        {message.recommendations.dateRange.optimal}
                      </div>
                      <div className="text-sm text-green-600">
                        {message.recommendations.dateRange.totalParticipants} total participant slots
                      </div>
                      <div className="mt-2 space-y-1">
                        {message.recommendations.dateRange.reasoning.map((reason, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-green-700">
                            <CheckIcon className="w-3 h-3" />
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-sm font-medium text-blue-900 mb-3">Weekly Capacity Breakdown</div>
                      
                      {/* Header */}
                      <div className="grid grid-cols-6 gap-2 mb-2 text-xs font-medium text-gray-600">
                        <div></div>
                        <div className="text-center">Mon</div>
                        <div className="text-center">Tue</div>
                        <div className="text-center">Wed</div>
                        <div className="text-center">Thu</div>
                        <div className="text-center">Fri</div>
                      </div>
                      
                      {/* Dave's row */}
                      <div className="grid grid-cols-6 gap-2 mb-1">
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-4 h-4 rounded bg-orange-500 flex items-center justify-center text-white text-xs">D</div>
                          <span className="text-gray-700">Dave</span>
                        </div>
                        {Object.entries(message.recommendations.dailySchedule).map(([day, counts]) => (
                          <div key={day} className="text-center">
                            <div className="bg-orange-100 border border-orange-200 rounded px-2 py-1 text-xs">
                              <div className="font-semibold text-orange-800">{counts.dave}</div>
                              <div className="text-orange-600">interviews</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Oren's row */}
                      <div className="grid grid-cols-6 gap-2 mb-3">
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center text-white text-xs">O</div>
                          <span className="text-gray-700">Oren</span>
                        </div>
                        {Object.entries(message.recommendations.dailySchedule).map(([day, counts]) => (
                          <div key={day} className="text-center">
                            <div className="bg-blue-100 border border-blue-200 rounded px-2 py-1 text-xs">
                              <div className="font-semibold text-blue-800">{counts.oren}</div>
                              <div className="text-blue-600">interviews</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Daily totals */}
                      <div className="grid grid-cols-6 gap-2 pt-2 border-t border-blue-200">
                        <div className="text-xs font-medium text-gray-600">Total</div>
                        {Object.entries(message.recommendations.dailySchedule).map(([day, counts]) => (
                          <div key={day} className="text-center">
                            <div className="bg-gray-100 border border-gray-200 rounded px-2 py-1 text-xs">
                              <div className="font-semibold text-gray-800">{counts.total}</div>
                              <div className="text-gray-600">per day</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Legend */}
                      <div className="mt-3 pt-2 border-t border-blue-200 text-xs text-blue-700">
                        💡 Each interview = 30 min session + 15 min buffer (45 min total)
                      </div>
                    </div>
                  </div>
                )}

                {/* Capacity Warning */}
                {message.capacityWarning && (
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <InfoCircledIcon className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-amber-900">Impact of increasing to {message.capacityWarning.requested} interviews/day:</div>
                        <ul className="mt-2 space-y-1">
                          {message.capacityWarning.impacts.map((impact, i) => (
                            <li key={i} className="text-xs text-amber-700">• {impact}</li>
                          ))}
                        </ul>
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                          <div className="text-xs text-green-700">
                            <span className="font-medium">Alternative:</span> {message.capacityWarning.alternative}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Configuration */}
                {message.finalConfig && (
                  <div className="mt-3 space-y-3">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CheckIcon className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">Study Configuration Complete</span>
                        </div>
                        <button 
                          onClick={handleApplyConfiguration}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Apply Configuration
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700 mb-1">Hosts</div>
                          {message.finalConfig.hosts.map((host, i) => (
                            <div key={i} className="text-xs text-gray-600">
                              • {host.name} ({host.type})
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="font-medium text-gray-700 mb-1">Schedule</div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>📅 {message.finalConfig.schedule.dates}</div>
                            <div>📊 {message.finalConfig.schedule.totalSlots} total slots</div>
                            <div>⏱️ {message.finalConfig.schedule.sessionLength} + {message.finalConfig.schedule.bufferTime} buffer</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <div className="text-xs font-medium text-gray-700 mb-1">Next Steps:</div>
                        {message.finalConfig.nextSteps.map((step, i) => (
                          <div key={i} className="text-xs text-green-700">{step}</div>
                        ))}
                      </div>
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
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
              placeholder="Ask about capacity, date ranges, timezone considerations..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PaperPlaneIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            <button 
              onClick={() => handleQuickAction('Can we do more interviews per day?')}
              className="px-3 py-1 text-xs text-purple-600 bg-purple-100 rounded-full hover:bg-purple-200"
            >
              📈 Increase capacity
            </button>
            <button 
              onClick={() => handleQuickAction('What about December holidays?')}
              className="px-3 py-1 text-xs text-orange-600 bg-orange-100 rounded-full hover:bg-orange-200"
            >
              🎄 Holiday considerations
            </button>
            <button 
              onClick={() => handleQuickAction('How do we handle international participants?')}
              className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200"
            >
              🌍 Timezone optimization
            </button>
            <button 
              onClick={() => handleQuickAction('This looks good, confirm the setup')}
              className="px-3 py-1 text-xs text-green-600 bg-green-100 rounded-full hover:bg-green-200"
            >
              ✅ Confirm setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudySetupAssistant;