import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export type LightboxImage = { src: string; caption: string };

/** Full-size image viewer on the native <dialog>: Esc, backdrop click or the button closes it. */
export default function Lightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (image && !d.open) d.showModal();
    if (!image && d.open) d.close();
  }, [image]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto max-w-[min(1400px,96vw)] max-h-[94vh] bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      {image && (
        <figure>
          <div className="flex justify-end mb-2">
            <button type="button" onClick={onClose} aria-label="Close image" className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold">
              close <X size={14} />
            </button>
          </div>
          <img src={image.src} alt={image.caption} className="block max-w-full max-h-[84vh] w-auto h-auto rounded-2xl" />
          <figcaption className="mt-3 text-sm text-white/90">{image.caption}</figcaption>
        </figure>
      )}
    </dialog>
  );
}
