'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function OraclePage() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string>('');

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

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* 왼쪽: 파일 업로드 섹션 */}
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>파일 업로드</CardTitle>
          <CardDescription>업로드할 파일을 선택해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              'border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition'
            )}
          >
            <Label htmlFor="file" className="block text-sm mb-2">
              파일을 선택하거나 드래그 앤 드롭하세요.
            </Label>
            <Input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="mt-2 text-sm text-gray-500">
              {file ? (
                <p className="text-green-600">선택된 파일: {file.name}</p>
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
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>파싱 결과</CardTitle>
          <CardDescription>파싱된 데이터가 여기에 표시됩니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="h-40"
            value={parsedData}
            readOnly
            placeholder="파싱된 결과가 여기에 표시됩니다."
          />
        </CardContent>
      </Card>
    </div>
  );
}
