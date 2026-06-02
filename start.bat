@echo off
cd /d %~dp0

echo ========================================
echo   待办事项Web应用 - 快速启动脚本
echo ========================================
echo 当前目录: %cd%
echo.

echo [1/3] 检查Node.js环境...
node --version
if errorlevel 1 (
    echo.
    echo ❌ 错误: Node.js 未安装或未添加到系统PATH
    echo.
    echo 请按照以下步骤操作:
    echo 1. 访问 https://nodejs.org/ 下载并安装 Node.js
    echo 2. 选择 LTS 版本 (推荐 18.x 或 20.x)
    echo 3. 安装时确保勾选 "Add to PATH" 选项
    echo 4. 安装完成后重新打开命令提示符
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js 已就绪

echo.
echo [2/3] 安装项目依赖...
call npm install
if errorlevel 1 (
    echo.
    echo ❌ 错误: 依赖安装失败 (错误码: %errorlevel%)
    echo.
    echo 请尝试手动执行以下命令:
    echo   npm install
    echo.
    pause
    exit /b 1
)
echo ✅ 依赖安装完成

echo.
echo [3/3] 启动开发服务器...
echo.
echo 🌐 应用将在浏览器中打开: http://localhost:5173
echo ⚠️  请保持此窗口打开，按 Ctrl+C 可停止服务器
echo.

timeout /t 2 /nobreak >nul

start "" http://localhost:5173

call npm run dev

pause
