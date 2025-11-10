import { useState } from 'react'

interface LocalSearchProps {
  onSearch: (query: string) => void
  results: string[]
}

export default function LocalSearch({ onSearch, results }: LocalSearchProps) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setTimeout(() => {
      onSearch(searchQuery)
      setIsSearching(false)
    }, 500)
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    if (value.length > 2) {
      handleSearch(value)
    }
  }

  return (
    <div className="local-search">
      <h2 className="search-title">Local Search</h2>
      <p className="search-subtitle">Find documents and content quickly</p>

      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search documents, users, settings..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className="search-icon">🔍</div>
      </div>

      {isSearching && (
        <div className="search-loading">
          <div className="loading-spinner"></div>
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <div className="search-results">
          <h3 className="results-title">Search Results ({results.length})</h3>
          <div className="results-list">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-icon">📄</div>
                <div className="result-content">
                  <div className="result-text">{result}</div>
                  <div className="result-meta">Document • Modified today</div>
                </div>
                <button className="result-action">Open</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {query.length > 2 && results.length === 0 && !isSearching && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <div className="no-results-text">No results found for "{query}"</div>
          <div className="no-results-suggestion">
            Try different keywords or check your spelling
          </div>
        </div>
      )}

      <style>{`
        .local-search {
          color: white;
          height: 100%;
        }

        .search-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .search-subtitle {
          font-size: 0.875rem;
          opacity: 0.8;
          margin: 0 0 1.5rem 0;
        }

        .search-input-container {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .search-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.15);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.125rem;
          opacity: 0.6;
        }

        .search-loading {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .search-results {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .results-title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .result-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(4px);
        }

        .result-icon {
          font-size: 1.125rem;
          flex-shrink: 0;
        }

        .result-content {
          flex: 1;
        }

        .result-text {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.125rem;
        }

        .result-meta {
          font-size: 0.75rem;
          opacity: 0.6;
        }

        .result-action {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .result-action:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .no-results {
          text-align: center;
          padding: 2rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .no-results-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          opacity: 0.5;
        }

        .no-results-text {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .no-results-suggestion {
          font-size: 0.875rem;
          opacity: 0.6;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
