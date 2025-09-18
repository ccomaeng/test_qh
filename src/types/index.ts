// 입력 데이터 타입
export interface PersonalInfo {
  name: string;
  age: number;
  special_notes: string;
}

export type HeavyMetalValue = '정상' | '높음';
export type TestResultValue = '정상' | '높음' | '낮음';

export interface HeavyMetals {
  mercury: HeavyMetalValue;
  arsenic: HeavyMetalValue;
  cadmium: HeavyMetalValue;
  lead: HeavyMetalValue;
  aluminum: HeavyMetalValue;
  barium: HeavyMetalValue;
  nickel: HeavyMetalValue;
  uranium: HeavyMetalValue;
  bismuth: HeavyMetalValue;
}

export interface NutritionalMinerals {
  calcium: TestResultValue;
  magnesium: TestResultValue;
  sodium: TestResultValue;
  potassium: TestResultValue;
  copper: TestResultValue;
  zinc: TestResultValue;
  phosphorus: TestResultValue;
  iron: TestResultValue;
  manganese: TestResultValue;
  chromium: TestResultValue;
  selenium: TestResultValue;
}

export interface HealthIndicators {
  insulin_sensitivity: TestResultValue;
  autonomic_nervous_system: TestResultValue;
  stress_state: TestResultValue;
  immune_skin_health: TestResultValue;
  adrenal_activity: TestResultValue;
  thyroid_activity: TestResultValue;
}

export interface HairAnalysisInput {
  personal_info: PersonalInfo;
  heavy_metals: HeavyMetals;
  nutritional_minerals: NutritionalMinerals;
  health_indicators: HealthIndicators;
}

// 출력 데이터 타입
export interface PersonalInfoSection {
  name: string;
  age: number;
  age_group: string;
  special_notes: string;
  heavy_metals_normal: string[];
  heavy_metals_high: string[];
  heavy_metals_normal_count: number;
  heavy_metals_high_count: number;
  minerals_normal: string[];
  minerals_high: string[];
  minerals_low: string[];
  minerals_normal_count: number;
  minerals_high_count: number;
  minerals_low_count: number;
  health_normal: string[];
  health_high: string[];
  health_low: string[];
  health_normal_count: number;
  health_high_count: number;
  health_low_count: number;
}

export interface ComprehensiveAnalysis {
  first_paragraph: string;
  heavy_metals_analysis: string;
  minerals_analysis: string;
  health_indicators_analysis: string;
}

export interface SummaryExplanation {
  title: string;
  recommended_foods: string[];
  recommended_supplements: string;
  recheck_period: string;
}

export interface StatisticsAnalysis {
  total_characters: number;
  total_words: number;
  paragraph_count: number;
  average_paragraph_length: number;
  first_paragraph_ratio: number;
  heavy_metals_ratio: number;
  minerals_ratio: number;
  health_indicators_ratio: number;
}

export interface ComprehensiveSummary {
  main_problems: string[];
  key_management_directions: string[];
  precautions: string[];
  expected_effects: string;
}

export interface NutritionistSummary {
  professional_summary: string;
  priority_management: string;
  supplement_strategy: string;
  prognosis_analysis: string;
}

export interface CompressedVersion {
  content: string;
  character_count: number;
}

export interface HairAnalysisOutput {
  personal_info_section: PersonalInfoSection;
  comprehensive_analysis: ComprehensiveAnalysis;
  summary_explanation: SummaryExplanation;
  statistics_analysis: StatisticsAnalysis;
  comprehensive_summary: ComprehensiveSummary;
  nutritionist_summary: NutritionistSummary;
  compressed_version: CompressedVersion;
}

// 백엔드 API 7단계 분석 응답 타입
export interface FullAnalysisResponse {
  personal_info_section: string;
  comprehensive_analysis: string;
  statistics_analysis: string;
  summary_analysis: string;
  nutritionist_summary: string;
  compressed_version: string;
}

export interface SimpleAnalysisResponse {
  analysis_result: string;
}

export interface PromptBasedAnalysisResponse {
  analysis_result: string;
}

// 기존 ResultDisplay에서 사용하는 타입 (호환성 유지)
export interface HairAnalysisResult {
  personal_info_section: string;
  summary_section: string;
  comprehensive_analysis: string;
  nutritional_recommendations: string;
  lifestyle_recommendations: string;
  additional_test_recommendations: string;
  precautions: string;
  closing_remarks: string;
}

// 결과 타입 선택용
export type ResultDisplayType = 'legacy' | 'standard';

export interface APIResponse {
  success: boolean;
  message: string;
  data?: HairAnalysisOutput;
  errors?: string[];
}