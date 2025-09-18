import React, { useState } from 'react';
import { FullAnalysisResponse } from '../../types';

interface StandardResultDisplayProps {
  result: FullAnalysisResponse;
  onReset: () => void;
}

export const StandardResultDisplay: React.FC<StandardResultDisplayProps> = ({ result, onReset }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal_info: true,
    comprehensive: true,
    statistics: false,
    summary: true,
    nutritionist: false,
    compressed: false,
  });

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('클립보드에 복사되었습니다.');
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'personal_info',
      title: '1. 개인정보 섹션',
      icon: '📋',
      content: result.personal_info_section,
    },
    {
      id: 'comprehensive',
      title: '2. 종합 분석',
      icon: '🔬',
      content: result.comprehensive_analysis,
    },
    {
      id: 'statistics',
      title: '3. 통계 분석',
      icon: '📊',
      content: result.statistics_analysis,
    },
    {
      id: 'summary',
      title: '4. 종합 요약',
      icon: '📝',
      content: result.summary_analysis,
    },
    {
      id: 'nutritionist',
      title: '5. 영양사 요약',
      icon: '👩‍⚕️',
      content: result.nutritionist_summary,
    },
    {
      id: 'compressed',
      title: '6. 압축 버전 (950-1000자)',
      icon: '📄',
      content: result.compressed_version,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 헤더 */}
      <div className="mb-6 text-center no-print">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          큐모발검사 종합멘트 결과 (7단계 분석)
        </h1>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            📄 인쇄하기
          </button>
          <button
            onClick={() => copyToClipboard(Object.values(result).join('\n\n'))}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            📋 전체 복사
          </button>
          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            🔄 새로운 분석
          </button>
        </div>

        {/* 목차 네비게이션 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">📑 목차</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className={`text-left p-2 rounded-md text-sm transition-colors ${
                  expandedSections[section.id]
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.icon} {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 콘텐츠 섹션들 */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-lg shadow-md print:shadow-none"
          >
            {/* 섹션 헤더 */}
            <div
              className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg cursor-pointer border-b no-print"
              onClick={() => toggleSection(section.id)}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {section.icon} {section.title}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(section.content);
                  }}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  복사
                </button>
                <span className="text-gray-500">
                  {expandedSections[section.id] ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* 섹션 콘텐츠 */}
            {expandedSections[section.id] && (
              <div className="p-6">
                <div className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                  {section.content}
                </div>

                {/* 특별한 섹션 추가 정보 */}
                {section.id === 'compressed' && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      💡 이 버전은 950-1000자로 압축된 요약 버전입니다.
                      간단한 설명이나 SMS 발송 시 활용하실 수 있습니다.
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                      현재 글자 수: {section.content.length}자
                    </p>
                  </div>
                )}

                {section.id === 'summary' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      🎯 이 섹션은 Note 5 규칙에 따라 생성되었습니다:
                    </p>
                    <ul className="text-xs text-blue-600 mt-1 ml-4 list-disc">
                      <li>정확히 5개 음식 추천</li>
                      <li>종합 분석에서 언급된 영양제만 추천</li>
                      <li>개인별 맞춤 재검사 기간 제시</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 인쇄 스타일 */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            font-size: 12px;
          }
          .bg-gray-50, .bg-blue-50, .bg-yellow-50 {
            background-color: white !important;
          }
          .shadow-md {
            box-shadow: none !important;
          }
          .space-y-6 > * + * {
            margin-top: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};