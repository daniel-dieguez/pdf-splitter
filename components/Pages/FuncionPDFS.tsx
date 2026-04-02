"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";

import { Loading } from "../utils/Loading";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy
} from "@dnd-kit/sortable";

import { SortablePage } from "../utils/SortablePage";

type PageType = {
  id: string | number;
  url: string;
  pageNumber: number;
  originalIndex: number;
  sourceBuffer: ArrayBuffer;

};

export default function FunctionPDFS() {
  const [pages, setPages] = useState<PageType[]>([]);
  const [originalPdfBytes, setOriginalPdfBytes] = useState<ArrayBuffer | null>(null);
  const [pdfFiles, setPdfFiles] = useState<ArrayBuffer[]>([]);

  const pdfBuffersRef = useRef<Map<string | number, ArrayBuffer>>(new Map());

  //cargando
  const [loading, setLoading] = useState(false);

  // para cuando le doy click
  const [activeUpload, setActiveUpload] = useState(false);

  //contar cuantas hojas hay
  const totalPages = pages.length;


  // 
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setPages((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // este es para el primer grupo
  const handleLoadPDF = async (file: File) => {

    setLoading(true);

    try {
      pages.forEach(p => URL.revokeObjectURL(p.url));

      const arrayBuffer = await file.arrayBuffer();
      setOriginalPdfBytes(arrayBuffer);

      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      const newPages: PageType[] = [];

      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();

        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);

        const pdfBytes = await newPdf.save();

        const blob = new Blob([new Uint8Array(pdfBytes)], {
          type: "application/pdf"
        });

        const url = URL.createObjectURL(blob);

        newPages.push({
          id: i + 1,
          url,
          pageNumber: i + 1,
          originalIndex: i,
          sourceBuffer: arrayBuffer
        });
      }

      setPages(newPages);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    // 

  };

  //para poder agregar mas pdfs
  const handleAddMorePDF = async (file: File) => {
    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();

      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      const newPages: PageType[] = [];

      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();

        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);

        const pdfBytes = await newPdf.save();

        const blob = new Blob([new Uint8Array(pdfBytes)], {
          type: "application/pdf"
        });

        const url = URL.createObjectURL(blob);

        newPages.push({
          id: Date.now() + i,
          url,
          pageNumber: pages.length + i + 1,
          originalIndex: i,
          sourceBuffer: arrayBuffer
        });
      }


      setPages(prev => [...prev, ...newPages]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 
  const handleDownloadPDF = async () => {

    setLoading(true);

    try {
      if (pages.length === 0) return;

      const newPdf = await PDFDocument.create();

      for (const page of pages) {
        // Carga el PDF fuente de esa página específica
        const sourcePdf = await PDFDocument.load(page.sourceBuffer);
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [page.originalIndex]);
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "PDF_ordenado.pdf";
      a.click();

      URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }


  };

  //Eliminar documentos
  const handleDeletePage = (id: number | string) => {
    setPages((prev) => {
      const pageToDelete = prev.find(p => p.id === id);


      if (pageToDelete) {
        URL.revokeObjectURL(pageToDelete.url);
      }


      return prev.filter(p => p.id !== id);
    });
  };

  return (
    <div className="p-4">


      <label onClick={() => setActiveUpload(true)}
        className={`mb-4 inline-block px-4 py-2 rounded cursor-pointer text-white
    ${loading ? "bg-green-600 opacity-50 cursor-not-allowed" : "bg-green-600"}
  `}>
        Subir PDF
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleLoadPDF(file);
          }}
          className="hidden"
        />
      </label>


      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
      {pages.length > 0 && (

        <label className="ml-4 px-4 py-2 bg-yellow-600 text-white rounded cursor-pointer">
          Agregar PDF
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;

              Array.from(files).forEach(file => handleAddMorePDF(file)); //PERMITIREMOS MULTIPLES PDFS
            }}
            className="hidden"
          />
        </label>

      )}

      {pages.length > 0 && (

        <button
          onClick={handleDownloadPDF}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Descargar PDF
        </button>

      )}


      {pages.length > 0 && (
        <button onClick={() => {
          setPages([]);
          setOriginalPdfBytes(null);

        }}
          className="ml-4 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded">
          Limpiar
        </button>
      )}

      <p>Total de páginas: {pages.length || "0"}</p>








      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={pages.map(p => p.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
            {pages.map((pdf, index) => (
              <div key={pdf.id} className="flex flex-col items-center">
                <SortablePage
                  key={pdf.id}
                  id={pdf.id}
                  pdf={pdf}
                  position={index + 1}
                  onDelete={handleDeletePage}

                />
                <button
                  onClick={() => {
                    handleDeletePage(pdf.id)
                    console.log("aqui bro")
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>

              </div>



            ))}

          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}