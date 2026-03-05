# Episodic Intelligence Engine

A full-stack AI project powered by **Ollama (Mistral)**, a **FastAPI backend**, and a **Next.js frontend**.

---

## Prerequisites

- [Ollama](https://ollama.com/download) installed and available on your PATH
- [Python 3.10+](https://www.python.org/downloads/) installed
- [Node.js 18+](https://nodejs.org/) and npm installed
- Windows PowerShell (5.1 or PowerShell 7+)

---

## Running the Full Project (Windows PowerShell)

Open **five separate PowerShell terminal windows** and follow the steps below.

---

### Step 1 — Navigate to Project Root

Replace the path below with the actual location where you cloned the project:

```powershell
cd path\to\episodic-intelligence-engine
```

---

### Step 2 — Start Ollama and Pull Mistral Model

**Terminal 1** — Start the Ollama server:

```powershell
ollama serve
```

**Terminal 2** — Pull the Mistral model and verify it is available:

```powershell
ollama pull mistral
ollama list
```

---

### Step 3 — Set Up and Run the Backend

**Terminal 3:**

```powershell
# From the project root
cd backend

# Create virtual environment (first time only)
python -m venv .venv

# Activate the virtual environment
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Create .env file (first time only)
@"
LLM_PROVIDER=mistral
MISTRAL_BASE_URL=http://127.0.0.1:11434
MISTRAL_MODEL=mistral
MISTRAL_TIMEOUT_SECONDS=90
"@ | Out-File -Encoding utf8 .env

# Start the backend server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

---

### Step 4 — Set Up and Run the Frontend

**Terminal 4:**

```powershell
# From the project root
cd frontend

# Install dependencies
npm install

# Optional: point the frontend at the backend
$env:NEXT_PUBLIC_API_BASE="http://127.0.0.1:8000"

# Start the frontend dev server
npm run dev
```

---

### Step 5 — Health Checks

**Terminal 5** — Verify both services are running:

```powershell
# Check backend health endpoint
Invoke-RestMethod http://127.0.0.1:8000/health

# Check frontend is reachable
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3000 | Select-Object StatusCode
```

---

## Access the Application

| Service         | URL                            |
|-----------------|--------------------------------|
| Frontend        | http://127.0.0.1:3000          |
| Backend API     | http://127.0.0.1:8000          |
| Backend Swagger | http://127.0.0.1:8000/docs     |

---

## Project Structure

```
episodic-intelligence-engine/
├── backend/          # FastAPI application
│   ├── app/
│   │   └── main.py
│   ├── requirements.txt
│   └── .env          # Created on first run (not committed)
└── frontend/         # Next.js application
    ├── package.json
    └── ...
```

---

## Notes

- The `.env` file in the `backend/` directory is created **once** during setup and should **not** be committed to version control.
- The virtual environment (`.venv`) is created **once** and does not need to be recreated on subsequent runs — just activate it with `.\.venv\Scripts\Activate.ps1`.
- Make sure `ollama serve` (Terminal 1) is running **before** starting the backend.
