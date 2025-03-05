import { useState, useEffect } from 'react';

/**
 * useLocalStorage Hook
 * 
 * Bu özel hook, tarayıcının localStorage API'sini kullanarak state'i kalıcı hale getirir.
 * Sayfa yenilendiğinde bile değerlerin korunmasını sağlar.
 * 
 * @param {string} key - localStorage'da kullanılacak anahtar
 * @param {any} initialValue - Başlangıç değeri
 * @returns {Array} - [storedValue, setValue] şeklinde bir dizi döndürür (useState gibi)
 */
function useLocalStorage(key, initialValue) {
  // State'i başlatırken localStorage'dan okuma yapmaya çalışıyoruz
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // localStorage'dan değeri al
      const item = window.localStorage.getItem(key);
      // Eğer değer varsa JSON olarak parse et, yoksa initialValue'yu kullan
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Herhangi bir hata durumunda initialValue'yu kullan
      console.error(`useLocalStorage error reading key "${key}":`, error);
      return initialValue;
    }
  });

  // Değeri localStorage'a kaydetmek için bir fonksiyon
  const setValue = (value) => {
    try {
      // Eğer value bir fonksiyon ise, mevcut değeri alıp fonksiyona geçiriyoruz
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // State'i güncelliyoruz
      setStoredValue(valueToStore);
      
      // localStorage'a kaydediyoruz
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`useLocalStorage error storing key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage; 