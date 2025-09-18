import React, { useState } from 'react';
import { InputForm } from './components/InputForm/InputForm';
import { ResultDisplay } from './components/ResultDisplay/ResultDisplay';
import { StandardResultDisplay } from './components/ResultDisplay/StandardResultDisplay';
import { HairAnalysisResult, FullAnalysisResponse, ResultDisplayType } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<HairAnalysisResult | FullAnalysisResponse | null>(null);
  const [resultType, setResultType] = useState<ResultDisplayType>('standard');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisResult = (analysisResult: HairAnalysisResult | FullAnalysisResponse, type: ResultDisplayType) => {
    setResult(analysisResult);
    setResultType(type);
  };

  const handleReset = () => {
    setResult(null);
    setResultType('standard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* 왼쪽: 입력 폼 */}
        <div className="w-full lg:w-1/2 overflow-y-auto border-r border-gray-200">
          <InputForm
            onAnalysisResult={handleAnalysisResult}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>

        {/* 오른쪽: 결과 표시 */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-white">
          {!result ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <svg className="mx-auto h-24 w-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">결과가 여기에 표시됩니다</h3>
                <p className="text-gray-500">왼쪽 폼에 정보를 입력하고 '종합멘트 생성' 버튼을 클릭하세요.</p>
              </div>
            </div>
          ) : (
            <>
              {resultType === 'standard' ? (
                <StandardResultDisplay
                  result={result as FullAnalysisResponse}
                  onReset={handleReset}
                />
              ) : (
                <ResultDisplay
                  result={result as HairAnalysisResult}
                  onReset={handleReset}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;