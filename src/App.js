import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// ThemeProvider'ı içe aktarıyoruz
import { ThemeProvider } from './contexts/ThemeContext';

// Sayfaları içe aktarıyoruz
import AnaSayfa from './pages/AnaSayfa';
import MerhabaSayfasi from './pages/MerhabaSayfasi';
import SayacSayfasi from './pages/SayacSayfasi';
import TodoListSayfasi from './pages/TodoListSayfasi';
import UseStateSayfasi from './pages/hooks/UseStateSayfasi';
import UseEffectSayfasi from './pages/hooks/UseEffectSayfasi';
import UseContextSayfasi from './pages/UseContextSayfasi';
import UseRefSayfasi from './pages/UseRefSayfasi';
import UseReducerSayfasi from './pages/UseReducerSayfasi';

/**
 * App Bileşeni
 * 
 * Bu bileşen, React Router kullanarak sayfa yönlendirmesini yönetir.
 * Farklı URL'ler için farklı bileşenleri render eder.
 * 
 * React Router, tek sayfa uygulamalarında (SPA) sayfa yönlendirmesi sağlar.
 * Tarayıcının URL'sini değiştirir ancak sayfayı yeniden yüklemez.
 */
function App() {
  return (
    // ThemeProvider ile tüm uygulamayı sarıyoruz
    <ThemeProvider>
      <Router>
        <div className="App">
          {/* 
            Routes bileşeni, URL'ye göre hangi bileşenin render edileceğini belirler.
            Her Route, belirli bir URL yolu (path) için bir bileşen tanımlar.
          */}
          <Routes>
            {/* Ana sayfa için route */}
            <Route path="/" element={<AnaSayfa />} />
            
            {/* Merhaba sayfası için route */}
            <Route path="/merhaba" element={<MerhabaSayfasi />} />
            
            {/* Sayaç sayfası için route */}
            <Route path="/sayac" element={<SayacSayfasi />} />
            
            {/* TodoList sayfası için route */}
            <Route path="/todo" element={<TodoListSayfasi />} />
            
            {/* Hooks sayfaları için route'lar */}
            <Route path="/hooks/usestate" element={<UseStateSayfasi />} />
            <Route path="/hooks/useeffect" element={<UseEffectSayfasi />} />
            <Route path="/hooks/usecontext" element={<UseContextSayfasi />} />
            <Route path="/hooks/useref" element={<UseRefSayfasi />} />
            <Route path="/hooks/usereducer" element={<UseReducerSayfasi />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
