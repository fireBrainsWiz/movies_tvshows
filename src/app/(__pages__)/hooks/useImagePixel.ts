import { useEffect, useRef } from "react";
import { ResultType, } from "@/app/lib/types";



export default function useImagePixel(
  { card, imageRef, setColor }: { 
    card: ResultType, 
    imageRef: {current: HTMLImageElement | null},
    setColor: (bg: string) => void 
  }) {
    let rgbColor = useRef('')
  
    //canvas
    useEffect(() => {
      var img = imageRef.current
      if (!img) return
  
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
  
      function pickPixel() {
        if (!ctx) return;
  
        ctx.drawImage(img!, 0, 0);
        canvas.style.display = "none";
  
        const pixel = ctx.getImageData(0, 0, 1, 1);
        const data = pixel.data;
  
          rgbColor.current = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
  
          setColor(rgbColor.current);
        return rgbColor;
      }
  
      img.addEventListener("load", pickPixel);
      return () => img!.removeEventListener("load", pickPixel)
  
    }, [
      card.backdrop_path, imageRef, setColor
    ])

    return rgbColor.current
}