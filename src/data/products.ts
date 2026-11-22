import type { Product } from '../types/catalog';

export const products: Product[] = [
{
  id: 'keyboard',
  sku: 'TPD-0401',
  name: 'Keychron Q1 Max',
  maker: 'Keychron',
  category: 'home-office',
  price: 219,
  description:
  'Gasket-mounted aluminum 75% board with hot-swap switches, a volume knob, and wireless that hops between three machines.',
  image: "/a375ef20-faef-442d-b8b5-0e97bc3cc13d.jpg",
  buyUrl: 'https://www.keychron.com'
},
{
  id: 'keypad',
  sku: 'TPD-0501',
  name: 'Stream Deck +',
  maker: 'Elgato',
  category: 'home-office',
  price: 199.99,
  description:
  'Eight LCD keys, four dials, and a touch strip. Map builds, deploys, and your focus playlist to physical controls.',
  image: "/3d1980e8-f1ca-4a54-aed6-055a92d4600a.jpg",
  buyUrl: 'https://www.elgato.com'
},
{
  id: 'dock',
  sku: 'TPD-0502',
  name: 'CalDigit TS4 Dock',
  maker: 'CalDigit',
  category: 'home-office',
  price: 399.99,
  description:
  '18 ports over one Thunderbolt cable. Plug in once for two displays, 2.5GbE, and 98W of laptop charging.',
  image: "/648ba8ed-b07a-420b-8164-94c3775082e9.jpg",
  buyUrl: 'https://www.caldigit.com'
},
{
  id: 'lightbar',
  sku: 'TPD-0503',
  name: 'ScreenBar Halo',
  maker: 'BenQ',
  category: 'home-office',
  price: 179,
  description:
  'A clip-on monitor light that lights the desk, not your screen. Auto-dims with the room for late-night sessions.',
  image: "/fa1f10e8-e8c3-4826-b68e-2ca1e4d5a75b.jpg",
  buyUrl: 'https://www.benq.com'
},
{
  id: 'remarkable',
  sku: 'TPD-0601',
  name: 'reMarkable Paper Pro',
  maker: 'reMarkable',
  category: 'e-ink',
  price: 629,
  description:
  '11.8" color e-ink with a front light and a marker that feels like pencil on paper. Notes and PDFs, zero notifications.',
  image: "/cbf4f6f7-1e60-4c1b-980e-64ca341922a7.jpg",
  buyUrl: 'https://remarkable.com'
},
{
  id: 'boox',
  sku: 'TPD-0701',
  name: 'BOOX Palma 2',
  maker: 'Onyx BOOX',
  category: 'e-ink',
  price: 279.99,
  description:
  'A phone-sized Android e-reader. Kindle, RSS, and read-later apps in your pocket, without the doomscroll.',
  image: "/2c950bf6-984e-4dfd-95f0-8ac667e99312.jpg",
  buyUrl: 'https://shop.boox.com'
},
{
  id: 'trmnl',
  sku: 'TPD-0702',
  name: 'TRMNL',
  maker: 'TRMNL',
  category: 'e-ink',
  price: 139,
  description:
  'A hackable e-ink dashboard for your desk. Calendar, GitHub stats, weather — or write your own plugin.',
  image: "/fb9e1436-5978-474b-aa24-f4aaeb3b9001.jpg",
  buyUrl: 'https://usetrmnl.com'
},
{
  id: 'headphones',
  sku: 'TPD-0801',
  name: 'Sony WH-1000XM6',
  maker: 'Sony',
  category: 'tech',
  price: 449.99,
  description:
  'Class-leading noise canceling for open offices, flights, and focus blocks. 30 hours of battery between charges.',
  image: "/89965b7e-9d7f-4751-b09e-99f363b9883a.jpg",
  buyUrl: 'https://electronics.sony.com'
},
{
  id: 'hub',
  sku: 'TPD-0901',
  name: 'Home Assistant Green',
  maker: 'Nabu Casa',
  category: 'tech',
  price: 129,
  description:
  'Plug-and-play hub for the open-source smart home. Local control, no cloud lock-in, as much YAML as you like.',
  image: "/30271dab-5365-4f10-b322-8209131781dd.jpg",
  buyUrl: 'https://www.home-assistant.io/green'
},
{
  id: 'pixelclock',
  sku: 'TPD-0902',
  name: 'Ulanzi TC001 Pixel Clock',
  maker: 'Ulanzi',
  category: 'tech',
  price: 59.99,
  description:
  'A 32×8 pixel display you can flash with AWTRIX. Show CI status, notifications, or just a very charming clock.',
  image: "/c6cca513-69e0-440f-8e91-22a1169447ea.jpg",
  buyUrl: 'https://www.ulanzi.com'
},
{
  id: 'watch',
  sku: 'TPD-1001',
  name: 'Garmin Forerunner 970',
  maker: 'Garmin',
  category: 'fitness',
  price: 749.99,
  description:
  'AMOLED running watch with dual-band GPS, training readiness, and up to two weeks of battery on a charge.',
  image: "/e5aa8025-2183-4331-b4cf-01f86cf2cfcc.jpg",
  buyUrl: 'https://www.garmin.com'
},
{
  id: 'massager',
  sku: 'TPD-1101',
  name: 'Theragun Mini',
  maker: 'Therabody',
  category: 'wellness',
  price: 199,
  description:
  'A pocket-sized percussive massager for the shoulders your posture forgot about. Quiet enough for calls.',
  image: "/718efcf5-bff0-4864-a867-7a0f48c5ac51.jpg",
  buyUrl: 'https://www.therabody.com'
},
{
  id: 'bonsai',
  sku: 'TPD-1102',
  name: 'LEGO Bonsai Tree',
  maker: 'LEGO',
  category: 'wellness',
  price: 49.99,
  description:
  '878 pieces of calm. A Sunday-afternoon build that looks right at home next to your monitor.',
  image: "/569729a0-accb-47e4-8a33-049ec932ccb8.jpg",
  buyUrl: 'https://www.lego.com'
}];