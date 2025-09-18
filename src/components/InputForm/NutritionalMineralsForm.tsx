import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { HairAnalysisInput, TestResultValue } from '../../types';

interface NutritionalMineralsFormProps {
  register: UseFormRegister<HairAnalysisInput>;
  errors: FieldErrors<HairAnalysisInput>;
}

const mineralOptions: { key: keyof HairAnalysisInput['nutritional_minerals']; label: string }[] = [
  { key: 'calcium', label: '칼슘' },
  { key: 'magnesium', label: '마그네슘' },
  { key: 'sodium', label: '나트륨' },
  { key: 'potassium', label: '칼륨' },
  { key: 'copper', label: '구리' },
  { key: 'zinc', label: '아연' },
  { key: 'phosphorus', label: '인' },
  { key: 'iron', label: '철' },
  { key: 'manganese', label: '망간' },
  { key: 'chromium', label: '크롬' },
  { key: 'selenium', label: '셀레늄' },
];

const testResultValues: { value: TestResultValue; label: string; color: string }[] = [
  { value: '낮음', label: '낮음', color: 'text-blue-600' },
  { value: '정상', label: '정상', color: 'text-green-600' },
  { value: '높음', label: '높음', color: 'text-red-600' },
];

export const NutritionalMineralsForm: React.FC<NutritionalMineralsFormProps> = ({
  register,
  errors
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        🧪 영양 미네랄 (11종)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mineralOptions.map((mineral) => (
          <div key={mineral.key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mineral.label}
            </label>
            <div className="flex flex-row gap-4">
              {testResultValues.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register(`nutritional_minerals.${mineral.key}`, {
                      required: `${mineral.label} 검사 결과를 선택해주세요.`
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
            {errors.nutritional_minerals?.[mineral.key] && (
              <p className="text-sm text-red-600 mt-1">
                {errors.nutritional_minerals[mineral.key]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};