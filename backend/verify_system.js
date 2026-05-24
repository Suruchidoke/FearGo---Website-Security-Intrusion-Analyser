import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
  console.log("🕵️  STARTING FULL SYSTEM AUDIT...");
  console.log("------------------------------------------------");

  try {
    const db = await open({
      filename: './cyber_shield.db',
      driver: sqlite3.Database
    });

    // 1. CHECK USER CREDENTIALS
    console.log("\n👤 [1. USERS] (Login Info)");
    const users = await db.all("SELECT * FROM users");
    if (users.length === 0) {
      console.log("   ⚠️  No users found. (Did you Register/Login on frontend?)");
    } else {
      console.table(users);
      console.log(`   ✅ ${users.length} User(s) Securely Stored.`);
    }

    // 2. CHECK WEBSITES
    console.log("\n🌐 [2. WEBSITES] (Monitored Assets)");
    const websites = await db.all("SELECT * FROM websites");
    if (websites.length === 0) {
      console.log("   ⚠️  No websites found. (Go to Dashboard -> Add Website)");
    } else {
      console.table(websites);
      console.log(`   ✅ ${websites.length} Website(s) Configured.`);
    }

    // 3. CHECK TRAFFIC LOGS (Graph State)
    console.log("\n📈 [3. TRAFFIC HISTORY] (Graph Data)");
    // Get total count
    const logCount = await db.get("SELECT COUNT(*) as count FROM traffic_logs");
    // Get last 3 entries to prove it's updating NOW
    const recentLogs = await db.all("SELECT * FROM traffic_logs ORDER BY timestamp DESC LIMIT 3");
    
    if (logCount.count === 0) {
      console.log("   ⚠️  No traffic history. (Start 'node traffic-bot.js' to generate data)");
    } else {
      console.log(`   ✅ TOTAL DATA POINTS: ${logCount.count}`);
      console.log("   👇 Most Recent 3 Seconds of Data (Live Graph State):");
      console.table(recentLogs);
    }

    // 4. CHECK BLOCKED IPS (Firewall)
    console.log("\n🚫 [4. BLOCKED IPS] (Firewall Rules)");
    const blocked = await db.all("SELECT * FROM blocked_ips");
    if (blocked.length === 0) {
      console.log("   ℹ️  No IPs blocked yet. (System is allowing traffic)");
    } else {
      console.table(blocked);
      console.log(`   ✅ ${blocked.length} IP(s) Currently Banned.`);
    }

    console.log("\n------------------------------------------------");
    console.log("🎉 AUDIT COMPLETE.");

  } catch (err) {
    console.error("❌ ERROR: Could not verify database.", err);
  }
})();