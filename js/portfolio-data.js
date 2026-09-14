window.PortfolioData = {
  filters: [
    { id: 'all', label: 'All Work' },
    { id: 'packaging', label: 'Packaging' },
    { id: 'branding', label: 'Branding' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'digital', label: 'Digital' }
  ],

  projects: {
    ameriserv: {
      kicker: 'Brand Identity · Web Design · Brand Guidelines',
      title: 'AmeriServ Rebrand',
      intro: 'A complete identity system for a local print and promotional company, spanning strategy, logo development, print applications, brand guidelines, and a responsive website.',
      meta: ['Client: AmeriServ Printers', 'Year: 2026', 'Role: Identity, Web, Guidelines, Print'],
      sections: [
        {
          title: 'The Objective',
          copy: 'Reposition a small-town print and promotional company to compete visually with larger providers while preserving the trust and personality of a local business. The goal was to create a cohesive system that could scale across print, web, and promotional products.'
        },
        {
          title: 'Strategy & Approach',
          copy: 'Developed a unified identity system centered around a bold, recognizable mark and a modern Americana-inspired palette. Extended the system into a responsive website and structured brand guidelines to ensure consistency across customer-facing materials, sales tools, and production outputs.'
        },
        {
          title: 'Impact',
          copy: 'Delivered a cohesive brand system that improved visual consistency, strengthened market positioning, and created a more professional foundation for sales, marketing, and future growth. The system was designed to be practical, scalable, and production-ready across all applications.'
        }
      ],
      images: [
        { src: 'images/display/ameriserv-old-new.jpg', alt: 'Old and new AmeriServ logo comparison', layout: 'full' },
        { src: 'images/display/ameriserv-logo-h.jpg', alt: 'AmeriServ horizontal logo lockup', layout: 'wide' },
        { src: 'images/display/ameriserv-logo-v.jpg', alt: 'AmeriServ vertical logo lockup', layout: 'portrait' },
        { src: 'images/display/ameriserv-bc-mockup.jpg', alt: 'AmeriServ business card mockup', layout: 'full' },
        { src: 'images/display/ameriserv-newsite.jpg', alt: 'AmeriServ website design', layout: 'large', caption: 'Responsive website designed to carry the new identity into a customer-facing digital experience.' },
        { src: 'images/display/ameriserv-guidelines.jpg', alt: 'AmeriServ brand guidelines', layout: 'large', caption: 'Structured brand guidelines for practical, production-ready use.' },
        { src: 'images/display/ameriserv-bc-front.jpg', alt: 'AmeriServ business card front', layout: 'half' },
        { src: 'images/display/ameriserv-bc-back.jpg', alt: 'AmeriServ business card back', layout: 'half' }
      ]
    },

    goatwood: {
      kicker: 'Packaging · Retail Graphics · Display',
      title: 'Goatwood Firewood',
      intro: 'Bold packaging, retail signage, and promotional graphics for an all-American firewood brand built to hold up in real retail environments.',
      meta: ['Client: Goatwood', 'Discipline: Packaging, Signage, Product Graphics', 'Focus: Shelf impact and production-ready graphics'],
      sections: [
        {
          title: 'The Objective',
          copy: 'Create high-impact retail graphics and packaging that could stand out in competitive environments while clearly communicating product benefits at a glance.'
        },
        {
          title: 'Strategy & Approach',
          copy: 'Focused on bold contrast, oversized typography, and strong visual hierarchy to maximize visibility in real-world retail conditions. Designed a flexible system that could extend across packaging, signage, and promotional materials.'
        },
        {
          title: 'Production',
          copy: 'Artwork was built for corrugated, labels, and large-format display — with print-ready contrast, clear hierarchy, and production considerations baked into the design rather than added later.'
        }
      ],
      images: [
        { src: 'images/display/gw-firewood-sign.jpg', alt: 'Goatwood firewood sign artwork', layout: 'full' },
        { src: 'images/display/gw-commercial.jpg', alt: 'Goatwood commercial sign in a real-world setting', layout: 'large' },
        { src: 'images/display/gw-label.jpg', alt: 'Goatwood 1lb fire-starter label', layout: 'portrait' },
        { src: 'images/display/gw-fancy-box.jpg', alt: 'Goatwood premium box packaging', layout: 'large' },
        { src: 'images/display/gw-kraft-box.jpg', alt: 'Goatwood kraft box packaging', layout: 'half' },
        { src: 'images/display/gw-fatwood.jpg', alt: 'Goatwood BBQ product promotional graphic', layout: 'portrait' },
        { src: 'images/display/gw-commercial-art.jpg', alt: 'Goatwood commercial sign artwork', layout: 'half' },
        { src: 'images/display/gw-rack.jpg', alt: 'Goatwood retail firewood rack concept', layout: 'full' }
      ]
    },

    earlybird: {
      kicker: 'Packaging · Corrugated · Prepress',
      title: 'Early Bird',
      intro: 'Corrugated packaging for Cannon Distillery’s cold brew coffee vodka — illustrative, structural, and built for the shelf.',
      meta: ['Client: Cannon Distillery', 'Discipline: Packaging Graphics', 'Format: Corrugated retail carton'],
      sections: [],
      images: [
        { src: 'images/display/early-bird-box.jpg', alt: 'Early Bird packaging box design', layout: 'full' },
        { src: 'images/display/signal-point-box.jpg', alt: 'Related Cannon Distillery packaging: Signal Point vodka', layout: 'large', caption: 'Related distillery packaging from the same body of retail work.' }
      ]
    },

    signalpoint: {
      kicker: 'Packaging · Corrugated · Illustration',
      title: 'Signal Point',
      intro: 'Retail carton design for Cannon Distillery vodka, built around a lighthouse illustration and strong shelf-read typography.',
      meta: ['Client: Cannon Distillery', 'Discipline: Packaging Graphics', 'Format: Corrugated retail carton'],
      sections: [],
      images: [
        { src: 'images/display/signal-point-box.jpg', alt: 'Signal Point vodka box packaging', layout: 'full' },
        { src: 'images/display/early-bird-box.jpg', alt: 'Related Cannon Distillery packaging: Early Bird', layout: 'large' }
      ]
    },

    mattress: {
      kicker: 'Packaging · Corrugated · Production',
      title: 'HygroCotton Cuddlebed',
      intro: 'Retail packaging for Martha Stewart HygroCotton Cuddlebed — structure, die-cut window, and production-ready corrugated graphics.',
      meta: ['Brand: Martha Stewart', 'Discipline: Packaging & Production Design', 'Format: Corrugated retail carton'],
      sections: [],
      images: [
        { src: 'images/display/mattress-box.jpg', alt: 'Martha Stewart HygroCotton Cuddlebed packaging', layout: 'full' }
      ]
    },

    herbies: {
      kicker: 'Packaging · POP Display · Retail',
      title: 'Herbie’s Fireworks',
      intro: 'Display-ready packaging and point-of-purchase graphics for Herbie’s Fireworks American Celebration.',
      meta: ['Client: Herbie’s Fireworks', 'Discipline: POP & Retail Packaging', 'Format: Display carton'],
      sections: [],
      images: [
        { src: 'images/display/herbies-box.jpg', alt: 'Herbie’s Fireworks retail display box', layout: 'full' }
      ]
    },

    holiday: {
      kicker: 'Packaging · Corrugated · Seasonal',
      title: 'Hampton Acres Holiday Box',
      intro: 'Seasonal corrugated packaging with windowed structure and farm-to-table holiday graphics.',
      meta: ['Client: Hampton Acres', 'Discipline: Packaging Graphics', 'Format: Windowed corrugated carton'],
      sections: [],
      images: [
        { src: 'images/display/ha-holiday-box.jpg', alt: 'Hampton Acres holiday box packaging', layout: 'full' }
      ]
    },

    branding: {
      kicker: 'Branding · Logos',
      title: 'Marks & Identity',
      intro: 'A focused selection of identity systems and marks designed for sports, service, hospitality, and community organizations.',
      meta: ['Identity Systems', 'Logo Design', 'Brand Application'],
      sections: [],
      images: [
        { src: 'images/display/carolina-chaos.jpg', alt: 'Carolina Chaos branding and apparel concept', layout: 'full' },
        { src: 'images/display/ce-logo.jpg', alt: 'Carolina Elite logo and hat mockup', layout: 'half' },
        { src: 'images/display/pgs-logo.jpg', alt: 'Pawleys Island Guide Service logo', layout: 'half' },
        { src: 'images/display/pp-logo.jpg', alt: 'Palmetto Punishers logo', layout: 'half' },
        { src: 'images/display/randr-logo.jpg', alt: 'Rhythm & Q’s event branding', layout: 'half' },
        { src: 'images/display/st-peters.jpg', alt: 'St. Peter’s Anglican Church logo concepts', layout: 'half' },
        { src: 'images/display/turbine.jpg', alt: 'Fleet Turbine Services logo', layout: 'half' },
        { src: 'images/display/urgent-care-logo.jpg', alt: 'Hometown Urgent Care identity', layout: 'half' }
      ]
    },

    apparel: {
      kicker: 'Apparel · Screen Print · Identity',
      title: 'Apparel Graphics',
      intro: 'Apparel graphics and merchandising design for teams, events, and institutions — built for print, not just presentation.',
      meta: ['Apparel Graphics', 'Identity Application', 'Production Art'],
      sections: [],
      images: [
        { src: 'images/display/carolina-chaos.jpg', alt: 'Carolina Chaos jersey application', layout: 'full' },
        { src: 'images/display/als-shirt.jpg', alt: 'ALS Walk shirt design', layout: 'large' },
        { src: 'images/display/coker-shirt.jpg', alt: 'Coker Singers choir tour shirt', layout: 'half' },
        { src: 'images/display/sc-allstar-shirt.jpg', alt: 'South Carolina All-Stars shirt design', layout: 'half' },
        { src: 'images/display/pma-shirt.jpg', alt: 'PMA shirt design', layout: 'half' }
      ]
    },

    web: {
      kicker: 'Web Design · Interface',
      title: 'Web Design',
      intro: 'Responsive websites and visual interface work created for local businesses, community projects, and internal company needs.',
      meta: ['Responsive Design', 'UI Layout', 'Marketing Sites'],
      sections: [],
      images: [
        { src: 'images/display/pph-site.jpg', alt: 'Palmetto Playhouse website', layout: 'full', caption: 'Booking-focused website with a clear structure for parents, events, and future growth.', featured: true },
        { src: 'images/display/southern-asphalt.jpg', alt: 'Southern Asphalt website', layout: 'large', caption: 'Brand-forward website layout created to communicate services clearly and quickly.' },
        { src: 'images/display/spc-site.jpg', alt: 'Sumter Packaging website', layout: 'half', caption: 'Corporate website redesign focused on clearer structure and a stronger digital presence.' },
        { src: 'images/display/sunpak-site.jpg', alt: 'SunPak website', layout: 'half', caption: 'Packaging company website designed for clean presentation and customer-facing clarity.' },
        { src: 'images/display/cms-site.jpg', alt: 'Internal CMS', layout: 'half', caption: 'Custom internal system design focused on making content and workflow easier to navigate.' },
        { src: 'images/display/ameriserv-newsite.jpg', alt: 'AmeriServ website', layout: 'large', caption: 'Digital expression of the AmeriServ rebrand.' }
      ]
    }
  },

  workLayout: [
    {
          id: 'r-ameriserv-hero',
          rhythm: 'hero',
          align: 'end',
          items: [
            {
              id: 'ameriserv-rebrand',
              project: 'ameriserv',
              title: 'AmeriServ Rebrand',
              disciplines: ['Brand Identity', 'Web Design', 'Guidelines'],
              image: 'images/display/ameriserv-old-new.jpg',
              alt: 'AmeriServ logo comparison from 2002 to 2026',
              categories: ['branding', 'digital'],
              aspect: '1800 / 1023',
              fit: 'contain',
              tone: 'paper',
              span: 12,
              featured: true,
              width: 1800,
              height: 1023
            }
          ]
        },
    {
          id: 'r-cannon',
          rhythm: 'pair',
          align: 'end',
          items: [
            {
              id: 'early-bird',
              project: 'earlybird',
              title: 'Early Bird',
              disciplines: ['Packaging', 'Corrugated', 'Prepress'],
              image: 'images/display/early-bird-box.jpg',
              alt: 'Early Bird cold brew vodka corrugated packaging',
              categories: ['packaging'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 7,
              featured: true,
              width: 1200,
              height: 675
            },
            {
              id: 'signal-point',
              project: 'signalpoint',
              title: 'Signal Point',
              disciplines: ['Packaging', 'Corrugated'],
              image: 'images/display/signal-point-box.jpg',
              alt: 'Signal Point vodka box packaging',
              categories: ['packaging'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 5,
              featured: true,
              width: 1200,
              height: 675
            }
          ]
        },
    {
          id: 'r-mattress',
          rhythm: 'chapter',
          align: 'end',
          items: [
            {
              id: 'mattress',
              project: 'mattress',
              title: 'HygroCotton Cuddlebed',
              disciplines: ['Packaging', 'Corrugated', 'Production'],
              image: 'images/display/mattress-box.jpg',
              alt: 'Martha Stewart HygroCotton Cuddlebed packaging',
              categories: ['packaging'],
              aspect: '16 / 9',
              fit: 'contain',
              tone: 'paper',
              span: 12,
              featured: true,
              width: 1200,
              height: 675
            }
          ]
        },
    {
          id: 'r-goatwood-hero',
          rhythm: 'hero',
          align: 'end',
          items: [
            {
              id: 'goatwood-sign',
              project: 'goatwood',
              title: 'Goatwood Firewood',
              disciplines: ['Packaging', 'Retail Graphics', 'Display'],
              image: 'images/display/gw-firewood-sign.jpg',
              alt: 'Goatwood premium firewood sign artwork',
              categories: ['packaging'],
              aspect: '4 / 3',
              fit: 'contain',
              tone: 'bleed',
              span: 12,
              featured: true,
              width: 2000,
              height: 1500
            }
          ]
        },
    {
          id: 'r-marks',
          rhythm: 'cluster',
          align: 'end',
          items: [
            {
              id: 'carolina-chaos',
              project: 'branding',
              title: 'Carolina Chaos',
              disciplines: ['Brand Identity', 'Apparel'],
              image: 'images/display/carolina-chaos.jpg',
              alt: 'Carolina Chaos logo system and jersey application',
              categories: ['branding', 'apparel'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 5,
              featured: true,
              width: 1200,
              height: 675
            },
            {
              id: 'carolina-elite',
              project: 'branding',
              title: 'Carolina Elite',
              disciplines: ['Logo', 'Application'],
              image: 'images/display/ce-logo.jpg',
              alt: 'Carolina Elite logo and hat mockup',
              categories: ['branding', 'apparel'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 3,
              width: 1200,
              height: 675
            },
            {
              id: 'pgs',
              project: 'branding',
              title: 'Pawleys Island Guide Service',
              disciplines: ['Logo', 'Illustration'],
              image: 'images/display/pgs-logo.jpg',
              alt: 'Pawleys Island Guide Service illustrated logo',
              categories: ['branding'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 4,
              width: 1200,
              height: 675
            }
          ]
        },
    {
          id: 'r-herbies',
          rhythm: 'chapter',
          align: 'start',
          items: [
            {
              id: 'herbies',
              project: 'herbies',
              title: 'Herbie’s Fireworks',
              disciplines: ['Packaging', 'POP Display'],
              image: 'images/display/herbies-box.jpg',
              alt: 'Herbie’s Fireworks American Celebration display packaging',
              categories: ['packaging'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 8,
              featured: true,
              width: 1200,
              height: 675
            }
          ]
        },
    {
          id: 'r-digital-pack',
          rhythm: 'pair',
          align: 'center',
          items: [
            {
              id: 'playhouse',
              project: 'web',
              title: 'Palmetto Playhouse',
              disciplines: ['Web Design', 'Interface'],
              image: 'images/display/pph-site.jpg',
              alt: 'Palmetto Playhouse website design',
              categories: ['digital'],
              aspect: '1800 / 1209',
              fit: 'cover',
              position: 'top',
              tone: 'paper',
              span: 8,
              featured: true,
              width: 1800,
              height: 1209
            },
            {
              id: 'holiday',
              project: 'holiday',
              title: 'Hampton Acres',
              disciplines: ['Packaging', 'Seasonal'],
              image: 'images/display/ha-holiday-box.jpg',
              alt: 'Hampton Acres Holiday Box packaging',
              categories: ['packaging'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 4,
              width: 1200,
              height: 675
            }
          ]
        },
    {
          id: 'r-box-web',
          rhythm: 'pair',
          align: 'end',
          items: [
            {
              id: 'gw-fancy',
              project: 'goatwood',
              title: 'Goatwood Boom',
              disciplines: ['Packaging', 'Corrugated'],
              image: 'images/display/gw-fancy-box.jpg',
              alt: 'Goatwood Boom premium corrugated packaging',
              categories: ['packaging'],
              aspect: '16 / 9',
              fit: 'contain',
              tone: 'paper',
              span: 6,
              featured: true,
              width: 1200,
              height: 675
            },
            {
              id: 'southern-asphalt',
              project: 'web',
              title: 'Southern Asphalt',
              disciplines: ['Web Design', 'Brand'],
              image: 'images/display/southern-asphalt.jpg',
              alt: 'Southern Asphalt website design',
              categories: ['digital'],
              aspect: '1234 / 1019',
              fit: 'cover',
              position: 'top',
              tone: 'paper',
              span: 6,
              width: 1234,
              height: 1019
            }
          ]
        },
    {
          id: 'r-turbine',
          rhythm: 'aside',
          align: 'end',
          items: [
            {
              id: 'turbine',
              project: 'branding',
              title: 'Fleet Turbine Services',
              disciplines: ['Logo', 'Identity'],
              image: 'images/display/turbine.jpg',
              alt: 'Fleet Turbine Services logo',
              categories: ['branding'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 5,
              start: 8,
              width: 1200,
              height: 675
            }
          ]
        },
    {
          id: 'r-apparel',
          rhythm: 'cluster',
          align: 'end',
          items: [
            {
              id: 'als-shirt',
              project: 'apparel',
              title: 'ALS Walk',
              disciplines: ['Apparel', 'Identity'],
              image: 'images/display/als-shirt.jpg',
              alt: 'ALS Walk shirt design',
              categories: ['apparel'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 7,
              width: 1200,
              height: 675
            },
            {
              id: 'coker-shirt',
              project: 'apparel',
              title: 'Coker Singers',
              disciplines: ['Apparel', 'Print'],
              image: 'images/display/coker-shirt.jpg',
              alt: 'Coker Singers choir tour shirt',
              categories: ['apparel'],
              aspect: '16 / 9',
              fit: 'cover',
              tone: 'ink',
              span: 5,
              width: 1200,
              height: 675
            }
          ]
        }
  ]
};
