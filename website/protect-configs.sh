#!/bin/bash
# 监控tsconfig文件变化的脚本

# 备份原始文件
cp tsconfig.json tsconfig.json.backup
cp tsconfig.app.json tsconfig.app.json.backup  
cp tsconfig.node.json tsconfig.node.json.backup

# 监控文件变化
while true; do
    if [ tsconfig.json -nt tsconfig.json.backup ]; then
        echo "检测到tsconfig.json被修改，正在恢复..."
        cp tsconfig.json.backup tsconfig.json
    fi
    
    if [ tsconfig.app.json -nt tsconfig.app.json.backup ]; then
        echo "检测到tsconfig.app.json被修改，正在恢复..."
        cp tsconfig.app.json.backup tsconfig.app.json
    fi
    
    if [ tsconfig.node.json -nt tsconfig.node.json.backup ]; then
        echo "检测到tsconfig.node.json被修改，正在恢复..."
        cp tsconfig.node.json.backup tsconfig.node.json
    fi
    
    sleep 5
done
