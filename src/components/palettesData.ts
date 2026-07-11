export interface LayerColor {
  start: string;
  mid: string;
  end: string;
  border: string;
  glow: string;
  glowPulse: string;
}

export interface LithospherePalette {
  id: string;
  nameEn: string;
  nameMn: string;
  descriptionEn: string;
  descriptionMn: string;
  layers: LayerColor[];
}

export const LITHOSPHERE_PALETTES: LithospherePalette[] = [
  {
    id: 'sedimentary',
    nameEn: 'Sedimentary Ochre',
    nameMn: 'Тунмал Шороон',
    descriptionEn: 'Earthy clay, shale, and sandstone tones evoking deep time deposition.',
    descriptionMn: 'Урт хугацааны хуримтлалыг илэрхийлэх шавар, элсэн чулуун өнгө.',
    layers: [
      { // Crust
        start: 'rgba(212, 163, 115, 0.22)',
        mid: 'rgba(163, 115, 64, 0.35)',
        end: 'rgba(235, 189, 142, 0.22)',
        border: '#d4a373',
        glow: 'rgba(212, 163, 115, 0.45)',
        glowPulse: 'rgba(212, 163, 115, 0.75)'
      },
      { // Basalt
        start: 'rgba(176, 125, 98, 0.22)',
        mid: 'rgba(125, 76, 50, 0.35)',
        end: 'rgba(201, 149, 122, 0.22)',
        border: '#b07d62',
        glow: 'rgba(176, 125, 98, 0.45)',
        glowPulse: 'rgba(176, 125, 98, 0.75)'
      },
      { // Metamorphic
        start: 'rgba(156, 102, 68, 0.22)',
        mid: 'rgba(102, 58, 30, 0.35)',
        end: 'rgba(184, 128, 92, 0.22)',
        border: '#9c6644',
        glow: 'rgba(156, 102, 68, 0.45)',
        glowPulse: 'rgba(156, 102, 68, 0.75)'
      },
      { // Mantle
        start: 'rgba(232, 112, 42, 0.22)',
        mid: 'rgba(150, 50, 10, 0.35)',
        end: 'rgba(255, 136, 61, 0.22)',
        border: '#e8702a',
        glow: 'rgba(232, 112, 42, 0.45)',
        glowPulse: 'rgba(232, 112, 42, 0.75)'
      }
    ]
  },
  {
    id: 'volcanic',
    nameEn: 'Volcanic Magma',
    nameMn: 'Галт Уулын Магма',
    descriptionEn: 'Fiery molten obsidian, sulfur, and lava flows solidified under immense heat.',
    descriptionMn: 'Асар их халуунд бий болсон шингэн обсидиан, хүхэр, лаавын урсгал өнгө.',
    layers: [
      { // Crust - Obsidian ash
        start: 'rgba(64, 64, 64, 0.3)',
        mid: 'rgba(30, 30, 30, 0.5)',
        end: 'rgba(90, 80, 80, 0.3)',
        border: '#4b5563',
        glow: 'rgba(156, 163, 175, 0.45)',
        glowPulse: 'rgba(209, 213, 219, 0.75)'
      },
      { // Basalt - Hot sulfur
        start: 'rgba(245, 158, 11, 0.22)',
        mid: 'rgba(180, 83, 9, 0.35)',
        end: 'rgba(251, 191, 36, 0.22)',
        border: '#d97706',
        glow: 'rgba(245, 158, 11, 0.45)',
        glowPulse: 'rgba(245, 158, 11, 0.75)'
      },
      { // Metamorphic - Lava glow
        start: 'rgba(239, 68, 68, 0.22)',
        mid: 'rgba(153, 27, 27, 0.35)',
        end: 'rgba(248, 113, 113, 0.22)',
        border: '#dc2626',
        glow: 'rgba(239, 68, 68, 0.45)',
        glowPulse: 'rgba(239, 68, 68, 0.75)'
      },
      { // Mantle - Radiant magma core
        start: 'rgba(220, 38, 38, 0.3)',
        mid: 'rgba(249, 115, 22, 0.55)',
        end: 'rgba(253, 224, 71, 0.3)',
        border: '#ea580c',
        glow: 'rgba(249, 115, 22, 0.6)',
        glowPulse: 'rgba(253, 224, 71, 0.85)'
      }
    ]
  },
  {
    id: 'metamorphic',
    nameEn: 'Metamorphic Quartz',
    nameMn: 'Хувирмал Кварцит',
    descriptionEn: 'High-pressure crystalline jade, quartz white, and deep amethyst deposits.',
    descriptionMn: 'Даралтын дор бий болсон талстжсан хаш, цагаан кварц, нил ягаан анар.',
    layers: [
      { // Crust - Emerald Jade
        start: 'rgba(16, 185, 129, 0.22)',
        mid: 'rgba(6, 95, 70, 0.35)',
        end: 'rgba(110, 231, 183, 0.22)',
        border: '#10b981',
        glow: 'rgba(16, 185, 129, 0.45)',
        glowPulse: 'rgba(16, 185, 129, 0.75)'
      },
      { // Basalt - Crystalline Quartz
        start: 'rgba(243, 244, 246, 0.22)',
        mid: 'rgba(156, 163, 175, 0.35)',
        end: 'rgba(255, 255, 255, 0.22)',
        border: '#e5e7eb',
        glow: 'rgba(255, 255, 255, 0.45)',
        glowPulse: 'rgba(255, 255, 255, 0.75)'
      },
      { // Metamorphic - Deep Amethyst
        start: 'rgba(139, 92, 246, 0.22)',
        mid: 'rgba(90, 37, 244, 0.35)',
        end: 'rgba(196, 181, 253, 0.22)',
        border: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.45)',
        glowPulse: 'rgba(139, 92, 246, 0.75)'
      },
      { // Mantle - Glowing Copper Ore
        start: 'rgba(217, 119, 6, 0.22)',
        mid: 'rgba(120, 53, 4, 0.35)',
        end: 'rgba(251, 191, 36, 0.22)',
        border: '#f59e0b',
        glow: 'rgba(217, 119, 6, 0.5)',
        glowPulse: 'rgba(245, 158, 11, 0.8)'
      }
    ]
  },
  {
    id: 'abyssal',
    nameEn: 'Abyssal Deep',
    nameMn: 'Далайн Ангал',
    descriptionEn: 'Hadal marine trenches, glowing cyan vents, and midnight bathypelagic tones.',
    descriptionMn: 'Далайн гүний хавцал, цэнхэр гэрэлтэгч суваг, харанхуй усны өнгө аяс.',
    layers: [
      { // Crust - Oceanic shelf
        start: 'rgba(6, 182, 212, 0.22)',
        mid: 'rgba(8, 145, 178, 0.35)',
        end: 'rgba(165, 243, 252, 0.22)',
        border: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.45)',
        glowPulse: 'rgba(6, 182, 212, 0.75)'
      },
      { // Basalt - Deep abyss
        start: 'rgba(59, 130, 246, 0.22)',
        mid: 'rgba(30, 64, 175, 0.35)',
        end: 'rgba(147, 197, 253, 0.22)',
        border: '#3b82f6',
        glow: 'rgba(59, 130, 246, 0.45)',
        glowPulse: 'rgba(59, 130, 246, 0.75)'
      },
      { // Metamorphic - Marine benthic
        start: 'rgba(79, 70, 229, 0.22)',
        mid: 'rgba(49, 46, 129, 0.35)',
        end: 'rgba(165, 180, 252, 0.22)',
        border: '#4f46e5',
        glow: 'rgba(79, 70, 229, 0.45)',
        glowPulse: 'rgba(79, 70, 229, 0.75)'
      },
      { // Mantle - Hydrothermal bioluminescence
        start: 'rgba(14, 165, 233, 0.25)',
        mid: 'rgba(2, 132, 199, 0.4)',
        end: 'rgba(125, 211, 252, 0.25)',
        border: '#38bdf8',
        glow: 'rgba(14, 165, 233, 0.55)',
        glowPulse: 'rgba(56, 189, 248, 0.85)'
      }
    ]
  },
  {
    id: 'glacial',
    nameEn: 'Glacial Cryosphere',
    nameMn: 'Мөсөн Бүрхүүл',
    descriptionEn: 'Sub-zero frozen ice pack sheets, pale frost white, and deep cyan shelves.',
    descriptionMn: 'Мөсөн гол, цасан цагаан болон гүн цэнхэр өнгөтэй мөсөн бүрхүүл.',
    layers: [
      { // Crust - Snow cover
        start: 'rgba(243, 244, 246, 0.25)',
        mid: 'rgba(209, 213, 219, 0.35)',
        end: 'rgba(255, 255, 255, 0.25)',
        border: '#f9fafb',
        glow: 'rgba(243, 244, 246, 0.45)',
        glowPulse: 'rgba(255, 255, 255, 0.75)'
      },
      { // Basalt - Glacial firn
        start: 'rgba(186, 230, 253, 0.22)',
        mid: 'rgba(125, 211, 252, 0.35)',
        end: 'rgba(224, 242, 254, 0.22)',
        border: '#7dd3fc',
        glow: 'rgba(125, 211, 252, 0.45)',
        glowPulse: 'rgba(125, 211, 252, 0.75)'
      },
      { // Metamorphic - Pale ice pack
        start: 'rgba(56, 189, 248, 0.22)',
        mid: 'rgba(3, 105, 161, 0.35)',
        end: 'rgba(186, 230, 253, 0.22)',
        border: '#0284c7',
        glow: 'rgba(56, 189, 248, 0.45)',
        glowPulse: 'rgba(56, 189, 248, 0.75)'
      },
      { // Mantle - Deep core ice compression
        start: 'rgba(14, 116, 144, 0.22)',
        mid: 'rgba(21, 94, 117, 0.35)',
        end: 'rgba(103, 232, 249, 0.22)',
        border: '#06b6d4',
        glow: 'rgba(14, 116, 144, 0.55)',
        glowPulse: 'rgba(103, 232, 249, 0.85)'
      }
    ]
  },
  {
    id: 'carbonaceous',
    nameEn: 'Carbon & Fossil',
    nameMn: 'Нүүрстөрөгч, Олдвор',
    descriptionEn: 'Humus peat topsoils, dark graphite, and glowing petrified fossil gold.',
    descriptionMn: 'Хүлэр харанхуй бал чулуу, хув шар өнгийн үнэт чулуужсан олдвор.',
    layers: [
      { // Crust - Topsoil humus
        start: 'rgba(120, 113, 108, 0.22)',
        mid: 'rgba(68, 64, 60, 0.35)',
        end: 'rgba(168, 162, 158, 0.22)',
        border: '#78716c',
        glow: 'rgba(120, 113, 108, 0.45)',
        glowPulse: 'rgba(120, 113, 108, 0.75)'
      },
      { // Basalt - Shales
        start: 'rgba(87, 83, 78, 0.22)',
        mid: 'rgba(41, 37, 36, 0.35)',
        end: 'rgba(120, 113, 108, 0.22)',
        border: '#57837b',
        glow: 'rgba(87, 83, 78, 0.45)',
        glowPulse: 'rgba(87, 83, 78, 0.75)'
      },
      { // Metamorphic - Anthracite coal
        start: 'rgba(41, 37, 36, 0.25)',
        mid: 'rgba(12, 10, 9, 0.45)',
        end: 'rgba(68, 64, 60, 0.25)',
        border: '#1c1917',
        glow: 'rgba(41, 37, 36, 0.45)',
        glowPulse: 'rgba(68, 64, 60, 0.75)'
      },
      { // Mantle - Fossilized amber gold
        start: 'rgba(217, 119, 6, 0.22)',
        mid: 'rgba(146, 64, 14, 0.35)',
        end: 'rgba(253, 186, 116, 0.22)',
        border: '#d97706',
        glow: 'rgba(217, 119, 6, 0.55)',
        glowPulse: 'rgba(253, 186, 116, 0.85)'
      }
    ]
  },
  {
    id: 'auroral',
    nameEn: 'Auroral Electric',
    nameMn: 'Аврора Цахилгаан',
    descriptionEn: 'Magnetic solar storms, nitrogen purples, and high-energy neon greens.',
    descriptionMn: 'Соронзон шуурга, цахилгаан ягаан туяа, өндөр энергийн тод ногоон өнгө.',
    layers: [
      { // Crust - Nitrogen fringe
        start: 'rgba(192, 132, 252, 0.22)',
        mid: 'rgba(147, 51, 234, 0.35)',
        end: 'rgba(216, 180, 254, 0.22)',
        border: '#c084fc',
        glow: 'rgba(192, 132, 252, 0.45)',
        glowPulse: 'rgba(192, 132, 252, 0.75)'
      },
      { // Basalt - Solar violet
        start: 'rgba(232, 121, 249, 0.22)',
        mid: 'rgba(168, 85, 247, 0.35)',
        end: 'rgba(244, 63, 94, 0.22)',
        border: '#d946ef',
        glow: 'rgba(232, 121, 249, 0.45)',
        glowPulse: 'rgba(232, 121, 249, 0.75)'
      },
      { // Metamorphic - Ionosphere green
        start: 'rgba(34, 197, 94, 0.22)',
        mid: 'rgba(21, 128, 61, 0.35)',
        end: 'rgba(134, 239, 172, 0.22)',
        border: '#22c55e',
        glow: 'rgba(34, 197, 94, 0.45)',
        glowPulse: 'rgba(34, 197, 94, 0.75)'
      },
      { // Mantle - Cosmic hydrogen neon
        start: 'rgba(236, 72, 153, 0.22)',
        mid: 'rgba(190, 24, 74, 0.35)',
        end: 'rgba(244, 114, 182, 0.22)',
        border: '#db2777',
        glow: 'rgba(236, 72, 153, 0.55)',
        glowPulse: 'rgba(244, 114, 182, 0.85)'
      }
    ]
  },
  {
    id: 'desert',
    nameEn: 'Desert Dunes',
    nameMn: 'Элсэн Манхан',
    descriptionEn: 'Arid baked dunes, clay pan flats, and copper sandstone basements.',
    descriptionMn: 'Хуурай цөл, шаварлаг хөрс, гүний зэсээр баялаг элсэн чулуун суурь.',
    layers: [
      { // Crust - Searing sand
        start: 'rgba(251, 191, 36, 0.22)',
        mid: 'rgba(180, 83, 9, 0.35)',
        end: 'rgba(254, 240, 138, 0.22)',
        border: '#fbbf24',
        glow: 'rgba(251, 191, 36, 0.45)',
        glowPulse: 'rgba(251, 191, 36, 0.75)'
      },
      { // Basalt - Baked clay
        start: 'rgba(224, 121, 74, 0.22)',
        mid: 'rgba(154, 52, 18, 0.35)',
        end: 'rgba(244, 161, 125, 0.22)',
        border: '#ea580c',
        glow: 'rgba(224, 121, 74, 0.45)',
        glowPulse: 'rgba(224, 121, 74, 0.75)'
      },
      { // Metamorphic - Dried silt
        start: 'rgba(180, 83, 9, 0.22)',
        mid: 'rgba(120, 53, 4, 0.35)',
        end: 'rgba(217, 119, 6, 0.22)',
        border: '#b45309',
        glow: 'rgba(180, 83, 9, 0.45)',
        glowPulse: 'rgba(180, 83, 9, 0.75)'
      },
      { // Mantle - Searing bronze core
        start: 'rgba(161, 98, 7, 0.25)',
        mid: 'rgba(113, 63, 18, 0.4)',
        end: 'rgba(234, 179, 8, 0.25)',
        border: '#ca8a04',
        glow: 'rgba(161, 98, 7, 0.55)',
        glowPulse: 'rgba(234, 179, 8, 0.85)'
      }
    ]
  },
  {
    id: 'radioactive',
    nameEn: 'Radioactive Ores',
    nameMn: 'Цацраг Идэвхт Хүдэр',
    descriptionEn: 'Hazard uranium yellow veins, heavy bismuth pitchblende, and active decay neon.',
    descriptionMn: 'Ураны гэрэлтэгч шар судал, хүнд металл, задралын тод ногоон өнгө.',
    layers: [
      { // Crust - Overburden dust
        start: 'rgba(163, 230, 53, 0.22)',
        mid: 'rgba(101, 163, 13, 0.35)',
        end: 'rgba(190, 242, 142, 0.22)',
        border: '#a3e635',
        glow: 'rgba(163, 230, 53, 0.45)',
        glowPulse: 'rgba(163, 230, 53, 0.75)'
      },
      { // Basalt - Pitchblende cobalt
        start: 'rgba(5, 150, 105, 0.22)',
        mid: 'rgba(6, 78, 59, 0.35)',
        end: 'rgba(110, 231, 183, 0.22)',
        border: '#059669',
        glow: 'rgba(5, 150, 105, 0.45)',
        glowPulse: 'rgba(5, 150, 105, 0.75)'
      },
      { // Metamorphic - Radium yellow
        start: 'rgba(234, 179, 8, 0.22)',
        mid: 'rgba(161, 98, 7, 0.35)',
        end: 'rgba(253, 224, 71, 0.22)',
        border: '#eab308',
        glow: 'rgba(234, 179, 8, 0.45)',
        glowPulse: 'rgba(234, 179, 8, 0.75)'
      },
      { // Mantle - Critical lime glow
        start: 'rgba(132, 204, 22, 0.25)',
        mid: 'rgba(74, 120, 4, 0.45)',
        end: 'rgba(163, 230, 53, 0.25)',
        border: '#84cc16',
        glow: 'rgba(132, 204, 22, 0.6)',
        glowPulse: 'rgba(163, 230, 53, 0.85)'
      }
    ]
  },
  {
    id: 'iridescent',
    nameEn: 'Iridescent Bismuth',
    nameMn: 'Солонгон Бисмут',
    descriptionEn: 'Anodized metallic prism, chromium pinks, and shifting multicolor crystals.',
    descriptionMn: 'Металл призм, хромын ягаан, хувирах өнгөт талстуудын солонгон өнгө.',
    layers: [
      { // Crust - Pink shimmer
        start: 'rgba(244, 114, 182, 0.22)',
        mid: 'rgba(190, 24, 74, 0.35)',
        end: 'rgba(249, 168, 212, 0.22)',
        border: '#f472b6',
        glow: 'rgba(244, 114, 182, 0.45)',
        glowPulse: 'rgba(244, 114, 182, 0.75)'
      },
      { // Basalt - Prismatic crystal
        start: 'rgba(56, 189, 248, 0.22)',
        mid: 'rgba(13, 148, 136, 0.35)',
        end: 'rgba(147, 197, 253, 0.22)',
        border: '#38bdf8',
        glow: 'rgba(56, 189, 248, 0.45)',
        glowPulse: 'rgba(56, 189, 248, 0.75)'
      },
      { // Metamorphic - Peacock luster
        start: 'rgba(139, 92, 246, 0.22)',
        mid: 'rgba(219, 39, 119, 0.35)',
        end: 'rgba(165, 180, 252, 0.22)',
        border: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.45)',
        glowPulse: 'rgba(139, 92, 246, 0.75)'
      },
      { // Mantle - Rainbow bismuth
        start: 'rgba(236, 72, 153, 0.3)',
        mid: 'rgba(59, 130, 246, 0.45)',
        end: 'rgba(234, 179, 8, 0.3)',
        border: '#10b981',
        glow: 'rgba(236, 72, 153, 0.55)',
        glowPulse: 'rgba(59, 130, 246, 0.85)'
      }
    ]
  }
];
