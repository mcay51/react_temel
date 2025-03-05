import React from 'react';
import PropTypes from 'prop-types';

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
      {props.mesaj && <p className="mesaj">{props.mesaj}</p>}
      {props.children && <div className="cocuk-icerik">{props.children}</div>}
    </div>
  );
}

// PropTypes tanımlıyoruz - bileşenin alacağı prop'ların tiplerini belirtiyoruz
Merhaba.propTypes = {
  // isim prop'u bir string olmalı ve zorunludur (isRequired)
  isim: PropTypes.string.isRequired,
  
  // mesaj prop'u bir string olabilir ama zorunlu değildir
  mesaj: PropTypes.string,
  
  // children prop'u herhangi bir React node olabilir (element, string, sayı, vb.)
  children: PropTypes.node
};

// Varsayılan prop değerlerini tanımlıyoruz
Merhaba.defaultProps = {
  isim: 'Ziyaretçi', // Eğer isim prop'u verilmezse, varsayılan olarak 'Ziyaretçi' kullanılacak
  mesaj: '' // Varsayılan mesaj boş string
};

// Bu bileşeni diğer dosyalarda kullanabilmek için dışa aktarıyoruz
export default Merhaba;