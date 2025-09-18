import React, { useState, useEffect } from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { HairAnalysisInput } from '../../types';

interface PersonalInfoFormProps {
  register: UseFormRegister<HairAnalysisInput>;
  errors: FieldErrors<HairAnalysisInput>;
  setValue?: UseFormSetValue<HairAnalysisInput>;
  watch?: UseFormWatch<HairAnalysisInput>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ register, errors, setValue, watch }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState('');

  // 특이사항 체크박스 옵션들
  const specialOptions = [
    { value: '염색', label: '염색' },
    { value: '파마', label: '파마' },
    { value: '탈색', label: '탈색' },
  ];

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (value: string) => {
    setSelectedOptions(prev => {
      const newOptions = prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value];

      // 특이사항 텍스트 업데이트
      updateSpecialNotes(newOptions, customNote);
      return newOptions;
    });
  };

  // 특이사항 텍스트 업데이트 함수
  const updateSpecialNotes = (options: string[], custom: string) => {
    let notes = '';

    if (options.length > 0) {
      notes = options.join(', ');
    }

    if (custom) {
      notes = notes ? `${notes}, ${custom}` : custom;
    }

    if (!notes) {
      notes = '없음';
    }

    if (setValue) {
      setValue('personal_info.special_notes', notes);
    }
  };

  // 커스텀 입력 변경 핸들러
  const handleCustomNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomNote(value);
    updateSpecialNotes(selectedOptions, value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📋 개인 정보
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('personal_info.name', {
              required: '이름은 필수 입력 항목입니다.',
              minLength: { value: 2, message: '이름은 최소 2글자 이상이어야 합니다.' }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="홍길동"
          />
          {errors.personal_info?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.personal_info.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            나이 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('personal_info.age', {
              required: '나이는 필수 입력 항목입니다.',
              min: { value: 1, message: '나이는 1세 이상이어야 합니다.' },
              max: { value: 120, message: '나이는 120세 이하여야 합니다.' }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder=""
            min="1"
            max="120"
          />
          {errors.personal_info?.age && (
            <p className="mt-1 text-sm text-red-600">{errors.personal_info.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            특이사항
          </label>

          {/* 체크박스 옵션들 */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-3 mb-2">
              {specialOptions.map(option => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    className="mr-1.5 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>

            {/* 기타 입력 필드 */}
            <div>
              <input
                type="text"
                placeholder="기타 (질환/직업 등)"
                value={customNote}
                onChange={handleCustomNoteChange}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 숨겨진 실제 입력 필드 */}
          <input
            type="hidden"
            {...register('personal_info.special_notes')}
            defaultValue="없음"
          />
        </div>
      </div>
    </div>
  );
};