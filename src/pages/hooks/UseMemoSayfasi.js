import React, { useState, useMemo, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

/**
 * UseMemoSayfasi bileşeni
 * 
 * Bu sayfa, useMemo hook'unun nasıl kullanıldığını gösterir.
 * useMemo, hesaplama yoğun işlemlerin sonuçlarını önbelleğe alarak
 * gereksiz yeniden hesaplamaları önler.
 */
function UseMemoSayfasi() {
  // ThemeContext'ten tema durumunu alıyoruz
  const { darkMode } = useContext(ThemeContext);
  
  // State tanımlamaları
  const [sayilar, setSayilar] = useState([10, 20, 30, 40, 50]);
  const [artan, setArtan] = useState(0);
  const [text, setText] = useState('');
  
  // Yeni sayı eklemek için kullanılan fonksiyon
  const sayiEkle = () => {
    const yeniSayi = Math.floor(Math.random() * 100) + 1;
    setSayilar([...sayilar, yeniSayi]);
  };
  
  // Gereksiz bir state güncellemesi için kullanılan fonksiyon
  const artir = () => {
    setArtan(artan + 1);
  };
  
  // useMemo OLMADAN hesaplama (her render'da tekrar çalışır)
  const hesaplamaYap = (nums) => {
    console.log('Hesaplama yapılıyor...');
    // Ağır bir hesaplama işlemini simüle etmek için
    const baslangic = performance.now();
    while (performance.now() - baslangic < 100) {
      // 100ms bekle (ağır işlem simülasyonu)
    }
    return nums.reduce((toplam, sayi) => toplam + sayi, 0);
  };
  
  // Normal hesaplama (her render'da tekrar çalışır)
  const normalToplam = hesaplamaYap(sayilar);
  
  // useMemo ILE hesaplama (sadece sayilar değiştiğinde çalışır)
  const memoizeToplam = useMemo(() => {
    return hesaplamaYap(sayilar);
  }, [sayilar]); // Bağımlılık dizisi: sadece sayilar değiştiğinde yeniden hesaplanır
  
  // Karmaşık bir nesne örneği
  const karmasikNesne = { id: 1, name: 'Örnek' };
  
  // useMemo ile referans kararlılığı sağlama
  const memoizeNesne = useMemo(() => {
    return karmasikNesne;
  }, []); // Boş bağımlılık dizisi: sadece ilk render'da oluşturulur
  
  return (
    <div className="page-container" style={{ 
      backgroundColor: darkMode ? '#222' : '#fff',
      color: darkMode ? '#fff' : '#333',
      padding: '20px',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <h1 style={{ 
        color: darkMode ? '#fff' : '#333',
        borderBottom: `2px solid ${darkMode ? '#fff' : '#333'}`
      }}>
        useMemo Hook Örneği
      </h1>
      
      <div className="explanation">
        <h2>useMemo Nedir?</h2>
        <p>
          <code>useMemo</code>, React'ta hesaplama yoğun işlemlerin sonuçlarını önbelleğe almak (memoize etmek) için kullanılan bir hook'tur.
          Bu hook, gereksiz hesaplamaları önleyerek uygulamanın performansını artırır.
        </p>
        <p>
          <code>useMemo</code> iki parametre alır:
        </p>
        <ol>
          <li>Hesaplama yapan bir fonksiyon</li>
          <li>Bağımlılık dizisi (dependency array)</li>
        </ol>
        <p>
          <code>useMemo</code>, bağımlılık dizisindeki değerler değiştiğinde hesaplamayı yeniden yapar.
          Eğer bağımlılıklar değişmezse, önceki hesaplanan değeri kullanır ve gereksiz hesaplamalardan kaçınır.
        </p>
        <pre>
{`const memoizedValue = useMemo(() => {
  // Hesaplama yapan fonksiyon
  return computeExpensiveValue(a, b);
}, [a, b]); // Bağımlılık dizisi`}
        </pre>
      </div>
      
      <div className="component-container">
        <h2>Hesaplama Örneği</h2>
        <p>Mevcut Sayılar: {sayilar.join(', ')}</p>
        <p>Normal Toplam (Her render'da hesaplanır): {normalToplam}</p>
        <p>Memoize Toplam (Sadece sayilar değiştiğinde hesaplanır): {memoizeToplam}</p>
        
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={sayiEkle}
            style={{
              backgroundColor: darkMode ? '#444' : '#0066cc',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Yeni Sayı Ekle
          </button>
          
          <button 
            onClick={artir}
            style={{
              backgroundColor: darkMode ? '#444' : '#0066cc',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Gereksiz Render ({artan})
          </button>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Yazın (render'ı tetikler)"
            style={{
              padding: '8px',
              width: '100%',
              maxWidth: '300px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div className="note" style={{ marginTop: '20px' }}>
          <p>
            <strong>Not:</strong> Console'u açarak "Hesaplama yapılıyor..." mesajını izleyin. 
            "Gereksiz Render" butonuna tıkladığınızda veya input'a yazı yazdığınızda, 
            normal toplam her seferinde yeniden hesaplanırken, memoize toplam hesaplanmaz.
          </p>
        </div>
      </div>
      
      <div className="explanation">
        <h2>useMemo Ne Zaman Kullanılmalı?</h2>
        <p>useMemo hook'u aşağıdaki durumlarda kullanılmalıdır:</p>
        <ol>
          <li>
            <strong>Hesaplama yoğun işlemler:</strong> Karmaşık hesaplamalar, büyük dizilerin filtrelenmesi, 
            sıralanması veya dönüştürülmesi gibi işlemler için.
          </li>
          <li>
            <strong>Referans kararlılığı (reference stability):</strong> Child bileşenlere prop olarak geçirilen 
            nesnelerin veya dizilerin referans kararlılığını sağlamak için.
          </li>
        </ol>
        <p>
          <strong>Dikkat:</strong> useMemo'yu her yerde kullanmak doğru değildir. Basit hesaplamalar için 
          useMemo kullanmak, sağladığı performans kazancından daha fazla ek yük getirebilir.
        </p>
      </div>
      
      <div className="component-container">
        <h2>Referans Kararlılığı Örneği</h2>
        <p>
          Child bileşenlere geçirilen nesneler veya diziler, her render'da yeniden oluşturulur.
          Bu, React.memo veya shouldComponentUpdate ile optimize edilmiş bileşenlerin gereksiz yere 
          yeniden render edilmesine neden olabilir.
        </p>
        <pre>
{`// Her render'da yeni bir referans oluşturulur
const karmasikNesne = { id: 1, name: 'Örnek' };

// useMemo ile referans kararlılığı sağlanır
const memoizeNesne = useMemo(() => {
  return { id: 1, name: 'Örnek' };
}, []); // Boş bağımlılık dizisi: sadece ilk render'da oluşturulur`}
        </pre>
        <p>
          <strong>Örnek Kullanım:</strong> Bir child bileşene geçirilen filtreleme veya sıralama 
          fonksiyonlarının sonuçları için useMemo kullanılabilir.
        </p>
      </div>
      
      <div className="explanation">
        <h2>useMemo vs useCallback</h2>
        <p>
          <code>useMemo</code> ve <code>useCallback</code> benzer görünse de farklı amaçlara hizmet eder:
        </p>
        <ul>
          <li>
            <strong>useMemo:</strong> Bir değeri (hesaplama sonucunu) önbelleğe alır.
          </li>
          <li>
            <strong>useCallback:</strong> Bir fonksiyonu önbelleğe alır.
          </li>
        </ul>
        <p>
          <code>useCallback(fn, deps)</code> aslında <code>useMemo(() {'=>'} fn, deps)</code> ile eşdeğerdir.
        </p>
      </div>
      
      <div className="note" style={{ marginTop: '30px' }}>
        <p>
          <strong>Performans İpucu:</strong> useMemo kullanmadan önce, gerçekten bir performans sorunu olup olmadığını 
          ölçün. Erken optimizasyon, kodun okunabilirliğini ve bakımını zorlaştırabilir.
        </p>
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <a 
          href="/" 
          className="home-link"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: darkMode ? '#444' : '#0066cc',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}
        >
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
}

export default UseMemoSayfasi; 