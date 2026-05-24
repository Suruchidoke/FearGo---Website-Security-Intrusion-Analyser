
### 🚀 Getting Started & Installation

To run Safeflow locally, you will need to open multiple terminal windows to start the decoupled microservices. Ensure you have **Node.js** and **Python 3** installed on your machine.

#### 1. Start the AI Engine (Python)

The AI microservice must be running to process anomaly detection and reinforcement learning decisions.

```bash
# Navigate to the AI directory
cd path/to/ai-engine

# Install required Python dependencies
pip install scikit-learn stable-baselines3 sqlite3

# Start the AI engine
python app.py

```

#### 2. Start the Backend Gateway (Node.js)

The backend intercepts traffic and communicates with the AI engine.

```bash
# Open a new terminal and navigate to the backend directory
cd path/to/backend

# Install Node modules
npm install

# Start the backend server
node server.js

```

#### 3. Start the Frontend UI (React/Vite)

The frontend provides the real-time monitoring dashboard.

```bash
# Open a new terminal and navigate to the frontend directory
cd path/to/frontend

# Install React dependencies
npm install

# Start the development server
npm run dev

```

*Once running, navigate to `http://localhost:5173` in your browser to view the dashboard.*

---

### ⚔️ Simulating Traffic & Attacks (Testing)

To see Safeflow in action, use the built-in simulation scripts provided in the backend directory.

**Generate Legitimate Traffic:**

```bash
# Runs realistic traffic generation to establish a baseline
node traffic-bot.js

```

**Simulate a Layer-7 DDoS Attack:**

```bash
# Launches a volumetric attack with randomized IPs against a target
node attacker.js

```
