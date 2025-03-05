import React from 'react';
import { Link } from 'react-router-dom';
import Sayac from '../components/Sayac';

/**
 * SayacSayfasi Bileşeni
 * 
 * Bu sayfa, Sayac bileşenini içerir ve state kavramını gösterir.
 * Ayrıca ana sayfaya dönüş bağlantısı içerir.
 */
function SayacSayfasi() {
  return (
    <div className="page-container">
      <h1>Sayaç Sayfası</h1>
      <p>Bu sayfa, React'ta state kavramını göstermektedir.</p>
      
      <div className="component-container">
        <Sayac />
      </div>
      
      <div className="explanation">
        <h2>State Nedir?</h2>
        <p>
          State, bir bileşenin kendi içinde tuttuğu ve değişebilen verilerdir.
          State değiştiğinde, bileşen otomatik olarak yeniden render edilir.
        </p>
        <p>
          Yukarıdaki örnekte, Sayac bileşeni bir sayı değeri tutar ve bu değeri
          artırabilir. Butona her tıklandığında, state güncellenir ve kullanıcı
          arayüzü otomatik olarak yeni değeri gösterecek şekilde güncellenir.
        </p>
        <p>
          Fonksiyonel bileşenlerde state, useState hook'u ile yönetilir:
          <code>const [state, setState] = useState(başlangıçDeğeri);</code>
        </p>
      </div>
      
      <Link to="/" className="home-link">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default SayacSayfasi; 