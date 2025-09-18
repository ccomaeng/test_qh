import React from 'react';
import { HairAnalysisResult } from '../../types';
import { generatePDF } from '../../utils/pdfGenerator';

interface ResultDisplayProps {
  result: HairAnalysisResult;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const [contentScale, setContentScale] = React.useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);

  React.useEffect(() => {
    // 내용량 계산
    const totalLength =
      result.personal_info_section.length +
      result.summary_section.length +
      result.comprehensive_analysis.length;

    // 내용량에 따른 스케일 조정
    let scale = 1;
    let scaleClass = 'normal';

    if (totalLength > 2500) {
      scale = 0.85;
      scaleClass = 'large';
    } else if (totalLength > 2000) {
      scale = 0.92;
      scaleClass = 'medium';
    } else if (totalLength < 1000) {
      scale = 1.15;
      scaleClass = 'small';
    }

    setContentScale(scale);

    // 인쇄용 data attribute 설정
    setTimeout(() => {
      const printContainer = document.querySelector('.print-container');
      if (printContainer) {
        printContainer.setAttribute('data-content-scale', scaleClass);
      }
    }, 100);
  }, [result]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      const fileName = `큐모발검사_종합멘트_${new Date().toISOString().split('T')[0]}.pdf`;
      await generatePDF('pdf-content', fileName);
    } catch (error) {
      console.error('PDF 생성 실패:', error);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('클립보드에 복사되었습니다.');
    });
  };

  // 마크다운 스타일 볼드 처리를 HTML로 변환
  const convertMarkdownToHtml = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  // 개인정보 섹션 줄바꿈 처리
  const formatPersonalInfoSection = (html: string) => {
    // "큐모발검사 영양전문가입니다." 뒤에 줄바꿈 추가
    let formatted = html.replace(
      /(큐모발검사 영양전문가입니다\.)\s*/g,
      '$1<br>'
    );

    // "맞춤 영양상담지를 작성하였으니," 뒤에 줄바꿈 추가 제거
    // "꼼꼼히 읽어보시길 바랍니다."와 "더 건강해질 님을 응원합니다!"를 한 줄로
    formatted = formatted.replace(
      /(맞춤 영양상담지를 작성하였으니,)\s*/g,
      '$1 '
    );

    // h1 태그에 클래스 추가하여 제목 스타일 분리
    formatted = formatted.replace(
      /<h1>/g,
      '<h1 class="result-title">'
    );

    // 안녕하세요 부분부터 응원합니다 부분까지를 letter-section으로 감싸기
    formatted = formatted.replace(
      /(안녕하세요[\s\S]*?응원합니다!)/,
      '<div class="letter-section">$1</div>'
    );

    // "더 건강해질 님을 응원합니다!" 부분을 볼드 처리
    formatted = formatted.replace(
      /(더 건강해질.*?님을 응원합니다!)/,
      '<strong>$1</strong>'
    );

    return formatted;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-3 text-center no-print">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          큐모발검사 종합멘트 결과
        </h1>
        <div className="flex justify-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 no-print"
          >
            인쇄하기
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 no-print disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? 'PDF 생성 중...' : 'PDF 다운로드'}
          </button>
          <button
            onClick={() => copyToClipboard(result.comprehensive_analysis)}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 no-print"
          >
            결과 복사
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 no-print"
          >
            새로운 분석
          </button>
        </div>
      </div>

      <div
        id="pdf-content"
        className="bg-white p-5 rounded-lg shadow-md print:shadow-none print-container"
        style={{ transform: `scale(${contentScale})`, transformOrigin: 'top center' }}
      >
        <div className="mb-1">
          <div
            className="personal-info-section text-sm"
            dangerouslySetInnerHTML={{ __html: formatPersonalInfoSection(result.personal_info_section) }}
          />
        </div>

        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            📋 요약 정보
          </h2>
          <div className="bg-blue-50 p-4 rounded-md border-l-3 border-blue-500">
            <div className="whitespace-pre-wrap font-sans text-gray-700 leading-snug text-sm">
              {result.summary_section}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            📊 종합 분석 결과
          </h2>
          <div className="bg-green-50 p-4 rounded-md border-l-3 border-green-500">
            <div className="whitespace-pre-wrap font-sans text-gray-700 leading-snug text-sm">
              {result.comprehensive_analysis}
            </div>
          </div>
        </div>

        {/* 푸터 이미지 */}
        <div className="mt-6 text-center footer-section">
          <img
            src="/images/kakao-channel-footer.png"
            alt="카카오톡 채널 바로가기"
            className="mx-auto max-w-full h-auto footer-image"
            style={{ maxHeight: '80px', objectFit: 'contain' }}
          />
        </div>

      </div>


      <style>{`
        .personal-info-section {
          padding: 8px 10px 0px 10px;
          border-radius: 8px;
        }

        .personal-info-section .result-title {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 10px;
          line-height: 1.4;
        }

        .personal-info-section .letter-section {
          font-family: 'Gowun Batang', 'Gamja Flower', serif;
          text-align: center;
          line-height: 1.75;
          font-size: 15px;
          color: #2c3e50;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(248,249,250,0.3), rgba(255,255,255,0));
          padding: 8px 15px 5px 15px;
          border-radius: 8px;
          max-width: 800px;
          margin: 0 auto;
        }

        .personal-info-section .letter-section strong {
          font-weight: 700;
          color: #1a365d;
        }

        @media screen and (max-width: 768px) {
          .personal-info-section .result-title {
            font-size: 18px;
          }

          .personal-info-section .letter-section {
            font-size: 14px;
            padding: 12px 8px;
          }
        }

        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }

          @page {
            margin: 0.4in !important;
            size: A4 !important;
          }

          .no-print {
            display: none !important;
          }

          body {
            font-size: 18px !important;
            line-height: 1.5 !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .max-w-4xl {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .bg-white {
            background-color: white !important;
            padding: 0.5rem !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
            outline: none !important;
          }

          .mb-5 {
            margin-bottom: 0.4rem !important;
          }

          .mb-4 {
            margin-bottom: 0.4rem !important;
          }

          .mb-3 {
            margin-bottom: 0.35rem !important;
          }

          .mb-2 {
            margin-bottom: 0.25rem !important;
          }

          .text-lg {
            font-size: 26px !important;
            font-weight: 700 !important;
            color: #1a365d !important;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
            margin-bottom: 1rem !important;
          }

          .text-sm {
            font-size: 18px !important;
            line-height: 1.5 !important;
          }

          .font-sans {
            font-size: 18px !important;
            line-height: 1.5 !important;
          }

          /* 개인정보 섹션 최적화 */
          .personal-info-section {
            padding: 5px 8px 0px 8px !important;
          }

          .personal-info-section .result-title {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
            text-align: center !important;
            font-size: 20px !important;
            font-weight: 700 !important;
            color: #1a365d !important;
            margin-bottom: 8px !important;
            line-height: 1.3 !important;
          }

          .personal-info-section .letter-section {
            font-family: 'Gowun Batang', 'Gamja Flower', serif !important;
            text-align: center !important;
            line-height: 1.6 !important;
            font-size: 15px !important;
            color: #2c3e50 !important;
            background: transparent !important;
            padding: 5px 10px 3px 10px !important;
            max-width: 90% !important;
            margin: 0 auto !important;
          }

          .personal-info-section .letter-section strong {
            font-weight: 700 !important;
            color: #1a365d !important;
          }

          .font-sans h1 {
            font-size: 24px !important;
            margin-bottom: 0.8rem !important;
            line-height: 1.2 !important;
            font-weight: 700 !important;
            color: #1a365d !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
          }

          .font-sans p {
            font-size: 19px !important;
            line-height: 1.3 !important;
            margin-bottom: 0.5rem !important;
          }

          .font-sans div[style*="text-align: center"] {
            margin-bottom: 0.8rem !important;
            padding: 0.5rem 0 !important;
          }

          .bg-gray-50 {
            background-color: #f8f9fa !important;
            padding: 1rem !important;
            border: none !important;
            border-radius: 0 !important;
          }

          .bg-blue-50 {
            background-color: #e3f2fd !important;
            padding: 1rem !important;
            border: none !important;
            border-radius: 0 !important;
          }

          .bg-green-50 {
            background-color: #e8f5e9 !important;
            padding: 1rem !important;
            border: none !important;
            border-radius: 0 !important;
          }

          .border-l-3 {
            border-left-width: 0 !important;
          }

          .border-blue-500 {
            border-color: transparent !important;
          }

          .leading-snug {
            line-height: 1.4 !important;
          }

          .whitespace-pre-wrap {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
          }

          h2 {
            break-after: avoid !important;
            page-break-after: avoid !important;
          }

          .rounded-md {
            border-radius: 0 !important;
          }

          /* 페이지 분할 방지 */
          .bg-gray-50, .bg-blue-50 {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* 푸터 이미지 스타일링 */
          .footer-section {
            margin-top: 1rem !important;
            margin-bottom: 0 !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .footer-image {
            max-height: 60px !important;
            width: auto !important;
            display: block !important;
            margin: 0 auto !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* 추가 공간 최적화 */
          * {
            margin: 0 !important;
            padding: 0 !important;
          }

          .max-w-4xl > div:first-child {
            padding: 0.3rem !important;
          }

          .mb-5, .mb-4, .mb-3 {
            margin-bottom: 0.8rem !important;
          }

          /* 컨테이너 최적화 */
          .bg-white {
            padding: 0.8rem !important;
          }

          .bg-gray-50, .bg-blue-50 {
            padding: 1rem !important;
            margin: 0.7rem 0 !important;
          }

          /* 내용량 기반 동적 스케일링 */
          [data-content-scale="small"] {
            transform: scale(1.15) !important;
          }

          [data-content-scale="normal"] {
            transform: scale(1) !important;
          }

          [data-content-scale="medium"] {
            transform: scale(0.92) !important;
          }

          [data-content-scale="large"] {
            transform: scale(0.85) !important;
          }
        }

        @media screen {
          .leading-snug {
            line-height: 1.375;
          }
        }

        /* 반응형 인쇄 최적화 */
        @media print and (max-width: 21cm) {
          body {
            font-size: 15px !important;
          }

          .text-lg {
            font-size: 18px !important;
          }

          .text-sm {
            font-size: 14px !important;
          }

          .font-sans {
            font-size: 14px !important;
          }

          .font-sans h1 {
            font-size: 21px !important;
          }

          .font-sans p {
            font-size: 12px !important;
          }
        }

        @media print and (max-width: 18cm) {
          body {
            font-size: 14px !important;
          }

          .text-lg {
            font-size: 17px !important;
          }

          .text-sm {
            font-size: 12px !important;
          }

          .font-sans {
            font-size: 12px !important;
          }

          .font-sans h1 {
            font-size: 18px !important;
          }

          .font-sans p {
            font-size: 11px !important;
          }

          .bg-gray-50, .bg-blue-50 {
            padding: 0.3rem !important;
          }
        }

        /* 매우 작은 화면용 최적화 */
        @media print and (max-width: 15cm) {
          @page {
            margin: 0.3in !important;
          }

          body {
            font-size: 12px !important;
          }

          .max-w-4xl {
            padding: 0.2rem !important;
          }

          .bg-white {
            padding: 0.2rem !important;
          }

          .mb-5, .mb-4, .mb-3 {
            margin-bottom: 0.3rem !important;
          }

          .footer-image {
            max-height: 30px !important;
          }
        }
      `}</style>
    </div>
  );
};