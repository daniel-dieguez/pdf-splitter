


export default function Inicio() {
  return (
     <>
      {/* HEADER
      <header className="w-full border-b border-zinc-900 px-12 py-7 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_20%_50%,rgba(255,255,255,0.03),transparent)] pointer-events-none" /> */}

        {/* Logo */}
        {/* <div className="flex items-center gap-4">
          <div className="w-11 h-11 border border-zinc-800 rounded-xl bg-zinc-950 flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" stroke="#555" />
              <line x1="9" y1="17" x2="12" y2="17" stroke="#555" />
            </svg>
          </div>
          <div>
            <h1 className="font-black text-[1.1rem] tracking-tight text-white leading-none">
              PDFstudio
            </h1>
            <span className="font-mono text-[0.65rem] text-zinc-600 tracking-widest uppercase">
              Separar · Ordenar · Unir
            </span>
          </div>
        </div> */}

        {/* Badge */}
        {/* <div className="font-mono text-[0.62rem] tracking-widest uppercase text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full bg-zinc-950">
          <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
          v1.0
        </div>
      </header> */}

      {/* HERO */}
      <div className="w-full max-w-3xl px-12 pt-20 pb-16 flex flex-col gap-6">
        {/* <div className="flex items-center gap-2.5 font-mono text-[0.68rem] tracking-widest uppercase text-zinc-600">
          <span className="w-6 h-px bg-zinc-800" />
          Herramienta de documentos
        </div> */}

        <h2 className="font-black text-5xl tracking-tighter leading-[1.05] text-white">
          Divide, ordena<br />
          <span className="text-green-600">y unifica</span> tus PDFs
        </h2>

        <p className="font-mono text-[0.8rem] text-white-600 leading-relaxed max-w-md font-light">
          Sube uno o varios archivos, reorganiza las páginas a tu gusto y
          exporta el resultado como un único documento limpio.
        </p>

        <div className="flex items-center gap-3 mt-2">
          {/* <button className="flex items-center gap-2 bg-white text-black font-bold text-[0.78rem] tracking-wide px-5 py-2.5 rounded-lg hover:opacity-85 transition-opacity">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Subir PDF
          </button> */}
          <button className="font-mono text-[0.7rem] text-white-600 border border-zinc-800 px-4 py-2.5 rounded-lg hover:border-zinc-600 hover:text-zinc-400 transition-all tracking-wide">
            Ver instrucciones
          </button>
        </div>
      </div>

      {/* STEPS */}
      <div className="w-full max-w-3xl px-12 pb-12 grid grid-cols-3 border-t border-zinc-900 divide-x divide-zinc-900">
        {[
          { num: "01", title: "Sube tus archivos", desc: "Arrastra uno o varios PDFs al área de carga." },
          { num: "02", title: "Organiza las páginas", desc: "Reordena, elimina o agrupa páginas como prefieras." },
          { num: "03", title: "Exporta el resultado", desc: "Descarga el PDF final listo para usar." },
        ].map((s) => (
          <div key={s.num} className="px-6 pt-7 pb-2 flex flex-col gap-4">
            <span className="font-mono text-[0.6rem] text-white-700 tracking-widest">{s.num} —</span>
            <div className="font-bold text-[0.85rem] text-zinc-200">{s.title}</div>
            <div className="font-mono text-[0.66rem] text-white-600 leading-relaxed font-light">{s.desc}</div>
          </div>
        ))}
      </div>
    </>
  )
}