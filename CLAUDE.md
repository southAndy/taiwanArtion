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

### 元件清理狀況 (2025-07-25)

**已確認重複元件**：
- `src/components/Dropdown.jsx` - 簡單選單元件 (建議移除)
- `src/components/Dropdown/Dropdown.jsx` - 進階Portal實作 (保留)
- `src/components/Input/Input.jsx` - 完整元件含邏輯 (保留)
- `src/components/StyledInput.jsx` - 僅樣式元件 (建議移除)

**清理優先級**：
1. 移除 `Dropdown.jsx` (根目錄)，保留 `Dropdown/` 版本
2. 移除 `StyledInput.jsx`，統一使用 `Input/Input.jsx`
3. 檢查使用狀況後安全移除

**已確認單一元件**：
- `Modal.jsx` - 功能完整，無重複
- `atoms/Button/` - 結構完整，無衝突

### Styling Decision Flow

When adding styles, follow this decision tree:

1. **Simple layout/spacing?** → Use Tailwind CSS
2. **Complex component with theme/state?** → Use @emotion/styled
3. **Global styles/animations?** → Use SCSS
4. **Legacy styled-components?** → Migrate to @emotion/styled when possible

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
