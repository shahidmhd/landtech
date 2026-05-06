export const site = {
  brand: 'Landtech Real Estate',
  tagline: 'Luxury Properties & Vacation Homes',
  shortDescription:
    'Discover signature residences, beachfront villas, and investment-grade developments curated by Landtech.',
  phone: '+971 (0) 00 000 000',
  phoneHref: 'tel:+97100000000',
  email: 'hello@landtech.example',
  hours: 'Mon — Sat · 9 AM — 7 PM',
  social: {
    instagram: '#',
    linkedin: '#',
    youtube: '#',
  },
  home: {
    heroEyebrow: 'Landtech Real Estate',
    heroTitleBold: 'SIGNATURE',
    heroTitleThin: 'RESIDENCES',
    heroSubtitle:
      'From beachfront villas to investment-grade developments, every Landtech address is selected for design, location, and long-term value.',
    marquee: [
      'Dubai · Marina',
      'Beachfront',
      'Pre-launch',
      'Architecture-first',
      'Branded Residences',
      'Investment-grade',
    ],
    pillars: [
      {
        title: 'Locations of consequence',
        body: 'Beachfront, downtown core, and emerging districts — selected for long-term desirability.',
      },
      {
        title: 'Architecture-first',
        body: 'We partner with award-winning studios to deliver buildings with enduring design language.',
      },
      {
        title: 'Full-service advisory',
        body: 'From acquisition to handover, our advisors guide every step with discretion and clarity.',
      },
    ],
    stats: [
      { value: 12, suffix: '+', label: 'Signature developments' },
      { value: 450, label: 'Residences delivered' },
      {
        value: 2.4,
        decimals: 1,
        prefix: 'AED ',
        suffix: 'B+',
        label: 'Transaction value advised',
      },
    ],
  },
  about: {
    intro:
      'Landtech is a property advisory and development house specialising in signature residences and investment-grade developments across the region. Our work is guided by three principles: location of consequence, architecture-first development, and a full-service advisory relationship from acquisition through handover.',
    intro2:
      'Every project we pursue and every residence we represent has passed a deliberate filter — we’d rather decline a hundred listings than dilute the promise we make to our clients.',
  },
};

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};
