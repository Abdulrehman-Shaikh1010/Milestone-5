document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeOutput = document.getElementById('resume-output') as HTMLElement;
    const resumeContent = document.getElementById('resume-content') as HTMLElement;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve form input values
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        // Check if all fields are filled
        if (username && name && email && phone && education && experience && skills) {
            // Display resume content in the browser
            resumeContent.innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Education:</strong> ${education}</p>
                <p><strong>Experience:</strong> ${experience}</p>
                <p><strong>Skills:</strong> ${skills}</p>`;

            // Create a unique filename based on the user's entered resume URL
            const filename = `${username.trim().replace(/\s+/g, '_')}_resume.html`;

            // Generate the HTML content for the resume
            const resumeHTML = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${name}'s Resume</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h1 { text-align: center; }
                        p { margin: 5px 0; }
                        strong { color: #333; }
                    </style>
                </head>
                <body>
                    <h1>${name}'s Resume</h1>
                    ${resumeContent.innerHTML}
                </body>
                </html>`;

            // Create a download link for the resume (HTML)
            const downloadLink = document.createElement('a');
            downloadLink.href = `data:text/html;charset=utf-8,${encodeURIComponent(resumeHTML)}`;
            downloadLink.download = filename;
            downloadLink.textContent = 'Download Your Resume (HTML)';

            // Remove any previous download link and add the new one
            resumeOutput.innerHTML = ''; // Clear previous content
            resumeOutput.appendChild(downloadLink);
            resumeOutput.style.display = 'block';

            // Automatically click the download link to prompt download
            downloadLink.click();

            // *******************************************************************************************
            // PDF generation using jsPDF
            // *******************************************************************************************
            import('jspdf').then((jsPDFModule) => {
                const jsPDF = jsPDFModule.jsPDF;
                const pdf = new jsPDF();

                // Set PDF content
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(16);
                pdf.text(`${name}'s Resume`, 105, 20, { align: "center" });
                pdf.setFontSize(12);
                pdf.text(`Name: ${name}`, 10, 30);
                pdf.text(`Email: ${email}`, 10, 40);
                pdf.text(`Phone: ${phone}`, 10, 50);
                pdf.text(`Education: ${education}`, 10, 60);
                pdf.text(`Experience: ${experience}`, 10, 80);
                pdf.text(`Skills: ${skills}`, 10, 100);

                // PDF Download button
                const downloadPDFLink = document.createElement('a');
                downloadPDFLink.href = pdf.output('dataurlstring'); // Generate PDF URL
                downloadPDFLink.download = `${username.trim().replace(/\s+/g, '_')}_resume.pdf`; // PDF filename
                downloadPDFLink.textContent = 'Download Your Resume (PDF)';

                // Append PDF download link below HTML download link
                resumeOutput.appendChild(document.createElement('br')); // Add line break
                resumeOutput.appendChild(downloadPDFLink);
            }).catch((err) => {
                console.error('Error loading jsPDF library:', err);
            });
        } else {
            alert('Please fill out all fields.');
        }
    });
});

