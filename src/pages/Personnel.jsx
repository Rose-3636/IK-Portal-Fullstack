import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Personnel = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentId, setCurrentId] = useState(null);
  const [person, setPerson] = useState({ fullName: '', role: '', username: '', password: '123' });

  // 1. Verileri Çekme
  const fetchUsers = () => {
    axios.get('http://localhost:5204/api/auth/all')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Hata:", err));
  };

  useEffect(() => { fetchUsers(); }, []);

  // 2. Düzenle Butonuna Basınca
  const handleEditClick = (u) => {
    setIsEditing(true);
    setCurrentId(u.id || u.Id);
    setPerson({ 
      fullName: u.fullName || u.FullName || '', 
      role: u.role || u.Role || '', 
      username: u.username || u.Username || '', 
      password: u.password || u.Password || '123' 
    });
    setShowModal(true);
  };

  // 3. Silme Butonuna Basınca
  const handleDelete = async (id) => {
    if (window.confirm("Bu personeli sistemden silmek istediğinize emin misiniz?")) {
      try {
        await axios.delete(`http://localhost:5204/api/auth/delete/${id}`);
        fetchUsers(); // Listeyi yenile
      } catch (error) {
        alert("Silme işlemi başarısız!");
      }
    }
  };

  // 4. Kaydetme veya Güncelleme
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5204/api/auth/update/${currentId}`, person);
      } else {
        await axios.post('http://localhost:5204/api/auth/add', person);
      }
      setShowModal(false);
      fetchUsers();
      resetForm();
    } catch (error) {
      alert("İşlem başarısız!");
    }
  };

  const resetForm = () => {
    setPerson({ fullName: '', role: '', username: '', password: '123' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* BAŞLIK KISMI */}
      <div className="flex justify-between items-center mb-8 bg-white p-8 rounded-[2rem] shadow-sm border-l-8 border-[#800000]">
        <div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Personel Yönetimi</h2>
          <p className="text-xs text-gray-400 font-bold uppercase">Toplam {users.length} Kayıtlı Personel</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="bg-[#800000] text-white px-8 py-4 rounded-2xl font-black text-xs hover:scale-105 transition-all shadow-xl cursor-pointer"
        >
          + YENİ PERSONEL EKLE
        </button>
      </div>

      {/* TABLO KISMI */}
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black">
            <tr>
              <th className="p-8">AD SOYAD</th>
              <th>ROL / UNVAN</th>
              <th className="text-right p-8">İŞLEMLER</th>
            </tr>
          </thead>
          <tbody className="text-sm font-bold text-gray-600">
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-50 hover:bg-red-50/30 transition-all">
                <td className="p-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#800000] text-white flex items-center justify-center shadow-lg font-black">
                    {u.fullName ? u.fullName[0] : u.FullName ? u.FullName[0] : '?'}
                  </div>
                  {u.fullName || u.FullName}
                </td>
                <td className="text-gray-400">{u.role || u.Role}</td>
                <td className="text-right p-8 flex justify-end gap-3">
                  <button 
                    onClick={() => handleEditClick(u)}
                    className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all border border-blue-100 cursor-pointer"
                  >
                    DÜZENLE
                  </button>
                  <button 
                    onClick={() => handleDelete(u.id || u.Id)}
                    className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all border border-red-100 cursor-pointer"
                  >
                    SİL
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM PENCERESİ (MODAL) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl border-t-[16px] border-[#800000] animate-in zoom-in">
            <div className="p-10">
              <h3 className="text-2xl font-black text-gray-800 mb-8 uppercase text-center">
                {isEditing ? 'Bilgileri Güncelle' : 'Yeni Personel'}
              </h3>
              <form onSubmit={handleSave} className="space-y-4">
                <input 
                  value={person.fullName} 
                  placeholder="Ad Soyad" 
                  className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#800000] font-bold"
                  onChange={(e) => setPerson({...person, fullName: e.target.value})} 
                  required 
                />
                <input 
                  value={person.role} 
                  placeholder="Ünvan" 
                  className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#800000] font-bold"
                  onChange={(e) => setPerson({...person, role: e.target.value})} 
                  required 
                />
                <input 
                  value={person.username} 
                  placeholder="Kullanıcı Adı" 
                  className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#800000] font-bold"
                  onChange={(e) => setPerson({...person, username: e.target.value})} 
                  required 
                />
                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 font-bold text-gray-400">İptal</button>
                  <button type="submit" className="flex-1 bg-[#800000] text-white py-4 rounded-2xl font-black shadow-lg">
                    {isEditing ? 'GÜNCELLE' : 'KAYDET'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personnel;