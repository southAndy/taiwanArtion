# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build production bundle with Vite
- `npm run preview` - Preview production build
- `npm run style` - Run Standard.js code formatting

### Code Quality

- ESLint configuration supports React, TypeScript, and import resolution
- Uses Standard.js for code formatting (`npm run style`)
- No specific test framework configured - check with user if testing commands are needed

## Architecture Overview

### Technology Stack

- **Frontend**: React 18 with Vite as build tool
- **State Management**: Redux Toolkit with three main slices (common, user, data)
- **Styling**: Mixed approach using @emotion/styled, styled-components, SCSS, and Tailwind CSS
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Routing**: React Router v6 with nested routes
- **Forms**: React Hook Form with Yup validation

### Key Architectural Patterns

**Directory Structure**:

- `src/pages/` - Page-level components (Home, Detail, Map, Backstage, etc.)
- `src/container/` - Layout containers (Header, Footer, Account, Login, Register)
- `src/components/` - Reusable UI components (Button, Modal, Input, Card)
- `src/store/` - Redux slices (commonSlice, userSlice, dataSlice)
- `src/routes/` - React Router configuration with protected routes
- `src/hooks/` - Custom React hooks (useBreakpoint)
- `src/utils/` - Utility functions for dates and favorites

**State Management**:

- Redux store configured with three slices: common, user, and data
- User authentication state monitored on app initialization
- Protected routes implemented for login and backstage areas

**Component Design Principles** (原子化設計規範):

- **原子層級** (`src/components/`): 最基礎的 UI 元件，只負責樣式和基本交互
  - ✅ 處理：HTML 原生屬性 (`type`, `placeholder`, `disabled`)、樣式 props (`size`, `width`, `variant`)、基本事件 (`onChange`, `onFocus`)
  - ❌ 避免：表單邏輯 (`register`, `validation`)、業務邏輯 (`onSubmit`, `resetField`)、狀態管理 (`setValue`)
  - 範例：`<Input type="password" placeholder="密碼" {...register('password')} />`

- **分子/容器層級** (`src/container/`, `src/pages/`): 負責業務邏輯和狀態管理
  - 使用 react-hook-form 處理表單狀態
  - 組合原子元件成為完整功能
  - 處理 API 調用和資料流

- **設計目標**：保持原子元件的可重用性和可測試性，避免與特定框架或業務邏輯耦合

**Styling Approach** (統一樣式規範):

- **Primary Solution**: @emotion/styled for complex components and theming
- **Tailwind CSS**: Only for simple layouts, spacing, and rapid prototyping
- **SCSS**: Global styles, animations, and base styles only
- **Migration Complete**: Successfully migrated all styled-components to @emotion/styled

**Styling Rules**:

- ✅ **Use Tailwind for**: Simple layouts (`flex`, `gap`, `grid`), basic spacing (`p-4`, `mb-2`), quick prototypes
- ✅ **Use @emotion/styled for**: Complex components, theming, animations, hover states, media queries
- ❌ **Avoid**: Mixing Tailwind classes with styled-components, using className in styled.attrs()
- ❌ **Don't use Tailwind for**: Complex responsive designs, component-specific themes, intricate animations

### Path Aliases

Extensive alias configuration for clean imports:

- `@` → `./src`
- `@components` → `./src/components`
- `@pages` → `./src/pages`
- `@assets` → `./src/assets`
- `@styles` → `./src/styles`
- `@utils` → `./src/utils`
- `@hooks` → `./src/hooks`
- `@store` → `./src/store`
- `@services` → `./src/services`
- `@plugins` → `./src/plugins`
- `@container` → `./src/container`
- `@layouts` → `./src/layouts`

### Firebase Integration

- Configuration stored in `firebase.config.js` using environment variables
- Authentication and Firestore database setup
- Environment variables prefixed with `VITE_FIREBASE_`

### Responsive Design

- Custom breakpoint hook (`useBreakpoint`) for responsive behavior
- Mobile-first approach with separate mobile/desktop components
- Breakpoint utilities in `@styles/utils/breakpoint.js`

## Development Notes

### 開發流程規範

- **功能開發前必須討論**: 在實作任何新功能或修改現有功能前，Claude 必須先與用戶討論實作方案、技術選擇和預期效果，獲得明確同意後才能開始編碼
- **討論內容包含**: 功能需求分析、技術實作方式、可能的影響範圍、測試計畫
- **例外情況**: 僅限於 bug 修復、code style 調整等不影響功能邏輯的修改可以直接執行

### Code Conventions

- React functional components with hooks
- File extensions: `.jsx` for React components, `.ts/.tsx` for TypeScript
- Import order: React imports, third-party libraries, local imports with aliases

### Firebase Environment Setup

Requires environment variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Known Technical Debt

- **Component Consolidation**: Merge duplicate components (Button.jsx vs StyledButton.jsx)
- **Tailwind Cleanup**: Remove complex Tailwind usage from styled components

### 元件清理狀況 (2025-07-31 更新)

**已新增原子化元件**：
- `src/components/atoms/Input/` - 新增原子級 Input 元件 (2025-07-25)
  - 採用 @emotion/styled 實作
  - 支援 forwardRef、size、shape、formState 屬性
  - 完整的錯誤狀態和 disabled 狀態處理

**✅ 已完成清理 (2025-07-31)**：
- ✅ `src/components/Card/` - 已移除未使用的通用卡片元件
- ✅ `src/components/evaluate/` - 已移除未完成的評價元件
- ✅ `src/components/StyledInput.jsx` - 已移除，統一使用 atoms/Input
- ✅ `src/components/Input/` - 已移除整個目錄，避免重複
- ✅ 已確認並保留實際使用的元件：
  - `Dropdown/Dropdown.jsx` - 進階Portal實作，Header使用中
  - `Modal.jsx` - 核心元件，多處使用
  - `Skeleton.jsx` - Loading狀態，Detail頁面使用
  - `atoms/Button/` - 原子級按鈕元件
  - `atoms/Input/` - 原子級輸入元件

**✅ Input 元件統一完成 (2025-07-31)**：
- ✅ 遷移 SecondStep.jsx：移除 setValue prop，添加 formState 支援
- ✅ 遷移 ThirdStep.jsx：統一錯誤狀態處理  
- ✅ 遷移 LoginFlow.jsx：完整表單整合
- ✅ 遷移 Login.jsx：保持功能完整性
- ✅ 全專案 Input 使用統一，符合原子化設計原則

**當前 components 結構**：
```
src/components/
├── Dropdown/Dropdown.jsx     ✅ 使用中
├── Modal.jsx                 ✅ 使用中  
├── Skeleton.jsx              ✅ 使用中
└── atoms/                    ✅ 原子化元件
    ├── Button/               ✅ 全專案統一使用
    └── Input/                ✅ 全專案統一使用
```

**清理與統一成果**：
- 移除 6 個重複/無用檔案
- 移除 3 個空目錄  
- Input 元件 100% 統一使用 atoms/Input
- 程式碼庫結構更加清晰，完全符合原子化設計原則

### Styling Decision Flow

When adding styles, follow this decision tree:

1. **Simple layout/spacing?** → Use Tailwind CSS
2. **Complex component with theme/state?** → Use @emotion/styled
3. **Global styles/animations?** → Use SCSS
4. **Legacy styled-components?** → Migrate to @emotion/styled when possible

### Performance Optimization Roadmap (2025-08-11)

基於 Bundle 分析結果，虛擬化實作成效與優化方向：

**🎯 虛擬化成效驗收 (已完成)**:
- **Bundle 影響**: @tanstack/react-virtual 僅增加 4.47KB gzipped (~1% 增長)
- **模組影響**: 增加 3 個模組 (1,257 → 1,260)
- **成本效益**: 極小的體積代價換取大量數據渲染性能提升，投資報酬率高

**🔄 下階段性能優化重點** (按優先級排序):

1. **高優先級 - Bundle 優化**:
   - MUI Material UI Tree-shaking 優化 (目前佔 bundle 大部分)
   - 圖片資源優化 (總計 ~2MB+)
   - 移除未使用的依賴

2. **中優先級 - 渲染性能監控**:
   - 實作 FPS 監控和渲染時間追蹤
   - DOM 節點數量變化分析
   - 滾動流暢度量化指標

3. **低優先級 - 用戶體驗指標**:
   - 首屏渲染時間 (LCP)
   - 互動響應時間 (FID)
   - 累積版面位移 (CLS)

**⚡ 技術實作計畫**:
- 下一步：實作 FPS 監控系統，量化虛擬化帶來的實際性能提升
- 工具：使用 Performance API + requestAnimationFrame
- 目標：建立性能基線，持續監控優化效果

### 自動化規則

- 每次啟動專案時，執行 `npm run dev`
- 每次提交後自動更新 CHANGELOG.md
- 根據 commit message 前綴分類：
  - feat: 新功能
  - fix: 修復
  - refactor: 重構
  - style: 樣式
  - chore: 雜項
- 保持現有的日期格式和結構
