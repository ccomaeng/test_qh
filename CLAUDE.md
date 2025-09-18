# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

큐모발검사 종합멘트 자동 생성 시스템 - A Korean hair mineral analysis report generation application that takes hair test results and generates personalized comprehensive analysis reports.

## Architecture

### System Flow
1. **User Input** → Frontend form collects personal info and test results
2. **API Request** → Frontend sends data to FastAPI backend
3. **Analysis Processing** → Backend extracts appropriate content from 5 reference markdown notes
4. **Report Generation** → Structured analysis report returned to frontend
5. **Display & Export** → Frontend displays results with print functionality

### Key Architecture Decisions
- **Strict Content Extraction**: System MUST extract content ONLY from the 5 reference notes - no AI generation of new content
- **Sequential Processing**: Analysis follows strict 7-step process defined in notes
- **Multiple Analysis Services**: Three different analysis endpoints for flexibility (standard, full, prompt-based)

## Development Commands

### Backend (FastAPI)
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run development server (auto-reload enabled)
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Run tests (if available)
pytest
```

### Frontend (React + TypeScript)
```bash
cd frontend

# Install dependencies
npm install

# Run development server (Vite)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## API Endpoints

- **GET /** - API root and documentation
- **GET /health** - Health check endpoint
- **POST /analyze** - Standard analysis (HairAnalysisResult)
- **POST /api/hair-analysis/full** - Full analysis (FullAnalysisResponse)
- **POST /simple/analyze** - Simplified analysis
- **POST /prompt/analyze** - Prompt-based analysis
- **GET /test-data** - Sample test data for development

## Critical Business Logic

### 5 Reference Notes System
The application's core functionality depends on extracting content from exactly 5 markdown notes located in `backend/app/data/`:

1. **note1_basic.md** - Basic greeting templates based on test result conditions
2. **note2_heavy_metals.md** - Heavy metal analysis by age group (≤10, 11-19, 20+)
3. **note3_minerals.md** - Nutritional mineral analysis with compound conditions
4. **note4_health_indicators.md** - Health indicator analysis
5. **note5_summary.md** - Summary rules and recommendations

### Analysis Processing Rules
- **Age-based categorization**: Different templates for age groups (≤10, 11-19, 20+)
- **Compound conditions**: Some conditions override individual ones (e.g., calcium+magnesium overrides individual)
- **Exclusion rules**: When compound conditions are used, skip individual item analysis
- **Name personalization**: Replace placeholder names with actual user name

### Input Data Structure
- **Personal Info**: name (string), age (number), special_notes (string)
- **Heavy Metals** (9 types): mercury, arsenic, cadmium, lead, aluminum, barium, nickel, uranium, bismuth
- **Nutritional Minerals** (11 types): calcium, magnesium, sodium, potassium, copper, zinc, phosphorus, iron, manganese, chromium, selenium
- **Health Indicators** (6 types): insulin_sensitivity, autonomic_nervous, stress_status, immune_skin_health, adrenal_activity, thyroid_activity

### Report Generation Steps
1. Personal information section
2. Comprehensive analysis from 5 notes
3. Summary explanation
4. Statistical analysis
5. Comprehensive summary
6. Nutritionist summary
7. Compressed version (950-1000 characters)

## Frontend Components Structure

- **InputForm**: Multi-section form with React Hook Form validation
- **ResultDisplay**: Standard result display with print functionality
- **StandardResultDisplay**: Alternative display format
- **Services**: API client using axios with error handling
- **Types**: TypeScript interfaces for type safety

## Important Configuration

### CORS Settings
Currently set to allow all origins (`*`) for development. Must be restricted to specific domains in production.

### Port Configuration
- Backend: 8000 (configurable via uvicorn)
- Frontend: Typically 3001-3003 (Vite auto-selects available port)

## Print Functionality

The application includes optimized print styling with:
- Dynamic content scaling based on text length
- A4 page format optimization
- Preserved background colors and formatting
- Footer image inclusion