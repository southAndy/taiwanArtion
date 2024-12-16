## 12/11

scss 與 styled 共存方案

全域共用樣式設定（顏色、斷點等先用 scss 管理）

但區域、元件樣式都統一使用 styled 處理

## 12/12

1. 移除 tlcss 殘餘部分

## 12/14

1. 在寫手機驗證功能時，發現「下一步」按鈕架構位置有問題(調整架構解決)

## 12/16

### todo

1. 多個頁面目前以 axios 串接資料，待使用全域統一讀取

## fix

1. 驗證碼部分無輸入，直接點擊「下一步」不會檢查，而是觸發 api 錯誤（驗證碼空白錯誤）

## todo

FE

1. prettier 排版設定，換行問題
2. account 路由存在是否正確？(discuss with angela)
3. when account's name is error, and progress button should be disabled.

BE

1. 如何讓 api 服務不休眠
2. 修復賬號檢查 api
