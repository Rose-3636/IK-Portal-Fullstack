import React, { useState } from 'react';
import axios from 'axios'; // 1. Axios'un burada olduğundan emin ol

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Konsola yazdıralım ki butonun çalıştığını görelim
    console.log("Giriş isteği gönderiliyor...", { username, password });

    try {
      // DİKKAT: Port numaranın 5204 olduğundan emin ol (Swagger'dan bak)
      const response = await axios.post('http://localhost:5204/api/auth/login', {
        username: username,
        password: password
      });

      console.log("Sunucu yanıtı:", response.data);

      if (response.data.success) {
        onLogin(response.data); 
      }
    } catch (error) {
      // GERÇEK HATAYI BURADA GÖRECEĞİZ:
      console.error("Hata Detayı:", error);
      
      if (error.response) {
        // Sunucu bir hata döndürdü (401, 404 vb.)
        alert("Sunucu Hatası: " + error.response.status + " - " + error.response.data.message);
      } else if (error.request) {
        // İstek yola çıktı ama sunucuya ulaşamadı
        alert("Sunucuya ulaşılamıyor! .NET projesinin çalıştığından ve portun (5204) doğru olduğundan emin ol.");
      } else {
        // İstek yola çıkamadan kodda hata oluştu (Axios yüklü mü?)
        alert("İstek oluşturulamadı: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7F6]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[450px] border-t-[12px] border-ik-bordo">
        <div className="flex flex-col items-center mb-8">
            <img src="https://www.aile.gov.tr/media/4336/logo-department.svg" className="w-16 mb-4 brightness-0" alt="logo" />
            <h2 className="text-xl font-bold text-gray-800 uppercase text-center leading-tight">İnsan Kaynakları Portalı</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="text" 
            placeholder="Kullanıcı Adı " 
            className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-ik-bordo" 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-ik-bordo" 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <button 
            type="submit" 
            className="w-full bg-ik-bordo text-white py-4 rounded-2xl font-bold shadow-lg cursor-pointer hover:brightness-110 transition-all"
          >
            GİRİŞ YAP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;