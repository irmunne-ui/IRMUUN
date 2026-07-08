export interface FactItem {
  id: string;
  category: 'geology' | 'human' | 'space' | 'deepsea' | 'ocean';
  icon: string;
  en: {
    title: string;
    desc: string;
  };
  mn: {
    title: string;
    desc: string;
  };
}

export const factsDataList: FactItem[] = [
  // ==================== GEOLOGY (20 facts) ====================
  {
    id: 'g1',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Creeping Continents',
      desc: 'Tectonic plates move at approximately the same rate as human fingernails grow—about 2.5 to 5 centimeters per year.'
    },
    mn: {
      title: 'Нүүдэллэж буй Тектоник хавтангууд',
      desc: 'Тектоник хавтангууд нь хүний хумс ургахтай ижил хурдтайгаар буюу жилд ойролцоогоор 2.5-5 см хурдтай шилжин хөдөлдөг.'
    }
  },
  {
    id: 'g2',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Earth\'s Inner Reactor',
      desc: 'Deep within the Earth, the decay of radioactive isotopes like Uranium and Thorium generates over half of our planet\'s heat.'
    },
    mn: {
      title: 'Дэлхийн дотоод реактор',
      desc: 'Дэлхийн гүн дэх Уран, Тори зэрэг цацраг идэвхт изотопуудын задрал нь манай гарагийн нийт дулааны тэн хагасаас илүүг үүсгэдэг.'
    }
  },
  {
    id: 'g3',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Liquid Stone Currents',
      desc: 'The Earth\'s mantle is not liquid magma, but solid rock that flows slowly like hot asphalt under immense pressure and temperature.'
    },
    mn: {
      title: 'Урсагч хатуу чулуулаг',
      desc: 'Дэлхийн манти нь шингэн магма биш, харин асар их даралт ба халууны дор халуун асфальт шиг маш удаан урсдаг хатуу чулуулаг юм.'
    }
  },
  {
    id: 'g4',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'The Moho boundary',
      desc: 'The Mohorovičić discontinuity is the boundary between Earth\'s crust and mantle, detected entirely by how seismic waves speed up.'
    },
    mn: {
      title: 'Мохогийн зааг',
      desc: 'Мохоровичичийн зааг нь дэлхийн царцдас ба мантийн зааг бөгөөд тэнд газар хөдлөлтийн долгионы хурд огцом өөрчлөгддөгөөр тодорхойлогддог.'
    }
  },
  {
    id: 'g5',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Everest Marine Limestone',
      desc: 'The very summit of Mount Everest is made of marine limestone that was deposited at the bottom of a warm ocean 450 million years ago.'
    },
    mn: {
      title: 'Эверестийн орой дахь далайн чулуу',
      desc: 'Эверест уулын хамгийн орой хэсэг нь 450 сая жилийн өмнө дулаан далайн ёроолд хуримтлагдсан шохойн чулуунаас бүрддэг.'
    }
  },
  {
    id: 'g6',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Kilauea\'s Continuous Birth',
      desc: 'The volcano Kilauea in Hawaii has been erupting almost continuously since 1983, creating acres of brand-new land every single year.'
    },
    mn: {
      title: 'Килауэа галт уулын тасралтгүй урсац',
      desc: 'Хавайн Килауэа галт уул 1983 оноос хойш бараг тасралтгүй оргилж, жил бүр асар их хэмжээний шинэ газар нутгийг бий болгож байна.'
    }
  },
  {
    id: 'g7',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'The Ring of Fire',
      desc: 'About 90% of the world\'s earthquakes and 75% of all active volcanoes occur along the Ring of Fire in the basin of the Pacific Ocean.'
    },
    mn: {
      title: 'Номхон далайн галын цагираг',
      desc: 'Дэлхийн газар хөдлөлтийн 90% ба идэвхтэй галт уулсын 75% нь Номхон далайн сав газар дахь Галын цагираг дагуу байрладаг.'
    }
  },
  {
    id: 'g8',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Bent Bedrock',
      desc: 'Under immense confinement pressure, brittle rocks like quartzites can fold and bend like warm plastic without fracturing.'
    },
    mn: {
      title: 'Муруйсан чулуун давхарга',
      desc: 'Асар их даралтын дор кварцит шиг хэврэг чулуулаг хугарахгүйгээр яг л бүлээн хуванцар шиг нугарч, долгиотсон нугачаа үүсгэдэг.'
    }
  },
  {
    id: 'g9',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Antarctica\'s Volcanoes',
      desc: 'Antarctica is home to Mount Erebus, the southernmost active volcano on Earth, containing a persistent boiling liquid lava lake.'
    },
    mn: {
      title: 'Антарктидын галт уул',
      desc: 'Антарктид тивд дэлхийн хамгийн өмнөд цэгт орших Эребус галт уул байдаг бөгөөд тогоондоо байнгын буцалж буй шингэн лаавын нууртай.'
    }
  },
  {
    id: 'g10',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Ancient Diamond Capsules',
      desc: 'Most natural diamonds were formed 1 to 3 billion years ago, deep in Earth\'s mantle, and brought up by high-speed magma eruptions called kimberlites.'
    },
    mn: {
      title: 'Эртний алмазан капсул',
      desc: 'Байгалийн ихэнх алмаз 1-3 тэрбум жилийн өмнө мантийн гүнд үүсэж, кимберлит хэмээх асар хурдтай магмын оргилтоор дээш гарч иржээ.'
    }
  },
  {
    id: 'g11',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Supercontinent Cycle',
      desc: 'Earth\'s landmasses assemble into a single supercontinent (like Pangaea) and disperse again roughly once every 300 to 500 million years.'
    },
    mn: {
      title: 'Үлэмж тивийн мөчлөг',
      desc: 'Дэлхийн хуурай газар нь 300-500 сая жил тутамд нэг удаа нэгдэж аварга супертив (Пангей шиг) үүсгээд эргэн задардаг мөчлөгтэй.'
    }
  },
  {
    id: 'g12',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'The Great Oxidation Event',
      desc: 'About 2.4 billion years ago, photosynthetic microbes released oxygen, reacting with dissolved iron to paint the world\'s oceans with red iron oxide formations.'
    },
    mn: {
      title: 'Агаар мандлын их хүчилтөрөгчжилт',
      desc: '2.4 тэрбум жилийн өмнө фотосинтез явуулагч бичил биетүүд хүчилтөрөгч ялгаруулж, усан дахь төмөртэй урвалд орж улаан төмрийн оксидын тунадас үүсгэжээ.'
    }
  },
  {
    id: 'g13',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Magnetic Reversals',
      desc: 'Earth\'s magnetic field flips poles entirely every 200,000 to 300,000 years, magnetic North and South swapping places over millennia.'
    },
    mn: {
      title: 'Соронзон туйлын урвуу эргэлт',
      desc: 'Дэлхийн соронзон орны хойд болон өмнөд туйлууд 200,000 - 300,000 жил тутамд байрлалаа бүрэн сольж урвуу болдог зүй тогтолтой.'
    }
  },
  {
    id: 'g14',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Deep Lithosphere Boundary',
      desc: 'The Lithosphere-Asthenosphere Boundary (LAB) represents the temperature threshold (~1300°C) where rigid rock becomes ductile and ductile mantle convective flow begins.'
    },
    mn: {
      title: 'Литосфер-Астеносферийн хил',
      desc: 'Литосфер-Астеносферийн хил (LAB) нь хатуу чулуулаг хайлж уян хатан шинж чанартай болж эхэлдэг Цельсийн 1300 хэмийн хязгаар юм.'
    }
  },
  {
    id: 'g15',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Fossilized Raindrops',
      desc: 'Geologists have discovered fossilized impressions of individual raindrops preserved in 2.7-billion-year-old volcanic ash layers.'
    },
    mn: {
      title: 'Чулуужсан борооны дуслууд',
      desc: 'Геологичид 2.7 тэрбум жилийн настай галт уулын үнсний давхаргад үлдсэн борооны бие даасан дуслуудын хээ угалзыг нээж илрүүлсэн байдаг.'
    }
  },
  {
    id: 'g16',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Solid state core pressure',
      desc: 'Despite temperatures reaching up to 6000°C, the inner core remains solid because the pressure is over 3.3 million times atmospheric pressure.'
    },
    mn: {
      title: 'Цөмийн асар их даралт',
      desc: 'Дэлхийн дотоод цөм нь 6000 хэм халуун боловч агаар мандлын даралтаас 3.3 сая дахин их даралтын нөлөөгөөр хатуу төлөвтөө хадгалагддаг.'
    }
  },
  {
    id: 'g17',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'The Great Unconformity',
      desc: 'There is a gap in the rock record worldwide representing up to 1.2 billion years of missing geologic time, where sediment deposition ceased and erosion wiped out history.'
    },
    mn: {
      title: 'Агуу Үл Тохирол',
      desc: 'Дэлхийн чулуулгийн давхаргад 1.2 тэрбум гаруй жилийн түүхийг бүрэн арчсан геологийн цаг хугацааны том цоорхой үл тохирол ажиглагддаг.'
    }
  },
  {
    id: 'g18',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Slow Stone Growth',
      desc: 'Stalactites and stalagmites in limestone caves grow at an average rate of only 1 centimeter every 100 to 1,000 years.'
    },
    mn: {
      title: 'Чулуун ургалтын хурд',
      desc: 'Шохойн чулуун агуй дахь унжсан ба ургасан баганууд (сталактит, сталагмит) 100-1000 жилд дунджаар ердөө 1 см ургадаг.'
    }
  },
  {
    id: 'g19',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'Ophiolite Escapes',
      desc: 'Occasionally, slices of the Earth\'s oceanic crust and mantle are shoved onto land during plate collisions, forming rare rocks called ophiolites.'
    },
    mn: {
      title: 'Офиолит чулууны гарал',
      desc: 'Хавтангуудын мөргөлдөөний явцад далайн царцдас ба мантийн хэсэг хуурай газар руу түрэгдэн гарч ирснийг офиолит чулуулаг гэж нэрлэдэг.'
    }
  },
  {
    id: 'g20',
    category: 'geology',
    icon: 'mountain',
    en: {
      title: 'The Yellowstone Supervolcano',
      desc: 'Underneath Yellowstone National Park sits a massive magma chamber that has produced three volcanic eruptions ranking among the largest on Earth.'
    },
    mn: {
      title: 'Йеллоустоуны супер галт уул',
      desc: 'Йеллоустоуны үндэсний паркийн доор дэлхийн түүхэн дэх хамгийн том дэлбэрэлтүүдийг үүсгэсэн асар том магмын хөндий оршиж байдаг.'
    }
  },

  // ==================== HUMAN BODY (20 facts) ====================
  {
    id: 'h1',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Star-forged Blood',
      desc: 'The iron in your blood was forged inside dying giant stars and supernova explosions billions of years ago.'
    },
    mn: {
      title: 'Ододоос төрсөн цус',
      desc: 'Таны цусан дахь төмөр нь олон тэрбум жилийн өмнө мөхөж буй аварга одод болон суперновагийн дэлбэрэлтийн гүнд үүссэн.'
    }
  },
  {
    id: 'h2',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Global Vascular Network',
      desc: 'If stretched end-to-end, an adult’s blood vessels would wrap around the Earth over two times (approx. 100,000 km).'
    },
    mn: {
      title: 'Судасны асар урт сүлжээ',
      desc: 'Хэрэв насанд хүрсэн хүний цусны судсыг сунгаж уртсгавал дэлхийг хоёроос олон удаа тойрох хэмжээний урт (ойролцоогоор 100,000 км) болно.'
    }
  },
  {
    id: 'h3',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Brain Power Generator',
      desc: 'An active, awake brain generates roughly 20 watts of electricity—enough to illuminate a small household LED bulb.'
    },
    mn: {
      title: 'Тархины эрчим хүч',
      desc: 'Таны тархи идэвхтэй ажиллах үедээ 20 ватт орчим цахилгаан эрчим хүч үүсгэдэг бөгөөд энэ нь жижиг LED гэрлийг асаахад хангалттай.'
    }
  },
  {
    id: 'h4',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Bone Steel Comparison',
      desc: 'Human bone is incredibly strong; an ounce of bone is structurally stronger than steel of the same weight.'
    },
    mn: {
      title: 'Ясны бат бөх байдал',
      desc: 'Хүний яс маш бат бөх; нэг унци хэмжээтэй яс нь ижил жинтэй гангаас ч илүү даацтай бүтцийг үүсгэдэг.'
    }
  },
  {
    id: 'h5',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Cosmic Atom Composition',
      desc: "93% of the human body's mass consists of stardust atoms created inside ancient stellar furnaces over cosmic eons."
    },
    mn: {
      title: 'Сансрын атомын бүтэц',
      desc: 'Хүний биеийн жингийн 93% нь сансар огторгуйн урт удаан хугацаанд оддын зууханд бий болсон сансрын тоосонцороос бүрддэг.'
    }
  },
  {
    id: 'h6',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Bacteria Within Us',
      desc: 'There are more microbial cells living on and inside your body than there are human cells in your entire anatomy.'
    },
    mn: {
      title: 'Бидний доторх бактери',
      desc: 'Таны биеийн гадна болон дотор амьдардаг бичил биетүүд нь таны өөрийн эсүүдээс тооны хувьд олон байдаг.'
    }
  },
  {
    id: 'h7',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'The Scent Library',
      desc: 'The human nose is highly advanced and can remember and distinguish between over 50,000 individual scents.'
    },
    mn: {
      title: 'Үнэрийн сан',
      desc: 'Хүний хамар маш өндөр мэдрэмжтэй бөгөөд 50,000 гаруй өөр өөр бие даасан үнэрийг санаж, ялгаж чаддаг.'
    }
  },
  {
    id: 'h8',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Unraveling the Double Helix',
      desc: 'If you uncoiled all the DNA in your cells, it would stretch about 10 billion miles—enough to reach past Pluto and back.'
    },
    mn: {
      title: 'ДНХ-ийн асар урт гинж',
      desc: 'Таны биеийн бүх ДНХ-ийг задалж цуваа болговол 10 тэрбум миль урт болох бөгөөд энэ нь Дэлхийгээс Дэлхий рүү буцах зай юм.'
    }
  },
  {
    id: 'h9',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'The Acidic Cauldron',
      desc: 'Stomach acid is powerful enough to dissolve metallic razor blades, because its pH level is incredibly low (1.5 to 2.0).'
    },
    mn: {
      title: 'Аварга хүчиллэг зуух',
      desc: 'Хүний ходоодны хүчил нь төмөр сахлын хутгыг ч уусгах чадалтай хүчтэй байдаг бөгөөд рН нь ердөө 1.5-2.0 байдаг.'
    }
  },
  {
    id: 'h10',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'The Fastest Pulse',
      desc: 'Nerve impulses travel to and from the brain at speeds of up to 400 kilometers per hour, ensuring rapid reaction times.'
    },
    mn: {
      title: 'Мэдрэлийн хурд',
      desc: 'Мэдрэлийн импульс тархи руу болон тархинаас цагт 400 км хүртэл хурдтайгаар дамжиж, маш хурдан хариу үйлдэл үзүүлэх боломжийг олгодог.'
    }
  },
  {
    id: 'h11',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Blinking Movie Frames',
      desc: 'The average person blinks about 15 to 20 times a minute, which adds up to roughly 10% of their waking hours spent in darkness.'
    },
    mn: {
      title: 'Нүд цавчилт',
      desc: 'Хүн минутад дунджаар 15-20 удаа нүдээ цавчдаг бөгөөд энэ нь сэрүүн байх хугацааныхаа 10%-ийг харанхуйд өнгөрүүлдэг гэсэн үг юм.'
    }
  },
  {
    id: 'h12',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Shedding Dust',
      desc: 'We shed about 30,000 to 40,000 dead skin cells every single minute. Over a lifetime, that equals about 18 kilograms of skin.'
    },
    mn: {
      title: 'Арьсны эсийн гуужилт',
      desc: 'Бид минут тутамд 30,000 - 40,000 үхэжсэн арьсны эсийг гуужуулж байдаг бөгөөд амьдралынхаа туршид 18 кг арьс унагадаг.'
    }
  },
  {
    id: 'h13',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'The Unique Print',
      desc: 'Like fingerprints, every human being has a completely unique tongue print, containing distinctive structural ridges.'
    },
    mn: {
      title: 'Хэлний хээ',
      desc: 'Хурууны хээ шиг хүн бүрийн хэлний хээ, түүний гадаргуугийн бүтэц нь дахин давтагдашгүй өвөрмөц байдаг.'
    }
  },
  {
    id: 'h14',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Water Weight Dominance',
      desc: 'An adult human body is made of about 60% water, with the brain and heart composed of almost three-quarters water.'
    },
    mn: {
      title: 'Усны эзлэх хувь',
      desc: 'Насанд хүрсэн хүний биеийн 60% орчим нь уснаас бүрддэг бөгөөд тархи, зүрхний бараг дөрөвний гурав нь ус байдаг.'
    }
  },
  {
    id: 'h15',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Bioluminescent Humans',
      desc: 'Humans are actually bioluminescent and glow in the dark, but the light emitted is 1,000 times weaker than our eyes can detect.'
    },
    mn: {
      title: 'Гэрэлтдэг хүн',
      desc: 'Хүмүүс үнэндээ өөрсдөөсөө маш сул био-гэрэл ялгаруулж харанхуйд гэрэлтдэг боловч энэ нь хүний нүднээс 1000 дахин сул байдаг.'
    }
  },
  {
    id: 'h16',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Never-resting Cardiac pump',
      desc: 'Over an average lifetime, the human heart will beat more than 2.5 billion times, pumping millions of gallons of blood.'
    },
    mn: {
      title: 'Унтахгүй зүрх',
      desc: 'Хүний амьдралын туршид зүрх дунджаар 2.5 тэрбум гаруй удаа цохилж, асар их хэмжээний цусыг биеэр тасралтгүй шахдаг.'
    }
  },
  {
    id: 'h17',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Focus Muscle Speed',
      desc: 'The muscles that focus your eyes move around 100,000 times a day—the equivalent of walking 80 kilometers for your leg muscles.'
    },
    mn: {
      title: 'Нүдний булчингийн идэвх',
      desc: 'Нүдийг фокусладаг булчин өдөрт 100,000 гаруй удаа хөдөлдөг нь хөлөөрөө 80 км алхсантай ижил ачаалал юм.'
    }
  },
  {
    id: 'h18',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Small intestine Surface Area',
      desc: 'The interior of the small intestine is covered in microscopic folds, giving it a surface area equivalent to a tennis court.'
    },
    mn: {
      title: 'Нарийн гэдэсний талбай',
      desc: 'Нарийн гэдэсний дотоод гадаргуу нь асар олон жижиг нугалаастай тул түүний нийт талбай нь теннисний талбайтай тэнцдэг.'
    }
  },
  {
    id: 'h19',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'The Longevity of Hair',
      desc: 'A single strand of human hair can support a weight of up to 100 grams, and a full head of hair could support up to 12 tons.'
    },
    mn: {
      title: 'Үсний бат бөх чанар',
      desc: 'Хүний нэг ширхэг үс 100 грамм жин даах чадвартай бөгөөд толгой дүүрэн үс нийлбэл 12 тонн хүртэл жинг дааж чадна.'
    }
  },
  {
    id: 'h20',
    category: 'human',
    icon: 'heart',
    en: {
      title: 'Liver Regeneration',
      desc: 'The liver is the only organ in the human body that can regenerate completely from as little as 25% of its original tissue.'
    },
    mn: {
      title: 'Элэгний нөхөн төлжилт',
      desc: 'Элэг бол анхны хэмжээнийхээ ердөө 25%-иас бүрэн хэмжээгээрээ нөхөн төлжиж чаддаг цорын ганц эрхтэн юм.'
    }
  },

  // ==================== OUTER SPACE (20 facts) ====================
  {
    id: 's1',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Neutron Star Density',
      desc: 'A single teaspoon of a neutron star would weigh about 6 billion tons on Earth, equivalent to the weight of Mount Everest.'
    },
    mn: {
      title: 'Нейтрон одны нягт',
      desc: 'Нейтрон одны ердөө нэг цайны халбага хэмжээтэй бодис нь дэлхий дээр ойролцоогоор 6 тэрбум тонн буюу Эверест уулын жинтэй тэнцэнэ.'
    }
  },
  {
    id: 's2',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'The Cauldron of Venus',
      desc: 'Venus is the hottest planet in the Solar System, with surface temperatures hitting 462°C, hot enough to melt solid lead easily.'
    },
    mn: {
      title: 'Халуун Сугар гараг',
      desc: 'Сугар бол манай нарны аймгийн хамгийн халуун гараг бөгөөд гадаргуугийн температур нь 462°C хүрч, цул тугалгыг ч хялбархан хайлуулдаг.'
    }
  },
  {
    id: 's3',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Trees vs. Stars',
      desc: 'There are roughly 3 trillion trees on Earth, which is vastly more than the estimated 100 to 400 billion stars in the Milky Way.'
    },
    mn: {
      title: 'Модод ба Оддын харьцаа',
      desc: 'Дэлхий дээр ойролцоогоор 3 их наяд мод байдаг бөгөөд энэ нь Сүүн замын галактик дахь 100-400 тэрбум ододоос хамаагүй олон юм.'
    }
  },
  {
    id: 's4',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Diamond Rain',
      desc: 'Deep within gas giants like Neptune and Uranus, extreme carbon pressures cause it to literally rain diamonds down the atmosphere.'
    },
    mn: {
      title: 'Алмазан бороо',
      desc: 'Нептун болон Уран зэрэг аварга хийн гарагуудын гүнд асар их нүүрстөрөгчийн даралт нь атмосфероор алмазан бороо оруулах шалтгаан болдог.'
    }
  },
  {
    id: 's5',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'The Silenced Void',
      desc: 'Outer space is completely silent because there is no air or atmosphere to conduct acoustic sound waves.'
    },
    mn: {
      title: 'Чимээгүй хоосон орон зай',
      desc: 'Сансар огторгуйд дууны долгионыг дамжуулах агаар эсвэл хийн орчин байхгүй тул тэнд ямар ч чимээ авиа гардаггүй.'
    }
  },
  {
    id: 's6',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Cold Welding in Space',
      desc: 'If two pieces of the same metal touch in vacuum, they will bond permanently without any heat. This is called cold welding.'
    },
    mn: {
      title: 'Хүйтэн гагнуур',
      desc: 'Хэрэв нэг төрлийн хоёр металл вакуумд бие биедээ хүрвэл ямар ч халаалтгүйгээр шууд холбогдон барьцалддаг бөгөөд үүнийг хүйтэн гагнуур гэдэг.'
    }
  },
  {
    id: 's7',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'The Great Footprint Longevity',
      desc: 'The footprints left by Apollo astronauts on the Moon will probably stay there for at least 100 million years because there is no atmosphere or wind.'
    },
    mn: {
      title: 'Сарны мөрний нас',
      desc: 'Аполлон хөлгийн сансрын нисгэгчдийн Саран дээр үлдээсэн мөр тэнд ямар ч салхи, агаар байхгүй тул дор хаяж 100 сая жил устахгүй хадгалагдана.'
    }
  },
  {
    id: 's8',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'The Giant Water Reservoir',
      desc: 'Astronomers discovered a floating cloud of water vapor in deep space holding 140 trillion times more water than all Earth\'s oceans combined.'
    },
    mn: {
      title: 'Сансар дахь усны асар их нөөц',
      desc: 'Дэлхийн бүх далайн уснаас 140 их наяд дахин их хэмжээний усны уур агуулсан сансрын аварга том усан үүлийг одон орончид нээжээ.'
    }
  },
  {
    id: 's9',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Jupiter\'s Storm longevity',
      desc: 'Jupiter\'s Great Red Spot is a persistent high-pressure storm wider than Earth that has been raging for at least 350 years.'
    },
    mn: {
      title: 'Бархасбадийн улаан толбо',
      desc: 'Бархасбадь гараг дээрх Дэлхийгээс ч том хэмжээтэй Агуу улаан толбо хэмээх асар том хуй салхи дор хаяж 350 жилийн турш тасралтгүй шуурч байна.'
    }
  },
  {
    id: 's10',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'The Expanding Universe',
      desc: 'The universe expands constantly, and distant galaxies are moving away from us faster than the speed of light due to dark energy.'
    },
    mn: {
      title: 'Тэлж буй ертөнц',
      desc: 'Ертөнц тасралтгүй тэлж байгаа бөгөөд харанхуй энергийн нөлөөгөөр алс холын галактикууд биднээс гэрлийн хурднаас ч хурдан холдож байна.'
    }
  },
  {
    id: 's11',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'One Day on Venus',
      desc: 'Venus rotates so slowly that a single day on Venus (one full rotation) lasts longer than a whole Venusian year (one orbit around the Sun).'
    },
    mn: {
      title: 'Сугар гарагийн нэг өдөр',
      desc: 'Сугар гараг тэнхлэгээ маш удаан тойрдог тул Сугарын нэг өдөр нь түүний Нарыг тойрох бүтэн нэг жилээс ч урт үргэлжилдэг.'
    }
  },
  {
    id: 's12',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Olympus Mons on Mars',
      desc: 'Mars has the tallest shield volcano in the solar system, Olympus Mons, standing 22 km high—almost three times taller than Mount Everest.'
    },
    mn: {
      title: 'Ангараг дээрх Олимп уул',
      desc: 'Ангараг гараг дээр нарны аймгийн хамгийн өндөр галт уул болох Олимп оршдог. Энэ нь 22 км өндөр бөгөөд Эверестээс бараг 3 дахин өндөр юм.'
    }
  },
  {
    id: 's13',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'A Shrinking Moon',
      desc: 'As its interior cools, the Moon is literally shrinking, causing its crust to wrinkle and generate tectonic "moonquakes".'
    },
    mn: {
      title: 'Агшиж буй Сар',
      desc: 'Сарны дотоод хэсэг хөрөхийн хэрээр сар агшиж байгаа бөгөөд үүний нөлөөгөөр гадаргуу нь үрчийтэж, "сарны газар хөдлөлт" үүсдэг.'
    }
  },
  {
    id: 's14',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'The Speed of Solar Wind',
      desc: 'The Sun shoots out streams of charged particles called solar wind at speeds reaching up to 1.6 million kilometers per hour.'
    },
    mn: {
      title: 'Нарны салхины хурд',
      desc: 'Нарнаас цацагдах цэнэгтэй бөөмсийн урсгал болох нарны салхи нь цагт 1.6 сая км хүртэлх асар өндөр хурдтайгаар сансарт тархдаг.'
    }
  },
  {
    id: 's15',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Our Star\'s Weight',
      desc: 'The Sun is so massive that it accounts for 99.86% of the entire mass of our Solar System, leaving only 0.14% for all planets combined.'
    },
    mn: {
      title: 'Одны жин',
      desc: 'Нар маш том бөгөөд манай нарны аймгийн нийт жингийн 99.86%-ийг ганцаараа эзэлдэг бөгөөд үлдсэн 0.14% нь бусад бүх гарагууд юм.'
    }
  },
  {
    id: 's16',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Milky Way Collision',
      desc: 'Our Milky Way galaxy is on a collision course with the Andromeda galaxy; they will merge in about 4.5 billion years into one galaxy.'
    },
    mn: {
      title: 'Галактикуудын мөргөлдөөн',
      desc: 'Сүүн зам галактик нь Андромеда галактиктай мөргөлдөх замаар явж байгаа бөгөөд 4.5 тэрбум жилийн дараа нэгдэн шинэ аварга галактик болно.'
    }
  },
  {
    id: 's17',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Saturn\'s Floatable Density',
      desc: 'Saturn has the lowest density of all the planets. If you had a bathtub big enough, Saturn would float on the water.'
    },
    mn: {
      title: 'Усан дээр хөвөх Санчир',
      desc: 'Санчир нь маш бага нягттай хийн гараг юм. Хэрэв Санчир багтах усан сан байсан бол тэрээр усан дээр шууд хөвөх байлаа.'
    }
  },
  {
    id: 's18',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Radio Broadcasts escaping',
      desc: 'Human radio broadcasts from the past 100 years have already traveled through space, reaching stars within a 100 light-year radius.'
    },
    mn: {
      title: 'Сансарт аялах радио долгион',
      desc: 'Хүн төрөлхтний сүүлийн 100 жилд цацсан радио нэвтрүүлгийн долгион сансарт аялж, одоогоор 100 гэрлийн жилийн радиус дахь ододод хүрээд байна.'
    }
  },
  {
    id: 's19',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'Invisible Dark Matter',
      desc: 'Visible stars and planets make up only 5% of the universe. The rest is invisible dark matter (27%) and dark energy (68%).'
    },
    mn: {
      title: 'Үл үзэгдэгч харанхуй бодис',
      desc: 'Бидэнд харагдаж буй одод, гарагууд ертөнцийн ердөө 5%-ийг бүрдүүлдэг. Үлдсэн нь үл үзэгдэх харанхуй бодис (27%) ба харанхуй энерги (68%) юм.'
    }
  },
  {
    id: 's20',
    category: 'space',
    icon: 'orbit',
    en: {
      title: 'The Extreme Pulsar',
      desc: 'Some rotating neutron stars, called pulsars, spin up to 700 times per second, shooting out beams of powerful electromagnetic radiation.'
    },
    mn: {
      title: 'Пульсар одны эргэлт',
      desc: 'Пульсар хэмээх зарим нейтрон одод секунд тутамд 700 гаруй удаа эргэлдэж, асар хүчтэй цахилгаан соронзон цацрагийг цацруулж байдаг.'
    }
  },

  // ==================== DEEP SEA (20 facts) ====================
  {
    id: 'd1',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'The Mariana Abyss',
      desc: 'The Mariana Trench reaches nearly 11,000 meters. If Mount Everest were placed in it, its peak would still be submerged under 2 km of water.'
    },
    mn: {
      title: 'Марианы ангал',
      desc: 'Марианы суваг бараг 11,000 метр гүн юм. Хэрэв Эверест уулыг дотор нь байрлуулбал түүний орой нь 2 км усны дор бүрэн автах болно.'
    }
  },
  {
    id: 'd2',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Aphotic Twilight Zone',
      desc: 'Sunlight never penetrates past 200 meters. In this perpetual cold darkness, bioluminescent creatures produce their own chemical light.'
    },
    mn: {
      title: 'Афотик Харанхуй бүс',
      desc: 'Далайн усны 200 метрээс доош нарны гэрэл хэзээ ч нэвтэрдэггүй. Энэхүү мөнхийн харанхуйд амьтад өөрсдөөсөө химийн гэрэл цацруулдаг.'
    }
  },
  {
    id: 'd3',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Abyssal Vision',
      desc: 'Giant squids hunting in the absolute pitch black of the deep sea possess eyes as large as dinner plates (27 cm) to capture the slightest glow.'
    },
    mn: {
      title: 'Далайн гүний хараа',
      desc: 'Далайн ёроолын түнэр харанхуйд ан хийдэг аварга арваалжууд өчүүхэн төдий гэрэл гялбааг ч олж харахын тулд таваг шиг том (27 см) нүдтэй байдаг.'
    }
  },
  {
    id: 'd4',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Geothermal Vents Life',
      desc: 'Superheated hydrothermal vents spew toxic chemicals at 400°C, yet foster extreme ecosystems of blind crabs and giant tube worms.'
    },
    mn: {
      title: 'Далайн гүний халуун рашаан',
      desc: 'Далайн гүний халуун рашаанууд нь 400°C хүртэлх хорт бодис ялгаруулдаг боловч сохор хавч, аварга хорхой зэрэг тэсвэртэй экосистемийг тэтгэдэг.'
    }
  },
  {
    id: 'd5',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'The Unexplored Frontier',
      desc: "We have better maps of the surface of Mars and the Moon than we do of the Earth's deep ocean floors."
    },
    mn: {
      title: 'Судлагдаагүй хязгаар',
      desc: 'Бидэнд дэлхийн далайн гүний ёроолоос илүү Ангараг гараг болон Саран дээрх гадаргуугийн зураглал илүү нарийвчлалтай байдаг.'
    }
  },
  {
    id: 'd6',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'The Crushing Pressure',
      desc: 'At the bottom of the Mariana Trench, the hydrostatic pressure is over 1,000 times standard atmospheric pressure, equivalent to an elephant standing on your thumb.'
    },
    mn: {
      title: 'Бутлах асар их даралт',
      desc: 'Марианы сувгийн ёроол дахь даралт нь агаар мандлын даралтаас 1000 дахин их байдаг нь таны эрхий хуруун дээр заан зогсохтой адил хүч юм.'
    }
  },
  {
    id: 'd7',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Deep Sea Glass Sponge',
      desc: 'Deep sea glass sponges build skeletons made of natural silica (glass) that can channel light like modern fiber-optic cables.'
    },
    mn: {
      title: 'Шилэн хөвөн биет',
      desc: 'Далайн гүний шилэн хөвөн биетүүд нь байгалийн цахиур (шил)-аас бүрдэх араг ясыг үүсгэдэг бөгөөд энэ нь оптик шилэн кабель шиг гэрэл дамжуулдаг.'
    }
  },
  {
    id: 'd8',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Chemosynthesis Wonders',
      desc: 'Instead of using sunlight, deep sea vent ecosystems rely on chemosynthesis, where specialized bacteria turn toxic hydrogen sulfide into food energy.'
    },
    mn: {
      title: 'Хемосинтезийн гайхамшиг',
      desc: 'Нарны гэрлийн оронд далайн гүний амьдрал хемосинтез дээр тогтдог. Тэнд тусгай бактериуд хорт устөрөгчийн сульфидыг хоол тэжээлийн энерги болгодог.'
    }
  },
  {
    id: 'd9',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'The Slow Greenland Shark',
      desc: 'Greenland Sharks live in cold Arctic abyssal depths and can survive for over 400 years, reaching sexual maturity only at age 150.'
    },
    mn: {
      title: 'Гренландын аварга загас',
      desc: 'Арктикийн хүйтэн гүнд амьдардаг Гренландын акул 400 гаруй жил амьдардаг бөгөөд ердөө 150 нас хүрсэн хойноо үржилд орох чадвартай болдог.'
    }
  },
  {
    id: 'd10',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Zombie Worms',
      desc: 'Deep-sea Osedax worms (zombie worms) eat the solid bones of dead whales that sink to the ocean floor, using acid to extract nutrients.'
    },
    mn: {
      title: 'Зомби өтнүүд',
      desc: 'Далайн гүний Оседакс өтнүүд (зомби өт) далайн ёроолд унасан үхсэн халимны ясыг хүчлээр хайлуулан тэжээлээ сорж амьдардаг.'
    }
  },
  {
    id: 'd11',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Deep Ocean Water Age',
      desc: 'The deep water currents move so slowly that some water at the bottom of the Pacific Ocean has not seen daylight for over 1,000 years.'
    },
    mn: {
      title: 'Мянган жилийн настай ус',
      desc: 'Гүний далайн урсгал маш удаан хөдөлдөг тул Номхон далайн ёроол дахь зарим ус 1000 гаруй жилийн турш нарны гэрэл хараагүй байна.'
    }
  },
  {
    id: 'd12',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Sinking Whale Falls',
      desc: 'When a whale dies, its carcass sinks to the abyssal floor, creating a thriving mini-ecosystem ("whale fall") that feeds hundreds of species for up to 50 years.'
    },
    mn: {
      title: 'Халимны сэгний экосистем',
      desc: 'Халим үхэж ёроол руу живэхэд түүний сэг нь 50 жилийн турш зуу зуун зүйлийн амьтдыг тэжээх бие даасан экосистем ("whale fall")-ийг үүсгэдэг.'
    }
  },
  {
    id: 'd13',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Gelatinous blob fish',
      desc: 'The blobfish has no bones or muscles. Its jelly-like flesh is slightly less dense than water, letting it float above the high-pressure seafloor.'
    },
    mn: {
      title: 'Бат бөх биш "Блоб" загас',
      desc: 'Блоб загасанд ямар ч яс, булчин байхгүй бөгөөд түүний цэлцэгнүүр бие нь усны нягтаас бага тул өндөр даралттай гүнд хялбар хөвдөг.'
    }
  },
  {
    id: 'd14',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'The Gulper Eel Mouth',
      desc: 'The Gulper Eel can unhinge its massive mouth to swallow prey much larger than its own body size in the resource-scarce bathyal zone.'
    },
    mn: {
      title: 'Ууттай могой загас',
      desc: 'Далайн гүн дэх ууттай могой загас (Gulper Eel) хоол тэжээл ховор газар өөрийн биенээсээ хамаагүй том амьтдыг ч залгих аварга том амтай.'
    }
  },
  {
    id: 'd15',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Deep Sea Brine Lakes',
      desc: 'There are actual lakes and rivers at the bottom of the ocean with shorelines and currents, made of extremely dense, salty brine water.'
    },
    mn: {
      title: 'Далайн ёроолын давст нуур',
      desc: 'Далайн ёроолд асар их нягттай, хэт давслаг уснаас бүтсэн, өөрийн гэсэн эрэг хязгаартай усан доорх нуур, голууд оршдог.'
    }
  },
  {
    id: 'd16',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'The Black Smoker Chimneys',
      desc: 'Hydrothermal vents form mineral towers called "black smokers" that can reach heights of up to 60 meters, venting sulfur-rich fluids.'
    },
    mn: {
      title: 'Хар утаат яндангууд',
      desc: 'Далайн халуун рашаанууд нь хүхэрлэг шингэн цацруулж, 60 метр хүртэл өндөртэй эрдэст "хар утаат яндан" цамхагуудыг үүсгэдэг.'
    }
  },
  {
    id: 'd17',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Bioluminescent Flashlight Fish',
      desc: 'Flashlight fish harbor symbiotic glowing bacteria underneath their eyes, which they can "turn off" by pulling a membrane lid over them.'
    },
    mn: {
      title: 'Гэрэлтэгч "Гэрэлт халаас" загас',
      desc: 'Гэрэлт халаас загас нүднийхээ доор гэрэлтдэг бактериудыг агуулдаг бөгөөд арьсан бүрхэвчээ татаж гэрлээ унтраах чадвартай байдаг.'
    }
  },
  {
    id: 'd18',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Deep Sea Gigantism',
      desc: 'Many deep-sea invertebrates grow to monstrous sizes compared to shallow-water relatives, like giant isopods that look like huge pillbugs.'
    },
    mn: {
      title: 'Далайн гүний гигантизм',
      desc: 'Далайн гүний олон сээр нуруугүй амьтад гүехэн уснаас хамаагүй том болж ургадаг (аварга изопод, аварга наймаалж гэх мэт).'
    }
  },
  {
    id: 'd19',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'The Ageless Jellyfish',
      desc: 'Turritopsis dohrnii is a tiny deep ocean jellyfish that can reset its cellular cycle, reversing back to a polyp state to live forever.'
    },
    mn: {
      title: 'Үхэшгүй мөнхийн медуз',
      desc: 'Турритопсис дорний хэмээх жижиг медуз нь эсийнхээ мөчлөгийг ухрааж, дахин залуу болох замаар үхэлгүй мөнх амьдрах чадвартай.'
    }
  },
  {
    id: 'd20',
    category: 'deepsea',
    icon: 'waves',
    en: {
      title: 'Seafloor Iron Meteors',
      desc: 'The deep ocean floor is littered with micrometeorites—tiny iron dust grains that fall from outer space and slowly settle through water.'
    },
    mn: {
      title: 'Далайн ёроолын солирын тоос',
      desc: 'Далайн гүн ёроолд сансар огторгуйгаас унаж, усаар дамжин маш удаан тунасан бичил төмөр солирын тоосонцрууд их хэмжээгээр байдаг.'
    }
  },

  // ==================== OCEAN (20 facts) ====================
  {
    id: 'o1',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Submarine Volcanic Dominance',
      desc: 'Over 90% of all volcanic eruptions occur underwater. These shape immense thermal vent chimneys and nurture alien-like deep ecosystems.'
    },
    mn: {
      title: 'Далайн доорх галт уулс',
      desc: 'Нийт галт уулын дэлбэрэлтийн 90 гаруй хувь нь далайн дор явагддаг бөгөөд асар том дулааны уурхай үүсгэж хачин сонин амьдралыг тэтгэдэг.'
    }
  },
  {
    id: 'o2',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'The Great Ocean Conveyor',
      desc: 'Oceans circulate water globally via a massive conveyor belt current. It takes a single water parcel roughly 1,000 years to complete the loop.'
    },
    mn: {
      title: 'Далайн агуу конвейер',
      desc: 'Далайн урсгал нь дэлхий даяар усыг маш том конвейер шиг эргэлдүүлдэг. Нэг дусал ус энэ тойргийг бүрэн дуусгахад ойролцоогоор 1000 жил зарцуулдаг.'
    }
  },
  {
    id: 'o3',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Liquid Gold Reserves',
      desc: 'The oceans hold an estimated 20 million tons of gold dissolved within their waters—enough to give every person on Earth 4.5 kilograms.'
    },
    mn: {
      title: 'Ууссан алтны нөөц',
      desc: 'Далайн усанд ойролцоогоор 20 сая тонн алт ууссан байдаг бөгөөд энэ нь дэлхийн хүн бүрт 4.5 кг алт оногдох хэмжээний их нөөц юм.'
    }
  },
  {
    id: 'o4',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Oxygen Production Giants',
      desc: "Marine organisms, mainly phytoplankton, generate over 50% of the oxygen in Earth's atmosphere."
    },
    mn: {
      title: 'Хүчилтөрөгчийн үүсэл',
      desc: 'Далайн бичил биетүүд болон фитопланктонууд нь Дэлхийн агаар мандал дахь хүчилтөрөгчийн 50 гаруй хувийг дангаараа бүрдүүлдэг.'
    }
  },
  {
    id: 'o5',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'The Largest Animal Alive',
      desc: 'The Blue Whale, the largest animal ever known to live on Earth, relies entirely on oceans to support its massive 190-ton weight.'
    },
    mn: {
      title: 'Хамгийн том халим',
      desc: 'Дэлхий дээр амьдарч байсан хамгийн том амьтан болох Хөх Халим нь 190 тонн жингээ тэтгэхийн тулд зөвхөн далайн уснаас бүрэн хамаардаг.'
    }
  },
  {
    id: 'o6',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'The Mid-Ocean Ridge length',
      desc: 'The longest mountain range on Earth is actually underwater—the Mid-Ocean Ridge stretches over 65,000 kilometers across the globe.'
    },
    mn: {
      title: 'Далайн дундах нуруу',
      desc: 'Дэлхийн хамгийн урт уулсын систем усан доор байдаг. Далайн дундах нуруу нь дэлхийг тойрон 65,000 гаруй км урт үргэлжилдэг.'
    }
  },
  {
    id: 'o7',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Earth\'s Giant Heat Buffer',
      desc: 'Our oceans absorb over 90% of the excess heat generated by global greenhouse gas emissions, regulating global climate.'
    },
    mn: {
      title: 'Халуун шингээгч буфер',
      desc: 'Далай нь хүлэмжийн хийнээс үүдэлтэй илүүдэл дулааны 90 гаруй хувийг шингээж, дэлхийн уур амьсгалыг тэнцвэржүүлдэг.'
    }
  },
  {
    id: 'o8',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Giant Pacific Garbage Patch',
      desc: 'The Great Pacific Garbage Patch is a swirling vortex of marine debris and microplastics twice the size of Texas floating in the North Pacific.'
    },
    mn: {
      title: 'Номхон далайн хогны арал',
      desc: 'Номхон далайн хойд хэсэгт Техас мужийн газар нутгаас хоёр дахин том хэмжээтэй хуванцар хог хаягдлын асар том эргүүлэг арал хөвж байна.'
    }
  },
  {
    id: 'o9',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Coral Reef Biodiversities',
      desc: 'Coral reefs occupy less than 0.1% of the ocean floor, yet provide shelter and resources for over 25% of all marine life.'
    },
    mn: {
      title: 'Шүрэн хадны баялаг',
      desc: 'Шүрэн хаднууд далайн ёроолын ердөө 0.1%-ийг эзэлдэг боловч далайн нийт амьд биетүүдийн 25 гаруй хувийг хоргодох байраар хангадаг.'
    }
  },
  {
    id: 'o10',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'The Loudest Wave sound',
      desc: 'In 1997, scientists detected an ultra-low frequency underwater sound called "The Bloop," later identified as a massive Antarctic icequake.'
    },
    mn: {
      title: 'Хамгийн чанга усан доорх дуу',
      desc: '1997 онд эрдэмтэд "Блүүп" хэмээх асар чанга усан доорх дуу чимээ бүртгэсэн бөгөөд энэ нь Антарктидын мөсөн уулын хагарлын чимээ байжээ.'
    }
  },
  {
    id: 'o11',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Rogue Waves reality',
      desc: 'Rogue waves are massive, spontaneous walls of water reaching heights of 30 meters, once thought to be myths but now confirmed by satellites.'
    },
    mn: {
      title: 'Үлэмж догшин давалгаанууд',
      desc: 'Урьд нь домог гэж үздэг байсан 30 метр өндөр аварга, гэнэтийн "догшин давалгаанууд" (rogue waves) бодитой байдгийг хиймэл дагуул баталжээ.'
    }
  },
  {
    id: 'o12',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'The Deep Water Pressure Gradient',
      desc: 'For every 10 meters of depth you descend into the ocean, the water pressure increases by exactly one full atmosphere.'
    },
    mn: {
      title: 'Далайн гүний даралтын өсөлт',
      desc: 'Далайн усан доош 10 метр гүн орох тутамд усны даралт яг нэг агаар мандлын даралтаар (1 atm) нэмэгдэн ихэсдэг.'
    }
  },
  {
    id: 'o13',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'The Great Barrier Reef size',
      desc: 'The Great Barrier Reef is the largest living structure on the planet, stretching over 2,300 km and even visible from outer space.'
    },
    mn: {
      title: 'Их шүрэн далангийн хэмжээ',
      desc: 'Их шүрэн далан бол дэлхий дээрх хамгийн том амьд организмын бүтэц бөгөөд 2300 гаруй км урт, сансраас ч харагддаг.'
    }
  },
  {
    id: 'o14',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Ocean Salinity Origin',
      desc: 'The salt in the ocean comes from rocks on land; rainwater washes mineral ions into rivers, which eventually deposit them in oceans over eons.'
    },
    mn: {
      title: 'Далайн усны давсны эх үүсвэр',
      desc: 'Далайн давс нь хуурай газрын чулуулгаас гаралтай; борооны ус эрдэст ионуудыг угааж голуудаар дамжуулан далайд олон сая жил хуримтлуулжээ.'
    }
  },
  {
    id: 'o15',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Sargasso Sea with no shores',
      desc: 'The Sargasso Sea is the only sea on Earth that has no land boundary, defined entirely by four surrounding ocean currents.'
    },
    mn: {
      title: 'Эрэггүй Саргассын тэнгис',
      desc: 'Саргассын тэнгис бол дэлхий дээрх хуурай газрын хилгүй цорын ганц тэнгис бөгөөд түүнийг тойрон эргэх 4 далайн урсгал хязгаарладаг.'
    }
  },
  {
    id: 'o16',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'The Atlantic Expansion',
      desc: 'The Atlantic Ocean is growing wider by 2 to 4 centimeters each year, while the Pacific Ocean is slowly shrinking due to subduction zones.'
    },
    mn: {
      title: 'Атлантын далайн тэлэлт',
      desc: 'Атлантын далай жил бүр 2-4 см-ээр тэлж өргөжиж байгаа бол Номхон далай тектоник хавтангийн живэлтийн улмаас бага багаар хумигдаж байна.'
    }
  },
  {
    id: 'o17',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Underwater Waterfalls',
      desc: 'The largest waterfall on Earth is underwater in the Denmark Strait, where cold, dense Arctic water drops 3,500 meters beneath warmer Atlantic water.'
    },
    mn: {
      title: 'Усан доорх агуу хүрхрээ',
      desc: 'Дэлхийн хамгийн том хүрхрээ Дани сувгийн усан доор байдаг. Тэнд туйлын хүйтэн ус Атлантын дулаан усан доогуур 3500 метр доош унадаг.'
    }
  },
  {
    id: 'o18',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Acoustic Sound Channel',
      desc: 'The SOFAR channel is an ocean layer where sound travels at its slowest speed, acting as a waveguide that lets whale calls travel thousands of miles.'
    },
    mn: {
      title: 'Усан доорх дууны суваг',
      desc: 'SOFAR суваг нь дуу хамгийн бага хурдтай дамжих далайн гүний давхарга бөгөөд халимуудын дууг мянган милийн цааш хүргэх дамжуулагч болдог.'
    }
  },
  {
    id: 'o19',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'Tidal Forces and Moon',
      desc: 'Ocean tides are caused by the gravitational pull of the Moon and the Sun, with the Moon having more than double the tidal influence of the Sun.'
    },
    mn: {
      title: 'Далайн түрлэг ба Сарны хүч',
      desc: 'Далайн түрлэг нь Сар ба Нарны татах хүчний нөлөөгөөр үүсдэг бөгөөд Сарны үзүүлэх нөлөө Нарнаас хоёр дахин их байдаг.'
    }
  },
  {
    id: 'o20',
    category: 'ocean',
    icon: 'droplet',
    en: {
      title: 'The Deep Sea Carbon Sink',
      desc: 'Oceans store nearly 50 times more carbon than the atmosphere, playing an irreplaceable role in mitigating human carbon dioxide emissions.'
    },
    mn: {
      title: 'Нүүрстөрөгчийн аварга шингээгч',
      desc: 'Далай нь агаар мандлаас 50 дахин их нүүрстөрөгчийг өөртөө хуримтлуулж хадгалдаг тул уур амьсгалын өөрчлөлтийг сааруулах гол хүчин зүйл юм.'
    }
  }
];
