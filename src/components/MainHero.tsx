/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Layers, Milestone, ShieldAlert, Sparkles, X, Settings, Globe, Heart, Orbit, Waves, Droplet, RefreshCw, BookOpen } from 'lucide-react';
import { factsDataList } from './factsData';
import { Navbar } from './Navbar';
import { RevealLayer } from './RevealLayer';
import { AmbientPlayer } from './AmbientPlayer';
import { IdolModal } from './IdolModal';
import { MessengerPopup } from './MessengerPopup';
import { AnimeGuesser } from './AnimeGuesser';
import { Typashi } from './Typashi';
import { TectonicDust } from './TectonicDust';
import { DepthTracker } from './DepthTracker';
import { CursorTrail } from './CursorTrail';
import { GeologyQuiz } from './GeologyQuiz';
import { PaintModal } from './PaintModal';
import { MagnifyingLens } from './MagnifyingLens';
import { EducationPanel } from './EducationPanel';
import { LITHOSPHERE_PALETTES } from './palettesData';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const SPOTLIGHT_R = 260;

const layersData = {
  en: [
    {
      id: 'crust',
      depth: '25 meters',
      title: 'Holocene Stratum',
      composition: 'Silica Sandstone, Organic Humus',
      history: 'Formed in the current geological epoch. It holds records of recent agriculture, soil erosion, and global warming.'
    },
    {
      id: 'basalt',
      depth: '250 meters',
      title: 'Columnar Basalt',
      composition: 'Pyroxene, Plagioclase, Olivine',
      history: 'Solidified from prehistoric volcanic lava flows. It cooled slowly to fracture into hexagonal basalt columns.'
    },
    {
      id: 'metamorphic',
      depth: '800 meters',
      title: 'Quartzite Granites',
      composition: 'Recrystallized Quartz, Muscovite Mica',
      history: 'Ancient sandstones morphed by immense tectonic stress, folding the bedrock into beautiful patterns.'
    },
    {
      id: 'mantle',
      depth: '1500 meters',
      title: 'Peridotite Base',
      composition: 'Chromium Diopside, Pyrope Garnet',
      history: 'Deep base transitioning to Earth\'s mantle. Rich in heavy minerals crystallized under crushing gravitational pressure.'
    }
  ],
  mn: [
    {
      id: 'crust',
      depth: '25 метр',
      title: 'Голоцений Үе',
      composition: 'Цахиурлаг Элсэн Чулуу, Органик Ялзмаг',
      history: 'Орчин үеийн геологийн эрин үед үүссэн. Сүүлийн үеийн уур амьсгалын өөрчлөлт, хөрсний элэгдлийг хадгалдаг.'
    },
    {
      id: 'basalt',
      depth: '250 метр',
      title: 'Баганат Базальт',
      composition: 'Пироксен, Плагиоклаз, Оливин',
      history: 'Эртний галт уулын халуун магма аажим хөрөхдөө нягтарч, зургаан өнцөгт багана хэлбэртэй цууралт үүсгэсэн.'
    },
    {
      id: 'metamorphic',
      depth: '800 метр',
      title: 'Кварцит Боржин',
      composition: 'Дахин Талстжсан Кварц, Гялтгануур',
      history: 'Тектоникийн асар их даралт, хувиралтын халуунд элсэн чулуу нягтарч гоёмсог долгионт хээ үүсгэсэн суурь чулуулаг.'
    },
    {
      id: 'mantle',
      depth: '1500 метр',
      title: 'Перидотитын Суурь',
      composition: 'Хром Диопсид, Пироп Анар',
      history: 'Дэлхийн царцдасыг мантитай холбох шилжилтийн бүс. Асар их даралт, дулаанд үүссэн хүнд эрдэс агуулдаг.'
    }
  ]
};

const GEOLOGICAL_FEATURES = [
  {
    layer: 'crust',
    featuresEn: [
      { name: 'Quartz Vein Hydrothermal', desc: 'Silica-rich water crystallized in rock fractures' },
      { name: 'Organic Clay Horizon', desc: 'Silt deposits filled with Holocene microfossils' },
      { name: 'Granite Pegmatite Pluton', desc: 'Slowly-cooled igneous body with large crystals' },
      { name: 'Sedimentary Varve Banding', desc: 'Annual glacial lake silt-and-clay deposits' },
      { name: 'Kaolinite Clay Layer', desc: 'Weathered feldspar clay mineral rich zone' }
    ],
    featuresMn: [
      { name: 'Кварцын судал', desc: 'Хагарлуудад талстжсан цахиураар баялаг ус' },
      { name: 'Органик шавран үе', desc: 'Голоцений бичил үлдэгдэлтэй хурдас' },
      { name: 'Боржингийн Пегматит', desc: 'Аажим хөрсөн том талст бүхий магмын чулуулаг' },
      { name: 'Тунамал элсэрхэг үе', desc: 'Мөсөн голын нуурын жил бүрийн хурдас' },
      { name: 'Каолинит шаврын үе', desc: 'Өгөршсөн хээрийн жоншоор баялаг бүс' }
    ]
  },
  {
    layer: 'basalt',
    featuresEn: [
      { name: 'Columnar Basalt Fracture', desc: 'Hexagonal cooling cracks from lava shrinkage' },
      { name: 'Gabbro Sill Intrusion', desc: 'Coarse-grained mafic intrusion beneath crust' },
      { name: 'Anorthosite Crystal Lens', desc: 'Plagioclase-rich rock representing early crust' },
      { name: 'Active Tectonic Fault Gouge', desc: 'Crushed rock flour along active fault plane' },
      { name: 'Slickenlined Basalt Shear', desc: 'Polished scratch marks showing fault movement' }
    ],
    featuresMn: [
      { name: 'Баганат базальт цууралт', desc: 'Лаав агшихад үүссэн зургаан өнцөгт ан цав' },
      { name: 'Габброгийн Силлийн нэвтрэлт', desc: 'Царцдасын доорх ширхэгтэй мафийн биет' },
      { name: 'Анортозитын талст линз', desc: 'Эртний царцдасыг төлөөлөх плагиоклазаар баялаг чулуулаг' },
      { name: 'Идэвхтэй тектоникийн хагарлын нунтаг', desc: 'Идэвхтэй хагарлын хавтгай дагуух буталсан чулуу' },
      { name: 'Сликенлайн базальт шилжилт', desc: 'Хагарлын хөдөлгөөнийг харуулах өнгөлөгдсөн зураас' }
    ]
  },
  {
    layer: 'metamorphic',
    featuresEn: [
      { name: 'Eclogite High-Pressure Facies', desc: 'Metamorphosed basalt indicating subducted slabs' },
      { name: 'Mohorovičić Boundary Transition', desc: 'Major seismic speed boundary from crust to mantle' },
      { name: 'Serpentinized Peridotite Web', desc: 'Hydrated mantle rock veins with glossy texture' },
      { name: 'Sheared Quartzite Fold', desc: 'Highly compressed quartz crystals bent by plate stress' },
      { name: 'Mica Schist Folia', desc: 'Aligned mineral sheets reflecting crustal squeezing' }
    ],
    featuresMn: [
      { name: 'Эклогитын өндөр даралтын фац', desc: 'Хувирсан базальт, субдукцын бүсийг илтгэнэ' },
      { name: 'Мохогийн зааг шилжилт', desc: 'Царцдасаас манти хүртэлх сейсмикийн гол зааг' },
      { name: 'Серпентинжсэн Перидотит', desc: 'Гялалзсан бүтэцтэй гидратжсан мантийн чулуулаг' },
      { name: 'Суналтын Кварцит нугалаа', desc: 'Шахалтаас нугарсан кварцын талстууд' },
      { name: 'Мика Схист хуудаслалт', desc: 'Царцдасын шахалтыг тусгасан чиглэсэн эрдсүүд' }
    ]
  },
  {
    layer: 'mantle',
    featuresEn: [
      { name: 'Peridotite Matrix Base', desc: 'Dense mantle rock rich in olivine and pyroxene' },
      { name: 'Garnet Pyrope Megacryst', desc: 'Deep red gemstone crystallized at crushing depths' },
      { name: 'Chromite Layered Accumulate', desc: 'Heavy metallic mineral bands from crystal settling' },
      { name: 'Kimberlite Diamond Pipe Conduit', desc: 'Supersonic volcanic pipe carrying deep mantle gems' },
      { name: 'Mantle Plume Thermal Diapir', desc: 'Buoyant upwelling of superheated solid mantle' }
    ],
    featuresMn: [
      { name: 'Перидотитын матриц суурь', desc: 'Оливин, пироксеноор баялаг нягт мантийн чулуулаг' },
      { name: 'Пироп анарын аварга талст', desc: 'Асар их гүнд талстжсан гүн улаан эрдэнийн чулуу' },
      { name: 'Хромитын давхаргат хуримтлал', desc: 'Талст тунах үйл явцаас үүссэн хүнд металлын эрдэс' },
      { name: 'Кимберлитийн алмазын хоолой', desc: 'Мантийн гүнээс алмаз тээвэрлэсэн галт уулын хоолой' },
      { name: 'Мантийн дулааны диапир', desc: 'Хэт халсан хатуу мантийн дээшлэх урсгал' }
    ]
  }
];

const modesConfig: Record<string, { base: string; reveal: string; labelEn: string; labelMn: string }> = {
  default: {
    base: BG_IMAGE_1,
    reveal: BG_IMAGE_2,
    labelEn: 'Default Lithosphere',
    labelMn: 'Үндсэн литосфер'
  },
  seismic: {
    base: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Seismic Tectonic',
    labelMn: 'Сейсмик тектоник'
  },
  oceanic: {
    base: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Deep Ocean Abyssal',
    labelMn: 'Далайн гүний геод'
  },
  magnetic: {
    base: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Magnetic Anomalies',
    labelMn: 'Соронзон гажиг'
  },
  gravity: {
    base: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Gravitational Field',
    labelMn: 'Гравитацын орон'
  },
  thermal: {
    base: 'https://images.unsplash.com/photo-1608962714026-af9a76187520?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1504333631130-c833fa1881af?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Thermal Tomography',
    labelMn: 'Дулааны томографи'
  },
  mantle_plumes: {
    base: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Mantle Plumes & Convection',
    labelMn: 'Мантийн урсгал, конвекц'
  },
  archaean: {
    base: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Archaean Paleocrust',
    labelMn: 'Архейн эртний царцдас'
  },
  subduction: {
    base: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Active Subduction Zone',
    labelMn: 'Идэвхтэй субдукцын бүс'
  },
  metallogenic: {
    base: 'https://images.unsplash.com/photo-1610024037657-abf17b700130?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Metallogenic Ore Deposits',
    labelMn: 'Металлоген эрдсийн хуримтлал'
  },
  fault_stresses: {
    base: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Lithospheric Fault Stresses',
    labelMn: 'Литосферийн хагарлын хүчдэл'
  },
  xenolith: {
    base: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Xenolith Mineral Inclusions',
    labelMn: 'Ксенолит чулуулгийн агууламж'
  },
  cryosphere: {
    base: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=1280&q=80',
    reveal: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1280&q=80',
    labelEn: 'Glacial Cryosphere Interaction',
    labelMn: 'Мөсөн бүрхүүлийн харилцан үйлчлэл'
  }
};

const rightStrata = [
  { id: 'crust', labelEn: 'Holocene Stratum', labelMn: 'Голоцений Үе', height: 48, depthRange: [0, 15] },
  { id: 'basalt', labelEn: 'Columnar Basalt', labelMn: 'Баганат Базальт', height: 56, depthRange: [15, 35] },
  { id: 'metamorphic', labelEn: 'Quartzite Granites', labelMn: 'Кварцит Боржин', height: 52, depthRange: [35, 50] },
  { id: 'mantle', labelEn: 'Peridotite Base', labelMn: 'Перидотитын Суурь', height: 64, depthRange: [50, 120] }
];

export function MainHero() {
  const [activePaletteId, setActivePaletteId] = useState('sedimentary');
  const activePalette = LITHOSPHERE_PALETTES.find((p) => p.id === activePaletteId) || LITHOSPHERE_PALETTES[0];
  const earthTones = activePalette.layers;

  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  const [shakeOffset, setShakeOffset] = useState({ x: 0, y: 0 });
  const [shakeAmt, setShakeAmt] = useState(0);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prevMouse = useRef({ x: -999, y: -999 });
  const currentShake = useRef(0);

  // Persistent signed-up user profile state
  const [userProfile, setUserProfile] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('lithos_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Custom HUD and language states
  const [currentLang, setCurrentLang] = useState<'en' | 'mn'>('en');
  const [spotlightStyle, setSpotlightStyle] = useState<'heatmap' | 'laser'>('heatmap');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  // Modals state
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isDiggingOpen, setIsDiggingOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string>('crust');
  const [isIdolOpen, setIsIdolOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isTypashiOpen, setIsTypashiOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPaintOpen, setIsPaintOpen] = useState(false);

  // Physical Magnifying Lens States
  const [isMagnifierActive, setIsMagnifierActive] = useState(false);
  const [magnifierScale, setMagnifierScale] = useState(2);
  const [magnifierSize, setMagnifierSize] = useState(190);

  // New States for Custom Viewing Modes, Legend, and Fact of the Day
  const [showLegend, setShowLegend] = useState(true);
  const [showFloatingLabels, setShowFloatingLabels] = useState(true);
  const [isEduPanelOpen, setIsEduPanelOpen] = useState(false);
  const [clickedFeature, setClickedFeature] = useState<{ name: string; desc: string } | null>(null);
  const [viewingMode, setViewingMode] = useState<string>('default');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'geology' | 'human' | 'space' | 'deepsea' | 'ocean' | 'bookmarks'>('all');
  const [visibleCount, setVisibleCount] = useState(12);
  const [factOfDay, setFactOfDay] = useState<{ topic: string; fact: string; explanation: string } | null>(null);
  const [isFactLoading, setIsFactLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [lingeredStratum, setLingeredStratum] = useState<string | null>(null);
  const [isStationary, setIsStationary] = useState(false);
  const [isRulerHovered, setIsRulerHovered] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetStationaryTimer = () => {
      setIsStationary(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsStationary(true);
      }, 2000);
    };

    window.addEventListener('mousemove', resetStationaryTimer);
    window.addEventListener('touchmove', resetStationaryTimer, { passive: true });

    // Initialize timer
    timer = setTimeout(() => {
      setIsStationary(true);
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', resetStationaryTimer);
      window.removeEventListener('touchmove', resetStationaryTimer);
      clearTimeout(timer);
    };
  }, []);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lithos_bookmarked_facts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cursorColor, setCursorColor] = useState<'tectonic' | 'emerald' | 'magma' | 'abyssal' | 'cosmic' | 'aurora' | 'solar' | 'nebula' | 'neon_pink' | 'amber_gold' | 'deep_forest' | 'hyper_blue' | 'mint_fresh' | 'crystal_white' | 'obsidian_black' | 'bronze' | 'lavender' | 'iridescent_rainbow'>(() => {
    try {
      const saved = localStorage.getItem('lithos_cursor_color');
      return (saved as any) || 'tectonic';
    } catch {
      return 'tectonic';
    }
  });

  const [cursorShape, setCursorShape] = useState<'line' | 'dots' | 'ring' | 'crosshair' | 'triangle' | 'square' | 'star' | 'hexagon' | 'diamond' | 'swirl' | 'pulsing_radar' | 'brackets' | 'gear' | 'atom' | 'flower_of_life' | 'dna' | 'meteor_shower'>(() => {
    try {
      const saved = localStorage.getItem('lithos_cursor_shape');
      return (saved as any) || 'line';
    } catch {
      return 'line';
    }
  });

  useEffect(() => {
    localStorage.setItem('lithos_bookmarked_facts', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('lithos_cursor_color', cursorColor);
  }, [cursorColor]);

  useEffect(() => {
    localStorage.setItem('lithos_cursor_shape', cursorShape);
  }, [cursorShape]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const fetchFactOfDay = async () => {
    setIsFactLoading(true);
    try {
      const res = await fetch('/api/fact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lang: currentLang })
      });
      const data = await res.json();
      if (data.success && data.fact) {
        setFactOfDay(data.fact);
      }
    } catch (error) {
      console.error('Error fetching Fact of the Day:', error);
    } finally {
      setIsFactLoading(false);
    }
  };

  useEffect(() => {
    fetchFactOfDay();
  }, [currentLang]);

  // Tracking mouse with smoothing (Lerp)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // If first movement, initialize smooth position directly to avoid jump from offscreen
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.current = { x: touch.clientX, y: touch.clientY };
        if (smooth.current.x === -999) {
          smooth.current = { x: touch.clientX, y: touch.clientY };
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const updatePosition = () => {
      if (mouse.current.x !== -999) {
        if (smooth.current.x === -999) {
          smooth.current = { x: mouse.current.x, y: mouse.current.y };
          prevMouse.current = { x: mouse.current.x, y: mouse.current.y };
        } else {
          // Calculate movement velocity to measure sudden movements
          const dx = mouse.current.x - prevMouse.current.x;
          const dy = mouse.current.y - prevMouse.current.y;
          const velocity = Math.sqrt(dx * dx + dy * dy);

          // If velocity is high, trigger a subtle seismic tectonic plate rumble
          if (velocity > 40) {
            currentShake.current = Math.min(12, currentShake.current + (velocity - 40) * 0.12);
          }

          prevMouse.current = { x: mouse.current.x, y: mouse.current.y };

          // Lerps: smooth.x += (mouse.x - smooth.x) * 0.1
          smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
          smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
        }
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      }

      // Handle screen-shake decay and calculations
      if (currentShake.current > 0.15) {
        const sx = (Math.random() - 0.5) * currentShake.current * 1.6;
        const sy = (Math.random() - 0.5) * currentShake.current * 1.6;
        setShakeOffset({ x: sx, y: sy });
        setShakeAmt(currentShake.current);
        // Decay shake intensity
        currentShake.current *= 0.88;
      } else if (currentShake.current !== 0) {
        currentShake.current = 0;
        setShakeOffset({ x: 0, y: 0 });
        setShakeAmt(0);
      }

      rafRef.current = requestAnimationFrame(updatePosition);
    };

    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isCursorActive = cursorPos.x !== -999 && cursorPos.y !== -999;
  const ratioY = isCursorActive ? Math.max(0, Math.min(1, cursorPos.y / (windowSize.height || 800))) : 0;
  const currentDepth = Math.round(ratioY * 120);

  const currentStratumIndex = rightStrata.findIndex(s => {
    if (s.id === 'crust') return currentDepth <= 15;
    if (s.id === 'basalt') return currentDepth > 15 && currentDepth <= 35;
    if (s.id === 'metamorphic') return currentDepth > 35 && currentDepth <= 50;
    if (s.id === 'mantle') return currentDepth > 50;
    return false;
  });

  useEffect(() => {
    setLingeredStratum(null);

    if (currentStratumIndex === -1) {
      return;
    }

    const timer = setTimeout(() => {
      const activeStratum = rightStrata[currentStratumIndex];
      setLingeredStratum(currentLang === 'en' ? activeStratum.labelEn : activeStratum.labelMn);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [currentStratumIndex, currentLang]);

  let highlightTop = 0;
  let highlightHeight = 0;
  if (currentStratumIndex !== -1) {
    highlightHeight = rightStrata[currentStratumIndex].height;
    for (let i = 0; i < currentStratumIndex; i++) {
      highlightTop += rightStrata[i].height;
    }
  }

  const activeIndex = currentStratumIndex !== -1 ? currentStratumIndex : 3;
  const tone = earthTones[activeIndex];

  const activeStratumId = currentStratumIndex !== -1 ? rightStrata[currentStratumIndex].id : 'mantle';
  const activeFeatureGroup = GEOLOGICAL_FEATURES.find(g => g.layer === activeStratumId) || GEOLOGICAL_FEATURES[0];
  const featureIdx = isCursorActive ? Math.abs(Math.floor(cursorPos.x / 180)) % 5 : 0;
  const currentGeologicalFeature = activeFeatureGroup[currentLang === 'en' ? 'featuresEn' : 'featuresMn'][featureIdx];

  const parallaxX1 = isCursorActive ? (cursorPos.x / windowSize.width - 0.5) * -15 : 0;
  const parallaxY1 = isCursorActive ? (cursorPos.y / windowSize.height - 0.5) * -15 : 0;
  const tiltX1 = isCursorActive ? (cursorPos.y / windowSize.height - 0.5) * 6 : 0;
  const tiltY1 = isCursorActive ? (cursorPos.x / windowSize.width - 0.5) * -6 : 0;

  const parallaxX2 = isCursorActive ? (cursorPos.x / windowSize.width - 0.5) * -35 : 0;
  const parallaxY2 = isCursorActive ? (cursorPos.y / windowSize.height - 0.5) * -35 : 0;
  const tiltX2 = isCursorActive ? (cursorPos.y / windowSize.height - 0.5) * 12 : 0;
  const tiltY2 = isCursorActive ? (cursorPos.x / windowSize.width - 0.5) * -12 : 0;

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em] select-none text-white overflow-x-hidden transition-transform duration-75 ease-out"
      style={{
        fontFamily: "'Inter', sans-serif",
        transform: `translate(${shakeOffset.x}px, ${shakeOffset.y}px)`
      }}
      id="lithos-app-root"
    >
      {/* Dynamic Glowing Cursor Trail */}
      <CursorTrail
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
        shakeAmt={shakeAmt}
        colorTheme={cursorColor}
        shapeStyle={cursorShape}
      />

      {/* Premium fixed navigation */}
      <Navbar
        userProfile={userProfile}
        onSignUpClick={() => setIsSignUpOpen(true)}
        currentLang={currentLang}
        onLangToggle={() => setCurrentLang(prev => prev === 'en' ? 'mn' : 'en')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTabChange={(tabId) => {
          // Verify registration for training simulators & games
          if (tabId === 'Idol' || tabId === 'Game' || tabId === 'Typashi' || tabId === 'Quiz') {
            if (!userProfile) {
              alert(`You must sign up with a nickname and email to access ${tabId === 'Idol' ? 'My Idol' : tabId}!`);
              setIsSignUpOpen(true);
              return;
            }
          }

          if (tabId === 'Geology') {
            setIsDiggingOpen(true);
          } else if (tabId === 'Idol') {
            setIsIdolOpen(true);
          } else if (tabId === 'Game') {
            setIsGameOpen(true);
          } else if (tabId === 'Typashi') {
            setIsTypashiOpen(true);
          } else if (tabId === 'Quiz') {
            setIsQuizOpen(true);
          } else if (tabId === 'Paint') {
            setIsPaintOpen(true);
          }
        }}
        spotlightStyle={spotlightStyle}
        setSpotlightStyle={setSpotlightStyle}
        showLegend={showLegend}
        setShowLegend={setShowLegend}
        showFloatingLabels={showFloatingLabels}
        setShowFloatingLabels={setShowFloatingLabels}
        viewingMode={viewingMode}
        setViewingMode={setViewingMode}
        cursorColor={cursorColor}
        setCursorColor={setCursorColor}
        cursorShape={cursorShape}
        setCursorShape={setCursorShape}
        isMagnifierActive={isMagnifierActive}
        setIsMagnifierActive={setIsMagnifierActive}
        magnifierScale={magnifierScale}
        setMagnifierScale={setMagnifierScale}
        magnifierSize={magnifierSize}
        setMagnifierSize={setMagnifierSize}
        activePaletteId={activePaletteId}
        setActivePaletteId={setActivePaletteId}
      />

      {/* Geological Live Telemetry & Date/Time HUD Clock */}
      <div className="hidden sm:flex fixed top-[148px] right-6 z-[90] bg-black/50 backdrop-blur-md border border-white/10 px-4.5 py-3 rounded-2xl flex flex-col items-end gap-1 font-mono text-[11px] shadow-lg select-none w-52">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8702a] animate-pulse" />
          <span className="uppercase tracking-widest text-[9px] font-bold">
            {currentLang === 'en' ? 'Lithosphere HUD Active' : 'Литосфер HUD Идэвхтэй'}
          </span>
        </div>
        <div className="text-white font-bold text-base tracking-widest tabular-nums">
          {formattedTime}
        </div>
        <div className="text-zinc-400 font-semibold text-[10px]">
          {formattedDate}
        </div>
        <div className="text-zinc-500 text-[8px] flex items-center gap-1">
          <span>LAT: 47.9172° N</span>
          <span>•</span>
          <span>LON: 106.9183° E</span>
        </div>
      </div>

      {/* Ambient Soundtrack Player with real-time screen-shake and cursor vectors */}
      <AmbientPlayer shakeAmt={shakeAmt} cursorPos={cursorPos} />

      {/* Interactive Geological Live Depth Tracker Widget */}
      <DepthTracker cursorX={cursorPos.x} cursorY={cursorPos.y} windowHeight={windowSize.height} shakeAmount={shakeAmt} />

      {/* Right Stratigraphy Ruler Scale */}
      <div
        id="right-ruler"
        onMouseEnter={() => setIsRulerHovered(true)}
        onMouseLeave={() => setIsRulerHovered(false)}
        className="hidden md:flex fixed right-6 top-[320px] z-[90] flex-col items-end select-none pointer-events-auto w-48 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 overflow-visible shadow-lg shadow-black/50 transition-all duration-300 hover:border-white/20 hover:bg-black/50"
      >
        {/* Dynamic sliding and morphing highlight background with soft emit inner-glow */}
        <motion.div
          id="right-ruler-highlight"
          className="absolute rounded-xl border-r-4 pointer-events-none backdrop-blur-[1px]"
          animate={{
            backgroundImage: `linear-gradient(135deg, ${tone.start}, ${tone.mid}, ${tone.end})`,
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            borderColor: tone.border,
            boxShadow: isRulerHovered 
              ? `0 0 28px ${tone.glow}, inset 0 0 16px ${tone.glow}`
              : isStationary ? [
                  `0 0 18px ${tone.glow}, inset 0 0 12px ${tone.glow}`,
                  `0 0 35px ${tone.glowPulse}, inset 0 0 22px ${tone.glowPulse}`,
                  `0 0 18px ${tone.glow}, inset 0 0 12px ${tone.glow}`
                ] : `0 0 18px ${tone.glow}, inset 0 0 12px ${tone.glow}`,
            opacity: isStationary && !isRulerHovered ? [1, 0.75, 1] : 1
          }}
          transition={{
            backgroundImage: { duration: 0.6, ease: "easeInOut" },
            borderColor: { duration: 0.6, ease: "easeInOut" },
            backgroundPosition: {
              repeat: Infinity,
              duration: 4.5,
              ease: "linear"
            },
            boxShadow: isStationary && !isRulerHovered ? {
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut"
            } : {
              duration: 0.3
            },
            opacity: isStationary && !isRulerHovered ? {
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut"
            } : {
              duration: 0.3
            }
          }}
          style={{
            backgroundSize: "200% 200%",
            top: `${highlightTop + 69}px`, // aligned with the items start top offset (padding + header + transient label)
            height: `${highlightHeight}px`,
            left: isRulerHovered ? '2px' : '8px',
            right: isRulerHovered ? '2px' : '8px',
            transition: 'top 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s cubic-bezier(0.16, 1, 0.3, 1), right 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* High-precision caliper tick marks alongside the scale representing depth intervals */}
        <div className="absolute left-3 top-[69px] h-[220px] w-6 flex flex-col justify-between pointer-events-auto z-20">
          {Array.from({ length: 41 }).map((_, i) => {
            const isMajor = i % 5 === 0;
            const isMedium = i % 5 !== 0 && i % 2 === 0;
            const depthMeters = i * 3000;
            return (
              <div
                key={i}
                className="group relative w-full h-[1px] flex items-center cursor-crosshair"
              >
                {/* Visual Tick Mark Line */}
                <div
                  className={`h-[1px] transition-all duration-200 pointer-events-none ${
                    isMajor 
                      ? 'w-3 bg-zinc-300 opacity-70 group-hover:bg-[#e8702a] group-hover:opacity-100 group-hover:w-4.5' 
                      : isMedium 
                        ? 'w-2 bg-zinc-400 opacity-50 group-hover:bg-[#e8702a] group-hover:opacity-100 group-hover:w-3.5' 
                        : 'w-1 bg-zinc-600 opacity-30 group-hover:bg-[#e8702a] group-hover:opacity-100 group-hover:w-2.5'
                  }`}
                />
                
                {/* Large Invisible Hover Target Area */}
                <div className="absolute -top-1 -bottom-1 left-0 w-6 bg-transparent" />

                {/* Persistent Hover Tooltip displaying depth in meters */}
                <div className="absolute right-full mr-3.5 pointer-events-none opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-[110] select-none">
                  <div className="bg-zinc-950/95 border border-[#e8702a]/50 text-[9px] font-bold font-mono text-white px-2 py-0.5 rounded shadow-lg shadow-black/80 flex items-center gap-1.5 backdrop-blur-md whitespace-nowrap">
                    <span className="text-[#e8702a] font-extrabold text-[7.5px] tracking-wider uppercase">DEPTH</span>
                    <span className="w-1 h-1 rounded-full bg-green-400 animate-ping" />
                    <span>{depthMeters.toLocaleString()} m</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer label & heading */}
        <div className="w-full flex justify-end items-center px-1.5 pb-2 mb-1 border-b border-white/5 font-mono text-[9px] text-zinc-500 font-bold tracking-wider">
          <span className="text-[#e8702a] font-bold tracking-tight">{currentDepth} km</span>
        </div>

        {/* Transient lingering stratum label */}
        <div className="w-full h-7 relative overflow-hidden mb-1.5 border-b border-white/5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {lingeredStratum ? (
              <motion.div
                key={lingeredStratum}
                id="right-ruler-transient-label"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center gap-1.5 bg-[#e8702a]/10 border border-[#e8702a]/20 rounded-lg px-2"
              >
                <span className={`rounded-full bg-[#e8702a] shrink-0 transition-all duration-300 ${isStationary ? 'w-2 h-2 animate-ping shadow-[0_0_8px_#e8702a]' : 'w-1.5 h-1.5 animate-pulse'}`} />
                <span className="text-[10px] font-bold text-[#e8702a] uppercase tracking-wider truncate flex items-center gap-1">
                  <span>{lingeredStratum}</span>
                  {isStationary && <span className="text-[7px] opacity-90 font-mono text-green-400 font-extrabold tracking-tight">● READY</span>}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="default-scale-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold tracking-widest text-zinc-400 uppercase"
              >
                {currentLang === 'en' ? 'FOCUS STRATUM' : 'ИДЭВХТЭЙ ДАВХАРГА'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stratum Scale Items */}
        <div className="relative w-full flex flex-col z-10">
          {rightStrata.map((stratum, index) => {
            const isActive = index === currentStratumIndex;
            return (
              <div
                key={stratum.id}
                style={{ height: `${stratum.height}px` }}
                className="w-full flex items-center justify-between px-2 text-right transition-colors duration-300 cursor-pointer hover:bg-white/5 rounded-lg"
                title={currentLang === 'en' ? 'Click to inspect stratum education' : 'Давхаргыг шинжлэх'}
                onClick={() => {
                  const featureGrp = GEOLOGICAL_FEATURES.find(g => g.layer === stratum.id) || GEOLOGICAL_FEATURES[0];
                  const feat = featureGrp[currentLang === 'en' ? 'featuresEn' : 'featuresMn'][0];
                  setClickedFeature({ name: feat.name, desc: feat.desc });
                  setIsEduPanelOpen(true);
                }}
              >
                {/* Active/Hover state text indicator */}
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold tracking-tight transition-colors duration-300 ${
                    isActive ? 'text-[#e8702a]' : 'text-zinc-400'
                  }`}>
                    {currentLang === 'en' ? stratum.labelEn : stratum.labelMn}
                  </span>
                  <span className="text-[8px] font-mono text-zinc-500">
                    {stratum.depthRange[0]} - {stratum.depthRange[1]} km
                  </span>
                </div>

                {/* Ruler ticks on the far right */}
                <div className="flex items-center gap-1.5 ml-2.5">
                  <div className={`h-[1px] transition-all duration-300 ${
                    isActive ? 'w-4 bg-[#e8702a]' : 'w-2 bg-zinc-600'
                  }`} />
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#e8702a] scale-125 shadow-sm shadow-[#e8702a]' : 'bg-zinc-700'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Section */}
      <section
        id="geology-hero-section"
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{
          height: '100dvh'
        }}
      >
        {/* Base Layer: Wrapper with Parallax Translation & 3D Tilt */}
        <div
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
          style={{
            transform: `perspective(1000px) rotateX(${tiltX1}deg) rotateY(${tiltY1}deg) translate(${parallaxX1}px, ${parallaxY1}px) scale(1.05)`,
          }}
        >
          {Object.entries(modesConfig).map(([key, config]) => (
            <div
              key={key}
              id={`hero-base-image-${key}`}
              className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom transition-opacity duration-1000 ease-in-out"
              style={{ backgroundImage: `url(${config.base})`, opacity: viewingMode === key ? 1 : 0 }}
            />
          ))}
        </div>

        {/* Transition Overlay (adds a gorgeous vignette & depth over base layer) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 z-20 pointer-events-none" />

        {/* Shifting Tectonic Dust (z-25) - Moves at an intermediate speed to enhance the 3D depth */}
        <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden">
          <TectonicDust
            parallaxX={isCursorActive ? (cursorPos.x / windowSize.width - 0.5) * -25 : 0}
            parallaxY={isCursorActive ? (cursorPos.y / windowSize.height - 0.5) * -25 : 0}
          />
        </div>

        {/* Reveal Layers (z-30) - Overlaid and faded smoothly */}
        {Object.entries(modesConfig).map(([key, config]) => (
          <div
            key={key}
            className="absolute inset-0 z-30 transition-opacity duration-1000 pointer-events-none"
            style={{ opacity: viewingMode === key ? 1 : 0 }}
          >
            <RevealLayer
              image={config.reveal}
              cursorX={cursorPos.x}
              cursorY={cursorPos.y}
              spotlightRadius={SPOTLIGHT_R}
              parallaxX={parallaxX2}
              parallaxY={parallaxY2}
              tiltX={tiltX2}
              tiltY={tiltY2}
              spotlightStyle={spotlightStyle}
            />
          </div>
        ))}

        {/* Outer vignette to restrict the mask glow boundaries neatly */}
        <div className="absolute inset-0 pointer-events-none z-40 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%]" />

        {/* Interactive Geological Layer Benchmarks (Tooltips) */}
        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="hidden sm:flex fixed top-[148px] left-6 z-[90] bg-black/50 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl flex flex-col items-start gap-3 pointer-events-auto select-none w-52 shadow-lg"
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between gap-3 w-full">
                  <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-widest font-bold">
                    {currentLang === 'en' ? 'Stratum Pins' : 'Давхаргын тэмдэг'}
                  </span>
                  <button
                    onClick={() => setShowLegend(false)}
                    className="p-1 rounded-md text-zinc-500 hover:text-white hover:bg-white/5 border border-white/5 transition-colors cursor-pointer"
                    title={currentLang === 'en' ? 'Hide Legend' : 'Домгийг нуух'}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
                <div className="w-full h-[1px] bg-[#e8702a]/30 mt-1" />
              </div>

              {layersData[currentLang].map((layer) => {
                const isHovered = hoveredLayer === layer.id;
                return (
                  <div
                    key={layer.id}
                    className="relative flex items-center group w-full"
                    onMouseEnter={() => setHoveredLayer(layer.id)}
                    onMouseLeave={() => setHoveredLayer(null)}
                  >
                    {/* Benchmark Notch & Pulse */}
                    <div className="flex items-center gap-3 cursor-pointer w-full">
                      <div className="relative flex items-center justify-center">
                        <div className={`w-3 h-3 rounded-full border transition-all duration-300 flex items-center justify-center ${
                          isHovered ? 'bg-[#e8702a] border-white scale-125 shadow-[0_0_8px_#e8702a]' : 'bg-transparent border-[#e8702a]/60 group-hover:border-[#e8702a]'
                        }`}>
                          {isHovered && <span className="w-1 h-1 bg-white rounded-full" />}
                        </div>
                        {/* Outer pulsing ring */}
                        <span className="absolute w-5 h-5 rounded-full border border-[#e8702a]/30 animate-ping opacity-20 pointer-events-none" />
                      </div>

                      <div className="flex flex-col font-mono text-[9px] text-zinc-400 group-hover:text-white transition-colors">
                        <span className="font-bold text-white tracking-wider">{layer.depth}</span>
                        <span className="text-[8px] opacity-70 uppercase tracking-tight truncate max-w-[130px]">{layer.title}</span>
                      </div>
                    </div>

                    {/* Hover Scientific Tooltip with Motion */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: 15, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 15, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-[220px] top-1/2 -translate-y-1/2 w-72 md:w-80 bg-zinc-950/95 backdrop-blur-md border border-white/10 rounded-2xl p-4.5 shadow-2xl flex flex-col gap-2 z-[100] text-left"
                        >
                          <div className="flex items-center gap-1.5 text-[#e8702a] text-[10px] font-mono uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" />
                            <span>{currentLang === 'en' ? 'Scientific Probe' : 'Шинжлэх ухааны тандалт'}</span>
                          </div>
                          <div className="flex flex-col">
                            <h4 className="text-white font-semibold text-xs">{layer.title}</h4>
                            <span className="text-[9px] text-[#e8702a] font-mono">{layer.depth}</span>
                          </div>
                          <div className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                            {layer.history}
                          </div>
                          <div className="mt-1 pt-1.5 border-t border-white/5 flex flex-col gap-0.5 font-mono text-[9px] text-zinc-400">
                            <span className="text-zinc-500 uppercase font-bold text-[8px]">
                              {currentLang === 'en' ? 'Composition' : 'Найрлага'}:
                            </span>
                            <span>{layer.composition}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heading Container (z-50) */}
        <div
          id="hero-title-container"
          className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50"
        >
          <h1 className="text-white leading-[0.95]" id="hero-main-title">
            <span
              className="block font-playfair italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl hero-anim hero-reveal transition-all duration-500"
              style={{ letterSpacing: '-0.03em', animationDelay: '0.25s' }}
              id="hero-title-line-1"
            >
              {currentLang === 'en' ? 'strata preserve the stories' : 'davharguud tsag hugatsaanii'}
            </span>
            <span
              className="block font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl -mt-1 hero-anim hero-reveal transition-all duration-500"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.42s' }}
              id="hero-title-line-2"
            >
              {currentLang === 'en' ? 'of deep geologic time' : 'tuhai tuuhuudiig hadgaldag'}
            </span>
          </h1>

          {/* Interactive feedback hint showing when cursor hasn't moved yet */}
          {cursorPos.x === -999 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute top-44 text-xs font-mono tracking-widest text-white/50 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 animate-spin-slow text-[#e8702a]" />
              {currentLang === 'en' ? 'SWIPE OR MOVE MOUSE TO PEEL BACK THE CRUST' : 'ЦАРЦДАСЫГ ХУУЛАХЫН ТУЛД ХУЛГАНАА ХӨДӨЛГӨНӨ ҮҮ'}
            </motion.div>
          )}
        </div>

        {/* Bottom-right Block (z-50) */}
        <div
          id="hero-bottom-right-block"
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed" id="interactive-paragraph">
            {currentLang === 'en'
              ? 'Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.'
              : 'Бидний интерактив зураг нь танд газрын царцдасыг хуулж, чулуулаг, олдвор болон цаг хугацаа хэрхэн хослож таны хөл доорх газрыг бүтээснийг харах боломжийг олгоно.'}
          </p>
          <button
            id="start-digging-button"
            onClick={() => setIsDiggingOpen(true)}
            className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 flex items-center gap-2 group cursor-pointer"
          >
            <span>{currentLang === 'en' ? 'Start Digging' : 'Малтлага хийх'}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Toggleable physical magnifying lens effect */}
        <MagnifyingLens
          isActive={isMagnifierActive}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
          zoom={magnifierScale}
          size={magnifierSize}
          image={modesConfig[viewingMode].reveal}
          windowSize={windowSize}
          currentLang={currentLang}
        />

        {/* Dynamic Floating Labels under the cursor identifying specific mineral or tectonic features */}
        {showFloatingLabels && isCursorActive && !isIdolOpen && !isGameOpen && !isTypashiOpen && !isQuizOpen && !isPaintOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-45 pointer-events-auto cursor-pointer select-none bg-black/85 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-xl max-w-[240px] flex flex-col gap-1 text-[11px] hover:border-orange-500/40 hover:bg-black/90 active:scale-[0.98] transition-all duration-200"
            onClick={() => {
              if (currentGeologicalFeature) {
                setClickedFeature({
                  name: currentGeologicalFeature.name,
                  desc: currentGeologicalFeature.desc
                });
                setIsEduPanelOpen(true);
              }
            }}
            style={{
              left: cursorPos.x + 240 > windowSize.width ? cursorPos.x - 250 : cursorPos.x + 20,
              top: cursorPos.y + 140 > windowSize.height ? cursorPos.y - 150 : cursorPos.y + 20,
            }}
          >
            {/* Strata color indicator bar */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tone?.border || '#e8702a' }} />
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-orange-400">
                {currentLang === 'en' ? 'Core Detected' : 'Илрүүлэлт'}
              </span>
              <span className="text-[8px] font-mono text-zinc-500 ml-auto font-bold bg-white/5 px-1 rounded">
                {currentDepth} km
              </span>
            </div>

            {/* Feature Name */}
            <h4 className="text-white font-bold text-xs tracking-tight">
              {currentGeologicalFeature?.name}
            </h4>

            {/* Feature Description */}
            <p className="text-zinc-300 text-[10px] leading-relaxed">
              {currentGeologicalFeature?.desc}
            </p>

            {/* Layer Reference */}
            <div className="mt-1.5 pt-1.5 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-zinc-500">
              <span>{currentLang === 'en' ? 'FORMATION:' : 'ҮҮСЭЛ:'}</span>
              <span className="text-zinc-400 uppercase font-bold">
                {currentLang === 'en'
                  ? rightStrata[activeIndex].labelEn
                  : rightStrata[activeIndex].labelMn}
              </span>
            </div>

            {/* Click to learn more CTA */}
            <div className="mt-2 text-center text-[8.5px] text-orange-400 font-semibold uppercase tracking-wider animate-pulse border-t border-white/10 pt-1.5 flex items-center justify-center gap-1">
              <BookOpen className="w-2.5 h-2.5" />
              <span>{currentLang === 'en' ? 'Click to learn more' : 'Дэлгэрэнгүй унших'}</span>
            </div>
          </motion.div>
        )}

        {/* Scroll down indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-[9px] font-mono tracking-widest z-50 pointer-events-none select-none">
          <span>{currentLang === 'en' ? 'SCROLL DOWN TO EXPLORE OUTER REALMS' : 'БУСАД ЕРТӨНЦИЙГ СУДЛАХЫН ТУЛД ДООШ ГҮЙЛГЭ'}</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-3.5 border border-white/40 rounded-full flex justify-center p-0.5"
          >
            <span className="w-0.5 h-1.5 bg-white/60 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Start Digging Exploration Panel (Premium Modal overlay) */}
      <AnimatePresence>
        {isDiggingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="digging-modal-backdrop"
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              id="digging-modal-card"
              className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e8702a]/20 flex items-center justify-center text-[#e8702a]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {currentLang === 'en' ? 'Geological Cross-Section' : 'Геологийн зүсэлт'}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {currentLang === 'en' ? 'Interactive Stratigraphic Column' : 'Интерактив стратиграфийн багана'}
                    </p>
                  </div>
                </div>
                <button
                  id="close-digging-modal"
                  onClick={() => setIsDiggingOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Stratigraphic Visual (md:col-span-5) */}
                <div className="md:col-span-5 flex flex-col gap-2">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {currentLang === 'en' ? 'Sedimentation Layers' : 'Хурдсын давхаргууд'}
                  </span>
                  
                  <div className="flex flex-col gap-1.5 h-64 justify-between">
                    {/* Layer 1: Crust */}
                    <button
                       id="select-layer-crust"
                       onClick={() => setSelectedLayer('crust')}
                       className={`h-1/4 rounded-xl border flex flex-col justify-center px-4 transition-all text-left ${
                         selectedLayer === 'crust'
                           ? 'bg-[#e8702a]/20 border-[#e8702a] text-[#e8702a]'
                           : 'bg-zinc-900/30 border-zinc-800 text-zinc-300 hover:bg-zinc-900/80'
                       }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {currentLang === 'en' ? 'I. Soil & Sandstone' : 'I. Хөрс ба Элсэн чулуу'}
                      </span>
                      <span className="text-[10px] opacity-70">
                        {currentLang === 'en' ? '0 - 50m Depth' : '0 - 50м Гүн'}
                      </span>
                    </button>

                    {/* Layer 2: Basalt */}
                    <button
                       id="select-layer-basalt"
                       onClick={() => setSelectedLayer('basalt')}
                       className={`h-1/4 rounded-xl border flex flex-col justify-center px-4 transition-all text-left ${
                         selectedLayer === 'basalt'
                           ? 'bg-[#e8702a]/20 border-[#e8702a] text-[#e8702a]'
                           : 'bg-zinc-900/30 border-zinc-800 text-zinc-300 hover:bg-zinc-900/80'
                       }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {currentLang === 'en' ? 'II. Basalt Columns' : 'II. Баганат Базальт'}
                      </span>
                      <span className="text-[10px] opacity-70">
                        {currentLang === 'en' ? '50m - 400m Depth' : '50м - 400м Гүн'}
                      </span>
                    </button>

                    {/* Layer 3: Metamorphic */}
                    <button
                       id="select-layer-metamorphic"
                       onClick={() => setSelectedLayer('metamorphic')}
                       className={`h-1/4 rounded-xl border flex flex-col justify-center px-4 transition-all text-left ${
                         selectedLayer === 'metamorphic'
                           ? 'bg-[#e8702a]/20 border-[#e8702a] text-[#e8702a]'
                           : 'bg-zinc-900/30 border-zinc-800 text-zinc-300 hover:bg-zinc-900/80'
                       }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {currentLang === 'en' ? 'III. Quartzite Granites' : 'III. Кварцит Боржин'}
                      </span>
                      <span className="text-[10px] opacity-70">
                        {currentLang === 'en' ? '400m - 1200m Depth' : '400м - 1200м Гүн'}
                      </span>
                    </button>

                    {/* Layer 4: Mantle Edge */}
                    <button
                       id="select-layer-mantle"
                       onClick={() => setSelectedLayer('mantle')}
                       className={`h-1/4 rounded-xl border flex flex-col justify-center px-4 transition-all text-left ${
                         selectedLayer === 'mantle'
                           ? 'bg-[#e8702a]/20 border-[#e8702a] text-[#e8702a]'
                           : 'bg-zinc-900/30 border-zinc-800 text-zinc-300 hover:bg-zinc-900/80'
                       }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {currentLang === 'en' ? 'IV. Peridotite Crust' : 'IV. Перидотит царцдас'}
                      </span>
                      <span className="text-[10px] opacity-70">
                        {currentLang === 'en' ? '1200m+ Depth' : '1200м+ Гүн'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Layer Description (md:col-span-7) */}
                <div className="md:col-span-7 flex flex-col justify-between bg-zinc-900/30 rounded-2xl border border-zinc-800/80 p-5">
                  <AnimatePresence mode="wait">
                    {selectedLayer === 'crust' && (
                      <motion.div
                        key="crust"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 text-[#e8702a]">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-mono font-medium uppercase tracking-widest">
                            {currentLang === 'en' ? 'Upper Stratum' : 'Дээд давхарга'}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                          {currentLang === 'en' ? 'Soil & Holocene Sandstone' : 'Хөрс ба Голоцений элсэн чулуу'}
                        </h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {currentLang === 'en'
                            ? 'This surface veneer records the recent epoch of human existence, agriculture, and rapid weather shifts. Beneath the humus lies consolidated sandstone, packed with silica deposits from ancient shores.'
                            : 'Энэхүү гадаргын хөрс нь хүн төрөлхтний оршин тогтнол, газар тариалан, уур амьсгалын хурдацтай өөрчлөлтийн сүүлийн үеийг бүртгэдэг. Хөрсөн доор эртний эргийн цахиурын хуримтлалаар баялаг элсэн чулуу оршино.'}
                        </p>
                        <div className="mt-2 text-xs font-mono bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400">
                          {currentLang === 'en' ? 'Primary minerals: Quartz, Feldspar, Calcite' : 'Гол эрдэс: Кварц, Фельдшпат, Кальцит'}
                        </div>
                      </motion.div>
                    )}

                    {selectedLayer === 'basalt' && (
                      <motion.div
                        key="basalt"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 text-[#e8702a]">
                          <Milestone className="w-4 h-4" />
                          <span className="text-xs font-mono font-medium uppercase tracking-widest">
                            {currentLang === 'en' ? 'Igneous Flow' : 'Магмын урсгал'}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                          {currentLang === 'en' ? 'Columnar Basalt Layers' : 'Баганат базальтын давхарга'}
                        </h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {currentLang === 'en'
                            ? 'Formed during massive volcanic eruptions millions of years ago. As the rich, iron-heavy lava cooled slowly and contracted, it cracked into stunning hexagonal columns of dense dark rock.'
                            : 'Олон сая жилийн өмнөх хүчтэй галт уулын дэлбэрэлтийн үеэр үүссэн. Төмрөөр баялаг халуун лаав аажим хөрч агшихдаа зургаан өнцөгт багана бүхий нягт бараан чулуулаг болж ан цав үүсгэсэн.'}
                        </p>
                        <div className="mt-2 text-xs font-mono bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400">
                          {currentLang === 'en' ? 'Primary minerals: Pyroxene, Plagioclase, Olivine' : 'Гол эрдэс: Пироксен, Плагиоклаз, Оливин'}
                        </div>
                      </motion.div>
                    )}

                    {selectedLayer === 'metamorphic' && (
                      <motion.div
                        key="metamorphic"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 text-[#e8702a]">
                          <Layers className="w-4 h-4" />
                          <span className="text-xs font-mono font-medium uppercase tracking-widest">
                            {currentLang === 'en' ? 'Tectonic Pressure' : 'Тектоник даралт'}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                          {currentLang === 'en' ? 'Quartzite Granites' : 'Кварцит Боржин чулуу'}
                        </h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {currentLang === 'en'
                            ? 'Subjected to high tectonic stress and heat, sandstone metamorphosed into quartzite. Here pressure folds the bedrock, displaying gorgeous wavy lines that register prehistoric mountain-building.'
                            : 'Тектоникийн өндөр даралт ба халууны нөлөөгөөр элсэн чулуу хувирч кварцит болсон байна. Даралт нь эх газрын суурийг нугалж, уулын тогтолцооны үүслийг бүртгэсэн гоёмсог долгионт шугамуудыг харуулдаг.'}
                        </p>
                        <div className="mt-2 text-xs font-mono bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400">
                          {currentLang === 'en' ? 'Primary minerals: Quartz grains, Muscovite Mica' : 'Гол эрдэс: Кварцын ширхэг, Мусковит гялтгануур'}
                        </div>
                      </motion.div>
                    )}

                    {selectedLayer === 'mantle' && (
                      <motion.div
                        key="mantle"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 text-[#e8702a]">
                          <ShieldAlert className="w-4 h-4" />
                          <span className="text-xs font-mono font-medium uppercase tracking-widest">
                            {currentLang === 'en' ? 'Deep Lithosphere' : 'Гүн литосфери'}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                          {currentLang === 'en' ? 'Peridotite Crustal Base' : 'Перидотит царцдасын суурь'}
                        </h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {currentLang === 'en'
                            ? 'The deep base of the earth\'s crust transitioning into the mantle. This dense rock contains crystals generated under extreme crushing weight and radiant core warmth, rarely seen at the surface.'
                            : 'Дэлхийн царцдасын гүн хэсэг бөгөөд манти руу шилжих зурвас юм. Энэхүү нягт чулуулаг нь асар их даралт болон цөмөөс цацрах дулааны дор үүссэн, газрын гадаргуу дээр ховор харагддаг талстуудыг агуулдаг.'}
                        </p>
                        <div className="mt-2 text-xs font-mono bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400">
                          {currentLang === 'en' ? 'Primary minerals: Chromium Diopside, Pyrope' : 'Гол эрдэс: Хром диопсид, Пироп'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex justify-between items-center text-[11px] text-zinc-500 font-mono">
                    <span>{currentLang === 'en' ? 'Moho Transition Zone' : 'Мохо шилжилтийн зурвас'}</span>
                    <span className="text-[#e8702a]">by irmuun geology</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-900/40 border-t border-zinc-800 flex justify-end gap-3 px-6">
                <button
                  id="digging-learn-more"
                  onClick={() => {
                    setIsDiggingOpen(false);
                    setIsSignUpOpen(true);
                  }}
                  className="bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-102 cursor-pointer"
                >
                  {currentLang === 'en' ? 'Join Field Course' : 'Сургалтанд хамрагдах'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 2: Dynamic Fact of the Day & 20 Deep Realms Facts */}
      <section
        id="scientific-realms-section"
        className="relative w-full bg-black py-24 px-6 md:px-12 border-t border-zinc-900 overflow-hidden"
      >
        {/* Visual Decoration: Grid Lines & Cyberpunk Blueprint Circles */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8702a04_1px,transparent_1px),linear-gradient(to_bottom,#e8702a04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e8702a]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Technical Blueprint lines */}
        <div className="absolute top-12 left-10 w-32 h-[1px] bg-gradient-to-r from-[#e8702a]/20 to-transparent" />
        <div className="absolute top-12 left-10 w-[1px] h-32 bg-gradient-to-b from-[#e8702a]/20 to-transparent" />
        <div className="absolute bottom-12 right-10 w-32 h-[1px] bg-gradient-to-l from-[#e8702a]/20 to-transparent" />
        <div className="absolute bottom-12 right-10 w-[1px] h-32 bg-gradient-to-t from-[#e8702a]/20 to-transparent" />

        <div className="max-w-6xl mx-auto flex flex-col items-center select-text relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mb-12">
            <span className="text-[10px] font-mono text-[#e8702a] uppercase tracking-widest block mb-2 font-bold">
              {currentLang === 'en' ? 'Universal Depths & Scales' : 'Ертөнцийн Гүн ба Хэмжээс'}
            </span>
            <h2 className="text-3xl md:text-5xl font-playfair italic font-medium text-white tracking-tight mb-4">
              {currentLang === 'en' ? 'Facts of the Deep Realms' : 'Гүн ертөнцүүдийн гайхамшигт баримтууд'}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              {currentLang === 'en'
                ? 'Our universe hides secret layers of history, pressure, and biological wonders at every scale. Descend into the fascinating mysteries across the human body, space, deep sea, and oceans.'
                : 'Манай орчлон ертөнц хэмжээс бүртээ түүх, даралт болон биологийн нууцлаг гайхамшгуудыг агуулж байдаг. Хүний бие, сансар огторгуй, гүн далай ба далай тэнгисийн сонирхолтой нууцуудаар аялаарай.'}
            </p>
          </div>

          {/* DYNAMIC FACT OF THE DAY SECTION */}
          <div className="w-full max-w-4xl mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-[#e8702a]/20 bg-zinc-950/70 p-6 md:p-8 shadow-xl backdrop-blur-md">
              <div className="absolute top-0 right-0 h-24 w-24 bg-[#e8702a]/10 rounded-bl-full blur-xl pointer-events-none" />
              <div className="absolute top-0 left-0 h-1.5 w-1/3 bg-gradient-to-r from-transparent via-[#e8702a] to-transparent" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#e8702a]/10 border border-[#e8702a]/20 text-[#e8702a]">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                      {currentLang === 'en' ? 'AI-Powered Insights' : 'Хиймэл оюуны мэдээлэл'}
                    </span>
                    <h3 className="text-sm font-semibold font-mono text-white tracking-wider uppercase">
                      {currentLang === 'en' ? 'Fact of the Day' : 'Өдрийн онцлох баримт'}
                    </h3>
                  </div>
                </div>

                <button
                  id="fetch-new-fact-btn"
                  onClick={fetchFactOfDay}
                  disabled={isFactLoading}
                  className="flex items-center justify-center gap-2 bg-[#e8702a]/10 hover:bg-[#e8702a]/25 border border-[#e8702a]/30 text-[#e8702a] px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFactLoading ? 'animate-spin' : ''}`} />
                  <span>{currentLang === 'en' ? 'Generate New AI Fact' : 'Шинэ баримт үүсгэх'}</span>
                </button>
              </div>

              {isFactLoading ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <div className="w-6 h-6 border-2 border-t-[#e8702a] border-white/10 rounded-full animate-spin" />
                  <span className="text-xs font-mono text-zinc-500">
                    {currentLang === 'en' ? 'Decrypting Earth core transmissions...' : 'Дэлхийн цөмийн мэдээллийг тайлж байна...'}
                  </span>
                </div>
              ) : factOfDay ? (
                <div className="flex flex-col gap-3">
                  <div className="inline-flex self-start px-2.5 py-0.5 rounded-md text-[9px] font-mono bg-[#e8702a]/20 text-[#e8702a] border border-[#e8702a]/30 uppercase font-bold">
                    {factOfDay.topic || (currentLang === 'en' ? 'Geological Mystery' : 'Геологийн нууц')}
                  </div>
                  <h4 className="text-xl font-bold text-white leading-tight font-sans">
                    {factOfDay.fact}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    {factOfDay.explanation}
                  </p>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-zinc-500 font-mono">
                  {currentLang === 'en' ? 'No fact loaded.' : 'Мэдээлэл ачаалагдаагүй байна.'}
                </div>
              )}
            </div>
          </div>

          {/* 100 FACTS FILTER BAR */}
          <div className="w-full flex flex-col items-center mb-8">
            <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block mb-3 font-semibold">
              {currentLang === 'en' ? 'Stratum Catalog Filtration' : 'Давхаргуудын баримт шүүлтүүр'}
            </span>
            <div className="flex flex-wrap justify-center gap-1.5 bg-zinc-950/80 p-1.5 rounded-2xl border border-white/5 max-w-4xl">
              <button
                id="filter-all"
                onClick={() => {
                  setActiveCategoryFilter('all');
                  setVisibleCount(12);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategoryFilter === 'all'
                    ? 'bg-[#e8702a] text-white font-bold shadow-md shadow-[#e8702a]/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {currentLang === 'en' ? 'ALL FACTS (100)' : 'БҮХ БАРИМТ (100)'}
              </button>
              <button
                id="filter-geology"
                onClick={() => {
                  setActiveCategoryFilter('geology');
                  setVisibleCount(12);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategoryFilter === 'geology'
                    ? 'bg-[#e8702a] text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {currentLang === 'en' ? 'GEOLOGY' : 'ГЕОЛОГИ'}
              </button>
              <button
                id="filter-human"
                onClick={() => {
                  setActiveCategoryFilter('human');
                  setVisibleCount(12);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategoryFilter === 'human'
                    ? 'bg-[#e8702a] text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {currentLang === 'en' ? 'HUMAN BODY' : 'ХҮНИЙ БИЕ'}
              </button>
              <button
                id="filter-space"
                onClick={() => {
                  setActiveCategoryFilter('space');
                  setVisibleCount(12);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategoryFilter === 'space'
                    ? 'bg-[#e8702a] text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {currentLang === 'en' ? 'SPACE' : 'САНСАР ОГТОРГУЙ'}
              </button>
              <button
                id="filter-deepsea"
                onClick={() => {
                  setActiveCategoryFilter('deepsea');
                  setVisibleCount(12);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategoryFilter === 'deepsea'
                    ? 'bg-[#e8702a] text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {currentLang === 'en' ? 'SEA' : 'ДАЛАЙН ГҮН'}
              </button>
              <button
                id="filter-ocean"
                onClick={() => {
                  setActiveCategoryFilter('ocean');
                  setVisibleCount(12);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategoryFilter === 'ocean'
                    ? 'bg-[#e8702a] text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {currentLang === 'en' ? 'OCEAN' : 'ДАЛАЙ ТЭНГИС'}
              </button>
              
              {/* BOOKMARKS FILTER BUTTON */}
              <button
                id="filter-bookmarks"
                onClick={() => {
                  setActiveCategoryFilter('bookmarks');
                  setVisibleCount(12);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategoryFilter === 'bookmarks'
                    ? 'bg-[#e8702a] text-white font-bold shadow-md shadow-[#e8702a]/25'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${activeCategoryFilter === 'bookmarks' ? 'fill-white text-white' : 'text-[#e8702a]'}`} />
                <span>{currentLang === 'en' ? 'BOOKMARKS' : 'ХАДГАЛСАН'}</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-bold">
                  {bookmarkedIds.length}
                </span>
              </button>
            </div>
          </div>

          {/* Dynamic Filtered Facts Bento Grid */}
          <div className="w-full flex flex-col items-center gap-10">
            {(() => {
              // 1. Calculate matching list once to avoid duplicate checks or incorrect pagination counts
              const filteredList = factsDataList.filter(fact => {
                // Category or Bookmark Match
                const matchesCategory = 
                  activeCategoryFilter === 'all' ||
                  (activeCategoryFilter === 'bookmarks' 
                    ? bookmarkedIds.includes(fact.id) 
                    : fact.category === activeCategoryFilter);

                // Search matching (real-time keyword search)
                const query = searchQuery.trim().toLowerCase();
                if (query === '') return matchesCategory;

                const item = fact[currentLang];
                const matchesTitle = item.title.toLowerCase().includes(query);
                const matchesDesc = item.desc.toLowerCase().includes(query);
                const matchesCat = fact.category.toLowerCase().includes(query);

                return matchesCategory && (matchesTitle || matchesDesc || matchesCat);
              });

              return (
                <>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.04
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                    key={`${activeCategoryFilter}-${searchQuery}`}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredList.slice(0, visibleCount).map((fact) => {
                        const item = fact[currentLang];
                        const isBookmarked = bookmarkedIds.includes(fact.id);

                        const getCategoryIcon = (category: string) => {
                          switch (category) {
                            case 'geology': return <Layers className="w-4 h-4 text-amber-500" />;
                            case 'human': return <Heart className="w-4 h-4 text-[#e8702a]" />;
                            case 'space': return <Orbit className="w-4 h-4 text-blue-400" />;
                            case 'deepsea': return <Waves className="w-4 h-4 text-emerald-400" />;
                            default: return <Droplet className="w-4 h-4 text-cyan-400" />;
                          }
                        };
                        const getCategoryBadge = (category: string) => {
                          switch (category) {
                            case 'geology': return 'border-amber-500/20 bg-amber-500/5 text-amber-500';
                            case 'human': return 'border-[#e8702a]/20 bg-[#e8702a]/5 text-[#e8702a]';
                            case 'space': return 'border-blue-500/20 bg-blue-500/5 text-blue-400';
                            case 'deepsea': return 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400';
                            default: return 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400';
                          }
                        };

                        return (
                          <motion.div
                            layout
                            key={fact.id}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              show: { opacity: 1, y: 0 }
                            }}
                            className="bg-zinc-950/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    {getCategoryIcon(fact.category)}
                                  </div>
                                  <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full border ${getCategoryBadge(fact.category)} uppercase font-bold tracking-wider`}>
                                    {fact.category === 'deepsea' ? (currentLang === 'en' ? 'sea' : 'далайн гүн') : fact.category}
                                  </span>
                                </div>

                                {/* Bookmarking / Favoriting toggle */}
                                <motion.button
                                  whileHover={{ scale: 1.15 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleBookmark(fact.id);
                                  }}
                                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-[#e8702a] border border-white/5 transition-colors cursor-pointer z-10"
                                  title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                                >
                                  <Heart 
                                    className={`w-4 h-4 transition-all duration-300 ${
                                      isBookmarked 
                                        ? 'fill-[#e8702a] text-[#e8702a] filter drop-shadow-[0_0_4px_#e8702a]' 
                                        : 'text-zinc-500 hover:text-white'
                                    }`} 
                                  />
                                </motion.button>
                              </div>
                              
                              <h4 className="text-base font-semibold text-white mb-2 font-sans tracking-tight">
                                {item.title}
                              </h4>
                              
                              <p className="text-xs text-zinc-400 leading-relaxed font-sans min-h-[64px]">
                                {item.desc}
                              </p>
                            </div>
                            
                            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                                {currentLang === 'en' ? 'PROBE COMPLETE' : 'ТАЙЛАЛ ДУУССАН'}
                              </span>
                              <div className="w-1.5 h-1.5 rounded-full bg-[#e8702a]" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>

                  {/* Empty State */}
                  {filteredList.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-white/10 rounded-3xl bg-zinc-950/20 max-w-md mx-auto w-full z-10"
                    >
                      <Heart className="w-8 h-8 text-zinc-600 mb-3 animate-pulse" />
                      <h4 className="text-white font-semibold text-sm mb-1">
                        {activeCategoryFilter === 'bookmarks'
                          ? (currentLang === 'en' ? 'No Saved Bookmarks' : 'Хадгалсан баримт одоогоор алга')
                          : (currentLang === 'en' ? 'No Match Found' : 'Илэрц олдсонгүй')}
                      </h4>
                      <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                        {activeCategoryFilter === 'bookmarks'
                          ? (currentLang === 'en' 
                              ? 'Click the Heart icon on any of the 100 facts to save them to your bookmarks.'
                              : 'Доорх 100 баримтын аль нэг дээрх зүрхэн дүрс дээр дарж өөрийн хадгалсан баримтдаа нэмээрэй.')
                          : (currentLang === 'en'
                              ? `Try searching with different keywords instead of "${searchQuery}".`
                              : `"${searchQuery}" гэхээс өөр түлхүүр үг ашиглан хайж үзнэ үү.`)}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-4 px-4 py-1.5 bg-[#e8702a]/10 hover:bg-[#e8702a]/20 border border-[#e8702a]/30 rounded-xl text-xs font-mono text-[#e8702a] transition-all cursor-pointer"
                        >
                          {currentLang === 'en' ? 'Clear Search Filter' : 'Хайлтыг цэвэрлэх'}
                        </button>
                      )}
                    </motion.div>
                  )}

                  {/* Pagination Load More Button */}
                  {filteredList.length > visibleCount && (
                    <motion.button
                      id="load-more-facts"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setVisibleCount(prev => prev + 12)}
                      className="px-6 py-3 rounded-full border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-white font-mono text-xs font-semibold tracking-wider hover:border-white/20 transition-all shadow-lg cursor-pointer flex items-center gap-2 mt-4"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-[#e8702a]" />
                      {currentLang === 'en' ? 'LOAD ADDITIONAL SCIENTIFIC DATA' : 'НЭМЭЛТ СИНТЕТИК МЭДЭЭЛЭЛ УНШИХ'}
                    </motion.button>
                  )}
                </>
              );
            })()}
          </div>

        </div>
      </section>

      {/* Modern Sleek Registration Modal (Sign Up) */}
      <AnimatePresence>
        {isSignUpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="signup-modal-backdrop"
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              id="signup-modal-card"
              className="bg-zinc-950 border border-zinc-800/80 rounded-3xl w-full max-w-md p-6 sm:p-8 relative shadow-2xl overflow-hidden"
            >
              {/* Abs decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e8702a]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <span className="font-playfair italic text-3xl text-zinc-400">Join</span> Lithos
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">Peel back time and explore the world with us.</p>
                </div>
                <button
                  id="close-signup-modal"
                  onClick={() => setIsSignUpOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form
                id="signup-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const nameInput = document.getElementById('user-name') as HTMLInputElement | null;
                  const emailInput = document.getElementById('user-email') as HTMLInputElement | null;
                  const nickname = nameInput?.value?.trim() || 'Guest';
                  const email = emailInput?.value?.trim() || '';
                  
                  const profile = { name: nickname, email };
                  setUserProfile(profile);
                  localStorage.setItem('lithos_user_profile', JSON.stringify(profile));
                  
                  alert(`Registration successful! Welcome, ${nickname}. You are now authorized to play all simulators and games!`);
                  setIsSignUpOpen(false);
                }}
                className="flex flex-col gap-4 mt-2"
              >
                <div>
                  <label htmlFor="user-name" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    id="user-name"
                    placeholder="Irmuun Bold"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#e8702a] transition-colors animate-none"
                  />
                </div>

                <div>
                  <label htmlFor="user-email" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    id="user-email"
                    placeholder="irmuun@geology.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#e8702a] transition-colors animate-none"
                  />
                </div>

                <div>
                  <label htmlFor="user-interest" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Primary Interest
                  </label>
                  <select
                    id="user-interest"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8702a] transition-colors appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                  >
                    <option value="enthusiast">Sedimentology & Stratigraphy</option>
                    <option value="cartography">Interactive Tectonic Mapping</option>
                    <option value="fieldwork">Active Volcanism & Field Guides</option>
                    <option value="general">Gemstone mineralogy</option>
                  </select>
                </div>

                <div className="flex items-center gap-2.5 mt-2">
                  <input
                    required
                    type="checkbox"
                    id="terms-checkbox"
                    className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-[#e8702a] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="terms-checkbox" className="text-xs text-zinc-400 cursor-pointer select-none">
                    I agree to the Lithos terms and geology privacy updates
                  </label>
                </div>

                <button
                  id="submit-signup-button"
                  type="submit"
                  className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-semibold py-3.5 rounded-xl mt-4 transition-all hover:scale-[1.01] active:scale-99 shadow-lg shadow-[#e8702a]/10 cursor-pointer text-center"
                >
                  Create Free Account
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <IdolModal isOpen={isIdolOpen} onClose={() => setIsIdolOpen(false)} />
      <AnimeGuesser isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
      <Typashi isOpen={isTypashiOpen} onClose={() => setIsTypashiOpen(false)} userProfile={userProfile} />
      <GeologyQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} currentLang={currentLang} />
      <PaintModal isOpen={isPaintOpen} onClose={() => setIsPaintOpen(false)} currentLang={currentLang} />
      <EducationPanel
        isOpen={isEduPanelOpen}
        onClose={() => setIsEduPanelOpen(false)}
        viewingMode={viewingMode}
        currentLang={currentLang}
        clickedFeature={clickedFeature}
        activeStratumLabel={currentLang === 'en' ? rightStrata[activeIndex]?.labelEn : rightStrata[activeIndex]?.labelMn}
        currentDepth={currentDepth}
      />
      <MessengerPopup />
    </div>
  );
}
