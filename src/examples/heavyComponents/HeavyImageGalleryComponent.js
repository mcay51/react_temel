import React, { useState } from 'react';

// Örnek resim verileri - gerçekte bunlar yüksek çözünürlüklü resimler olurdu
const imageData = [
  {
    id: 1,
    title: 'Doğa Manzarası 1',
    url: 'https://source.unsplash.com/300x200/?nature,water',
    description: 'Göl kenarında güzel bir manzara'
  },
  {
    id: 2,
    title: 'Şehir Manzarası',
    url: 'https://source.unsplash.com/300x200/?city,architecture',
    description: 'Modern şehir mimarisi'
  },
  {
    id: 3,
    title: 'Yemek Fotoğrafı',
    url: 'https://source.unsplash.com/300x200/?food,dinner',
    description: 'Nefis görünen bir yemek'
  },
  {
    id: 4,
    title: 'Hayvan Fotoğrafı',
    url: 'https://source.unsplash.com/300x200/?animal,wild',
    description: 'Doğal yaşam alanındaki vahşi hayvan'
  },
  {
    id: 5,
    title: 'Teknoloji',
    url: 'https://source.unsplash.com/300x200/?technology,computer',
    description: 'Modern teknoloji ürünleri'
  },
  {
    id: 6,
    title: 'Spor Etkinliği',
    url: 'https://source.unsplash.com/300x200/?sport,action',
    description: 'Heyecan verici bir spor anı'
  },
  {
    id: 7,
    title: 'Sahil Manzarası',
    url: 'https://source.unsplash.com/300x200/?beach,ocean',
    description: 'Masmavi okyanusun kıyısı'
  },
  {
    id: 8,
    title: 'Sanat Eseri',
    url: 'https://source.unsplash.com/300x200/?art,painting',
    description: 'Etkileyici bir sanat eseri'
  },
  {
    id: 9,
    title: 'Dağ Manzarası',
    url: 'https://source.unsplash.com/300x200/?mountain,snow',
    description: 'Karlı dağ zirvesi'
  }
];

// Resim Galerisi Bileşeni
const HeavyImageGalleryComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' veya 'slider'
  
  // Bir sonraki resme geç
  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % imageData.length);
  };
  
  // Bir önceki resme geç
  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + imageData.length) % imageData.length);
  };
  
  // Belirli bir resme geç
  const goToImage = (index) => {
    setActiveIndex(index);
  };
  
  // Görünüm modunu değiştir
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'slider' : 'grid');
  };
  
  return (
    <div className="gallery-container">
      <h2>Resim Galerisi</h2>
      <p className="subtitle">Bu büyük resim galerisi bileşeni lazy loading ile yüklendi</p>
      
      <div className="gallery-controls">
        <button 
          className={`view-toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={toggleViewMode}
        >
          {viewMode === 'grid' ? 'Slider Görünümü' : 'Grid Görünümü'}
        </button>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="image-grid">
          {imageData.map((image, index) => (
            <div 
              key={image.id} 
              className="image-item"
              onClick={() => {
                setViewMode('slider');
                goToImage(index);
              }}
            >
              <img src={image.url} alt={image.title} />
              <div className="image-overlay">
                <h4>{image.title}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="image-slider">
          <button className="slider-arrow prev" onClick={goToPrev}>
            &#10094;
          </button>
          
          <div className="slider-content">
            <div className="active-image">
              <img 
                src={imageData[activeIndex].url} 
                alt={imageData[activeIndex].title} 
              />
            </div>
            
            <div className="image-info">
              <h3>{imageData[activeIndex].title}</h3>
              <p>{imageData[activeIndex].description}</p>
              <div className="image-counter">
                {activeIndex + 1} / {imageData.length}
              </div>
            </div>
          </div>
          
          <button className="slider-arrow next" onClick={goToNext}>
            &#10095;
          </button>
        </div>
      )}
      
      {viewMode === 'slider' && (
        <div className="thumbnail-strip">
          {imageData.map((image, index) => (
            <div 
              key={image.id}
              className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
            >
              <img src={image.url} alt={image.title} />
            </div>
          ))}
        </div>
      )}
      
      <p className="note">
        <strong>Not:</strong> Bu bileşen, gerçek bir resim galerisinin yükleme davranışını simüle etmek için tasarlanmıştır.
        Gerçek bir uygulamada, responsive image loading ve lazy loading teknikleri kullanılabilir.
      </p>
      
      <style jsx>{`
        .gallery-container {
          width: 100%;
          padding: 15px;
          border-radius: 8px;
          background-color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        h2 {
          margin-top: 0;
          color: #333;
          text-align: center;
        }
        
        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 20px;
        }
        
        .gallery-controls {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .view-toggle-button {
          padding: 8px 16px;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .view-toggle-button.active {
          background-color: #0066cc;
          color: white;
          border-color: #0066cc;
        }
        
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }
        
        .image-item {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: transform 0.3s;
        }
        
        .image-item:hover {
          transform: translateY(-5px);
        }
        
        .image-item img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }
        
        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: white;
          padding: 15px;
          transition: opacity 0.3s;
        }
        
        .image-overlay h4 {
          margin: 0;
          font-size: 16px;
        }
        
        .image-slider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .slider-arrow {
          background-color: #f0f0f0;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          transition: background-color 0.3s;
        }
        
        .slider-arrow:hover {
          background-color: #e0e0e0;
        }
        
        .slider-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .active-image {
          margin-bottom: 15px;
        }
        
        .active-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 4px;
        }
        
        .image-info {
          padding: 10px;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
        
        .image-info h3 {
          margin-top: 0;
          margin-bottom: 5px;
          color: #333;
        }
        
        .image-info p {
          color: #666;
          margin: 0 0 10px 0;
        }
        
        .image-counter {
          text-align: right;
          color: #999;
          font-size: 14px;
        }
        
        .thumbnail-strip {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 10px 0;
        }
        
        .thumbnail {
          flex: 0 0 80px;
          height: 60px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .thumbnail.active {
          border-color: #0066cc;
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .note {
          margin-top: 20px;
          color: #999;
          font-size: 14px;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default HeavyImageGalleryComponent; 