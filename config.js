// Sushi 家行事曆設定
// 1. 把 Google Cloud 建立的「OAuth 用戶端 ID」貼在 CLIENT_ID 的引號裡（結尾是 .apps.googleusercontent.com）
// 2. 其他設定通常不用改
window.SUSHI_CONFIG = {
  CLIENT_ID: "230407861595-0e2a86tv3l54h2rlkv3b3dfsio9pbgct.apps.googleusercontent.com",
  // Google「家庭」日曆的 ID（找不到時，app 會自動找名稱叫「家庭」的日曆）
  FAMILY_CAL: "family09629868895778924320@group.calendar.google.com",
  // Sushi 的生日，用來算每月滿月和幾歲
  SUSHI_BORN: "2024-08-25",
  TIME_ZONE: "Asia/Taipei"
};
