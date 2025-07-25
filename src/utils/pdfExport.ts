import html2pdf from 'html2pdf.js';

interface ExportOptions {
  filename?: string;
  pageSize?: 'a4' | 'letter';
  margin?: number | [number, number, number, number]; // [top, right, bottom, left] in mm
  includeDate?: boolean;
}

export const exportResumeToPDF = async (
  elementId: string,
  options: ExportOptions = {}
) => {
  const {
    filename = 'resume.pdf',
    pageSize = 'a4',
    margin = 10,
    includeDate = true
  } = options;

  // Get the element to export
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Add date to filename if requested
  const dateStr = includeDate 
    ? `_${new Date().toISOString().split('T')[0]}` 
    : '';
  
  const fullFilename = filename.includes('.pdf') 
    ? filename.replace('.pdf', `${dateStr}.pdf`) 
    : `${filename}${dateStr}.pdf`;

  // Configure html2pdf options
  const pdfOptions = {
    margin: margin,
    filename: fullFilename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: pageSize, 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    // Create PDF
    const pdf = await html2pdf().from(clone).set(pdfOptions).save();
    return {
      success: true,
      filename: fullFilename
    };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Helper function to determine optimal page size based on country
export const getRecommendedPageSize = (
  country: string
): 'a4' | 'letter' => {
  // Most countries use A4 format except US and Canada
  const letterCountries = ['usa', 'canada'];
  return letterCountries.includes(country.toLowerCase()) ? 'letter' : 'a4';
};

// Helper to generate ATS-friendly filename
export const generateATSFilename = (
  firstName: string,
  lastName: string,
  position: string = 'Resume'
): string => {
  const cleanName = `${lastName}_${firstName}`.replace(/[^a-zA-Z0-9]/g, '');
  const cleanPosition = position.replace(/[^a-zA-Z0-9]/g, '_');
  return `${cleanName}_${cleanPosition}.pdf`;
};