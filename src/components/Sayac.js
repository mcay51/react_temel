/**
 * React'ta useState hook'unu kullanabilmek için gerekli importlar
 * useState, fonksiyonel bileşenlerde state (durum) yönetimi sağlar
 */
import React, { useState } from 'react';

/**
 * Sayac Bileşeni
 * 
 * Bu bileşen, React'taki state (durum) kavramını göstermektedir.
 * State, bir bileşenin kendi içinde tuttuğu ve değişebilen verilerdir.
 * State değiştiğinde, bileşen otomatik olarak yeniden render edilir.
 */
function Sayac() {
  /**
   * useState Hook Kullanımı
   * 
   * const [state, setState] = useState(başlangıçDeğeri);
   * 
   * - sayi: Mevcut state değeri (okuma amaçlı kullanılır)
   * - setSayi: State'i güncellemek için kullanılan fonksiyon
   * - useState(0): Başlangıç değeri olarak 0 atanıyor
   * 
   * State, props'tan farklı olarak bileşen içinde değiştirilebilir.
   */
  const [sayi, setSayi] = useState(0);

  return (
    <div>
      <p>Şu anki sayı: {sayi}</p>
      {/* 
        onClick event'i ile butona tıklandığında setSayi fonksiyonu çağrılır
        ve mevcut sayı değeri bir artırılır.
        
        State güncellendiğinde, React otomatik olarak bileşeni yeniden render eder
        ve kullanıcı arayüzü güncellenir.
      */}
      <button onClick={() => setSayi(sayi + 1)}>Artır</button>
    </div>
  );
}

// Sayac bileşenini diğer dosyalarda kullanabilmek için dışa aktarıyoruz
export default Sayac;