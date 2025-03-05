import React, { useState, useCallback, useContext, memo } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

/**
 * React.memo ile sarılmış Child bileşeni
 * Bu bileşen, sadece props değiştiğinde yeniden render edilir
 */
const ChildComponent = memo(function ChildComponent({ name, count, onClick }) {
  console.log(`ChildComponent render edildi - ${name}`);
  
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      margin: '10px 0',
      borderRadius: '4px'
    }}>
      <p>İsim: {name}</p>
      <p>Sayaç: {count}</p>
      <button 
        onClick={onClick}
        style={{
          padding: '5px 10px',
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Artır
      </button>
    </div>
  );
});

/**
 * React.memo ile sarılmamış normal Child bileşeni
 * Bu bileşen, parent her render edildiğinde yeniden render edilir
 */
function RegularChildComponent({ name, count, onClick }) {
  console.log(`RegularChildComponent render edildi - ${name}`);
  
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      margin: '10px 0',
      borderRadius: '4px'
    }}>
      <p>İsim: {name}</p>
      <p>Sayaç: {count}</p>
      <button 
        onClick={onClick}
        style={{
          padding: '5px 10px',
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Artır
      </button>
    </div>
  );
}

/**
 * Özel karşılaştırma fonksiyonu ile React.memo kullanımı
 */
const CustomMemoComponent = memo(
  function CustomMemoComponent({ user, onClick }) {
    console.log(`CustomMemoComponent render edildi - ${user.name}`);
    
    return (
      <div style={{ 
        border: '1px solid #ccc', 
        padding: '10px', 
        margin: '10px 0',
        borderRadius: '4px'
      }}>
        <p>İsim: {user.name}</p>
        <p>Yaş: {user.age}</p>
        <button 
          onClick={onClick}
          style={{
            padding: '5px 10px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Yaşı Artır
        </button>
      </div>
    );
  },
  // Özel karşılaştırma fonksiyonu
  (prevProps, nextProps) => {
    // Sadece user.age değiştiğinde render et, user.name değiştiğinde render etme
    return prevProps.user.age === nextProps.user.age;
  }
);

/**
 * ReactMemoSayfasi bileşeni
 * 
 * Bu sayfa, React.memo'nun nasıl kullanıldığını gösterir.
 * React.memo, fonksiyonel bileşenleri memoize ederek gereksiz render'ları önler.
 */
function ReactMemoSayfasi() {
  // ThemeContext'ten tema durumunu alıyoruz
  const { darkMode } = useContext(ThemeContext);
  
  // State tanımlamaları
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState({ name: 'Ahmet', age: 30 });
  
  // Normal fonksiyon (her render'da yeniden oluşturulur)
  const handleClick1 = () => {
    setCount1(count1 + 1);
  };
  
  // useCallback ile memoize edilmiş fonksiyon
  const handleClick2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]); // count2 değiştiğinde yeniden oluşturulur
  
  // Kullanıcının yaşını artırmak için fonksiyon
  const handleAgeIncrease = useCallback(() => {
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  }, []);
  
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
        React.memo Örneği
      </h1>
      
      <div className="explanation">
        <h2>React.memo Nedir?</h2>
        <p>
          <code>React.memo</code>, fonksiyonel bileşenleri memoize etmek (önbelleğe almak) için kullanılan bir higher-order component'tir.
          Bu, bileşenin props'ları değişmediği sürece yeniden render edilmesini önler.
        </p>
        <p>
          <code>React.memo</code>, class bileşenlerindeki <code>PureComponent</code> veya <code>shouldComponentUpdate</code> 
          metoduna benzer bir işlev görür, ancak fonksiyonel bileşenler için tasarlanmıştır.
        </p>
        <pre>
{`const MemoizedComponent = React.memo(function MyComponent(props) {
  // Bileşen kodları
});`}
        </pre>
        <p>
          <code>React.memo</code>, varsayılan olarak props'ların yüzeysel (shallow) karşılaştırmasını yapar.
          Daha karmaşık karşılaştırmalar için ikinci bir parametre olarak özel bir karşılaştırma fonksiyonu alabilir.
        </p>
        <pre>
{`const MemoizedComponent = React.memo(
  function MyComponent(props) {
    // Bileşen kodları
  },
  (prevProps, nextProps) => {
    // true döndürürse render edilmez, false döndürürse render edilir
    return prevProps.someValue === nextProps.someValue;
  }
);`}
        </pre>
      </div>
      
      <div className="component-container">
        <h2>React.memo Örneği</h2>
        <p>
          Aşağıda, biri <code>React.memo</code> ile sarılmış, diğeri normal olan iki child bileşen bulunmaktadır.
          Input'a yazı yazdığınızda, parent bileşen yeniden render edilir, ancak <code>React.memo</code> ile sarılmış 
          bileşen sadece kendi props'ları değiştiğinde render edilir.
        </p>
        
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Yazın (parent render'ı tetikler)"
            style={{
              padding: '8px',
              width: '100%',
              maxWidth: '300px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '10px'
            }}
          />
          <p>Input Değeri: {inputValue}</p>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3>React.memo ile Sarılmış Bileşen</h3>
            <p>Bu bileşen sadece props'ları değiştiğinde render edilir.</p>
            <ChildComponent 
              name="Memoized Child" 
              count={count1} 
              onClick={handleClick1} 
            />
          </div>
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3>Normal Bileşen</h3>
            <p>Bu bileşen parent her render edildiğinde render edilir.</p>
            <RegularChildComponent 
              name="Regular Child" 
              count={count2} 
              onClick={handleClick2} 
            />
          </div>
        </div>
        
        <div className="note" style={{ marginTop: '20px' }}>
          <p>
            <strong>Not:</strong> Console'u açarak render mesajlarını izleyin. 
            Input'a yazı yazdığınızda, normal bileşen her seferinde render edilirken, 
            memoize edilmiş bileşen sadece count1 değiştiğinde render edilir.
          </p>
        </div>
      </div>
      
      <div className="explanation">
        <h2>React.memo ve Referans Kararlılığı</h2>
        <p>
          <code>React.memo</code> kullanırken dikkat edilmesi gereken önemli bir nokta, 
          bileşene geçirilen fonksiyonların ve nesnelerin referans kararlılığıdır.
        </p>
        <p>
          Her render'da yeniden oluşturulan fonksiyonlar ve nesneler, <code>React.memo</code>'nun 
          etkisini azaltabilir çünkü her seferinde yeni bir referans oluşturulur ve bileşen gereksiz yere render edilir.
        </p>
        <p>
          Bu sorunu çözmek için <code>useCallback</code> ve <code>useMemo</code> hook'larını kullanabilirsiniz:
        </p>
        <ul>
          <li><code>useCallback</code>: Fonksiyonları memoize etmek için</li>
          <li><code>useMemo</code>: Nesneleri ve hesaplama sonuçlarını memoize etmek için</li>
        </ul>
      </div>
      
      <div className="component-container">
        <h2>Özel Karşılaştırma Fonksiyonu Örneği</h2>
        <p>
          Aşağıdaki bileşen, özel bir karşılaştırma fonksiyonu ile <code>React.memo</code> kullanmaktadır.
          Bu fonksiyon, sadece <code>user.age</code> değiştiğinde bileşenin render edilmesini sağlar,
          <code>user.name</code> değiştiğinde render edilmez.
        </p>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="İsim değiştir"
              style={{
                padding: '8px',
                width: '150px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            <button
              onClick={handleAgeIncrease}
              style={{
                padding: '8px 16px',
                backgroundColor: darkMode ? '#444' : '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Yaşı Artır
            </button>
          </div>
          <p>Kullanıcı: {user.name}, Yaş: {user.age}</p>
        </div>
        
        <CustomMemoComponent user={user} onClick={handleAgeIncrease} />
        
        <div className="note" style={{ marginTop: '20px' }}>
          <p>
            <strong>Not:</strong> İsim değiştirdiğinizde bileşen render edilmez, 
            ancak "Yaşı Artır" butonuna tıkladığınızda render edilir. 
            Console'u açarak render mesajlarını izleyin.
          </p>
        </div>
      </div>
      
      <div className="explanation">
        <h2>React.memo Ne Zaman Kullanılmalı?</h2>
        <p>React.memo'yu aşağıdaki durumlarda kullanmak faydalı olabilir:</p>
        <ol>
          <li>
            <strong>Saf render bileşenleri:</strong> Sadece props'larına bağlı olarak render edilen ve 
            kendi state'i olmayan bileşenler için.
          </li>
          <li>
            <strong>Render maliyeti yüksek bileşenler:</strong> Karmaşık hesaplamalar yapan veya 
            çok sayıda DOM elementi render eden bileşenler için.
          </li>
          <li>
            <strong>Sık sık yeniden render edilen bileşenler:</strong> Parent bileşenin sık sık 
            render edildiği durumlarda child bileşenleri optimize etmek için.
          </li>
        </ol>
        <p>
          <strong>Dikkat:</strong> React.memo'yu her bileşende kullanmak doğru değildir. 
          Basit bileşenler için React.memo kullanmak, sağladığı performans kazancından daha fazla ek yük getirebilir.
        </p>
      </div>
      
      <div className="note" style={{ marginTop: '30px' }}>
        <p>
          <strong>Performans İpucu:</strong> React.memo, useCallback ve useMemo'yu birlikte kullanarak 
          uygulamanızın performansını önemli ölçüde artırabilirsiniz. Ancak erken optimizasyondan kaçının 
          ve gerçekten bir performans sorunu olduğunda bu araçları kullanın.
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

export default ReactMemoSayfasi; 