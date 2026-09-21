export function PromoBanner() {
  return (
    <section className="relative w-full">
      <img
        src="/images/optimized/promobanner-crop.webp"
        alt="OJS Nutrition kampanya"
        width={2400}
        height={597}
        loading="lazy"
        decoding="async"
        className="block w-full h-auto"
      />
      <div className="absolute inset-y-0 left-[19.5%] flex items-center pointer-events-none">
        <p className="logo-font text-white font-black italic uppercase leading-[0.95] tracking-wide text-[clamp(1rem,2.55vw,2.6rem)]">
          <span className="block">OJS</span>
          <span className="block">NUTRITION</span>
        </p>
      </div>
    </section>
  );
}
