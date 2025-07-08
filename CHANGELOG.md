# 更新日誌

## 2025-07-08

### 重構 Header 元件

拆分成以下架構

```
src/container/Header/
├── Header.jsx                    # 主容器，組裝所有部件
├── components/
│   ├── Logo.jsx                 # Header 專屬 Logo 區塊
│   ├── Navigation.jsx           # Header 專屬導航
│   ├── UserSection.jsx          # Header 專屬用戶區塊
│   ├── MobileMenu.jsx           # Header 專屬手機選單
│   └── SearchBar.jsx            # Header 專屬搜尋列
├── hooks/
│   ├── useHeaderModals.js       # Modal 狀態管理
│   └── useHeaderMenu.js         # 選單邏輯
└── styles/
    └── HeaderStyles.js          # Header 專屬樣式
```

#### 為何要這樣拆

- 渲染策略：理解了 React 的渲染模式後發現，**若是沒有拆出子元件並且進行 `React.memo` 等設定，在每次的 re-render 都會被重新渲染**，因此決定拆小
- 可讀性提升：Header 元件剩下組裝 UI 及邏輯，閱讀難度下降
- UI 跟邏輯分離：
- 易測試：小元件也更容易用 Jest + React Testing Library 單獨測

#### 進度

- 拆分出 Navigation 元件 [8e9b4dc](https://github.com/southAndy/taiwanArtion/commit/8e9b4dcaa411310355a622eda6356e5fa704ab75#diff-776bdb3c4f24a8fd9ab8a473891c2bf70f6b72d0ad6df0414bb2f5cc81e62305)
- 拆分用戶區域 [c331edc](https://github.com/southAndy/taiwanArtion/commit/c331edcd9ee53e7492176c21294d425391e50102)
- 拆分 Logo 元件[8e9b4dc](https://github.com/southAndy/taiwanArtion/commit/8e9b4dcaa411310355a622eda6356e5fa704ab75#diff-74ac55edeb4ba4a4c1ef56a52747bd0165246a0924630a2448c2a43292241ead)

#### 待辦

- 手機版元件拆分
- 拆分邏輯到自定義 hooks

## 2025-07-07

- fix:修復詳細頁面的收藏功能 [974b356](https://github.com/southAndy/taiwanArtion/commit/974b356609fd19f658e1561177ccdce96ff022ca)
- refactor: 改由 redux 統一管理大頭貼狀態 [58ca30e](https://github.com/southAndy/taiwanArtion/commit/58ca30e0b59f316f6469594bacb1cf9da6d268c2)
- chore: 新增路徑 alias [d4b65e9](d4b65e929bf10519112e4eb7276f2e0d67ebcf68)

### 元件拆分

- 思考如何拆分，專案架構怎設計

## 2025-07-04

- feat:重整頁面偵測登入狀態功能 [2bb4f07](https://github.com/southAndy/taiwanArtion/commit/2bb4f07cd4b659b850a14cc12241ce0ee8b078d7)
- fix:修復首頁輪播展覽日期篩選邏輯 [51a469a](https://github.com/southAndy/taiwanArtion/commit/51a469a4f846320390094b4abbc509e171d5b1ee)
- feat:展覽詳細頁面新增 Loading 樣式 [973d979](https://github.com/southAndy/taiwanArtion/commit/973d9798c2901f03e0df25391b908981eb6d963a)

### 🔄 重構計劃啟動

- 確定優化執行順序：元件拆分 → TypeScript 遷移 → 測試導入
- 識別需要拆分的大元件：Detail.jsx、Backstage.jsx、Header.jsx

更詳細內容 [重構紀錄](./Refactor.md)

## 2025-07-03

- refactor:加入根層 App 元件，簡化 index.jsx 檔案邏輯，責任分明 [e32e081](https://github.com/southAndy/taiwanArtion/commit/e32e08161b26bc69770e80ccd7237073262fc42f)
- fix:統一全站登入邏輯 [26a3ad3](https://github.com/southAndy/taiwanArtion/commit/26a3ad301dfd68f661830692ffdac70fd9222446)

## 2025-07-02

- 修復註冊完成未顯示預設頭貼問題 [ad05fdba75586548b8d0155b8a453071e6f1f56b](https://github.com/southAndy/taiwanArtion/commit/ad05fdba75586548b8d0155b8a453071e6f1f56b)
- 新增首頁熱門展覽收藏功能 [919d1b02da99c3c76bcf027993982f8f9575bb18](https://github.com/southAndy/taiwanArtion/commit/919d1b02da99c3c76bcf027993982f8f9575bb18)

## 2025-01-02

- 詳細頁面返回首頁 => 改為返回前一個頁面

## 2025-01-01

- 新增地圖搜尋附近區域截止展覽功能

## 2024-12-25

- 完成使用者頭貼選擇功能

## 2024-12-24

- 調整 swiper RWD 更符合 figma 樣式
- 新增平板以上畫面登入狀態、下拉選單顯示功能
- 完成後台使用者頭貼選擇彈窗
- 新增全頁面的登入狀態檢查功能

## 2024-12-23

### 完成

- 切版 (768px)：首頁、下拉表單、搜尋結果

### 待辦

- 日期搜尋功能日期、語系調整
- 切版 (768px)：後台、展覽詳細頁面

## 2024-12-20

### 待辦

- 驗證碼部分無輸入，直接點擊「下一步」不會檢查，而是觸發 api 錯誤（驗證碼空白錯誤）

## 2024-12-19

- 引入 redux（存登入資料、API）
- 整理註冊、登入流程

## 2024-12-16

### 待辦

- 多個頁面目前以 axios 串接資料，待使用全域統一讀取

## 2024-12-14

- 修復手機驗證功能中「下一步」按鈕架構位置問題

## 2024-12-12

- 移除 tlcss 殘餘部分

## 2024-12-11

- 實現 scss 與 styled 共存方案
- 全域共用樣式設定（顏色、斷點等先用 scss 管理）
- 區域、元件樣式統一使用 styled 處理

## 待優化項目

### 前端

#### Detail Page

- 分享展覽改用 popup
- 新增評論功能及區域
- 加入月曆功能
- 加入地圖顯示

#### 未整理

- 當用戶名稱錯誤時，進度按鈕應禁用
- 重新設計共用按鈕元件
- 思考專案層級架構
- 新增全頁面的登入狀態檢查功能
- 用 styled 建立全域的樣式設定
- 移除 scss 全域樣式設定

### 後端

- 優化 API 服務，防止休眠
- 修復賬號檢查 API
- 將商業邏輯移至後端處理
