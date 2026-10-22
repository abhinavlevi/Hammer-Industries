import sharp from 'sharp';

async function processAllPortraits() {
  const img1 = '/Users/abhinavdubey/.gemini/antigravity/brain/4806800f-cb01-4866-b0ff-4d4f7600ffd4/.user_uploaded/media_1792592313248_7dabba37.png';

  // 1. Justin Hammer
  // Clean crop from card
  await sharp(img1)
    .extract({ left: 220, top: 494, width: 178, height: 218 })
    .resize(400, 490, { fit: 'cover' })
    .png({ quality: 100 })
    .toFile('public/presets/justin_hammer.png');

  // 2. Ivan Vanko
  // Clean crop from card
  await sharp(img1)
    .extract({ left: 569, top: 504, width: 173, height: 218 })
    .resize(400, 490, { fit: 'cover' })
    .png({ quality: 100 })
    .toFile('public/presets/ivan_vanko.png');

  // 3. James Rhodes
  await sharp('public/presets/rhodes_raw.jpg')
    .resize(400, 490, { fit: 'cover', position: 'top' })
    .png({ quality: 100 })
    .toFile('public/presets/james_rhodes.png');

  console.log('All 3 character portraits saved successfully!');
}

processAllPortraits();
