import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId: string, fileName: string = '큐모발검사_종합멘트.pdf') => {
  try {
    // PDF로 변환할 element 가져오기
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('PDF로 변환할 요소를 찾을 수 없습니다.');
    }

    // 로딩 상태 표시 (옵션)
    const loadingElement = document.createElement('div');
    loadingElement.innerHTML = 'PDF 생성 중...';
    loadingElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 16px;
    `;
    document.body.appendChild(loadingElement);

    // html2canvas 옵션 설정 - 고품질 설정
    const canvas = await html2canvas(element, {
      scale: 3, // 고해상도를 위해 3배 스케일
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      allowTaint: true,
      onclone: (clonedDoc) => {
        // 클론된 문서에서 불필요한 요소 제거
        const buttonsToHide = clonedDoc.querySelectorAll('.no-print');
        buttonsToHide.forEach((btn) => {
          (btn as HTMLElement).style.display = 'none';
        });

        // PDF용 스타일 최적화
        const clonedElement = clonedDoc.getElementById('pdf-content');
        if (clonedElement) {
          // transform 제거 (PDF에서는 스케일 적용 안함)
          clonedElement.style.transform = 'none';
          clonedElement.style.transformOrigin = 'unset';
        }
      }
    });

    // PDF 생성
    const imgData = canvas.toDataURL('image/png');

    // A4 사이즈 설정 (mm 단위)
    const pdfWidth = 210;
    const pdfHeight = 297;

    // 이미지 비율 계산
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    // PDF 페이지에 맞게 이미지 크기 조정
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10; // 상단 여백

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // 이미지 높이가 페이지를 초과하는 경우 여러 페이지로 분할
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();

    // 실제 콘텐츠 크기 계산
    const contentWidth = pageWidth - 20; // 좌우 여백 10mm씩
    const contentHeight = (imgHeight * contentWidth) / imgWidth;

    // 한 페이지에 들어갈 높이
    const onePageHeight = pageHeight - 20; // 상하 여백 10mm씩

    if (contentHeight <= onePageHeight) {
      // 한 페이지에 모두 표시
      pdf.addImage(imgData, 'PNG', 10, 10, contentWidth, contentHeight);
    } else {
      // 여러 페이지로 분할
      let heightLeft = contentHeight;
      let position = 0;

      while (heightLeft > 0) {
        const currentPageHeight = Math.min(onePageHeight, heightLeft);

        if (position > 0) {
          pdf.addPage();
        }

        // 각 페이지에 이미지 추가
        pdf.addImage(
          imgData,
          'PNG',
          10,
          position === 0 ? 10 : 10 - position,
          contentWidth,
          contentHeight,
          undefined,
          'FAST'
        );

        heightLeft -= onePageHeight;
        position += onePageHeight;
      }
    }

    // PDF 다운로드
    pdf.save(fileName);

    // 로딩 상태 제거
    document.body.removeChild(loadingElement);

    return true;
  } catch (error) {
    console.error('PDF 생성 중 오류 발생:', error);
    // 로딩 상태 제거 (오류 발생 시에도)
    const loadingElement = document.querySelector('div[style*="PDF 생성 중"]');
    if (loadingElement) {
      document.body.removeChild(loadingElement);
    }
    throw error;
  }
};

// 더 간단한 버전 (현재 화면 그대로 캡처)
export const generateSimplePDF = async (elementId: string, fileName: string = '큐모발검사_종합멘트.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('PDF로 변환할 요소를 찾을 수 없습니다.');
    }

    // 버튼들을 임시로 숨기기
    const buttons = element.querySelectorAll('.no-print');
    buttons.forEach(btn => {
      (btn as HTMLElement).style.display = 'none';
    });

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    // 버튼들 다시 표시
    buttons.forEach(btn => {
      (btn as HTMLElement).style.display = '';
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20; // 좌우 여백
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // 첫 페이지
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    heightLeft -= pageHeight - 20;

    // 추가 페이지들
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('PDF 생성 실패:', error);
    throw error;
  }
};