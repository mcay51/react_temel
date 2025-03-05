import React, { useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Alışveriş sepeti için reducer fonksiyonu
 * 
 * @param {object} state - Mevcut durum
 * @param {object} action - Gerçekleştirilecek eylem
 * @returns {object} - Yeni durum
 */
const sepetReducer = (state, action) => {
  switch (action.type) {
    case 'URUN_EKLE':
      // Ürün zaten sepette var mı kontrol et
      const urunVarMi = state.urunler.find(urun => urun.id === action.payload.id);
      
      if (urunVarMi) {
        // Ürün zaten varsa, miktarını artır
        return {
          ...state,
          urunler: state.urunler.map(urun => 
            urun.id === action.payload.id 
              ? { ...urun, miktar: urun.miktar + 1 } 
              : urun
          ),
          toplamFiyat: state.toplamFiyat + action.payload.fiyat
        };
      } else {
        // Ürün yoksa, yeni ürün olarak ekle
        return {
          ...state,
          urunler: [...state.urunler, { ...action.payload, miktar: 1 }],
          toplamFiyat: state.toplamFiyat + action.payload.fiyat
        };
      }
    
    case 'URUN_CIKAR':
      // Ürünü bul
      const urun = state.urunler.find(urun => urun.id === action.payload.id);
      
      if (!urun) return state; // Ürün yoksa state'i değiştirme
      
      if (urun.miktar === 1) {
        // Son ürünse, sepetten tamamen çıkar
        return {
          ...state,
          urunler: state.urunler.filter(urun => urun.id !== action.payload.id),
          toplamFiyat: state.toplamFiyat - action.payload.fiyat
        };
      } else {
        // Birden fazla varsa, miktarını azalt
        return {
          ...state,
          urunler: state.urunler.map(urun => 
            urun.id === action.payload.id 
              ? { ...urun, miktar: urun.miktar - 1 } 
              : urun
          ),
          toplamFiyat: state.toplamFiyat - action.payload.fiyat
        };
      }
    
    case 'SEPETI_TEMIZLE':
      // Sepeti tamamen temizle
      return {
        urunler: [],
        toplamFiyat: 0
      };
      
    default:
      return state;
  }
};

/**
 * Sayaç için basit bir reducer fonksiyonu
 * 
 * @param {number} state - Mevcut sayaç değeri
 * @param {object} action - Gerçekleştirilecek eylem
 * @returns {number} - Yeni sayaç değeri
 */
const sayacReducer = (state, action) => {
  switch (action.type) {
    case 'ARTIR':
      return state + (action.payload || 1);
    case 'AZALT':
      return state - (action.payload || 1);
    case 'SIFIRLA':
      return 0;
    default:
      return state;
  }
};

// Ürün listesi
const urunler = [
  { id: 1, isim: 'Laptop', fiyat: 5000, resim: '💻' },
  { id: 2, isim: 'Telefon', fiyat: 3000, resim: '📱' },
  { id: 3, isim: 'Tablet', fiyat: 2000, resim: '📟' },
  { id: 4, isim: 'Kulaklık', fiyat: 500, resim: '🎧' },
  { id: 5, isim: 'Fare', fiyat: 200, resim: '🖱️' }
];

/**
 * UseReducerSayfasi bileşeni
 * 
 * Bu sayfa, useReducer hook'unun nasıl kullanıldığını gösterir.
 * İki farklı örnek üzerinden useReducer'ın kullanımını açıklar:
 * 1. Basit bir sayaç örneği
 * 2. Karmaşık bir alışveriş sepeti örneği
 */
function UseReducerSayfasi() {
  // ThemeContext'ten tema durumunu alıyoruz
  const { darkMode } = useContext(ThemeContext);
  
  // Basit sayaç örneği için useReducer kullanımı
  const [sayac, sayacDispatch] = useReducer(sayacReducer, 0);
  
  // Alışveriş sepeti örneği için useReducer kullanımı
  const [sepet, sepetDispatch] = useReducer(sepetReducer, {
    urunler: [],
    toplamFiyat: 0
  });
  
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
        useReducer Hook Örneği
      </h1>
      
      <div className="content">
        <p style={{ color: darkMode ? '#ddd' : '#555' }}>
          useReducer hook'u, karmaşık state mantığı için useState'in alternatifidir.
          Redux benzeri bir state yönetimi sağlar ve birbiriyle ilişkili state'leri yönetmek için idealdir.
        </p>
        
        {/* Basit Sayaç Örneği */}
        <div className="example-section" style={{ 
          backgroundColor: darkMode ? '#333' : '#f5f5f5',
          padding: '20px',
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <h2>1. Basit Sayaç Örneği</h2>
          <p>
            Bu basit örnekte, bir sayacın değerini artırıp azaltmak için useReducer kullanıyoruz.
            Bu, useState ile de yapılabilir, ancak useReducer'ın nasıl çalıştığını göstermek için iyi bir başlangıç.
          </p>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '20px 0'
          }}>
            <button 
              onClick={() => sayacDispatch({ type: 'AZALT', payload: 5 })}
              style={{
                padding: '8px 15px',
                backgroundColor: darkMode ? '#d32f2f' : '#e53935',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              -5
            </button>
            
            <button 
              onClick={() => sayacDispatch({ type: 'AZALT' })}
              style={{
                padding: '8px 15px',
                backgroundColor: darkMode ? '#d32f2f' : '#e53935',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              -1
            </button>
            
            <span style={{ 
              fontSize: '24px', 
              margin: '0 20px',
              minWidth: '50px',
              textAlign: 'center'
            }}>
              {sayac}
            </span>
            
            <button 
              onClick={() => sayacDispatch({ type: 'ARTIR' })}
              style={{
                padding: '8px 15px',
                backgroundColor: darkMode ? '#388e3c' : '#43a047',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              +1
            </button>
            
            <button 
              onClick={() => sayacDispatch({ type: 'ARTIR', payload: 5 })}
              style={{
                padding: '8px 15px',
                backgroundColor: darkMode ? '#388e3c' : '#43a047',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              +5
            </button>
            
            <button 
              onClick={() => sayacDispatch({ type: 'SIFIRLA' })}
              style={{
                padding: '8px 15px',
                backgroundColor: darkMode ? '#555' : '#757575',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sıfırla
            </button>
          </div>
          
          <div className="code-example" style={{ 
            backgroundColor: darkMode ? '#444' : '#f0f0f0',
            padding: '15px',
            borderRadius: '5px',
            marginTop: '20px',
            overflow: 'auto'
          }}>
            <pre style={{ color: darkMode ? '#ddd' : '#333' }}>
{`// Sayaç reducer fonksiyonu
const sayacReducer = (state, action) => {
  switch (action.type) {
    case 'ARTIR':
      return state + (action.payload || 1);
    case 'AZALT':
      return state - (action.payload || 1);
    case 'SIFIRLA':
      return 0;
    default:
      return state;
  }
};

// useReducer kullanımı
const [sayac, sayacDispatch] = useReducer(sayacReducer, 0);

// Dispatch örnekleri
sayacDispatch({ type: 'ARTIR' });          // +1
sayacDispatch({ type: 'ARTIR', payload: 5 }); // +5
sayacDispatch({ type: 'AZALT' });          // -1
sayacDispatch({ type: 'SIFIRLA' });        // 0'a sıfırla`}
            </pre>
          </div>
        </div>
        
        {/* Alışveriş Sepeti Örneği */}
        <div className="example-section" style={{ 
          backgroundColor: darkMode ? '#333' : '#f5f5f5',
          padding: '20px',
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <h2>2. Alışveriş Sepeti Örneği</h2>
          <p>
            Bu daha karmaşık örnekte, bir alışveriş sepetini yönetmek için useReducer kullanıyoruz.
            Sepete ürün ekleme, çıkarma ve sepeti temizleme işlemleri için farklı action'lar kullanıyoruz.
          </p>
          
          <div className="shopping-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
            {/* Ürün Listesi */}
            <div className="product-list" style={{ 
              flex: '1', 
              minWidth: '300px',
              backgroundColor: darkMode ? '#444' : '#fff',
              padding: '15px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>Ürünler</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {urunler.map(urun => (
                  <div key={urun.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '10px',
                    backgroundColor: darkMode ? '#555' : '#f9f9f9',
                    borderRadius: '4px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '24px', marginRight: '10px' }}>{urun.resim}</span>
                      <div>
                        <div>{urun.isim}</div>
                        <div style={{ color: darkMode ? '#aaa' : '#666' }}>{urun.fiyat} ₺</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => sepetDispatch({ type: 'URUN_EKLE', payload: urun })}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: darkMode ? '#388e3c' : '#43a047',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Ekle
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sepet */}
            <div className="cart" style={{ 
              flex: '1', 
              minWidth: '300px',
              backgroundColor: darkMode ? '#444' : '#fff',
              padding: '15px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3>Sepetim</h3>
                <button 
                  onClick={() => sepetDispatch({ type: 'SEPETI_TEMIZLE' })}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: darkMode ? '#d32f2f' : '#e53935',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  disabled={sepet.urunler.length === 0}
                >
                  Sepeti Temizle
                </button>
              </div>
              
              {sepet.urunler.length === 0 ? (
                <div style={{ 
                  padding: '20px', 
                  textAlign: 'center',
                  color: darkMode ? '#aaa' : '#666'
                }}>
                  Sepetiniz boş
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                    {sepet.urunler.map(urun => (
                      <div key={urun.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '10px',
                        backgroundColor: darkMode ? '#555' : '#f9f9f9',
                        borderRadius: '4px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ fontSize: '24px', marginRight: '10px' }}>{urun.resim}</span>
                          <div>
                            <div>{urun.isim}</div>
                            <div style={{ color: darkMode ? '#aaa' : '#666' }}>
                              {urun.fiyat} ₺ x {urun.miktar} = {urun.fiyat * urun.miktar} ₺
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <button 
                            onClick={() => sepetDispatch({ type: 'URUN_CIKAR', payload: urun })}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: darkMode ? '#d32f2f' : '#e53935',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            -
                          </button>
                          <span>{urun.miktar}</span>
                          <button 
                            onClick={() => sepetDispatch({ type: 'URUN_EKLE', payload: urun })}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: darkMode ? '#388e3c' : '#43a047',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '10px',
                    borderTop: `1px solid ${darkMode ? '#555' : '#eee'}`,
                    fontWeight: 'bold'
                  }}>
                    <span>Toplam:</span>
                    <span>{sepet.toplamFiyat} ₺</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="code-example" style={{ 
            backgroundColor: darkMode ? '#444' : '#f0f0f0',
            padding: '15px',
            borderRadius: '5px',
            marginTop: '20px',
            overflow: 'auto'
          }}>
            <pre style={{ color: darkMode ? '#ddd' : '#333' }}>
{`// Sepet reducer fonksiyonu (kısaltılmış)
const sepetReducer = (state, action) => {
  switch (action.type) {
    case 'URUN_EKLE':
      // Ürün ekleme mantığı...
      
    case 'URUN_CIKAR':
      // Ürün çıkarma mantığı...
    
    case 'SEPETI_TEMIZLE':
      return { urunler: [], toplamFiyat: 0 };
      
    default:
      return state;
  }
};

// useReducer kullanımı
const [sepet, sepetDispatch] = useReducer(sepetReducer, {
  urunler: [],
  toplamFiyat: 0
});

// Dispatch örnekleri
sepetDispatch({ type: 'URUN_EKLE', payload: urun });
sepetDispatch({ type: 'URUN_CIKAR', payload: urun });
sepetDispatch({ type: 'SEPETI_TEMIZLE' });`}
            </pre>
          </div>
        </div>
      </div>
      
      <div className="explanation" style={{ 
        marginTop: '40px',
        padding: '20px',
        backgroundColor: darkMode ? '#333' : '#f9f9f9',
        borderRadius: '5px'
      }}>
        <h2>useReducer Hook'u Nedir?</h2>
        <p>
          useReducer, React'ta karmaşık state mantığını yönetmek için kullanılan bir hook'tur.
          useState'in alternatifi olarak düşünülebilir, ancak birbiriyle ilişkili state'leri yönetmek
          ve karmaşık state güncellemelerini gerçekleştirmek için daha uygun bir seçenektir.
        </p>
        
        <h3>useReducer Nasıl Çalışır?</h3>
        <div className="code-explanation">
          <p><strong>1. useReducer Hook'unu İçe Aktarma:</strong></p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`import React, { useReducer } from 'react';`}
          </pre>
          
          <p><strong>2. Reducer Fonksiyonu Tanımlama:</strong></p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`const reducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_TYPE_1':
      // State'i güncelle ve yeni state'i döndür
      return { ...state, property1: newValue };
    case 'ACTION_TYPE_2':
      // Başka bir güncelleme
      return { ...state, property2: action.payload };
    default:
      // Tanımlanmamış action type'lar için mevcut state'i döndür
      return state;
  }
};`}
          </pre>
          
          <p><strong>3. useReducer Hook'unu Kullanma:</strong></p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`// İlk parametre: reducer fonksiyonu
// İkinci parametre: başlangıç state'i
const [state, dispatch] = useReducer(reducer, initialState);`}
          </pre>
          
          <p><strong>4. Action Dispatch Etme:</strong></p>
          <pre style={{ 
            backgroundColor: darkMode ? '#444' : '#f5f5f5',
            color: darkMode ? '#ddd' : '#333',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto'
          }}>
{`// Action type ve isteğe bağlı payload ile dispatch fonksiyonunu çağırma
dispatch({ type: 'ACTION_TYPE_1' });
dispatch({ type: 'ACTION_TYPE_2', payload: someValue });`}
          </pre>
        </div>
        
        <h3>useReducer vs useState</h3>
        <p>
          useReducer ve useState arasında seçim yaparken göz önünde bulundurulması gereken faktörler:
        </p>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '15px',
          backgroundColor: darkMode ? '#444' : '#fff',
          color: darkMode ? '#ddd' : '#333',
        }}>
          <thead>
            <tr>
              <th style={{ 
                border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                padding: '10px',
                textAlign: 'left',
                backgroundColor: darkMode ? '#555' : '#f5f5f5'
              }}>useState</th>
              <th style={{ 
                border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                padding: '10px',
                textAlign: 'left',
                backgroundColor: darkMode ? '#555' : '#f5f5f5'
              }}>useReducer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '10px' }}>
                Basit state yönetimi için idealdir
              </td>
              <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '10px' }}>
                Karmaşık state mantığı için idealdir
              </td>
            </tr>
            <tr>
              <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '10px' }}>
                Bağımsız state değerleri için uygundur
              </td>
              <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '10px' }}>
                Birbiriyle ilişkili state'ler için uygundur
              </td>
            </tr>
            <tr>
              <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '10px' }}>
                Doğrudan state güncellemesi yapar
              </td>
              <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '10px' }}>
                Action'lar aracılığıyla state güncellemesi yapar
              </td>
            </tr>
            <tr>
              <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '10px' }}>
                Daha az kod gerektirir
              </td>
              <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '10px' }}>
                Daha fazla kod gerektirir, ancak daha yapılandırılmıştır
              </td>
            </tr>
          </tbody>
        </table>
        
        <h3>Ne Zaman Kullanılır?</h3>
        <ul>
          <li>Birbiriyle ilişkili birden fazla state değeri olduğunda</li>
          <li>Karmaşık state güncellemeleri gerektiğinde</li>
          <li>State mantığını bileşenden ayırmak istediğinizde</li>
          <li>State güncellemelerini daha öngörülebilir hale getirmek istediğinizde</li>
          <li>Redux benzeri bir yapı kullanmak istediğinizde, ancak tam Redux ekosistemi gerekmediğinde</li>
        </ul>
        
        <h3>useReducer ve useContext Birlikte Kullanımı</h3>
        <p>
          useReducer ve useContext hook'larını birlikte kullanarak, Redux benzeri global state yönetimi sağlayabilirsiniz.
          Bu yaklaşım, küçük ve orta ölçekli uygulamalar için Redux'a alternatif olabilir.
        </p>
        <pre style={{ 
          backgroundColor: darkMode ? '#444' : '#f5f5f5',
          color: darkMode ? '#ddd' : '#333',
          padding: '10px',
          borderRadius: '5px',
          overflow: 'auto',
          marginTop: '15px'
        }}>
{`// AppContext.js
import React, { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = { /* ... */ };
const reducer = (state, action) => { /* ... */ };

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Herhangi bir bileşende kullanımı
import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function MyComponent() {
  const { state, dispatch } = useContext(AppContext);
  
  // state'e erişim ve dispatch kullanımı
}`}
        </pre>
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

export default UseReducerSayfasi; 