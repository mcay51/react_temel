import { useState } from 'react';

/**
 * useCounter Hook
 * 
 * Bu özel hook, sayaç işlemlerini yönetmek için kullanılır.
 * Artırma, azaltma, sıfırlama ve belirli bir değere ayarlama işlevlerini sağlar.
 * 
 * @param {number} initialValue - Başlangıç değeri
 * @param {number} step - Artış/azalış miktarı
 * @returns {Object} - { count, increment, decrement, reset, setCount } şeklinde işlevler
 */
function useCounter(initialValue = 0, step = 1) {
  // Sayaç state'i
  const [count, setCount] = useState(initialValue);
  
  // Sayacı artırma fonksiyonu
  const increment = () => {
    setCount(prevCount => prevCount + step);
  };
  
  // Sayacı azaltma fonksiyonu
  const decrement = () => {
    setCount(prevCount => prevCount - step);
  };
  
  // Sayacı sıfırlama fonksiyonu
  const reset = () => {
    setCount(initialValue);
  };
  
  // Sayacı belirli bir değere ayarlama fonksiyonu
  const setCountValue = (value) => {
    setCount(value);
  };
  
  // Hook'un döndürdüğü değerler ve fonksiyonlar
  return {
    count,
    increment,
    decrement,
    reset,
    setCount: setCountValue
  };
}

export default useCounter; 