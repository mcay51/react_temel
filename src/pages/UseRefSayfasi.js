import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * UseRefSayfasi bileşeni
 * 
 * Bu sayfa, useRef hook'unun nasıl kullanıldığını gösterir.
 * useRef'in iki temel kullanım alanını örnekler:
 * 1. DOM elemanlarına doğrudan erişim
 * 2. Render'lar arasında değerleri saklama
 */
function UseRefSayfasi() {
  // ThemeContext'ten tema durumunu alıyoruz
  const { darkMode } = useContext(ThemeContext);
  
  // DOM elemanına referans için useRef kullanımı
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  
  // Render'lar arasında değer saklamak için useRef kullanımı
  const renderCountRef = useRef(0);
  const previousValueRef = useRef('');
  
  // Input değerini tutacak state
  const [inputValue, setInputValue] = useState('');
  // Video oynatma durumunu tutacak state
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Her render'da render sayısını artır
  useEffect(() => {
    renderCountRef.current = renderCountRef.current + 1;
  });
  
  // inputValue değiştiğinde önceki değeri sakla
  useEffect(() => {
    previousValueRef.current = inputValue;
  }, [inputValue]);
  
  // Input'a odaklanma fonksiyonu
  const focusInput = () => {
    // useRef ile DOM elemanına erişip focus metodunu çağırıyoruz
    inputRef.current.focus();
  };
  
  // Video oynatma/durdurma fonksiyonu
  const toggleVideo = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
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
        useRef Hook Örneği
      </h1>
      
      <div className="content">
        <p style={{ color: darkMode ? '#ddd' : '#555' }}>
          useRef hook'u, DOM elemanlarına doğrudan erişim sağlamak ve render'lar arasında değerleri saklamak için kullanılır.
          Bu örnekte, useRef'in iki temel kullanım alanını göreceğiz.
        </p>
        
        <div className="example-section" style={{ 
          backgroundColor: darkMode ? '#333' : '#f5f5f5',
          padding: '20px',
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <h2>1. DOM Elemanlarına Erişim</h2>
          
          <div className="input-example" style={{ marginBottom: '20px' }}>
            <h3>Input Örneği</h3>
            <p>useRef ile bir input elemanına erişip odaklanabiliriz:</p>
            
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <input
                ref={inputRef} // DOM elemanına referans ekliyoruz
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Bir şeyler yazın..."
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                  backgroundColor: darkMode ? '#444' : '#fff',
                  color: darkMode ? '#fff' : '#333',
                  marginRight: '10px',
                  flex: 1
                }}
              />
              <button
                onClick={focusInput}
                style={{
                  padding: '8px 15px',
                  backgroundColor: darkMode ? '#555' : '#4a90e2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Odaklan
              </button>
            </div>
            
            <p>
              <strong>Mevcut değer:</strong> {inputValue || '(boş)'}
            </p>
            <p>
              <strong>Önceki değer:</strong> {previousValueRef.current || '(boş)'}
            </p>
          </div>
          
          <div className="video-example">
            <h3>Video Kontrolü Örneği</h3>
            <p>useRef ile bir video elemanını kontrol edebiliriz:</p>
            
            <div style={{ marginBottom: '10px' }}>
              <video
                ref={videoRef} // Video elemanına referans ekliyoruz
                width="100%"
                height="auto"
                style={{ borderRadius: '4px', maxHeight: '200px', backgroundColor: '#000' }}
                loop
              >
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
              </video>
              
              <button
                onClick={toggleVideo}
                style={{
                  display: 'block',
                  margin: '10px 0',
                  padding: '8px 15px',
                  backgroundColor: isPlaying ? (darkMode ? '#d32f2f' : '#e53935') : (darkMode ? '#388e3c' : '#43a047'),
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? 'Durdur' : 'Oynat'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="example-section" style={{ 
          backgroundColor: darkMode ? '#333' : '#f5f5f5',
          padding: '20px',
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <h2>2. Render'lar Arasında Değer Saklama</h2>
          
          <div className="render-count-example">
            <h3>Render Sayacı</h3>
            <p>
              useRef, bileşenin yeniden render edilmesine neden olmadan değerleri saklamak için kullanılabilir.
              Bu bileşen şu ana kadar <strong>{renderCountRef.current}</strong> kez render edildi.
            </p>
            <p>
              <em>Not: Input'a yazı yazdıkça veya video kontrolünü değiştirdikçe render sayısı artacaktır.</em>
            </p>
          </div>
          
          <div className="previous-value-example" style={{ marginTop: '20px' }}>
            <h3>Önceki Değeri Saklama</h3>
            <p>
              useRef, önceki state değerlerini saklamak için de kullanılabilir.
              Yukarıdaki input örneğinde, önceki değeri saklıyoruz ve gösteriyoruz.
            </p>
          </div>
        </div>
      </div>
      
      <div className="explanation" style={{ 
        marginTop: '40px',
        padding: '20px',
        backgroundColor: darkMode ? '#333' : '#f9f9f9',
        borderRadius: '5px'
      }}>
        <h2>useRef Hook'u Nedir?</h2>
        <p>
          useRef, React'ta iki temel amaç için kullanılan bir hook'tur:
        </p>
        <ol>
          <li>DOM elemanlarına doğrudan erişim sağlamak</li>
          <li>Render'lar arasında değerleri saklamak (state'i tetiklemeden)</li>
        </ol>
        
        <h3>useRef Nasıl Çalışır?</h3>
        <div className="code-explanation">
          <p><strong>1. useRef Hook'unu İçe Aktarma:</strong></p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`import React, { useRef } from 'react';`}
          </pre>
          
          <p><strong>2. Referans Oluşturma:</strong></p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`// Başlangıç değeri null olan bir ref oluşturma
const myRef = useRef(null);

// Başlangıç değeri olan bir ref oluşturma
const countRef = useRef(0);`}
          </pre>
          
          <p><strong>3. DOM Elemanına Referans Ekleme:</strong></p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`<input ref={myRef} type="text" />`}
          </pre>
          
          <p><strong>4. Referansa Erişme:</strong></p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`// DOM elemanına erişim
myRef.current.focus();

// Saklanan değere erişim
console.log(countRef.current);

// Değeri güncelleme
countRef.current = countRef.current + 1;`}
          </pre>
        </div>
        
        <h3>useRef vs useState</h3>
        <p>
          useRef ve useState arasındaki en önemli fark:
        </p>
        <ul>
          <li><strong>useState</strong>: Değer değiştiğinde bileşenin yeniden render edilmesine neden olur.</li>
          <li><strong>useRef</strong>: Değer değiştiğinde bileşenin yeniden render edilmesine neden <em>olmaz</em>.</li>
        </ul>
        
        <h3>Ne Zaman Kullanılır?</h3>
        <ul>
          <li>Form elemanlarına odaklanma, seçme veya ölçme</li>
          <li>Video/ses oynatmayı başlatma, durdurma</li>
          <li>Canvas üzerinde çizim yapma</li>
          <li>Önceki state değerlerini saklama</li>
          <li>Zamanlayıcıları (setInterval, setTimeout) saklama</li>
          <li>Render'lar arasında değerleri saklama (render'ı tetiklemeden)</li>
        </ul>
        
        <h3>Dikkat Edilmesi Gerekenler</h3>
        <ul>
          <li>useRef değeri değiştiğinde bileşen yeniden render edilmez</li>
          <li>useRef.current değerini render sırasında okuyabilirsiniz, ancak render sırasında değiştirmemelisiniz</li>
          <li>DOM manipülasyonları için useRef kullanırken, elemanın DOM'a mount edildiğinden emin olun</li>
        </ul>
      </div>
      
      <Link to="/" className="home-link" style={{
        display: 'inline-block',
        marginTop: '30px',
        color: darkMode ? '#61dafb' : '#0066cc',
        textDecoration: 'none'
      }}>
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}

export default UseRefSayfasi; 