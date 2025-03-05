import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import { ThemeContext } from '../../contexts/ThemeContext';

// Özel hook'larımızı import ediyoruz
import useCounter from '../../hooks/useCounter';
import useForm from '../../hooks/useForm';
import useLocalStorage from '../../hooks/useLocalStorage';

/**
 * CustomHooksSayfasi bileşeni
 * 
 * Bu sayfa, özel hook'ların nasıl oluşturulduğunu ve kullanıldığını gösterir.
 * useCounter, useForm ve useLocalStorage özel hook'larını içerir.
 */
const CustomHooksSayfasi = () => {
  // ThemeContext'ten tema durumunu alıyoruz
  const { darkMode } = useContext(ThemeContext);
  
  // useCounter hook'unu kullanma
  const { count, increment, decrement, reset, setCount } = useCounter(0, 1);
  
  // useForm hook'unu kullanma
  const { values, handleChange, handleSubmit, resetForm } = useForm({
    username: '',
    email: '',
    message: '',
    subscribe: false
  });
  
  // Form gönderildiğinde çalışacak fonksiyon
  const onSubmit = (formData) => {
    setFormSubmitted(true);
    setSubmittedData(formData);
    // 3 saniye sonra bildirimi kaldır
    setTimeout(() => setFormSubmitted(false), 3000);
  };
  
  // Form gönderildi mi durumunu tutmak için state
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Gönderilen form verilerini tutmak için state
  const [submittedData, setSubmittedData] = useState(null);
  
  // useLocalStorage hook'unu kullanma
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [newNote, setNewNote] = useState('');
  
  // Yeni not ekleme fonksiyonu
  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, { id: Date.now(), text: newNote }]);
      setNewNote('');
    }
  };
  
  // Not silme fonksiyonu
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  return (
    <div className={`page-container ${darkMode ? 'dark-mode' : ''}`} style={{
      backgroundColor: darkMode ? '#333' : '#f5f5f5',
      color: darkMode ? '#fff' : '#333',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Container className="my-4">
        <h1 className="text-center mb-4">Özel Hook'lar (Custom Hooks)</h1>
        <p className="lead text-center mb-5">
          React'te özel hook'lar oluşturarak kod tekrarını azaltabilir ve mantığı yeniden kullanılabilir hale getirebilirsiniz.
        </p>
        
        <div className="component-container" style={{
          backgroundColor: darkMode ? '#444' : '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h2>Özel Hook Nedir?</h2>
          <p>
            Özel hook'lar, React'in yerleşik hook'larını kullanarak kendi hook'larınızı oluşturmanıza olanak tanır.
            Bu, bileşenler arasında mantık paylaşımını kolaylaştırır ve kodunuzu daha modüler hale getirir.
          </p>
          <p>
            Özel hook'lar her zaman "use" ile başlamalıdır (örn. useCounter, useForm, useLocalStorage).
            Bu, React'in hook kurallarını uygulamasına yardımcı olur.
          </p>
        </div>
        
        <Row className="mb-5">
          <Col md={4}>
            <Card className="h-100" style={{
              backgroundColor: darkMode ? '#444' : '#fff',
              color: darkMode ? '#fff' : '#333',
              border: darkMode ? '1px solid #555' : '1px solid #ddd'
            }}>
              <Card.Header as="h5" style={{
                backgroundColor: darkMode ? '#555' : '#f0f0f0',
                color: darkMode ? '#fff' : '#333'
              }}>useCounter Hook</Card.Header>
              <Card.Body>
                <Card.Title>Sayaç: {count}</Card.Title>
                <Card.Text>
                  Bu hook, sayaç işlemlerini yönetmek için kullanılır. Artırma, azaltma, sıfırlama ve belirli bir değere ayarlama işlevleri sunar.
                </Card.Text>
                <div className="d-flex gap-2 mb-3">
                  <Button variant={darkMode ? "dark" : "primary"} onClick={increment}>Artır</Button>
                  <Button variant={darkMode ? "secondary" : "secondary"} onClick={decrement}>Azalt</Button>
                  <Button variant={darkMode ? "dark" : "warning"} onClick={reset}>Sıfırla</Button>
                </div>
                <div className="d-flex gap-2">
                  <Button variant={darkMode ? "dark" : "info"} onClick={() => setCount(10)}>10'a Ayarla</Button>
                  <Button variant={darkMode ? "dark" : "info"} onClick={() => setCount(100)}>100'e Ayarla</Button>
                </div>
              </Card.Body>
              <Card.Footer style={{
                backgroundColor: darkMode ? '#555' : '#f0f0f0',
                color: darkMode ? '#ccc' : '#666'
              }}>
                <small>useCounter(initialValue, step)</small>
              </Card.Footer>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100" style={{
              backgroundColor: darkMode ? '#444' : '#fff',
              color: darkMode ? '#fff' : '#333',
              border: darkMode ? '1px solid #555' : '1px solid #ddd'
            }}>
              <Card.Header as="h5" style={{
                backgroundColor: darkMode ? '#555' : '#f0f0f0',
                color: darkMode ? '#fff' : '#333'
              }}>useForm Hook</Card.Header>
              <Card.Body>
                <Card.Title>Form Yönetimi</Card.Title>
                <Card.Text>
                  Bu hook, form işlemlerini yönetmek için kullanılır. Form değerlerini, değişiklikleri ve form gönderimini yönetir.
                </Card.Text>
                
                {formSubmitted && (
                  <Alert variant={darkMode ? "dark" : "success"}>
                    Form başarıyla gönderildi!
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Kullanıcı Adı</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      placeholder="Kullanıcı adınızı girin"
                      style={{
                        backgroundColor: darkMode ? '#555' : '#fff',
                        color: darkMode ? '#fff' : '#333',
                        border: darkMode ? '1px solid #666' : '1px solid #ced4da'
                      }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>E-posta</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="E-posta adresinizi girin"
                      style={{
                        backgroundColor: darkMode ? '#555' : '#fff',
                        color: darkMode ? '#fff' : '#333',
                        border: darkMode ? '1px solid #666' : '1px solid #ced4da'
                      }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Mesaj</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Mesajınızı girin"
                      style={{
                        backgroundColor: darkMode ? '#555' : '#fff',
                        color: darkMode ? '#fff' : '#333',
                        border: darkMode ? '1px solid #666' : '1px solid #ced4da'
                      }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      name="subscribe"
                      checked={values.subscribe}
                      onChange={handleChange}
                      label="Bültene abone ol"
                      style={{
                        color: darkMode ? '#fff' : '#333'
                      }}
                    />
                  </Form.Group>
                  
                  <div className="d-flex gap-2">
                    <Button variant={darkMode ? "dark" : "primary"} type="submit">
                      Gönder
                    </Button>
                    <Button variant={darkMode ? "secondary" : "secondary"} type="button" onClick={resetForm}>
                      Formu Temizle
                    </Button>
                  </div>
                </Form>
                
                {submittedData && (
                  <div className="mt-3">
                    <h6>Son Gönderilen Veriler:</h6>
                    <pre className="bg-light p-2 rounded" style={{
                      backgroundColor: darkMode ? '#555' : '#f8f9fa',
                      color: darkMode ? '#fff' : '#333'
                    }}>
                      {JSON.stringify(submittedData, null, 2)}
                    </pre>
                  </div>
                )}
              </Card.Body>
              <Card.Footer style={{
                backgroundColor: darkMode ? '#555' : '#f0f0f0',
                color: darkMode ? '#ccc' : '#666'
              }}>
                <small>useForm(initialValues)</small>
              </Card.Footer>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100" style={{
              backgroundColor: darkMode ? '#444' : '#fff',
              color: darkMode ? '#fff' : '#333',
              border: darkMode ? '1px solid #555' : '1px solid #ddd'
            }}>
              <Card.Header as="h5" style={{
                backgroundColor: darkMode ? '#555' : '#f0f0f0',
                color: darkMode ? '#fff' : '#333'
              }}>useLocalStorage Hook</Card.Header>
              <Card.Body>
                <Card.Title>Kalıcı Notlar</Card.Title>
                <Card.Text>
                  Bu hook, tarayıcının localStorage API'sini kullanarak state'i kalıcı hale getirir. Sayfayı yenileseniz bile notlarınız kaybolmaz.
                </Card.Text>
                
                <Form.Group className="mb-3">
                  <Form.Label>Yeni Not</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Notunuzu girin"
                      style={{
                        backgroundColor: darkMode ? '#555' : '#fff',
                        color: darkMode ? '#fff' : '#333',
                        border: darkMode ? '1px solid #666' : '1px solid #ced4da'
                      }}
                    />
                    <Button variant={darkMode ? "dark" : "primary"} onClick={addNote}>Ekle</Button>
                  </div>
                </Form.Group>
                
                <ListGroup className="mt-3">
                  {notes.length === 0 ? (
                    <ListGroup.Item className="text-center text-muted" style={{
                      backgroundColor: darkMode ? '#555' : '#fff',
                      color: darkMode ? '#ccc' : '#6c757d',
                      border: darkMode ? '1px solid #666' : '1px solid #ddd'
                    }}>
                      Henüz not eklenmemiş
                    </ListGroup.Item>
                  ) : (
                    notes.map(note => (
                      <ListGroup.Item key={note.id} className="d-flex justify-content-between align-items-center" style={{
                        backgroundColor: darkMode ? '#555' : '#fff',
                        color: darkMode ? '#fff' : '#333',
                        border: darkMode ? '1px solid #666' : '1px solid #ddd'
                      }}>
                        {note.text}
                        <Button 
                          variant={darkMode ? "dark" : "danger"} 
                          size="sm" 
                          onClick={() => deleteNote(note.id)}
                        >
                          Sil
                        </Button>
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </Card.Body>
              <Card.Footer style={{
                backgroundColor: darkMode ? '#555' : '#f0f0f0',
                color: darkMode ? '#ccc' : '#666'
              }}>
                <small>useLocalStorage(key, initialValue)</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card style={{
              backgroundColor: darkMode ? '#444' : '#fff',
              color: darkMode ? '#fff' : '#333',
              border: darkMode ? '1px solid #555' : '1px solid #ddd'
            }}>
              <Card.Header as="h5" style={{
                backgroundColor: darkMode ? '#555' : '#f0f0f0',
                color: darkMode ? '#fff' : '#333'
              }}>Özel Hook Oluşturma Adımları</Card.Header>
              <Card.Body>
                <ol>
                  <li>
                    <strong>Hook İsmi:</strong> Özel hook'lar her zaman "use" ile başlamalıdır (örn. useCounter, useForm).
                  </li>
                  <li>
                    <strong>React Hook'larını Kullanın:</strong> Özel hook'lar içinde diğer React hook'larını (useState, useEffect, vb.) kullanabilirsiniz.
                  </li>
                  <li>
                    <strong>Mantığı Soyutlayın:</strong> Tekrar eden mantığı özel hook'lara çıkararak bileşenlerinizi daha temiz tutun.
                  </li>
                  <li>
                    <strong>Parametreler ve Dönüş Değerleri:</strong> Hook'unuzun nasıl kullanılacağını düşünerek uygun parametreler ve dönüş değerleri tasarlayın.
                  </li>
                  <li>
                    <strong>Dokümantasyon:</strong> Hook'unuzun nasıl kullanılacağını açıklayan JSDoc yorumları ekleyin.
                  </li>
                </ol>
                
                <h5 className="mt-4">Özel Hook'ların Faydaları</h5>
                <ul>
                  <li>Kod tekrarını azaltır</li>
                  <li>Mantığı yeniden kullanılabilir hale getirir</li>
                  <li>Bileşenleri daha temiz ve odaklanmış tutar</li>
                  <li>Test edilebilirliği artırır</li>
                  <li>Projenizde tutarlı çözümler sağlar</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <div className="note" style={{ 
          marginTop: '30px',
          padding: '15px',
          backgroundColor: darkMode ? '#555' : '#f8f9fa',
          borderLeft: `4px solid ${darkMode ? '#999' : '#0066cc'}`,
          borderRadius: '4px'
        }}>
          <p style={{ margin: 0 }}>
            <strong>Not:</strong> Özel hook'lar, React'in en güçlü özelliklerinden biridir. 
            Kendi hook'larınızı oluşturarak, uygulamanızın farklı bölümlerinde aynı mantığı tekrar tekrar yazmak zorunda kalmazsınız.
            Bu, kodunuzu daha temiz, daha modüler ve daha bakımı kolay hale getirir.
          </p>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <a 
            href="/" 
            className="home-link"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: darkMode ? '#444' : '#0066cc',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </Container>
    </div>
  );
};

export default CustomHooksSayfasi; 