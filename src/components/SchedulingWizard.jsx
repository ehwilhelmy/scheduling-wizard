import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Select from '@radix-ui/react-select';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import AddTeammateDropdown from './AddTeammateDropdown';
import CalendarView from './CalendarView';
import AIStudySetupAssistant from './AIStudySetupAssistant';
import HybridAvailabilityPreview from './HybridAvailabilityPreview';
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
  StarFilledIcon,
  ChevronRightIcon,
  ReloadIcon,
  CalendarIcon
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
    { id: 1, name: 'Dave Chen', role: 'Host', priority: 'high' },
    { id: 2, name: 'Oren Friedman', role: 'Host', priority: 'high' }
  ]);
  const [guests, setGuests] = useState([]);
  const [observers, setObservers] = useState([]);
  const [expandedHosts, setExpandedHosts] = useState(new Set());

  const handleAddHost = (user) => {
    setHosts([...hosts, { ...user, priority: 'high' }]);
  };

  const toggleHostExpansion = (hostId) => {
    const newExpanded = new Set(expandedHosts);
    if (newExpanded.has(hostId)) {
      newExpanded.delete(hostId);
    } else {
      newExpanded.add(hostId);
    }
    setExpandedHosts(newExpanded);
  };

  const handleStudyConfigured = (config) => {
    // Update the hosts based on AI configuration
    setHosts(config.hosts.map((host, index) => ({
      id: index + 1,
      name: host.name,
      role: 'Host',
      priority: host.role === 'Primary' ? 'high' : 'medium'
    })));
    
    // Update other settings
    setTimeSlots(`${config.sessionLength}-mins`);
    setBufferTime(`${config.bufferTime}-mins-after`);
    
    console.log('Study configured:', config);
  };

  const handleEventTypeChange = (newEventType) => {
    setEventType(newEventType);
    
    // Adjust hosts based on event type
    if (newEventType === '1:1' || newEventType === 'one-on-one') {
      // For 1:1, keep only one host (the primary/first one)
      if (hosts.length > 1) {
        setHosts([hosts[0]]); // Keep only the first host
      } else if (hosts.length === 0) {
        // If no hosts, add a default one
        setHosts([{ id: 1, name: 'Dave Chen', role: 'Host', priority: 'high' }]);
      }
    } else if (newEventType === 'round-robin') {
      // For round robin, ensure we have at least 2 hosts
      if (hosts.length < 2) {
        const existingHost = hosts[0] || { id: 1, name: 'Dave Chen', role: 'Host', priority: 'high' };
        setHosts([
          existingHost,
          { id: 2, name: 'Oren Friedman', role: 'Host', priority: 'high' }
        ]);
      }
    } else if (newEventType === 'collective') {
      // For collective, can have multiple hosts but different logic
      if (hosts.length < 2) {
        const existingHost = hosts[0] || { id: 1, name: 'Dave Chen', role: 'Host', priority: 'high' };
        setHosts([
          existingHost,
          { id: 2, name: 'Oren Friedman', role: 'Host', priority: 'high' }
        ]);
      }
    }
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
  const [distributionOption, setDistributionOption] = useState('maximize');
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
  
  // Calendar view state
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

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
            
            {/* AI Assistant Button */}
            <div className="mt-4 mb-4">
              <button 
                onClick={() => setShowAIAssistant(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  <path d="M18.259 8.715L18 9.75l-.259-1.035a1.5 1.5 0 00-1.006-1.006L15.75 7.5l1.035-.259a1.5 1.5 0 001.006-1.006L18 5.25l.259 1.035a1.5 1.5 0 001.006 1.006L20.25 7.5l-1.035.259a1.5 1.5 0 00-1.006 1.006z" />
                  <path d="M16.894 17.801L16.5 19l-.394-1.199a1.5 1.5 0 00-1.107-1.107L13.75 16.5l1.249-.394a1.5 1.5 0 001.107-1.107L16.5 14l.394 1.199a1.5 1.5 0 001.107 1.107l1.249.394l-1.249.394a1.5 1.5 0 00-1.107 1.107z" />
                </svg>
                AI Setup Research Study
              </button>
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

              <Select.Root value={eventType} onValueChange={handleEventTypeChange}>
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
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-[rgba(244,0,140,0.09)] text-[rgba(182,0,116,0.84)]">
                                {host.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{host.name}</span>
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
              <div className="space-y-6">
                {/* Date-range - Calendly style simple */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Date-range</h4>
                  <div className="text-gray-700 mb-4">
                    Invitees can schedule 
                    <Select.Root value={scheduleWindow} onValueChange={setScheduleWindow}>
                      <Select.Trigger className="inline-flex items-center gap-1 mx-1 text-blue-600 hover:text-blue-700 font-medium">
                        <Select.Value>
                          {scheduleWindow === '60-days' ? '60 days' :
                           scheduleWindow === '30-days' ? '30 days' :
                           scheduleWindow === '90-days' ? '90 days' : '60 days'}
                        </Select.Value>
                        <ChevronDownIcon className="w-4 h-4" />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                          <Select.Viewport className="p-1">
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
                    into the future with at least 
                    <Select.Root value="4-hours">
                      <Select.Trigger className="inline-flex items-center gap-1 mx-1 text-blue-600 hover:text-blue-700 font-medium">
                        <Select.Value>4 hours</Select.Value>
                        <ChevronDownIcon className="w-4 h-4" />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                          <Select.Viewport className="p-1">
                            <Select.Item value="1-hour" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                              <Select.ItemText>1 hour</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="4-hours" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                              <Select.ItemText>4 hours</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="24-hours" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                              <Select.ItemText>24 hours</Select.ItemText>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                    notice
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Schedule</h4>
                  <div className="mb-4">
                    <Select.Root value="set-by-host">
                      <Select.Trigger className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                        <Select.Value>Set by host</Select.Value>
                        <ChevronUpIcon className="w-4 h-4" />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50 w-64">
                          <Select.Viewport className="p-1">
                            <Select.Item value="set-by-host" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                              <div className="flex items-center gap-2">
                                <Select.ItemText>Set by host</Select.ItemText>
                                <CheckIcon className="w-4 h-4 text-blue-600" />
                              </div>
                            </Select.Item>
                            <Select.Item value="same-for-all" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                              <Select.ItemText>Same for all hosts</Select.ItemText>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>

                  {/* Host Schedules - Calendly style simple */}
                  <div className="space-y-4">
                    {hosts.map((host) => {
                      const isExpanded = expandedHosts.has(host.id);
                      return (
                        <div key={host.id} className="border border-gray-200 rounded-lg">
                          <button 
                            onClick={() => toggleHostExpansion(host.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-[rgba(244,0,140,0.09)] text-[rgba(182,0,116,0.84)]">
                                {host.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="font-medium text-gray-900">{host.name}</div>
                            </div>
                            <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        
                        {/* Schedule details - collapsed by default like Calendly */}
                        {isExpanded && (
                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <span>Schedule:</span>
                            <Select.Root value="working-hours">
                              <Select.Trigger className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                                <Select.Value>Working hours (default)</Select.Value>
                                <ChevronDownIcon className="w-4 h-4" />
                              </Select.Trigger>
                              <Select.Portal>
                                <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                                  <Select.Viewport className="p-1">
                                    <Select.Item value="working-hours" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                      <Select.ItemText>Working hours (default)</Select.ItemText>
                                    </Select.Item>
                                    <Select.Item value="custom-hours" className="px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 outline-none">
                                      <Select.ItemText>Custom hours</Select.ItemText>
                                    </Select.Item>
                                  </Select.Viewport>
                                </Select.Content>
                              </Select.Portal>
                            </Select.Root>
                          </div>
                          
                          {/* Mini calendar preview like Calendly */}
                          <div className="bg-white rounded-lg p-4 border">
                            <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                              <ClockIcon className="w-4 h-4" />
                              This event type uses the weekly and custom hours saved on the schedule
                            </div>
                            
                            <div className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                              <ReloadIcon className="w-4 h-4" />
                              Weekly hours
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">S</div>
                                  <span className="text-gray-500">Unavailable</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">M</div>
                                  <span>9:00am - 5:00pm</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">T</div>
                                  <span>9:00am - 5:00pm</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">W</div>
                                  <span>9:00am - 5:00pm</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">T</div>
                                  <span>9:00am - 5:00pm</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">F</div>
                                  <span>9:00am - 5:00pm</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">S</div>
                                  <span className="text-gray-500">Unavailable</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-500 mt-3">Eastern Time - US & Canada</div>
                            
                            <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              Date-specific hours
                            </button>
                          </div>
                          
                            <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#b60074] border border-[#af006f2d] rounded hover:bg-gray-50 transition-colors">
                              Edit availability
                            </button>
                          </div>
                        )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Advanced Options - collapsed by default */}
                  <details className="group">
                    <summary className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                      <ChevronRightIcon className="w-4 h-4 transition-transform group-open:rotate-90" />
                      Advanced options (time slots, limits, buffer time)
                    </summary>
                    <div className="mt-4 pl-6 space-y-4 border-l-2 border-gray-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Time slot duration</label>
                          <Select.Root value={timeSlots} onValueChange={setTimeSlots}>
                            <Select.Trigger className="inline-flex items-center justify-between w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm">
                              <Select.Value>
                                {timeSlots === '30-mins' ? '30 minutes' :
                                 timeSlots === '45-mins' ? '45 minutes' :
                                 timeSlots === '60-mins' ? '60 minutes' : '30 minutes'}
                              </Select.Value>
                              <ChevronDownIcon className="w-4 h-4" />
                            </Select.Trigger>
                            <Select.Portal>
                              <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
                                <Select.Viewport className="p-1">
                                  <Select.Item value="30-mins" className="select-none rounded px-6 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                                    <Select.ItemText>30 minutes</Select.ItemText>
                                  </Select.Item>
                                  <Select.Item value="45-mins" className="select-none rounded px-6 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                                    <Select.ItemText>45 minutes</Select.ItemText>
                                  </Select.Item>
                                  <Select.Item value="60-mins" className="select-none rounded px-6 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                                    <Select.ItemText>60 minutes</Select.ItemText>
                                  </Select.Item>
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Buffer time</label>
                          <Select.Root value="15-mins">
                            <Select.Trigger className="inline-flex items-center justify-between w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm">
                              <Select.Value>15 minutes</Select.Value>
                              <ChevronDownIcon className="w-4 h-4" />
                            </Select.Trigger>
                            <Select.Portal>
                              <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
                                <Select.Viewport className="p-1">
                                  <Select.Item value="0-mins" className="select-none rounded px-6 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                                    <Select.ItemText>No buffer</Select.ItemText>
                                  </Select.Item>
                                  <Select.Item value="15-mins" className="select-none rounded px-6 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                                    <Select.ItemText>15 minutes</Select.ItemText>
                                  </Select.Item>
                                  <Select.Item value="30-mins" className="select-none rounded px-6 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                                    <Select.ItemText>30 minutes</Select.ItemText>
                                  </Select.Item>
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                        </div>
                      </div>
                    </div>
                  </details>

                  {/* Interactive Availability Preview */}
                  <div className="mt-6">
                    <HybridAvailabilityPreview />
                  </div>
                </div>
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
      
      {/* Calendar View Modal */}
      {showCalendarView && (
        <CalendarView onClose={() => setShowCalendarView(false)} />
      )}
      
      {/* AI Study Setup Assistant Modal */}
      <AIStudySetupAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        onStudyConfigured={handleStudyConfigured}
      />
    </div>
  );
};

export default SchedulingWizard;
