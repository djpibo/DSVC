interface ParsedColumn {
  schema: string;
  table: string;
  columnName: string;
  dataType: string;
  dataLength: string;
}

export function parseSQLScript(sqlScript: string): ParsedColumn[] {
  const tableRegex = /CREATE TABLE (\w+)\.(\w+)\s*\(([\s\S]+?)\)\s*$/gm;
  const columns: ParsedColumn[] = [];

  let tableMatch;

  // 테이블 단위로 분리
  while ((tableMatch = tableRegex.exec(sqlScript)) !== null) {
    const schema = tableMatch[1]; // 스키마명
    const table = tableMatch[2]; // 테이블명
    const columnBlock = tableMatch[3]; // 컬럼 전체 정의

    // 컬럼 단위로 분리
    const columnLines = columnBlock.split(/\r?\n/).map(line => line.trim()).filter(line => line !== '');

    for (const columnLine of columnLines) {
      if (!columnLine.endsWith(',')) {
        // 마지막 컬럼인 경우 , 제거
        columnLine.replace(/\)$/, '');
      }

      // 컬럼명과 데이터 타입 분리
      const columnMatch = columnLine.match(/^(\w+)\s+([A-Za-z0-9]+)(\(([\d,]+)\))?/);
      if (columnMatch) {
        const columnName = columnMatch[1];
        const dataType = columnMatch[2];
        const dataLength = columnMatch[4] || ''; // 길이가 없을 경우 빈 문자열로 설정

        columns.push({
          schema,
          table,
          columnName,
          dataType,
          dataLength,
        });
      }
    }
  }

  return columns;
}
