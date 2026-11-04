import { RouteData, MountainPassStatus, EnrouteSecret, StaySpot, FoodSpot } from '../types';

import HERO_IMAGE from '../assets/images/hero_himalayan_road_1793273587649.jpg';
import UPPER_SHIMLA_IMAGE from '../assets/images/route_upper_shimla_1793273587665.jpg';
import KULLU_MANALI_IMAGE from '../assets/images/route_kullu_manali_1793273587984.jpg';
import SPITI_LOOP_IMAGE from '../assets/images/route_spiti_loop_1793273588790.jpg';
import SECLUDED_STAY_IMAGE from '../assets/images/secluded_orchard_stay_1793273589004.jpg';

export { HERO_IMAGE, UPPER_SHIMLA_IMAGE, KULLU_MANALI_IMAGE, SPITI_LOOP_IMAGE, SECLUDED_STAY_IMAGE };

export const HIGH_PASSES: MountainPassStatus[] = [
  {
    name: 'Chanshal Pass',
    altitude: '3,750 m (12,303 ft)',
    status: 'SEASONAL',
    seasonWindow: 'May to October',
    operationalNote: 'Road from Rohru through Larot undergoes seasonal snow clearance. Early summer and autumn offer pristine valley views across Pabbar basin.',
    lastUpdated: 'Live Seasonal Assessment Active'
  },
  {
    name: 'Jalori Pass',
    altitude: '3,120 m (10,236 ft)',
    status: 'SEASONAL',
    seasonWindow: 'April to November',
    operationalNote: 'Connects Shimla/Ani to Tirthan Valley via Shoja. Extreme gradient; accessible by high-clearance 4x4 or seasoned mountain drivers only.',
    lastUpdated: 'Weather Advisory Monitored'
  },
  {
    name: 'Kunzum Pass',
    altitude: '4,551 m (14,931 ft)',
    status: 'SEASONAL',
    seasonWindow: 'Mid-June to early October',
    operationalNote: 'Gateway between Spiti and Lahaul. Stupas at the summit require clockwise circumambulation for road blessings. Subject to early snow.',
    lastUpdated: 'Border Roads Clearance Tracking'
  },
  {
    name: 'Chandratal Approach',
    altitude: '4,300 m (14,100 ft)',
    status: 'SEASONAL',
    seasonWindow: 'Late June to September',
    operationalNote: '14 km unpaved detour from Batal. High-altitude acclimatization mandatory. Last 1.5 km is walking access only to preserve fragile alpine ecology.',
    lastUpdated: 'Eco-Permit Restricted Access'
  },
  {
    name: 'Atal Tunnel (Rohtang Bypass)',
    altitude: '3,048 m (10,000 ft)',
    status: 'OPEN',
    seasonWindow: 'Year-Round (Except heavy storm events)',
    operationalNote: '9.02 km modern engineering marvel connecting Solang Valley to Sissu, Lahaul. Operational road connection throughout the winter season.',
    lastUpdated: 'Verified Open 24/7'
  },
  {
    name: 'Rohtang Pass (High Crest Experience)',
    altitude: '3,978 m (13,050 ft)',
    status: 'SEASONAL',
    seasonWindow: 'May to November (Permit Required)',
    operationalNote: 'National Green Tribunal daily vehicle permit required. We curate Rohtang as a dedicated early-morning scenic crest experience rather than a transit route.',
    lastUpdated: 'Permit Allocation Verified'
  }
];

export const ENROUTE_ROUTES: RouteData[] = [
  {
    id: 'upper-shimla',
    number: '01',
    name: 'The Upper Shimla Route',
    tagline: 'Chandigarh → Shimla → Beyond',
    span: 'Apple country. Forest roads. Old villages. Upper Shimla.',
    summary: 'Shimla is only the gateway. The real journey begins where the day-trippers turn back—drifting through the dense deodar sanctuaries of Mashobra, the apple orchards of Kotgarh and Thanedar, and tracing the wild Pabbar river up to the forgotten ridge of Chanshal.',
    landscapeEvolution: [
      'Chandigarh foothills and pine fragrance',
      'Solan / Barog slow approach',
      'Shimla colonial ridge and cedar canopies',
      'Mashobra & Naldehra tranquil glades',
      'Theog & Narkanda panoramic Himalayan ranges',
      'Kotgarh apple blossom valleys & traditional slate roofs',
      'Pabbar valley riverbanks up to Chanshal alpine meadows'
    ],
    heroImage: UPPER_SHIMLA_IMAGE,
    stops: [
      { id: 'chd', name: 'Chandigarh', elevation: '321 m', tagline: 'The Departure', description: 'Early morning coffee as the plains give way to the Shivalik contours.', highlight: 'Leaving the city noise behind' },
      { id: 'barog', name: 'Barog / Solan Belt', elevation: '1,560 m', tagline: 'The Slow Approach', description: 'Optional detour through colonial railway tunnels and pine orchards.', highlight: 'Steaming ginger chai beside railway tracks' },
      { id: 'shimla', name: 'Shimla Gateway', elevation: '2,276 m', tagline: 'The Threshold', description: 'A quiet pause at sunrise before heading deeper into the Upper ridge.', highlight: 'Old cedar forest shadows' },
      { id: 'mashobra', name: 'Mashobra & Naldehra', elevation: '2,146 m', tagline: 'Deodar Sanctuary', description: 'Centuries-old deodar forests where clouds drift at eye level.', highlight: 'Silent walks under 100-foot pines' },
      { id: 'narkanda', name: 'Narkanda & Hatu Peak', elevation: '2,708 m', tagline: 'The High Divide', description: 'Ancient oak woods leading to Hatu Mata temple with 360-degree snow peaks.', highlight: 'View of the Central Himalayan snowline' },
      { id: 'kotgarh', name: 'Kotgarh & Thanedar', elevation: '2,200 m', tagline: 'The Apple Belt', description: 'The historic cradle of Himachali apple farming, terraced orchards, and mountain homestays.', highlight: 'Fresh orchard breakfast and cedar homestay' },
      { id: 'rohru', name: 'Rohru & Pabbar Valley', elevation: '1,525 m', tagline: 'Deeper Upper Shimla', description: 'Trout streams, wood-and-stone Hatkoti temples, and uncharted forest trails.', isOptionalBranch: true, highlight: 'Wild trout stream & stone architecture' },
      { id: 'chanshal', name: 'Chanshal Pass', elevation: '3,750 m', tagline: 'The Edge of Solitude', description: 'Expansive rolling high-altitude meadows accessible only in favorable seasons.', isOptionalBranch: true, highlight: 'Vast solitude with no cars in sight' }
    ],
    itineraries: [
      {
        duration: '3 Nights',
        title: 'Shimla, But Slower',
        subtitle: 'For short escapes from the city grind',
        bestFor: 'Weekend breaks & unhurried pauses',
        stopsSummary: ['Chandigarh', 'Shimla Ridge Gateway', 'Mashobra Deodars', 'Naldehra Forest Glade', 'Return'],
        focus: ['Deodar forest sanctuaries', 'Heritage breakfast', 'Sunset without horn honking']
      },
      {
        duration: '5 Nights',
        title: 'Beyond Shimla',
        subtitle: 'The Apple Country & Valley Shadows',
        bestFor: 'Couples, writers & slow explorers',
        isSignature: true,
        stopsSummary: ['Chandigarh', 'Solan Slow Belt', 'Narkanda Ridge', 'Kotgarh Apple Orchards', 'Thanedar Village', 'Slow Return'],
        focus: ['Private orchard walks', 'Himachali family meal', 'Hatu peak sunrise', 'No checklists']
      },
      {
        duration: '7+ Nights',
        title: 'Upper Shimla Unfolded',
        subtitle: 'The Deep Pabbar & Chanshal Ridge',
        bestFor: 'Seekers of remote Himalayan silence',
        stopsSummary: ['Chandigarh', 'Shimla', 'Kotgarh Orchards', 'Kotkhai / Kharapathar', 'Hatkoti Ancient Temple', 'Rohru Pabbar River', 'Chanshal Meadows (Seasonal)', 'Return'],
        focus: ['Wild river valleys', 'Traditional wood-slate villages', 'High pass solitude', 'Remote homestays']
      }
    ],
    passes: [HIGH_PASSES[0]],
    secretStops: [
      {
        id: 'sec-01',
        category: 'Take This Turn',
        location: 'Somewhere after Narkanda',
        teaserTitle: 'The Apple Orchard Byway',
        teaserQuote: 'There is a narrow dirt track turning off before Thanedar where time stopped in 1964.',
        revealedInsight: 'A four-kilometer single-lane track tracing through century-old apple groves planted by Satyananda Stokes. No signs, no cafes—just stone farmhouses and the sound of wind in walnut trees.',
        pahadiNote: 'Idhar se gaadi dheere chalao. Gaon ke bachhe raste par khelte hain.',
        coordinatesHint: 'Upper Shimla Apple Belt · 31.31°N, 77.48°E'
      },
      {
        id: 'sec-02',
        category: 'Eat Here',
        location: 'Hatkoti River bend',
        teaserTitle: 'Woodfire Siddu in the Stone Kitchen',
        teaserQuote: 'A roadside family kitchen where walnut paste siddu takes 40 unhurried minutes.',
        revealedInsight: 'Prepared fresh using stone-ground wheat, stuffed with poppy seed paste and local walnuts, drenched in aromatic cow ghee. Served hot while you sit on wooden benches beside the river.',
        pahadiNote: 'Pahadi food mein jaldi nahi hoti. Chai peete hue intezaar karo.',
        coordinatesHint: 'Pabbar River bank near Hatkoti'
      }
    ],
    stays: [
      {
        id: 'stay-01',
        name: 'The Stokes Crest Hideaway',
        category: 'Inside The Orchard',
        valley: 'Kotgarh Valley',
        atmosphere: 'Surrounded by 80-year-old Golden Delicious trees, with a wood stove and cedar balconies.',
        elevation: '2,250 m',
        image: SECLUDED_STAY_IMAGE,
        notes: 'Handmade apple wood fires every evening, locally sourced apricot preserves, zero highway noise.'
      },
      {
        id: 'stay-02',
        name: 'Pabbar Stone Homestead',
        category: 'Beside The River',
        valley: 'Rohru / Chirgaon',
        atmosphere: 'Traditional Kath-Kuni wood-and-stone farmhouse on the edge of the rushing trout river.',
        elevation: '1,680 m',
        image: UPPER_SHIMLA_IMAGE,
        notes: 'Open hearth cooking, private riverbank access, surrounded by terraced paddy and apple groves.'
      }
    ],
    foods: [
      {
        id: 'food-01',
        dishName: 'Fresh Walnut Siddu with Chulli Ghee',
        setting: 'Traditional mud-plastered kitchen in Kotgarh',
        route: 'Route 01: Upper Shimla',
        description: 'Steamed sourdough dumplings stuffed with crushed mountain walnuts and wild hemp seeds, served glistening in fragrant wild apricot oil or pure cow ghee.',
        bestTime: 'Post-noon, after a quiet walk through the pine forest',
        pahadiTip: 'Siddu should be eaten piping hot with bare hands. Knife-fork se swaad mar jaata hai.'
      }
    ],
    pahadiDialogue: {
      situation: 'Approaching an unpaved forest detour after Narkanda',
      quote: '“Idhar se kam log jaate hain. Road thoda kachha hai, par hawa bilkul saaf milegi.”'
    }
  },
  {
    id: 'kullu-manali',
    number: '02',
    name: 'The Kullu-Manali Route',
    tagline: 'Chandigarh → The Valleys → Manali → Beyond',
    span: 'Rivers. Hidden valleys. Old villages. Snow roads. Lahaul.',
    summary: 'Not the rush to Mall Road, but the sacred geography of the Beas and Tirthan. We detour into Jibhi and Shoja before the tourist corridor opens, stay in ancient Naggar wooden manors, and cross beneath the Pir Panjal mountains to the surreal moonscapes of Sissu in Lahaul.',
    landscapeEvolution: [
      'Chandigarh plains along Gobind Sagar reservoir',
      'Mandi stone temples & dramatic Beas gorge',
      'The silent turn into pristine Tirthan Valley',
      'Shoja & Jalori pine-clad ridge passes',
      'Naggar ancient castle terraces & deodar orchards',
      'Old Manali apple groves & Cedar shadows',
      'Solang Valley alpine snowline',
      'Atal Tunnel portal crossing',
      'The dramatic barren grandeur of Lahaul & Sissu waterfalls'
    ],
    heroImage: KULLU_MANALI_IMAGE,
    stops: [
      { id: 'chd2', name: 'Chandigarh', elevation: '321 m', tagline: 'The Start', description: 'Dawn departure before the GT Road warms up.', highlight: 'Cool morning highway breeze' },
      { id: 'mandi', name: 'Mandi Belt', elevation: '760 m', tagline: 'The River Gate', description: 'Ancient stone temple architecture sitting on the banks of roaring Beas.', highlight: 'Ancient stone ghats & local dhabas' },
      { id: 'tirthan', name: 'Tirthan & Jibhi', elevation: '1,600 m', tagline: 'The River Haven', description: 'Hidden off the highway: crystal clear trout streams, cedar forests, and wooden chalets.', highlight: 'Pure glacial river sounds at night' },
      { id: 'shoja', name: 'Shoja & Jalori Pass', elevation: '3,120 m', tagline: 'High Forest Ridge', description: 'Unpaved switchbacks leading through alpine meadows and Serolsar lake path.', isOptionalBranch: true, highlight: 'Walking through mist on Jalori ridge' },
      { id: 'naggar', name: 'Naggar Heritage', elevation: '2,047 m', tagline: 'The Cultural Heart', description: 'The historic capital of Kullu kings, Nicholas Roerich gallery, and wood-timber craft.', highlight: 'Tea on a wooden balcony overlooking the Beas' },
      { id: 'manali', name: 'Old Manali & Vashisht', elevation: '2,050 m', tagline: 'Above The Rush', description: 'Secluded stays high above the commercial town, surrounded by wild deodars.', highlight: 'Hot sulphur springs & morning chants' },
      { id: 'solang', name: 'Solang Meadow', elevation: '2,560 m', tagline: 'The Alpine Gateway', description: 'Where lush forests thin out and granite Himalayan walls rise steeply.', highlight: 'Glacial amphitheater views' },
      { id: 'atal', name: 'Atal Tunnel Crossing', elevation: '3,048 m', tagline: 'The Portal', description: 'Entering dark subterranean granite, emerging 9 km later in another world.', highlight: 'The instant climatic shock into Lahaul' },
      { id: 'sissu', name: 'Sissu / Lahaul Valley', elevation: '3,120 m', tagline: 'The Snow Realm', description: 'Dramatic barren mountains, giant hanging waterfalls, and willow trees along Chandra river.', highlight: 'Hanging glacial waterfall & cold air' }
    ],
    itineraries: [
      {
        duration: '4 Nights',
        title: 'Manali, Without The Rush',
        subtitle: 'Heritage stays and valley sanctuaries',
        bestFor: 'Revisiting Manali the way it was 30 years ago',
        stopsSummary: ['Chandigarh', 'Naggar Heritage Manor', 'Old Manali Pine Glades', 'Solang / Sissu Day Crossing', 'Return'],
        focus: ['Naggar wood architecture', 'Old Manali forest walks', 'Quiet valley meals']
      },
      {
        duration: '6 Nights',
        title: 'Rivers Before Mountains',
        subtitle: 'Tirthan Valley & The Lahaul Portal',
        bestFor: 'Couples & nature lovers seeking water and pine',
        isSignature: true,
        stopsSummary: ['Chandigarh', 'Tirthan Valley (2N)', 'Naggar Manor (1N)', 'Old Manali Sanctuary (2N)', 'Sissu / Lahaul Valley', 'Return'],
        focus: ['Trout stream solitude', 'Great Himalayan National Park edge', 'Atal Tunnel crossing', 'Lahaul waterfalls']
      },
      {
        duration: '8+ Nights',
        title: 'Valleys of Kullu & Lahaul',
        subtitle: 'The Deep Valley Expedition',
        bestFor: 'Those who want to slow down completely',
        stopsSummary: ['Chandigarh', 'Tirthan River', 'Shoja & Jalori Pass', 'Sainj Hidden Valley', 'Naggar', 'Old Manali', 'Atal Tunnel', 'Sissu / Keylong in Lahaul', 'Return'],
        focus: ['Three distinct valley ecosystems', 'High pass traverses', 'Trans-Himalayan culture', 'Complete digital detox']
      }
    ],
    passes: [HIGH_PASSES[1], HIGH_PASSES[4], HIGH_PASSES[5]],
    secretStops: [
      {
        id: 'sec-03',
        category: 'Best Hour',
        location: 'Naggar Castle Balcony at 06:15 AM',
        teaserTitle: 'The Valley of Gods Awakening',
        teaserQuote: 'Before the ticket counter opens, the valley belongs strictly to the birds and the mist.',
        revealedInsight: 'Walk the stone courtyard as the first sunlight hits the snow peaks of the Bara Bhangal range. The Beas river below catches the golden dawn while woodsmoke curls from village homes.',
        pahadiNote: 'Subah ki pehli dhoop yahan sabse meethi hoti hai.',
        coordinatesHint: 'Naggar Village · 32.14°N, 77.17°E'
      },
      {
        id: 'sec-04',
        category: 'Skip The Crowd',
        location: 'Beyond Sissu village in Lahaul',
        teaserTitle: 'The Willow Forest by Chandra River',
        teaserQuote: 'While everyone stops at the main waterfall parking, drive 3 kilometers further.',
        revealedInsight: 'A gravel track drops to an empty stand of mountain willows beside the turquoise glacial river. The water is ice-cold, the breeze tastes of high rock, and not a single bus is visible.',
        pahadiNote: 'Yahan baitho aur paani ki aawaaz suno.',
        coordinatesHint: 'Chandra River Basin, Lahaul'
      }
    ],
    stays: [
      {
        id: 'stay-03',
        name: 'The Tirthan Cedar Chalet',
        category: 'Beside The River',
        valley: 'Tirthan Valley',
        atmosphere: 'Directly overlooking the bubbling mountain stream, handcrafted from seasoned deodar wood.',
        elevation: '1,620 m',
        image: KULLU_MANALI_IMAGE,
        notes: 'Sound of rushing glacial water all night, organic trout dinners, walking trail to Chhoie waterfall.'
      },
      {
        id: 'stay-04',
        name: 'The Old Manali Orchard Sanctuary',
        category: 'Forest Hideaway',
        valley: 'Upper Manali',
        atmosphere: 'Perched in high apple orchards overlooking the Solang peaks, away from motor roads.',
        elevation: '2,150 m',
        image: SECLUDED_STAY_IMAGE,
        notes: 'Hand-cut local granite, crackling fireplace, private terrace library with views of snowy ridges.'
      }
    ],
    foods: [
      {
        id: 'food-02',
        dishName: 'Kullvi Dham: Madra & Babru',
        setting: 'Traditional brass thali served on pine leaf mats in Naggar',
        route: 'Route 02: Kullu-Manali',
        description: 'Slow-simmered chickpeas in yogurt and mustard oil spiced with black cardamom (Chana Madra), accompanied by fermented deep-fried bread (Babru) and sweet rice (Meetha).',
        bestTime: 'Traditional afternoon lunch served during festive mountain clear days',
        pahadiTip: 'Dham is eaten sitting cross-legged on the floor. It digests better and keeps you grounded.'
      }
    ],
    pahadiDialogue: {
      situation: 'Looking at an overcrowded itinerary with 7 points in 1 day',
      quote: '“Itna kya bhaagna? Ek jagah thehero, pahaad se dosti karo.”'
    }
  },
  {
    id: 'great-himachal-loop',
    number: '03',
    name: 'The Great Himachal Loop',
    tagline: 'One road. Many Himachals.',
    span: 'Chandigarh → Kinnaur → Spiti → Lahaul → Manali → Chandigarh',
    summary: 'Enroute’s flagship expedition. One unbroken loop that spans the entire spectrum of Himachal: from the lush green pine sanctums of Shimla and apple valleys of Kinnaur, over sheer Himalayan cliff roads into the stark Tibetan moonscape of Spiti, across high frozen passes into Lahaul, and back through the green valleys of Kullu.',
    landscapeEvolution: [
      'Chandigarh to Shimla cedar forests',
      'Sutlej gorge and hanging cliff roads into Kinnaur',
      'Sangla & Chitkul apple orchards and Baspa riverbanks',
      'Kalpa views of the sacred Kinner Kailash massif',
      'The transition from green to ochre: Nako high lake',
      '1,000-year-old mud monastery of Tabo and Dhankar cliff fortress',
      'Spiti Valley: vast cold desert, canyons, and prayer flags',
      'High village circuit: Key, Kibber, Langza, Hikkim, Komic',
      'Kunzum Pass summit & blue turquoise expanse of Chandratal',
      'Lahaul glacial valley and Chandra river gorge',
      'Atal Tunnel passage back into lush Manali & Kullu valleys',
      'Gentle descent via Mandi back to Chandigarh'
    ],
    heroImage: SPITI_LOOP_IMAGE,
    stops: [
      { id: 'chd3', name: 'Chandigarh', elevation: '321 m', tagline: 'The Departure', description: 'The expedition begins at sunrise heading east towards the mountain gateway.', highlight: 'Expedition vehicle preparation' },
      { id: 'shimla3', name: 'Shimla / Narkanda', elevation: '2,708 m', tagline: 'The Forest Rim', description: 'Last lush pine forests before dropping into the dramatic Sutlej gorge.', highlight: 'Panoramic views of snow massifs' },
      { id: 'sarahan', name: 'Sarahan / Rampur', elevation: '2,165 m', tagline: 'Bhimakali Gate', description: 'Ancient multi-tiered wooden temple architecture with views of Shrikhand Mahadev.', highlight: 'Intricate Kath-Kuni temple woodcraft' },
      { id: 'sangla', name: 'Sangla & Chitkul', elevation: '3,450 m', tagline: 'The Last Village', description: 'The emerald Baspa valley, wooden houses, and the final inhabited border outpost.', highlight: 'Baspa river pebbles & Indo-Tibet frontier' },
      { id: 'kalpa', name: 'Kalpa', elevation: '2,960 m', tagline: 'The Sacred Crest', description: 'Direct visual confrontation with the 6,050-meter Kinner Kailash peak.', highlight: 'Sunrise turning Kinner Kailash to molten gold' },
      { id: 'nako', name: 'Nako & Tabo', elevation: '3,662 m', tagline: 'The Desert Monasteries', description: 'High-altitude sacred lake and the 996 AD UNESCO mud monastery containing ancient murals.', highlight: 'Tabo monastery inner meditation caves' },
      { id: 'dhankar', name: 'Dhankar Fortress', elevation: '3,894 m', tagline: 'The Razor Ridge', description: 'Old capital perched precariously on wind-eroded cliff pinnacles above Spiti-Pin confluence.', highlight: 'Sitting on the cliff edge looking down 300 m' },
      { id: 'kaza', name: 'Kaza', elevation: '3,650 m', tagline: 'Spiti Base', description: 'The quiet pulse of the high desert; local seabuckthorn tea and acclimatization walks.', highlight: 'Night skies with 10,000 visible stars' },
      { id: 'spiti-villages', name: 'Key, Kibber, Langza, Hikkim', elevation: '4,400 m', tagline: 'The Sky Villages', description: 'Highest post office in the world, ancient marine fossils, and cliffside Key Monastery.', highlight: 'Fossil searching under the Langza Buddha' },
      { id: 'kunzum', name: 'Kunzum Pass & Chandratal', elevation: '4,551 m', tagline: 'The Frozen High', description: 'The roof of the expedition. Prayer flags snapping in the wind, descent to the moon lake.', highlight: 'Reflection of glacial cirques in Chandratal' },
      { id: 'sissu-lahaul', name: 'Sissu / Lahaul', elevation: '3,120 m', tagline: 'Waterfalls & Granite', description: 'Emerging from the harsh pass into the broad Chandra valley with glacial waterfalls.', highlight: 'Warm thukpa after the high pass' },
      { id: 'atal-tunnel', name: 'Atal Tunnel Passage', elevation: '3,048 m', tagline: 'The Sensory Rebirth', description: '9 km of tunnel darkness, emerging into the vibrant green forest of Solang Valley.', highlight: 'The famous transition from desert to forest' },
      { id: 'manali3', name: 'Manali / Naggar', elevation: '2,050 m', tagline: 'The Soft Valley', description: 'Resting in cedar comfort after days in the high desert.', highlight: 'Comfort of thick quilts and forest air' },
      { id: 'return-chd', name: 'Mandi → Chandigarh', elevation: '321 m', tagline: 'The Return', description: 'Completing the 1,200 km loop with a new relationship to distance and time.', highlight: 'The realization that the road was the destination' }
    ],
    itineraries: [
      {
        duration: '12-Day Explorer',
        title: 'The Great Himachal Explorer',
        subtitle: 'For experienced road travellers with time constraints',
        bestFor: 'Fit adventurers wanting the complete geographical loop',
        stopsSummary: ['Chandigarh', 'Narkanda', 'Sangla', 'Kalpa', 'Nako/Tabo', 'Kaza (2N)', 'Key/Kibber', 'Chandratal/Lahaul', 'Sissu', 'Manali', 'Chandigarh'],
        focus: ['Complete loop circuit', 'Key & Dhankar monasteries', 'Chandratal moon lake', 'Atal tunnel transition']
      },
      {
        duration: '14–16 Day Signature',
        title: 'The Enroute Himalayan Signature',
        subtitle: 'The gold standard: unhurried acclimatization and hidden valleys',
        bestFor: 'Those who want to absorb Spiti without altitude exhaustion',
        isSignature: true,
        stopsSummary: ['Chandigarh', 'Upper Shimla', 'Sangla Valley (2N)', 'Chitkul Walk', 'Kalpa (1N)', 'Tabo & Dhankar', 'Pin Valley Detour', 'Kaza (3N Slow)', 'High Village Circuit', 'Kunzum & Chandratal', 'Sissu Lahaul (2N)', 'Manali / Naggar', 'Chandigarh'],
        focus: ['Pin Valley detour', 'Chitkul morning walks', 'Acclimatization days in Kaza', 'Stargazing under Bortle 1 skies']
      },
      {
        duration: '18–21 Day Slow Journey',
        title: 'Disappear into Himachal',
        subtitle: 'For travellers who genuinely want to lose track of the calendar',
        bestFor: 'Writers, photographers, sabbatical travellers',
        stopsSummary: ['Full loop with 3+ days in Sangla, 4 days in Spiti villages, 3 days in Lahaul homesteads, and deep Pabbar valley approach'],
        focus: ['Living with local families', 'Monastery morning prayers', 'Forgotten trails', 'Zero hurry']
      }
    ],
    passes: [HIGH_PASSES[2], HIGH_PASSES[3], HIGH_PASSES[4]],
    secretStops: [
      {
        id: 'sec-05',
        category: 'Secret View',
        location: 'Old Gompa trail above Dhankar',
        teaserTitle: 'The Confluence from 4,000 Meters',
        teaserQuote: 'There is a tiny stone bench above the monastery where no tourists walk.',
        revealedInsight: 'Climb 20 minutes behind Dhankar monastery past the prayer flags. You sit perched on an ancient mud pinnacle looking down at the meeting of the turquoise Pin river and the milky Spiti river, surrounded by bare jagged peaks.',
        pahadiNote: 'Yahan mobile ka signal nahi hai, par dimaag bilkul shant ho jayega.',
        coordinatesHint: 'Dhankar Ridge · 32.01°N, 78.21°E'
      },
      {
        id: 'sec-06',
        category: 'Don\'t Rush This',
        location: 'Langza Village under Chau Chau Kang Nilda',
        teaserTitle: 'Tea with the Shepherd in Langza',
        teaserQuote: 'The temptation is to take a photo of the golden Buddha and drive off.',
        revealedInsight: 'Stay until 4 PM. When the day cabs leave for Kaza, the village shepherd releases his sheep across the fossil slopes. The mud houses turn burnt orange in the setting sun, and someone will always offer you hot butter tea.',
        pahadiNote: 'Pahadon mein photo lene nahi, unka mehmaan banne aate hain.',
        coordinatesHint: 'Langza High Plateau · 4,400 m'
      }
    ],
    stays: [
      {
        id: 'stay-05',
        name: 'The Mud Homestead of Kaza',
        category: 'Nothing Around For Miles',
        valley: 'Spiti Valley',
        atmosphere: 'Traditional rammed-earth walls 2 feet thick, solar heated, facing the snow-capped Spiti range.',
        elevation: '3,700 m',
        image: SPITI_LOOP_IMAGE,
        notes: 'Hand-woven yak wool blankets, traditional Bukhari wood stove, unfiltered view of the Milky Way.'
      },
      {
        id: 'stay-06',
        name: 'Baspa Riverside Timber Retreat',
        category: 'Inside The Orchard',
        valley: 'Sangla Valley, Kinnaur',
        atmosphere: 'Set in a secluded apple grove where the snowmelt of Baspa river flows 50 meters away.',
        elevation: '2,680 m',
        image: SECLUDED_STAY_IMAGE,
        notes: 'Local Kinnauri architecture, freshly baked bread with wild berry jam, views of high granite crags.'
      }
    ],
    foods: [
      {
        id: 'food-03',
        dishName: 'Hand-pulled Thukpa & Steamed Tingmo',
        setting: 'Kitchen of an ancient mud home in Kaza',
        route: 'Route 03: The Great Loop',
        description: 'Rich slow-simmered bone or vegetable broth with hand-rolled wheat noodles, wild mountain greens, black garlic paste, and pillowy steamed sourdough Tingmo buns.',
        bestTime: 'Evening when high Spiti winds bring temperatures down near zero',
        pahadiTip: 'Dip the Tingmo into the hot soup broth so it drinks the spices. Ek bite mein saari thand gayab.'
      }
    ],
    pahadiDialogue: {
      situation: 'Sitting on a rock looking at Kunzum Pass summit',
      quote: '“Rasta kathin hai, par manzil to har mod par hi thi.”'
    }
  }
];

export const ALL_SECRETS: EnrouteSecret[] = [
  ...ENROUTE_ROUTES[0].secretStops,
  ...ENROUTE_ROUTES[1].secretStops,
  ...ENROUTE_ROUTES[2].secretStops,
  {
    id: 'sec-07',
    category: 'Best Hour',
    location: 'Thanedar Apple Orchards',
    teaserTitle: 'The Apple Blossom Twilight',
    teaserQuote: 'In late April, when petals drift like soft snow across the valley.',
    revealedInsight: 'Sit on the wooden veranda of the old church in Kotgarh as the evening shadows fill the Sutlej gorge below. The air smells sweet with blossoms and pine needles.',
    pahadiNote: 'Is waqt sirf khamoshi suno.',
    coordinatesHint: 'Kotgarh Valley'
  },
  {
    id: 'sec-08',
    category: 'Ask For This',
    location: 'Any roadside dhaba beyond Rampur',
    teaserTitle: 'The Unlisted Salt Butter Chai',
    teaserQuote: 'Never order the commercial sweet chai once you enter higher Kinnaur.',
    revealedInsight: 'Ask for ‘Cha-Ja’ or Tibetan butter tea churned with yak butter and rock salt. It restores electrolytes instantly at altitude and warms your core better than any beverage.',
    pahadiNote: 'Do ghoont mein body garam ho jaati hai.',
    coordinatesHint: 'Kinnaur & Spiti highway dhabas'
  }
];

export const PAHADI_OBSERVATIONS = [
  {
    context: 'At a hidden road turn',
    pahadiSays: '“Idhar se kam log jaate hain. Jo jaate hain, wo laut ke nahi aana chaahte.”',
    meaning: 'Few take this turn. Those who do rarely want to return.'
  },
  {
    context: 'At a roadside view',
    pahadiSays: '“Chai?”',
    meaning: 'The universal mountain pause. Nothing is so urgent that it cannot wait for tea.'
  },
  {
    context: 'When an itinerary has 8 stops in 1 day',
    pahadiSays: '“Itna kya bhaagna? Pahaad kahin bhaag nahi rahe.”',
    meaning: 'Why such a rush? The mountains aren’t running away.'
  },
  {
    context: 'At a peaceful sunset viewpoint',
    pahadiSays: '“...” (He says nothing. He simply sits on the stone wall and watches the clouds.)',
    meaning: 'Some moments are ruined by conversation.'
  }
];

export const BRAND_PEOPLE = [
  { role: 'Orchard Farmer', location: 'Kotgarh', quote: '“A tree takes eight years to bear fruit. The road taught us patience before anything else.”', image: UPPER_SHIMLA_IMAGE },
  { role: 'Chai Shop Keeper', location: 'Jalori Pass', quote: '“In forty years, no traveller who paused for twenty minutes ever regretted being late.”', image: KULLU_MANALI_IMAGE },
  { role: 'Homestay Host', location: 'Tirthan Valley', quote: '“Our doors have locks, but we only use them when the monsoons come to keep the wind out.”', image: SECLUDED_STAY_IMAGE },
  { role: 'Expedition Driver', location: 'Spiti Circuit', quote: '“You don’t fight the road in the Himalayas. You ask its permission.”', image: SPITI_LOOP_IMAGE }
];
