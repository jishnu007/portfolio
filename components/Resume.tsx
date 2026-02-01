import React from "react";

function Resume() {
  // Your resume PDF path
  const resumePdfUrl = "/Jishnu Pavithran - SE.pdf";

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      gap: '1rem',
      padding: '1rem'
    }}>
      {/* PDF Viewer */}
      <iframe
        src={resumePdfUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          minHeight: '600px'
        }}
        title="Jishnu Pavithran Resume"
      />
      
      {/* Download button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <a
          href={resumePdfUrl}
          download="Jishnu_Pavithran_Resume.pdf"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#9da284',
            color: '#2c281d',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}

export default Resume;
