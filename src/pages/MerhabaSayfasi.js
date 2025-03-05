import React from 'react';
import { Link } from 'react-router-dom';
import Merhaba from '../components/Merhaba';

/**
 * MerhabaSayfasi Bileşeni
 * 
 * Bu sayfa, Merhaba bileşenini içerir ve props kavramını gösterir.
 * Ayrıca ana sayfaya dönüş bağlantısı içerir.
 */
function MerhabaSayfasi() {
  return (
    <div className="page-container">
      <h1>Merhaba Sayfası</h1>
      <p>Bu sayfa, React'ta props kavramını göstermektedir.</p>
      
      <div className="component-container">
        <Merhaba isim="React Öğrencisi" />
      </div>
      
      <div className="explanation">
        <h2>Props Nedir?</h2>
        <p>
          Props (properties), React bileşenlerine veri aktarmanın yoludur.
          Üst bileşenden alt bileşene tek yönlü veri akışı sağlar.
          Props salt okunurdur, yani bir bileşen kendi props'unu değiştiremez.
        </p>
        <p>
          Yukarıdaki örnekte, Merhaba bileşenine "isim" adında bir prop gönderdik.
          Merhaba bileşeni bu prop'u alıp kullanıcıya özelleştirilmiş bir mesaj gösteriyor.
        </p>
      </div>
      
      <Link to="/" className="home-link">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default MerhabaSayfasi; 