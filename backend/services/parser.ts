import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export const parseCv = async (buffer: Buffer, mimeType: string): Promise<string> => {
  let text = '';

  if (mimeType === 'application/pdf') {
    const data = await pdf(buffer);
    text = data.text;
  } else if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else {
    throw new Error(`Unsupported file type: ${mimeType}. Please upload a PDF or DOCX file.`);
  }

  return text;
};
