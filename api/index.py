"""
Vercel Serverless Function Handler for Hair Analysis API
"""
import os
import sys
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_path))

try:
    # Import FastAPI app
    from app.main import app

    # Export handler for Vercel
    handler = app

except Exception as e:
    # Error handling for debugging
    print(f"Error importing app: {e}")
    import traceback
    traceback.print_exc()

    # Create minimal FastAPI app for error response
    from fastapi import FastAPI
    handler = FastAPI()

    @handler.get("/")
    async def error_root():
        return {"error": f"Import failed: {str(e)}"}