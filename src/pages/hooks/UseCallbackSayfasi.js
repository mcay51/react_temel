import React, { useState, useCallback, useContext, memo } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

/**
 * React.memo ile sarılmış Child bileşeni
 * Bu bileşen, sadece props değiştiğinde yeniden render edilir
 */
const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log(`TodoItem render edildi: ${todo.text}`);
  
  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      margin: '5px 0',
      backgroundColor: todo.completed ? '#e6ffe6' : '#fff',
      borderRadius: '4px',
      border: '1px solid #ddd'
    }}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: '10px' }}
      />
      <span style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none',
        flex: 1
      }}>
        {todo.text}
      </span>
      <button 
        onClick={() => onDelete(todo.id)}
        style={{
          padding: '5px 10px',
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sil
      </button>
    </div>
  );
});

/**
 * UseCallbackSayfasi bileşeni
 * 
 * Bu sayfa, useCallback hook'unun nasıl kullanıldığını gösterir.
 * useCallback, fonksiyonları memoize ederek gereksiz yeniden oluşturulmaları önler.
 */
function UseCallbackSayfasi() {
  // ThemeContext'ten tema durumunu alıyoruz
  const { darkMode } = useContext(ThemeContext);
  
  // State tanımlamaları
  const [todos, setTodos] = useState([
    { id: 1, text: 'React Hooks öğren', completed: false },
    { id: 2, text: 'useCallback hook\'unu anla', completed: false },
    { id: 3, text: 'Performans optimizasyonu yap', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [count, setCount] = useState(0);
  
  // useCallback OLMADAN - Her render'da yeniden oluşturulur
  const handleToggleWithoutCallback = (todoId) => {
    console.log('handleToggleWithoutCallback çağrıldı');
    setTodos(
      todos.map(todo => 
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  // useCallback ILE - Bağımlılıklar değiştiğinde yeniden oluşturulur
  const handleToggleWithCallback = useCallback((todoId) => {
    console.log('handleToggleWithCallback çağrıldı');
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // Boş bağımlılık dizisi: fonksiyon sadece ilk render'da oluşturulur
  
  // useCallback ILE - Silme işlemi için
  const handleDelete = useCallback((todoId) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  }, []); // Boş bağımlılık dizisi: fonksiyon sadece ilk render'da oluşturulur
  
  // Yeni todo eklemek için
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };
  
  // Gereksiz render'ı tetiklemek için
  const incrementCount = () => {
    setCount(count + 1);
  };
  
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
        useCallback Hook Örneği
      </h1>
      
      <div className="explanation">
        <h2>useCallback Nedir?</h2>
        <p>
          <code>useCallback</code>, React'ta fonksiyonları memoize etmek (önbelleğe almak) için kullanılan bir hook'tur.
          Bu hook, gereksiz fonksiyon oluşturmalarını önleyerek uygulamanın performansını artırır.
        </p>
        <p>
          <code>useCallback</code> iki parametre alır:
        </p>
        <ol>
          <li>Memoize edilecek fonksiyon</li>
          <li>Bağımlılık dizisi (dependency array)</li>
        </ol>
        <p>
          <code>useCallback</code>, bağımlılık dizisindeki değerler değiştiğinde fonksiyonu yeniden oluşturur.
          Eğer bağımlılıklar değişmezse, önceki oluşturulan fonksiyonu kullanır.
        </p>
        <pre>
{`const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b] // Bağımlılık dizisi
);`}
        </pre>
      </div>
      
      <div className="component-container">
        <h2>Todo Listesi Örneği</h2>
        <p>
          Aşağıdaki örnekte, <code>useCallback</code> kullanarak ve kullanmadan oluşturulan 
          fonksiyonların davranışlarını karşılaştırabilirsiniz.
        </p>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Yeni görev ekle"
              style={{
                padding: '8px',
                flex: 1,
                borderRadius: '4px 0 0 4px',
                border: '1px solid #ccc',
                borderRight: 'none'
              }}
            />
            <button
              onClick={handleAddTodo}
              style={{
                padding: '8px 16px',
                backgroundColor: darkMode ? '#444' : '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer'
              }}
            >
              Ekle
            </button>
          </div>
          
          <button
            onClick={incrementCount}
            style={{
              padding: '8px 16px',
              backgroundColor: darkMode ? '#555' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Gereksiz Render ({count})
          </button>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3>useCallback ILE</h3>
            <p>Bu liste, useCallback ile optimize edilmiş fonksiyonları kullanır.</p>
            {todos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={handleToggleWithCallback} 
                onDelete={handleDelete}
              />
            ))}
          </div>
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3>useCallback OLMADAN</h3>
            <p>Bu liste, her render'da yeniden oluşturulan fonksiyonları kullanır.</p>
            {todos.map(todo => (
              <TodoItem 
                key={todo.id + 1000} // Farklı key kullanarak ayrı bileşenler oluşturuyoruz
                todo={todo} 
                onToggle={handleToggleWithoutCallback} 
                onDelete={(id) => setTodos(todos.filter(t => t.id !== id))}
              />
            ))}
          </div>
        </div>
        
        <div className="note" style={{ marginTop: '20px' }}>
          <p>
            <strong>Not:</strong> Console'u açarak render mesajlarını izleyin. 
            "Gereksiz Render" butonuna tıkladığınızda, useCallback olmadan oluşturulan 
            bileşenler her seferinde render edilirken, useCallback ile optimize edilmiş 
            bileşenler render edilmez.
          </p>
        </div>
      </div>
      
      <div className="explanation">
        <h2>useCallback Ne Zaman Kullanılmalı?</h2>
        <p>useCallback hook'u aşağıdaki durumlarda kullanılmalıdır:</p>
        <ol>
          <li>
            <strong>React.memo ile sarılmış bileşenlere geçirilen fonksiyonlar için:</strong> 
            Child bileşenlerin gereksiz yeniden render edilmesini önlemek için.
          </li>
          <li>
            <strong>useEffect bağımlılık dizisinde kullanılan fonksiyonlar için:</strong> 
            Fonksiyon referansı değiştiğinde useEffect'in gereksiz yere çalışmasını önlemek için.
          </li>
          <li>
            <strong>Referans eşitliği önemli olan diğer durumlar için:</strong> 
            Örneğin, fonksiyonun bir nesne içinde saklandığı ve bu nesnenin karşılaştırıldığı durumlar.
          </li>
        </ol>
        <p>
          <strong>Dikkat:</strong> useCallback'i her fonksiyon için kullanmak doğru değildir. 
          Basit fonksiyonlar için useCallback kullanmak, sağladığı performans kazancından daha fazla ek yük getirebilir.
        </p>
      </div>
      
      <div className="component-container">
        <h2>useCallback ve useState Fonksiyon Güncelleme Formu</h2>
        <p>
          useCallback kullanırken, state güncellemelerinde önceki state'e dayalı güncelleme yapmak önemlidir.
          Bu, bağımlılık dizisini boş bırakmanıza olanak tanır.
        </p>
        
        <pre>
{`// Yanlış: todos bağımlılığı gerektirir
const handleToggle = useCallback((todoId) => {
  setTodos(
    todos.map(todo => 
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    )
  );
}, [todos]);

// Doğru: bağımlılık dizisi boş olabilir
const handleToggle = useCallback((todoId) => {
  setTodos(prevTodos => 
    prevTodos.map(todo => 
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    )
  );
}, []);`}
        </pre>
      </div>
      
      <div className="explanation">
        <h2>useCallback vs useMemo</h2>
        <p>
          <code>useCallback</code> ve <code>useMemo</code> benzer görünse de farklı amaçlara hizmet eder:
        </p>
        <ul>
          <li>
            <strong>useCallback:</strong> Bir fonksiyonu önbelleğe alır.
          </li>
          <li>
            <strong>useMemo:</strong> Bir değeri (hesaplama sonucunu) önbelleğe alır.
          </li>
        </ul>
        <p>
          <code>useCallback(fn, deps)</code> aslında <code>useMemo(() =&gt; fn, deps)</code> ile eşdeğerdir.
        </p>
      </div>
      
      <div className="note" style={{ marginTop: '30px' }}>
        <p>
          <strong>Performans İpucu:</strong> useCallback, React.memo ve useMemo'yu birlikte kullanarak 
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

export default UseCallbackSayfasi; 