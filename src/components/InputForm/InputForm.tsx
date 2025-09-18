import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HairAnalysisInput, ResultDisplayType } from '../../types';
import { PersonalInfoForm } from './PersonalInfoForm';
import { HeavyMetalsForm } from './HeavyMetalsForm';
import { NutritionalMineralsForm } from './NutritionalMineralsForm';
import { HealthIndicatorsForm } from './HealthIndicatorsForm';
import { hairAnalysisAPI } from '../../services/api';

interface InputFormProps {
  onAnalysisResult: (result: any, resultType: ResultDisplayType) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  onAnalysisResult,
  isLoading,
  setIsLoading,
}) => {
  const [error, setError] = useState<string>('');
  const [resultType, setResultType] = useState<ResultDisplayType>('legacy');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<HairAnalysisInput>({
    defaultValues: {
      personal_info: {
        name: '',
        age: undefined as any,  // 빈칸으로 시작
        special_notes: '없음',
      },
      heavy_metals: {
        mercury: '정상',
        arsenic: '정상',
        cadmium: '정상',
        lead: '정상',
        aluminum: '정상',
        barium: '정상',
        nickel: '정상',
        uranium: '정상',
        bismuth: '정상',
      },
      nutritional_minerals: {
        calcium: '정상',
        magnesium: '정상',
        sodium: '정상',
        potassium: '정상',
        copper: '정상',
        zinc: '정상',
        phosphorus: '정상',
        iron: '정상',
        manganese: '정상',
        chromium: '정상',
        selenium: '정상',
      },
      health_indicators: {
        insulin_sensitivity: '정상',
        autonomic_nervous_system: '정상',
        stress_state: '정상',
        immune_skin_health: '정상',
        adrenal_activity: '정상',
        thyroid_activity: '정상',
      },
    },
  });

  const onSubmit = async (data: HairAnalysisInput) => {
    setIsLoading(true);
    setError('');

    try {
      console.log('제출 데이터:', data);
      console.log('결과 타입:', resultType);

      if (resultType === 'standard') {
        // 새로운 7단계 분석 API 호출
        const result = await hairAnalysisAPI.analyzeFullAnalysis(data);
        console.log('7단계 분석 결과:', result);
        onAnalysisResult(result, 'standard');
      } else {
        // 기존 분석 API 호출 (legacy)
        const result = await hairAnalysisAPI.analyze(data);
        if (result.success && result.data) {
          onAnalysisResult(result.data, 'legacy');
        } else {
          setError(result.message || '분석 중 오류가 발생했습니다.');
          if (result.errors && result.errors.length > 0) {
            setError(result.errors.join(', '));
          }
        }
      }
    } catch (err: any) {
      console.error('분석 오류:', err);
      setError(err.response?.data?.detail || err.message || '서버와의 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTestData = async () => {
    try {
      const testData = await hairAnalysisAPI.getTestData();
      console.log('테스트 데이터:', testData);

      // 폼 값들 설정
      setValue('personal_info', testData.personal_info);
      setValue('heavy_metals', testData.heavy_metals);
      setValue('nutritional_minerals', testData.nutritional_minerals);
      setValue('health_indicators', testData.health_indicators);

      // 페이지 새로고침으로 라디오 버튼 업데이트
      window.location.reload();
    } catch (err) {
      console.error('테스트 데이터 로드 실패:', err);
      setError('테스트 데이터를 불러오는데 실패했습니다.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          큐모발검사 종합멘트 자동 생성 시스템
        </h1>
        <p className="text-gray-600">
          모발검사 결과를 입력하시면 개인 맞춤형 종합멘트를 자동으로 생성해드립니다.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <PersonalInfoForm register={register} errors={errors} setValue={setValue} watch={watch} />
        <HeavyMetalsForm register={register} errors={errors} />
        <NutritionalMineralsForm register={register} errors={errors} />
        <HealthIndicatorsForm register={register} errors={errors} />

        {/* 결과 페이지 타입 선택 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            결과 페이지 타입 선택
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="resultType"
                value="standard"
                checked={resultType === 'standard'}
                onChange={(e) => setResultType(e.target.value as ResultDisplayType)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div>
                <div className="font-medium text-gray-900">
                  🔬 표준 7단계 분석
                </div>
                <div className="text-sm text-gray-600">
                  백엔드 API 표준 형식 (개인정보, 종합분석, 통계, 요약, 영양사요약, 압축버전)
                </div>
              </div>
            </label>

            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="resultType"
                value="legacy"
                checked={resultType === 'legacy'}
                onChange={(e) => setResultType(e.target.value as ResultDisplayType)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div>
                <div className="font-medium text-gray-900">
                  📋 기존 형식
                </div>
                <div className="text-sm text-gray-600">
                  기존 결과 페이지 형식 (영양권장, 생활개선, 추가검사, 주의사항, 맺음말)
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={loadTestData}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            테스트 데이터 불러오기
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
              setError('');
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            초기화
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                분석 중...
              </span>
            ) : (
              '종합멘트 생성'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};