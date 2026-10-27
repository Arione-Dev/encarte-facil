@echo off
title Encarte Facil - Gerador Profissional de Encartes
echo ========================================================
echo        ENCARTE FACIL - SISTEMA DE ENCARTES & TABLOIDES
echo ========================================================
echo.
echo Iniciando Servidor Backend (FastAPI)...
start "Backend - FastAPI" cmd /k "cd backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000"

echo.
echo Iniciando Servidor Frontend (Vite)...
start "Frontend - Vite" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo O sistema estara acessivel em: http://localhost:3000
echo Backend API Docs: http://localhost:8000/docs
echo ========================================================
echo.
timeout /t 3 >nul
start http://localhost:3000

