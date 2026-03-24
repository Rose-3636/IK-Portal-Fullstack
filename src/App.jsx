import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Personnel from './pages/Personnel';

function App() {
  // --- DURUM (STATE) TANIMLAMALARI ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ totalPersonnel: 0 });

  // --- SQL VERİLERİNİ ÇEKME ---
  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:5204/api/dashboard/stats')
        .then(res => setStats(res.data))
        .catch(err => console.error("İstatistikler gelmedi:", err));
    }
  }, [isLoggedIn]);

  // --- GİRİŞ / ÇIKIŞ FONKSİYONLARI ---
  const handleLogin = (data) => {
    setUserData(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setActiveTab('dashboard');
  };

  // --- EĞER GİRİŞ YAPILMADIYSA LOGIN EKRANINI GÖSTER ---
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // --- ANA PORTAL GÖRÜNÜMÜ ---
  return (
    <div className="flex bg-[#F3F4F6] min-h-screen w-full font-sans overflow-hidden text-gray-800">
      <Sidebar 
        onLogout={handleLogout} 
        user={userData} 
        activeTab={activeTab} 
        setTab={setActiveTab} 
      />

      <div className="flex-1 h-screen overflow-y-auto p-8">
        
        {/* ÜST BAŞLIK (BAKANLIK LOGO VE ADI) */}
        <div className="flex items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border-b-4 border-[#800000]">
          <img src="https://www.aile.gov.tr/media/4336/logo-department.svg" className="w-16 h-16 mr-6 brightness-0" alt="logo" />
          <div>
            <h1 className="text-2xl font-black text-[#800000] uppercase tracking-tighter">T.C. AİLE VE SOSYAL HİZMETLER BAKANLIĞI</h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">İnsan Kaynakları Yönetim Portalı</p>
          </div>
        </div>

        {/* SAYFA İÇERİĞİ DEĞİŞİM ALANI */}
        {activeTab === 'dashboard' ? (
          <div className="space-y-6 animate-in fade-in duration-700">
            
            {/* 1. SATIR: STATÜLER VE HAVA DURUMU/TAKVİM */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatCard title="Sistemdeki Personel" value={stats.totalPersonnel} icon="👥" />
              <StatCard title="Açık Pozisyonlar" value="3" icon="+" />
              <WeatherCalendarCard /> 
            </div>

            {/* 2. SATIR: MALİYET VE GRAFİK */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col justify-center border-t-8 border-green-500">
                 <p className="text-xs font-black text-gray-400 uppercase mb-4">AYLIK PERSONEL MALİYETİ</p>
                 <h3 className="text-5xl font-black text-green-700">₺3.401.035</h3>
              </div>
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex items-center justify-around">
                 <div className="w-32 h-32 rounded-full border-[18px] border-blue-500 border-t-orange-500 border-r-green-500 border-l-purple-500 shadow-inner"></div>
                 <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-[11px] font-black uppercase">
                    <p className="text-green-600 flex items-center gap-2">● Personel %35</p>
                    <p className="text-orange-500 flex items-center gap-2">● Sosyal Hizmet %33</p>
                    <p className="text-blue-500 flex items-center gap-2">● İdari İşler %25</p>
                    <p className="text-purple-500 flex items-center gap-2">● Bilgi İşlem %8</p>
                 </div>
              </div>
            </div>

            {/* 3. SATIR: DUYURULAR VE ETKİNLİKLER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                  <h4 className="font-black text-gray-800 text-base uppercase mb-6 border-b pb-2">DUYURULAR VE HABERLER</h4>
                  <div className="space-y-4">
                     <AnnouncementItem title="Yeni Yan Haklar Politikası Yayında" text="Yeni dönem dökümanlarına sistemden ulaşabilirsiniz." />
                     <AnnouncementItem title="Gül DOĞAN Terfi Aldı - Tebrikler!" text="Yeni görevinde başarılar dileriz." />
                  </div>
               </div>
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                  <h4 className="font-black text-gray-800 text-base uppercase mb-6 border-b pb-2 tracking-widest">YAKLAŞAN ETKİNLİKLER</h4>
                  <div className="space-y-5">
                     <EventRow date="15 Mart" title="Ekip Tanışma Toplantısı" />
                     <EventRow date="22 Mart" title="Liderlik Ve Yönetim Eğitimi" />
                     <EventRow date="24 Mart" title="Performans Değerlendirme Günü" />
                  </div>
               </div>
            </div>

            {/* 4. SATIR: HIZLI ERİŞİM */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
               <h4 className="font-black text-gray-400 text-sm mb-6 uppercase tracking-[4px]">Hızlı Erişim</h4>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <QuickBtn icon="📄" title="İzin Talebi Yap" />
                  <QuickBtn icon="🎓" title="Eğitimlerim" />
                  <QuickBtn icon="📁" title="Formlar ve Belgeler" />
                  <QuickBtn icon="📊" title="Yıllık Değerlendirme" />
               </div>
            </div>

          </div>
        ) : (
          /* PERSONEL SAYFASI */
          <Personnel />
        )}
      </div>
    </div>
  );
}

// --- ALT BİLEŞENLER (Büyütülmüş ve İllüstrasyonlu) ---

const WeatherCalendarCard = () => {
  const dayName = "SALI";
  const dayNumber = 24; // Bugün 24 Mart
  const monthName = "MART 2026";
  const daysHeader = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-[#4FA3E1] md:col-span-2 rounded-[2.5rem] shadow-2xl text-white flex overflow-hidden border border-blue-300/30 group hover:scale-[1.01] transition-all duration-500">
      
      {/* SOL YARI: HAVA DURUMU (POFUDUK BULUTLU) */}
      <div className="w-1/2 p-8 flex flex-col justify-between relative overflow-hidden border-r border-white/10">
        <div className="z-10">
          <h2 className="text-5xl font-light tracking-tighter uppercase leading-none">{dayName}</h2>
          <p className="text-sm font-bold opacity-80 mt-1 tracking-[4px] uppercase">MART {dayNumber}</p>
        </div>
        
        <div className="z-10">
          <h3 className="text-7xl font-light leading-none">19°C</h3>
          <p className="text-[10px] font-black tracking-[3px] opacity-90 uppercase mt-2">GÜNEŞLİ / AZ BULUTLU</p>
        </div>

        {/* GÜNEŞ VE BULUT İLLÜSTRASYONU */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 scale-110 pointer-events-none">
          <div className="relative">
            <div className="absolute -top-10 -left-6 w-24 h-24 bg-yellow-300/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="w-16 h-16 bg-gradient-to-tr from-orange-400 to-yellow-300 rounded-full shadow-[0_0_50px_rgba(251,191,36,0.6)]"></div>
            <div className="absolute -right-4 -bottom-2 drop-shadow-2xl">
              <div className="w-24 h-9 bg-white rounded-full relative z-30"></div>
              <div className="w-12 h-12 bg-white rounded-full absolute -top-5 left-3 z-20"></div>
              <div className="w-14 h-14 bg-white rounded-full absolute -top-7 left-8 z-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SAĞ YARI: TAKVİM */}
      <div className="w-1/2 p-6 bg-white/10 backdrop-blur-md flex flex-col justify-between">
        <h4 className="font-black text-sm uppercase tracking-widest text-center mb-4">{monthName}</h4>
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysHeader.map(day => (
            <span key={day} className="text-[9px] font-black opacity-60 uppercase mb-1">{day}</span>
          ))}
          {/* Mart 2026 Pazar (6. gün boşluğu) başlıyor */}
          {Array(6).fill("").map((_, i) => <span key={i}></span>)}
          {dates.map(date => (
            <span key={date} className={`text-[10px] py-1.5 rounded-xl font-black transition-all ${date === dayNumber ? 'bg-white text-[#4FA3E1] shadow-xl scale-125 z-10' : 'opacity-80 hover:bg-white/10'}`}>
              {date}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
           <p className="text-[9px] font-black uppercase text-blue-50">Bugün Etkinlik: 1</p>
           <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-white/20 shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col justify-between hover:scale-105 transition-transform">
    <p className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2">
      <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">{icon}</span>
      {title}
    </p>
    <h3 className="text-6xl font-black text-gray-700 mt-4 tracking-tighter">{value}</h3>
  </div>
);

const AnnouncementItem = ({ title, text }) => (
  <div className="flex bg-[#FDF2F2] p-5 rounded-2xl border border-red-50 gap-5 items-center hover:bg-red-100 transition-all cursor-pointer">
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">📰</div>
    <div>
      <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{title}</p>
      <p className="text-xs text-gray-500 font-medium">{text}</p>
    </div>
  </div>
);

const EventRow = ({ date, title }) => (
  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
    <span className="text-[#800000] font-black text-sm">{date}</span> 
    <span className="text-gray-700 font-bold uppercase text-xs tracking-widest">{title}</span>
  </div>
);

const QuickBtn = ({ icon, title }) => (
  <button className="flex items-center justify-center gap-3 p-4 bg-[#F2E9E9] text-[#800000] rounded-2xl font-black text-xs uppercase hover:bg-[#800000] hover:text-white transition-all shadow-sm cursor-pointer border border-red-100/30">
    <span className="text-lg">{icon}</span> {title}
  </button>
);

export default App;