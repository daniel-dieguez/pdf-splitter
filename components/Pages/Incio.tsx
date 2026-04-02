"use client";
import { useState } from "react";




export default function Inicio() {

const [visualizar, setVisualizar] = useState(0);

  return (
     <>
      {/* HEADER
      

      {/* HERO */}
      <div className="w-full max-w-3xl px-12 pt-20 pb-16 flex flex-col gap-6">
        

        <h2 className="font-black text-5xl tracking-tighter leading-[1.05] text-white">
          Divide, ordena<br />
          <span className="text-green-600">y unifica</span> tus PDFs
        </h2>

        <p className="font-mono text-[1rem] text-white-600 leading-relaxed max-w-md font-light">
          Sube uno o varios archivos, reorganiza las páginas a tu gusto y
          exporta el resultado como un único documento limpio.
        </p>

        <div className="flex items-center gap-3 mt-2">
         
          <button className="font-mono text-text-[1rem] text-white-600 border border-zinc-800 px-4 py-2.5 rounded-lg hover:border-zinc-600 hover:text-zinc-400 transition-all tracking-wide"
            onClick={() => setVisualizar(1)}>
            Ver instrucciones
          </button>
        </div>
      </div>

      {/* <Loading/> */}

      {/* STEPS */}
      {visualizar === 1 && (
        <div className="w-full max-w-3xl px-12 pb-12 grid grid-cols-3 border-t border-zinc-900 divide-x divide-zinc-900">
        {[
          { num: "01", title: "Sube tus archivos", desc: "Arrastra uno o varios PDFs al área de carga." },
          { num: "02", title: "Organiza las páginas", desc: "Reordena, elimina o agrupa páginas como prefieras." },
          { num: "03", title: "Exporta el resultado", desc: "Descarga el PDF final listo para usar." },
        ].map((s) => (
          <div key={s.num} className="px-6 pt-7 pb-2 flex flex-col gap-4">
            <span className="font-mono text-[1rem] text-white-700 tracking-widest">{s.num} —</span>
            <div className="font-bold text-[1rem] text-zinc-200">{s.title}</div>
            <div className="font-mono text-[1rem] text-white-600 leading-relaxed font-light">{s.desc}</div>
          </div>
        ))}
      </div>
      )}
      
    </>
  )
}