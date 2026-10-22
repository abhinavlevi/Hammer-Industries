import sharp from 'sharp';

const img1 = '/Users/abhinavdubey/.gemini/antigravity/brain/4806800f-cb01-4866-b0ff-4d4f7600ffd4/.user_uploaded/media_1792592313248_7dabba37.png';

async function findPortraits() {
  const metadata = await sharp(img1).metadata();
  console.log('Size:', metadata.width, metadata.height);

  // Left badge Justin Hammer:
  // Around x: 210 to 400, y: 490 to 715
  // Right badge Ivan Vanko:
  // Around x: 565 to 745, y: 500 to 720
  // Let's extract candidate crops and inspect dimensions
  
  await sharp(img1)
    .extract({ left: 215, top: 495, width: 180, height: 220 })
    .toFile('public/presets/justin_hammer_test.png');

  await sharp(img1)
    .extract({ left: 568, top: 502, width: 175, height: 220 })
    .toFile('public/presets/ivan_vanko_test.png');

  console.log('Saved test portraits');
}

findPortraits();
