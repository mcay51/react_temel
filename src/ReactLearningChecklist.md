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

### Uygulama Optimizasyonu
- [ ] Lazy loading ve React.lazy
- [ ] Code splitting
- [ ] React Profiler ile performans analizi
- [ ] Web Vitals ve performans metrikleri

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