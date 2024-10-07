import React from 'react';
import Layout from '@/components/Layout';

const MusicPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-cyan-700">Music Recommendations</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Based on Current Weather</h2>
          <p className="text-gray-600 mb-4">Sunny and 72°F in New York City</p>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center p-2 bg-gray-100 rounded">
                <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                <div>
                  <p className="font-semibold">Song Title {i}</p>
                  <p className="text-sm text-gray-600">Artist Name</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Mood-based Playlists</h2>
          <div className="grid grid-cols-2 gap-4">
            {['Upbeat', 'Relaxing', 'Energetic', 'Chill'].map((mood) => (
              <div key={mood} className="p-4 bg-gray-100 rounded text-center">
                <p className="font-semibold">{mood}</p>
                <p className="text-sm text-gray-600">20 songs</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MusicPage;