import logo from './logo.svg';
import './App.css';
import Merhaba from './components/Merhaba';

/**
 * App Bileşeni
 * 
 * Bu, uygulamanın ana bileşenidir. Genellikle diğer bileşenleri içerir ve
 * uygulamanın genel yapısını oluşturur.
 * 
 * React uygulamaları, iç içe geçmiş bileşenlerden oluşan bir ağaç yapısına sahiptir.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* 
          Merhaba bileşenini kullanıyoruz ve ona 'isim' adında bir prop gönderiyoruz.
          Props, bileşenlere veri aktarmanın yoludur.
          Burada "React Geliştirici" değerini Merhaba bileşenine gönderiyoruz.
        */}
        <Merhaba isim="React Geliştirici" />
        <p>
          Bu bir React uygulamasıdır.
        </p>
      </header>
    </div>
  );
}

// App bileşenini dışa aktarıyoruz, böylece index.js dosyasında kullanılabilir
export default App;
