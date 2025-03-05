import { useState } from 'react';

/**
 * useForm Hook
 * 
 * Bu özel hook, form işlemlerini yönetmek için kullanılır.
 * Form değerlerini, değişiklikleri ve form gönderimini yönetir.
 * 
 * @param {Object} initialValues - Form alanlarının başlangıç değerleri
 * @returns {Object} - { values, handleChange, handleSubmit, resetForm, setValues } şeklinde işlevler
 */
function useForm(initialValues = {}) {
  // Form değerlerini tutan state
  const [values, setValues] = useState(initialValues);
  
  // Form alanı değiştiğinde çağrılan fonksiyon
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    // Checkbox için checked değerini, diğer alanlar için value değerini kullan
    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Form gönderildiğinde çağrılan fonksiyon
  const handleSubmit = (callback) => (event) => {
    if (event) event.preventDefault();
    if (callback) callback(values);
  };
  
  // Form değerlerini sıfırlama fonksiyonu
  const resetForm = () => {
    setValues(initialValues);
  };
  
  // Form değerlerini belirli bir nesneye ayarlama fonksiyonu
  const setFormValues = (newValues) => {
    setValues(newValues);
  };
  
  // Hook'un döndürdüğü değerler ve fonksiyonlar
  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setValues: setFormValues
  };
}

export default useForm; 