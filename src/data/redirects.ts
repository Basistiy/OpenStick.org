export interface RedirectLink {
  slug: string;
  target: string;
  title: string;
  device: string;
  platform: string;
  silkscreen: string;
}

export const redirectLinks: Record<string, RedirectLink> = {
  'uz801-aliexpress-1': {
    slug: 'uz801-aliexpress-1',
    target: 'https://www.aliexpress.com/item/1005012883269576.html',
    title: 'UZ801 4G LTE USB Modem Dongle (Store 1)',
    device: 'UZ801',
    platform: 'AliExpress',
    silkscreen: 'UZ801_V3.31',
  },
  'uz801-aliexpress-2': {
    slug: 'uz801-aliexpress-2',
    target: 'https://www.aliexpress.com/item/1005012985657609.html',
    title: 'UZ801 4G LTE USB Wireless Modem (Store 2)',
    device: 'UZ801',
    platform: 'AliExpress',
    silkscreen: 'UZ801_V3.31',
  },
  'uz801-aliexpress-3': {
    slug: 'uz801-aliexpress-3',
    target: 'https://www.aliexpress.com/item/1005010169664336.html',
    title: 'UZ801 4G Wi-Fi Router USB Dongle (Store 3)',
    device: 'UZ801',
    platform: 'AliExpress',
    silkscreen: 'UZ801_V3.31',
  },
  'uz801-aliexpress-4': {
    slug: 'uz801-aliexpress-4',
    target: 'https://www.aliexpress.com/item/1005012620163075.html',
    title: 'UZ801 4G LTE USB Modem Dongle (Store 4)',
    device: 'UZ801',
    platform: 'AliExpress',
    silkscreen: 'FY_UZ801_3.31',
  },
  'uz801-allegro': {
    slug: 'uz801-allegro',
    target: 'https://allegro.pl/oferta/modem-4g-lte-usb-wifi-na-karte-sim-domowy-router-odu-mobilny-mocny-szybki-18259575322',
    title: 'Modem 4G LTE USB Wi-Fi SIM (Allegro)',
    device: 'UZ801',
    platform: 'Allegro',
    silkscreen: 'UZ801_V3.0',
  },
  'hm-mifib-aliexpress-1': {
    slug: 'hm-mifib-aliexpress-1',
    target: 'https://www.aliexpress.com/item/1005012976155217.html',
    title: 'HM-MIFIB 4G WiFi Router with Display (AliExpress - Store 1)',
    device: 'HM-MIFIB',
    platform: 'AliExpress',
    silkscreen: 'Not Checked (M9S option)',
  },
  'hm-mifib-allegro': {
    slug: 'hm-mifib-allegro',
    target: 'https://allegro.pl/oferta/kieszonkowy-4g-wifi-mobilny-router-wi-fi-podrozny-hotspot-wifi-router-18100376161?utm_medium=afiliacja&utm_source=ctr_2&utm_campaign=fa0b0be0-b5e4-4e68-90d8-05c146d25a14&utm_content=1aea65e2640b#',
    title: 'Kieszonkowy 4G WiFi Mobilny Router (Allegro)',
    device: 'HM-MIFIB',
    platform: 'Allegro',
    silkscreen: 'HM-MIFIB_V18',
  },
  'hm-mifib-amazon-1': {
    slug: 'hm-mifib-amazon-1',
    target: 'https://www.amazon.co.uk/dp/B0HHDFHBY7',
    title: 'MF800 4G MiFi Router (2100mAh) (Amazon UK)',
    device: 'HM-MIFIB',
    platform: 'Amazon UK',
    silkscreen: 'HM-MIFIB_V18',
  },
  'hm-mifib-amazon-2': {
    slug: 'hm-mifib-amazon-2',
    target: 'https://www.amazon.co.uk/dp/B0FRYFHHBP',
    title: 'MF800 4G MiFi Router (3000mAh) (Amazon UK)',
    device: 'HM-MIFIB',
    platform: 'Amazon UK',
    silkscreen: 'HM-MIFIB_V18',
  },
  'ufi103s-aliexpress-1': {
    slug: 'ufi103s-aliexpress-1',
    target: 'https://www.aliexpress.com/item/1005013394150002.html',
    title: 'UFI103S 4G LTE USB Modem Dongle (AliExpress)',
    device: 'UFI103S',
    platform: 'AliExpress',
    silkscreen: 'UFI103S_V03',
  },
  'ufi003-amazon-1': {
    slug: 'ufi003-amazon-1',
    target: 'https://www.amazon.co.uk/dp/B0HD83G6YH',
    title: 'UF003 4G LTE USB Modem Dongle (Amazon UK)',
    device: 'UFI003',
    platform: 'Amazon UK',
    silkscreen: 'UF003S_V05 / UFI003',
  },
  'dongle-amazon-1': {
    slug: 'dongle-amazon-1',
    target: 'https://www.amazon.co.uk/dp/B0FMXZ94SD',
    title: '4G LTE USB Modem Dongle (Amazon UK)',
    device: 'Generic MSM8916',
    platform: 'Amazon UK',
    silkscreen: 'MSM8916',
  },
  'hmuf02-ozon-1': {
    slug: 'hmuf02-ozon-1',
    target: 'https://www.ozon.ru/product/4824120918',
    title: 'HMUF02-V05 4G LTE USB Modem U96-3 (Ozon)',
    device: 'HMUF02',
    platform: 'Ozon',
    silkscreen: 'HMUF02-V05',
  },
  'hmuf02-ozon-2': {
    slug: 'hmuf02-ozon-2',
    target: 'https://www.ozon.ru/product/4824119648',
    title: 'HMUF02-V05 4G LTE USB Modem Black (Ozon)',
    device: 'HMUF02',
    platform: 'Ozon',
    silkscreen: 'HMUF02-V05',
  },
  'uz801-ozon-1': {
    slug: 'uz801-ozon-1',
    target: 'https://www.ozon.ru/product/1694186266',
    title: 'UZ801 / UFI001C 4G LTE USB Modem (Ozon)',
    device: 'UZ801',
    platform: 'Ozon',
    silkscreen: 'UZ801 / UFI001C_MB_V01',
  },
};
