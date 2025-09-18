import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { HairAnalysisInput, HeavyMetalValue } from '../../types';

interface HeavyMetalsFormProps {
  register: UseFormRegister<HairAnalysisInput>;
  errors: FieldErrors<HairAnalysisInput>;
}

const heavyMetalsOptions: { key: keyof HairAnalysisInput['heavy_metals']; label: string }[] = [
  { key: 'mercury', label: '수은' },
  { key: 'arsenic', label: '비소' },
  { key: 'cadmium', label: '카드뮴' },
  { key: 'lead', label: '납' },
  { key: 'aluminum', label: '알루미늄' },
  { key: 'barium', label: '바륨' },
  { key: 'nickel', label: '니켈' },
  { key: 'uranium', label: '우라늄' },
  { key: 'bismuth', label: '비스무트' },
];

const heavyMetalValues: { value: HeavyMetalValue; label: string; color: string }[] = [
  { value: '정상', label: '정상', color: 'text-green-600' },
  { value: '높음', label: '높음', color: 'text-red-600' },
];

export const HeavyMetalsForm: React.FC<HeavyMetalsFormProps> = ({ register, errors }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        ⚠️ 유해 중금속 (9종)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {heavyMetalsOptions.map((metal) => (
          <div key={metal.key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {metal.label}
            </label>
            <div className="flex space-x-4">
              {heavyMetalValues.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    {...register(`heavy_metals.${metal.key}`, {
                      required: `${metal.label} 검사 결과를 선택해주세요.`
                    })}
                    value={option.value}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    defaultChecked={option.value === '정상'}
                  />
                  <span className={`ml-2 text-sm font-medium ${option.color}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.heavy_metals?.[metal.key] && (
              <p className="text-sm text-red-600">
                {errors.heavy_metals[metal.key]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};