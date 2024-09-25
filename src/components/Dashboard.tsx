import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, User, Activity, Battery, Wifi, AlertTriangle } from 'lucide-react';

const RoomCard: React.FC<{ name: string; hasIncident: boolean; id: string }> = ({ name, hasIncident, id }) => (
  <Link to={`/room/${id}`} className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${hasIncident ? 'border-2 border-red-500' : ''}`}>
    <div className={`w-full h-24 ${hasIncident ? 'bg-red-100' : 'bg-gray-200'} rounded-md mb-2`}></div>
    <p className="text-lg font-semibold text-gray-800">{name}</p>
    {hasIncident && <p className="text-sm text-red-500 font-semibold">Incident Detected</p>}
  </Link>
);

const StatusItem: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <Icon size={20} className="text-blue-500" />
    <span className="text-sm text-gray-600">{label}:</span>
    <span className="text-sm font-semibold text-gray-800">{value}</span>
  </div>
);

const IncidentBanner: React.FC = () => (
  <Link to="/incident/1" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 flex items-center justify-between">
    <div className="flex items-center">
      <AlertTriangle className="mr-3" size={24} />
      <div>
        <p className="font-bold">Recent Incident: Standing Fall</p>
        <p>Location: Kitchen | Time: 8:40 PM</p>
      </div>
    </div>
    <div className="bg-red-200 rounded-full p-2">
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M14 15l5 5m0-5l-5 5"></path>
      </svg>
    </div>
  </Link>
);

const Dashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fall Detection System</h1>
        <nav className="flex space-x-4">
          <Settings className="text-gray-600 hover:text-blue-500 cursor-pointer" />
          <User className="text-gray-600 hover:text-blue-500 cursor-pointer" />
        </nav>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status Overview</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-2 gap-4">
              <StatusItem icon={Battery} label="System Battery" value="85%" />
              <StatusItem icon={Wifi} label="Network" value="Strong" />
              <StatusItem icon={Activity} label="Recent Incidents" value="1" />
              <StatusItem icon={Settings} label="System Health" value="Good" />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Rooms</h2>
          <div className="grid grid-cols-2 gap-4">
            <RoomCard name="Master Bedroom" hasIncident={false} id="1" />
            <RoomCard name="Living Room" hasIncident={false} id="2" />
            <RoomCard name="Bathroom" hasIncident={false} id="3" />
            <RoomCard name="Kitchen" hasIncident={true} id="4" />
          </div>
        </section>

        <IncidentBanner />
      </main>
    </div>
  );
};

export default Dashboard;