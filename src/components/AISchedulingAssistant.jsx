import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { 
  Cross2Icon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  PersonIcon,
  CalendarIcon,
  CheckIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons';

const AISchedulingAssistant = ({ isOpen, onClose, eventTitle = "#virtual-coffee-chats Donut" }) => {
  const [selectedSlot, setSelectedSlot] = useState('Mon, 8:30am');
  const [duration, setDuration] = useState('15 mins');
  const [dateRange, setDateRange] = useState('Next Week');
  const [showConflictDetails, setShowConflictDetails] = useState(false);
  const [showInconveniences, setShowInconveniences] = useState(false);
  const [goingStatus, setGoingStatus] = useState('maybe');
  const [activeTab, setActiveTab] = useState('find-time');
  
  // Mock time suggestions with different statuses
  const timeSuggestions = [
    {
      time: 'Mon, 8:30am',
      status: 'selected',
      conflicts: 1,
      issues: [
        { type: 'conflict', icon: '⚠️', text: 'Conflicts', details: '1 attendee' },
        { type: 'warning', icon: '🕐', text: 'Outside of working hours', details: null }
      ],
      inconveniences: 1
    },
    {
      time: 'Mon, 12:30pm',
      status: 'top-pick',
      conflicts: 0,
      issues: [],
      inconveniences: 0
    },
    {
      time: 'Mon, 12:45pm',
      status: 'also-good',
      conflicts: 0,
      issues: [],
      inconveniences: 0
    }
  ];

  const attendees = [
    { id: 1, initials: 'DC', name: 'Dave Chen', avatar: null, color: 'bg-orange-500' },
    { id: 2, initials: 'EW', name: 'Erica Wilhelmy', avatar: null, color: 'bg-blue-500' }
  ];

  if (!isOpen) return null;

  const selectedTimeSlot = timeSuggestions.find(slot => slot.time === selectedSlot);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex gap-4">
                <Tabs.Trigger value="event" className="text-gray-600 pb-2 border-b-2 border-transparent data-[state=active]:text-gray-900 data-[state=active]:border-gray-900">
                  Event
                </Tabs.Trigger>
                <Tabs.Trigger value="find-time" className="text-gray-600 pb-2 border-b-2 border-transparent data-[state=active]:text-gray-900 data-[state=active]:border-gray-900">
                  Find time
                </Tabs.Trigger>
                <Tabs.Trigger value="history" className="text-gray-600 pb-2 border-b-2 border-transparent data-[state=active]:text-gray-900 data-[state=active]:border-gray-900">
                  History
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mt-3">{eventTitle}</h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Attendees and Settings Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <PersonIcon className="w-5 h-5 text-gray-500" />
              <div className="flex -space-x-2">
                {attendees.map((attendee, index) => (
                  <div 
                    key={attendee.id}
                    className={`w-8 h-8 rounded-full ${attendee.color} text-white text-xs flex items-center justify-center border-2 border-white`}
                    style={{ zIndex: attendees.length - index }}
                  >
                    {attendee.initials}
                  </div>
                ))}
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </div>
            
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Hide calendars
            </button>
          </div>

          {/* Duration and Date Range */}
          <div className="flex gap-4 mb-6">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ClockIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{duration}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{dateRange}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Time Suggestions */}
          <div className="space-y-3">
            {timeSuggestions.map((slot) => (
              <div 
                key={slot.time}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedSlot === slot.time 
                    ? 'border-orange-400 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedSlot(slot.time)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{slot.time}</span>
                      {slot.status === 'selected' && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">Selected</span>
                      )}
                      {slot.status === 'top-pick' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Top pick</span>
                      )}
                      {slot.status === 'also-good' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Also good</span>
                      )}
                    </div>
                    
                    {/* Issues and Warnings */}
                    {slot.issues.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {slot.issues.map((issue, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm">{issue.icon}</span>
                            <span className={`text-sm ${
                              issue.type === 'conflict' ? 'text-orange-600' : 'text-gray-600'
                            }`}>
                              {issue.text}
                            </span>
                            {issue.details && (
                              <>
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-gray-600">{issue.details}</span>
                                {issue.type === 'conflict' && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowConflictDetails(!showConflictDetails);
                                    }}
                                    className="ml-auto"
                                  >
                                    {showConflictDetails ? (
                                      <ChevronUpIcon className="w-4 h-4" />
                                    ) : (
                                      <ChevronDownIcon className="w-4 h-4" />
                                    )}
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* No conflicts */}
                    {slot.conflicts === 0 && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <CheckIcon className="w-4 h-4 text-green-600" />
                        <span>No conflicts</span>
                      </div>
                    )}
                    
                    {/* Inconveniences */}
                    {slot.inconveniences > 0 && (
                      <div className="mt-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowInconveniences(!showInconveniences);
                          }}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                          <InfoCircledIcon className="w-4 h-4" />
                          <span>Inconveniences • {slot.inconveniences} attendee</span>
                          {showInconveniences ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 space-y-4">
          {/* Going Status */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">Going?</span>
            <RadioGroup.Root value={goingStatus} onValueChange={setGoingStatus} className="flex gap-3">
              <div className="flex items-center gap-2">
                <RadioGroup.Item 
                  value="yes" 
                  className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                <label className="text-sm text-gray-700">Yes</label>
              </div>
              
              <div className="flex items-center gap-2">
                <RadioGroup.Item 
                  value="no" 
                  className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                <label className="text-sm text-gray-700">No</label>
              </div>
              
              <div className="flex items-center gap-2">
                <RadioGroup.Item 
                  value="maybe" 
                  className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-gray-600 data-[state=checked]:bg-gray-600"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                <label className="text-sm text-gray-700">Maybe</label>
              </div>
            </RadioGroup.Root>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
              <Cross2Icon className="w-4 h-4" />
              Remove from my calendar
            </button>
            
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                Refine proposal
                <span className="ml-1 px-1 py-0.5 bg-gray-200 text-xs rounded">Beta</span>
              </button>
              
              <button className="px-6 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISchedulingAssistant;