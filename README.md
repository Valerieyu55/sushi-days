# Sushi 家行事曆（壽司 app）

霖霖、豪豪和 Sushi 的家庭行事曆。加到手機主畫面後，會是獨立的壽司圖示 app。
行程存在 Google「家庭」日曆，兩個人各自用自己的 Google 帳號登入，看到的是同一份。

全部設定大約 20 分鐘，只需要做一次。

---

## 一、Google Cloud：讓 app 可以讀寫你的 Google 日曆（約 10 分鐘）

1. 用電腦打開 https://console.cloud.google.com ，用你的 gmail 登入。
2. 左上角「選取專案」→「新增專案」，名稱填 `Sushi 家`，按「建立」，建好後切換到這個專案。
3. 上方搜尋列輸入 **Google Calendar API**，點進去按「**啟用**」。
4. 左側選單進入「**Google Auth Platform**」（舊版介面叫「OAuth 同意畫面」），按「開始使用」：
   - 應用程式名稱：`Sushi 家`
   - 使用者支援電子郵件：選你的 gmail
   - 目標對象：選「**外部**」
   - 聯絡資訊：填你的 gmail → 同意條款 → 建立
5. 左側「**目標對象**」→「測試使用者」→「新增使用者」，加入：
   - 你的 gmail
   - 豪豪的 gmail
6. 左側「**用戶端**」→「建立用戶端」：
   - 應用程式類型：**網頁應用程式**
   - 名稱：`Sushi 家 app`
   - 已授權的 JavaScript 來源：`https://valerieyu55.github.io`
   - 已授權的重新導向 URI：`https://valerieyu55.github.io/sushi-calendar/`（最後的 `/` 要有）
   - 按「建立」
7. 畫面會顯示「**用戶端 ID**」（結尾是 `.apps.googleusercontent.com`），先複製起來。

## 二、GitHub：把 app 放上網（約 5 分鐘）

1. 到 https://github.com/new 建立新的 repository：
   - 名稱：`sushi-calendar`
   - 選 **Public**（只有程式碼公開；行程都在 Google，要登入才看得到，全家福照片也不會上傳）
2. 進入新 repository →「Add file」→「Upload files」，把這個資料夾裡的**所有檔案和 icons 資料夾**拖進去 →「Commit changes」。
3. 點開 `config.js` → 右上角鉛筆編輯 → 把剛剛複製的用戶端 ID 貼到 `CLIENT_ID: ""` 的引號中間 →「Commit changes」。
4. 「Settings」→ 左側「Pages」→ Branch 選 `main`、資料夾選 `/ (root)` → Save。
5. 等 1–2 分鐘，網址就是：**https://valerieyu55.github.io/sushi-calendar/**

## 三、放到 iPhone 主畫面

1. 用 **Safari** 打開 https://valerieyu55.github.io/sushi-calendar/
2. 按「用 Google 帳號登入」。因為 app 是自己做的，Google 會顯示「Google 尚未驗證這個應用程式」，按「繼續」，再勾選允許存取日曆。
3. 按下方「分享」→「**加入主畫面**」→「新增」。主畫面就會出現壽司圖示的「Sushi 家」。

豪豪的手機：他的 gmail 要在第一步的測試使用者名單裡，也要在你們的 Google 家庭群組裡（才看得到「家庭」日曆），然後一樣做第三步。Android 用 Chrome 打開，右上角「⋮」→「加到主畫面」。

---

## 小提醒

- **提醒通知**：行程的提醒由 Google 日曆 app 發出。請在 iPhone「設定 → 通知 → Google 日曆」開啟聲音，也在 Google 日曆 app 裡幫「家庭」日曆開啟通知。
- **登入**：Google 每次只給一小時的通行證，過期時 app 會自動續，偶爾會閃一下 Google 的畫面，這是正常的。
- **只存在各自手機上的東西**：全家福照片、常用行程、「我是霖霖／豪豪」。
- **跟 Claude 裡的版本差別**：這個版本沒有「一句話新增」（那個功能需要 Claude）。其他功能都一樣，資料也是同一份 Google「家庭」日曆。
- **要改設定**：Sushi 的生日、家庭日曆 ID 都在 `config.js`。
