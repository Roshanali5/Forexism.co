import React from 'react';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';

const EventsPage = ({ events }) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-4 py-2 bg-blue-600/30 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-400/30 mb-6">
            <span className="flex items-center space-x-2 text-white">
              <Calendar className="h-4 w-4" />
              <span>Live Trading Events</span>
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Upcoming Events
          </h1>
          <p className="text-lg sm:text-xl text-blue-50 max-w-3xl mx-auto">
            Join our live webinars, workshops, and trading sessions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-black via-blue-950 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === 'Online' ? 'bg-green-500/30 text-green-300' :
                    event.type === 'In-Person' ? 'bg-purple-500/30 text-purple-300' :
                    'bg-blue-500/30 text-blue-300'
                  }`}>
                    {event.type}
                  </span>
                  {event.type === 'Online' ? (
                    <Video className="h-5 w-5 text-white" />
                  ) : (
                    <MapPin className="h-5 w-5 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{event.title}</h3>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">{event.description}</p>

                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-medium">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Want to Host an Event?</h2>
          <p className="text-gray-400 mb-6">
            Share your trading expertise with our community
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-medium">
            Submit Event Proposal
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;