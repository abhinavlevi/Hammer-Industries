import sharp from 'sharp';

const img1 = '/Users/abhinavdubey/.gemini/antigravity/brain/4806800f-cb01-4866-b0ff-4d4f7600ffd4/.user_uploaded/media_1792592313248_7dabba37.png';

async function scan() {
  const { data, info } = await sharp(img1).raw().toBuffer({ resolveWithObject: true });

  // Let's inspect row y=550 across all X
  console.log('Justin Hammer at y=550:');
  for (let x = 200; x <= 410; x += 5) {
    const idx = (550 * info.width + x) * 4;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const isGreen = g > 100 && g > r * 1.15 && g > b * 1.1;
    if (isGreen) {
      process.stdout.write(`G(${x}) `);
    } else {
      process.stdout.write(`. `);
    }
  }
  console.log('\n');

  // Let's do the same for Ivan Vanko at y=550
  console.log('Ivan Vanko at y=550:');
  for (let x = 550; x <= 760; x += 5) {
    const idx = (550 * info.width + x) * 4;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const isGreen = g > 100 && g > r * 1.15 && g > b * 1.1;
    if (isGreen) {
      process.stdout.write(`G(${x}) `);
    } else {
      process.stdout.write(`. `);
    }
  }
  console.log('\n');
}

scan();
