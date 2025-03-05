import React from 'react';
import { Link } from 'react-router-dom';
import TodoList from '../components/TodoList';

/**
 * TodoListSayfasi Bileşeni
 * 
 * Bu sayfa, TodoList bileşenini içerir ve React'ın daha karmaşık
 * kullanımını gösterir.
 */
function TodoListSayfasi() {
  return (
    <div className="page-container">
      <h1>Yapılacaklar Listesi Sayfası</h1>
      <p>Bu sayfa, React'ta daha karmaşık bir uygulama örneğini göstermektedir.</p>
      
      <div className="component-container">
        <TodoList />
      </div>
      
      <div className="explanation">
        <h2>Bu Örnekte Öğrenilen Kavramlar:</h2>
        <ul>
          <li>
            <strong>Çoklu State Kullanımı:</strong> Birden fazla state değişkeni kullanma
          </li>
          <li>
            <strong>Form Yönetimi:</strong> Kullanıcı girdisini alma ve işleme
          </li>
          <li>
            <strong>Liste Render Etme:</strong> Dinamik olarak liste öğelerini oluşturma
          </li>
          <li>
            <strong>CRUD İşlemleri:</strong> Veri ekleme, okuma, güncelleme ve silme
          </li>
          <li>
            <strong>Event Handling:</strong> Kullanıcı etkileşimlerini yönetme
          </li>
        </ul>
        <p>
          Bu örnek, gerçek dünya uygulamalarının nasıl oluşturulduğunu göstermektedir.
          Kodun içindeki yorumları inceleyerek daha fazla bilgi edinebilirsiniz.
        </p>
      </div>
      
      <Link to="/" className="home-link">Ana Sayfaya Dön</Link>
    </div>
  );
}

export default TodoListSayfasi; 