"""
Vercel Serverless Function 엔트리포인트
"""
from app.main import app

# Vercel이 인식할 수 있도록 export
handler = app