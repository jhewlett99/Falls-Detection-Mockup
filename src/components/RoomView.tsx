import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, AlertTriangle, Battery } from 'lucide-react';

const CameraStatus: React.FC<{ name: string; status: string; battery: number }> = ({ name, status, battery }) => (
  <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-2">
    <div className="flex items-center">
      <Camera size={20} className="text-blue-500 mr-2" />
      <span>{name}</span>
    </div>
    <div className="flex items-center">
      <Battery size={20} className="text-green-500 mr-2" />
      <span className="mr-4">{battery}%</span>
      <span className={`px-2 py-1 rounded ${status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {status}
      </span>
    </div>
  </div>
);

const IncidentItem: React.FC<{ type: string; date: string; time: string; isCritical: boolean }> = ({ type, date, time, isCritical }) => (
  <div className={`flex items-center ${isCritical ? 'bg-red-100 border-l-4 border-red-500' : 'bg-white'} p-3 rounded-lg shadow mb-2`}>
    <AlertTriangle size={20} className={`${isCritical ? 'text-red-500' : 'text-yellow-500'} mr-2`} />
    <div>
      <p className={`font-semibold ${isCritical ? 'text-red-700' : 'text-gray-800'}`}>{type}</p>
      <p className="text-sm text-gray-600">{date} at {time}</p>
    </div>
  </div>
);

const RoomView: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="flex items-center mb-6">
        <Link to="/" className="mr-4 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Master Bedroom</h1>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Room Overview</h2>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500 text-lg">3D Room Representation</span>
            </div>
            <p className="text-gray-600">Last activity detected: 10 minutes ago</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Room Cameras</h2>
          <CameraStatus name="Corner Camera" status="Online" battery={85} />
          <CameraStatus name="Door Camera" status="Offline" battery={12} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Incidents</h2>
          <IncidentItem type="Fall Detected" date="Sep 26, 2024" time="9:15 AM" isCritical={true} />
          <IncidentItem type="Partial Trip" date="Sep 25, 2024" time="8:30 PM" isCritical={false} />
          <IncidentItem type="Tripping Hazard" date="Sep 24, 2024" time="2:15 AM" isCritical={false} />
        </section>
      </main>
    </div>
  );
};

export default RoomView;