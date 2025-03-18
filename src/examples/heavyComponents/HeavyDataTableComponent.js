import React, { useState } from 'react';

// Örnek veri - büyük bir veri seti simüle ediliyor
const generateUserData = (count) => {
  const users = [];
  const statuses = ['Aktif', 'Beklemede', 'Devre Dışı'];
  const departments = ['Pazarlama', 'Satış', 'Mühendislik', 'İnsan Kaynakları', 'Finans', 'Destek'];
  
  for (let i = 1; i <= count; i++) {
    users.push({
      id: i,
      name: `Kullanıcı ${i}`,
      email: `kullanici${i}@ornek.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR'),
      registeredAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR')
    });
  }
  
  return users;
};

const userData = generateUserData(100);

// Veri Tablosu Bileşeni
const HeavyDataTableComponent = () => {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Sıralama fonksiyonu
  const sortData = (data) => {
    return [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  // Filtreleme fonksiyonu
  const filterData = (data) => {
    if (!filter) return data;
    
    const lowercaseFilter = filter.toLowerCase();
    return data.filter(item => 
      item.name.toLowerCase().includes(lowercaseFilter) ||
      item.email.toLowerCase().includes(lowercaseFilter) ||
      item.status.toLowerCase().includes(lowercaseFilter) ||
      item.department.toLowerCase().includes(lowercaseFilter)
    );
  };
  
  // Sırala ve filtrele
  const processedData = sortData(filterData(userData));
  
  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = processedData.slice(startIndex, startIndex + itemsPerPage);
  
  // Sıralama yönünü değiştir
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Sayfa değiştirme fonksiyonu
  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  
  return (
    <div className="data-table-container">
      <h2>Kullanıcı Verileri Tablosu</h2>
      <p className="subtitle">Bu büyük veri tablosu bileşeni lazy loading ile yüklendi</p>
      
      <div className="table-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Ara..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="table-info">
          Toplam {processedData.length} kullanıcı | Sayfa {currentPage} / {totalPages}
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className={sortField === 'id' ? `sorted-${sortDirection}` : ''}>
                ID
              </th>
              <th onClick={() => handleSort('name')} className={sortField === 'name' ? `sorted-${sortDirection}` : ''}>
                Ad
              </th>
              <th onClick={() => handleSort('email')} className={sortField === 'email' ? `sorted-${sortDirection}` : ''}>
                E-posta
              </th>
              <th onClick={() => handleSort('status')} className={sortField === 'status' ? `sorted-${sortDirection}` : ''}>
                Durum
              </th>
              <th onClick={() => handleSort('department')} className={sortField === 'department' ? `sorted-${sortDirection}` : ''}>
                Departman
              </th>
              <th onClick={() => handleSort('lastLogin')} className={sortField === 'lastLogin' ? `sorted-${sortDirection}` : ''}>
                Son Giriş
              </th>
              <th onClick={() => handleSort('registeredAt')} className={sortField === 'registeredAt' ? `sorted-${sortDirection}` : ''}>
                Kayıt Tarihi
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge status-${user.status.toLowerCase().replace(' ', '-')}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.department}</td>
                <td>{user.lastLogin}</td>
                <td>{user.registeredAt}</td>
              </tr>
            ))}
            
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="7" className="no-results">
                  Sonuç bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => changePage(1)} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          İlk
        </button>
        <button 
          onClick={() => changePage(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Önceki
        </button>
        
        <div className="page-numbers">
          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = index + 1;
            } else if (currentPage <= 3) {
              pageNum = index + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + index;
            } else {
              pageNum = currentPage - 2 + index;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => changePage(pageNum)}
                className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        
        <button 
          onClick={() => changePage(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Sonraki
        </button>
        <button 
          onClick={() => changePage(totalPages)} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Son
        </button>
      </div>
      
      <p className="note">
        <strong>Not:</strong> Bu bileşen, gerçek bir veri tablosunun yükleme davranışını simüle etmek için tasarlanmıştır.
        Gerçek bir uygulamada, performans için sanal liste (virtualized list) kullanılabilir.
      </p>
      
      <style jsx>{`
        .data-table-container {
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
        
        .table-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .search-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 250px;
        }
        
        .table-info {
          color: #666;
          font-size: 14px;
        }
        
        .table-wrapper {
          overflow-x: auto;
        }
        
        .data-table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        
        .data-table th, .data-table td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eaeaea;
        }
        
        .data-table th {
          background-color: #f9f9f9;
          cursor: pointer;
          position: relative;
        }
        
        .data-table th:hover {
          background-color: #f0f0f0;
        }
        
        .data-table th::after {
          content: "";
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .data-table th.sorted-asc::after {
          content: "▲";
          font-size: 10px;
        }
        
        .data-table th.sorted-desc::after {
          content: "▼";
          font-size: 10px;
        }
        
        .data-table tbody tr:hover {
          background-color: #f9f9f9;
        }
        
        .status-badge {
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 12px;
        }
        
        .status-aktif {
          background-color: #d4edda;
          color: #155724;
        }
        
        .status-beklemede {
          background-color: #fff3cd;
          color: #856404;
        }
        
        .status-devre-dışı {
          background-color: #f8d7da;
          color: #721c24;
        }
        
        .no-results {
          text-align: center;
          padding: 20px;
          color: #999;
        }
        
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          gap: 5px;
        }
        
        .page-numbers {
          display: flex;
          gap: 5px;
        }
        
        .pagination-button {
          padding: 5px 10px;
          border: 1px solid #ddd;
          background-color: white;
          cursor: pointer;
          border-radius: 3px;
        }
        
        .pagination-button:hover:not(:disabled) {
          background-color: #f0f0f0;
        }
        
        .pagination-button.active {
          background-color: #0066cc;
          color: white;
          border-color: #0066cc;
        }
        
        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

export default HeavyDataTableComponent; 