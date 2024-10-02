// import React from 'react';
// import { Home, MessageCircle, User, Calendar } from 'lucide-react';

// type Tab = 'profile' | 'schedule' | 'details';

// interface BottomNavigationProps {
//   selectedTab: Tab;
//   setSelectedTab: React.Dispatch<React.SetStateAction<Tab>>;
// }

// export default function BottomNavigation({ selectedTab, setSelectedTab }: BottomNavigationProps) {
//   return (
//     <div className="flex justify-around bg-white rounded-full p-2 mt-4">
//       <button onClick={() => setSelectedTab('profile')}><Home className="w-6 h-6" /></button>
//       <button><MessageCircle className="w-6 h-6" /></button>
//       <button><User className="w-6 h-6" /></button>
//       <button onClick={() => setSelectedTab('schedule')}><Calendar className="w-6 h-6" /></button>
//     </div>
//   );
// }