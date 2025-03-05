import logo from './logo.svg';
import './App.css';
import Merhaba from './components/Merhaba';
import Sayac from './components/Sayac';
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
        {/* 
          Sayac bileşeni, React'taki state (durum) kavramını göstermektedir.
          State, bileşenin kendi içinde sakladığı ve değişebilen verilerdir.
          
          Sayac bileşeni kendi içinde bir sayı değeri tutar ve bu değeri
          artırabilir. State değiştiğinde bileşen otomatik olarak yeniden render edilir.
          
          Props ile veri aktarımından farklı olarak, state bileşenin kendi içinde
          yönetilir ve değiştirilebilir.
        */}
        <p><Sayac /></p>
      </header>
      
    </div>
  );
}

// App bileşenini dışa aktarıyoruz, böylece index.js dosyasında kullanılabilir
export default App;
