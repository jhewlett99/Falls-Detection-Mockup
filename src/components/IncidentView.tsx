import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Maximize2, ArrowLeft, Check } from 'lucide-react';

const VideoPlayer: React.FC<{ title: string; isMain?: boolean }> = ({ title, isMain = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isMain ? 'col-span-2' : ''}`}>
      <div className="relative">
        <div className={`bg-gray-300 ${isMain ? 'h-96' : 'h-48'}`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">{title}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
              <SkipBack size={16} />
            </button>
            <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
              <SkipForward size={16} />
            </button>
          </div>
          {isMain && (
            <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
              <Maximize2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationItem: React.FC<{ name: string; time: string; viewed: boolean }> = ({ name, time, viewed }) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-600">Notified at {time}</p>
    </div>
    {viewed ? (
      <div className="flex items-center text-green-500">
        <Check size={16} className="mr-1" />
        <span className="text-sm">Viewed</span>
      </div>
    ) : (
      <span className="text-sm text-gray-500">Not viewed</span>
    )}
  </div>
);

const IncidentView: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="flex items-center mb-6">
        <Link to="/" className="mr-4 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Incident View</h1>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Incident Details</h2>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Type:</strong> Standing Fall</p>
                <p><strong>Location:</strong> Kitchen</p>
                <p><strong>Time:</strong> 8:40 PM, September 25, 2024</p>
                <p><strong>Duration:</strong> 23 seconds</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Notifications:</p>
                <NotificationItem name="Son" time="8:41 PM" viewed={true} />
                <NotificationItem name="Granddaughter" time="8:41 PM" viewed={false} />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3D Mesh Recreation</h2>
          <VideoPlayer title="3D Mesh Reconstruction" isMain={true} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Camera Replays</h2>
          <div className="grid grid-cols-2 gap-4">
            <VideoPlayer title="Camera 1 - Kitchen Corner" />
            <VideoPlayer title="Camera 2 - Kitchen Entrance" />
            <VideoPlayer title="Camera 3 - Living Room View" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default IncidentView;