import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

// Başlık bileşeni - Context'ten tema bilgisini alır
const Baslik = () => {
  // useContext hook'u ile ThemeContext'ten değerleri alıyoruz
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <h1 style={{ 
      color: darkMode ? '#fff' : '#333',
      borderBottom: `2px solid ${darkMode ? '#fff' : '#333'}`
    }}>
      useContext Hook Örneği
    </h1>
  );
};

// İçerik bileşeni - Context'ten tema bilgisini alır
const Icerik = () => {
  // useContext hook'u ile ThemeContext'ten değerleri alıyoruz
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className="content">
      <p style={{ color: darkMode ? '#ddd' : '#555' }}>
        useContext hook'u, React bileşenleri arasında prop drilling yapmadan veri paylaşmanızı sağlar.
        Bu örnekte, tema durumu (açık/koyu) tüm bileşenler arasında paylaşılıyor.
      </p>
      
      <div className="info-box" style={{ 
        backgroundColor: darkMode ? '#444' : '#f0f0f0',
        color: darkMode ? '#ddd' : '#333',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h3>useContext Nasıl Çalışır?</h3>
        <ol>
          <li>createContext() ile bir context oluşturulur</li>
          <li>Context.Provider ile değer sağlanır</li>
          <li>useContext hook'u ile değer tüketilir</li>
        </ol>
        <p>
          Bu yapı sayesinde, prop'ları her seviyede manuel olarak geçirmek zorunda kalmadan,
          bileşen ağacının derinliklerindeki bileşenlere veri aktarabilirsiniz.
        </p>
      </div>
    </div>
  );
};

// Tema değiştirme butonu - Context'ten tema değiştirme fonksiyonunu alır
const TemaButonu = () => {
  // useContext hook'u ile ThemeContext'ten değerleri alıyoruz
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      style={{
        backgroundColor: darkMode ? '#fff' : '#333',
        color: darkMode ? '#333' : '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px'
      }}
    >
      {darkMode ? 'Açık Tema' : 'Koyu Tema'}
    </button>
  );
};

/**
 * UseContextSayfasi bileşeni
 * 
 * Bu sayfa, useContext hook'unun nasıl kullanıldığını gösterir.
 * Tema değiştirme örneği üzerinden Context API kullanımını açıklar.
 */
function UseContextSayfasi() {
  // useContext hook'u ile ThemeContext'ten değerleri alıyoruz
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className="page-container" style={{ 
      backgroundColor: darkMode ? '#222' : '#fff',
      color: darkMode ? '#fff' : '#333',
      padding: '20px',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <Baslik />
      <Icerik />
      <TemaButonu />
      
      <div className="explanation" style={{ 
        marginTop: '40px',
        padding: '20px',
        backgroundColor: darkMode ? '#333' : '#f9f9f9',
        borderRadius: '5px'
      }}>
        <h2>useContext Hook'u Nedir?</h2>
        <p>
          useContext, React'ta bileşenler arasında veri paylaşımını kolaylaştıran bir hook'tur.
          Context API ile birlikte kullanılarak, prop drilling sorununu çözer.
        </p>
        
        <h3>Bu Örnekte Context Nasıl Kullanılıyor?</h3>
        <div className="code-explanation">
          <p><strong>1. Context Oluşturma:</strong> İlk olarak <code>ThemeContext.js</code> dosyasında bir context oluşturduk:</p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`// src/contexts/ThemeContext.js
import React, { createContext, useState } from 'react';

// Context'i oluşturuyoruz
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Tema durumunu tutacak state
  const [darkMode, setDarkMode] = useState(false);

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Context değeri olarak tema durumu ve değiştirme fonksiyonunu sağlıyoruz
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};`}
          </pre>
          
          <p><strong>2. Provider ile Sarmalama:</strong> <code>App.js</code> dosyasında tüm uygulamayı ThemeProvider ile sarmaladık:</p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`// src/App.js
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* ... diğer bileşenler ... */}
      </Router>
    </ThemeProvider>
  );
}`}
          </pre>
          
          <p><strong>3. Context Değerlerini Kullanma:</strong> Bu sayfadaki farklı bileşenlerde useContext hook'u ile değerlere erişiyoruz:</p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`// Başlık bileşeni örneği
const Baslik = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <h1 style={{ color: darkMode ? '#fff' : '#333' }}>
      useContext Hook Örneği
    </h1>
  );
};

// TemaButonu bileşeni örneği
const TemaButonu = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={toggleTheme}>
      {darkMode ? 'Açık Tema' : 'Koyu Tema'}
    </button>
  );
};`}
          </pre>
        </div>
        
        <h3>Bileşen Hiyerarşisi ve Veri Akışı</h3>
        <p>
          Bu örnekte bileşen hiyerarşisi şu şekildedir:
        </p>
        <pre style={{ 
          backgroundColor: darkMode ? '#444' : '#f5f5f5',
          color: darkMode ? '#ddd' : '#333',
          padding: '10px',
          borderRadius: '5px',
          overflow: 'auto'
        }}>
{`ThemeProvider (src/contexts/ThemeContext.js)
  └── App (src/App.js)
       └── UseContextSayfasi (src/pages/UseContextSayfasi.js)
            ├── Baslik
            ├── Icerik
            └── TemaButonu`}
        </pre>
        
        <p>
          <strong>Veri Akışı:</strong> ThemeProvider, darkMode state'ini ve toggleTheme fonksiyonunu context değeri olarak sağlar.
          Tüm alt bileşenler (Baslik, Icerik, TemaButonu) useContext hook'u ile bu değerlere doğrudan erişebilir.
          Bu sayede, prop'ları her seviyede manuel olarak geçirmek zorunda kalmayız.
        </p>
        
        <p>
          <strong>Prop Drilling Olmadan:</strong> Context kullanmasaydık, tema durumunu şu şekilde iletmemiz gerekirdi:
        </p>
        <pre style={{ 
          backgroundColor: darkMode ? '#444' : '#f5f5f5',
          color: darkMode ? '#ddd' : '#333',
          padding: '10px',
          borderRadius: '5px',
          overflow: 'auto'
        }}>
{`// Context olmadan prop drilling örneği
function UseContextSayfasi() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);
  
  return (
    <div>
      <Baslik darkMode={darkMode} />
      <Icerik darkMode={darkMode} />
      <TemaButonu darkMode={darkMode} toggleTheme={toggleTheme} />
    </div>
  );
}`}
        </pre>
        
        <h3>Ne Zaman Kullanılır?</h3>
        <ul>
          <li>Tema (açık/koyu mod) gibi global ayarlar için</li>
          <li>Kullanıcı bilgileri (oturum durumu) için</li>
          <li>Dil/lokalizasyon ayarları için</li>
          <li>Bileşen ağacının farklı seviyelerinde aynı verilere erişim gerektiğinde</li>
        </ul>
        
        <h3>Avantajları</h3>
        <ul>
          <li>Prop drilling'i önler</li>
          <li>Kod okunabilirliğini artırır</li>
          <li>Bileşenler arası veri paylaşımını kolaylaştırır</li>
        </ul>
        
        <h3>Dezavantajları</h3>
        <ul>
          <li>Aşırı kullanımı bileşen yeniden kullanılabilirliğini azaltabilir</li>
          <li>Büyük uygulamalarda performans sorunlarına yol açabilir</li>
          <li>Hata ayıklamayı zorlaştırabilir</li>
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

export default UseContextSayfasi; 