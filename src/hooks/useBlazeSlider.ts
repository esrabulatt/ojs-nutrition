import { useEffect, useRef } from 'react';
import BlazeSlider from 'blaze-slider';
import 'blaze-slider/dist/blaze.css';

export function useBlazeSlider(config?: any) {
  const sliderRef = useRef<BlazeSlider | null>(null);
  const sliderElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sliderElRef.current) return;

    const blazeSlider = new BlazeSlider(sliderElRef.current, config);
    sliderRef.current = blazeSlider;
    
    return () => {
      blazeSlider.destroy();
      sliderRef.current = null;
    };
  }, [config]);

  return { sliderElRef, sliderRef };
}
