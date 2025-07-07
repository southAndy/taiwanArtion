# TaiwanArtion 早找展覽 - 幫你早找展覽

![TaiwanArtion Logo](/public/images/logoicon.png)

## 📝 專案介紹

TaiwanArtion 是一個幫助用戶發現和追蹤台灣各地藝術展覽的平台。目標是整合全台灣的展覽資訊，讓用戶能夠更便捷地找到感興趣的藝術活動。

### 主要功能

- 🔍 展覽搜尋：依據縣市、日期、門票價格篩選展覽
- 🗺️ 地圖導覽：以地圖方式查看附近展覽位置
- ❤️ 個人收藏：將喜歡的展覽加入收藏清單
- 📱 響應式設計：支援行動裝置和桌面版瀏覽

## 🚀 線上展示

- [Live Demo](https://taiwan-artion.vercel.app/) - 體驗 TaiwanArtion 平台

## 專案架構

```
taiwanArtion/
├── 📄 package.json # 專案依賴
├── 📄 vite.config.js # Vite 配置
├── 📄 firebase.config.js # Firebase 配置
├── 📄 index.html # 入口文件
│
├── 📂 public/ # 靜態資源
│ └── images/ # 圖片文件
│
└── 📂 src/ # 原始碼
├── 📄 main.jsx # 程式入口
│
├── 📂 pages/ # 頁面
│ ├── Home/ # 首頁
│ ├── Detail/ # 展覽詳情
│ ├── Map/ # 地圖
│ ├── Register/ # 註冊
│ └── Backstage/ # 後台
│
├── 📂 components/ # 可重用組件
│ ├── Button.jsx
│ ├── Modal.jsx
│ ├── Input/
│ └── Card/
│
├── 📂 container/ # 容器組件
│ ├── Header/
│ ├── Footer/
│ └── Menu/
│
├── 📂 store/ # 狀態管理
│ ├── index.js
│ ├── memberSlice.js
│ └── dataSlice.js
│
├── 📂 routes/ # 路由
├── 📂 assets/ # 資源文件
├── 📂 styles/ # 樣式
└── 📂 plugins/ # 插件
```

## 💻 使用技術

### 前端

- React.js - 使用者介面構建
- Redux - 狀態管理
- React Router - 路由管理
- Styled Components - CSS 樣式管理
- Firebase Authentication - 使用者認證

### 後端

- Firebase Firestore - 資料庫服務
- Render - 網站部署

### 工具

- Vite - 開發環境與建置工具
- ESLint/Standard - 程式碼風格檢查

## 📋 變動紀錄

- 前往查看完整的 [版本變動記錄](CHANGELOG.md)。
