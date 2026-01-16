import React, { useEffect, useRef } from 'react';

const CanvasBrace = ({ paddingColor, strapColor, transferColor, isTransferPattern }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const layers = [
      { id: 'padding', url: '/assets/padding-mask.png', color: paddingColor, isPattern: false },
      { id: 'transfer', url: '/assets/transfer-mask.png', color: transferColor, isPattern: isTransferPattern },
      { id: 'strap', url: '/assets/strap-mask.png', color: strapColor, isPattern: false }
    ];

    const loadImage = (url) => new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
    });

    const renderAll = async () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const layer of layers) {
        const maskImg = await loadImage(layer.url);
        
        const outlineCanvas = document.createElement('canvas');
        outlineCanvas.width = 800;
        outlineCanvas.height = 800;
        const oCtx = outlineCanvas.getContext('2d');
        oCtx.drawImage(maskImg, 0, 0);
        oCtx.globalCompositeOperation = 'source-in';
        oCtx.fillStyle = '#CCCCCC';
        oCtx.fillRect(0, 0, 800, 800);

        const d = 0.75;
        ctx.drawImage(outlineCanvas, -d, 0);
        ctx.drawImage(outlineCanvas, d, 0);
        ctx.drawImage(outlineCanvas, 0, -d);
        ctx.drawImage(outlineCanvas, 0, d);

        const fillCanvas = document.createElement('canvas');
        fillCanvas.width = 800;
        fillCanvas.height = 800;
        const fCtx = fillCanvas.getContext('2d');

        if (layer.color === 'none') {
          fCtx.drawImage(maskImg, 0, 0);
          fCtx.globalCompositeOperation = 'source-in';
          fCtx.fillStyle = '#FFFFFF';
          fCtx.fillRect(0, 0, 800, 800);
        } else if (layer.isPattern) {
          const patternImg = await loadImage(layer.color);
          const pattern = fCtx.createPattern(patternImg, 'repeat');
          fCtx.drawImage(maskImg, 0, 0);
          fCtx.globalCompositeOperation = 'source-in';
          fCtx.fillStyle = pattern;
          fCtx.fillRect(0, 0, 800, 800);
        } else {
          fCtx.drawImage(maskImg, 0, 0);
          fCtx.globalCompositeOperation = 'source-in';
          fCtx.fillStyle = layer.color;
          fCtx.fillRect(0, 0, 800, 800);
        }

        ctx.drawImage(fillCanvas, 0, 0);
      }
    };

    renderAll();
  }, [paddingColor, strapColor, transferColor, isTransferPattern]);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={800} 
      style={{ width: '100%', height: 'auto', backgroundColor: '#ffffff' }} 
    />
  );
};

export default CanvasBrace;