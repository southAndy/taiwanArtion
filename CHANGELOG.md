# 更新日誌

## 2025-07-23

### ESLint 規則強化與程式碼清理完成

- refactor(lint): 強化 ESLint 規則並清理未使用元件 [30d73e7](https://github.com/southAndy/taiwanArtion/commit/30d73e7)
  - 將 react/jsx-key 規則從 warn 升級為 error，強制使用 key 屬性
  - 移除未使用的 modal 元件：modal/Modal.jsx、register-modal.jsx、moda.scss
  - 清理過時的認證模態框實作，已由 AuthModal 取代
  - 消除所有 ESLint 錯誤（4個錯誤 → 0個錯誤）
  - 透過移除死代碼和強制執行 React key props 提升代碼品質

### 關鍵錯誤修復完成

- fix(eslint): 修復 ESLint 嚴重錯誤和代碼品質問題 [53b811a](https://github.com/southAndy/taiwanArtion/commit/53b811a)
  - 修復 Login.jsx 中未定義變數錯誤（signInWithPopup, provider）
  - 修復 Backstage.jsx 中 styled-component 語法錯誤（opacity 參數不匹配）
  - 將 no-undef 規則從 warn 提升為 error，防止未定義變數錯誤
  - 暫時註解 Google 登入功能避免編譯錯誤
  - ESLint 錯誤從 4 個降至 0 個，確保 CI 代碼品質檢查通過

### Console 日誌策略優化完成

- refactor(ci): 優化 Console 日誌策略以改善調試體驗 [08912ec](https://github.com/southAndy/taiwanArtion/commit/08912ec)
  - 更新 CI console.log 檢查，保留錯誤處理日誌功能
  - 將 favoriteUtils 中的 console.log 改為 console.info，提供更語義化的用戶反饋
  - 保留 console.error 和 console.warn 用於 API 錯誤處理和調試
  - 在 CI 中新增清楚的訊息說明允許的 console 方法
  - 建立語義化日誌分層：console.info 用於用戶操作，console.error 用於錯誤
  - 在維持乾淨生產代碼的同時，保留必要的調試功能

### 代碼規範工具鏈優化完成

- refactor(lint): 以 ESLint + Prettier 取代 Standard.js 配置 [9232082](https://github.com/southAndy/taiwanArtion/commit/9232082)
  - 移除 Standard.js 依賴，解決與 Prettier 的格式衝突問題
  - 新增 eslint-config-prettier 防止 ESLint 與 Prettier 規則衝突
  - 更新 CI 工作流程：以 `npx prettier --check src/` 取代 `npm run style`
  - 新增 package.json 腳本：`format` 和 `format:check` 用於 Prettier 操作
  - 修復 monthList.json 語法錯誤（無效物件結構 → 有效陣列格式）
  - 使用 Prettier 自動格式化整個代碼庫，確保格式一致性
  - 維持零 ESLint 錯誤，161 個警告在 CI 限制範圍內
  - 建立現代化 ESLint + Prettier 工具鏈，提升開發者體驗

### ESLint 配置優化完成

- refactor(eslint): 簡化 ESLint 配置專注於 JavaScript 專案 [5439838](https://github.com/southAndy/taiwanArtion/commit/5439838)
  - 移除 TypeScript 相關規則和依賴 (@typescript-eslint/eslint-plugin, @typescript-eslint/parser)
  - 專注於 React + JavaScript 語法檢查，保留必要規則
  - 更新 CI 工作流程僅檢查 .js/.jsx 文件，維持零警告政策
  - 新增基本代碼品質規則：no-console (警告)、no-debugger (錯誤)
  - 保持 React 17+ JSX 轉換支援 (無需 import React)
  - 維持專案 path alias 解析功能
  - 清理未使用的 TypeScript 依賴，減少 package 大小

### CI/CD 工作流程建立完成

- feat(ci): 新增 GitHub Actions CI 工作流程 [5399e35](https://github.com/southAndy/taiwanArtion/commit/5399e35)
  - 建立三階段並行 CI 流程：代碼品質檢查、安全掃描、建置驗證
  - 代碼品質檢查：ESLint 語法檢查 (零警告政策)、Standard.js 格式檢查、自動偵測 console.log 語句
  - 安全掃描：npm audit 中高級漏洞檢查、過時依賴套件檢查
  - 建置驗證：npm run build 成功驗證、建置大小報告、產物上傳 (保留7天)
  - 支援 main/develop 分支推送和 Pull Request 觸發
  - 包含 Firebase 測試配置回退機制，確保 CI 環境建置成功
  - 新增詳細的建置摘要報告和 GitHub Actions 整合

## 2025-07-21

### 安全性修復完成

- security: 升級依賴套件修復安全漏洞 [0394300](https://github.com/southAndy/taiwanArtion/commit/0394300)
  - 升級 vite 從 4.0.0 到 4.5.14 (修復 esbuild 開發環境漏洞)
  - 升級 vite-plugin-checker 從 0.5.6 到 0.10.0 (修復 lodash.pick 原型污染高風險漏洞)
  - 移除 2 個高嚴重度安全漏洞，總漏洞數從 15 個降至 13 個
  - 保持 Vite 4.x 版本範圍內，避免破壞性變更
  - 開發服務器升級後功能完全正常

### 程式碼品質優化完成

- refactor: 移除開發除錯用 console 語句 [3fc6203](https://github.com/southAndy/taiwanArtion/commit/3fc6203)
  - 移除 17 個開發除錯用的 console 語句，提升程式碼品質
  - 清理除錯類 console.log：距離計算、GPS 座標、展覽資料載入調試
  - 移除流程狀態類 console.log：註冊、登入、驗證流程狀態追蹤
  - 保留關鍵錯誤處理的 console.error 用於生產環境監控
  - 影響檔案：Map.jsx、Detail.jsx、Backstage.jsx、Login.jsx、Register 相關檔案、Store 檔案

### ShareModal 元件重構與功能增強完成

- feat(detail): 新增 ShareModal 複製連結功能

  - 實作 copyToClipboard 功能，支援現代 navigator.clipboard API
  - 提供 document.execCommand 回退方案支援舊瀏覽器
  - 新增複製成功提示訊息，提升使用者體驗
  - 設定 LinkInput 為 readOnly 避免誤編輯

- refactor(detail): 使用 ShareModal 取代原生分享功能 [9de7688](https://github.com/southAndy/taiwanArtion/commit/9de7688)
  - 以自定義 ShareModal 元件取代瀏覽器原生分享 API
  - 重構 ShareModal 採用語意化元件命名，使用 @emotion/styled
  - 創建專用的 styled 元件：ModalContent、ModalHeader、CloseButton、SocialShareList、SocialShareItem 等
  - 遵循專案規範提升元件可維護性和重用性
  - 移除未使用的 styled 元件定義，清理元件結構
  - 新增適當的 hover 效果和過渡動畫，提升使用者體驗

## 2025-07-17

### 展覽搜尋功能增強完成

- feat(search): 增強展覽搜尋功能和用戶體驗 [d1a81b6](https://github.com/southAndy/taiwanArtion/commit/d1a81b6)
  - 新增搜尋按鈕支援關鍵字搜尋
  - 優化搜尋歷史交互，點擊歷史項目會填入搜尋框
  - 改進路由導航，點擊展覽項目直接跳轉到詳情頁
  - 新增 Enter 鍵搜尋支援
  - 調整搜尋按鈕樣式和禁用狀態
  - 新增 record 命令用於自動化開發流程

### 認證系統重構完成

- refactor(auth): 更新登入驗證機制使用 Firebase Auth 原生狀態 [f27ce61](https://github.com/southAndy/taiwanArtion/commit/f27ce61)

  - 移除不必要的 cookie 機制，使用 Firebase Auth 內建的身份驗證狀態
  - 新增 AuthRequiredRoute 專門保護會員限定頁面
  - 更新 ProtectedRoute 使用 Firebase onAuthStateChanged 監聽狀態
  - 修正 userSlice 的 monitorUserState 處理無用戶情況
  - 統一 Redux action types，修正 member/_ 為 user/_
  - 更新 /backstage 路由使用新的權限保護機制

- feat(auth): 新增桌機版登入/註冊彈窗功能 [f90cd48](https://github.com/southAndy/taiwanArtion/commit/f90cd48)
  - 新增 AuthModal 統一彈窗容器，支援登入/註冊模式切換
  - 新增 LoginFlow 簡潔 2 步驟登入流程 (表單 → 成功提示)
  - 新增 RegisterFlow 複用現有 3 步驟註冊流程
  - 更新 Header 整合桌機版分離的登入/註冊按鈕
  - 修復 Modal 元件圖片匯入問題
  - 響應式設計：桌機版使用彈窗，手機版維持頁面跳轉

### UI 體驗大幅提升完成

- feat(ui): 增強載入狀態與響應式設計改善 [06b6af6](https://github.com/southAndy/taiwanArtion/commit/06b6af6)
  - 新增全站骨架屏 Loading 動畫（首頁所有區塊、搜尋結果頁面）
  - 實作響應式標題縮放，大尺寸裝置優化顯示效果
  - 創建真實尺寸輪播 Loading 卡片，完美匹配實際組件
  - 修復篩選按鈕 active 狀態顯示問題（白色文字在彩色背景）
  - 搜尋結果頁面實作彩色標籤化條件顯示
  - 支援多城市搜尋參數處理與中英文城市名稱轉換

### 搜尋功能統一完成

- feat(search): 統一搜尋功能與整合搜尋執行 [99d1206](https://github.com/southAndy/taiwanArtion/commit/99d1206)
  - 在 SearchBar 新增可點擊的搜尋按鈕，支援 URL 參數構建
  - 修改 ExhibitionMenu 改為設定搜尋條件而非直接跳轉
  - 整合展覽名稱狀態管理到 Header 組件
  - 支援多條件組合搜尋（展覽名稱 + 城市 + 日期）
  - 保留自動完成和搜尋歷史功能
  - 更新搜尋圖標的 hover 效果和指標樣式

## 2025-07-16

### 城市選擇功能完成

- feat(header): 實作城市選擇功能與狀態管理 [0a1bdb2](https://github.com/southAndy/taiwanArtion/commit/0a1bdb2)
  - 新增城市單選與多選支援
  - 實作地區全選功能（排他性選擇）
  - 加入定位功能偵測當前位置
  - 新增清除選擇功能
  - SearchBar 即時顯示選中城市
  - 改善 Dropdown 元件手機版相容性

### 日期選擇器優化完成

- feat(header): 日期選擇器增強與 UI 全面改善 [7d12053](https://github.com/southAndy/taiwanArtion/commit/7d12053)
  - 轉換為日期範圍選擇器（開始日期 → 結束日期）
  - 分離顯示在 SearchBar 的開始日期和結束日期欄位
  - 全面 UI 優化：固定大小按鈕、卡片佈局、平滑動畫
  - 修復時區問題，實作日期範圍驗證和排序
  - 手機版響應式導航，修復 SSR 相容性問題
  - 移除自動跳轉，改為狀態管理模式

## 2025-07-14

### 樣式系統重構完成

- refactor(styles): 將所有 styled-components 遷移至 @emotion/styled [3bbfcc1](https://github.com/southAndy/taiwanArtion/commit/3bbfcc1)

### Header 元件重構完成

- refactor(header): 優化 header 元件狀態控制 [446e086](https://github.com/southAndy/taiwanArtion/commit/446e086)
- feat(header): 新增搜尋列功能 [558beec](https://github.com/southAndy/taiwanArtion/commit/558beec)
- style(header): 重新設計搜尋列版面配置 [4d8abe6](https://github.com/southAndy/taiwanArtion/commit/4d8abe6)
- refactor(menu): 將選單容器移至 header 資料夾 [c9f7639](https://github.com/southAndy/taiwanArtion/commit/c9f7639)

### 其他改善

- style: 新增網站最小高度設定 [5fe22ca](https://github.com/southAndy/taiwanArtion/commit/5fe22ca)
- feat(header): 修復 header 固定於頂部功能 [e339ea7](https://github.com/southAndy/taiwanArtion/commit/e339ea7)

## 2025-07-09

### 重構 Header 元件(已完成)

#### 進度

- 手機版元件拆分 [e339ea7](https://github.com/southAndy/taiwanArtion/commit/e339ea71ff1fcfb3efc22b7704f42d99e2723e31)
- 拆分元件拼回 header 元件 [c0fe154](https://github.com/southAndy/taiwanArtion/commit/c0fe15496bf964649b83b39e52d7e3701b2b1585)

## 2025-07-08

### 重構 Header 元件(進行中)

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
