import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 获取 HTML 中的根元素
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("找不到挂载点 (root element)，请检查 index.html");
}

console.log("正在初始化 React 应用...");

// 使用 React 18 的 createRoot API 渲染应用
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);