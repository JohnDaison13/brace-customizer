import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Grid, Stack, ButtonBase } from '@mui/material';

const CreationStudio = () => {
  const canvasRef = useRef(null);

  const [strapImg, setStrapImg] = useState('dafo2_strap_overlay.png');
  const [paddingImg, setPaddingImg] = useState('dafo2_padding_overlay.png');
  const [transferImg, setTransferImg] = useState(null);

  const baseFolder = '/OneDrive_2026_02_11/DAFO 2/';
  const paths = {
    straps: baseFolder + '1. Straps/',
    brace: baseFolder + '2. Brace/',
    padding: baseFolder + '3. Padding/',
    pickers: baseFolder + 'Picker Images/'
  };

  const transferMap = [
    { picker: 'picker-transfer-arcade.png', overlay: 'dafo2_brace_transfer_arcade.png' },
    { picker: 'picker-transfer-jolly-roger.png', overlay: 'dafo2_brace_transfer_jolly-roger.png' },
    { picker: 'picker-transfer-sporty-green.png', overlay: 'dafo2_brace_transfer_sporty-green.png' },
    { picker: 'picker-transfer-all-american.png', overlay: 'dafo2_brace_transfer_all-american.png' },
    { picker: 'picker-transfer-batman.png', overlay: 'dafo2_brace_transfer_batman.png' },
    { picker: 'picker-transfer-comic.png', overlay: 'dafo2_brace_transfer_comic.png' },
    { picker: 'picker-transfer-blue-zoom-&-go.png', overlay: 'dafo2_brace_transfer_blue-zoom-&-go.png' },
    { picker: 'picker-transfer-ice-age.png', overlay: 'dafo2_brace_transfer_ice-age.png' },
  ];

  const strapMap = [
    { picker: 'picker-strap-black.png', overlay: 'dafo2_strap_black.png' },
    { picker: 'picker-strap-green.png', overlay: 'dafo2_strap_green.png' },
    { picker: 'picker-strap-red.png', overlay: 'dafo2_strap_red.png' },
    { picker: 'picker-strap-white.png', overlay: 'dafo2_strap_white.png' },
    { picker: 'picker-strap-dark-blue.png', overlay: 'dafo2_strap_dark-blue.png' },
    { picker: 'picker-strap-purple.png', overlay: 'dafo2_strap_purple.png' },
    { picker: 'picker-strap-royal-blue.png', overlay: 'dafo2_strap_royal-blue.png' },
    { picker: 'picker-strap-pink.png', overlay: 'dafo2_strap_pink.png' },
  ];

  const paddingMap = [
    { picker: 'picker-pad-black.png', overlay: 'dafo2_padding_black.png' },
    { picker: 'picker-pad-light-blue.png', overlay: 'dafo2_padding_light-blue.png' },
    { picker: 'picker-pad-red.png', overlay: 'dafo2_padding_red.png' },
    { picker: 'picker-pad-white.png', overlay: 'dafo2_padding_white.png' },
    { picker: 'picker-pad-dark-blue.png', overlay: 'dafo2_padding_dark-blue.png' },
    { picker: 'picker-pad-pink.png', overlay: 'dafo2_padding_pink.png' },
    { picker: 'picker-pad-purple.png', overlay: 'dafo2_padding_purple.png' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const render = async () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const loadImage = (src) => new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => { console.error("Path Error: " + src); resolve(null); };
      });

      const drawLayer = (img, isColorSelected) => {
        if (!img) return;
        if (isColorSelected) {
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'; 
          ctx.shadowBlur = 2;
          const offset = 1;
          ctx.drawImage(img, -offset, -offset, canvas.width, canvas.height);
          ctx.drawImage(img, offset, offset, canvas.width, canvas.height);
          ctx.restore();
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      // 1. Base Brace
      const base = await loadImage(paths.brace + 'dafo2_brace_overlay.png');
      if (base) ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

      // 2. Padding
      const pad = await loadImage(paths.padding + paddingImg);
      drawLayer(pad, paddingImg && !paddingImg.includes('overlay'));

      // 3. Transfer
      if (transferImg) {
        const trans = await loadImage(paths.brace + transferImg);
        if (trans) ctx.drawImage(trans, 0, 0, canvas.width, canvas.height);
      }

      // 4. Straps
      const strap = await loadImage(paths.straps + strapImg);
      drawLayer(strap, strapImg && !strapImg.includes('overlay'));
    };

    render();
  }, [strapImg, paddingImg, transferImg, paths]);

  return (
    <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Creation Studio POC</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', justifyContent: 'center', bgcolor: 'white' }}>
            <canvas ref={canvasRef} width={800} height={800} style={{ width: '100%', height: 'auto' }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={4}>
            
            {/* Transfer Section */}
            <Box>
              <Typography variant="h6" fontWeight="bold">Transfer</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                <ButtonBase onClick={() => setTransferImg(null)} sx={{ width: 80, height: 57, border: '1px solid #ccc', bgcolor: '#eee' }}>NONE</ButtonBase>
                {transferMap.map((item) => (
                  <ButtonBase key={item.overlay} onClick={() => setTransferImg(item.overlay)} sx={{ border: transferImg === item.overlay ? '2px solid #1976d2' : '1px solid #ccc' }}>
                    <img src={paths.pickers + item.picker} width="80" alt="picker" />
                  </ButtonBase>
                ))}
              </Stack>
            </Box>

            {/* Strap Section */}
            <Box>
              <Typography variant="h6" fontWeight="bold">Straps</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                <ButtonBase onClick={() => setStrapImg('dafo2_strap_overlay.png')} sx={{ width: 80, height: 57, border: '1px solid #ccc', bgcolor: '#eee' }}>NONE</ButtonBase>
                {strapMap.map((item) => (
                  <ButtonBase key={item.overlay} onClick={() => setStrapImg(item.overlay)} sx={{ border: strapImg === item.overlay ? '2px solid #1976d2' : '1px solid #ccc' }}>
                    <img src={paths.pickers + item.picker} width="80" alt="picker" />
                  </ButtonBase>
                ))}
              </Stack>
            </Box>

            {/* Padding Section */}
            <Box>
              <Typography variant="h6" fontWeight="bold">Padding</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                <ButtonBase onClick={() => setPaddingImg('dafo2_padding_overlay.png')} sx={{ width: 80, height: 57, border: '1px solid #ccc', bgcolor: '#eee' }}>NONE</ButtonBase>
                {paddingMap.map((item) => (
                  <ButtonBase key={item.overlay} onClick={() => setPaddingImg(item.overlay)} sx={{ border: paddingImg === item.overlay ? '2px solid #1976d2' : '1px solid #ccc' }}>
                    <img src={paths.pickers + item.picker} width="80" alt="picker" />
                  </ButtonBase>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreationStudio;