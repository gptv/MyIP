// static-server.js
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const staticApp = express();
const backEndPort = process.env.BACKEND_PORT || 11966;
const frontEndPort = process.env.FRONTEND_PORT || 18966;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API 请求代理到后端服务
staticApp.use('/api', createProxyMiddleware({ 
  target: `http://localhost:${backEndPort}/api`,
  changeOrigin: true
}));

// 设置静态文件目录
staticApp.use(express.static(path.join(__dirname, './dist')));

// 启动静态文件服务
staticApp.listen(frontEndPort, () => {
  console.log(`Static file server running on port http://localhost:${frontEndPort}`);
});
