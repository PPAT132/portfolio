#!/bin/bash
# 清理缓存并启动开发服务器
echo "清理vite缓存..."
rm -rf node_modules/.vite
echo "启动开发服务器..."
npm run dev
