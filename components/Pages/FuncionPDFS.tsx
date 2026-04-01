"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
// import {Loadings} from "../utils/Loading";

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
};

export default function FunctionPDFS() {
  const [pages, setPages] = useState<PageType[]>([]);
  const [originalPdfBytes, setOriginalPdfBytes] = useState<ArrayBuffer | null>(null);

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

  //
  const handleLoadPDF = async (file: File) => {
    // 
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
        originalIndex: i
      });
    }

    setPages(newPages);
  };

  // 
  const handleDownloadPDF = async () => {
    if (!originalPdfBytes) return;

    const pdfDoc = await PDFDocument.load(originalPdfBytes);
    const newPdf = await PDFDocument.create();

    for (const page of pages) {
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [
        page.originalIndex
      ]);
      newPdf.addPage(copiedPage);
    }

    const pdfBytes = await newPdf.save();

    const blob = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "PDF_ordenado.pdf";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">


      <label className="mb-4 inline-block px-4 py-2 bg-green-600 text-white rounded cursor-pointer">
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
              <SortablePage
                key={pdf.id}
                id={pdf.id}
                pdf={pdf}
                position={index + 1}

              />

            ))}

          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}