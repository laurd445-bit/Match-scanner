async function processImage() {
  const input = document.getElementById('imageInput');
  const status = document.getElementById('status');
  const output = document.getElementById('output');

  if (!input.files || input.files.length === 0) {
    status.textContent = "Please select an image file first.";
    return;
  }

  const file = input.files[0];
  status.textContent = "Reading image text with OCR...";
  output.textContent = "";

  try {
    // Initialize OCR worker for English text extraction
    const worker = await Tesseract.createWorker('eng');
    const ret = await worker.recognize(file);
    
    status.textContent = "Scan complete!";
    output.textContent = ret.data.text.trim() || "No legible text detected in image.";
    
    await worker.terminate();
  } catch (error) {
    status.textContent = "Error scanning image.";
    output.textContent = error.message;
  }
}
