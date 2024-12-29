'use client';

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./OraclePage.css";

export default function OraclePage() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>(
    "파싱된 데이터가 여기에 표시됩니다."
  ); // 초기 문구 설정

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 파일 파싱 핸들러
  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setParsedData(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  // 텍스트를 클립보드로 복사하는 함수
  const copyToClipboard = () => {
    navigator.clipboard.writeText(parsedData).then(() => {
      toast.success("텍스트가 클립보드에 복사되었습니다!"); // toast 메시지
    });
  };

  // 텍스트 영역 클릭 시 복사
  const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
    if (e.detail === 1) {
      // 한 번 클릭: 텍스트 복사
      copyToClipboard();
    }
  };

  // hover 상태에서 문구 변경
  const handleMouseEnter = () => {
    setDescriptionText("클릭 시 텍스트 복사");
  };

  const handleMouseLeave = () => {
    setDescriptionText("파싱된 데이터가 여기에 표시됩니다.");
  };

  return (
    <div className="oracle-page">
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* 왼쪽: 파일 업로드 섹션 */}
        <Card className="oracle-card">
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
                  <p className="file-selected">선택된 파일: {file.name}</p>
                ) : (
                  <p>파일을 선택하세요</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleFileUpload}>Parsing</Button>
          </CardFooter>
        </Card>

        {/* 오른쪽: 파싱 결과 섹션 */}
        <Card className="oracle-card">
          <CardHeader>
            <div>
              <CardTitle>파싱 결과</CardTitle>
              <CardDescription>{descriptionText}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="parsed-result">
            <Textarea
              className="result-textarea"
              value={parsedData}
              readOnly
              placeholder="파싱된 결과가 여기에 표시됩니다."
              onClick={handleTextareaClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}