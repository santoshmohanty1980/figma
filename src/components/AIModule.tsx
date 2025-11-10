import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AIModuleProps {
  onQuery: (query: string, outputType: string) => void
  results: any
}

export default function AIModule({ onQuery, results }: AIModuleProps) {
  const [query, setQuery] = useState('')
  const [outputType, setOutputType] = useState('text')
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const outputTypes = [
    { value: 'text', label: 'Text Output', icon: '📝' },
    { value: 'histogram', label: 'Histogram', icon: '📊' },
    { value: 'fileupload', label: 'File Upload', icon: '📁' }
  ]

  const handleSubmit = async () => {
    if (!query.trim()) return

    setIsProcessing(true)
    await onQuery(query, outputType)
    setIsProcessing(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const renderResults = () => {
    if (!results) return null

    switch (results.type) {
      case 'text':
        return (
          <div className="ai-text-result">
            <h4 className="result-title">AI Response</h4>
            <div className="text-content">
              {results.content}
            </div>
          </div>
        )

      case 'histogram':
        return (
          <div className="ai-chart-result">
            <h4 className="result-title">{results.content.title}</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={results.content.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="name" stroke="white" fontSize={10} />
                <YAxis stroke="white" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )

      case 'fileupload':
        return (
          <div className="ai-upload-result">
            <h4 className="result-title">File Upload Ready</h4>
            <div className="upload-content">
              <div className="upload-icon">📁</div>
              <p>{results.content}</p>
              
              <div className="file-upload-area">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  className="file-input"
                  accept=".txt,.pdf,.doc,.docx,.csv,.json"
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  {uploadedFile ? uploadedFile.name : 'Choose File to Upload'}
                </label>
              </div>

              {uploadedFile && (
                <div className="uploaded-file">
                  <div className="file-info">
                    <span className="file-name">{uploadedFile.name}</span>
                    <span className="file-size">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <button 
                    className="process-button"
                    onClick={() => console.log('Processing file:', uploadedFile.name)}
                  >
                    Process File
                  </button>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="ai-module">
      <h2 className="ai-title">AI Assistant</h2>
      <p className="ai-subtitle">Query AI for insights and analysis</p>
      
      <div className="ai-controls">
        <div className="query-section">
          <label className="query-label">Your Query</label>
          <textarea
            className="query-input"
            placeholder="Ask me anything... e.g., 'Analyze user behavior trends' or 'Generate sales report'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
          />
        </div>

        <div className="output-type-section">
          <label className="output-label">Output Type</label>
          <div className="output-types">
            {outputTypes.map((type) => (
              <button
                key={type.value}
                className={`output-type-button ${outputType === type.value ? 'active' : ''}`}
                onClick={() => setOutputType(type.value)}
              >
                <span className="output-icon">{type.icon}</span>
                <span className="output-label-text">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="ai-submit-button"
          onClick={handleSubmit}
          disabled={!query.trim() || isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="processing-spinner"></div>
              Processing...
            </>
          ) : (
            <>
              <span className="submit-icon">🚀</span>
              Generate AI Response
            </>
          )}
        </button>
      </div>

      <div className="ai-results">
        {renderResults()}
      </div>

      <style jsx>{`
        .ai-module {
          color: white;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .ai-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .ai-subtitle {
          font-size: 0.875rem;
          opacity: 0.8;
          margin: 0 0 1.5rem 0;
        }

        .ai-controls {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .query-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .query-label {
          font-size: 0.875rem;
          font-weight: 500;
          opacity: 0.9;
        }

        .query-input {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.875rem;
          font-family: inherit;
          resize: vertical;
          backdrop-filter: blur(10px);
          box-sizing: border-box;
        }

        .query-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .query-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.15);
        }

        .output-type-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .output-label {
          font-size: 0.875rem;
          font-weight: 500;
          opacity: 0.9;
        }

        .output-types {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }

        .output-type-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .output-type-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .output-type-button.active {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .output-icon {
          font-size: 1rem;
        }

        .output-label-text {
          font-weight: 500;
        }

        .ai-submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ai-submit-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
        }

        .ai-submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .submit-icon {
          font-size: 1.125rem;
        }

        .processing-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .ai-results {
          flex: 1;
          margin-top: 1rem;
        }

        .ai-text-result {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .ai-chart-result {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .ai-upload-result {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .result-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .text-content {
          font-size: 0.875rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .upload-content {
          text-align: center;
        }

        .upload-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .file-upload-area {
          margin: 1rem 0;
        }

        .file-input {
          display: none;
        }

        .file-upload-label {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border: 2px dashed rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .file-upload-label:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .uploaded-file {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .file-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .file-name {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .file-size {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .process-button {
          background: #10b981;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .process-button:hover {
          background: #059669;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .output-types {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
