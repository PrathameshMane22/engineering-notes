// This page will handle display of PDFs for ANY subject/category dynamically

// You can create a mapping of PDFs for quick start. Later you can load from a JSON file if needed!

const pdfMap = {
  dsp: {
    expt: [
      { file: "experiment-1.pdf", label: "Experiment 1: Sampling Theorem" },
      { file: "experiment-2.pdf", label: "Experiment 2: FFT Analysis" }
    ],
    notes: [
      { file: "note-1.pdf", label: "DSP Unit 1 Notes" }
    ],
    books: [
      { file: "oppenheim-dsp.pdf", label: "Oppenheim DSP Book" }
    ]
  },
  "mobile-wireless-communication": {
    expt: [
      { file: "experiment-1.pdf", label: "GSM Experiment" }
    ],
    notes: [],
    books: []
  },
  // Add other subjects here!
};

export default function CategoryPage({ params }) {
  const { subject, category } = params;

  // Defensive check
  const pdfList =
    pdfMap[subject] && pdfMap[subject][category]
      ? pdfMap[subject][category]
      : [];

  return (
    <div style={{ padding: 40 }}>
      <h1>
        {subject.replaceAll("-", " ").toUpperCase()} -{" "}
        {category.replaceAll("-", " ").toUpperCase()}
      </h1>
      {pdfList.length === 0 ? (
        <p style={{ color: "red" }}>No PDFs available yet for this section.</p>
      ) : (
        <ul>
          {pdfList.map((pdf) => (
            <li key={pdf.file} style={{ marginBottom: 8 }}>
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
      )}
    </div>
  );
}
