"""
Vercel Serverless Function Handler for Hair Analysis API
"""
import os
import sys
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_path))

# Import FastAPI app
from app.main import app

# Export handler for Vercel
handler = app