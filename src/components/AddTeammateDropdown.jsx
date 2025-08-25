import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { createPortal } from 'react-dom';

const AddTeammateDropdown = ({ onAddUser, existingUsers = [], buttonLabel = "Add teammate", role = "Host" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Sample user data - in a real app this would come from an API
  const allUsers = [
    { 
      id: 3, 
      name: 'Alec Robins', 
      avatar: null, // Setting to null since image is broken
      initials: 'AR',
      bgColor: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 4, 
      name: 'Alex Watling', 
      avatar: null, // Setting to null since image is broken
      initials: 'AW',
      bgColor: 'bg-green-100 text-green-700'
    },
    { 
      id: 5, 
      name: 'Dave Chen', 
      avatar: 'http://localhost:3845/assets/55016c4ae97488578ec1ee198cd925bbc4070718.png',
      initials: 'DC'
    },
    { 
      id: 6, 
      name: 'Erica', 
      avatar: null, // Setting to null since image is broken
      initials: 'E',
      bgColor: 'bg-purple-100 text-purple-700'
    },
    { 
      id: 7, 
      name: 'Jerry Gray', 
      avatar: null,
      initials: 'JG',
      bgColor: 'bg-orange-100 text-orange-700'
    },
    { 
      id: 8, 
      name: 'Juliette Kopecky', 
      avatar: null,
      initials: 'JK',
      bgColor: 'bg-indigo-100 text-indigo-700'
    },
    { 
      id: 9, 
      name: 'Julia Loelaeme', 
      avatar: null,
      initials: 'JL',
      bgColor: 'bg-pink-100 text-pink-700'
    }
  ];

  // Filter users based on search term and exclude existing users
  const existingUserIds = existingUsers.map(user => user.id);
  const filteredUsers = allUsers
    .filter(user => !existingUserIds.includes(user.id))
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.initials.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleUserSelect = (user) => {
    onAddUser({ ...user, role: role });
    setIsOpen(false);
    setSearchTerm('');
  };


  const handleOpenDropdown = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative inline-block">
      <button 
        onClick={handleOpenDropdown}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors border ${
          isOpen 
            ? 'bg-[rgba(244,0,140,0.09)] border-[rgba(175,0,111,0.18)] text-[rgba(182,0,116,0.84)]' 
            : 'text-[#b60074] hover:bg-gray-50 border-transparent'
        }`}
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {buttonLabel}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-md border border-gray-200 shadow-lg z-50" style={{ maxHeight: '400px' }}>

            {/* Search Input */}
            <div className="p-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                  autoFocus
                />
              </div>
            </div>

            {/* User List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="px-3 py-4 text-center text-sm text-gray-500">
                  {searchTerm ? `No users found matching "${searchTerm}"` : 'No available users'}
                </div>
              ) : (
                <div>
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                      className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${user.bgColor || 'bg-[rgba(244,0,140,0.09)] text-[rgba(182,0,116,0.84)]'}`}>
                          {user.initials}
                        </div>
                      )}
                      <span className="text-sm text-gray-900">{user.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddTeammateDropdown;