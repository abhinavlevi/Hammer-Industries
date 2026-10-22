import sharp from 'sharp';
import fs from 'fs';

const img1 = '/Users/abhinavdubey/.gemini/antigravity/brain/4806800f-cb01-4866-b0ff-4d4f7600ffd4/.user_uploaded/media_1792592313248_7dabba37.png';
const imgLogoBlackBg = '/Users/abhinavdubey/.gemini/antigravity/brain/4806800f-cb01-4866-b0ff-4d4f7600ffd4/.user_uploaded/media_1792592340967_e9cf7cb5.png';
const imgLogoWhiteBg = '/Users/abhinavdubey/.gemini/antigravity/brain/4806800f-cb01-4866-b0ff-4d4f7600ffd4/.user_uploaded/media_1792592345481_30b0872b.png';

async function run() {
  console.log('Inspecting metadata...');
  console.log(await sharp(img1).metadata());
  console.log(await sharp(imgLogoBlackBg).metadata());
  console.log(await sharp(imgLogoWhiteBg).metadata());
}

run();
