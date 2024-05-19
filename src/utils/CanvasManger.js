import { template } from "./template";
//import img  from '../assets/images/pexels-chevanon-324028.jpg'

class CanvasManager {
  constructor(canvas, template ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.template = template;
   
   
  }

  drawCanvas() {
  
     this.clearCanvas();    
     this.drawBackground();
     this.drawDesignPattern();
     this.drawImageMask();
     this.drawMaskStroke();
     this.drawCaption();
     this.drawCTA();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.ctx.fillStyle = '#0369A1';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'source-over'
   
  }

  drawDesignPattern() {
    const img = new Image();
   
    img.onload = () => {
     
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalCompositeOperation = 'source-over' 
      
    };
    img.src = template.urls.design_pattern
   
  }

  drawImageMask() {
        
    const img = new Image();

    const userImg = new Image(); 

    const imgPromise = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const userImgPromise = new Promise((resolve, reject) => {
      userImg.onload = resolve;
      userImg.onerror = reject;
    });

    img.src = template.urls.mask
    userImg.src = template.urls.mask2  

    Promise.all([imgPromise, userImgPromise])
    .then(() => {
     
      this.ctx.drawImage(img, 0, 0);

     
      this.ctx.globalCompositeOperation = 'source-over';

      
      this.ctx.drawImage(userImg, 56, 442, 970, 600);

     
      this.ctx.globalCompositeOperation = 'source-over';
    })
    .catch((error) => {
      console.error('Error loading images', error);
    })
      
   
   
     
  }

  drawMaskStroke() {
    const strokeImg = new Image();
    
    strokeImg.onload = () => {
      this.ctx.drawImage(strokeImg, 0,0 );
      this.ctx.globalCompositeOperation = 'source-over'
     
    };

    strokeImg.src = template.urls.stroke
  }
  

 

  drawCaption() {
        
        
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '44px Arial'
    this.ctx.textAlign = 'left';
    
    const lines = this.wrapText("1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs", 31);


    lines.forEach((line, index) => {
      this.ctx.fillText(line, 50, 50 + index * 44);
    });   
           
  } 
  

  wrapText(text, maxCharactersPerLine) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= maxCharactersPerLine) {
        currentLine += word + ' ';
      } else {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      }
    });

    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines;
    

  }

  drawCTA() {

  // draw rounded reactangle 
   this.ctx.fillStyle = "#000000";
   this.ctx.beginPath();
   this.ctx.roundRect(100, 280, 180, 78 ,[10]);
   this.ctx.fill();
 
   this.ctx.globalCompositeOperation = 'source-over' 

    this.ctx.fillStyle = "#000000"
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '30px Arial'
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText("Shop Now", 190, 320)
  }


}


export default CanvasManager;
