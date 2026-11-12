export const categories = [
  { id: "all", name: "Hammasi" },
  { id: "main", name: "Asosiy taomlar" },
  { id: "grill", name: "Kabob va tandir" },
  { id: "soup", name: "Sho'rvalar" },
  { id: "snack", name: "Non va samsa" },
  { id: "salad", name: "Salatlar" },
  { id: "dessert", name: "Shirinliklar" },
  { id: "drink", name: "Ichimliklar" },
];

export const menu = [
  // Asosiy taomlar
  { id: 1, name: "Samarqand oshi", desc: "Guruch, mol go'shti, sabzi, no'xat va qazi bilan.", price: 55000, category: "main", emoji: "🍛", image: "/images/menu/osh.jpg", popular: true },
  { id: 2, name: "Dimlama", desc: "Go'sht va sabzavotlar o'z sharbatida dimlangan.", price: 48000, category: "main", emoji: "🥘", image: "/images/menu/dimlama.jpg" },
  { id: 3, name: "Manti", desc: "Go'shtli bug'da pishirilgan manti, 5 dona.", price: 38000, category: "main", emoji: "🥟", image: "/images/menu/manti.jpg", popular: true },
  { id: 4, name: "Lag'mon", desc: "Qo'lda cho'zilgan lag'mon, go'sht va sabzavotli sous.", price: 42000, category: "main", emoji: "🍜", image: "/images/menu/lagmon.jpg" },
  { id: 14, name: "Qovurma lag'mon", desc: "Qovurilgan lag'mon, go'sht va bolgar qalampiri bilan.", price: 44000, category: "main", emoji: "🍝", image: "/images/menu/qovurma-lagmon.jpg" },
  { id: 15, name: "Do'lma", desc: "Uzum bargiga o'ralgan go'shtli do'lma, 6 dona.", price: 40000, category: "main", emoji: "🥬", image: "/images/menu/dolma.jpg" },
  { id: 16, name: "Norin", desc: "Qo'lda to'g'ralgan xamir va ot go'shti, piyoz bilan.", price: 52000, category: "main", emoji: "🍲", image: "/images/menu/norin.jpg" },
  { id: 17, name: "Qozon kabob", desc: "Qozonda qovurilgan go'sht va kartoshka.", price: 70000, category: "main", emoji: "🍳", image: "/images/menu/qozon-kabob.jpg" },

  // Kabob va tandir
  { id: 5, name: "Tandir go'sht", desc: "Tandirda sekin pishirilgan qo'y go'shti.", price: 90000, category: "grill", emoji: "🍖", image: "/images/menu/tandir-gosht.jpg", popular: true },
  { id: 6, name: "Shashlik (mol)", desc: "Ko'mirda pishirilgan, piyoz bilan, 2 shapaloq.", price: 36000, category: "grill", emoji: "🍢", image: "/images/menu/shashlik.jpg" },
  { id: 7, name: "Lyulya kabob", desc: "Qiyma kabob, 2 dona, salat bilan.", price: 34000, category: "grill", emoji: "🍡", image: "/images/menu/lyulya.jpg" },
  { id: 18, name: "Tovuq shashlik", desc: "Marinadlangan tovuq go'shti, 2 shapaloq.", price: 32000, category: "grill", emoji: "🍗", image: "/images/menu/tovuq-shashlik.jpg" },
  { id: 19, name: "Jigar kabob", desc: "Dumba yog'i bilan qovurilgan jigar, 2 shapaloq.", price: 30000, category: "grill", emoji: "🍢", image: "/images/menu/jigar-kabob.jpg" },
  { id: 20, name: "Qovurg'a kabob", desc: "Tandirda pishirilgan qo'y qovurg'asi.", price: 58000, category: "grill", emoji: "🍖", image: "/images/menu/qovurga.jpg" },
  { id: 21, name: "Tandir tovuq", desc: "Butun tovuq tandirda, ziravorlar bilan.", price: 65000, category: "grill", emoji: "🍗", image: "/images/menu/tandir-tovuq.jpg" },

  // Sho'rvalar
  { id: 8, name: "Mastava", desc: "Guruchli quyuq sho'rva, qatiq bilan.", price: 30000, category: "soup", emoji: "🍲", image: "/images/menu/mastava.jpg" },
  { id: 9, name: "Sho'rva", desc: "Kartoshka, sabzi va go'shtli to'yimli sho'rva.", price: 32000, category: "soup", emoji: "🥣", image: "/images/menu/shorva.jpg" },
  { id: 22, name: "Chuchvara", desc: "Mayda go'shtli chuchvara, sho'rvada, smetana bilan.", price: 34000, category: "soup", emoji: "🥟", image: "/images/menu/chuchvara.jpg" },
  { id: 23, name: "Moshxo'rda", desc: "Mosh, guruch va go'shtli sho'rva, qatiq bilan.", price: 33000, category: "soup", emoji: "🥣", image: "/images/menu/moshxorda.jpg" },

  // Non va samsa
  { id: 10, name: "Tandir samsa", desc: "Tandirda yopilgan go'shtli samsa, 2 dona.", price: 22000, category: "snack", emoji: "🥐", image: "/images/menu/samsa.jpg", popular: true },
  { id: 11, name: "Issiq non", desc: "Tandirdan yangi uzilgan patir.", price: 8000, category: "snack", emoji: "🫓", image: "/images/menu/non.jpg" },
  { id: 24, name: "Qovoqli samsa", desc: "Qovoq va piyozli samsa, 2 dona.", price: 18000, category: "snack", emoji: "🥧", image: "/images/menu/qovoqli-samsa.jpg" },
  { id: 25, name: "Qatlama", desc: "Qatlam-qatlam yog'li yupqa non.", price: 14000, category: "snack", emoji: "🥞", image: "/images/menu/qatlama.jpg" },

  // Salatlar
  { id: 26, name: "Achichuk", desc: "Pomidor, piyoz va achchiq qalampirdan yengil salat.", price: 15000, category: "salad", emoji: "🍅", image: "/images/menu/achichuk.jpg" },
  { id: 27, name: "Toshkent salati", desc: "Mol go'shti, turp, piyoz va smetana bilan.", price: 28000, category: "salad", emoji: "🥗", image: "/images/menu/toshkent-salati.jpg" },
  { id: 28, name: "Yangi sabzavot salati", desc: "Bodring, pomidor, ko'katlar, zaytun moyi bilan.", price: 20000, category: "salad", emoji: "🥒", image: "/images/menu/sabzavot-salati.jpg" },
  { id: 35, name: "Olivye salati", desc: "Kartoshka, sabzi, tuxum va mayonez bilan.", price: 35000, category: "salad", emoji: "🥗", image: "/images/menu/olivia-salad.jpg" },

  // Shirinliklar
  { id: 29, name: "Chak-chak", desc: "Asalli an'anaviy shirinlik.", price: 25000, category: "dessert", emoji: "🍯", image: "/images/menu/chak-chak.jpg" },
  { id: 30, name: "Paxlava", desc: "Yong'oqli, qatlamli, asalli paxlava, 2 bo'lak.", price: 24000, category: "dessert", emoji: "🍰", image: "/images/menu/paxlava.jpg" },
  { id: 31, name: "Halva", desc: "Uyda tayyorlangan yong'oqli halva.", price: 22000, category: "dessert", emoji: "🍬", image: "/images/menu/halva.jpg" },

  // Ichimliklar
  { id: 12, name: "Ko'k choy", desc: "Choynak, 2 kishilik.", price: 10000, category: "drink", emoji: "🍵", image: "/images/menu/choy.jpg" },
  { id: 13, name: "Kompot", desc: "Uy sharoitidagi quritilgan mevalardan, 0.5 l.", price: 12000, category: "drink", emoji: "🧃", image: "/images/menu/kompot.jpg" },
  { id: 32, name: "Ayron", desc: "Sovuq, tuzli qatiq ichimligi, 0.5 l.", price: 10000, category: "drink", emoji: "🥛", image: "/images/menu/ayron.jpg" },
  { id: 33, name: "Limonli choy", desc: "Muzli yoki issiq, limon va yalpiz bilan.", price: 12000, category: "drink", emoji: "🍋", image: "/images/menu/limonli-choy.jpg" },
  { id: 34, name: "Mineral suv", desc: "Gazli yoki gazsiz, 0.5 l.", price: 6000, category: "drink", emoji: "💧", image: "/images/menu/suv.jpg" },
];

export const formatPrice = (n) =>
  new Intl.NumberFormat("ru-RU").format(n) + " so'm";