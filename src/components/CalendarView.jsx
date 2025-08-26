import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import * as Tabs from '@radix-ui/react-tabs';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EyeOpenIcon, Cross2Icon, PlusIcon } from '@radix-ui/react-icons';

const CalendarView = ({ onClose }) => {
  const [currentView, setCurrentView] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 14)); // July 14, 2025
  const [timezone, setTimezone] = useState('America/New_York');
  const [activeTab, setActiveTab] = useState('participant-preview');

  // Time slots from 8 AM to 6 PM
  const timeSlots = [];
  for (let hour = 8; hour <= 18; hour++) {
    timeSlots.push(`${hour === 12 ? 12 : hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`);
  }

  // Week days for the calendar
  const weekDays = [
    { day: 'Mon', date: '14' },
    { day: 'Tue', date: '15' },
    { day: 'Wed', date: '16' }, 
    { day: 'Thu', date: '17' },
    { day: 'Thu', date: '17' } // Duplicate as shown in design
  ];

  // Mock busy/blocked events
  const events = {
    'Mon-14': [
      { time: '9-10', type: 'available', label: '' },
      { time: '10-11', type: 'busy', label: 'Busy\n9:00 - 11:00 AM' },
      { time: '1-2', type: 'blocked', label: 'Blocked\n1:00 - 2:00 PM' },
      { time: '3-4', type: 'blocked', label: 'Blocked\n3:00 - 4:00 PM' },
      { time: '4-5', type: 'blocked', label: 'Blocked\n4:00 - 5:00 PM' }
    ],
    'Tue-15': [
      { time: '10-11', type: 'busy', label: 'Busy\n10:00 - 11:00 AM' },
      { time: '1-2', type: 'busy', label: 'Busy\n1:00 - 2:00 PM' }
    ],
    'Wed-16': [
      { time: '9-10', type: 'available', label: '' },
      { time: '12-1', type: 'busy', label: 'Busy\n12:00 - 1:00 PM' }
    ],
    'Thu-17': [
      { time: '1-2', type: 'busy', label: 'Busy\n1:00 - 2:00 PM' },
      { time: '2-3', type: 'blocked', label: 'Blocked\n2:00 - 3:00 PM' },
      { time: '3-4', type: 'blocked', label: 'Blocked\n3:00 - 4:00 PM' }
    ]
  };

  const scheduleSettings = [
    { day: 'SUN', available: false, start: '', end: '' },
    { day: 'MON', available: true, start: '9:00 AM', end: '5:00 PM' },
    { day: 'TUE', available: true, start: '9:00 AM', end: '5:00 PM' },
    { day: 'WED', available: true, start: '9:00 AM', end: '5:00 PM' },
    { day: 'THU', available: true, start: '9:00 AM', end: '5:00 PM' },
    { day: 'FRI', available: true, start: '9:00 AM', end: '5:00 PM' },
    { day: 'SAT', available: false, start: '', end: '' }
  ];

  const getEventStyle = (type) => {
    switch (type) {
      case 'busy':
        return 'bg-green-200 border-green-300';
      case 'blocked':
        return 'bg-gray-400 text-white';
      case 'available':
        return 'bg-green-100 border-green-200';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* Month Navigation */}
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium">July 2025</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>

            {/* View Selector */}
            <Select.Root value={currentView} onValueChange={setCurrentView}>
              <Select.Trigger className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50">
                <Select.Value />
                <ChevronDownIcon className="w-4 h-4" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <Select.Viewport className="p-1">
                    <Select.Item value="week" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                      <Select.ItemText>Week</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="month" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                      <Select.ItemText>Month</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <Cross2Icon className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Calendar Area */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
              <div className="flex items-center border-b border-gray-200 px-4">
                <Tabs.List className="flex">
                  <Tabs.Trigger 
                    value="interviewee-calendars"
                    className="px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
                  >
                    Interviewee calendars
                  </Tabs.Trigger>
                  <Tabs.Trigger 
                    value="participant-preview"
                    className="px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
                  >
                    Participant Preview
                  </Tabs.Trigger>
                </Tabs.List>
              </div>

              <Tabs.Content value="participant-preview" className="flex-1 p-4 overflow-auto">
                {/* Calendar Grid */}
                <div className="grid grid-cols-6 gap-px bg-gray-200 border border-gray-200 rounded">
                  {/* Time column header */}
                  <div className="bg-white"></div>
                  
                  {/* Day headers */}
                  {weekDays.map((day, index) => (
                    <div key={index} className="bg-white p-3 text-center border-b border-gray-200">
                      <div className="text-sm font-medium text-gray-900">{day.day} {day.date}</div>
                    </div>
                  ))}

                  {/* Time slots and calendar cells */}
                  {timeSlots.map((time, timeIndex) => (
                    <React.Fragment key={time}>
                      {/* Time label */}
                      <div className="bg-white p-2 text-xs text-gray-500 text-right border-r border-gray-200">
                        {time}
                      </div>
                      
                      {/* Day cells */}
                      {weekDays.map((day, dayIndex) => {
                        const dayKey = `${day.day}-${day.date}`;
                        const dayEvents = events[dayKey] || [];
                        const timeSlotEvents = dayEvents.filter(event => {
                          const [startHour, endHour] = event.time.split('-').map(h => parseInt(h));
                          const currentHour = timeIndex + 8; // 8 AM start
                          return currentHour >= startHour && currentHour < endHour;
                        });

                        return (
                          <div key={`${day.day}-${day.date}-${timeIndex}`} className="bg-white min-h-[60px] border-b border-gray-100 relative">
                            {timeSlotEvents.map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className={`absolute inset-1 rounded text-xs p-1 ${getEventStyle(event.type)}`}
                              >
                                {event.label && (
                                  <div className="whitespace-pre-line">
                                    {event.label}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </Tabs.Content>

              <Tabs.Content value="interviewee-calendars" className="flex-1 p-4">
                <div className="text-center text-gray-500 mt-8">
                  Interviewee calendars view - Coming soon
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>

          {/* Right Panel - Edit Times */}
          <div className="w-80 border-l border-gray-200 bg-gray-50 p-4 overflow-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit times</h3>
            
            {/* Timezone */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <Select.Root value={timezone} onValueChange={setTimezone}>
                <Select.Trigger className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm flex items-center justify-between">
                  <Select.Value>America / New York (EST)</Select.Value>
                  <ChevronDownIcon className="w-4 h-4" />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <Select.Viewport className="p-1 max-h-60 overflow-auto">
                      <Select.Item value="America/New_York" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                        <Select.ItemText>America / New York (EST)</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="America/Los_Angeles" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                        <Select.ItemText>America / Los Angeles (PST)</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Schedule */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Schedule</h4>
              <div className="space-y-2">
                {scheduleSettings.map((schedule) => (
                  <div key={schedule.day} className="flex items-center justify-between text-sm">
                    <span className="w-10 text-gray-600">{schedule.day}</span>
                    {schedule.available ? (
                      <div className="flex items-center gap-2 flex-1 ml-4">
                        <Select.Root value={schedule.start}>
                          <Select.Trigger className="flex-1 bg-white border border-gray-200 rounded px-2 py-1 text-xs">
                            <Select.Value>{schedule.start}</Select.Value>
                          </Select.Trigger>
                        </Select.Root>
                        <span className="text-gray-500">to</span>
                        <Select.Root value={schedule.end}>
                          <Select.Trigger className="flex-1 bg-white border border-gray-200 rounded px-2 py-1 text-xs">
                            <Select.Value>{schedule.end}</Select.Value>
                          </Select.Trigger>
                        </Select.Root>
                        <button className="text-[#b60074] hover:bg-gray-100 p-1 rounded">
                          <PlusIcon className="w-3 h-3" />
                        </button>
                        <button className="text-[#b60074] hover:bg-gray-100 p-1 rounded">
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-1 ml-4">
                        <span className="text-gray-500 text-xs">Unavailable</span>
                        <button className="text-[#b60074] hover:bg-gray-100 p-1 rounded ml-auto">
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Date Overrides */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700">Date overrides</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">Adjust hours for specific days</p>
              <button className="text-[#b60074] text-sm font-medium border border-[#b60074] rounded px-3 py-1.5 hover:bg-[#b60074] hover:text-white transition-colors">
                Add hours
              </button>
            </div>

            {/* Avoid Meeting Conflicts */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Avoid meeting conflicts</label>
              <Select.Root defaultValue="default">
                <Select.Trigger className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm flex items-center justify-between">
                  <Select.Value>Default - Don't book over Busy Events</Select.Value>
                  <ChevronDownIcon className="w-4 h-4" />
                </Select.Trigger>
              </Select.Root>
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-[#b60074] hover:bg-gray-100 rounded">
                <EyeOpenIcon className="w-4 h-4" />
                Preview
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-[#b60074] text-white rounded hover:bg-[#950060]">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;