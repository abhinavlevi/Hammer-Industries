import sharp from 'sharp';

async function extractLogos() {
  const imgBlackBg = '/Users/abhinavdubey/.gemini/antigravity/brain/4806800f-cb01-4866-b0ff-4d4f7600ffd4/.user_uploaded/media_1792592340967_e9cf7cb5.png';
  
  // Read raw pixels
  const { data, info } = await sharp(imgBlackBg).raw().toBuffer({ resolveWithObject: true });
  console.log('Channels:', info.channels, 'Width:', info.width, 'Height:', info.height);
  
  // The image has a black background and light logo.
  // In `media_1792592340967_e9cf7cb5.png`, the logo is light grey/white (around 200-240), background is near 0-10.
  // Let's create an alpha channel where luminance of pixels maps to alpha.
  // For logo_white: color = (255, 255, 255), alpha = normalized luminance with thresholding.
  // For logo_dark: color = (9, 30, 58), alpha = normalized luminance.
  
  const whiteData = Buffer.alloc(info.width * info.height * 4);
  const darkData = Buffer.alloc(info.width * info.height * 4);
  
  // Let's find min/max luminance in non-background
  let minLum = 255, maxLum = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum > 20) {
      if (lum < minLum) minLum = lum;
      if (lum > maxLum) maxLum = lum;
    }
  }
  console.log('Min lum (>20):', minLum, 'Max lum:', maxLum);

  // Smooth anti-aliased alpha thresholding
  for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    
    // Background is black (~0..15). Logo is ~180..240.
    let alpha = 0;
    if (lum <= 18) {
      alpha = 0;
    } else if (lum >= 120) {
      alpha = 255;
    } else {
      // Smooth interpolation for edges
      alpha = Math.round(((lum - 18) / (120 - 18)) * 255);
    }
    
    // Pure crisp white logo
    whiteData[j] = 255;
    whiteData[j+1] = 255;
    whiteData[j+2] = 255;
    whiteData[j+3] = alpha;

    // Dark navy logo #091E3A (rgb: 9, 30, 58)
    darkData[j] = 9;
    darkData[j+1] = 30;
    darkData[j+2] = 58;
    darkData[j+3] = alpha;
  }

  // Find bounding box so we don't clip anything and can add nice padding
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const a = whiteData[(y * info.width + x) * 4 + 3];
      if (a > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log('Bounding box:', { minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 });

  // Add 16px safety padding around the bounds
  const pad = 16;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(info.width - cropX, (maxX - minX + 1) + pad * 2);
  const cropH = Math.min(info.height - cropY, (maxY - minY + 1) + pad * 2);

  await sharp(whiteData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toFile('public/presets/logo_white.png');

  await sharp(darkData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toFile('public/presets/logo_dark.png');

  console.log('Successfully saved logo_white.png and logo_dark.png!');
}

extractLogos();
