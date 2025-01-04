// FILEPATH: e:/project/2025-api-crawler/excelService.js
const XLSX = require('xlsx');
const { EXCEL_FILE_PATH } = require('./config');

function readExcel() {
  try {
    const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // 假设第一列是 ID，我们返回第一列的所有值（跳过标题行）
    return data.slice(1).map(row => row[0]);
  } catch (error) {
    console.error('Error reading Excel file:', error.message);
    return [];
  }
}

module.exports = { readExcel };
