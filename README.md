# nctuoj_contest_web

### React-Redux-Template
---
 - React
 - Webpack
 - Babel
 - ES6
 - Alt (flux implementation)

 ### How to use
---
 - npm install
 - npm run dev

### Production
---
 - npm install
 - npm run build


 - 首頁顯示比賽基本資訊（無登入可見），freeze改可讀形式，problem list拿掉
 - 比賽開始前要disable scoreboard，不然會洩漏題數
 - 賽前預載題目zip的連結，時間到顯示密碼（可在首頁或側邊欄）
 - 頁面頂端時間改為顯示剩餘時間，已知safari有bug
 - 隱藏參賽者端上傳後每筆測資的狀況，只需顯示最後結果
 - 更新judge資源使用順序（單筆測資沒過後面直接省略）
 - 側邊欄problem list加背景色表示寫題狀態
 - 比賽時間到自動刷新，結束時顯示通知
 - 賽後scoreboard系統
 - clarification推播（含admin端）
