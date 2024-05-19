import { useEffect, useRef, } from "react"
import CanvasManager from "../utils/CanvasManger";

const Canvasfeature = () => {
 
  const canvasRef = useRef(null);
  
  useEffect(() => {
   
    const canvas = canvasRef.current;
   
    const canvasManager = new CanvasManager(canvas );
    canvasManager.drawCanvas();
  }, []);

      
  return (
    <div>

     <canvas ref={canvasRef} width='1080px' height='1080px'> </canvas>
    
    </div>
  )
}

export default Canvasfeature