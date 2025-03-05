# React Hooks Checklist

Bu dosya, React Hooks'ları öğrenme sürecinizi takip etmenize yardımcı olacak bir checklist içerir. Her bir hook'u öğrendikçe yanındaki kutuyu işaretleyebilirsiniz.

## Temel Hooks

- [x] **useState**
  - State (durum) yönetimi için kullanılır
  - Fonksiyonel bileşenlerde state kullanmayı sağlar
  - `const [state, setState] = useState(initialValue);` şeklinde kullanılır

- [x] **useEffect**
  - Yan etkileri (side effects) yönetmek için kullanılır
  - Component lifecycle metodlarının yerine geçer (componentDidMount, componentDidUpdate, componentWillUnmount)
  - `useEffect(() => { ... }, [dependencies]);` şeklinde kullanılır

## İleri Seviye Hooks

- [x] **useContext**
  - Bileşen ağacı boyunca veri paylaşımı için kullanılır
  - Prop drilling sorununu çözer
  - Context API ile birlikte kullanılır
  - `const value = useContext(MyContext);` şeklinde kullanılır

- [x] **useRef**
  - DOM elemanlarına doğrudan erişim sağlar
  - Render'lar arasında değerleri saklar (re-render'ı tetiklemeden)
  - `const myRef = useRef(initialValue);` şeklinde kullanılır
  - `myRef.current` ile değere erişilir

- [ ] **useReducer**
  - Karmaşık state mantığı için useState'in alternatifidir
  - Redux benzeri bir state yönetimi sağlar
  - `const [state, dispatch] = useReducer(reducer, initialState);` şeklinde kullanılır

## Optimizasyon Hooks

- [ ] **useMemo**
  - Hesaplama yoğun işlemlerin sonuçlarını önbelleğe alır
  - Gereksiz hesaplamaları önler
  - `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);` şeklinde kullanılır

- [ ] **useCallback**
  - Fonksiyonları önbelleğe alır
  - Child bileşenlere geçirilen fonksiyonların gereksiz yeniden oluşturulmasını önler
  - `const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);` şeklinde kullanılır

## Özel Durumlar İçin Hooks

- [ ] **useLayoutEffect**
  - useEffect'e benzer ancak DOM güncellemelerinden hemen sonra senkron olarak çalışır
  - Görsel güncellemeler için kullanılır
  - `useLayoutEffect(() => { ... }, [dependencies]);` şeklinde kullanılır

- [ ] **useImperativeHandle**
  - forwardRef ile kullanılır
  - Parent bileşene açılan instance değerlerini özelleştirir
  - `useImperativeHandle(ref, () => ({ ... }), [dependencies]);` şeklinde kullanılır

## Özel Hooks Geliştirme

- [ ] **Custom Hooks**
  - Kendi özel hook'larınızı oluşturma
  - Kod tekrarını azaltır
  - Mantığı yeniden kullanılabilir hale getirir
  - `use` ile başlayan fonksiyonlar olarak tanımlanır
  - Örnek: `useLocalStorage`, `useWindowSize`, `useFetch` vb.

## Ek Hooks (React 18+)

- [ ] **useTransition**
  - Acil olmayan state güncellemelerini işaretlemek için kullanılır
  - Kullanıcı arayüzünün duyarlılığını korur
  - `const [isPending, startTransition] = useTransition();` şeklinde kullanılır

- [ ] **useDeferredValue**
  - Bir değerin güncellemesini ertelemek için kullanılır
  - Acil olmayan render'lar için faydalıdır
  - `const deferredValue = useDeferredValue(value);` şeklinde kullanılır

## Notlar

- Hook'lar sadece fonksiyonel bileşenlerde kullanılabilir
- Hook'lar her zaman bileşenin en üst seviyesinde çağrılmalıdır (döngüler, koşullar veya iç içe fonksiyonlar içinde çağrılmamalıdır)
- Hook'lar sadece React fonksiyonel bileşenlerinde veya özel hook'larda çağrılmalıdır 