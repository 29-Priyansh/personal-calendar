import React from 'react';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-emerald-600 bg-opacity-75 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl bg-white/30 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8">
        <Calendar />
      </div>
    </div>
  );
}

export default App;