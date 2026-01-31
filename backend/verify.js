import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
  console.log("\n🕵️  FULL DATABASE INSPECTION");
  console.log("================================================");

  try {
    const db = await open({
      filename: './cyber_shield.db',
      driver: sqlite3.Database
    });

    // 1. WEBSITES TABLE
    console.log("\n🌐 [TABLE 1] REGISTERED WEBSITES");
    const websites = await db.all("SELECT id, name, baseTraffic, status FROM websites");
    if (websites.length > 0) {
        console.table(websites);
    } else {
        console.log("⚠️  (Empty) No websites found.");
    }

    // 2. TRAFFIC LOGS (The Graph Data)
    console.log("\n📈 [TABLE 2] TRAFFIC LOGS (Last 10 Seconds)");
    // We select specific columns to make the table readable
    const logs = await db.all(`
        SELECT 
            time(timestamp) as time, 
            requests as 'Reqs/s', 
            latency as 'Ping (ms)', 
            error_rate as 'Err %',
            is_anomaly as 'AI Alert?' 
        FROM traffic_logs 
        ORDER BY id DESC 
        LIMIT 10
    `);
    
    if (logs.length > 0) {
        console.table(logs);
        console.log("   (This data is what draws the Green/Red lines on your Dashboard)");
    } else {
        console.log("⚠️  (Empty) No traffic data yet. Run the bot!");
    }

    // 3. BLOCKED IPS (The AI Decisions)
    console.log("\n🚫 [TABLE 3] ACTIVE FIREWALL RULES");
    const blocks = await db.all("SELECT ip_address, banned_at, reason FROM blocked_ips ORDER BY id DESC LIMIT 10");
    
    if (blocks.length > 0) {
        console.table(blocks);
    } else {
        console.log("✅ (Clean) No IPs are currently blocked.");
    }

    console.log("\n================================================");

  } catch (err) {
    console.error("❌ Error reading DB:", err);
  }
})();