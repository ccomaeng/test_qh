import axios from 'axios';
import { HairAnalysisInput, APIResponse, FullAnalysisResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://backend-7lac8qjfv-ccomaengs-projects.vercel.app' : 'http://localhost:8000');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config);
    return config;
  },
  (error) => {
    console.error('API 요청 오류:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response);
    return response;
  },
  (error) => {
    console.error('API 응답 오류:', error);
    return Promise.reject(error);
  }
);

export const hairAnalysisAPI = {
  // 헬스 체크
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await api.get('/health');
    return response.data;
  },

  // 테스트 데이터 가져오기
  getTestData: async (): Promise<HairAnalysisInput> => {
    const response = await api.get('/test-data');
    return response.data;
  },

  // 모발검사 분석 (간단 버전)
  analyze: async (inputData: HairAnalysisInput): Promise<APIResponse> => {
    const response = await api.post('/simple/analyze', inputData);
    return response.data;
  },

  // 모발검사 7단계 전체 분석
  analyzeFullAnalysis: async (inputData: HairAnalysisInput): Promise<FullAnalysisResponse> => {
    const response = await api.post('/api/hair-analysis/full', inputData);
    return response.data;
  },

  // 간소화 분석
  analyzeSimple: async (inputData: HairAnalysisInput): Promise<{ analysis_result: string }> => {
    const response = await api.post('/api/hair-analysis/simple', inputData);
    return response.data;
  },

  // 프롬프트 기반 분석
  analyzePromptBased: async (inputData: HairAnalysisInput): Promise<{ analysis_result: string }> => {
    const response = await api.post('/api/hair-analysis/prompt-based', inputData);
    return response.data;
  },
};

export default api;