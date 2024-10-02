import React, { useState } from 'react';
import { User, Phone, Mail, Edit2, ChevronDown, ChevronUp } from 'lucide-react';

interface Contact {
  name: string;
  relation: string;
  email: string;
  mobile: string;
  notifications: {
    msgNotification: boolean;
    emailNotification: boolean;
    includeIncidentType: boolean;
    includeRecreation: boolean;
    includeCameraReplays: boolean;
  };
}

const initialContacts: Contact[] = [
  { 
    name: "John Smith", 
    relation: "Son", 
    email: "john.smith@example.com",
    mobile: "+1 (555) 123-4567",
    notifications: {
      msgNotification: true,
      emailNotification: true,
      includeIncidentType: true,
      includeRecreation: false,
      includeCameraReplays: false,
    }
  },
  { 
    name: "Jane Smith", 
    relation: "Granddaughter", 
    email: "jane.smith@example.com",
    mobile: "+1 (555) 987-6543",
    notifications: {
      msgNotification: true,
      emailNotification: false,
      includeIncidentType: true,
      includeRecreation: true,
      includeCameraReplays: true,
    }
  },
  { 
    name: "Silver Chain", 
    relation: "Medical Response", 
    email: "response@silverchain.org",
    mobile: "+1 (555) 111-2222",
    notifications: {
      msgNotification: true,
      emailNotification: true,
      includeIncidentType: true,
      includeRecreation: true,
      includeCameraReplays: true,
    }
  },
  { 
    name: "Emergency Response", 
    relation: "", 
    email: "dispatch@emergency.gov",
    mobile: "+1 (555) 911-9111",
    notifications: {
      msgNotification: true,
      emailNotification: false,
      includeIncidentType: true,
      includeRecreation: false,
      includeCameraReplays: false,
    }
  }
];

const AlertContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  const toggleExpand = (name: string) => {
    setExpandedContact(expandedContact === name ? null : name);
  };

  const handleNotificationChange = (name: string, notificationType: keyof Contact['notifications']) => {
    setContacts(contacts.map(contact => 
      contact.name === name 
        ? { ...contact, notifications: { ...contact.notifications, [notificationType]: !contact.notifications[notificationType] } }
        : contact
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Phone size={24} className="text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Alert Contact List</h2>
        </div>
        <button className="text-blue-500 hover:text-blue-600">
          <Edit2 size={20} />
        </button>
      </div>
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact.name} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <User size={20} className="text-gray-500 mr-2" />
                <span className="font-medium">{contact.name}</span>
                {contact.relation && (
                  <span className="text-sm text-gray-600 ml-2">({contact.relation})</span>
                )}
              </div>
              <div className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-600 mr-4">{contact.email}</span>
                <Phone size={16} className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">{contact.mobile}</span>
              </div>
            </div>
            <button 
              onClick={() => toggleExpand(contact.name)}
              className="flex items-center text-blue-500 hover:text-blue-600 mt-2"
            >
              {expandedContact === contact.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              <span className="ml-1">{expandedContact === contact.name ? 'Hide' : 'Show'} Notifications</span>
            </button>
            {expandedContact === contact.name && (
              <div className="mt-2 pl-4 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={contact.notifications.msgNotification}
                    onChange={() => handleNotificationChange(contact.name, 'msgNotification')}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Message notification</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={contact.notifications.emailNotification}
                    onChange={() => handleNotificationChange(contact.name, 'emailNotification')}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Email notification</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={contact.notifications.includeIncidentType}
                    onChange={() => handleNotificationChange(contact.name, 'includeIncidentType')}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Include incident type</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={contact.notifications.includeRecreation}
                    onChange={() => handleNotificationChange(contact.name, 'includeRecreation')}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Include recreation</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={contact.notifications.includeCameraReplays}
                    onChange={() => handleNotificationChange(contact.name, 'includeCameraReplays')}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Include camera replays</span>
                </label>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertContactList;