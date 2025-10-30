// app/subjects/[subject]/[category]/page.js

const pdfMap = {
  dsp: {
    expt: [
      { file: "DSP_EXPT_1_MANE_078_B1.pdf", label: "Experiment 1: Sampling Theorem" },
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
  // Add more subjects and categories as you grow!
};

export default function CategoryPage({ params }) {
  // Destructure params (Next.js 14+/App Router)
  const { subject, category } = params;

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
