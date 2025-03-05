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

- [x] **useReducer**
  - Karmaşık state mantığı için useState'in alternatifidir
  - Redux benzeri bir state yönetimi sağlar
  - `const [state, dispatch] = useReducer(reducer, initialState);` şeklinde kullanılır

## Optimizasyon Hooks

- [x] **useMemo**
  - Hesaplama yoğun işlemlerin sonuçlarını önbelleğe alır
  - Gereksiz hesaplamaları önler
  - `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);` şeklinde kullanılır

- [x] **useCallback**
  - Fonksiyonları önbelleğe alır
  - Child bileşenlere geçirilen fonksiyonların gereksiz yeniden oluşturulmasını önler
  - `const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);` şeklinde kullanılır

- [x] **React.memo**
  - Fonksiyonel bileşenleri önbelleğe alır (memoize eder)
  - Bileşenin props'ları değişmediği sürece yeniden render edilmesini önler
  - `const MemoizedComponent = React.memo(MyComponent);` şeklinde kullanılır
  - Class bileşenlerindeki PureComponent'e benzer işlev görür

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

- [x] **Custom Hooks**
  - Kendi özel hook'larınızı oluşturma
  - Kod tekrarını azaltır
  - Mantığı yeniden kullanılabilir hale getirir
  - `use` ile başlayan fonksiyonlar olarak tanımlanır
  - Örnek: `useLocalStorage`, `useWindowSize`, `useFetch` vb.

## Öğrendiğimiz Özel Hook Örnekleri

- [x] **useLocalStorage**: Tarayıcının localStorage API'sini kullanarak state'i kalıcı hale getirir
  ```jsx
  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    });

    const setValue = value => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }
  ```

- [x] **useCounter**: Sayaç işlemlerini yönetmek için kullanılan bir hook
  ```jsx
  function useCounter(initialValue = 0, step = 1) {
    const [count, setCount] = useState(initialValue);
    
    const increment = () => setCount(prevCount => prevCount + step);
    const decrement = () => setCount(prevCount => prevCount - step);
    const reset = () => setCount(initialValue);
    const setCountValue = (value) => setCount(value);
    
    return { count, increment, decrement, reset, setCount: setCountValue };
  }
  ```

- [x] **useForm**: Form işlemlerini yönetmek için kullanılan bir hook
  ```jsx
  function useForm(initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    
    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      setValues(prevValues => ({
        ...prevValues,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
    
    const handleSubmit = (callback) => (event) => {
      if (event) event.preventDefault();
      if (callback) callback(values);
    };
    
    const resetForm = () => setValues(initialValues);
    
    return { values, handleChange, handleSubmit, resetForm, setValues };
  }
  ```

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