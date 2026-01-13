import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (elementId) => {
    const originalElement = document.getElementById(elementId);
    if (!originalElement) throw new Error('Element not found');

    // Create a clone to avoid messing with the view
    // We need to handle the transform: scale on the parent which might mess up html2canvas
    const clone = originalElement.cloneNode(true);

    // Create a container for the clone that lives outside the scaled viewport
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-10000px';
    container.style.left = '-10000px';
    container.style.width = originalElement.style.width; // Should be fixed pixel width from component
    container.style.height = originalElement.style.height;
    container.appendChild(clone);
    document.body.appendChild(container);

    try {
        // Wait a moment for images to settle in the clone
        clone.style.transform = 'none';

        // Generate high-quality canvas
        const canvas = await html2canvas(clone, {
            scale: 1.5, // Reduced slightly to avoid memory issues on mobile/large screens
            useCORS: true,
            allowTaint: true,
            logging: true,
            backgroundColor: '#ffffff',
            windowWidth: clone.scrollWidth,
            windowHeight: clone.scrollHeight,
            imageTimeout: 15000
        });

        const imgData = canvas.toDataURL('image/png');

        // A3 Landscape dimensions
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a3'
        });

        // A3 Landscape: 420mm x 297mm
        const pdfWidth = 420;
        const pdfHeight = 297;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('poster-immobiliare.pdf');
    } catch (err) {
        console.error('PDF generation error:', err);
        throw err;
    } finally {
        // Clean up
        document.body.removeChild(container);
    }
};
