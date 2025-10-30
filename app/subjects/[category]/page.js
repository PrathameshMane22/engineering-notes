export default function CategoryPage({ params }) {
  const { subject, category } = params;

  const pdfList = [
    { file: "DSP_EXPT_1_MANE_078_B1.pdf", label: "DSP EXPT 1 MANE 078 B1" }
  ];

  return (
    <div style={{ padding: 40 }}>
      <h1>{subject?.toUpperCase()} - {category?.toUpperCase()}</h1>
      <ul>
        {pdfList.map((pdf) => (
          <li key={pdf.file}>
            <a 
              href={`/subjects/${subject}/${category}/${pdf.file}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "blue" }}
            >
              {pdf.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
