# React Öğrenme Yol Haritası Checklist

## Bölüm 1: React Temel Kavramlar (Derinlemesine)

### Component Lifecycle ve Rendering
- [ ] Component lifecycle (fonksiyonel bileşenler ve hooks perspektifinden)
- [ ] Render ve re-render mekanizması
- [ ] Key kullanımı ve önemi
  - [ ] Listelerde key prop'unun doğru kullanımı
  - [ ] Index kullanımının sakıncaları ve unique ID kullanımı
- [ ] Virtual DOM ve reconciliation algoritması

### Event Handling
- [ ] React'in event sistemi ve synthetic events
- [ ] Event propagation ve bubbling
- [ ] Event handler'ların optimizasyonu (useCallback ile)
- [ ] Form eventleri ve form handling temelleri

## Bölüm 2: React Router

### Temel Routing
- [ ] BrowserRouter, Routes ve Route bileşenleri
- [ ] Link ve NavLink bileşenleri
- [ ] URL parametreleri ve useParams hook'u

### İleri Seviye Routing
- [ ] Nested routes (iç içe rotalar)
- [ ] Programmatic navigation (useNavigate hook'u)
- [ ] Route guards ve protected routes
- [ ] 404 sayfaları ve catch-all routes

## Bölüm 3: State Yönetimi

### Context API
- [ ] Context oluşturma ve Provider kullanımı
- [ ] useContext hook'u ile context'e erişim
- [ ] Multiple context providers
- [ ] Context performance optimizasyonu

### Redux
- [ ] Redux temel kavramlar (store, actions, reducers)
- [ ] Redux DevTools kullanımı
- [ ] Redux Toolkit ile modern Redux kullanımı
- [ ] Thunk middleware ile asenkron işlemler

### Alternatif State Yönetimi
- [ ] Zustand veya Jotai gibi hafif state yönetim kütüphaneleri

## Bölüm 4: Form Yönetimi ve Kullanıcı Etkileşimi

### Temel Form Yönetimi
- [ ] Controlled vs Uncontrolled components
- [ ] Form events (onChange, onSubmit, onFocus, onBlur)
- [ ] Form validation (temel yaklaşımlar)
- [ ] Multi-step forms

### İleri Seviye Form Kütüphaneleri
- [ ] Formik veya React Hook Form
- [ ] Form validation kütüphaneleri (Yup, Zod)
- [ ] Dinamik form alanları
- [ ] Form arrays ve nested forms

## Bölüm 5: Performans Optimizasyonu

### Component Optimizasyonu
- [ ] React.memo kullanımı
- [ ] useMemo ve useCallback hook'ları
- [ ] Gereksiz render'ları önleme teknikleri
- [ ] List virtualization (react-window, react-virtualized)

### Code Splitting ve Lazy Loading
- [ ] React.lazy ve Suspense ile bileşen lazy loading
  ```jsx
  // React.lazy ile bileşen lazy loading örneği
  import React, { Suspense, lazy } from 'react';
  
  // Bileşeni lazy loading ile import etme
  const HeavyComponent = lazy(() => import('./HeavyComponent'));
  
  function MyComponent() {
    return (
      <div>
        <h1>Ana İçerik Her Zaman Yüklenir</h1>
        
        {/* Suspense, lazy loading edilecek bileşen yüklenene kadar fallback gösterir */}
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <HeavyComponent />
        </Suspense>
      </div>
    );
  }
  ```

- [ ] Route-based code splitting
  ```jsx
  // React Router ile route-based code splitting örneği
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import React, { Suspense, lazy } from 'react';
  
  // Sayfaları lazy loading ile import etme
  const Home = lazy(() => import('./pages/Home'));
  const About = lazy(() => import('./pages/About'));
  const Dashboard = lazy(() => import('./pages/Dashboard'));
  
  function App() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Sayfa Yükleniyor...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }
  ```

- [ ] Dynamic imports ve chunk names
  ```jsx
  // Chunk adlandırma ile dynamic import örneği (webpack için)
  const DataVisualization = lazy(() => import(
    /* webpackChunkName: "data-viz" */ 
    './components/DataVisualization'
  ));
  ```

- [ ] Error boundary'ler ile lazy loading error handling
  ```jsx
  // Error Boundary ile Lazy Loading hatalarını yakalama
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
        return <h2>Bileşen yüklenirken bir hata oluştu.</h2>;
      }
  
      return this.props.children;
    }
  }
  
  function MyApp() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <LazyComponent />
        </Suspense>
      </ErrorBoundary>
    );
  }
  ```

### Diğer Performans Optimizasyonları
- [ ] React Profiler ile performans analizi
- [ ] Web Vitals ve performans metrikleri
- [ ] Bundle size analizi ve optimizasyonu
- [ ] Lighthouse ve performans auditing

## Bölüm 6: Test Yazma

### Jest ile Unit Testing
- [ ] Jest kurulumu ve temel test yazımı
- [ ] Mocking ve spies
- [ ] Test coverage

### React Testing Library
- [ ] Component testing
- [ ] User event testing
- [ ] Form testing
- [ ] Async testing

## Bölüm 7: Stil Yönetimi

### Modern CSS Yaklaşımları
- [ ] CSS Modules
- [ ] CSS-in-JS (Styled-components veya Emotion)
- [ ] Utility-First CSS (Tailwind CSS)
- [ ] Responsive design ve mobile-first yaklaşım

## Bölüm 8: Next.js

### Temel Next.js
- [ ] Pages router vs App router
- [ ] File-based routing
- [ ] Data fetching yöntemleri
- [ ] SSR, SSG ve ISR

### İleri Seviye Next.js
- [ ] API Routes
- [ ] Middleware
- [ ] Optimizasyon teknikleri
- [ ] Deployment stratejileri

## Bölüm 9: TypeScript ile React

### TypeScript Temelleri
- [ ] TypeScript kurulumu ve yapılandırması
- [ ] Temel tipler ve interfaces
- [ ] Type assertions ve type guards

### React ve TypeScript
- [ ] Component props typing
- [ ] Event handling ile TypeScript
- [ ] Hooks ile TypeScript
- [ ] Generic components

## Bölüm 10: İleri Seviye React Patterns ve Best Practices

### Component Patterns
- [ ] Compound components
- [ ] Render props
- [ ] Higher-order components (HOC)
- [ ] Custom hooks pattern

### Best Practices
- [ ] Code organization ve folder structure
- [ ] Error handling ve error boundaries
- [ ] Accessibility (a11y)
- [ ] Internationalization (i18n)

## Notlar

- Bu checklist, React öğrenme yolculuğunuzda size rehberlik edecek bir yol haritasıdır.
- Her bölümü tamamladıkça ilgili kutucukları işaretleyebilirsiniz.
- Konuları sırayla öğrenmeniz, her yeni konunun önceki konuların üzerine inşa edilmesi açısından faydalı olacaktır.
- Öğrenme sürecinizde pratik yapmayı unutmayın. Her konu için küçük projeler geliştirmek, öğrendiklerinizi pekiştirmenize yardımcı olacaktır.
- React ekosistemi sürekli gelişmektedir. Güncel kalmak için resmi React dokümantasyonunu ve topluluk kaynaklarını takip etmeyi ihmal etmeyin. 