import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * NavMenu Bileşeni
 * 
 * Bu bileşen, hiyerarşik yapıda, açılır-kapanır alt menüleri destekleyen
 * bir navigasyon menüsü sağlar.
 * 
 * Her menü öğesi, alt menüler içerebilir ve bu alt menüler
 * tıklandığında açılıp kapanabilir.
 */
function NavMenu() {
  // Menü yapısını tanımlıyoruz
  const menuItems = [
    {
      id: 'basics',
      title: 'React Giriş',
      description: 'React\'ın temel kavramlar giriş',
      isOpen: true, // Varsayılan olarak açık
      subItems: [
        {
          id: 'components',
          title: 'Componentler ve Props',
          path: '/merhaba',
          description: 'Componentle ve Props kavramını öğrenmek için basit bir bileşen örneği'
        },
        {
          id: 'state',
          title: 'State Yönetimi',
          path: '/sayac',
          description: 'State kavramını öğrenmek için basit bir sayaç uygulaması'
        },
        {
          id: 'todo',
          title: 'Yapılacaklar Listesi Örnek',
          path: '/todo',
          description: 'CRUD işlemleri, form yönetimi ve liste render etme örneği'
        }
      ]
    },
    {
      id: 'hooks',
      title: 'React Hooks',
      description: 'Fonksiyonel bileşenlerde state ve yaşam döngüsü yönetimi',
      isOpen: false, // Varsayılan olarak kapalı
      subItems: [
        {
          id: 'useState',
          title: 'useState Hook',
          path: '/hooks/usestate',
          description: 'Fonksiyonel bileşenlerde state yönetimi'
        },
        {
          id: 'useEffect',
          title: 'useEffect Hook',
          path: '/hooks/useeffect',
          description: 'Yan etkileri yönetme ve yaşam döngüsü olaylarını takip etme'
        },
        {
          id: 'useContext',
          title: 'useContext Hook',
          path: '/hooks/usecontext',
          description: 'Bileşen ağacı boyunca veri paylaşımı'
        },
        {
          id: 'useRef',
          title: 'useRef Hook',
          path: '/hooks/useref',
          description: 'DOM elemanlarına erişim ve değerleri saklama'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'İleri Seviye Konular',
      description: 'Daha karmaşık React kavramları',
      isOpen: false, // Varsayılan olarak kapalı
      subItems: [
        {
          id: 'routing',
          title: 'React Router',
          path: '/advanced/routing',
          description: 'Tek sayfa uygulamalarında sayfa yönlendirmesi'
        },
        {
          id: 'redux',
          title: 'Redux ile State Yönetimi',
          path: '/advanced/redux',
          description: 'Büyük uygulamalarda merkezi state yönetimi'
        }
      ]
    }
  ];

  // Her bir ana menü öğesinin açık/kapalı durumunu tutacak state
  const [openMenus, setOpenMenus] = useState(
    menuItems.reduce((acc, item) => {
      acc[item.id] = item.isOpen;
      return acc;
    }, {})
  );

  // Menü öğesinin açık/kapalı durumunu değiştiren fonksiyon
  const toggleMenu = (menuId) => {
    setOpenMenus({
      ...openMenus,
      [menuId]: !openMenus[menuId]
    });
  };

  return (
    <div className="nav-menu">
      <h2>Konular</h2>
      
      <div className="menu-container">
        {menuItems.map(menu => (
          <div key={menu.id} className="menu-item">
            <div 
              className="menu-header" 
              onClick={() => toggleMenu(menu.id)}
            >
              <h3>{menu.title}</h3>
              <span className={`menu-arrow ${openMenus[menu.id] ? 'open' : ''}`}>
                ▼
              </span>
            </div>
            
            <p className="menu-description">{menu.description}</p>
            
            {openMenus[menu.id] && (
              <ul className="submenu">
                {menu.subItems.map(subItem => (
                  <li key={subItem.id}>
                    <Link to={subItem.path}>
                      {subItem.title}
                    </Link>
                    <p>{subItem.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavMenu; 