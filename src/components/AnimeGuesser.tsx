import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Flame, Heart, Timer, RotateCcw, CheckCircle2, XCircle, Sparkles, HelpCircle, Volume2, VolumeX, Settings } from 'lucide-react';
import { QUESTIONS_EN, uiTranslations } from './GuesserTranslations';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  hint?: string;
  image?: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Луффигийн хамгийн анхны багийн гишүүн хэн бэ?",
    options: ["Зоро (Zoro)", "Нами (Nami)", "Усопп (Usopp)", "Санжи (Sanji)"],
    answer: "Зоро (Zoro)",
    hint: "Нэгэн цагт Тэнүүчлэн ангууч гэгддэг байсан сэлэмтэн.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    question: "Death Note аниме дээрх үхлийн бурхан Люк-ийн дуртай жимс юу вэ?",
    options: ["Банана (Banana)", "Гүзээлзгэнэ (Strawberry)", "Алим (Apple)", "Усан үзэм (Grape)"],
    answer: "Алим (Apple)",
    hint: "Улаан бөгөөд шүүслэг, дэлхийнх илүү амттай гэдэг.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    question: "Нарутогийн хамгийн анхны багш хэн бэ?",
    options: ["Какаши (Kakashi)", "Жирайя (Jiraiya)", "Ирүка (Iruka)", "Гуравдугаар Хокагэ"],
    answer: "Ирүка (Iruka)",
    hint: "Духан дээрээ хэвтээ сорвитой, Нарутог бага байхад нь ганцаараа ойлгож хайрласан багш.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    question: "Demon Slayer (Чөтгөр ангууч) анимений гол дүрийн хүүгийн нэр хэн бэ?",
    options: ["Зэницу (Zenitsu)", "Танжиро (Tanjiro)", "Иносүкэ (Inosuke)", "Гиюү (Giyu)"],
    answer: "Танжиро (Tanjiro)",
    hint: "Дүү Незукогоо буцааж хүн болгохоор чөтгөрүүдтэй тэмцдэг.",
    image: "https://images.unsplash.com/photo-1524135329990-07660cd5bf10?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    question: "Хаяо Миязакигийн хамгийн алдартай, Оскарын шагнал хүртсэн алдарт бүтээл аль нь вэ?",
    options: ["My Neighbor Totoro", "Howl's Moving Castle", "Spirited Away", "Princess Mononoke"],
    answer: "Spirited Away",
    hint: "Тихиро охины хачин жигтэй халуун усны газарт өнгөрүүлсэн түүх.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    question: "Jujutsu Kaisen-ий хамгийн хүчирхэг шидтэн хэн бэ?",
    options: ["Итадори Юүжи (Yuji Itadori)", "Фүшигүро Мэгүми (Megumi)", "Гожо Сатору (Gojo Satoru)", "Нанами Кэнто (Nanami)"],
    answer: "Гожо Сатору (Gojo Satoru)",
    hint: "Нүдний боолттой, Хязгааргүй хоосон орон зайн эзэн.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    question: "One Punch Man-ий гол дүр Саитама яагаад үсээ алдаж халзан болсон бэ?",
    options: ["Бурхны хараалаас болж", "Хэт их, шаргуу дасгал хийснээс болж", "Хорон санаатны тусгай туяанаас болж", "Удамшлын халзралт"],
    answer: "Хэт их, шаргуу дасгал хийснээс болж",
    hint: "Өдөр бүр 100 суниалт, 100 squats, 10км гүйлт хийдэг байсан.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    question: "Attack on Titan анимед хүн төрөлхтнийг хамгаалдаг хамгийн гаднах ханыг юу гэж нэрлэдэг вэ?",
    options: ["Мариа хана (Wall Maria)", "Роуз хана (Wall Rose)", "Сина хана (Wall Sina)", "Титаны хана (Wall Titan)"],
    answer: "Мариа хана (Wall Maria)",
    hint: "Эхний ангид Колоссал титаны дайралтаар нурдаг хана.",
    image: "https://images.unsplash.com/photo-1486873249359-2731bd6dafc7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 9,
    question: "Dragon Ball анимед Сон Гокугийн төрөлх Саиян гаригийн нэр юу вэ?",
    options: ["Намэк гариг (Planet Namek)", "Вегета гариг (Planet Vegeta)", "Фрийза гариг", "Дэлхий (Earth)"],
    answer: "Вегета гариг (Planet Vegeta)",
    hint: "Түүний өрсөлдөгч хунтайжтай ижил нэртэй гариг.",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 10,
    question: "Hunter x Hunter анимений гол дүр Гон-ын хамгийн сайн найзыг хэн гэдэг вэ?",
    options: ["Курапика (Kurapika)", "Леорио (Leorio)", "Киллуа (Killua)", "Хисока (Hisoka)"],
    answer: "Киллуа (Killua)",
    hint: "Золдик алуурчны гэр бүлээс гаралтай, цахилгаан ашигладаг хүү.",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 11,
    question: "Fullmetal Alchemist анимед Элрик ах дүүсийн алдсан биеэ буцаан авахын тулд хайж буй зүйл юу вэ?",
    options: ["Мөнхийн ус (Elixir of Life)", "Гүн ухаантны чулуу (Philosopher's Stone)", "Ган хавтан", "Хөрвүүлэлтийн тойрог"],
    answer: "Гүн ухаантны чулуу (Philosopher's Stone)",
    hint: "Тэнгэрийн ухаан, тэнцүү солилцооны дүрмийг зөрчих хүчтэй чулуу.",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 12,
    question: "My Hero Academia аниме дээр Дэкү-ийн хүлээн авсан хүчирхэг чадварыг юу гэж нэрлэдэг вэ?",
    options: ["All for One", "One for All", "Explosion", "Half-Cold Half-Hot"],
    answer: "One for All",
    hint: "Үеэс үед уламжлагдан дамжиж ирсэн, Бүхний тусын тулд нэгэн хүч.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 13,
    question: "Bleach анимений гол дүрийн хүүгийн нэр хэн бэ?",
    options: ["Ичиго Күрөсаки (Ichigo Kurosaki)", "Рэнжи Абараи (Renji Abarai)", "Урюү Ишида (Uryu Ishida)", "Ясутора Садо (Yasutora Sado)"],
    answer: "Ичиго Күрөсаки (Ichigo Kurosaki)",
    hint: "Лууван шиг улбар шар үстэй, Шинигамигийн (Үхлийн элч) хүчийг авсан хүү.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 14,
    question: "Tokyo Ghoul анимений гол дүр Кэн Канэки ямар хэргийн улмаас хагас гүүл (ghoul) болдог вэ?",
    options: ["Гүүлд хазуулж амьд үлдсэнээс болж", "Гүүлийн эрхтэн шилжүүлэн суулгуулснаас болж", "Тусгай эм ууснаас болж", "Төрөлхийн гүүлийн удамшилтай байсан"],
    answer: "Гүүлийн эрхтэн шилжүүлэн суулгуулснаас болж",
    hint: "Риза нэртэй гүүл охины дайралтад өртөж, эмнэлэгт түүний эрхтнийг суулгуулдаг.",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 15,
    question: "Sword Art Online анимед Киритогийн гол зэвсэг болох хар сэлэмний нэр юу вэ?",
    options: ["Elucidator", "Dark Repulser", "Excalibur", "Lambent Light"],
    answer: "Elucidator",
    hint: "50-р давхрын боссоос унасан, Киритогийн хос сэлэмний баруун гартаа барьдаг хар өнгөтэй сэлэм.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 16,
    question: "Chainsaw Man анимений гол дүр Дэнжи-ийн гэрээ байгуулсан хөрөөт чөтгөр нохойны нэр юу вэ?",
    options: ["Кони (Koni)", "Почита (Pochita)", "Курама (Kurama)", "Аки (Aki)"],
    answer: "Почита (Pochita)",
    hint: "Духан дээрээ хөрөөтэй, маш өхөөрдөм улбар шар өнгөтэй чөтгөр нохой.",
    image: "https://images.unsplash.com/photo-1533929736458-ca588eb77445?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 17,
    question: "Sailor Moon анимений гол дүрийн охины жинхэнэ нэр хэн бэ?",
    options: ["Усаги Цукино (Usagi Tsukino)", "Рэй Хино (Rei Hino)", "Ами Мизуно (Ami Mizuno)", "Минако Аино (Minako Aino)"],
    answer: "Усаги Цукино (Usagi Tsukino)",
    hint: "Нэр нь япон хэлээр 'Саран дээрх туулай' гэсэн утгатай.",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 18,
    question: "Steins;Gate анимений гол дүр Окабэ Ринтаро өөрийгөө ямар нэрээр дууддаг вэ?",
    options: ["Хооин Кёома (Hououin Kyouma)", "Жон Титор (John Titor)", "Кристина (Christina)", "Маюри (Mayuri)"],
    answer: "Хооин Кёома (Hououin Kyouma)",
    hint: "Өөрийгөө галзуу эрдэмтэн гэж нэрлэдэг түүний зохиомол нууц нэр.",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 19,
    question: "Fairy Tail анимед Нацу Драгнил ямар төрлийн шид ашигладаг вэ?",
    options: ["Мөсний шид (Ice Make)", "Луугийн алуурчны галын шид (Fire Dragon Slayer)", "Тэнгэрийн шид (Sky Magic)", "Үгийн шид (Letter Magic)"],
    answer: "Луугийн алуурчны галын шид (Fire Dragon Slayer)",
    hint: "Түүнийг өсгөсөн галын луу Игнилээс сурсан шид.",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 20,
    question: "Neon Genesis Evangelion анимед гол дүр Шиндзи Икари ямар дугаартай Ева (Evangelion)-г жолооддог вэ?",
    options: ["Eva-00", "Eva-01", "Eva-02", "Eva-05"],
    answer: "Eva-01",
    hint: "Ягаан хөх өнгөтэй, түүний ээжийн сүнсийг агуулсан анхдагч загвар.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 21,
    question: "Black Clover анимений гол дүр Аста яагаад шид ашигладдаггүй вэ?",
    options: ["Шидийн хүчгүй (Mana) төрсөн учраас", "Шидийг нь хэн нэгэн хулгайлсан тул", "Бага байхдаа гэмтэл авсан тул", "Улсынхаа хуулиар хориглогдсон учраас"],
    answer: "Шидийн хүчгүй (Mana) төрсөн учраас",
    hint: "Тэрээр шидийн хүчгүй төрсөн ч үүнийгээ нөхөж маш их биеийн бэлтгэл хийдэг.",
    image: "https://images.unsplash.com/photo-1519074069444-1ba4e6663104?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 22,
    question: "Haikyuu!! анимений гол дүр Хината Шоёо ямар байрлалд тоглодог вэ?",
    options: ["Setter (Холбогч)", "Libero (Амрагч)", "Middle Blocker (Дунд хамгаалагч)", "Wing Spiker (Довтлогч)"],
    answer: "Middle Blocker (Дунд хамгаалагч)",
    hint: "Хэдийгээр намхан ч гэсэн маш өндөр үсрэх чадвартай учир дунд хамгаалалтын байрлалд тоглодог.",
    image: "https://images.unsplash.com/photo-1592656094267-764a45159012?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 23,
    question: "Mob Psycho 100 анимений гол дүр Шигэо Кагэямагийн багш, өөрийгөө хүчирхэг шидтэн гэж нэрлэдэг залилагч хэн бэ?",
    options: ["Рэйгэн Аратака (Reigen Arataka)", "Рицу Кагэяма (Ritsu)", "Тэруки Ханазава (Teruki)", "Димпл (Dimple)"],
    answer: "Рэйгэн Аратака (Reigen Arataka)",
    hint: "Хэдий шидийн хүчгүй ч гэсэн ярианы урлаг, массажаараа үйлчлүүлэгчдийг татдаг.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 24,
    question: "One Piece анимед Гранд Лайн (Grand Line) урсгалыг хуваадаг том тивийг юу гэж нэрлэдэг вэ?",
    options: ["Рэд Лайн (Red Line)", "Кальм Бэлт (Calm Belt)", "Скайпиа (Skypiea)", "Шинэ Ертөнц (New World)"],
    answer: "Рэд Лайн (Red Line)",
    hint: "Дэлхийг бүтэн тойрсон улаан шороон аварга том хад/тив.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 25,
    question: "Naruto аниме дээр Саскэ Учихаг багийн гишүүнээсээ явж, Орочимарутай нэгдэхэд хүргэсэн гол зорилго нь юу байсан бэ?",
    options: ["Ах Итачигаас өшөө авахын тулд", "Коноха тосгоныг устгахын тулд", "Хокагэ болохын тулд", "Сакураг өөртөө татахын тулд"],
    answer: "Ах Итачигаас өшөө авахын тулд",
    hint: "Гэр бүл, овгийг нь устгасан ахаа хөнөөх хүч чадлыг олж авахыг хүссэн.",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 26,
    question: "Demon Slayer анимед Незуко яагаад амндаа хулс зууж явдаг вэ?",
    options: ["Хүн хазаж, цус сорохоос сэргийлж", "Ярьж сурахгүйн тулд", "Хулсанд дуртай учраас", "Шидээ хадгалахын тулд"],
    answer: "Хүн хазаж, цус сорохоос сэргийлж",
    hint: "Усан багана Гиюү түүнд зүүлгэсэн бөгөөд чөтгөрийн зөн совингоо хянах тусламж болдог.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 27,
    question: "Attack on Titan анимед хамгийн анхны ухаант титан (Founding Titan)-ыг авсан түүхэн эмэгтэйн нэр хэн бэ?",
    options: ["Имир Фриц (Ymir Fritz)", "Хисториа Рейсс (Historia Reiss)", "Микаса Аккерман (Mikasa)", "Карла Йегер (Carla)"],
    answer: "Имир Фриц (Ymir Fritz)",
    hint: "2000 жилийн өмнө титаны эх үүсвэртэй холбогдсон боол охин.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 28,
    question: "Code Geass анимед Лелуш Ламперужийн авсан өрөөсөн нүдэнд нь гэрэлтдэг, хүнийг удирдах чадварыг юу гэж нэрлэдэг вэ?",
    options: ["Geass", "Sharingan", "Byakugan", "Death Eye"],
    answer: "Geass",
    hint: "Хааны тушаал шиг нэг удаа ямар ч хүнийг бүрэн үгэндээ оруулах чадвар.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 29,
    question: "Death Note анимед L-ийн залгамжлагч бөгөөд Кираг барьж чаддаг цагаан үстэй хүүгийн нэр хэн бэ?",
    options: ["Ниар (Near)", "Мэлло (Mello)", "Мацуда (Matsuda)", "Миса (Misa)"],
    answer: "Ниар (Near)",
    hint: "Таавар, тоглоомоор тоглох дуртай, SPK байгууллагын удирдагч.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 30,
    question: "Spy x Family анимед Лоид Форжер (Цагаан зүс)-ийн нууц ажиллагааны нэр юу вэ?",
    options: ["Operation Strix", "Operation Owl", "Operation Eclipse", "Operation Twilight"],
    answer: "Operation Strix",
    hint: "Энх тайвныг хамгаалахын тулд гэр бүл зохиож, бай руу ойртох төлөвлөгөө.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 31,
    question: "Your Name (Kimi no Na wa) анимед гол дүрүүд болох Таки, Мицуха нарын бие солигдоход нөлөөлсөн сансрын үзэгдэл юу вэ?",
    options: ["Сүүлт одны уналт (Comet Passing)", "Нарны хиртэлт", "Сарны хиртэлт", "Сансрын шуурга"],
    answer: "Сүүлт одны уналт (Comet Passing)",
    hint: "1200 жилийн мөчлөгтэй Тиамат сүүлт од дэлхийн хажуугаар өнгөрөх үе.",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 32,
    question: "Bleach анимед Ичигогийн ашигладаг сэлэмний нэр юу вэ?",
    options: ["Zangetsu", "Senbonzakura", "Hyorinmaru", "Zabimaru"],
    answer: "Zangetsu",
    hint: "Япон хэлээр 'Үлдэгч сар' гэсэн утгатай, аварга том хар хутга шиг хэлбэртэй сэлэм.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 33,
    question: "Jujutsu Kaisen анимед Итадори Юүжи ямар хараагдсан зүйлийг залгиж Сүкүнагийн биеллэлийг өөртөө авдаг вэ?",
    options: ["Сүкүнагийн хуруу (Sukuna's Finger)", "Улаан нүд", "Шидэт зүү", "Хараалтай яс"],
    answer: "Сүкүнагийн хуруу (Sukuna's Finger)",
    hint: "Нийт 20 ширхэг байдаг, Сүкүнагийн хараагдсан хурууны нэг.",
    image: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 34,
    question: "My Neighbor Totoro анимений Тоторо ямар амьтан бэ?",
    options: ["Ойн савдаг / Сүнс (Forest Spirit)", "Баавгай", "Муур", "Туулай"],
    answer: "Ойн савдаг / Сүнс (Forest Spirit)",
    hint: "Ойн гүнд амьдардаг, аварга том, зөөлөн биетэй ойн хамгаалагч.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 35,
    question: "Vinland Saga анимед Торфинны эцэг Торсыг хэн хөлсний алуурчдын занганд оруулан хөнөөдөг вэ?",
    options: ["Аскеладд (Askeladd)", "Флоки (Floki)", "Торкелл (Thorkell)", "Канут (Canute)"],
    answer: "Аскеладд (Askeladd)",
    hint: "Торфинны өшөөгөө авахыг хүссэн, зальтай ухаалаг викинг ахлагч.",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 36,
    question: "Hunter x Hunter анимед Гон, Киллуа хоёр нэн ховор 'Greed Island' тоглоомыг хаанаас олж тоглодог вэ?",
    options: ["Гон-ы аавын үлдээсэн санах ойгоор", "Дуудлага худалдаанаас", "Нууц агуйгаас", "Хантерийн холбооны төвөөс"],
    answer: "Гон-ы аавын үлдээсэн санах ойгоор",
    hint: "Аав Жин Фрийксийнх нь үлдээсэн Memory Card болон JoyStation консолын тусламжтай тоглодог.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 37,
    question: "Dr. Stone анимений гол дүр Ишигами Сэнку ямар ундааг хамгийн түрүүнд хийж найзууддаа өгдөг вэ?",
    options: ["Кола (Cola)", "Шар айраг", "Лимонад", "Сүү"],
    answer: "Кола (Cola)",
    hint: "Нүүрсхүчлийн хий, карбонатлаг ус болон кориандр зэрэг байгалийн амт оруулагч ашиглан хийсэн ундаа.",
    image: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 38,
    question: "Cyberpunk: Edgerunners анимед Дэвид Мартинесийн нуруундаа суулгуулдаг цэргийн зэрэглэлийн хүчирхэг кибер суулгац юу вэ?",
    options: ["Сандевистан (Sandevistan)", "Керензиков (Kerenzikov)", "Мантис ир (Mantis Blades)", "Моно утас (Monowire)"],
    answer: "Сандевистан (Sandevistan)",
    hint: "Маш өндөр хурдтай хөдлөх боломж олгодог цэргийн зэрэглэлийн суулгац.",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 39,
    question: "Fullmetal Alchemist анимед Улсын алдартай сөнөөгч, 'Дөл шидэт' (Flame Alchemist) хэн бэ?",
    options: ["Рой Мустанг (Roy Mustang)", "Эдвард Элрик (Edward)", "Алекс Армстронг", "Маэс Хьюз"],
    answer: "Рой Мустанг (Roy Mustang)",
    hint: "Тусгай бээлий ашиглан хуруугаа няслах бүртээ асар хүчтэй гал гаргадаг хурандаа.",
    image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 40,
    question: "Jujutsu Jaisen анимед Мэгүми Фүшигүрогийн дууддаг хамгийн хүчирхэг, дарагдашгүй сүнс (Shikigami)-ийн нэр юу вэ?",
    options: ["Махорага (Mahoraga)", "Садахару", "Курама", "Диваажингийн хаалгач"],
    answer: "Махорага (Mahoraga)",
    hint: "Ямар ч төрлийн дайралт, хүчинд маш хурдан дасан зохицож, эдгэрдэг хамгийн дээд зэрэглэлийн сүнс.",
    image: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 41,
    question: "One Piece анимед Портгас Д. Эйс-ийн идсэн чөтгөрийн жимсний нэр юу вэ?",
    options: ["Мера Мера но Ми (Mera Mera no Mi)", "Гому Гому но Ми", "Гура Гора но Ми", "Хиэ Хиэ но Ми"],
    answer: "Мера Мера но Ми (Mera Mera no Mi)",
    hint: "Түүнд гал удирдах болон гал болон хувирах хүч чадлыг өгсөн Логиа төрлийн жимс.",
    image: "https://images.unsplash.com/photo-1496317556649-f930d733eea3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 42,
    question: "Fate/Stay Night анимед Сэйбер (Saber)-ийн жинхэнэ нэр хэн бэ?",
    options: ["Armour Хаан (Artoria Pendragon)", "Жанна д'Арк", "Гильгамеш", "Александр Хаан"],
    answer: "Артур Хаан (Artoria Pendragon)",
    hint: "Британийн домогт хаан, Экскалибур сэлэмний эзэн.",
    image: "https://images.unsplash.com/photo-1599740831114-171ef0891823?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 43,
    question: "Black Clover анимед Астагийн авсан 5 навчтай гэрийн хошоонгор бүхий ном (Grimoire)-нд хэн амьдардаг вэ?",
    options: ["Чөтгөр (Devil)", "Элф", "Сүнс", "Эртний хаан"],
    answer: "Чөтгөр (Devil)",
    hint: "5 дахь навчинд чөтгөр оршдог гэж ярьдаг.",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 44,
    question: "No Game No Life анимед 'Blank' гэдэг нэрээр алдаршсан хос хэн бэ?",
    options: ["Сора, Широ (Sora & Shiro)", "Кото, Нацу", "Кирито, Асуна", "Ичиго, Рукиа"],
    answer: "Сора, Широ (Sora & Shiro)",
    hint: "Тоглоомын ертөнцөд хэзээ ч ялагдаж үзээгүй ах дүү хоёрын нэр.",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 45,
    question: "Re:Zero анимед Сүбару үхэх бүртээ цаг хугацаагаар ухардаг чадвараа юу гэж нэрлэдэг вэ?",
    options: ["Үхлээр эргэх (Return by Death)", "Цаг хугацааны урсгал", "Сүнсний шилжилт", "Харанхуйн гэрээ"],
    answer: "Үхлээр эргэх (Return by Death)",
    hint: "Атаархлын шулмын өгсөн, үхэх замаар өнгөрсөн рүү буцдаг хараал.",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 46,
    question: "Fire Force анимед 3-р үеийн гал сөнөөгч Шинра Күсакабэ яагаад 'Чөтгөрийн ул мөр' (Devil's Footprints) гэж нэрлэгддэг vэ?",
    options: ["Хөлнөөсөө гал гаргаж нисдэг тул", "Чөтгөр шиг царайтай тул", "Газарт гишгэх бүрт хар мөр үлддэг тул", "Чөтгөрийн цустай тул"],
    answer: "Хөлнөөсөө гал гаргаж нисдэг тул",
    hint: "Хөлнийхөө уулнаас гал гарган өндөр хурдаар хөдөлдөг чадвартай.",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 47,
    question: "Blue Lock анимед тоглогчдыг бэлтгэдэг байгууламжийн гол зорилго юу вэ?",
    options: ["Дэлхийн шилдэг довтлогчийг бэлтгэх", "Хамгийн шилдэг хамгаалагчийг бэлтгэх", "Хаалгач бэлтгэх", "Багаар тоглох чадварыг сайжруулах"],
    answer: "Дэлхийн шилдэг довтлогчийг бэлтгэх",
    hint: "Японы хөлбөмбөгийн шигшээ багийг Дэлхийн аварга болгох хувийн үзэлтэй шилдэг ганц довтлогчийг төрүүлэх.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 48,
    question: "Gintama анимед Гинтокигийн ажиллуулдаг бүхнийг хийх газрыг юу гэж нэрлэдэг vэ?",
    options: ["Ёрозуяа (Yorozuya)", "Кабуки хаус", "Шинсэнгүми", "Садахару"],
    answer: "Ёрозуяа (Yorozuya)",
    hint: "Мөнгөний төлөө ямар ч хамаагүй ажил (гэр цэвэрлэхээс авахуулаад сансар руу нисэх хүртэл) хийдэг газар.",
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 49,
    question: "Overlord анимед гол дүр Момонга (Аинз Оал Гоун) ямар тоглоомын ертөнцөд үлдэж хоцорсон бэ?",
    options: ["Yggdrasil", "Sword Art Online", "Elder Tale", "The World"],
    answer: "Yggdrasil",
    hint: "DMMO-RPG төрлийн алдартай тоглоом бөгөөд сервер нь хаагдах мөчид тэрээр тоглоомондоо үлддэг.",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 50,
    question: "Fullmetal Alchemist: Brotherhood аниме дээрх Хүмүүн бусуудыг (Homunculus) хэн удирддаг вэ?",
    options: ["Эцэг (Father)", "Үхэл (Death)", "Данте (Dante)", "Хаан Брэдли"],
    answer: "Эцэг (Father)",
    hint: "Шилэн колбон доторх бяцхан хүнээс үүссэн, улс орныг золиослох төлөвлөгөөтэй гол дайсан.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80"
  }
];

interface AnimeGuesserProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnimeGuesser({ isOpen, onClose }: AnimeGuesserProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  // Game state: 'start' | 'playing' | 'gameover' | 'victory'
  const [gameStatus, setGameStatus] = useState<'start' | 'playing' | 'gameover' | 'victory'>('start');
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showComboAnimation, setShowComboAnimation] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shakeButton, setShakeButton] = useState<string | null>(null);

  // Language settings states
  const [lang, setLang] = useState<'mn' | 'en'>(() => {
    const saved = localStorage.getItem('anime_guesser_lang');
    return (saved === 'en' || saved === 'mn') ? saved : 'mn';
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem('anime_guesser_lang', lang);
  }, [lang]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestionRaw = QUESTIONS[currentIdx];
  const currentQuestion = {
    ...currentQuestionRaw,
    question: lang === 'en' ? (QUESTIONS_EN[currentQuestionRaw.id]?.question ?? currentQuestionRaw.question) : currentQuestionRaw.question,
    options: lang === 'en' ? (QUESTIONS_EN[currentQuestionRaw.id]?.options ?? currentQuestionRaw.options) : currentQuestionRaw.options,
    answer: lang === 'en' ? (QUESTIONS_EN[currentQuestionRaw.id]?.answer ?? currentQuestionRaw.answer) : currentQuestionRaw.answer,
    hint: lang === 'en' ? (QUESTIONS_EN[currentQuestionRaw.id]?.hint ?? currentQuestionRaw.hint) : currentQuestionRaw.hint,
  };

  const t = uiTranslations[lang];

  // Web Audio synth engine for lag-free retro sounds
  const playSound = (type: 'ding' | 'buzz' | 'bonus' | 'gameover' | 'win') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      if (type === 'ding') {
        // Double rising chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'buzz') {
        // Raspy low buzz with a slight shake
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.linearRampToValueAtTime(85, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'bonus') {
        // Arpeggio triumph chime
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        gain.connect(ctx.destination);

        const freqs = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
        freqs.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + index * 0.07);
          osc.connect(gain);
          osc.start(now + index * 0.07);
          osc.stop(now + 0.5);
        });
      } else if (type === 'gameover') {
        // Sad falling synth
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.6);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'win') {
        // Fun retro fanfare
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        gain.connect(ctx.destination);

        const notes = [523.25, 523.25, 523.25, 659.25, 523.25, 659.25, 783.99];
        const times = [0, 0.12, 0.24, 0.36, 0.48, 0.60, 0.72];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + times[idx]);
          osc.connect(gain);
          osc.start(now + times[idx]);
          osc.stop(now + times[idx] + 0.15);
        });
      }
    } catch (e) {
      console.warn("AudioContext block:", e);
    }
  };

  // Timer runner
  useEffect(() => {
    if (gameStatus !== 'playing' || selectedOption !== null) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(15);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired! Handled as wrong answer
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, currentIdx, selectedOption]);

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    playSound('buzz');
    setIsCorrect(false);
    setSelectedOption(""); // empty is incorrect
    const nextLives = lives - 1;
    setLives(nextLives);
    setStreak(0);

    if (nextLives <= 0) {
      setTimeout(() => {
        playSound('gameover');
        setGameStatus('gameover');
      }, 1500);
    } else {
      scheduleNextQuestion();
    }
  };

  const startNewGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setLives(5);
    setStreak(0);
    setMaxStreak(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setGameStatus('playing');
  };

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null || gameStatus !== 'playing') return;

    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(option);
    const correctAns = currentQuestion.answer;
    const answerIsCorrect = option === correctAns;

    setIsCorrect(answerIsCorrect);

    if (answerIsCorrect) {
      playSound('ding');
      const earnedScore = 15;
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);

      let bonusScore = 0;
      // Bonus of +10 points on 3 consecutive correct answers
      if (nextStreak > 0 && nextStreak % 3 === 0) {
        bonusScore = 10;
        playSound('bonus');
        setShowComboAnimation(true);
        setTimeout(() => setShowComboAnimation(false), 2000);
      }

      setScore((prev) => prev + earnedScore + bonusScore);
      scheduleNextQuestion();
    } else {
      playSound('buzz');
      setShakeButton(option);
      setTimeout(() => setShakeButton(null), 500);
      const nextLives = lives - 1;
      setLives(nextLives);
      setStreak(0);

      if (nextLives <= 0) {
        setTimeout(() => {
          playSound('gameover');
          setGameStatus('gameover');
        }, 1500);
      } else {
        scheduleNextQuestion();
      }
    }
  };

  const scheduleNextQuestion = () => {
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        if (currentIdx + 1 < QUESTIONS.length) {
          setCurrentIdx((prev) => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
          setIsTransitioning(false);
        } else {
          playSound('win');
          setGameStatus('victory');
          setIsTransitioning(false);
        }
      }, 300);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" id="anime-guesser-root">
          {/* Blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-orange-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[670px] max-h-[92vh] z-10 text-white"
          >
            {/* Glowing orange/red accent line on top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-[#e8702a] to-amber-500" />

            {/* Header */}
            <div className="p-5 border-b border-zinc-900 bg-zinc-900/40 flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold shadow-md">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-playfair italic text-xl font-bold flex items-center gap-2">
                    {t.title} <span className="not-italic text-[10px] bg-orange-500/20 text-[#e8702a] px-2 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase">{t.beta}</span>
                  </h3>
                  <p className="text-xs text-zinc-400">{t.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Settings Toggle */}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 transition-colors rounded-full border ${
                    showSettings 
                      ? 'bg-orange-500/20 border-orange-500 text-white' 
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-800'
                  }`}
                  title={t.settings}
                >
                  <Settings className="w-4 h-4" />
                </button>
                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors rounded-full border border-zinc-800"
                  title={soundEnabled ? t.soundOff : t.soundOn}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-900 bg-zinc-900/50"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Interactive Screen */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col justify-between relative">
              <AnimatePresence mode="wait">
                {showSettings ? (
                  <motion.div
                    key="settings-overlay"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col justify-between max-w-md mx-auto py-4 w-full h-full"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-zinc-900">
                        <Settings className="w-5 h-5 text-orange-400" />
                        <h4 className="text-lg font-semibold">{t.settings}</h4>
                      </div>

                      {/* Language Selection */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                          {t.language}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setLang('mn')}
                            className={`p-4 rounded-2xl border text-sm font-medium transition-all cursor-pointer text-center ${
                              lang === 'mn'
                                ? 'bg-orange-500/15 border-[#e8702a] text-white font-bold'
                                : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            🇲🇳 Монгол
                          </button>
                          <button
                            onClick={() => setLang('en')}
                            className={`p-4 rounded-2xl border text-sm font-medium transition-all cursor-pointer text-center ${
                              lang === 'en'
                                ? 'bg-orange-500/15 border-[#e8702a] text-white font-bold'
                                : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            🇺🇸 English
                          </button>
                        </div>
                      </div>

                      {/* Sound Selection */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                          {lang === 'en' ? 'Sound FX' : 'Дууны эффект'}
                        </label>
                        <button
                          onClick={() => setSoundEnabled(!soundEnabled)}
                          className={`w-full p-4 rounded-2xl border text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                            soundEnabled
                              ? 'bg-orange-500/10 border-orange-500/30 text-white'
                              : 'bg-zinc-900/40 border-zinc-800 text-zinc-400'
                          }`}
                        >
                          <span>{soundEnabled ? t.soundOn : t.soundOff}</span>
                          <span className="text-xs font-mono text-orange-400 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-full">
                            {soundEnabled ? "ON" : "OFF"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowSettings(false)}
                      className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white font-semibold py-3.5 rounded-xl transition-all cursor-pointer text-center mt-6"
                    >
                      {t.close}
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Combo/Streak Bonus Pop-up */}
                    {showComboAnimation && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1.3, y: -20 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-x-0 top-1/3 mx-auto z-50 flex flex-col items-center justify-center pointer-events-none"
                      >
                        <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-amber-400 animate-bounce">
                          <Flame className="w-6 h-6 text-yellow-300 animate-pulse" />
                          <span className="font-mono font-black text-xl tracking-wider">COMBO BONUS +10!! 🔥</span>
                        </div>
                      </motion.div>
                    )}

                    {/* 1. START SCREEN */}
                    {gameStatus === 'start' && (
                      <motion.div
                        key="start"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-8"
                      >
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-orange-500/15 rounded-full blur-3xl" />
                          <Flame className="w-16 h-16 text-[#e8702a] animate-pulse relative z-10" />
                        </div>
                        <h4 className="text-2xl font-semibold mb-3 tracking-tight">{t.startTitle}</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                          {t.startSubtitle}
                        </p>

                        {/* Rules Summary */}
                        <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 mb-6 text-left space-y-2.5 text-xs font-mono">
                          <div className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold pb-1 border-b border-zinc-800/80">{t.rulesTitle}</div>
                          <div className="flex items-center justify-between text-zinc-300">
                            <span className="flex items-center gap-1.5"><Timer className="w-3.5 h-3.5 text-orange-400" /> {t.ruleTime}</span>
                            <span className="text-white font-bold">{t.ruleTimeValue}</span>
                          </div>
                          <div className="flex items-center justify-between text-zinc-300">
                            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-red-500" /> {t.ruleLives}</span>
                            <span className="text-white font-bold">{t.ruleLivesValue}</span>
                          </div>
                          <div className="flex items-center justify-between text-zinc-300">
                            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-yellow-400" /> {t.ruleCorrect}</span>
                            <span className="text-white font-bold">{t.ruleCorrectValue}</span>
                          </div>
                          <div className="flex items-center justify-between text-zinc-300">
                            <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-orange-500" /> {t.ruleCombo}</span>
                            <span className="text-white font-bold">{t.ruleComboValue}</span>
                          </div>
                        </div>

                        <button
                          onClick={startNewGame}
                          className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white font-semibold py-4 rounded-xl transition-all hover:scale-102 hover:shadow-lg hover:shadow-orange-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-4 h-4 text-yellow-300" />
                          <span>{t.startButton}</span>
                        </button>
                      </motion.div>
                    )}

                    {/* 2. PLAYING SCREEN */}
                    {gameStatus === 'playing' && (
                      <motion.div
                        key="playing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        {/* Status Bar */}
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-900 text-xs font-mono">
                          {/* Score Tracker */}
                          <div className="flex items-center gap-1.5">
                            <Trophy className="w-4 h-4 text-amber-400" />
                            <span className="text-zinc-400">{t.score}:</span>
                            <span className="text-white font-bold text-sm">{score}</span>
                          </div>

                          {/* Combo / Streak Tracker */}
                          <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 rounded-full px-2.5 py-1">
                            <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-zinc-600'}`} />
                            <span className="text-[10px] text-zinc-400">{t.combo}:</span>
                            <span className={`font-bold ${streak > 0 ? 'text-orange-400' : 'text-zinc-500'}`}>{streak}</span>
                          </div>

                          {/* Lives Tracker */}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, idx) => (
                              <Heart
                                key={idx}
                                className={`w-4 h-4 transition-all ${
                                  idx < lives ? 'text-red-500 fill-red-500 scale-100' : 'text-zinc-700 scale-90'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Progress Time Bar */}
                        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mt-2 relative">
                          <motion.div
                            className={`h-full ${
                              timeLeft > 5 ? 'bg-orange-500' : 'bg-red-500 animate-pulse'
                            }`}
                            initial={{ width: '100%' }}
                            animate={{ width: `${(timeLeft / 15) * 100}%` }}
                            transition={{ duration: selectedOption === null ? 1 : 0.2, ease: 'linear' }}
                          />
                        </div>

                        {/* Question Card */}
                        <div className="flex-1 flex flex-col justify-center py-4 sm:py-6 select-none">
                          <div className="text-center mb-1">
                            <span className="text-xs font-mono text-orange-400 tracking-widest uppercase">{t.questionNum} {currentIdx + 1} / {QUESTIONS.length}</span>
                          </div>

                          {/* Question Text wrapper */}
                          <div className="min-h-[60px] flex items-center justify-center text-center px-2">
                            <AnimatePresence mode="wait">
                              {!isTransitioning ? (
                                <motion.h4
                                  key={currentIdx}
                                  initial={{ opacity: 0, scale: 0.98 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.98 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-base sm:text-lg font-medium leading-relaxed max-w-xl text-white"
                                >
                                  {currentQuestion.question}
                                </motion.h4>
                              ) : (
                                <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Anime Image shown after answer */}
                          <div className="h-36 flex items-center justify-center mt-2 overflow-hidden">
                            <AnimatePresence>
                              {selectedOption !== null && currentQuestion.image && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                                  className="w-full max-w-sm h-32 rounded-2xl overflow-hidden relative border shadow-2xl transition-all duration-300"
                                  style={{
                                    borderColor: isCorrect
                                      ? 'rgba(16, 185, 129, 0.5)' // Emerald green glow
                                      : 'rgba(239, 68, 68, 0.5)',  // Red glow
                                    boxShadow: isCorrect 
                                      ? '0 10px 25px -5px rgba(16, 185, 129, 0.2)'
                                      : '0 10px 25px -5px rgba(239, 68, 68, 0.2)'
                                  }}
                                >
                                  <img
                                    src={currentQuestion.image}
                                    alt="Anime atmosphere"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                  {/* Dark gradient overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end justify-between px-4 py-2">
                                    <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-300 uppercase px-2.5 py-1 bg-black/60 rounded-lg">
                                      {currentQuestion.answer}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold text-orange-400 uppercase">
                                      {t.correctOverlay}
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Help/Hint Indicator */}
                          {currentQuestion.hint && selectedOption === null && (
                            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 font-mono mt-2">
                              <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
                              <span>{t.hint}: {currentQuestion.hint}</span>
                            </div>
                          )}
                        </div>

                        {/* Option Buttons Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 select-none">
                          {currentQuestion.options.map((option) => {
                            const correctAns = currentQuestion.answer;
                            const isThisSelected = selectedOption === option;
                            const isThisCorrect = option === correctAns;
                            const hasSelected = selectedOption !== null;

                            // Styling states
                            let btnStyle = "bg-zinc-900/40 border-zinc-800/80 text-zinc-200 hover:border-orange-500/50 hover:bg-orange-500/5";

                            if (hasSelected) {
                              if (isThisCorrect) {
                                btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/30";
                              } else if (isThisSelected) {
                                btnStyle = "bg-red-950/40 border-red-500 text-red-200 shadow-md shadow-red-950/30";
                              } else {
                                btnStyle = "bg-zinc-900/20 border-zinc-900 text-zinc-600 opacity-60";
                              }
                            }

                            // Check if shaking is active for this button
                            const isShaking = shakeButton === option;

                            return (
                              <motion.button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                disabled={hasSelected}
                                whileHover={!hasSelected ? { scale: 1.02, boxShadow: "0 0 12px rgba(232,112,42,0.15)" } : {}}
                                whileTap={!hasSelected ? { scale: 0.98 } : {}}
                                animate={isShaking ? {
                                  x: [-6, 6, -6, 6, -4, 4, 0],
                                  transition: { duration: 0.4 }
                                } : {}}
                                className={`w-full p-3.5 rounded-2xl border text-sm text-left transition-all duration-200 flex items-center justify-between font-medium cursor-pointer ${btnStyle}`}
                              >
                                <span>{option}</span>
                                {hasSelected && isThisCorrect && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                                )}
                                {hasSelected && isThisSelected && !isThisCorrect && (
                                  <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Feedback Status */}
                        <div className="h-6 text-center text-xs font-mono mt-2">
                          {selectedOption !== null && (
                            <motion.span
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={isCorrect ? "text-emerald-400" : "text-red-400"}
                            >
                              {isCorrect ? t.correctFeedback : `${t.incorrectFeedback}: ${currentQuestion.answer}`}
                            </motion.span>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* 3. GAME OVER SCREEN */}
                    {gameStatus === 'gameover' && (
                      <motion.div
                        key="gameover"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-8"
                      >
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
                          <XCircle className="w-16 h-16 text-red-500 relative z-10" />
                        </div>

                        <h4 className="text-2xl font-semibold mb-2 tracking-tight">{t.gameOverTitle}</h4>
                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                          {t.gameOverSubtitle}
                        </p>

                        {/* Score Summary Box */}
                        <div className="w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-4 font-mono">
                          <div className="border-r border-zinc-800/80 pr-2">
                            <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">{t.totalScore}</span>
                            <span className="text-3xl font-black text-white">{score}</span>
                          </div>
                          <div className="pl-2">
                            <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">{t.maxStreak}</span>
                            <span className="text-3xl font-black text-orange-400 flex items-center justify-center gap-1">
                              {maxStreak} <Flame className="w-5 h-5 text-orange-500 inline fill-orange-500/20" />
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={startNewGame}
                          className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white font-semibold py-4 rounded-xl transition-all hover:scale-102 hover:shadow-lg hover:shadow-orange-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>{t.playAgain}</span>
                        </button>
                      </motion.div>
                    )}

                    {/* 4. VICTORY / WIN SCREEN */}
                    {gameStatus === 'victory' && (
                      <motion.div
                        key="victory"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-8"
                      >
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" />
                          <Trophy className="w-16 h-16 text-yellow-400 relative z-10 animate-bounce" />
                        </div>

                        <h4 className="text-2xl font-semibold text-yellow-400 mb-2 tracking-tight">{t.victoryTitle}</h4>
                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                          {t.victorySubtitle}
                        </p>

                        {/* Score Summary Box */}
                        <div className="w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-4 font-mono">
                          <div className="border-r border-zinc-800/80 pr-2">
                            <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">{t.totalScore}</span>
                            <span className="text-3xl font-black text-white">{score}</span>
                          </div>
                          <div className="pl-2">
                            <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">{t.maxStreak}</span>
                            <span className="text-3xl font-black text-orange-400 flex items-center justify-center gap-1">
                              {maxStreak} <Flame className="w-5 h-5 text-orange-500 inline fill-orange-500/20" />
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={startNewGame}
                          className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white font-semibold py-4 rounded-xl transition-all hover:scale-102 hover:shadow-lg hover:shadow-orange-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>{t.victoryButton}</span>
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
