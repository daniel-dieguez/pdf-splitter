import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortablePage = ({
  id,
  pdf,
  position
}: {
  id: string | number;
  pdf: { url: string; pageNumber: number };
  position: number;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-2 rounded shadow cursor-grab active:cursor-grabbing"
        >
            <iframe src={pdf.url} className="w-full h-40" />

            <p className="text-center text-sm mt-2 font-semibold text-gray-800">
                Página {pdf.pageNumber}
            </p>

            <p className="text-center text-xs text-gray-500">
                Posición {position}
            </p>
        </div>
    );
};