// FILEPATH: e:/project/2025-api-crawler/excelService.js
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { EXCEL_FILE_PATH, RESULT_EXCEL_FILE_PATH } = require('./config');

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

//写入Excel文件
function writeExcel(data) {
  try {
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid or empty data provided');
    }

    console.log('Writing to file:', RESULT_EXCEL_FILE_PATH);

    // 确保目录存在
    const dir = path.dirname(RESULT_EXCEL_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log('Created directory:', dir);
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, RESULT_EXCEL_FILE_PATH);
    
    // 验证文件是否成功写入
    if (fs.existsSync(RESULT_EXCEL_FILE_PATH)) {
      console.log('Excel file written successfully');
    } else {
      throw new Error('File was not created');
    }
  } catch (error) {
    console.error('Error writing Excel file:', error.message);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

module.exports = { readExcel, writeExcel };
