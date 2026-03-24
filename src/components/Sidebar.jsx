import React from 'react';
import profilResmi from '../assets/foti.png';

const Sidebar = ({ onLogout, user, activeTab, setTab }) => {
  return (
    <div className="w-80 h-screen bg-[#800000] text-white flex flex-col shrink-0 shadow-2xl">
      {/* Üst Logo */}
      <div className="flex flex-col items-center pt-10 pb-6">
        <img src="https://www.aile.gov.tr/media/4336/logo-department.svg" alt="Logo" className="w-14 h-14 mb-2 brightness-0 invert" />
        <h1 className="text-2xl font-bold tracking-tight text-white uppercase">İK PORTAL</h1>
      </div>

      {/* Profil Kartı */}
      <div className="px-6 mb-8">
        <div className="bg-black/20 rounded-[2rem] p-6 border border-white/10 flex flex-col items-center shadow-lg text-center">
          <div className="w-24 h-24 rounded-full border-2 border-white/40 p-1 mb-4">
            <img src={profilResmi} alt="Profil" className="w-full h-full rounded-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">
            {user?.fullName || 'GÜL DOĞAN'}
          </h2>
          <p className="text-xs text-white/70 italic mt-1 tracking-widest font-medium">Software Developer</p>
        </div>
      </div>

      {/* Menü Listesi */}
      <nav className="flex-1 px-4 space-y-2">
        <MenuButton active={activeTab === 'dashboard'} onClick={() => setTab('dashboard')} icon="📊" label="DASHBOARD" />
        <MenuButton active={activeTab === 'personnel'} onClick={() => setTab('personnel')} icon="👥" label="PERSONEL" />
        <MenuButton icon="📅" label="PUANTAJ" />
        <MenuButton icon="📄" label="BORDRO" />
        <MenuButton icon="✈️" label="İZİN YÖNETİMİ" />
      </nav>

      {/* Çıkış Yap */}
      <div className="p-6">
        <button onClick={onLogout} className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-[#800000] rounded-2xl font-black text-sm transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest">
          Çıkış Yap →
        </button>
      </div>
    </div>
  );
};

const MenuButton = ({ active, onClick, icon, label }) => (
  <div onClick={onClick} className={`flex items-center p-4 rounded-2xl cursor-pointer text-sm font-bold transition-all ${active ? 'bg-black/30 text-white border-l-4 border-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
    <span className="mr-3 text-xl">{icon}</span>
    <span className="tracking-widest">{label}</span>
  </div>
);

export default Sidebar;