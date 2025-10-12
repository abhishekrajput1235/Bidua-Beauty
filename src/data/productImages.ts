// Product image URLs
export const PRODUCT_IMAGES = [
  'https://raw.githubusercontent.com/obidua/Pods-assets/main/IMG_5549.png',
  'https://raw.githubusercontent.com/obidua/Pods-assets/main/IMG_5560.png',
  'https://raw.githubusercontent.com/obidua/Pods-assets/main/IMG_5561.png',
  'https://raw.githubusercontent.com/obidua/Pods-assets/main/IMG_5563.png'
];

export const PRODUCT_ALT_TEXT = 'LuxeGlow Premium Face Cream';


const b2bProducts = [
  {
    id: 'bidua-radiance-15',
    name: 'BIDUA Radiance 15 Cream',
    b2bPrice: 1150,
    mrp: 4999,
    minOrderQty: 10,
    image: PRODUCT_IMAGES[0],
    description: 'Premium skincare cream for dark spots, sun damage, and natural glow.',
  },
  {
    id: 'bidua-radiance-15-bundle',
    name: 'BIDUA Radiance 15 (Pack of 3)',
    b2bPrice: 2800,
    mrp: 14997, // 4999 * 3
    minOrderQty: 5,
    image: PRODUCT_IMAGES[1],
    description: 'Value pack of 3 BIDUA Radiance 15 creams for extended use.',
  },
  {
    id: 'bidua-radiance-15-pro',
    name: 'BIDUA Radiance 15 Pro (Large)',
    b2bPrice: 1800,
    mrp: 7999,
    minOrderQty: 8,
    image: PRODUCT_IMAGES[2],
    description: 'Larger size of BIDUA Radiance 15 for professional use.',
  },
];