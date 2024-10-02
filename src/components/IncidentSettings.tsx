import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Eye, AlertTriangle, UserX, Droplet, Package, Clock, Activity } from 'lucide-react';
import AlertContactList from './AlertContactList';

interface IncidentType {
  name: string;
  icon: React.ElementType;
  enabled: boolean;
  sensitivity: number;
}

const IncidentTypeItem: React.FC<{
  incident: IncidentType;
  onToggle: (name: string) => void;
  onSensitivityChange: (name: string, value: number) => void;
}> = ({ incident, onToggle, onSensitivityChange }) => {
  const Icon = incident.icon;
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-2">
      <div className="flex items-center">
        <Icon size={24} className="text-blue-500 mr-3" />
        <span className="font-semibold">{incident.name}</span>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="1"
          max="100"
          value={incident.sensitivity}
          onChange={(e) => onSensitivityChange(incident.name, parseInt(e.target.value))}
          className="w-32"
        />
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={incident.enabled}
            onChange={() => onToggle(incident.name)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

const SettingsBox: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex items-center mb-4">
      <Icon size={24} className="text-blue-500 mr-2" />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

const IncidentSettings: React.FC = () => {
  const [incidentTypes, setIncidentTypes] = useState<IncidentType[]>([
    { name: 'Standing Fall', icon: AlertTriangle, enabled: true, sensitivity: 80 },
    { name: 'Stuck on Ground', icon: UserX, enabled: true, sensitivity: 70 },
    { name: 'Slipping Incident', icon: Droplet, enabled: true, sensitivity: 60 },
    { name: 'Falling Object', icon: Package, enabled: false, sensitivity: 50 },
    { name: 'Trapping Event', icon: Clock, enabled: true, sensitivity: 75 },
    { name: 'Non-motion Alarm', icon: Activity, enabled: false, sensitivity: 40 },
  ]);

  const toggleIncident = (name: string) => {
    setIncidentTypes(incidentTypes.map(incident =>
      incident.name === name ? { ...incident, enabled: !incident.enabled } : incident
    ));
  };

  const changeSensitivity = (name: string, value: number) => {
    setIncidentTypes(incidentTypes.map(incident =>
      incident.name === name ? { ...incident, sensitivity: value } : incident
    ));
  };
  
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="flex items-center mb-6">
        <Link to="/" className="mr-4 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Incident Settings</h1>
      </header>

      <main>
        <SettingsBox title="Notification Settings" icon={Bell}>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Enable push notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Enable email notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Enable SOS button for critical incident</span>
            </label>
          </div>
        </SettingsBox>

        <SettingsBox title="Incident Types" icon={Shield}>
          <div className="space-y-2">
            {incidentTypes.map(incident => (
              <IncidentTypeItem
                key={incident.name}
                incident={incident}
                onToggle={toggleIncident}
                onSensitivityChange={changeSensitivity}
              />
            ))}
          </div>
        </SettingsBox>

        <AlertContactList />

        <SettingsBox title="Privacy Settings" icon={Eye}>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Enable camera recording</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Share data with healthcare providers</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Allow remote monitoring</span>
            </label>
          </div>
        </SettingsBox>
      </main>
    </div>
  );
};

export default IncidentSettings;