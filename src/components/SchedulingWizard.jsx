import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Select from '@radix-ui/react-select';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { 
  ChevronDownIcon, 
  CheckIcon, 
  ExternalLinkIcon,
  Pencil1Icon,
  ClockIcon,
  GearIcon,
  ChevronUpIcon,
  Cross2Icon,
  PlusIcon
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
    { id: 1, name: 'Dave Chen', avatar: 'http://localhost:3845/assets/55016c4ae97488578ec1ee198cd925bbc4070718.png', role: 'Host' },
    { id: 2, name: 'Oren Friedman', avatar: 'http://localhost:3845/assets/01161bc86eeaaba5b80bb5e6a60198c4bf1be970.png', role: 'Host' }
  ]);
  const [distributionOption, setDistributionOption] = useState('equal');
  const [preferencesExpanded, setPreferencesExpanded] = useState(true);

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
          <Accordion.Item value="who" className="bg-white/80 border border-gray-100 rounded-lg overflow-hidden">
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
                    <p className="text-xs text-gray-500">Round robin picks one host to do the interview</p>
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
                    
                    <button className="inline-flex items-center gap-1 text-xs text-[#b60074] hover:text-[#d6409f] transition-colors">
                      <PlusIcon className="w-4 h-4" />
                      Add rotating-host
                    </button>

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
                              <Select.Trigger className="w-full bg-white/90 border border-[rgba(0,6,46,0.04)] rounded h-8 px-3 py-0 text-sm text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                <Select.Value>
                                  {distributionOption === 'equal' ? 'Optimize for equal distribution' : 
                                   distributionOption === 'random' ? 'Random distribution' : 
                                   'Based on preferences'}
                                </Select.Value>
                                <Select.Icon>
                                  <ChevronDownIcon className="w-4 h-4" />
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
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Guest(s)</h4>
                    <p className="text-xs text-gray-500">Guest will be invited to every interview</p>
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs text-[#b60074] hover:text-[#d6409f] transition-colors">
                    <PlusIcon className="w-4 h-4" />
                    Add guests
                  </button>
                </div>

                {/* Observers Section */}
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Observer(s)</h4>
                    <p className="text-xs text-gray-500">Observers will be sent a separate invite to watch the interview live</p>
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs text-[#b60074] hover:text-[#d6409f] transition-colors">
                    <PlusIcon className="w-4 h-4" />
                    Add guests
                  </button>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="when" className="bg-white/80 border border-gray-100 rounded-lg overflow-hidden">
            <Accordion.Header>
              <Accordion.Trigger className="w-full px-3 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900">When are you available?</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Specify hosts availability, interview limits, buffers</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-3 pb-3">
              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">Set your availability, maximum interviews per day, and buffer times between sessions.</p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="advanced" className="bg-white/80 border border-gray-100 rounded-lg overflow-hidden">
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