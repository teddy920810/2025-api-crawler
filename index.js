// FILEPATH: e:/project/2025-api-crawler/index.js
const {
  fetchSiteInfo,
  fetchArticleTemplate,
  fetchPageList,
  fetchPageInfo,
  updatePage
} = require('./apiService');
const { readExcel } = require('./excelService');
const { API_TOKEN, EXCEL_FILE_PATH, API_COOKIE, API_REFERER } = require('./config');

async function processApiData(data, type) {
  //console.log(`Processing ${type} data:`, data);
  // 在这里添加特定的数据处理逻辑
  //查询data.content中第一次出现"HitPaw Univd"的位置并将"HitPaw Univd"替换为"HitPaw Univd (HitPaw Video Converter)"
  const index = data.content.search(/(?<!['"])HitPaw Univd(?!['"])/);
  if (index !== -1) {
    data.content = data.content.slice(0, index) + 'HitPaw Univd (HitPaw Video Converter)' + data.content.slice(index + 'HitPaw Univd'.length);
  }
  //控制台打印data的信息
  console.log(data.content);
  //更新页面
  const result = await updatePage(data);
  console.log('Update Page Result:', result);
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processAllPages() {
  try {
    // 从 Excel 文件读取所有 ID
    const ids = readExcel();
    if (ids.length === 0) {
      console.error('No IDs found in the Excel file');
      return;
    }

    console.log(`Found ${ids.length} IDs in the Excel file.`);

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      console.log(`Processing ID ${i + 1}/${ids.length}: ${id}`);

      try {
        const params = { id: id };
        const data = await fetchPageInfo(params);
        await processApiData(data.data, 'pageInfo');

        // 添加延迟以避免对 API 发送太多快速请求
        if (i < ids.length - 1) {
          console.log('Waiting 2 seconds before next request...');
          await delay(2000); // 2秒延迟
        }
      } catch (error) {
        console.error(`Error processing ID ${id}:`, error.message);
        // 继续处理下一个 ID，而不是中断整个过程
      }
    }

    console.log('All pages processed.');
  } catch (error) {
    console.error('Error in processAllPages:', error.message);
  }
}

processAllPages();