import React from 'react';

/**
 * Merhaba Bileşeni
 * 
 * Bu bir fonksiyonel bileşendir. React'ta bileşenler (component), 
 * kullanıcı arayüzünün yeniden kullanılabilir, bağımsız parçalarıdır.
 * 
 * @param {object} props - Bileşene aktarılan özellikler (properties) nesnesi
 * Props, üst bileşenden alt bileşene veri aktarmak için kullanılır.
 * Bu bileşen 'isim' adında bir prop bekliyor.
 */
function Merhaba(props) {
  // JSX kullanarak bileşenin görünümünü tanımlıyoruz
  // props.isim ile üst bileşenden gelen isim değerini kullanıyoruz
  return (
    <div className="merhaba-container">
      <h1>Merhaba, {props.isim}!</h1>
      <p>İlk React bileşeniniz başarıyla oluşturuldu.</p>
    </div>
  );
}

// Bu bileşeni diğer dosyalarda kullanabilmek için dışa aktarıyoruz
export default Merhaba;