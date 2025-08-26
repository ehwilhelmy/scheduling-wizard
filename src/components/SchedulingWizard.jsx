import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Select from '@radix-ui/react-select';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import AddTeammateDropdown from './AddTeammateDropdown';
import { 
  ChevronDownIcon, 
  CheckIcon, 
  ExternalLinkIcon,
  Pencil1Icon,
  ClockIcon,
  GearIcon,
  ChevronUpIcon,
  Cross2Icon,
  PlusIcon,
  StarIcon,
  StarFilledIcon
} from '@radix-ui/react-icons';
import clsx from 'clsx';

const SchedulingWizard = () => {
  const [currentStep, setCurrentStep] = useState(2); // Schedule step (0-indexed)
  const [eventTitle, setEventTitle] = useState('Research with Rally UXR');
  const [eventDescription, setEventDescription] = useState(
    'Thank you for agreeing to take the time to help us do some research. If for any reason you need to cancel or reschedule please feel free to use the link(s) below or if needed reach out to us via email.'
  );
  const [duration, setDuration] = useState('30 mins');
  const [location, setLocation] = useState('Google meet');
  const [eventType, setEventType] = useState('round-robin');
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [hosts, setHosts] = useState([
    { id: 1, name: 'Dave Chen', avatar: 'http://localhost:3845/assets/55016c4ae97488578ec1ee198cd925bbc4070718.png', role: 'Host', priority: 'highest' },
    { id: 2, name: 'Oren Friedman', avatar: 'http://localhost:3845/assets/01161bc86eeaaba5b80bb5e6a60198c4bf1be970.png', role: 'Host', priority: 'high' }
  ]);
  const [guests, setGuests] = useState([]);
  const [observers, setObservers] = useState([]);

  const handleAddHost = (user) => {
    setHosts([...hosts, { ...user, priority: 'high' }]);
  };

  const handleAddGuest = (user) => {
    setGuests([...guests, user]);
  };

  const handleAddObserver = (user) => {
    setObservers([...observers, user]);
  };

  const updateHostPriority = (hostId, priority) => {
    setHosts(hosts.map(host => 
      host.id === hostId ? { ...host, priority } : host
    ));
  };
  const [distributionOption, setDistributionOption] = useState('equal');
  const [preferencesExpanded, setPreferencesExpanded] = useState(true);
  
  // Availability section state
  const [dateRange, setDateRange] = useState('rolling-dates');
  const [scheduleWindow, setScheduleWindow] = useState('60-days');
  const [timeSlots, setTimeSlots] = useState('30-mins');
  const [scheduleMode, setScheduleMode] = useState('by-host');
  const [interviewLimit, setInterviewLimit] = useState('none');
  const [customInterviewLimit, setCustomInterviewLimit] = useState('');
  const [bufferTime, setBufferTime] = useState('none');
  const [customBufferTime, setCustomBufferTime] = useState('');

  const steps = [
    { name: 'Plan', completed: true },
    { name: 'Screener', completed: true },
    { name: 'Schedule', completed: false, active: true },
    { name: 'Email', completed: false },
    { name: 'Review', completed: false }
  ];

  const durations = ['15 mins', '30 mins', '45 mins', '60 mins', '90 mins'];
  const locations = ['Google meet', 'Zoom', 'Microsoft Teams', 'Phone call', 'In person'];
  const eventTypes = [
    { value: 'one-on-one', label: 'One-on-one', description: '1 host → 1 invitee' },
    { value: 'collective', label: 'Collective', description: 'Many host → 1 invitee' },
    { value: 'round-robin', label: 'Round robin', description: 'Rotating hosts → 1 Invitee' }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm p-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button className="px-3 py-1.5 text-sm font-medium text-[#b60074] border border-[#af006f2d] rounded hover:bg-[#e0008008] transition-colors">
            Save & exit
          </button>

          {/* Progress Steps */}
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <div key={step.name} className="flex items-center">
                  {index > 0 && (
                    <div className={clsx(
                      "w-20 h-0.5 mx-2",
                      index <= currentStep ? "bg-pink-500" : "bg-gray-200"
                    )} />
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <div className={clsx(
                      "w-5 h-5 rounded-full flex items-center justify-center",
                      step.completed ? "bg-pink-500" : step.active ? "bg-white border-2 border-pink-500" : "bg-white border-2 border-gray-300"
                    )}>
                      {step.completed ? (
                        <CheckIcon className="w-3 h-3 text-white" />
                      ) : step.active ? (
                        <div className="w-2 h-2 bg-pink-500 rounded-full" />
                      ) : null}
                    </div>
                    <span className={clsx(
                      "text-xs font-medium",
                      step.active ? "text-gray-900" : "text-gray-600"
                    )}>
                      {step.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded bg-[#e2008b17] hover:bg-[#e2008b23] transition-colors">
              <GearIcon className="w-4 h-4 text-[#b60074]" />
            </button>
            <button 
              className="px-3 py-1.5 text-sm font-medium text-gray-400 bg-gray-100 rounded cursor-not-allowed"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 pt-8 pb-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-medium text-gray-900">Let participants book interviews</h1>
            <button className="px-3 py-1.5 text-sm font-medium text-[#b60074] border border-[#af006f2d] rounded hover:bg-[#e0008008] transition-colors flex items-center gap-2">
              Preview
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Event Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              {editingTitle ? (
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  onBlur={() => setEditingTitle(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
                  className="text-lg font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-pink-500 flex-1"
                  autoFocus
                />
              ) : (
                <>
                  <h2 className="text-lg font-medium text-gray-900">{eventTitle}</h2>
                  <button 
                    onClick={() => setEditingTitle(true)}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    <Pencil1Icon className="w-4 h-4 text-gray-600" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-start gap-2">
              {editingDescription ? (
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  onBlur={() => setEditingDescription(false)}
                  className="text-sm text-gray-700 bg-transparent border border-gray-300 rounded p-2 focus:outline-none focus:border-pink-500 flex-1 min-h-[80px] resize-none"
                  autoFocus
                />
              ) : (
                <>
                  <p className="text-sm text-gray-700 flex-1">{eventDescription}</p>
                  <button 
                    onClick={() => setEditingDescription(true)}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    <Pencil1Icon className="w-4 h-4 text-gray-600" />
                  </button>
                </>
              )}
            </div>

            {/* Event Options */}
            <div className="flex flex-wrap gap-2">
              <Select.Root value={duration} onValueChange={setDuration}>
                <Select.Trigger className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#b60074] hover:bg-gray-50 rounded transition-colors">
                  <ClockIcon className="w-4 h-4" />
                  <Select.Value />
                  <Select.Icon>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                    <Select.Viewport className="p-1">
                      {durations.map((d) => (
                        <Select.Item
                          key={d}
                          value={d}
                          className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 focus:bg-gray-100 outline-none"
                        >
                          <Select.ItemText>{d}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              <Select.Root value={location} onValueChange={setLocation}>
                <Select.Trigger className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#b60074] hover:bg-gray-50 rounded transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 2C5.23858 2 3 4.23858 3 7C3 10.5 8 14 8 14C8 14 13 10.5 13 7C13 4.23858 10.7614 2 8 2Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <Select.Value />
                  <Select.Icon>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                    <Select.Viewport className="p-1">
                      {locations.map((loc) => (
                        <Select.Item
                          key={loc}
                          value={loc}
                          className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 focus:bg-gray-100 outline-none"
                        >
                          <Select.ItemText>{loc}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              <Select.Root value={eventType} onValueChange={setEventType}>
                <Select.Trigger className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#b60074] hover:bg-gray-50 rounded transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5.5 7C6.32843 7 7 6.32843 7 5.5C7 4.67157 6.32843 4 5.5 4C4.67157 4 4 4.67157 4 5.5C4 6.32843 4.67157 7 5.5 7Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10.5 7C11.3284 7 12 6.32843 12 5.5C12 4.67157 11.3284 4 10.5 4C9.67157 4 9 4.67157 9 5.5C9 6.32843 9.67157 7 10.5 7Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 12C8 12 10 10 11.5 10C13 10 14 11 14 12V14H2V12C2 11 3 10 4.5 10C6 10 8 12 8 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <Select.Value placeholder="Select event type...">
                    {eventType ? eventTypes.find(type => type.value === eventType)?.label : 'Select event type...'}
                  </Select.Value>
                  <Select.Icon>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                    <Select.Viewport className="p-2">
                      {eventTypes.map((type) => (
                        <Select.Item
                          key={type.value}
                          value={type.value}
                          className="relative px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-50 focus:bg-gray-50 outline-none data-[state=checked]:bg-gray-100"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-normal text-gray-900">
                                <Select.ItemText>{type.label}</Select.ItemText>
                              </div>
                              <div className="text-xs font-light text-gray-700">
                                {type.description}
                              </div>
                            </div>
                            <Select.ItemIndicator>
                              <CheckIcon className="w-4 h-4" />
                            </Select.ItemIndicator>
                          </div>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <Accordion.Root type="single" collapsible className="space-y-4">
          <Accordion.Item value="who" className="bg-white/80 border border-gray-100 rounded-lg">
            <Accordion.Header>
              <Accordion.Trigger className="w-full px-3 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900">Who's involved?</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Host, guests, and observers</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-4 pb-4">
              <div className="space-y-6">
                {/* Interviewers Section */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Interviewer(s)</h4>
                    <p className="text-xs text-gray-500">
                      {eventType === 'round-robin' ? 'Round robin picks one host to do the interview. Set priority to control selection preference.' : 'Collective interviews require all hosts to participate together.'}
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-3 space-y-3">
                    {/* Host List */}
                    {hosts.map((host) => (
                      <div key={host.id} className="flex items-center gap-3">
                        <div className="flex-1 bg-white border border-gray-100 rounded-md p-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img 
                                src={host.avatar} 
                                alt={host.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="text-sm font-medium text-gray-900">{host.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Select.Root value={host.role.toLowerCase()}>
                                <Select.Trigger className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded-sm transition-colors">
                                  <Select.Value />
                                  <ChevronDownIcon className="w-3 h-3" />
                                </Select.Trigger>
                                <Select.Portal>
                                  <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                                    <Select.Viewport className="p-1">
                                      <Select.Item value="host" className="px-2 py-1 text-xs rounded cursor-pointer hover:bg-gray-100 outline-none">
                                        <Select.ItemText>Host</Select.ItemText>
                                      </Select.Item>
                                      <Select.Item value="guest" className="px-2 py-1 text-xs rounded cursor-pointer hover:bg-gray-100 outline-none">
                                        <Select.ItemText>Guest</Select.ItemText>
                                      </Select.Item>
                                      <Select.Item value="observer" className="px-2 py-1 text-xs rounded cursor-pointer hover:bg-gray-100 outline-none">
                                        <Select.ItemText>Observer</Select.ItemText>
                                      </Select.Item>
                                    </Select.Viewport>
                                  </Select.Content>
                                </Select.Portal>
                              </Select.Root>
                            </div>
                          </div>
                        </div>
                        <button 
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setHosts(hosts.filter(h => h.id !== host.id))}
                        >
                          <Cross2Icon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <AddTeammateDropdown 
                      onAddUser={handleAddHost} 
                      existingUsers={hosts}
                      buttonLabel="Add rotating-host"
                      role="Host"
                    />

                    {/* Preferences Section */}
                    <div className="pt-2">
                      <button 
                        onClick={() => setPreferencesExpanded(!preferencesExpanded)}
                        className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        Preferences
                        <ChevronUpIcon className={`w-4 h-4 transition-transform ${preferencesExpanded ? '' : 'rotate-180'}`} />
                      </button>
                      
                      {preferencesExpanded && (
                        <div className="mt-3 space-y-2">
                          <div className="max-w-xs">
                            <label className="block text-sm font-medium text-gray-900 mb-2">Distribution options:</label>
                            <Select.Root value={distributionOption} onValueChange={setDistributionOption}>
                              <Select.Trigger className="inline-flex items-center justify-between w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                <Select.Value>
                                  {distributionOption === 'equal' ? 'Optimize for equal distribution' : 
                                   distributionOption === 'random' ? 'Random distribution' : 
                                   'Based on preferences'}
                                </Select.Value>
                                <Select.Icon asChild>
                                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                </Select.Icon>
                              </Select.Trigger>
                              <Select.Portal>
                                <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                                  <Select.Viewport className="p-1">
                                    <Select.Item value="equal" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                      <Select.ItemText>Optimize for equal distribution</Select.ItemText>
                                    </Select.Item>
                                    <Select.Item value="random" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                      <Select.ItemText>Random distribution</Select.ItemText>
                                    </Select.Item>
                                    <Select.Item value="preference" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                      <Select.ItemText>Based on preferences</Select.ItemText>
                                    </Select.Item>
                                  </Select.Viewport>
                                </Select.Content>
                              </Select.Portal>
                            </Select.Root>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Guests Section */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Guest(s)</h4>
                    <p className="text-xs text-gray-500">Guest will be invited to every interview</p>
                  </div>
                  
                  {guests.length > 0 && (
                    <div className="space-y-3">
                      {guests.map((guest) => (
                        <div key={guest.id} className="flex items-center gap-3">
                          <div className="flex-1 bg-white border border-gray-100 rounded-md p-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {guest.avatar ? (
                                  <img 
                                    src={guest.avatar} 
                                    alt={guest.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${guest.bgColor || 'bg-[rgba(244,0,140,0.09)] text-[rgba(182,0,116,0.84)]'}`}>
                                    {guest.initials}
                                  </div>
                                )}
                                <span className="text-sm font-medium text-gray-900">{guest.name}</span>
                              </div>
                              <span className="text-xs text-gray-500">Guest</span>
                            </div>
                          </div>
                          <button 
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => setGuests(guests.filter(g => g.id !== guest.id))}
                          >
                            <Cross2Icon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <AddTeammateDropdown 
                    onAddUser={handleAddGuest} 
                    existingUsers={[...hosts, ...guests, ...observers]}
                    buttonLabel="Add guests"
                    role="Guest"
                  />
                </div>

                {/* Observers Section */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Observer(s)</h4>
                    <p className="text-xs text-gray-500">Observers will be sent a separate invite to watch the interview live</p>
                  </div>
                  
                  {observers.length > 0 && (
                    <div className="space-y-3">
                      {observers.map((observer) => (
                        <div key={observer.id} className="flex items-center gap-3">
                          <div className="flex-1 bg-white border border-gray-100 rounded-md p-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {observer.avatar ? (
                                  <img 
                                    src={observer.avatar} 
                                    alt={observer.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${observer.bgColor || 'bg-[rgba(244,0,140,0.09)] text-[rgba(182,0,116,0.84)]'}`}>
                                    {observer.initials}
                                  </div>
                                )}
                                <span className="text-sm font-medium text-gray-900">{observer.name}</span>
                              </div>
                              <span className="text-xs text-gray-500">Observer</span>
                            </div>
                          </div>
                          <button 
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => setObservers(observers.filter(o => o.id !== observer.id))}
                          >
                            <Cross2Icon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <AddTeammateDropdown 
                    onAddUser={handleAddObserver} 
                    existingUsers={[...hosts, ...guests, ...observers]}
                    buttonLabel="Add observers"
                    role="Observer"
                  />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="when" className="bg-white/80 border border-gray-100 rounded-lg">
            <Accordion.Header>
              <Accordion.Trigger className="w-full px-3 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900">When are you available?</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Specify hosts availability, interview limits, buffers</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-4 pb-4">
              <div className="space-y-4">
                {/* Current availability summary */}
                <div className="text-sm text-gray-500">
                  Weekdays, 9am - 5 pm EST
                </div>

                {/* Scheduling Settings */}
                <div className="space-y-4">
                  {/* Date range and scheduling window */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">Date range</label>
                      <Select.Root value={dateRange} onValueChange={setDateRange}>
                        <Select.Trigger className="inline-flex items-center justify-between w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                          <Select.Value>
                            {dateRange === 'rolling-dates' ? 'Rolling-dates' :
                             dateRange === 'fixed-dates' ? 'Fixed dates' : 
                             'Custom range'}
                          </Select.Value>
                          <Select.Icon asChild>
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                            <Select.Viewport className="p-1">
                              <Select.Item value="rolling-dates" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <Select.ItemText>Rolling-dates</Select.ItemText>
                              </Select.Item>
                              <Select.Item value="fixed-dates" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <Select.ItemText>Fixed dates</Select.ItemText>
                              </Select.Item>
                              <Select.Item value="custom" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <Select.ItemText>Custom range</Select.ItemText>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">Invitees can schedule for</label>
                      <Select.Root value={scheduleWindow} onValueChange={setScheduleWindow}>
                        <Select.Trigger className="inline-flex items-center justify-between w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                          <Select.Value>
                            {scheduleWindow === '60-days' ? '60 days' :
                             scheduleWindow === '30-days' ? '30 days' :
                             scheduleWindow === '90-days' ? '90 days' : '2 weeks'}
                          </Select.Value>
                          <Select.Icon asChild>
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                            <Select.Viewport className="p-1">
                              <Select.Item value="2-weeks" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <Select.ItemText>2 weeks</Select.ItemText>
                              </Select.Item>
                              <Select.Item value="30-days" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <Select.ItemText>30 days</Select.ItemText>
                              </Select.Item>
                              <Select.Item value="60-days" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <Select.ItemText>60 days</Select.ItemText>
                              </Select.Item>
                              <Select.Item value="90-days" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <Select.ItemText>90 days</Select.ItemText>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                  </div>

                  {/* Capacity modifiers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">Interview limit</label>
                      <Select.Root value={interviewLimit} onValueChange={setInterviewLimit}>
                        <Select.Trigger className="inline-flex items-center justify-between w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                          <Select.Value>
                            {interviewLimit === 'none' ? 'No limit' :
                             interviewLimit === '1-per-day' ? '1 per day (-20% capacity)' :
                             interviewLimit === '2-per-day' ? '2 per day (-10% capacity)' :
                             interviewLimit === '3-per-day' ? '3 per day (-5% capacity)' :
                             interviewLimit === 'custom' ? `${customInterviewLimit} per day (custom)` : 'No limit'}
                          </Select.Value>
                          <Select.Icon asChild>
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                            <Select.Viewport className="p-1">
                              <Select.Item value="none" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>No limit</Select.ItemText>
                                  <span className="text-xs text-gray-500">Full capacity available</span>
                                </div>
                              </Select.Item>
                              <Select.Item value="1-per-day" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>1 per day</Select.ItemText>
                                  <span className="text-xs text-gray-500">Reduces capacity by ~20%</span>
                                </div>
                              </Select.Item>
                              <Select.Item value="2-per-day" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>2 per day</Select.ItemText>
                                  <span className="text-xs text-gray-500">Reduces capacity by ~10%</span>
                                </div>
                              </Select.Item>
                              <Select.Item value="3-per-day" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>3 per day</Select.ItemText>
                                  <span className="text-xs text-gray-500">Reduces capacity by ~5%</span>
                                </div>
                              </Select.Item>
                              <Select.Item value="custom" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>Custom limit</Select.ItemText>
                                  <span className="text-xs text-gray-500">Set your own daily interview limit</span>
                                </div>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                      
                      {/* Custom interview limit input */}
                      {interviewLimit === 'custom' && (
                        <div className="mt-2">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={customInterviewLimit}
                            onChange={(e) => setCustomInterviewLimit(e.target.value)}
                            placeholder="Enter number"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <div className="text-xs text-gray-500 mt-1">Maximum interviews per day</div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">Buffer time</label>
                      <Select.Root value={bufferTime} onValueChange={setBufferTime}>
                        <Select.Trigger className="inline-flex items-center justify-between w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                          <Select.Value>
                            {bufferTime === 'none' ? 'No buffer' :
                             bufferTime === '5-mins' ? '5 mins (-10% capacity)' :
                             bufferTime === '10-mins' ? '10 mins (-15% capacity)' :
                             bufferTime === '15-mins' ? '15 mins (-20% capacity)' :
                             bufferTime === 'custom' ? `${customBufferTime} mins (custom)` : 'No buffer'}
                          </Select.Value>
                          <Select.Icon asChild>
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                            <Select.Viewport className="p-1">
                              <Select.Item value="none" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>No buffer</Select.ItemText>
                                  <span className="text-xs text-gray-500">Back-to-back interviews</span>
                                </div>
                              </Select.Item>
                              <Select.Item value="5-mins" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>5 mins</Select.ItemText>
                                  <span className="text-xs text-gray-500">Short break, ~10% capacity reduction</span>
                                </div>
                              </Select.Item>
                              <Select.Item value="10-mins" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>10 mins</Select.ItemText>
                                  <span className="text-xs text-gray-500">Standard buffer, ~15% capacity reduction</span>
                                </div>
                              </Select.Item>
                              <Select.Item value="15-mins" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>15 mins</Select.ItemText>
                                  <span className="text-xs text-gray-500">Long break, ~20% capacity reduction</span>
                                </div>
                              </Select.Item>
                              <Select.Item value="custom" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>Custom buffer</Select.ItemText>
                                  <span className="text-xs text-gray-500">Set your own buffer time</span>
                                </div>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                      
                      {/* Custom buffer time input */}
                      {bufferTime === 'custom' && (
                        <div className="mt-2">
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={customBufferTime}
                            onChange={(e) => setCustomBufferTime(e.target.value)}
                            placeholder="Enter minutes"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <div className="text-xs text-gray-500 mt-1">Buffer time between interviews (minutes)</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Schedule Mode Selection - Only for Collective events */}
                {eventType === 'collective' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">Schedule</span>
                      <Select.Root value={scheduleMode} onValueChange={setScheduleMode}>
                        <Select.Trigger className="inline-flex items-center gap-2 px-0 py-1 text-sm text-[#b60074] hover:bg-gray-50 rounded transition-colors">
                          <Select.Value>
                            {scheduleMode === 'by-host' ? 'Set by host (default)' : 'Same for all hosts'}
                          </Select.Value>
                          <Select.Icon>
                            <ChevronDownIcon className="w-4 h-4" />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                            <Select.Viewport className="p-1">
                              <Select.Item value="by-host" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>Set by host (default)</Select.ItemText>
                                  <span className="text-xs text-gray-500 mt-1">Each host sets their own availability. Interviews scheduled when ANY host is available.</span>
                                </div>
                              </Select.Item>
                              <Select.Item value="collective" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                <div className="flex flex-col items-start">
                                  <Select.ItemText>Same for all hosts</Select.ItemText>
                                  <span className="text-xs text-gray-500 mt-1">All hosts share the same schedule. Interviews scheduled when ALL hosts are available.</span>
                                </div>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                    
                    <button className="px-3 py-1.5 text-sm font-medium text-[#b60074] border border-[#af006f2d] rounded hover:bg-[#e0008008] transition-colors">
                      View Calendar
                    </button>
                  </div>
                )}

                {/* View Calendar button for non-collective events */}
                {eventType !== 'collective' && (
                  <div className="flex justify-end">
                    <button className="px-3 py-1.5 text-sm font-medium text-[#b60074] border border-[#af006f2d] rounded hover:bg-[#e0008008] transition-colors">
                      View Calendar
                    </button>
                  </div>
                )}

                {/* Host-specific availability cards - for non-collective or collective with by-host mode */}
                {(eventType !== 'collective' || scheduleMode === 'by-host') && (
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {eventType === 'round-robin' 
                        ? 'Individual host availability (one host per interview):' 
                        : eventType === 'one-on-one'
                        ? 'Host availability:'
                        : 'Combined availability from all hosts:'
                      }
                    </div>
                    
                    {/* Dynamic capacity calculation */}
                    {eventType === 'round-robin' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
                        <div className="text-xs text-blue-800">
                          <div className="font-medium mb-2">📊 Calculated Interview Capacity</div>
                          
                          {/* Base capacity by host priority */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                            {hosts.filter(h => h.priority === 'highest').length > 0 && (
                              <div className="flex items-center gap-1">
                                <StarFilledIcon className="w-3 h-3 text-yellow-500" />
                                <span>Highest: ~{hosts.filter(h => h.priority === 'highest').length * (() => {
                                  const base = timeSlots === '15-mins' ? 14 : timeSlots === '30-mins' ? 10 : timeSlots === '45-mins' ? 8 : 6;
                                  const limitMultiplier = interviewLimit === '1-per-day' ? 0.8 : 
                                                      interviewLimit === '2-per-day' ? 0.9 : 
                                                      interviewLimit === '3-per-day' ? 0.95 :
                                                      interviewLimit === 'custom' && customInterviewLimit ? Math.max(0.5, 1 - (parseInt(customInterviewLimit) - 1) * 0.1) : 1;
                                  const bufferMultiplier = bufferTime === '5-mins' ? 0.9 : 
                                                          bufferTime === '10-mins' ? 0.85 : 
                                                          bufferTime === '15-mins' ? 0.8 :
                                                          bufferTime === 'custom' && customBufferTime ? Math.max(0.7, 1 - parseInt(customBufferTime) * 0.01) : 1;
                                  const withLimits = base * limitMultiplier;
                                  const withBuffer = withLimits * bufferMultiplier;
                                  return Math.round(withBuffer);
                                })()} slots/week</span>
                              </div>
                            )}
                            {hosts.filter(h => h.priority === 'high').length > 0 && (
                              <div className="flex items-center gap-1">
                                <StarFilledIcon className="w-3 h-3 text-blue-500" />
                                <span>High: ~{hosts.filter(h => h.priority === 'high').length * (() => {
                                  const base = timeSlots === '15-mins' ? 10 : timeSlots === '30-mins' ? 6 : timeSlots === '45-mins' ? 5 : 3;
                                  const limitMultiplier = interviewLimit === '1-per-day' ? 0.8 : 
                                                      interviewLimit === '2-per-day' ? 0.9 : 
                                                      interviewLimit === '3-per-day' ? 0.95 :
                                                      interviewLimit === 'custom' && customInterviewLimit ? Math.max(0.5, 1 - (parseInt(customInterviewLimit) - 1) * 0.1) : 1;
                                  const bufferMultiplier = bufferTime === '5-mins' ? 0.9 : 
                                                          bufferTime === '10-mins' ? 0.85 : 
                                                          bufferTime === '15-mins' ? 0.8 :
                                                          bufferTime === 'custom' && customBufferTime ? Math.max(0.7, 1 - parseInt(customBufferTime) * 0.01) : 1;
                                  const withLimits = base * limitMultiplier;
                                  const withBuffer = withLimits * bufferMultiplier;
                                  return Math.round(withBuffer);
                                })()} slots/week</span>
                              </div>
                            )}
                            {hosts.filter(h => h.priority === 'low').length > 0 && (
                              <div className="flex items-center gap-1">
                                <StarIcon className="w-3 h-3 text-gray-500" />
                                <span>Low: ~{hosts.filter(h => h.priority === 'low').length * (() => {
                                  const base = timeSlots === '15-mins' ? 6 : timeSlots === '30-mins' ? 3 : timeSlots === '45-mins' ? 2 : 2;
                                  const limitMultiplier = interviewLimit === '1-per-day' ? 0.8 : 
                                                      interviewLimit === '2-per-day' ? 0.9 : 
                                                      interviewLimit === '3-per-day' ? 0.95 :
                                                      interviewLimit === 'custom' && customInterviewLimit ? Math.max(0.5, 1 - (parseInt(customInterviewLimit) - 1) * 0.1) : 1;
                                  const bufferMultiplier = bufferTime === '5-mins' ? 0.9 : 
                                                          bufferTime === '10-mins' ? 0.85 : 
                                                          bufferTime === '15-mins' ? 0.8 :
                                                          bufferTime === 'custom' && customBufferTime ? Math.max(0.7, 1 - parseInt(customBufferTime) * 0.01) : 1;
                                  const withLimits = base * limitMultiplier;
                                  const withBuffer = withLimits * bufferMultiplier;
                                  return Math.round(withBuffer);
                                })()} slots/week</span>
                              </div>
                            )}
                            {hosts.filter(h => h.priority === 'lowest').length > 0 && (
                              <div className="flex items-center gap-1">
                                <StarIcon className="w-3 h-3 text-gray-400" />
                                <span>Lowest: ~{hosts.filter(h => h.priority === 'lowest').length * (() => {
                                  const base = timeSlots === '15-mins' ? 4 : timeSlots === '30-mins' ? 2 : timeSlots === '45-mins' ? 1 : 1;
                                  const limitMultiplier = interviewLimit === '1-per-day' ? 0.8 : 
                                                      interviewLimit === '2-per-day' ? 0.9 : 
                                                      interviewLimit === '3-per-day' ? 0.95 :
                                                      interviewLimit === 'custom' && customInterviewLimit ? Math.max(0.5, 1 - (parseInt(customInterviewLimit) - 1) * 0.1) : 1;
                                  const bufferMultiplier = bufferTime === '5-mins' ? 0.9 : 
                                                          bufferTime === '10-mins' ? 0.85 : 
                                                          bufferTime === '15-mins' ? 0.8 :
                                                          bufferTime === 'custom' && customBufferTime ? Math.max(0.7, 1 - parseInt(customBufferTime) * 0.01) : 1;
                                  const withLimits = base * limitMultiplier;
                                  const withBuffer = withLimits * bufferMultiplier;
                                  return Math.round(withBuffer);
                                })()} slots/week</span>
                              </div>
                            )}
                          </div>

                          {/* Settings impact */}
                          <div className="mb-2 space-y-1">
                            <div className="flex items-center gap-1 text-xs">
                              <span className="font-medium">Duration impact:</span>
                              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                                timeSlots === '15-mins' ? 'bg-green-100 text-green-700' :
                                timeSlots === '30-mins' ? 'bg-blue-100 text-blue-700' :
                                timeSlots === '45-mins' ? 'bg-orange-100 text-orange-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {timeSlots === '15-mins' ? '+50% more slots' :
                                 timeSlots === '30-mins' ? 'Standard capacity' :
                                 timeSlots === '45-mins' ? '-25% slots' : '-50% slots'}
                              </span>
                            </div>
                            {(interviewLimit !== 'none' || bufferTime !== 'none') && (
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-medium">Active modifiers:</span>
                                {interviewLimit !== 'none' && (
                                  <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">
                                    {interviewLimit === '1-per-day' ? '-20% limit' : 
                                     interviewLimit === '2-per-day' ? '-10% limit' :
                                     interviewLimit === '3-per-day' ? '-5% limit' :
                                     interviewLimit === 'custom' && customInterviewLimit ? `${customInterviewLimit}/day limit` : 'limit'}
                                  </span>
                                )}
                                {bufferTime !== 'none' && (
                                  <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">
                                    {bufferTime === '5-mins' ? '-10% buffer' :
                                     bufferTime === '10-mins' ? '-15% buffer' :
                                     bufferTime === '15-mins' ? '-20% buffer' :
                                     bufferTime === 'custom' && customBufferTime ? `${customBufferTime}min buffer` : 'buffer'}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="mt-2 pt-2 border-t border-blue-200 text-sm font-medium text-blue-700">
                            🎯 Total weekly capacity: ~{hosts.reduce((total, host) => {
                              const base = host.priority === 'high' ? (timeSlots === '15-mins' ? 12 : timeSlots === '30-mins' ? 8 : timeSlots === '45-mins' ? 6 : 4) :
                                          host.priority === 'medium' ? (timeSlots === '15-mins' ? 10 : timeSlots === '30-mins' ? 6 : timeSlots === '45-mins' ? 5 : 3) :
                                          (timeSlots === '15-mins' ? 6 : timeSlots === '30-mins' ? 3 : timeSlots === '45-mins' ? 2 : 2);
                              const limitMultiplier = interviewLimit === '1-per-day' ? 0.8 : interviewLimit === '2-per-day' ? 0.9 : interviewLimit === '3-per-day' ? 0.95 : 1;
                              const bufferMultiplier = bufferTime === '5-mins' ? 0.9 : bufferTime === '10-mins' ? 0.85 : bufferTime === '15-mins' ? 0.8 : 1;
                              const withLimits = base * limitMultiplier;
                              const withBuffer = withLimits * bufferMultiplier;
                              return total + Math.round(withBuffer);
                            }, 0)} interview slots
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {hosts.map((host) => (
                      <div key={host.id} className={`border-2 rounded-md p-3 ${host.id === 1 ? 'border-[#d6409f]' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {host.avatar ? (
                              <img 
                                src={host.avatar} 
                                alt={host.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-[rgba(244,0,140,0.09)] text-[rgba(182,0,116,0.84)]">
                                {host.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-medium text-gray-900">{host.name}</div>
                                {eventType === 'round-robin' && (
                                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium rounded-full ${
                                    host.priority === 'highest' ? 'bg-yellow-100 text-yellow-700' :
                                    host.priority === 'high' ? 'bg-blue-100 text-blue-700' :
                                    host.priority === 'low' ? 'bg-gray-100 text-gray-600' :
                                    'bg-gray-50 text-gray-500'
                                  }`}>
                                    {host.priority === 'highest' ? <StarFilledIcon className="w-3 h-3" /> :
                                     host.priority === 'high' ? <StarFilledIcon className="w-3 h-3" /> :
                                     host.priority === 'low' ? <StarIcon className="w-3 h-3" /> :
                                     <StarIcon className="w-3 h-3" />}
                                    {host.priority === 'highest' ? 'Highest' : host.priority === 'high' ? 'High' : host.priority === 'low' ? 'Low' : 'Lowest'}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {host.id === 1 ? 'Weekdays, 9am - 5 pm EST' : 'Weekdays, 9am - 5 pm, hours vary'}
                                {eventType === 'round-robin' && (
                                  <span className="ml-2">
                                    (~{host.priority === 'highest' ? '10' : host.priority === 'high' ? '6' : host.priority === 'low' ? '3' : '2'} slots/week)
                                  </span>
                                )}
                              </div>
                              
                              {/* Primary role selector for round robin */}
                              {eventType === 'round-robin' && (
                                <div className="mt-2">
                                  <Select.Root value={host.priority} onValueChange={(value) => updateHostPriority(host.id, value)}>
                                    <Select.Trigger className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded-sm transition-colors">
                                      <span>Preferences:</span>
                                      <Select.Value />
                                      <ChevronDownIcon className="w-3 h-3" />
                                    </Select.Trigger>
                                    <Select.Portal>
                                      <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                                        <Select.Viewport className="p-1">
                                          <Select.Item value="highest" className="px-3 py-2 text-xs rounded cursor-pointer hover:bg-gray-100 outline-none relative">
                                            <div className="flex items-center gap-2">
                                              <StarFilledIcon className="w-3 h-3 text-yellow-500" />
                                              <div className="flex flex-col items-start">
                                                <Select.ItemText>Highest</Select.ItemText>
                                                <span className="text-xs text-gray-500">Priority interviewer (~10 slots/week)</span>
                                              </div>
                                              <Select.ItemIndicator className="absolute right-2">
                                                <CheckIcon className="w-3 h-3" />
                                              </Select.ItemIndicator>
                                            </div>
                                          </Select.Item>
                                          <Select.Item value="high" className="px-3 py-2 text-xs rounded cursor-pointer hover:bg-gray-100 outline-none relative">
                                            <div className="flex items-center gap-2">
                                              <StarFilledIcon className="w-3 h-3 text-blue-500" />
                                              <div className="flex flex-col items-start">
                                                <Select.ItemText>High</Select.ItemText>
                                                <span className="text-xs text-gray-500">Regular rotation (~6 slots/week)</span>
                                              </div>
                                              <Select.ItemIndicator className="absolute right-2">
                                                <CheckIcon className="w-3 h-3" />
                                              </Select.ItemIndicator>
                                            </div>
                                          </Select.Item>
                                          <Select.Item value="low" className="px-3 py-2 text-xs rounded cursor-pointer hover:bg-gray-100 outline-none relative">
                                            <div className="flex items-center gap-2">
                                              <StarIcon className="w-3 h-3 text-gray-500" />
                                              <div className="flex flex-col items-start">
                                                <Select.ItemText>Low</Select.ItemText>
                                                <span className="text-xs text-gray-500">Limited availability (~3 slots/week)</span>
                                              </div>
                                              <Select.ItemIndicator className="absolute right-2">
                                                <CheckIcon className="w-3 h-3" />
                                              </Select.ItemIndicator>
                                            </div>
                                          </Select.Item>
                                          <Select.Item value="lowest" className="px-3 py-2 text-xs rounded cursor-pointer hover:bg-gray-100 outline-none relative">
                                            <div className="flex items-center gap-2">
                                              <StarIcon className="w-3 h-3 text-gray-400" />
                                              <div className="flex flex-col items-start">
                                                <Select.ItemText>Lowest</Select.ItemText>
                                                <span className="text-xs text-gray-500">Backup only (~2 slots/week)</span>
                                              </div>
                                              <Select.ItemIndicator className="absolute right-2">
                                                <CheckIcon className="w-3 h-3" />
                                              </Select.ItemIndicator>
                                            </div>
                                          </Select.Item>
                                        </Select.Viewport>
                                      </Select.Content>
                                    </Select.Portal>
                                  </Select.Root>
                                </div>
                              )}
                            </div>
                          </div>
                          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#b60074] hover:bg-gray-50 rounded transition-colors">
                            <Pencil1Icon className="w-4 h-4" />
                            Availability
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Collective schedule - only for collective events in collective mode */}
                {eventType === 'collective' && scheduleMode === 'collective' && (
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Common schedule for all hosts:
                    </div>
                    <div className="border-2 border-[#d6409f] rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Collective Schedule</div>
                          <div className="text-sm text-gray-500">Weekdays, 9am - 5 pm EST</div>
                        </div>
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#b60074] hover:bg-gray-50 rounded transition-colors">
                          <Pencil1Icon className="w-4 h-4" />
                          Edit Schedule
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded">
                      <strong>Collective mode:</strong> All hosts will follow this same schedule. Interviews will only be scheduled when ALL selected hosts are available at the same time.
                    </div>
                  </div>
                )}
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="advanced" className="bg-white/80 border border-gray-100 rounded-lg">
            <Accordion.Header>
              <Accordion.Trigger className="w-full px-3 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900">Advanced settings</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Descriptions, confirmation messages, etc</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-3 pb-3">
              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">Configure additional settings like confirmation emails, reminder messages, and cancellation policies.</p>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  );
};

export default SchedulingWizard;