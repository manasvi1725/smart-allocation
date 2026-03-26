require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

console.log("SUPABASE URL LOADED:", process.env.SUPABASE_URL);
console.log("KEY PREFIX:", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});