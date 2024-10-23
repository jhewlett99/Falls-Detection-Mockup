import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, User, Activity, Battery, Wifi, AlertTriangle } from 'lucide-react';

const RoomCard: React.FC<{ 
  name: string; 
  hasIncident: boolean; 
  id: string;
  imageSrc?: string;
}> = ({ name, hasIncident, id, imageSrc }) => (
  <Link 
    to={`/room/${id}`} 
    className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${
      hasIncident ? 'border-2 border-red-500' : ''
    }`}
  >
    <div className={`relative w-full h-48 mb-2 overflow-hidden rounded-md ${
      hasIncident ? 'ring-4 ring-red-500 ring-opacity-50' : ''
    }`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${name} view`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center ${
          hasIncident ? 'bg-red-100' : 'bg-gray-200'
        }`}>
          <Home className="w-12 h-12 text-gray-400" />
        </div>
      )}
      {hasIncident && (
        <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-white drop-shadow-lg" />
        </div>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-lg font-semibold text-gray-800">{name}</p>
      {hasIncident && (
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <p className="text-sm text-red-500 font-semibold">Incident Detected</p>
        </div>
      )}
    </div>
  </Link>
);

const StatusItem: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  value: string;
}> = ({ icon: Icon, label, value }) => (
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
  const rooms = [
    {
      id: "1",
      name: "Master Bedroom",
      hasIncident: false,
      imageSrc: "/images/MasterBedroomHomepage.jpg" 
    },
    {
      id: "2",
      name: "Living Room",
      hasIncident: false,
      imageSrc: "/images/LivingRoomHomepage.jpg" 
    },
    {
      id: "3",
      name: "Bathroom",
      hasIncident: false,
      imageSrc: "/images/BathroomHomepage.jpg" 
    },
    {
      id: "4",
      name: "Kitchen",
      hasIncident: true,
      imageSrc: "/images/KitchenHomepage.jpg" 
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fall Detection System</h1>
        <nav className="flex space-x-4">
          <Link to="/incident-settings">
            <Settings className="text-gray-600 hover:text-blue-500 cursor-pointer" />
          </Link>
          <User className="text-gray-600 hover:text-blue-500 cursor-pointer" />
        </nav>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status Overview</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatusItem icon={Battery} label="System Battery" value="85%" />
              <StatusItem icon={Wifi} label="Network" value="Strong" />
              <StatusItem icon={Activity} label="Recent Incidents" value="1" />
              <StatusItem icon={Settings} label="System Health" value="Good" />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {rooms.map(room => (
              <RoomCard
                key={room.id}
                id={room.id}
                name={room.name}
                hasIncident={room.hasIncident}
                imageSrc={room.imageSrc}
              />
            ))}
          </div>
        </section>

        <IncidentBanner />
      </main>
    </div>
  );
};

export default Dashboard;