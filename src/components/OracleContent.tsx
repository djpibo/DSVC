'use client';

import { useState } from 'react';

export default function OracleContent() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setParsedData(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="oracle-container">
      {/* 왼쪽: 파일 업로드 */}
      <div className="upload-section">
        <h2>📂 파일 업로드</h2>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleFileUpload} className="upload-button">업로드 및 파싱</button>
      </div>

      {/* 오른쪽: 파싱 결과 */}
      <div className="result-section">
        <h2>📊 파싱 결과</h2>
        <textarea
          className="result-area"
          value={parsedData}
          readOnly
          placeholder="파싱된 결과가 여기에 표시됩니다."
        />
      </div>
    </div>
  );
}
