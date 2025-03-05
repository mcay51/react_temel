/**
 * React ve useState hook'unu içe aktarıyoruz
 * useState, fonksiyonel bileşenlerde state (durum) yönetimi sağlar
 */
import React, { useState } from 'react';

/**
 * TodoList Bileşeni
 * 
 * Bu bileşen, React'ta bir yapılacaklar listesi uygulamasını göstermektedir.
 * Birden fazla state kullanımı, form yönetimi, liste render etme ve
 * CRUD (Create, Read, Update, Delete) işlemlerinin nasıl yapıldığını öğretir.
 */
function TodoList() {
  /**
   * Çoklu State Kullanımı
   * 
   * 1. todos: Yapılacaklar listesini tutan array state'i
   *    Her bir todo nesnesi şu yapıdadır: { id, text, tamamlandi }
   * 
   * 2. input: Form girişini tutan string state'i
   * 
   * React'ta, farklı veri türleri için ayrı state'ler kullanmak yaygın bir pratiktir.
   */
  const [todos, setTodos] = useState([]); // Boş array ile başlatıyoruz
  const [input, setInput] = useState(''); // Boş string ile başlatıyoruz

  /**
   * Görev Ekleme Fonksiyonu (Create İşlemi)
   * 
   * Bu fonksiyon:
   * 1. Girişin boş olup olmadığını kontrol eder
   * 2. Yeni bir todo nesnesi oluşturur
   * 3. Spread operatörü (...) ile mevcut todos array'ini koruyarak yeni todo'yu ekler
   * 4. Input state'ini temizler
   * 
   * NOT: React'ta state'ler değiştirilemez (immutable). Bu nedenle, 
   * mevcut state'i doğrudan değiştirmek yerine, yeni bir kopya oluşturuyoruz.
   */
  const ekleGorev = () => {
    if (input.trim() !== '') {
      // Yeni bir todos array'i oluşturup state'i güncelliyoruz
      setTodos([...todos, { id: Date.now(), text: input, tamamlandi: false }]);
      setInput(''); // Input alanını temizliyoruz
    }
  };

  /**
   * Görev Tamamlama Durumunu Değiştirme Fonksiyonu (Update İşlemi)
   * 
   * Bu fonksiyon:
   * 1. ID'ye göre ilgili todo'yu bulur
   * 2. Spread operatörü ile todo nesnesinin bir kopyasını oluşturur
   * 3. tamamlandi özelliğini tersine çevirir (toggle)
   * 4. Diğer todo'ları olduğu gibi bırakır
   * 
   * map() metodu, her bir öğe için belirtilen işlemi uygulayarak yeni bir dizi döndürür.
   */
  const toggleTamamlandi = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id 
          ? { ...todo, tamamlandi: !todo.tamamlandi } // ID eşleşirse, tamamlandi değerini tersine çevir
          : todo // ID eşleşmezse, todo'yu olduğu gibi bırak
      )
    );
  };

  /**
   * Görev Silme Fonksiyonu (Delete İşlemi)
   * 
   * Bu fonksiyon:
   * 1. filter() metodu ile belirtilen ID'ye sahip olmayan todo'ları filtreler
   * 2. Yeni oluşturulan array ile todos state'ini günceller
   * 
   * filter() metodu, belirtilen koşulu sağlayan öğelerden oluşan yeni bir dizi döndürür.
   */
  const silGorev = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  /**
   * JSX ile Kullanıcı Arayüzü Oluşturma
   * 
   * JSX, JavaScript içinde HTML benzeri kod yazmanızı sağlayan bir sözdizimi uzantısıdır.
   * React bileşenleri, render edilecek JSX'i döndürür.
   */
  return (
    <div className="todo-container">
      <h2>Yapılacaklar Listesi</h2>
      
      {/* 
        Form Yönetimi
        
        1. Kontrollü Bileşen (Controlled Component) Kullanımı:
           - input değeri state'e bağlı (value={input})
           - onChange event'i ile state güncelleniyor
        
        2. Event Handling:
           - onChange: Input değeri değiştiğinde tetiklenir
           - onClick: Ekle butonuna tıklandığında tetiklenir
      */}
      <div className="todo-form">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yeni görev ekle..."
        />
        <button onClick={ekleGorev}>Ekle</button>
      </div>
      
      {/* 
        Liste Render Etme
        
        1. map() metodu ile array'deki her öğe için JSX döndürme
        2. key prop'u: React'ın liste öğelerini verimli bir şekilde güncellemesi için gerekli
        3. Koşullu CSS sınıfı: todo.tamamlandi durumuna göre farklı stil uygulama
        4. Event Handling: Öğeye ve silme butonuna tıklama olaylarını yönetme
      */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.tamamlandi ? 'completed' : ''}>
            <span onClick={() => toggleTamamlandi(todo.id)}>
              {todo.text}
            </span>
            <button onClick={() => silGorev(todo.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
/*
React öğrenme yolculuğunuzda, bu bileşeni şu şekillerde geliştirebilirsiniz:
Görevlere öncelik ekleme
Görevleri kategorilere ayırma
Görevleri filtreleme ve sıralama
Görevleri yerel depolamada (localStorage) saklama
Görevleri bir API'ye gönderme
*/
// TodoList bileşenini diğer dosyalarda kullanabilmek için dışa aktarıyoruz
export default TodoList;