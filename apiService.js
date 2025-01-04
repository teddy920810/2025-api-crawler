// FILEPATH: e:/project/2025-api-crawler/apiService.js
const axios = require('axios');
const { API_COOKIE, API_REFERER, API_TOKEN } = require('./config');

async function fetchData(url, data = {}, customHeaders = {}) {
  try {
    const headers = {
      'Cookie': API_COOKIE,
      'Referer': API_REFERER,
      'Access-token': API_TOKEN,
      ...customHeaders
    };

    const response = await axios.post(url, data, {
      headers: headers,
      timeout: 10000, // 10 seconds timeout
    });
    console.log(`Data fetched successfully from ${url}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
}

async function fetchSiteInfo(data = {}, customHeaders = {}) {
  const url = 'https://cms.afirstsoft.cn/site/info';
  return await fetchData(url, data, customHeaders);
}

async function fetchArticleTemplate(data = {}, customHeaders = {}) {
  const url = 'https://cms.afirstsoft.cn/page/articletemplate';
  return await fetchData(url, data, customHeaders);
}

async function fetchPageList(data = {}, customHeaders = {}) {
  const url = 'https://cms.afirstsoft.cn/page/list';
  return await fetchData(url, data, customHeaders);
}

async function fetchPageInfo(data = {}, customHeaders = {}) {
  const url = 'https://cms.afirstsoft.cn/page/info';
  return await fetchData(url, data, customHeaders);
}

// 新增的updatePage函数
async function updatePage(data = {}, customHeaders = {}) {
    const url = 'https://cms.afirstsoft.cn/page/update';
    return await fetchData(url, data, customHeaders);
  }

// 测试函数
async function testFetchSiteInfo() {
  try {
    const data = {}; // 添加所需的请求体数据
    const result = await fetchSiteInfo(data);
    console.log('Site Info:', result);
  } catch (error) {
    console.error('Error in testFetchSiteInfo:', error.message);
  }
}

async function testFetchArticleTemplate() {
  try {
    const data = {}; // 添加所需的请求体数据
    const result = await fetchArticleTemplate(data);
    console.log('Article Template:', result);
  } catch (error) {
    console.error('Error in testFetchArticleTemplate:', error.message);
  }
}

async function testFetchPageList() {
  try {
    const data = {
      page: 1,
      pageSize: 10
    }; // 示例请求体数据
    const result = await fetchPageList(data);
    console.log('Page List:', result);
  } catch (error) {
    console.error('Error in testFetchPageList:', error.message);
  }
}

async function testFetchPageInfo() {
  try {
    const data = {
      id: 'some-page-id'
    }; // 示例请求体数据
    const result = await fetchPageInfo(data);
    console.log('Page Info:', result);
  } catch (error) {
    console.error('Error in testFetchPageInfo:', error.message);
  }
}

// 新增的测试函数
async function testUpdatePage() {
    try {
      const data = {
        id: 'some-page-id',
        title: 'Updated Page Title',
        content: 'Updated page content...'
      }; // 示例请求体数据
      const result = await updatePage(data);
      console.log('Update Page Result:', result);
    } catch (error) {
      console.error('Error in testUpdatePage:', error.message);
    }
  }
  

module.exports = {
  fetchSiteInfo,
  fetchArticleTemplate,
  fetchPageList,
  fetchPageInfo,
  updatePage,
  testFetchSiteInfo,
  testFetchArticleTemplate,
  testFetchPageList,
  testFetchPageInfo,
  testUpdatePage
};
