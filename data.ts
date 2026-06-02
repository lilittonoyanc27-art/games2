/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Character, RaceQuestion, TranslationWord, CrosswordClue, LabyrinthQuestion } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'gor',
    name: 'Գոռ (Gor)',
    avatar: '🏎️🇦🇲',
    color: 'text-brand-red',
    bgGradient: 'from-brand-red to-amber-500',
    vehicle: 'Արարատ F1 կարմիր բոլիդ 🔴🏁',
    bio: 'Համարձակ ավտոարշավորդ և արկածախնդիր: Գոռի սրընթաց բնավորությունն օգնում է նրան սլանալ դեպի հաղթանակ, բայց քերականության մեջ նրան երբեմն պետք է զգուշություն:'
  },
  {
    id: 'gayane',
    name: 'Գայանե (Gayane)',
    avatar: '🏎️⚡',
    color: 'text-indigo-400',
    bgGradient: 'from-indigo-600 to-purple-500',
    vehicle: 'Գառնի F1 մանուշակագույն բոլիդ 🟣⚡',
    bio: 'Խելացի և ուշադիր լեզվաբան: Գայանեն սիրում է վերլուծել քերականական կանոնները և օգնում է Գոռին խուսափել սխալներից իր նոր սերնդի մեքենայով:'
  }
];

export const RACE_QUESTIONS: RaceQuestion[] = [
  {
    id: 1,
    question: "Hoy mi amigo y yo ______ un café en el centro.",
    translation: "Այսօր ընկերս և ես սուրճ խմեցինք կենտրոնում։",
    options: ["hemos tomado", "tomamos", "tomábamos"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "Hoy",
    explanation: "'Hoy' (այսօր) ցուցիչը մատնանշում է ժամանակահատված, որը դեռ չի ավարտվել: Նման դեպքերում իսպաներենում օգտագործվում է Pretérito Perfecto-ն (hemos tomado):"
  },
  {
    id: 2,
    question: "Ayer ______ una película de acción en el cine.",
    translation: "Երեկ ես կինոթատրոնում մարտաֆիլմ դիտեցի։",
    options: ["he visto", "vi", "veía"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "Ayer",
    explanation: "'Ayer' (erեկ) ցուցիչը մատնանշում է ամբողջությամբ ավարտված և ներկայից անջատված ժամանակահատված: Օգտագործվում է Pretérito Indefinido-ն (vi):"
  },
  {
    id: 3,
    question: "Cuando yo ______ pequeño, jugaba mucho en el patio.",
    translation: "Երբ ես փոքր էի, շատ էի խաղում բակում։",
    options: ["he sido", "fui", "era"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "Cuando era pequeño",
    explanation: "Անցյալում մարդու հատկանիշները կամ հանգամանքները նկարագրելու, ինչպես նաև մանկության տարիները նկարագրելու համար օգտագործվում է Pretérito Imperfecto-ն (era):"
  },
  {
    id: 4,
    question: "¿Alguna vez ______ paella valenciana?",
    translation: "Երբևէ կերե՞լ ես վալենսիական պաելյա։",
    options: ["has comido", "comiste", "comías"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "¿Alguna vez...?",
    explanation: "'¿Alguna vez...?' (երբևէ) կառույցը վերաբերում է անձնական կենսափորձին, որը պատկանում է դեռ չավարտված կյանքի ժամանակահատվածին: Օգտագործվում է Pretérito Perfecto-ն (has comido):"
  },
  {
    id: 5,
    question: "El año pasado los chicos ______ a Armenia de vacaciones.",
    translation: "Անցյալ տարի երեխաները արձակուրդին մեկնեցին Հայաստան։",
    options: ["han viajado", "viajaron", "viajaban"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "El año pasado",
    explanation: "'El año pasado' (անցյալ տարի) արտահայտությունը անցյալի կոնկրետ ավարտված ժամանակ է, ուստի ընտրում ենք Pretérito Indefinido-ն (viajaron):"
  },
  {
    id: 6,
    question: "Mientras mi madre cocinaba, mi padre ______ la tele.",
    translation: "Մինչ մայրս պատրաստում էր, հայրս հեռուստացույց էր դիտում։",
    options: ["ha mirado", "miró", "miraba"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "Mientras",
    explanation: "'Mientras' (մինչդեռ / այն ժամանակ, երբ) շաղկապը կապում է անցյալում միաժամանակ տեղի ունեցած երկու զուգահեռ երկարատև գործողություն: Երկու բայերն էլ դրվում են Imperfecto-ով (miraba):"
  },
  {
    id: 7,
    question: "Todavía no ______ los platos de la cena.",
    translation: "Ես դեռ չեմ լվացել ընթրիքի ամանները։",
    options: ["he fregado", "fregué", "fregaba"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "Todavía no",
    explanation: "'Todavía no' (դեռ ոչ / դեռ չի) արտահայտությունն օգտագործվում է Pretérito Perfecto-ի հետ, քանի որ ենթադրում է կապ ներկայի հետ (գործողությունը սպասվում է, բայց դեռ չի կատարվել):"
  },
  {
    id: 8,
    question: "De repente, un gato ______ por la ventana.",
    translation: "Հանկարծ մի կատու ներս մտավ պատուհանից։",
    options: ["ha entrado", "entró", "entraba"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "De repente",
    explanation: "'De repente' (հանկարծ) արտահայտությունը ներմուծում է անցյալում տեղի ունեցած ակնթարթային, ընդհատող գործողություն, ինչը պահանջում է Pretérito Indefinido-ի կիրառում (entró):"
  },
  {
    id: 9,
    question: "Antes, la gente no ______ teléfonos móviles.",
    translation: "Նախկինում մարդիկ բջջային հեռախոսներ չունեին։",
    options: ["ha tenido", "tuvo", "tenía"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "Antes",
    explanation: "'Antes' (նախկինում / առաջ) արտահայտությունը մատնանշում է անցյալում սովորական դարձած վիճակի կամ կանոնավոր գործողությունների նկարագրություն: Սա դասական դեպք է Pretérito Imperfecto-ի համար (tenía):"
  },
  {
    id: 10,
    question: "Esta mañana Pepe ______ muy tarde.",
    translation: "Այս առավոտ Պեպեն շատ ուշ արթնացավ։",
    options: ["se ha despertado", "se despertó", "se despertaba"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "Esta mañana",
    explanation: "'Esta mañana' (այս առավոտ) արտահայտությունը հանդիսանում է այսօրվա մի մասը, որը դեռ շարունակվում է խոսողի համար: Օգտագործվում է Pretérito Perfecto-ն (se ha despertado):"
  },
  {
    id: 11,
    question: "En 2018, mis tíos ______ una house hermosa.",
    options: ["han comprado", "compraron", "compraban"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "En 2018",
    explanation: "Կոնկրետ ամսաթվերը և պատմական իրադարձությունները (En 2018) պահանջում են Pretérito Indefinido, քանի որ գործողությունը կատարվել է մեկ անգամ՝ անցյալի ճշգրիտ ֆիքսված պահին (compraron):"
  },
  {
    id: 12,
    question: "Siempre que íbamos al parque, ______ un helado.",
    options: ["hemos tomado", "tomamos", "tomábamos"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "Siempre que",
    explanation: "'Siempre que...' (ամեն անգամ, երբ...) արտահայտում է անցյալում սովորական, կրկնվող գործողություններ, ինչը պահանջում է Pretérito Imperfecto (tomábamos):"
  },
  {
    id: 13,
    question: "Ya ______ el proyecto de español.",
    options: ["he terminado", "terminé", "terminaba"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "Ya",
    explanation: "'Ya' (արդեն) ցուցիչը մատնանշում է, որ գործողությունն ավարտվել է ներկա պահի դրությամբ, և արդյունքը կարևոր է հենց հիմա: Օգտագործվում է Pretérito Perfecto-ն (he terminado):"
  },
  {
    id: 14,
    question: "La semana pasada yo ______ una carta de mi abuela.",
    options: ["he recibido", "recibí", "recibía"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "La semana pasada",
    explanation: "'La semana pasada' (անցյալ շաբաթ) արտահայտությունը մատնանշում է ավարտված ժամանակահատված, որը կապված չէ ներկայի հետ: Օգտագործվում է Pretérito Indefinido-ն (recibí):"
  },
  {
    id: 15,
    question: "En aquella época, la ciudad ______ muy tranquila.",
    options: ["ha sido", "fue", "era"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "En aquella época",
    explanation: "Անցյալում քաղաքների, եղանակի կամ վիճակների նկարագրությունները («այն ժամանակաշրջանում») պահանջում են Pretérito Imperfecto-ի օգտագործում (era):"
  },
  {
    id: 16,
    question: "Hace cinco minutos el profesor ______ la clase.",
    options: ["ha empezado", "empezó", "empezaba"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "Hace poco tiempo",
    explanation: "\"Hace + կարճ ժամանակահատված\" կառույցը (օրինակ՝ hace 5 minutos) արտահայտում է ներկայի հետ սերտորեն կապված գործողություն, ուստի օգտագործվում է Pretérito Perfecto-ն (ha empezado):"
  },
  {
    id: 17,
    question: "El otro día Carmen ______ a su antiguo amigo.",
    options: ["ha visto", "vio", "veía"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "El otro día",
    explanation: "'El otro día' (օրերս / անցած օրը) արտահայտությունը մատնանշում է անցյալում տեղի ունեցած մեկանգամյա ավարտված գործողություն: Օգտագործվում է Pretérito Indefinido-ն (vio):"
  },
  {
    id: 18,
    question: "Todos los veranos nosotros ______ a las montañas de Armenia.",
    options: ["hemos ido", "fuimos", "íbamos"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "Todos los veranos",
    explanation: "'Todos los veranos' (ամեն ամառ) ընդգծում է գործողության կրկնելիությունը տարեցտարի: Սա անցյալում սովորական սովորույթ է, որը պահանջում է Imperfecto (íbamos):"
  },
  {
    id: 19,
    question: "¿Por qué no ______ tus deberes todavía?",
    options: ["has hecho", "hiciste", "hacías"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "Todavía",
    explanation: "'Todavía' (դեռ) բառն ուղղված է դեպի ներկա պահը: Հարցը վերաբերում է ներկա վայրկյանի դրությամբ չկատարված գործողությանը — օգտագործվում է Pretérito Perfecto-ն (has hecho):"
  },
  {
    id: 20,
    question: "Anoche los gatos ______ mucho ruido en el tejado.",
    options: ["han hecho", "hicieron", "hacían"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "Anoche",
    explanation: "'Anoche' (երեկ երեկոյան / անցած գիշեր) ավարտված ժամանակահատված է: Պահանջում է Pretérito Indefinido-ի օգտագործում (hicieron):"
  },
  {
    id: 21,
    question: "Cuando yo ______ diez años, aprendί a conducir karts.",
    options: ["he tenido", "tuve", "tenía"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "Expresar edad",
    explanation: "Անցյալում տարիք արտահայտելու համար իսպաներենում միշտ օգտագործվում է Pretérito Imperfecto-ն (tenía):"
  },
  {
    id: 22,
    question: "Este año ______ un gran progreso en español.",
    options: ["hemos hecho", "hicimos", "hacíamos"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "Este año",
    explanation: "'Este año' (այս տարի) չավարտված ժամանակահատված է, քանի որ ընթացիկ տարին դեռ շարունակվում է: Պահանջվում է Pretérito Perfecto-ն (hemos hecho):"
  },
  {
    id: 23,
    question: "Ayer a las seis de la tarde, yo ______ la lección de gramática.",
    options: ["he estudiado", "estudié", "estudiaba"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "Ayer a las seis",
    explanation: "Չնայած նշված է կոնկրետ ժամ, գործողությունն ամբողջությամբ ավարտվել է երեկվա այդ կոնկրետ պահին: Օգտագործվում է Pretérito Indefinido-ն (estudié):"
  },
  {
    id: 24,
    question: "Las calles ______ mojadas porque llovía sin parar.",
    options: ["han estado", "estuvieron", "estaban"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "Descripción de estado",
    explanation: "Անցյալում ֆոնի և փողոցների վիճակի նկարագրությունը (դրանք թաց էին) անձրևի երկարատև գործընթացի (llovía) ֆոնին պահանջում է Pretérito Imperfecto (estaban):"
  },
  {
    id: 25,
    question: "Últimamente yo no ______ muy bien.",
    options: ["he dormido", "dormí", "dormía"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "Últimamente",
    explanation: "'Últimamente' (վերջին շրջանում) արտահայտում է ներկա պահին անմիջապես հարող ժամանակահատված: Օգտագործվում է Pretérito Perfecto-ն (he dormido):"
  },
  {
    id: 26,
    question: "En cuanto sonó la campana, los alumnos ______ del aula.",
    options: ["han salido", "salieron", "salían"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "En cuanto",
    explanation: "'En cuanto' (հենց որ) արտահայտությունը ներմուծում է անցյալում տեղի ունեցած արագ հաջորդական գործողությունների շղթա: Դա պահանջում է Pretérito Indefinido (salieron):"
  },
  {
    id: 27,
    question: "Eran las tres de la tarde cuando de repente ______ a granizar.",
    options: ["ha empezado", "empezó", "empezaba"],
    correctIndex: 1,
    tense: "indefinido",
    cueWord: "Eran las tres... cuando",
    explanation: "Ժամանակն արտահայտվում է Imperfecto-ով (Eran las tres), սակայն հանկարծակի ընդհատող դեպքը դրվում է Pretérito Indefinido-ով (empezó):"
  },
  {
    id: 28,
    question: "Antes de mudarme a Ereván, yo ______ en Madrid.",
    options: ["he vivido", "viví", "vivía"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "Descripción de fondo",
    explanation: "Մինչև Երևան տեղափոխվելը Մադրիդում բնակվելը նկարագրում է անցյալում երկարատև բնույթ ունեցող մշտական ֆոնային վիճակ: Օգտագործվում է Pretérito Imperfecto-ն (vivía):"
  },
  {
    id: 29,
    question: "¡Qué sorpresa! Hoy ______ a mi querida amiga Sofía.",
    options: ["he visitado", "visité", "visitaba"],
    correctIndex: 0,
    tense: "perfecto",
    cueWord: "Hoy",
    explanation: "Դեպքը տեղի է ունեցել այսօր («Hoy»), ինչը կապում է այն ընթացիկ օրվա հետ: Իսպաներենում սա միանշանակ պահանջում է Pretérito Perfecto-ն (he visitado):"
  },
  {
    id: 30,
    question: "En aquel momento nosotros no ______ qué hacer.",
    options: ["hemos sabido", "supimos", "sabíamos"],
    correctIndex: 2,
    tense: "imperfecto",
    cueWord: "Estado mental",
    explanation: "Անցյալում իմացությունը, չիմացությունը կամ մտորումները («չգիտեինք ինչ անել») սովորաբար արտահայտում են երկարատև մտավոր վիճակ՝ որպես ֆոն, ուստի օգտագործվում է Pretérito Imperfecto-ն (sabíamos):"
  }
];

export const TRANSLATION_WORDS: TranslationWord[] = [
  {
    id: 1,
    spanish: "Ayer comí paella",
    armenian: "Երեկ ես պաելյա կերա",
    tense: "indefinido",
    explanation: "'Ayer'-ը մատնանշում է ավարտված գործողություն անցյալի կոնկրետ պահին: 'Comí'-ն comer-ի Indefinido ձևն է (ես կերա):",
    context: "Երեկվա ընթրիքի հիշողություններ:"
  },
  {
    id: 2,
    spanish: "Este año he viajado",
    armenian: "Այս տարի ես ճանապարհորդել եմ",
    tense: "perfecto",
    explanation: "Este año-ն (այս տարի) չի ավարտվել: Օգտագործվում է Perfecto՝ 'he viajado' (ճանապարհորդել եմ):",
    context: "Այս տարվա ճանապարհորդության տպավորություններ:"
  },
  {
    id: 3,
    spanish: "Antes cantábamos canciones",
    armenian: "Առաջ մենք երգեր էինք երգում",
    tense: "imperfecto",
    explanation: "Antes-ը (առաջ/նախկինում) արտահայտում է անցյալում կրկնվող գործողություն կամ սովորություն: Ստանում ենք 'cantábamos' (մենք երգում էինք, Imperfecto):",
    context: "Խարույկի շուրջ հայկական ժողովրդական երգերի հիշողություններ:"
  },
  {
    id: 4,
    spanish: "Hoy he bebido café",
    armenian: "Այսօր ես սուրճ եմ խմել",
    tense: "perfecto",
    explanation: "Այսօր (Hoy) — չավարտված ժամանակ է: Կիրառվում է 'he bebido' (ես խմել եմ, Perfecto) ձևը beber բայից:",
    context: "Առավոտյան թարմացնող սուրճ աշխատանքից կամ դասերից առաջ:"
  },
  {
    id: 5,
    spanish: "Anoche regresé tarde",
    armenian: "Անցած գիշեր ես ուշ վերադարձա",
    tense: "indefinido",
    explanation: "Anoche-ն (անցած գիշեր) անցյալի ավարտված հատված է: Օգտագործում ենք 'regresé' (ես վերադարձա, Indefinido) ձևը:",
    context: "Ուշ ժամանելու իրավիճակի բացատրություն:"
  },
  {
    id: 6,
    spanish: "Siempre leíamos mucho",
    armenian: "Մենք միշտ շատ էինք կարդում",
    tense: "imperfecto",
    explanation: "Siempre-ն (միշտ) նկարագրում է կանոնավոր գործողություն անցյալում: Օգտագործվում է 'leíamos' (մենք կարդում էինք, Imperfecto) ձևը:",
    context: "Անցյալի ջանասիրության մասին ընդհանուր հուշեր:"
  },
  {
    id: 7,
    spanish: "Ya he terminado la carrera",
    armenian: "Ես արդեն ավարտել եմ մրցարշավը",
    tense: "perfecto",
    explanation: "Ya-ն (արդեն) կապում է գործողությունը ներկայում ունեցած արդյունքի հետ: Օգտագործվում է Perfecto-ն՝ 'he terminado':",
    context: "Կատարված աշխատանքի կամ մրցույթի ավարտի մասին:"
  },
  {
    id: 8,
    spanish: "En 2020 gané la copa",
    armenian: "2020 թվականին ես հաղթեցի գավաթը",
    tense: "indefinido",
    explanation: "Անցյալի կոնկրետ տարեթիվը (En 2020) պահանջում է Indefinido՝ 'gané' (ես հաղթեցի):",
    context: "Առաջնության առաջին կարևոր ոսկե մեդալի հիշողությունը:"
  },
  {
    id: 9,
    spanish: "De niño era muy rápido",
    armenian: "Մանկությանս տարիներին ես շատ արագաշարժ էի",
    tense: "imperfecto",
    explanation: "Մանկության տարիների հատկանիշների նկարագրությունը (De niño...) պահանջում է Imperfecto: Ser բայը դառնում է 'era' (ես էի):",
    context: "Մանկության հիշողություններ արագավազ լինելու մասին:"
  },
  {
    id: 10,
    spanish: "Todavía no ha llegado",
    armenian: "Նա դեռ չի ժամանել",
    tense: "perfecto",
    explanation: "Todavía no-ն (դեռ ոչ) մատնանշում է ներկա պահին արդյունքի բացակայությունը: Պահանջվում է Perfecto՝ 'ha llegado':",
    context: "Ընկերոջը կամ ուղեկցին սպասելու պահը:"
  },
  {
    id: 11,
    spanish: "Ayer decidimos el plan",
    armenian: "Երեկ մենք որոշեցինք ծրագիրը",
    tense: "indefinido",
    explanation: "Ayer-ը (երեկ) ավարտված գործողություն է: Ընտրում ենք Indefinido՝ 'decidimos' (մենք որոշեցինք):",
    context: "Ուղևորության երթուղու համատեղ պլանավորում:"
  },
  {
    id: 12,
    spanish: "Hacía sol en el monte",
    armenian: "Սարում արև էր",
    tense: "imperfecto",
    explanation: "Անցյալում եղանակի նկարագրությունը հանդես է գալիս որպես իրադարձությունների ֆոն: Օգտագործվում է Imperfecto՝ 'hacía sol':",
    context: "Զբոսանքի ժամանակ վեհասքանչ Արարատ լեռան նկարագրությունը:"
  },
  {
    id: 13,
    spanish: "Esta semana he aprendido mucho",
    armenian: "Այս շաբաթ ես շատ բան եմ սովորել",
    tense: "perfecto",
    explanation: "Esta semana-ն (այս շաբաթ) շարունակվում է այսօր: Օգտագործվում է Perfecto՝ 'he aprendido':",
    context: "Շաբաթվա արդյունքների կամ ուսման քննարկում:"
  },
  {
    id: 14,
    spanish: "El mes pasado compré un coche",
    armenian: "Անցյալ ամիս ես մեքենա գնեցի",
    tense: "indefinido",
    explanation: "El mes pasado-ն (անցյալ ամիս) ամբողջությամբ ավարտվել է: Օգտագործվում է Indefinido՝ 'compré':",
    context: "Մեքենա ձեռք բերելու մասին նորություն:"
  },
  {
    id: 15,
    spanish: "Antes cantábamos en el coro",
    armenian: "Առաջ մենք երգում էինք երգչախմբում",
    tense: "imperfecto",
    explanation: "Անցյալում պարբերաբար կրկնվող սովորական գործողությունների կամ վիճակների նկարագրությունը (Antes...) պահանջում է Imperfecto՝ 'cantábamos' (մենք երգում էինք):",
    context: "Երաժշտական անցյալի և հաճելի հիշողությունների մասին զրույց:"
  },
  {
    id: 16,
    spanish: "Hace un momento he cenado",
    armenian: "Մեկ րոպե առաջ ես ընթրեցի",
    tense: "perfecto",
    explanation: "Hace un momento-ն (հենց նոր / մեկ րոպե առաջ) արտահայտում է թարմ գործողություն՝ ուղիղ կապով: Օգտագործվում է Perfecto՝ 'he cenado':",
    context: "Հագեցած ընթրիք մարզումներից հետո:"
  },
  {
    id: 17,
    spanish: "La semana pasada perdí mi mapa",
    armenian: "Անցյալ շաբաթ ես կորցրեցի իմ քարտեզը",
    tense: "indefinido",
    explanation: "La semana pasada-ն (անցյալ շաբաթ) ավարտված դեպք է անցյալում: Օգտագործվում է Indefinido՝ 'perdí':",
    context: "Լեռներում թղթե ճանապարհային քարտեզի որոնում:"
  },
  {
    id: 18,
    spanish: "Vivían en una casa bonita",
    armenian: "Նրանք ապրում էին գեղեցիկ տանը",
    tense: "imperfecto",
    explanation: "Անցյալի անորոշ ժամանակաշրջանում բնակության ֆոնային վիճակի նկարագրությունը պահանջում է Imperfecto՝ 'vivían':",
    context: "Զրույցներ նախնիների և ավանդական տների մասին:"
  },
  {
    id: 19,
    spanish: "Hoy la profesora ha hablado",
    armenian: "Այսօր ուսուցչուհին խոսել է",
    tense: "perfecto",
    explanation: "Hoy (այսօր) — չավարտված օր է, ուստի բայերը դրվում են Perfecto-ով՝ 'ha hablado':",
    context: "Իսպաներենի դասի արդյունավետ քննարկում:"
  },
  {
    id: 20,
    spanish: "Ayer corrimos en la pista",
    armenian: "Երեկ մենք վազեցինք մրցուղում",
    tense: "indefinido",
    explanation: "Ayer-ը (երեկ) մատնանշում է անցյալում ավարտված կոնկրետ գործողություն, ինչը պահանջում է Indefinido՝ 'corrimos' (մենք վազեցինք):",
    context: "Մարզադաշտում կամ մրցուղում ակտիվ վազքի հիշողություն:"
  }
];

export const CROSSWORD_CLUES: CrosswordClue[] = [
  {
    id: 1,
    number: 1,
    direction: "horizontal",
    row: 2,
    col: 1,
    length: 7,
    question: "Cantar (երգել) բայի ձևը Pretérito Imperfecto-ում 'yo' դեմքի համար (Ես երգում էի)",
    answer: "CANTABA",
    explanation: "-ar-ով ավարտվող բայերը Imperfecto-ում ստանում են -aba վերջավորություն: Yo cantaba.",
    tense: "imperfecto"
  },
  {
    id: 2,
    number: 2,
    direction: "horizontal",
    row: 4,
    col: 1,
    length: 5,
    question: "Hacer (անել) բայի անկանոն դերբայը (participio): Օգտագործվում է Perfecto-ում՝ 'he ____' (ես արել եմ)",
    answer: "HECHO",
    explanation: "Hacer-ն ունի անկանոն դերբայի hecho ձևը, որով կազմվում է Pretérito Perfecto-ն.",
    tense: "perfecto"
  },
  {
    id: 3,
    number: 3,
    direction: "horizontal",
    row: 7,
    col: 1,
    length: 4,
    question: "Vivir (ապրել) բայի ձևը Pretérito Indefinido-ում 'yo' դեմքի համար (Ես ապրեցի)",
    answer: "VIVI", // without accent in the crossword grid
    explanation: "-ir-ով ավարտվող բայերի համար Indefinido-ում դրվում է -í վերջավորությունը 'yo' դեմքի համար: Yo viví.",
    tense: "indefinido"
  },
  {
    id: 4,
    number: 4,
    direction: "vertical",
    row: 2,
    col: 2,
    length: 4,
    question: "Pretérito Indefinido-ի ժամանակային ցուցիչ, որը թարգմանվում է որպես 'երեկ'",
    answer: "AYER",
    explanation: "Ayer-ը մատնանշում է ավարտված օր, որն անջատված է ներկայից: Indefinido-ի ցուցիչ է.",
    tense: "indefinido"
  },
  {
    id: 5,
    number: 5,
    direction: "vertical",
    row: 2,
    col: 5,
    length: 3,
    question: "Ինչպե՞ս կլինի «անցյալ տարի» արտահայտությունը իսպաներեն (առանց տիլդայի, 3 տառ)՝ «el ___ pasado»",
    answer: "ANO",
    explanation: "«El año pasado» նշանակում է «անցյալ տարի» և հանդիսանում է Pretérito Indefinido-ի ժամանակային ցուցիչ (գրվում է առանց տիլդայի` ANO)։",
    tense: "indefinido"
  },
  {
    id: 6,
    number: 6,
    direction: "vertical",
    row: 0,
    col: 7,
    length: 3,
    question: "Ir (գնալ) բայի ձևը Pretérito Imperfecto-ում 'yo' դեմքի համար (Ես գնում էի)",
    answer: "IBA",
    explanation: "Ir բայը Imperfecto-ի երեք բացառություններից մեկն է: Ձևերն են՝ iba, ibas, iba...",
    tense: "imperfecto"
  }
];

export const LABYRINTH_QUESTIONS: LabyrinthQuestion[] = [
  {
    id: 1,
    sentence: "El año pasado nosotros ______ un viaje increíble a Armenia.",
    options: ["hemos hecho", "hicimos", "hacíamos"],
    correctIndex: 1,
    tense: "indefinido",
    explanation: "'El año pasado' (անցյալ տարի) արտահայտությունը պահանջում է Pretérito Indefinido՝ անցյալի ավարտված փաստը մատնանշելու համար (hicimos):"
  },
  {
    id: 2,
    sentence: "Cuando llegaron mis amigos, yo ya ______ la cena.",
    options: ["he preparado", "preparé", "preparaba"],
    correctIndex: 2,
    tense: "imperfecto",
    explanation: "Ընկերների ժամանումը ընդհատում է ընթացիկ ֆոնային գործողությունը, որն արդեն ընթացքի մեջ էր: Ֆոնի համար օգտագործվում է Imperfecto (preparaba):"
  },
  {
    id: 3,
    sentence: "Ayer a las 8, Carmen ______ un coche rojo por la calle.",
    options: ["ha visto", "vio", "veía"],
    correctIndex: 1,
    tense: "indefinido",
    explanation: "Երեկ երեկոյան կոնկրետ ժամին տեղի ունեցած մեկանգամյա ավարտված գործողությունը պահանջում է Pretérito Indefinido (vio):"
  },
  {
    id: 4,
    sentence: "¿Ya ______ la nueva película de Almodóvar?",
    options: ["has visto", "viste", "veías"],
    correctIndex: 0,
    tense: "perfecto",
    explanation: "'¿Ya...?' (արդեն) արտահայտությունը մատնանշում է գործողության արդյունքը ներկա պահին, ինչը պահանջում է Pretérito Perfecto (has visto):"
  },
  {
    id: 5,
    sentence: "Antes, nosotros ______ en esa antigua plazuela.",
    options: ["hemos jugado", "jugamos", "jugábamos"],
    correctIndex: 2,
    tense: "imperfecto",
    explanation: "'Antes' (առաջ) արտահայտությունը մատնանշում է անցյալում կրկնվող գործողություն, սովորույթ կամ մշտական ֆոն: Օգտագործվում է Imperfecto (jugábamos):"
  },
  {
    id: 6,
    sentence: "Esta semana mis primos ______ en una carrera de coches.",
    options: ["han participado", "participaron", "participaban"],
    correctIndex: 0,
    tense: "perfecto",
    explanation: "'Esta semana' (այս շաբաթ) արտահայտությունը շարունակում է ընթացիկ ժամանակահատվածը: Պահանջվում է Pretérito Perfecto-ի օգտագործում (han participado):"
  }
];
