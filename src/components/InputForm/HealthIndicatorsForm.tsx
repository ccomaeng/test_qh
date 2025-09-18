import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { HairAnalysisInput, TestResultValue } from '../../types';

interface HealthIndicatorsFormProps {
  register: UseFormRegister<HairAnalysisInput>;
  errors: FieldErrors<HairAnalysisInput>;
}

const healthIndicatorOptions: { key: keyof HairAnalysisInput['health_indicators']; label: string }[] = [
  { key: 'insulin_sensitivity', label: '인슐린 민감도' },
  { key: 'autonomic_nervous_system', label: '자율신경계' },
  { key: 'stress_state', label: '스트레스 상태' },
  { key: 'immune_skin_health', label: '면역 및 피부 건강' },
  { key: 'adrenal_activity', label: '부신 활성도' },
  { key: 'thyroid_activity', label: '갑상선 활성도' },
];

const testResultValues: { value: TestResultValue; label: string; color: string }[] = [
  { value: '낮음', label: '낮음', color: 'text-blue-600' },
  { value: '정상', label: '정상', color: 'text-green-600' },
  { value: '높음', label: '높음', color: 'text-red-600' },
];

export const HealthIndicatorsForm: React.FC<HealthIndicatorsFormProps> = ({
  register,
  errors
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        💊 건강 상태 지표 (6종)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthIndicatorOptions.map((indicator) => (
          <div key={indicator.key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {indicator.label}
            </label>
            <div className="flex flex-row gap-4">
              {testResultValues.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register(`health_indicators.${indicator.key}`, {
                      required: `${indicator.label} 검사 결과를 선택해주세요.`
                    })}
                    value={option.value}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    defaultChecked={option.value === '정상'}
                  />
                  <span className={`ml-1.5 text-sm font-medium ${option.color}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.health_indicators?.[indicator.key] && (
              <p className="text-sm text-red-600 mt-1">
                {errors.health_indicators[indicator.key]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};