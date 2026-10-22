import sharp from 'sharp';

const img1 = '/Users/abhinavdubey/.gemini/antigravity/brain/4806800f-cb01-4866-b0ff-4d4f7600ffd4/.user_uploaded/media_1792592313248_7dabba37.png';

async function scanPortraitBorders() {
  const { data, info } = await sharp(img1).raw().toBuffer({ resolveWithObject: true });

  // Let's sample a slice across Justin Hammer's photo around y=600, x from 180 to 450
  // and Ivan Vanko's photo around y=600, x from 520 to 800
  console.log('Justin Hammer photo bounds search:');
  // Justin Hammer photo has a white background behind him, or grey suit.
  // The card has a green lattice pattern outside the photo!
  // The green pattern has strong green (r < 100, g > 120, b < 100).
  // The photo has white background around Justin's head (r > 200, g > 200, b > 200).
  // Let's find where the green pattern transitions to the photo frame!

  for (let y = 490; y <= 510; y += 5) {
    let rowTransitions = [];
    for (let x = 180; x <= 440; x++) {
      const idx = (y * info.width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // check if inside photo (near white or grey) vs green pattern
      const isGreen = g > 110 && g > r * 1.2 && g > b * 1.1;
      rowTransitions.push(isGreen ? 'G' : '.');
    }
    // find transition from G to . and . to G
    const s = rowTransitions.join('');
    const firstNonGreen = s.indexOf('.');
    const lastNonGreen = s.lastIndexOf('.');
    console.log(`y=${y}: left=${180 + firstNonGreen}, right=${180 + lastNonGreen}`);
  }

  // Also check top and bottom of Justin's photo around x=300
  console.log('Vertical scan for Justin at x=300:');
  for (let y = 470; y <= 730; y += 5) {
    const idx = (y * info.width + 300) * 4;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const isGreen = g > 110 && g > r * 1.2 && g > b * 1.1;
    console.log(`y=${y}: rgb(${r},${g},${b}) ${isGreen ? 'GREEN' : 'PHOTO/WHITE'}`);
  }
}

scanPortraitBorders();
