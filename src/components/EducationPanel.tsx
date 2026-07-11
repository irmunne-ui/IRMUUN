import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Globe,
  BookOpen,
  Layers,
  Sparkles,
  Activity,
  Thermometer,
  Magnet,
  Shield,
  Compass,
  Zap,
  Droplet,
  RefreshCw,
  Gauge,
  Cpu,
  Bookmark,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface EducationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  viewingMode: string;
  currentLang: 'en' | 'mn';
  clickedFeature: { name: string; desc: string } | null;
  activeStratumLabel?: string;
  currentDepth?: number;
}

// Full scientific details for all 13 lithosphere viewing modes
const modeEducationDetails: Record<
  string,
  {
    titleEn: string;
    titleMn: string;
    icon: any;
    color: string;
    borderColor: string;
    bgColor: string;
    depthEn: string;
    depthMn: string;
    instrumentEn: string;
    instrumentMn: string;
    overviewEn: string;
    overviewMn: string;
    scientificProcessEn: string;
    scientificProcessMn: string;
    realWorldExampleEn: string;
    realWorldExampleMn: string;
    metrics: { labelEn: string; labelMn: string; value: string; unit: string }[];
  }
> = {
  default: {
    titleEn: 'Default Lithospheric Crust',
    titleMn: 'Үндсэн литосферийн царцдас',
    icon: Layers,
    color: '#e8702a',
    borderColor: 'border-[#e8702a]/30',
    bgColor: 'bg-[#e8702a]/10',
    depthEn: '0 - 35 km (Varies by region)',
    depthMn: '0 - 35 км (Бүс нутгаас хамаарна)',
    instrumentEn: 'Diamond Drill Rigs, Petrographic Microscopes',
    instrumentMn: 'Алмазан өрмийн машин, Петрографийн микроскоп',
    overviewEn: 'The solid, uppermost brittle shell of the earth, comprising the crust and the rigid uppermost mantle. It is the boundary where geological processes directly impact human habitation, supporting soils, oceans, and tectonic plates.',
    overviewMn: 'Дэлхийн царцдас болон дээд мантийн хатуу хэсгээс бүрдэх хамгийн гадна талын хэврэг бүрхүүл. Энэ нь геологийн процессууд хүний ​​амьдралд шууд нөлөөлдөг, хөрс, далай, тектоникийн хавтангуудыг тэтгэдэг зааг юм.',
    scientificProcessEn: 'Studied through physical core sampling, superficial outcrop mapping, and stratigraphic modeling to reconstruct depositional history.',
    scientificProcessMn: 'Чулуулгийн биет дээж (керн) авах, гадаргуугийн ил гарцын зураглал хийх, тунамал үе давхаргын загварчлал ашиглан үүслийн түүхийг сэргээн судалдаг.',
    realWorldExampleEn: 'The Kola Superdeep Borehole (Russia), which reached 12,262 meters, revealing unexpected liquid water and metamorphic minerals at extreme depths.',
    realWorldExampleMn: 'ОХУ-ын Колагийн хэт гүн өрөмдлөгийн цооног (12,262 метр гүн). Асар их гүнд шингэн ус, хувирмал эрдсүүд байдгийг илрүүлсэн.',
    metrics: [
      { labelEn: 'Average Thickness', labelMn: 'Дундаж зузаан', value: '35', unit: 'km' },
      { labelEn: 'Average Density', labelMn: 'Дундаж нягт', value: '2.7 - 2.9', unit: 'g/cm³' },
      { labelEn: 'Primary Rocks', labelMn: 'Гол чулуулаг', value: 'Granite / Sediments', unit: '' }
    ]
  },
  seismic: {
    titleEn: 'Seismic Reflection Profiling',
    titleMn: 'Сейсмик ойлтын томографи',
    icon: Activity,
    color: '#3b82f6',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    depthEn: '0 - 100 km (Lithosphere-Asthenosphere Boundary)',
    depthMn: '0 - 100 км (Литосфери-Астеносферийн зааг)',
    instrumentEn: 'Geophone Arrays, Hydraulic Vibroseis Trucks',
    instrumentMn: 'Геофон хүлээн авагч, Гидравлик чичиргээ үүсгэгч машин',
    overviewEn: 'Uses elastic acoustic wave propagation to map subsurface structures. High-energy sound waves generated at the surface reflect back when they encounter boundaries between layers with distinct acoustic impedance (velocity × density).',
    overviewMn: 'Дэлхийн доорх бүтцийг зураглахад уян акустик долгионы тархалтыг ашигладаг. Гадаргуу дээр үүсгэсэн өндөр энергийн дууны долгион нь өөр нягт, хурдтай чулуулгийн зааг дээр ойж буцаж ирэхийг бүртгэдэг.',
    scientificProcessEn: 'Seismograms record two-way travel time. Algorithms process these reflections into incredibly high-resolution cross-sections revealing hidden crustal faults and structures.',
    scientificProcessMn: 'Сейсмограмм нь долгионы тархалтын хугацааг бүртгэдэг. Тусгай алгоритмууд эдгээр ойлтыг боловсруулан хагарлын бүсүүд болон бүтцийг өндөр нарийвчлалтайгаар дүрсэлдэг.',
    realWorldExampleEn: 'Imaging of the San Andreas Fault Zone in California, mapping how the North American and Pacific plates lock at seismogenic depths.',
    realWorldExampleMn: 'Калифорни дахь Сан-Андреас хагарлын бүсийг зурагласнаар Хойд Америк болон Номхон далайн хавтангууд ямар гүнд түгжигдэж буйг судалсан байдаг.',
    metrics: [
      { labelEn: 'P-Wave Velocity', labelMn: 'Р-долгионы хурд', value: '5.6 - 8.1', unit: 'km/s' },
      { labelEn: 'Acoustic Contrast', labelMn: 'Акустик ялгарал', value: 'High', unit: '' },
      { labelEn: 'Resolution Limit', labelMn: 'Нарийвчлалын хязгаар', value: '10', unit: 'meters' }
    ]
  },
  oceanic: {
    titleEn: 'Deep Ocean Abyssal Geodetics',
    titleMn: 'Далайн гүний геод',
    icon: Droplet,
    color: '#06b6d4',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
    depthEn: '5 - 10 km (Extremely dense but thin)',
    depthMn: '5 - 10 км (Нэн нягт боловч нимгэн)',
    instrumentEn: 'Deep Sea Bathymetric Sonar, ROV Explorers',
    instrumentMn: 'Далайн гүний сонар, Алсын удирдлагат робот (ROV)',
    overviewEn: 'Analyzes the oceanic lithosphere, which is thin, heavy, and geologically young. Dominated by mafic basaltic rocks, it subducts underneath lighter continental blocks, fueling deep sea trenches.',
    overviewMn: 'Далайн нимгэн, хүнд, геологийн хувьд залуу литосферийг шинжилнэ. Төмөр, магниар баялаг базальт чулуулгаас бүрдэх бөгөөд хөнгөн тивийн хавтангийн доогуур шурган орж, гүн суваг үүсгэдэг.',
    scientificProcessEn: 'Multi-beam bathymetry and gravimetric satellite altimetry measure oceanic crust topography and crustal thickness anomalies beneath abyssal plains.',
    scientificProcessMn: 'Олон цацаргат батиметр болон гравиметрийн хиймэл дагуулын тусламжтайгаар далайн ёроолын царцдасын зузааны гажилтыг хэмждэг.',
    realWorldExampleEn: 'The Mariana Trench and Challenger Deep, where the Pacific Plate is forced 11 kilometers deep into the mantle in a textbook subduction zone.',
    realWorldExampleMn: 'Марианы суваг болон Челленжерийн гүн. Номхон далайн хавтан манти руу 11 км-ийн гүнд шурган ордог сонгодог жишээ юм.',
    metrics: [
      { labelEn: 'Average Age', labelMn: 'Дундаж нас', value: '< 200', unit: 'M years' },
      { labelEn: 'Primary Component', labelMn: 'Үндсэн бүрэлдэхүүн', value: 'Tholeiitic Basalt', unit: '' },
      { labelEn: 'Crustal Density', labelMn: 'Царцдасын нягт', value: '3.0', unit: 'g/cm³' }
    ]
  },
  magnetic: {
    titleEn: 'Magnetic Anomalies & Paleomagnetism',
    titleMn: 'Соронзон гажиг ба Палеосоронзон',
    icon: Magnet,
    color: '#a855f7',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
    depthEn: 'Curie Depth (~15 - 25 km, limits magnetization)',
    depthMn: 'Кюрийн гүн (~15 - 25 км, соронзолтыг хязгаарлана)',
    instrumentEn: 'Fluxgate Magnetometers, Cesium Vapor Gradiometers',
    instrumentMn: 'Флюксгейт соронзон хэмжигч, Цезийн соронзон градиометр',
    overviewEn: 'Measures deviations in Earth\'s local magnetic field caused by iron-bearing minerals in crustal rocks. Symmetrical magnetic stripes parallel to oceanic ridges preserve historical flips in Earth’s magnetic field.',
    overviewMn: 'Царцдасын чулуулаг дахь төмөр агуулсан эрдсүүдээс үүдэлтэй дэлхийн соронзон орны бичил хазайлтыг хэмжинэ. Далайн голч нуруутай параллель тэгш хэмт соронзон зурвасууд нь соронзон туйлууд солигдож байсан түүхийг хадгалдаг.',
    scientificProcessEn: 'When magma cools below the Curie Temperature, magnetic domains of minerals like magnetite align with Earth\'s active field, locking in place forever.',
    scientificProcessMn: 'Магма Кюрийн температураас доош хөрөх үед магнетит зэрэг соронзон эрдсүүдийн чиглэл тухайн үеийн дэлхийн соронзон орныг чиглэн талсжиж үүрд түгжигдэнэ.',
    realWorldExampleEn: 'The Reykjanes Ridge south of Iceland, where Vine-Matthews-Morley hypothesis was proven, confirming continental drift beyond doubt.',
    realWorldExampleMn: 'Исландын урд орших Рейкьянесийн нуруу. Вайн-Мэттьюс-Морлигийн таамаглал батлагдаж, тивийн шилжилтийн онолыг эргэлзээгүй нотолсон газар юм.',
    metrics: [
      { labelEn: 'Field Intensity Shift', labelMn: 'Орны эрчмийн өөрчлөлт', value: '±500', unit: 'nT' },
      { labelEn: 'Curie Temp Limit', labelMn: 'Кюрийн температур', value: '580', unit: '°C' },
      { labelEn: 'Polarity Cycles', labelMn: 'Туйлын эргэлтийн мөчлөг', value: '200k - 1M', unit: 'years' }
    ]
  },
  gravity: {
    titleEn: 'Gravitational Field & Isostasy',
    titleMn: 'Гравитацын орон ба Изостази',
    icon: Globe,
    color: '#10b981',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    depthEn: '0 - 200 km (Detects mantle root extensions)',
    depthMn: '0 - 200 км (Мантийн үндсийг илрүүлдэг)',
    instrumentEn: 'Superconducting Gravimeters, GRACE Satellites',
    instrumentMn: 'Хэт дамжуулагч хүндийн хүч хэмжигч, GRACE хиймэл дагуулууд',
    overviewEn: 'Maps subtle variations in gravity (in milligals) caused by mass imbalances, thick mountain roots, or deep metallic ore deposits. Helps geophysicists model how continents achieve buoyancy equilibrium.',
    overviewMn: 'Газрын доорх нягтын зөрүү, уулсын зузаан үндэс, эсвэл металл хүдрийн хуримтлалаас үүдэлтэй татах хүчний өөрчлөлтийг зураглана. Тивүүд мантийн урсгал дээр хэрхэн тэнцвэртэй хөвж буйг судлахад тусална.',
    scientificProcessEn: 'Slight orbital distance changes between twin satellites track localized gravity anomalies. On the ground, absolute gravimeters measure tiny changes in local g.',
    scientificProcessMn: 'Хос хиймэл дагуулууд хоорондын зайны бичил өөрчлөлтийг ашиглан хүндийн хүчний гажилтыг тогтоодог. Газар дээр үнэмлэхүй гравиметр ашиглан хэмжилт хийнэ.',
    realWorldExampleEn: 'The Himalayan Mountain range, which displays massive negative gravity anomalies due to its deep, low-density continental root extending into the mantle.',
    realWorldExampleMn: 'Гималайн нуруу. Манти руу гүн орсон бага нягттай тивийн үндсээсээ шалтгаалан хүндийн хүчний маш том хасах гажигтай байдаг.',
    metrics: [
      { labelEn: 'Anomaly Range', labelMn: 'Гажилтын хэмжээ', value: '-400 to +300', unit: 'mGal' },
      { labelEn: 'Earth\'s Mean Gravity', labelMn: 'Дэлхийн дундаж g', value: '9.806', unit: 'm/s²' },
      { labelEn: 'Isostatic State', labelMn: 'Изостазийн төлөв', value: 'Flexural / Airy', unit: '' }
    ]
  },
  thermal: {
    titleEn: 'Thermal Tomography & Geothermal Flux',
    titleMn: 'Дулааны томографи, геотермаль урсгал',
    icon: Thermometer,
    color: '#ef4444',
    borderColor: 'border-red-500/30',
    bgColor: 'bg-red-500/10',
    depthEn: '0 - 150 km (Tracks deep lithosphere-mantle heat)',
    depthMn: '0 - 150 км (Литосфери-мантийн гүний дулааныг хэмжинэ)',
    instrumentEn: 'Borehole Temperature Probes, Heat-Flow Fluxmeters',
    instrumentMn: 'Цооногийн температур хэмжигч, Дулааны урсгал хэмжигч',
    overviewEn: 'Visualizes the distribution of heat energy and geothermal gradients within the rocky lithosphere. Maps zones of magmatic thermal upwelling, hydrothermal venting, and stable cold ancient shields.',
    overviewMn: 'Чулуурхаг литосферийн дулааны энергийн тархалт, геотермаль градиентийг дүрслэн харуулна. Магмын дулааны дээшлэх урсгал, халуун рашаан, эртний тогтвортой хүйтэн платформын хил хязгаарыг зураглана.',
    scientificProcessEn: 'Measuring thermal conductivities of core samples combined with satellite-derived surface heat emissivity creates 3D heat-flow profiles.',
    scientificProcessMn: 'Кернийн дээжийн дулаан дамжуулах чадварыг хэмжиж, хиймэл дагуулаас авсан гадаргуугийн дулаан ялгаруулалтын мэдээлэлтэй нэгтгэн дулааны 3D зүсэлтийг үүсгэдэг.',
    realWorldExampleEn: 'Yellowstone Caldera (USA), where the geothermal gradient exceeds 100°C per kilometer, heating underground aquifers to extreme superheated levels.',
    realWorldExampleMn: 'АНУ-ын Йеллоустоны галт уулын тогоо. Энд геотермаль градиент нэг километрт 100°C-аас давж, гүний усыг хэт халаадаг.',
    metrics: [
      { labelEn: 'Typical Crust Flux', labelMn: 'Царцдасын дундаж урсгал', value: '65', unit: 'mW/m²' },
      { labelEn: 'Geothermal Gradient', labelMn: 'Дулааны градиент', value: '25 - 30', unit: '°C/km' },
      { labelEn: 'Max Lithosphere Temp', labelMn: 'Литосферийн дээд температур', value: '1300', unit: '°C' }
    ]
  },
  mantle_plumes: {
    titleEn: 'Mantle Plumes & Deep Convection',
    titleMn: 'Мантийн урсгал ба Гүний конвекц',
    icon: RefreshCw,
    color: '#f97316',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10',
    depthEn: '100 - 2900 km (Originates near Earth\'s core)',
    depthMn: '100 - 2900 км (Дэлхийн цөмийн заагаас эхэлдэг)',
    instrumentEn: 'Global Seismographic Network (GSN), High-P Anvils',
    instrumentMn: 'Дэлхийн сейсмографийн сүлжээ (GSN), Өндөр даралтын пресс',
    overviewEn: 'Analyzes columns of hot, solid material rising slowly through Earth\'s mantle. When they impinge on the base of the lithosphere, they melt decompressionally, forming geological hot-spots.',
    overviewMn: 'Дэлхийн мантиар аажим дээшлэх халуун, хатуу материалын урсгалыг шинжилнэ. Эдгээр урсгал литосферийн суурьт тулж ирэхэд даралтын бууралтаас шалтгаалан хайлж, галт уулын халуун цэг үүсгэдэг.',
    scientificProcessEn: 'Seismic wave velocity anomalies map these structures: warmer mantle rocks slow down seismic waves, which shows up as low-velocity anomalies in tomography.',
    scientificProcessMn: 'Сейсмик долгионы хурдны гажилтаар эдгээр бүтцийг тогтооно. Илүү халуун мантийн чулуулаг нь долгионы хурдыг сааруулдаг бөгөөд энэ нь томографид хурд багатай бүс болж харагддаг.',
    realWorldExampleEn: 'The Hawaiian Hotspot track, a chain of volcanic islands formed sequentially as the Pacific Plate moved across a stationary deep mantle plume.',
    realWorldExampleMn: 'Хавайн арлуудын хэлхээ. Номхон далайн хавтан хөдөлгөөнгүй мантийн урсгал (халуун цэг) дээгүүр шилжих явцад дараалж үүссэн галт уулын арлууд юм.',
    metrics: [
      { labelEn: 'Plume Ascent Rate', labelMn: 'Дээшлэх дундаж хурд', value: '1 - 5', unit: 'cm/year' },
      { labelEn: 'Plume Excess Temp', labelMn: 'Илүүдэл температур', value: '200 - 300', unit: '°C' },
      { labelEn: 'Plume Head Diameter', labelMn: 'Урсгалын оройн хэмжээ', value: '500 - 2000', unit: 'km' }
    ]
  },
  archaean: {
    titleEn: 'Archaean Paleocrust & Ancient Shields',
    titleMn: 'Архейн эртний царцдас ба шилнүүд',
    icon: Compass,
    color: '#84cc16',
    borderColor: 'border-lime-500/30',
    bgColor: 'bg-lime-500/10',
    depthEn: '35 - 250 km (Exceptionally deep lithospheric roots)',
    depthMn: '35 - 250 км (Маш гүнзгий литосферийн үндэстэй)',
    instrumentEn: 'U-Pb Zircon Geochronology, Mass Spectrometers',
    instrumentMn: 'Уран-Тугалганы цирконы геохронологи, Масс спектрометр',
    overviewEn: 'Provides a window into Earth\'s earliest rigid continental crust formed over 2.5 billion years ago. These cold, deep roots (cratonic keels) are seismically fast and structurally isolated from modern tectonic cycles.',
    overviewMn: '2.5 тэрбум гаруй жилийн өмнө үүссэн дэлхийн хамгийн эртний хатуу тивийн царцдасыг судлах боломжийг олгоно. Эдгээр хүйтэн, гүн үндэс (кратоны суурь) нь сейсмик долгионы тархалтаар хурдан бөгөөд тектоник циклд оролцдоггүй.',
    scientificProcessEn: 'Radiometric dating of minerals inside ancient rocks and isotopic modeling trace early differentiation of the Earth from a magma ocean.',
    scientificProcessMn: 'Эртний чулуулаг дахь эрдсүүдийн цацраг идэвхт задралын насыг тогтоож, изотопын загварчлалаар дэлхийн анхдагч ялгарлыг судалдаг.',
    realWorldExampleEn: 'The Canadian Shield (Acasta Gneiss), containing the oldest known intact crustal rocks on Earth, dated to approximately 4.03 billion years.',
    realWorldExampleMn: 'Канадын шил (Акаста гнейс). Дэлхийн хамгийн эртний бүрэн бүтэн царцдасын чулуулаг бөгөөд нас нь ойролцоогоор 4.03 тэрбум жил юм.',
    metrics: [
      { labelEn: 'Formation Age', labelMn: 'Үүссэн хугацаа', value: '2.5 - 4.0', unit: 'B years' },
      { labelEn: 'Craton Root Depth', labelMn: 'Кратоны үндэсний гүн', value: '200 - 250', unit: 'km' },
      { labelEn: 'Zircon Abundance', labelMn: 'Цирконы агууламж', value: 'Very High', unit: '' }
    ]
  },
  subduction: {
    titleEn: 'Active Subduction Zone Dynamics',
    titleMn: 'Идэвхтэй субдукцын динамик',
    icon: Zap,
    color: '#06b6d4',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
    depthEn: '0 - 670 km (Reaches the Mantle Transition Zone)',
    depthMn: '0 - 670 км (Мантийн шилжилтийн бүсэд хүрдэг)',
    instrumentEn: 'Deep Earthquake Seismic Networks, GPS Stations',
    instrumentMn: 'Гүний газар хөдлөлтийн сейсмик сүлжээ, GPS станцууд',
    overviewEn: 'Models the collision where a dense oceanic plate slides underneath a lighter continental plate. Water trapped in the subducting plate is squeezed out at depth, causing partial melting and generating explosive volcanoes.',
    overviewMn: 'Нягт ихтэй далайн хавтан хөнгөн тивийн хавтангийн доогуур шурган орох мөргөлдөөнийг харуулна. Шургаж буй хавтанд хуримтлагдсан ус гүнд шахагдан гарч, мантийн хайлах цэгийг бууруулж, хүчтэй дэлбэрэлттэй галт уулсыг үүсгэдэг.',
    scientificProcessEn: 'Mapping Wadati-Benioff zones—inclined planes of earthquakes created by the sliding slab—lets seismologists reconstruct the angle and velocity of subduction.',
    scientificProcessMn: 'Вадати-Беньофын бүсийг (шургаж буй хавтангаас үүссэн газар хөдлөлтийн налуу хавтгай) зурагласнаар субдукцын өнцөг болон хурдыг тогтоодог.',
    realWorldExampleEn: 'The Pacific "Ring of Fire", where massive subduction zones fuel over 75% of the Earth\'s active volcanoes and generate megathrust earthquakes.',
    realWorldExampleMn: 'Номхон далайн "Галт цагираг". Дэлхийн идэвхтэй галт уулын 75 гаруй хувийг тэтгэж, хамгийн хүчтэй газар хөдлөлтүүдийг үүсгэдэг.',
    metrics: [
      { labelEn: 'Sinking Angle', labelMn: 'Шургах өнцөг', value: '15 - 80', unit: 'degrees' },
      { labelEn: 'Water Release Depth', labelMn: 'Ус чөлөөлөх гүн', value: '80 - 120', unit: 'km' },
      { labelEn: 'Max Magnitude Eq', labelMn: 'Хамгийн их газар хөдлөлт', value: '9.5', unit: 'Mw' }
    ]
  },
  metallogenic: {
    titleEn: 'Metallogenic Ore Deposits & Mineralization',
    titleMn: 'Металлоген баялаг ба Эрдэсжилт',
    icon: Sparkles,
    color: '#eab308',
    borderColor: 'border-yellow-500/30',
    bgColor: 'bg-yellow-500/10',
    depthEn: '0 - 15 km (Hydrothermal deposit limits)',
    depthMn: '0 - 15 км (Халуун усны тунамал үүслийн хязгаар)',
    instrumentEn: 'Induced Polarization (IP) Geophysics, Core Assays',
    instrumentMn: 'Өдөөгдсөн туйлшралын (IP) геофизик, Кернийн шинжилгээ',
    overviewEn: 'Studies how ore deposits concentrate in Earth\'s lithosphere. Valuable metals like copper, gold, and iron migrate through highly fractured zones carried by superheated mineral-rich fluids, crystallizing in veins.',
    overviewMn: 'Дэлхийн литосферит хүдрийн хуримтлал хэрхэн үүсэхийг судална. Зэс, алт, төмөр зэрэг үнэт металлууд нь хагарлуудаар дамжих халуун уусмалаар тээвэрлэгдэн аажим хөрж, хүдрийн баялаг судал үүсгэдэг.',
    scientificProcessEn: 'Measuring electromagnetic conductivity and electrical chargeability reveals subsurface mineral boundaries. Chemical assays of drill cores confirm exact grades.',
    scientificProcessMn: 'Цахилгаан соронзон дамжуулах чадвар болон туйлшралыг хэмжсэнээр газрын доорх хүдрийн биетийг илрүүлнэ. Өрмийн дээжийн химийн шинжилгээгээр металлын агуулгыг тогтоодог.',
    realWorldExampleEn: 'Oyu Tolgoi (Mongolia), one of the world\'s largest high-grade copper-gold porphyry deposits, formed by ancient subduction-related arc magmatism.',
    realWorldExampleMn: 'Монгол улсын Оюу Толгой орд. Дэлхийн хамгийн том зэс-алтны порфирын ордуудын нэг бөгөөд эртний субдукцтай холбоотой магмын үйл ажиллагаагаар үүссэн.',
    metrics: [
      { labelEn: 'Geophysical Method', labelMn: 'Геофизикийн арга', value: 'IP / Magnetics', unit: '' },
      { labelEn: 'Fluid Temperature', labelMn: 'Уусмалын температур', value: '150 - 450', unit: '°C' },
      { labelEn: 'Target Minerals', labelMn: 'Гол эрдсүүд', value: 'Chalcopyrite / Pyrite', unit: '' }
    ]
  },
  fault_stresses: {
    titleEn: 'Lithospheric Fault Stresses & Strain',
    titleMn: 'Литосферийн хагарлын хүчдэл ба хэв гажилт',
    icon: Shield,
    color: '#f43f5e',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/10',
    depthEn: '0 - 20 km (Brittle faulting earthquake zone)',
    depthMn: '0 - 20 км (Хэврэг хагарлын идэвхтэй бүс)',
    instrumentEn: 'InSAR Satellite Radar, Borehole Strainmeters',
    instrumentMn: 'InSAR хиймэл дагуулын радар, Цооногийн хэв гажилт хэмжигч',
    overviewEn: 'Measures elastic strain and tectonic friction accumulating along continental faults. If structural stress exceeds rock friction, a catastrophic slip occurs, releasing energy as seismic waves.',
    overviewMn: 'Тивийн хагарлын дагуу хуримтлагдах уян хэв гажилт, тектоник үрэлтийн хүчийг хэмжинэ. Хэрэв механик хүчдэл нь чулуулгийн үрэлтийн хязгаарыг давж гарвал огцом шилжилт үүсэж, газар хөдөлдөг.',
    scientificProcessEn: 'InSAR measures sub-millimeter level ground movement from space. Comparing successive orbits reveals elastic strain building near seismogenic faults.',
    scientificProcessMn: 'InSAR систем нь сансраас газрын гадаргуугийн бичил хөдөлгөөнийг миллиметрийн нарийвчлалтай хэмждэг. Энэ нь хагарлын дагуух хүчдэлийг тогтоох боломж олгоно.',
    realWorldExampleEn: 'The Anatolian Fault System (Turkey), where elastic strain build-up led to major strike-slip ruptures with catastrophic structural displacement.',
    realWorldExampleMn: 'Турк улсын Анатолийн хагарлын систем. Уян хэв гажилтын хуримтлал нь асар их шилжилт бүхий сүйрэлт газар хөдөлгөөнийг дараалж үүсгэсэн жишээ юм.',
    metrics: [
      { labelEn: 'Stress Growth', labelMn: 'Хүчдэлийн өсөлт', value: '1 - 5', unit: 'MPa/decade' },
      { labelEn: 'Slip Velocity', labelMn: 'Шилжих хурд', value: '2 - 3.5', unit: 'cm/year' },
      { labelEn: 'Failure Criteria', labelMn: 'Нуралтын шалгуур', value: 'Mohr-Coulomb', unit: '' }
    ]
  },
  xenolith: {
    titleEn: 'Xenolith Mineral Inclusions',
    titleMn: 'Ксенолит чулуулгийн агууламж',
    icon: Compass,
    color: '#ec4899',
    borderColor: 'border-pink-500/30',
    bgColor: 'bg-pink-500/10',
    depthEn: '35 - 150 km (Samples ripped from deep lithosphere)',
    depthMn: '35 - 150 км (Литосферийн гүнээс тээвэрлэгдсэн дээж)',
    instrumentEn: 'Electron Microprobes, Laser Ablation ICP-MS',
    instrumentMn: 'Электрон микрозонд, Лазер абляцийн ICP-MS',
    overviewEn: 'Xenoliths are "guest rocks" trapped inside ascending volcanic conduits. Devoid of weathering, they represent unique physical samples of the deep mantle, transported rapidly before they could melt.',
    overviewMn: 'Ксенолит нь галт уулын дээшлэх магмын дотор хавчуулагдан гарч ирсэн "зочин чулуулаг" юм. Энэ нь хүн хүрэх боломжгүй мантийн гүнээс маш хурдан хугацаанд тээвэрлэгдэн ирсэн цорын ганц бодит дээж юм.',
    scientificProcessEn: 'Geobarometry and geothermometry utilize structural mineral equilibriums (e.g., garnet-pyroxene) to estimate the exact temperature and depth where the rock lived.',
    scientificProcessMn: 'Геобарометр болон геотермометрийн тусламжтайгаар эрдсийн тэнцвэрт байдлыг шинжилж, тухайн чулуулаг мантид ямар температур, даралттай байсныг тогтоодог.',
    realWorldExampleEn: 'The Kimberley Diamond Mines (South Africa), where diamond-bearing kimberlites carried mantle xenoliths from deep below the stable Archaean lithosphere.',
    realWorldExampleMn: 'Өмнөд Африкийн Кимберлигийн алмазын уурхайнууд. Алмаз агуулсан кимберлитийн магма нь мантийн ксенолитийг эртний тогтвортой литосферийн дороос тээвэрлэн гаргаж ирсэн.',
    metrics: [
      { labelEn: 'Origin Temp', labelMn: 'Үүслийн температур', value: '900 - 1300', unit: '°C' },
      { labelEn: 'Origin Pressure', labelMn: 'Үүслийн даралт', value: '1.5 - 5.5', unit: 'GPa' },
      { labelEn: 'Dominant Mineral', labelMn: 'Гол давамгайлах эрдэс', value: 'Olivine / Pyroxene', unit: '' }
    ]
  },
  cryosphere: {
    titleEn: 'Glacial Cryosphere & Crustal Flexure',
    titleMn: 'Мөсөн бүрхүүл ба Царцдасын хотойлт',
    icon: Droplet,
    color: '#38bdf8',
    borderColor: 'border-sky-400/30',
    bgColor: 'bg-sky-400/10',
    depthEn: '0 - 50 km (Active lithosphere bending)',
    depthMn: '0 - 50 км (Литосферийн идэвхтэй хотойлт)',
    instrumentEn: 'Precision GPS Arrays, Absolute Gravity Stations',
    instrumentMn: 'Нарийвчлалтай GPS сүлжээ, Хүндийн хүчний станцууд',
    overviewEn: 'Examines the load-induced relationship between ice sheets and the rocky crust. Massive glacial sheets depress the lithosphere into the warm ductile asthenosphere. When the ice melts, the land bounces back over millennia.',
    overviewMn: 'Мөсөн бүрхүүлийн жин ба дэлхийн царцдас хоорондын механик харилцан үйлчлэлийг судална. Асар том мөсний ачаалал нь литосферийг уян манти руу доош нь хотойлгох ба мөс хайлахад газар аажим өргөгддөг.',
    scientificProcessEn: 'Measuring current post-glacial isostatic adjustment rates via permanent GPS monitors. This helps model the viscosity and flow rate of the underlying mantle.',
    scientificProcessMn: 'Газрын гадаргуугийн өргөлт болон тэнцвэржилтийн хурдыг GPS станцуудаар тогтмол хэмжсэнээр мантийн чулуулгийн уян чанар, зуурамтгай чанарыг загварчилдаг.',
    realWorldExampleEn: 'Fennoscandia (Scandinavia) and the Hudson Bay region, which are currently rebounding upwards at rates of up to 9 millimeters per year after losing ice sheets.',
    realWorldExampleMn: 'Скандинавын хойг болон Хадсон булангийн бүс нутаг. Мөсөн бүрхүүл нь хайлж дууссанаас хойш жилд 9 миллиметр хүртэл хурдтайгаар дээшлэн өргөгдсөөр байна.',
    metrics: [
      { labelEn: 'Rebound Speed', labelMn: 'Өргөгдөх хурд', value: '0.1 - 1.0', unit: 'cm/year' },
      { labelEn: 'Mantle Viscosity', labelMn: 'Мантийн зуурамтгай чанар', value: '10²¹', unit: 'Pa·s' },
      { labelEn: 'Max Ice Thickness', labelMn: 'Мөсний дээд зузаан', value: '3000', unit: 'meters' }
    ]
  }
};

export function EducationPanel({
  isOpen,
  onClose,
  viewingMode,
  currentLang,
  clickedFeature,
  activeStratumLabel,
  currentDepth
}: EducationPanelProps) {
  const modeData = modeEducationDetails[viewingMode] || modeEducationDetails.default;
  const ModeIcon = modeData.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay with a clean fade-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[120] backdrop-blur-sm pointer-events-auto"
          />

          {/* Slide-In Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-zinc-950/95 backdrop-blur-xl border-l border-white/10 z-[130] flex flex-col shadow-2xl overflow-hidden pointer-events-auto text-white"
          >
            {/* Abs ambient glow decoration matching mode theme color */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] opacity-15 pointer-events-none transition-all duration-1000"
              style={{ backgroundColor: modeData.color }}
            />

            {/* Panel Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/40 relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-500 hover:rotate-6"
                  style={{ backgroundColor: `${modeData.color}25`, color: modeData.color }}
                >
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
                    {currentLang === 'en' ? 'LITHOSPHERE DATABASE' : 'ГЕОЛОГИЙН ЭРДЭМ ШИНЖИЛГЭЭ'}
                  </h3>
                  <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 mt-0.5">
                    {currentLang === 'en' ? 'Educational Insight' : 'Шинжлэх ухааны мэдээлэл'}
                    <span className="inline-block w-1 h-1 rounded-full bg-green-500 animate-ping" />
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title={currentLang === 'en' ? 'Retract Panel' : 'Хаах'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative z-10 custom-scrollbar">
              
              {/* Active Viewing Mode Section */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-extrabold uppercase bg-white/5 border border-white/10 text-orange-400 px-2 py-0.5 rounded-full tracking-wider">
                    {currentLang === 'en' ? 'ACTIVE VIEWING SYSTEM' : 'ИДЭВХТЭЙ ТӨЛӨВ'}
                  </span>
                  {currentDepth !== undefined && (
                    <span className="text-[9px] font-mono font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
                      {currentDepth} km
                    </span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl border ${modeData.borderColor} ${modeData.bgColor} flex items-start gap-4 transition-all duration-300 hover:border-white/10`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-md bg-zinc-950"
                    style={{ color: modeData.color }}
                  >
                    <ModeIcon className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans font-extrabold text-white text-base tracking-tight leading-snug">
                      {currentLang === 'en' ? modeData.titleEn : modeData.titleMn}
                    </h3>
                    <p className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      <span>{currentLang === 'en' ? 'SCAN DEPTH:' : 'САНЖИЛТЫН ГҮН:'}</span>
                      <span className="text-white font-bold">
                        {currentLang === 'en' ? modeData.depthEn : modeData.depthMn}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Mode Overview Description */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  {currentLang === 'en' ? 'Scientific Overview' : 'Шинжлэх ухааны тойм'}
                </h4>
                <p className="text-[12px] text-zinc-300 leading-relaxed font-sans font-medium">
                  {currentLang === 'en' ? modeData.overviewEn : modeData.overviewMn}
                </p>
              </div>

              {/* Scientific process details */}
              <div className="space-y-2.5 p-4 rounded-xl bg-white/5 border border-white/5">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-orange-500" />
                  {currentLang === 'en' ? 'Investigation & Methodology' : 'Судалгааны арга зүй'}
                </h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                  {currentLang === 'en' ? modeData.scientificProcessEn : modeData.scientificProcessMn}
                </p>
                <div className="pt-2 border-t border-white/5 flex flex-col gap-1 text-[9px] text-zinc-500">
                  <span className="font-bold uppercase text-zinc-400">
                    {currentLang === 'en' ? 'KEY EQUIPMENT:' : 'ҮНДСЭН ТОНОГ ТӨХӨӨРӨМЖ:'}
                  </span>
                  <span className="text-white font-bold leading-relaxed font-mono">
                    {currentLang === 'en' ? modeData.instrumentEn : modeData.instrumentMn}
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                  {currentLang === 'en' ? 'PHYSICAL PROPERTIES & GEOPHYSICS' : 'ГЕОФИЗИКИЙН ҮЗҮҮЛЭЛТТЭЙ'}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {modeData.metrics.map((metric, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-xl p-3 text-center space-y-1">
                      <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-tight truncate">
                        {currentLang === 'en' ? metric.labelEn : metric.labelMn}
                      </span>
                      <span className="block text-xs font-bold text-white font-mono truncate" style={{ color: modeData.color }}>
                        {metric.value}
                      </span>
                      {metric.unit && (
                        <span className="block text-[8px] font-mono text-zinc-600">
                          {metric.unit}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tectonic Feature Details (Dynamic clicked context) */}
              {clickedFeature && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-white/10 pt-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#e8702a] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {currentLang === 'en' ? 'DETECTED CRUSTAL FEATURE' : 'ИЛРҮҮЛСЭН ТЕКТОНИК ХЭСЭГ'}
                    </h4>
                    {activeStratumLabel && (
                      <span className="text-[8px] font-mono font-extrabold uppercase bg-[#e8702a]/10 border border-[#e8702a]/30 text-[#e8702a] px-2 py-0.5 rounded">
                        {activeStratumLabel}
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8702a]" />
                      {clickedFeature.name}
                    </h3>
                    <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                      {clickedFeature.desc}
                    </p>
                    
                    {/* Visual Seismogram / Signal simulation */}
                    <div className="pt-3 mt-3 border-t border-white/5">
                      <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                        {currentLang === 'en' ? 'SIGNAL PROPAGATION SIGNATURE' : 'СИГНАЛЫН ТАРХАЛТЫН ТӨЛӨВ'}
                      </span>
                      <div className="h-8 w-full bg-black/60 rounded border border-white/5 flex items-center justify-around px-2 overflow-hidden relative">
                        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent to-[#e8702a]/5 w-full animate-pulse" />
                        {Array.from({ length: 18 }).map((_, i) => {
                          const h = Math.abs(Math.sin((i + Date.now() / 1500) * 1.5)) * 100;
                          return (
                            <div
                              key={i}
                              className="w-[2px] rounded-full transition-all duration-300"
                              style={{
                                height: `${Math.max(10, h)}%`,
                                backgroundColor: i % 4 === 0 ? '#e8702a' : i % 3 === 0 ? modeData.color : '#27272a'
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Historical / Geological Context */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-zinc-400" />
                  {currentLang === 'en' ? 'Case Study / Real World Evidence' : 'Бодит судалгааны баримт'}
                </h4>
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                  <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                    {currentLang === 'en' ? modeData.realWorldExampleEn : modeData.realWorldExampleMn}
                  </p>
                </div>
              </div>

            </div>

            {/* Footer containing credentials */}
            <div className="p-4 bg-zinc-950 border-t border-white/10 flex justify-between items-center text-[8px] font-mono text-zinc-500 relative z-10">
              <span>{currentLang === 'en' ? 'SYS STATUS: OPERATIONAL' : 'СИСТЕМ: ХЭВИЙН'}</span>
              <span>LITHOSPHERE ACADEMY v2.5</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
