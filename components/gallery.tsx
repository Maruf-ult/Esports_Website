import { Reveal } from "@/components/reveal";
import { client } from "@/sanity/lib/client";
import { galleryImagesQuery } from "@/sanity/lib/queries";
import { GalleryCarousel } from "./gallery-carousel";

export async function Gallery() {
  let sanityImages: any[] = [];
  try {
    sanityImages = await client.fetch(galleryImagesQuery);
  } catch (error) {
    console.error("Failed to fetch gallery images from Sanity:", error);
  }

  return (
    <section id="gallery" className="scroll-mt-24 px-6 md:px-12 py-16 bg-arena-bg">
      <Reveal>
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="font-mono text-[10px] text-arena-muted tracking-[0.24em] mb-3">
            PHOTO REEL
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex items-center justify-center gap-2.5">
            <span className="text-arena-fg relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-arena-accent">
              EVENT
            </span>
            <span className="text-arena-accent">SHOWCASE</span>
          </h2>
        </div>
      </Reveal>

      <Reveal>
        <GalleryCarousel images={sanityImages} />
      </Reveal>
    </section>
  );
}
