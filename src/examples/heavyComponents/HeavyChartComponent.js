import React from 'react';

// Örnek veri
const chartData = [
  { month: 'Ocak', sales: 65 },
  { month: 'Şubat', sales: 59 },
  { month: 'Mart', sales: 80 },
  { month: 'Nisan', sales: 81 },
  { month: 'Mayıs', sales: 56 },
  { month: 'Haziran', sales: 55 },
  { month: 'Temmuz', sales: 40 }
];

// Basit bir çubuk grafik bileşeni
const HeavyChartComponent = () => {
  const maxSales = Math.max(...chartData.map(item => item.sales));
  
  return (
    <div className="chart-container">
      <h2>Aylık Satış Grafiği</h2>
      <p className="subtitle">Bu büyük grafik bileşeni lazy loading ile yüklendi</p>
      
      <div className="chart">
        {chartData.map((item, index) => (
          <div className="bar-container" key={index}>
            <div 
              className="bar" 
              style={{ 
                height: `${(item.sales / maxSales) * 200}px`,
                backgroundColor: `hsl(${210 + index * 10}, 70%, 50%)`
              }}
            >
              <span className="value">{item.sales}</span>
            </div>
            <div className="label">{item.month}</div>
          </div>
        ))}
      </div>
      
      <div className="info-panel">
        <div className="info-item">
          <h4>Toplam Satış</h4>
          <p>{chartData.reduce((sum, item) => sum + item.sales, 0)}</p>
        </div>
        <div className="info-item">
          <h4>Ortalama</h4>
          <p>{Math.round(chartData.reduce((sum, item) => sum + item.sales, 0) / chartData.length)}</p>
        </div>
        <div className="info-item">
          <h4>En Yüksek</h4>
          <p>{maxSales}</p>
        </div>
      </div>
      
      <p className="note">
        <strong>Not:</strong> Bu bileşen, gerçek bir grafiğin yükleme davranışını simüle etmek için tasarlanmıştır.
        Gerçek bir uygulamada, Chart.js, D3.js veya Recharts gibi kütüphaneler kullanılabilir.
      </p>
      
      <style jsx>{`
        .chart-container {
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
          margin-bottom: 30px;
        }
        
        .chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 250px;
          padding: 20px 0;
          border-bottom: 1px solid #eaeaea;
        }
        
        .bar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }
        
        .bar {
          width: 40px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          border-radius: 4px 4px 0 0;
          transition: height 0.5s ease;
        }
        
        .value {
          color: white;
          font-weight: bold;
          padding: 5px;
        }
        
        .label {
          margin-top: 8px;
          font-size: 12px;
        }
        
        .info-panel {
          display: flex;
          justify-content: space-around;
          margin-top: 30px;
          text-align: center;
        }
        
        .info-item {
          border: 1px solid #eaeaea;
          border-radius: 5px;
          padding: 10px 15px;
          background-color: #f9f9f9;
        }
        
        .info-item h4 {
          margin: 0;
          color: #666;
        }
        
        .info-item p {
          margin: 5px 0 0;
          font-size: 20px;
          font-weight: bold;
          color: #0066cc;
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

export default HeavyChartComponent; 