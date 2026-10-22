import sharp from 'sharp';

const img1 = '/Users/abhinavdubey/.gemini/antigravity/brain/4806800f-cb01-4866-b0ff-4d4f7600ffd4/.user_uploaded/media_1792592313248_7dabba37.png';

async function cropRefined() {
  // Justin Hammer:
  // Let's inspect bottom of Justin's photo around y=715
  // The nameplate is white with black text "JUSTIN HAMMER"
  // Let's crop Justin's photo from y=495 down to y=715 (or where the suit ends)
  await sharp(img1)
    .extract({ left: 220, top: 495, width: 178, height: 218 })
    .resize(400, 490, { fit: 'cover' })
    .png()
    .toFile('public/presets/justin_hammer.png');

  // Ivan Vanko:
  await sharp(img1)
    .extract({ left: 569, top: 504, width: 173, height: 218 })
    .resize(400, 490, { fit: 'cover' })
    .png()
    .toFile('public/presets/ivan_vanko.png');

  console.log('Saved refined justin_hammer.png and ivan_vanko.png');
}

cropRefined();
