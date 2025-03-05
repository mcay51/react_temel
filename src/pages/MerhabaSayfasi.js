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
      <p>Bu sayfa, React'ta props ve PropTypes kavramlarını göstermektedir.</p>
      
      <div className="component-container">
        {/* Farklı prop kombinasyonlarıyla Merhaba bileşenini kullanıyoruz */}
        <h3>Temel Kullanım:</h3>
        <Merhaba isim="React Öğrencisi" />
        
        <h3>Mesaj prop'u ile kullanım:</h3>
        <Merhaba 
          isim="Ahmet" 
          mesaj="PropTypes ile tip güvenliği sağlayabilirsiniz." 
        />
        
        <h3>Children (Çocuk) içerikle kullanım:</h3>
        <Merhaba isim="Ayşe">
          <p>Bu bir çocuk içeriktir ve <code>props.children</code> olarak erişilebilir.</p>
        </Merhaba>
        
        <h3>Varsayılan prop değerleri ile kullanım:</h3>
        <Merhaba />
      </div>
      
      <div className="explanation">
        <h2>Props Nedir?</h2>
        <p>
          Props (properties), React bileşenlerine veri aktarmanın yoludur.
          Üst bileşenden alt bileşene tek yönlü veri akışı sağlar.
          Props salt okunurdur, yani bir bileşen kendi props'unu değiştiremez.
        </p>
        <p>
          Yukarıdaki örneklerde, Merhaba bileşenine farklı prop'lar gönderdik.
          Merhaba bileşeni bu prop'ları alıp kullanıcıya özelleştirilmiş içerikler gösteriyor.
        </p>
        
        <h2>PropTypes Nedir?</h2>
        <p>
          PropTypes, React bileşenlerine tip kontrolü eklemek için kullanılan bir kütüphanedir.
          Bileşenlerinizin doğru prop tiplerini aldığından emin olmanıza yardımcı olur.
          Bu, özellikle büyük projelerde hataları önlemek için çok faydalıdır.
        </p>
        <p>
          PropTypes ile şunları yapabilirsiniz:
        </p>
        <ul>
          <li>Prop'ların tiplerini belirleyebilirsiniz (string, number, bool, array, object, func, vb.)</li>
          <li>Zorunlu prop'ları işaretleyebilirsiniz (isRequired)</li>
          <li>Özel doğrulama fonksiyonları yazabilirsiniz</li>
          <li>Varsayılan prop değerleri tanımlayabilirsiniz (defaultProps)</li>
        </ul>
        <p>
          <code>Merhaba.js</code> dosyasında, <code>isim</code> prop'unun zorunlu bir string olduğunu,
          <code>mesaj</code> prop'unun isteğe bağlı bir string olduğunu ve
          <code>cocuklar</code> prop'unun herhangi bir React node olabileceğini belirttik.
        </p>
      </div>
      
      <Link to="/" className="home-link">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default MerhabaSayfasi; 