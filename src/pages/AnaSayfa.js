import React from 'react';
import NavMenu from '../components/NavMenu';

/**
 * AnaSayfa Bileşeni
 * 
 * Bu bileşen, uygulamanın ana sayfasını temsil eder ve
 * hiyerarşik yapıda bir navigasyon menüsü içerir.
 * 
 * NavMenu bileşeni, açılır-kapanır alt menüleri destekleyen
 * bir navigasyon menüsü sağlar.
 */
function AnaSayfa() {
  return (
    <div className="home-container">
      <h1>React Öğrenme Uygulaması</h1>
      <p>Bu uygulama, React'ın temel kavramlarını öğrenmek için oluşturulmuştur.</p>
      
      <div className="content-container">
        <NavMenu />
        
        <div className="welcome-section">
          <h2>Hoş Geldiniz!</h2>
          <p>
            Bu uygulama, React öğrenme sürecinizde size yardımcı olmak için tasarlanmıştır.
            Sol taraftaki menüden istediğiniz konuyu seçerek öğrenmeye başlayabilirsiniz.
          </p>
          <p>
            Her konu, teorik bilgiler ve pratik örnekler içermektedir. Örnekleri inceleyerek
            ve kodu değiştirerek React'ı daha iyi anlayabilirsiniz.
          </p>
          <p>
            İyi öğrenmeler!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnaSayfa; 