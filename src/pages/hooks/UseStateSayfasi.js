import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * UseStateSayfasi Bileşeni
 * 
 * Bu sayfa, useState hook'unun kullanımını gösterir.
 */
function UseStateSayfasi() {
  // Basit bir sayaç örneği
  const [sayac, setSayac] = useState(0);
  
  // Form örneği
  const [form, setForm] = useState({
    isim: '',
    email: '',
    mesaj: ''
  });
  
  // Form değişikliklerini işleyen fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  
  // Formu gönderen fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form gönderildi: ${JSON.stringify(form)}`);
  };
  
  return (
    <div className="page-container">
      <h1>useState Hook</h1>
      <p>Bu sayfa, React'ta useState hook'unun kullanımını göstermektedir.</p>
      
      <div className="component-container">
        <h2>Basit Sayaç Örneği</h2>
        <div className="sayac-container">
          <p>Şu anki sayı: {sayac}</p>
          <div>
            <button onClick={() => setSayac(sayac - 1)}>Azalt</button>
            <button onClick={() => setSayac(0)} style={{ margin: '0 10px' }}>Sıfırla</button>
            <button onClick={() => setSayac(sayac + 1)}>Artır</button>
          </div>
        </div>
      </div>
      
      <div className="component-container">
        <h2>Form Örneği</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>İsim:</label>
            <input
              type="text"
              name="isim"
              value={form.isim}
              onChange={handleChange}
              placeholder="Adınızı girin"
            />
          </div>
          
          <div className="form-group">
            <label>E-posta:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="E-posta adresinizi girin"
            />
          </div>
          
          <div className="form-group">
            <label>Mesaj:</label>
            <textarea
              name="mesaj"
              value={form.mesaj}
              onChange={handleChange}
              placeholder="Mesajınızı girin"
              rows="4"
            ></textarea>
          </div>
          
          <button type="submit">Gönder</button>
        </form>
      </div>
      
      <div className="explanation">
        <h2>useState Hook Nedir?</h2>
        <p>
          useState, React'ın en temel hook'udur ve fonksiyonel bileşenlerde state
          kullanmanızı sağlar. Kullanımı oldukça basittir:
        </p>
        <pre><code>const [state, setState] = useState(initialValue);</code></pre>
        
        <h3>Nasıl Çalışır?</h3>
        <ul>
          <li>
            <strong>state:</strong> Mevcut state değeri
          </li>
          <li>
            <strong>setState:</strong> State'i güncellemek için kullanılan fonksiyon
          </li>
          <li>
            <strong>initialValue:</strong> State'in başlangıç değeri
          </li>
        </ul>
        
        <h3>Örnekler:</h3>
        <ol>
          <li>
            <strong>Basit Değerler:</strong> <code>const [sayac, setSayac] = useState(0);</code>
          </li>
          <li>
            <strong>Nesneler:</strong> <code>const [form, setForm] = useState({"{"} isim: '', email: '' {"}"});</code>
          </li>
          <li>
            <strong>Diziler:</strong> <code>const [items, setItems] = useState([]);</code>
          </li>
        </ol>
        
        <h3>Önemli Noktalar:</h3>
        <ul>
          <li>
            State güncellemeleri asenkrondur, yani setState çağrıldıktan hemen sonra
            state değeri değişmeyebilir.
          </li>
          <li>
            Nesne veya dizi state'lerini güncellerken, doğrudan değiştirmek yerine
            yeni bir kopya oluşturmalısınız (immutability).
          </li>
          <li>
            Fonksiyonel güncellemeler kullanabilirsiniz: <code>setSayac(prevSayac ={">"} prevSayac + 1)</code>
          </li>
        </ul>
      </div>
      
      <Link to="/" className="home-link">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default UseStateSayfasi; 