import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { Cross2Icon, ChevronDownIcon, PlusIcon, CalendarIcon } from '@radix-ui/react-icons';

const EditAvailabilityModal = ({ isOpen, onClose, host, onSave }) => {
  const [schedule, setSchedule] = useState([
    { day: 'Sunday', letter: 'S', available: false, hours: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Monday', letter: 'M', available: true, hours: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Tuesday', letter: 'T', available: true, hours: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Wednesday', letter: 'W', available: true, hours: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Thursday', letter: 'T', available: true, hours: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Friday', letter: 'F', available: true, hours: [{ start: '9:00am', end: '5:00pm' }] },
    { day: 'Saturday', letter: 'S', available: false, hours: [{ start: '9:00am', end: '5:00pm' }] }
  ]);
  
  const [timezone, setTimezone] = useState('Eastern Time - US & Canada');
  const [scheduleType, setScheduleType] = useState('Custom');

  const toggleDayAvailability = (dayIndex) => {
    setSchedule(prev => prev.map((day, index) => 
      index === dayIndex ? { ...day, available: !day.available } : day
    ));
  };

  const addHours = (dayIndex) => {
    setSchedule(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { ...day, hours: [...day.hours, { start: '9:00am', end: '5:00pm' }] }
        : day
    ));
  };

  const removeHours = (dayIndex, hoursIndex) => {
    setSchedule(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { ...day, hours: day.hours.filter((_, i) => i !== hoursIndex) }
        : day
    ));
  };

  const updateHours = (dayIndex, hoursIndex, field, value) => {
    setSchedule(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { 
            ...day, 
            hours: day.hours.map((hour, i) => 
              i === hoursIndex ? { ...hour, [field]: value } : hour
            )
          }
        : day
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium bg-gray-100 text-gray-600">
              {host?.name?.split(' ').map(n => n[0]).join('') || 'EW'}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{host?.name || 'Erica Wilhelmy'}</h2>
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <Cross2Icon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Schedule Type */}
          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-2 block">Schedule:</label>
            <Select.Root value={scheduleType} onValueChange={setScheduleType}>
              <Select.Trigger className="w-full flex items-center justify-between px-3 py-2 bg-blue-50 border border-blue-200 rounded text-blue-700 font-medium">
                <Select.Value>{scheduleType}</Select.Value>
                <ChevronDownIcon className="w-4 h-4" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200">
                  <Select.Viewport className="p-1">
                    <Select.Item value="Working hours" className="select-none rounded px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <Select.ItemText>Working hours</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Custom" className="select-none rounded px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <Select.ItemText>Custom</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Weekly Hours Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              <h3 className="font-medium text-gray-900">Weekly hours</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Set when the host is available for meetings</p>

            {/* Days Schedule */}
            <div className="space-y-3">
              {schedule.map((day, dayIndex) => (
                <div key={day.day} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                    {day.letter}
                  </div>
                  
                  {!day.available ? (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-gray-500">Unavailable</span>
                      <button 
                        onClick={() => toggleDayAvailability(dayIndex)}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500"
                      >
                        <PlusIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-2">
                      {day.hours.map((hour, hoursIndex) => (
                        <div key={hoursIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={hour.start}
                            onChange={(e) => updateHours(dayIndex, hoursIndex, 'start', e.target.value)}
                            className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:border-blue-500 focus:outline-none"
                          />
                          <span className="text-gray-400">-</span>
                          <input
                            type="text"
                            value={hour.end}
                            onChange={(e) => updateHours(dayIndex, hoursIndex, 'end', e.target.value)}
                            className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:border-blue-500 focus:outline-none"
                          />
                          <button 
                            onClick={() => removeHours(dayIndex, hoursIndex)}
                            className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Cross2Icon className="w-4 h-4 text-gray-400" />
                          </button>
                          <button 
                            onClick={() => addHours(dayIndex)}
                            className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center"
                          >
                            <PlusIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Timezone */}
          <div className="mb-6">
            <Select.Root value={timezone} onValueChange={setTimezone}>
              <Select.Trigger className="w-full flex items-center justify-between px-3 py-2 text-blue-600 hover:text-blue-700">
                <Select.Value>{timezone}</Select.Value>
                <ChevronDownIcon className="w-4 h-4" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200">
                  <Select.Viewport className="p-1">
                    <Select.Item value="Eastern Time - US & Canada" className="select-none rounded px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <Select.ItemText>Eastern Time - US & Canada</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Central Time - US & Canada" className="select-none rounded px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <Select.ItemText>Central Time - US & Canada</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Mountain Time - US & Canada" className="select-none rounded px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <Select.ItemText>Mountain Time - US & Canada</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Pacific Time - US & Canada" className="select-none rounded px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <Select.ItemText>Pacific Time - US & Canada</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Date-specific hours */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-600" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Date-specific hours</h4>
                  <p className="text-xs text-gray-500">Adjust hours for specific days</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                + Hours
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onSave({ schedule, timezone, scheduleType });
                onClose();
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAvailabilityModal;