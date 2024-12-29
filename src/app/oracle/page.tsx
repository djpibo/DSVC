'use client';

import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import { parseSQLScript } from "@/lib/parser";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; 
import { ParsedColumn } from "@/types/parsedColums";
import "react-toastify/dist/ReactToastify.css";
import "./OraclePage.css";

export default function OraclePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState<string>(""); // 파일 크기 상태 추가
  const [parsedData, setParsedData] = useState<ParsedColumn[]>([]); 
  const [descriptionText] = useState<string>("파싱된 데이터가 여기에 표시됩니다."); 
  const tableRef = useRef<HTMLTableElement | null>(null); // 테이블 참조 추가

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileSize((selectedFile.size / 1024 / 1024).toFixed(2) + " MB"); // 파일 크기 MB로 표시
    }
  };

  // 파일 파싱 핸들러
  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const sqlScript = event.target?.result as string;

        // 실제 파싱 함수 호출
        const result = parseSQLScript(sqlScript);
        setParsedData(result);
        
        // 파싱 후 자동으로 텍스트 파일 다운로드
        downloadParsedData(result);
      };
      reader.readAsText(file);
    }
  };

  // 파싱된 데이터를 텍스트 파일로 다운로드
  const downloadParsedData = (data: ParsedColumn[]) => {
    const textData = data.map((row) =>
      `${row.schema}\t${row.table}\t${row.columnName}\t${row.dataType}\t${row.dataLength}`
    ).join("\n");

    const blob = new Blob([textData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'parsed_data.txt';
    link.click();  // 자동으로 다운로드 시작
  };

  // 전체 테이블 복사 핸들러
  const handleTableCopy = () => {
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll('tr');
      let tableText = '';

      rows.forEach((row) => {
        const cells = row.querySelectorAll('th, td');
        const rowText = Array.from(cells)
          .map((cell) => cell.textContent?.trim() || '')
          .join('\t');
        tableText += rowText + '\n';
      });

      navigator.clipboard.writeText(tableText)
        .then(() => {
          toast.success('테이블 전체 데이터가 클립보드에 복사되었습니다!', {
            position: 'top-center',
            autoClose: 2000,
          });
        })
        .catch(() => {
          toast.error('클립보드 복사에 실패했습니다.');
        });
    }
  };

  return (
    <div className="oracle-page">
      <div className="flex-container">
        {/* 왼쪽: 파일 업로드 섹션 */}
        <Card className="oracle-card upload-card">
          <CardHeader>
            <CardTitle>파일 업로드</CardTitle>
            <CardDescription>업로드할 파일을 선택해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="upload-container">
              <Label htmlFor="file" className="upload-label">
                파일을 선택하거나 드래그 앤 드롭하세요.
              </Label>
              <Input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="file-status">
                {file ? (
                  <p className="file-selected">선택된 파일: {file.name} ({fileSize})</p>
                ) : (
                  <p>파일을 선택하세요</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleFileUpload}>파싱</Button>
          </CardFooter>
        </Card>
  
        {/* 오른쪽: 파싱 결과 섹션 */}
        <Card className="oracle-card result-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>파싱 결과</CardTitle>
                <CardDescription>{descriptionText}</CardDescription>
              </div>
              <Button onClick={handleTableCopy} variant="outline" className="copy-button">
                전체 복사
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table ref={tableRef}>
              <TableHeader>
                <TableRow>
                  <TableHead>스키마</TableHead>
                  <TableHead>테이블</TableHead>
                  <TableHead>칼럼</TableHead>
                  <TableHead>데이터타입</TableHead>
                  <TableHead>길이</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parsedData.length > 0 ? (
                  parsedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.schema}</TableCell>
                      <TableCell>{row.table}</TableCell>
                      <TableCell>{row.columnName}</TableCell>
                      <TableCell>{row.dataType}</TableCell>
                      <TableCell>{row.dataLength}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>파싱된 데이터가 없습니다.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );  
}
