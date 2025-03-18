import React, { useState, Suspense, lazy } from 'react';

// Ağır içerikli bileşenleri lazy loading ile import ediyoruz
const HeavyChartComponent = lazy(() => 
  // Gerçek dünyada, bu import işlemi network üzerinden
  // büyük bir JS dosyasını indirmek anlamına gelir
  // Simülasyon için 2 saniye gecikme ekliyoruz
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./heavyComponents/HeavyChartComponent'));
    }, 2000);
  })
);

const HeavyDataTableComponent = lazy(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./heavyComponents/HeavyDataTableComponent'));
    }, 2500);
  })
);

const HeavyImageGalleryComponent = lazy(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./heavyComponents/HeavyImageGalleryComponent'));
    }, 1500);
  })
);

// Error Boundary Bileşeni
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Lazy loading hatası:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-container">
        <h2>Oops! Bir şeyler yanlış gitti.</h2>
        <p>Bileşen yüklenirken bir hata oluştu.</p>
        <button onClick={() => this.setState({ hasError: false })}>Tekrar Dene</button>
      </div>;
    }

    return this.props.children;
  }
}

// Loading Gösterge Bileşeni
const LoadingFallback = ({ message = "Yükleniyor..." }) => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>{message}</p>
  </div>
);

// Ana Uygulama Bileşeni
function LazyLoadingExample() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="lazy-loading-container">
      <h1>React Lazy Loading Örneği</h1>
      <p className="description">
        Bu örnek, React.lazy ve Suspense kullanarak bileşenlerin lazy loading ile yüklenmesini gösterir.
        Aşağıdaki butonlara tıklayarak ağır içerikli bileşenleri talep üzerine yükleyebilirsiniz.
      </p>

      <div className="tab-buttons">
        <button 
          className={activeTab === 'chart' ? 'active' : ''} 
          onClick={() => setActiveTab('chart')}
        >
          Grafik Göster
        </button>
        <button 
          className={activeTab === 'table' ? 'active' : ''} 
          onClick={() => setActiveTab('table')}
        >
          Veri Tablosu Göster
        </button>
        <button 
          className={activeTab === 'gallery' ? 'active' : ''} 
          onClick={() => setActiveTab('gallery')}
        >
          Resim Galerisi Göster
        </button>
      </div>

      <div className="tab-content">
        {activeTab && (
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message={`${activeTab === 'chart' ? 'Grafik' : activeTab === 'table' ? 'Veri Tablosu' : 'Resim Galerisi'} yükleniyor...`} />}>
              {activeTab === 'chart' && <HeavyChartComponent />}
              {activeTab === 'table' && <HeavyDataTableComponent />}
              {activeTab === 'gallery' && <HeavyImageGalleryComponent />}
            </Suspense>
          </ErrorBoundary>
        )}

        {!activeTab && (
          <div className="empty-state">
            <p>Yukarıdaki butonlardan birine tıklayarak içerik yükleyin</p>
          </div>
        )}
      </div>

      <div className="notes">
        <h3>React.lazy ve Suspense Hakkında Notlar:</h3>
        <ul>
          <li>
            <strong>React.lazy:</strong> Bileşenlerinizi dinamik olarak import etmenizi sağlar. Bileşen talep edildiğinde yüklenir, uygulamanızın ilk yükleme süresini kısaltır.
          </li>
          <li>
            <strong>Suspense:</strong> Lazy loading edilen bileşenler yüklenirken fallback içerik (örn. loading spinner) göstermenizi sağlar.
          </li>
          <li>
            <strong>Error Boundary:</strong> Lazy loading sırasında oluşabilecek hataları yakalamak ve kullanıcıya uygun geri bildirim sağlamak için kullanılır.
          </li>
          <li>
            <strong>Performans İpucu:</strong> Uygulamanızın ilk yükleme süresini kısaltmak ve kullanıcı deneyimini iyileştirmek için ağır içerikli bileşenleri lazy loading ile yükleyin.
          </li>
        </ul>
      </div>

      <style jsx>{`
        .lazy-loading-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .description {
          color: #666;
          line-height: 1.5;
          margin-bottom: 30px;
        }
        
        .tab-buttons {
          display: flex;
          margin-bottom: 20px;
          gap: 10px;
        }
        
        .tab-buttons button {
          padding: 10px 15px;
          border: none;
          background-color: #f0f0f0;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .tab-buttons button.active {
          background-color: #0066cc;
          color: white;
        }
        
        .tab-content {
          min-height: 300px;
          border: 1px solid #eaeaea;
          border-radius: 4px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .empty-state {
          color: #999;
          text-align: center;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #0066cc;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .error-container {
          color: #721c24;
          background-color: #f8d7da;
          padding: 20px;
          border-radius: 4px;
          text-align: center;
        }
        
        .error-container button {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }
        
        .notes {
          margin-top: 40px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }
        
        .notes ul {
          padding-left: 20px;
        }
        
        .notes li {
          margin-bottom: 10px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

export default LazyLoadingExample; 