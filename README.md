# 智能模拟时钟 (Smart Analog Clock)

一个基于 React + Vite 构建的现代化模拟时钟应用。

## ✨ 功能特性

- **🕒 实时/手动模式**：支持实时显示当前系统时间，也可以切换到手动模式通过滑块自由调整时间。
- **🎨 个性化设置**：
  - 支持 12/24 小时制切换
  - 支持显示/隐藏表盘数字
  - 支持中/英文界面切换
- **⚡️ 现代化技术栈**：使用 React 19、TypeScript 和 Vite 开发，响应迅速。

## 🛠️ 技术栈

- **前端框架**: [React 19](https://react.dev/)
- **开发语言**: [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **包管理器**: [pnpm](https://pnpm.io/)

## 🚀 快速开始

### 1. 环境准备

确保你的开发环境已安装以下工具：
- [Node.js](https://nodejs.org/) (推荐 v18 或更高版本)
- [pnpm](https://pnpm.io/) (本项目推荐使用 pnpm 管理依赖)

### 2. 安装依赖

```bash
# 安装项目依赖
pnpm install
```

### 3. 启动项目

```bash
# 启动开发服务器
pnpm dev
```

启动后，在浏览器访问 `http://localhost:3000` 即可体验。

## 📂 目录结构说明

```
.
├── components/        # React UI 组件
│   ├── ClockFace.tsx    # 时钟盘面组件
│   ├── ControlPanel.tsx # 控制面板组件
│   └── SettingsModal.tsx # 设置弹窗
├── App.tsx            # 主应用组件，包含核心状态管理
├── index.tsx          # 应用入口文件
├── types.ts           # TypeScript 类型定义
├── constants.ts       # 常量与多语言配置
├── vite.config.ts     # Vite 配置文件
└── package.json       # 项目依赖配置
```

## 📝 脚本说明

- `pnpm dev`: 启动本地开发服务器
- `pnpm build`: 构建生产环境代码
- `pnpm preview`: 预览构建后的产物

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来改进这个项目！
