import logo from './logo.svg';
import './App.css';
import Merhaba from './components/Merhaba';
import Sayac from './components/Sayac';
import TodoList from './components/TodoList';
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
        
        {/* 
          TodoList bileşeni, React'ta daha karmaşık bir uygulama örneğidir.
          Bu bileşen şunları göstermektedir:
          
          1. Çoklu State Kullanımı: Birden fazla state değişkeni kullanma
          2. Form Yönetimi: Kullanıcı girdisini alma ve işleme
          3. Liste Render Etme: Dinamik olarak liste öğelerini oluşturma
          4. CRUD İşlemleri: Veri ekleme, okuma, güncelleme ve silme işlemleri
          5. Event Handling: Kullanıcı etkileşimlerini yönetme
          
          TodoList, React'ın temel kavramlarını bir arada kullanarak
          gerçek dünya uygulamalarının nasıl oluşturulduğunu gösterir.
        */}
        <TodoList />
      </header>
      
    </div>
  );
}

// App bileşenini dışa aktarıyoruz, böylece index.js dosyasında kullanılabilir
export default App;
