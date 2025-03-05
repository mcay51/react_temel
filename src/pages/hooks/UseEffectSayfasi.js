import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * UseEffectSayfasi Bileşeni
 * 
 * Bu sayfa, useEffect hook'unun kullanımını gösterir.
 * useEffect, yan etkileri yönetmek ve bileşenin yaşam döngüsü
 * olaylarını takip etmek için kullanılır.
 */
function UseEffectSayfasi() {
  // Sayaç örneği için state
  const [sayac, setSayac] = useState(0);
  
  // Veri yükleme örneği için state'ler
  const [veri, setVeri] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);
  
  // Pencere boyutu örneği için state
  const [pencereBoyutu, setPencereBoyutu] = useState({
    genislik: window.innerWidth,
    yukseklik: window.innerHeight
  });
  
  // Örnek 1: Her render sonrası çalışan useEffect
  // (componentDidMount ve componentDidUpdate'e karşılık gelir)
  useEffect(() => {
    document.title = `Sayaç: ${sayac}`;
    console.log('Sayfa başlığı güncellendi');
  });
  
  // Örnek 2: Sadece belirli state değiştiğinde çalışan useEffect
  // (componentDidUpdate ile koşullu kontrol yapısına karşılık gelir)
  useEffect(() => {
    console.log(`Sayaç değeri değişti: ${sayac}`);
    
    // Sayaç 5'in katı olduğunda bir mesaj göster
    if (sayac !== 0 && sayac % 5 === 0) {
      alert(`Tebrikler! Sayaç ${sayac} değerine ulaştı!`);
    }
  }, [sayac]); // Sadece sayac değiştiğinde çalışır
  
  // Örnek 3: Sadece bir kez çalışan useEffect (bileşen monte edildiğinde)
  // (componentDidMount'a karşılık gelir)
  useEffect(() => {
    console.log('Bileşen monte edildi - Bu useEffect sadece bir kez çalışır');
    
    // Veri yükleme simülasyonu
    const veriYukle = async () => {
      setYukleniyor(true);
      setHata(null);
      
      try {
        // Gerçek bir API çağrısı yerine setTimeout kullanarak simüle ediyoruz
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Örnek veri
        const ornekVeri = {
          mesaj: 'Veri başarıyla yüklendi!',
          zaman: new Date().toLocaleTimeString()
        };
        
        setVeri(ornekVeri);
        setYukleniyor(false);
      } catch (error) {
        setHata('Veri yüklenirken bir hata oluştu');
        setYukleniyor(false);
      }
    };
    
    veriYukle();
  }, []); // Boş bağımlılık dizisi, sadece bir kez çalışmasını sağlar
  
  // Örnek 4: Temizleme fonksiyonu içeren useEffect (bileşen kaldırıldığında)
  // (componentDidMount + componentWillUnmount kombinasyonuna karşılık gelir)
  useEffect(() => {
    // Pencere boyutu değiştiğinde çalışacak fonksiyon
    const handleResize = () => {
      setPencereBoyutu({
        genislik: window.innerWidth,
        yukseklik: window.innerHeight
      });
      console.log('Pencere boyutu güncellendi');
    };
    
    // Event listener'ı ekle (componentDidMount benzeri)
    window.addEventListener('resize', handleResize);
    
    // Temizleme fonksiyonu (componentWillUnmount benzeri)
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('Event listener kaldırıldı');
    };
  }, []); // Sadece bir kez ekle ve bileşen kaldırıldığında temizle
  
  return (
    <div className="page-container">
      <h1>useEffect Hook</h1>
      <p>Bu sayfa, React'ta useEffect hook'unun kullanımını göstermektedir.</p>
      
      <div className="component-container">
        <h2>Sayaç Örneği</h2>
        <p>Sayaç değeri değiştiğinde sayfa başlığı güncellenir.</p>
        <div className="sayac-container">
          <p>Şu anki sayı: {sayac}</p>
          <div>
            <button onClick={() => setSayac(sayac - 1)}>Azalt</button>
            <button onClick={() => setSayac(0)} style={{ margin: '0 10px' }}>Sıfırla</button>
            <button onClick={() => setSayac(sayac + 1)}>Artır</button>
          </div>
        </div>
        <p className="note">Not: Tarayıcı sekmesinin başlığını kontrol edin ve konsolu açın.</p>
      </div>
      
      <div className="component-container">
        <h2>Veri Yükleme Örneği</h2>
        <p>Bileşen yüklendiğinde otomatik olarak veri yüklenir.</p>
        
        {yukleniyor && <p className="loading">Yükleniyor...</p>}
        
        {hata && <p className="error">{hata}</p>}
        
        {veri && (
          <div className="data-container">
            <p><strong>Mesaj:</strong> {veri.mesaj}</p>
            <p><strong>Zaman:</strong> {veri.zaman}</p>
          </div>
        )}
      </div>
      
      <div className="component-container">
        <h2>Pencere Boyutu Örneği</h2>
        <p>Pencere boyutu değiştiğinde otomatik olarak güncellenir.</p>
        <div className="window-size">
          <p><strong>Genişlik:</strong> {pencereBoyutu.genislik}px</p>
          <p><strong>Yükseklik:</strong> {pencereBoyutu.yukseklik}px</p>
        </div>
        <p className="note">Not: Tarayıcı penceresinin boyutunu değiştirin ve değerlerin güncellendiğini görün.</p>
      </div>
      
      <div className="explanation">
        <h2>useEffect Hook Nedir?</h2>
        <p>
          useEffect, React bileşenlerinde yan etkileri (side effects) yönetmek için kullanılan bir hook'tur.
          Yan etkiler, veri çekme, abonelikler, DOM manipülasyonu gibi bileşenin ana render işlevinin dışında
          gerçekleşen işlemlerdir.
        </p>
        
        <h3>Temel Kullanım:</h3>
        <pre>
          {`useEffect(() => { 
  // Yan etki kodu
  return () => { 
    // Temizleme kodu (opsiyonel) 
  };
}, [bağımlılıklar]);`}
        </pre>
        
        <h3>Bağımlılık Dizisi Kullanımı ve Class Bileşenlerindeki Karşılıkları:</h3>
        <ol>
          <li>
            <strong>Bağımlılık dizisi olmadan:</strong> <code>{`useEffect(() => { ... });`}</code>
            <p>Her render sonrası çalışır. (componentDidMount + componentDidUpdate)</p>
            <p className="lifecycle-note">Class bileşenlerinde, hem ilk render sonrası hem de her güncellemede çalışması için componentDidMount ve componentDidUpdate metodlarını birlikte kullanmanız gerekirdi.</p>
          </li>
          <li>
            <strong>Boş bağımlılık dizisi ile:</strong> <code>{`useEffect(() => { ... }, []);`}</code>
            <p>Sadece bileşen monte edildiğinde bir kez çalışır. (componentDidMount)</p>
            <p className="lifecycle-note">Class bileşenlerinde, sadece ilk render sonrası çalışması için componentDidMount metodunu kullanırdınız.</p>
          </li>
          <li>
            <strong>Bağımlılıklar ile:</strong> <code>{`useEffect(() => { ... }, [state1, state2]);`}</code>
            <p>Belirtilen state'ler değiştiğinde çalışır. (componentDidUpdate + koşullu kontrol)</p>
            <p className="lifecycle-note">Class bileşenlerinde, belirli prop veya state değişikliklerinde çalışması için componentDidUpdate içinde koşullu kontroller yapmanız gerekirdi:</p>
            <pre>
              {`componentDidUpdate(prevProps, prevState) {
  if (prevState.state1 !== this.state.state1 || 
      prevState.state2 !== this.state.state2) {
    // Kod burada
  }
}`}
            </pre>
          </li>
        </ol>
        
        <h3>Temizleme Fonksiyonu:</h3>
        <p>
          useEffect içinden bir fonksiyon döndürerek temizleme işlemleri yapabilirsiniz.
          Bu fonksiyon, bileşen kaldırıldığında veya effect yeniden çalışmadan önce çalışır.
          (componentWillUnmount + yeni effect çalışmadan önceki temizlik)
        </p>
        <pre>
          {`useEffect(() => { 
  // Effect kodu (componentDidMount benzeri)
  window.addEventListener('resize', handleResize);
  
  // Temizleme fonksiyonu (componentWillUnmount benzeri)
  return () => { 
    window.removeEventListener('resize', handleResize);
  };
}, []);`}
        </pre>
        <p className="lifecycle-note">Class bileşenlerinde, bileşen kaldırılmadan önce temizlik işlemleri yapmak için componentWillUnmount metodunu kullanırdınız:</p>
        <pre>
          {`componentDidMount() {
  window.addEventListener('resize', this.handleResize);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.handleResize);
}`}
        </pre>
        
        <h3>useEffect vs Class Yaşam Döngüsü Metodları - Önemli Farklar:</h3>
        <ul>
          <li>
            <strong>Daha Deklaratif Yaklaşım:</strong> useEffect, ilgili kodları bir arada tutmanızı sağlar. Class bileşenlerinde, ilişkili kodlar componentDidMount, componentDidUpdate ve componentWillUnmount arasında bölünmek zorundaydı.
          </li>
          <li>
            <strong>Daha İyi Kod Organizasyonu:</strong> Farklı işlevler için birden fazla useEffect kullanabilirsiniz, böylece ilgili kodlar bir arada kalır.
          </li>
          <li>
            <strong>Bağımlılık Sistemi:</strong> useEffect'in bağımlılık dizisi, hangi değişikliklerin efekti tetikleyeceğini açıkça belirtmenizi sağlar ve gereksiz yeniden çalışmaları önler.
          </li>
          <li>
            <strong>Temizleme Mekanizması:</strong> useEffect'in temizleme fonksiyonu, hem bileşen kaldırıldığında hem de effect yeniden çalışmadan önce çalışır. Bu, class bileşenlerinde elde edilmesi zor olan bir davranıştır.
          </li>
        </ul>
        
        <h3>Yaygın Kullanım Alanları:</h3>
        <ul>
          <li>Veri çekme (API istekleri)</li>
          <li>Event listener'ları yönetme</li>
          <li>DOM manipülasyonu</li>
          <li>Timer'lar ve interval'lar</li>
          <li>Bileşen yaşam döngüsü olaylarını takip etme</li>
        </ul>
      </div>
      
      <Link to="/" className="home-link">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default UseEffectSayfasi; 