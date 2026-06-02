/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, BookOpen, Trophy, 
  Gamepad2, Languages, UserCheck, HelpCircle,
  Cat
} from 'lucide-react';

// Import our games and data
import { CHARACTERS } from './data';
import RaceGame from './RaceGame';
import TranslationGame from './TranslationGame';
import CrosswordGame from './CrosswordGame';

type ActiveTab = 'race' | 'translation' | 'crossword';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('race');
  const [selectedBioChar, setSelectedBioChar] = useState<'gor' | 'gayane' | null>(null);

  // Quick grammar notes expander
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  return (
    <div id="main-root animate-fade-in" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none antialiased selection:bg-brand-red selection:text-white">
      
      {/* Decorative Beautiful Armenian Tricolor Accent Line on top */}
      <div id="armenian-tricolor-accent" className="h-1.5 w-full flex bg-slate-900">
        <div className="h-full bg-red-650 flex-1" style={{ backgroundColor: '#FF4136' }}></div>
        <div className="h-full bg-blue-650 flex-1" style={{ backgroundColor: '#0074D9' }}></div>
        <div className="h-full bg-orange-650 flex-1" style={{ backgroundColor: '#FF851B' }}></div>
      </div>

      {/* HEADER BANNER */}
      <header id="main-header" className="relative border-b border-slate-800 sleek-header-gradient px-4 py-5 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-red to-amber-500 flex items-center justify-center shadow-lg shadow-red-950/20 text-2xl font-black">
              🇪🇸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-brand-red/10 text-brand-red border border-brand-red/20 rounded px-2 py-0.5 font-bold uppercase tracking-wider font-mono">
                  Իսպաներենի Անցյալ Ժամանակների Խաղ-Մրցույթ
                </span>
                <span className="text-2xs bg-slate-950 text-slate-400 border border-slate-850 rounded px-1.5 py-0.5 font-mono">
                  v2.0
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-sans">
                <span className="text-brand-red">Pasado Pro:</span> Մեծ Մրցանակ (F1)
              </h1>
            </div>
          </div>

          {/* Quick Info & Actions button */}
          <div className="flex items-center gap-3">
            <button
              id="toggle-cheatsheet-btn"
              onClick={() => setShowCheatSheet(prev => !prev)}
              className="bg-slate-800 hover:bg-slate-705 px-4 py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm font-bold text-slate-300 hover:text-white flex items-center gap-2 transition"
            >
               <BookOpen className="w-4 h-4 text-brand-red" />
              Ժամանակների Շպարգալկա
            </button>

            <div className="hidden sm:flex items-center gap-1 text-slate-400 text-xs bg-slate-950 border border-slate-850 p-2 rounded-xl">
              <span>🇦🇲 Հայերեն Ինտերֆեյս</span>
            </div>
          </div>

        </div>
      </header>

      {/* BODY HERO */}
      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        
        {/* CHARACTER BIO EXPLORER TAB */}
        <section id="char-bio-sec" className="bg-slate-800 rounded-2xl border border-white/5 p-5 sm:p-6 shadow-xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(ellipse_at_bottom_right,rgba(239,68,68,0.06),transparent)] select-none pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-brand-red flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-brand-red" />
                Ծանոթացում հերոսների հետ
              </h3>
              <p className="text-slate-350 text-xs sm:text-sm mt-1 max-w-2xl">
                Մեր հերոսներն են՝ Գոռը (ավտոարշավների սիրահար) և Գայանեն (լեզվաբան): Նրանք միավորել են իրենց ուժերը իսպաներենի քերականությունը հաղթահարելու համար: Սեղմե՛ք նրանց դիմանկարներին՝ ավելին իմանալու համար:
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {CHARACTERS.map((char) => (
                <button
                  id={`hero-bio-toggle-${char.id}`}
                  key={char.id}
                  onClick={() => setSelectedBioChar(selectedBioChar === char.id ? null : char.id as 'gor' | 'gayane')}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl border font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md ${
                    selectedBioChar === char.id 
                      ? 'sleek-btn-accent border-transparent text-white' 
                      : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-lg leading-none">{char.avatar.split('🏎️')[1] || char.avatar}</span>
                  <span>{char.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {selectedBioChar && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/5 mt-4 pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-2 text-center text-4xl p-4 bg-slate-900 rounded-xl border border-white/10 max-w-20 mx-auto">
                    {CHARACTERS.find(c => c.id === selectedBioChar)?.avatar}
                  </div>
                  <div className="md:col-span-10 text-xs sm:text-sm text-left space-y-1">
                    <h4 className="font-extrabold uppercase text-white tracking-wide text-sm">
                      {CHARACTERS.find(c => c.id === selectedBioChar)?.name} • <span className="text-brand-red">{CHARACTERS.find(c => c.id === selectedBioChar)?.vehicle}</span>
                    </h4>
                    <p className="text-slate-305 leading-relaxed font-normal">
                      {CHARACTERS.find(c => c.id === selectedBioChar)?.bio}
                    </p>
                    <p className="text-xs text-amber-500 italic font-mono uppercase tracking-wide">
                      💡 Խորհուրդ օդաչուից. «Տարբերե՛ք ժամանակային իրադարձությունները: 'Ayer'-ը (երեկ) միշտ Indefinido է, իսկ 'Antes'-ը (նախկինում)՝ Imperfecto»:
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* GRAMMAR CHEAT SHEET DRAWER */}
        <AnimatePresence>
          {showCheatSheet && (
            <motion.section 
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              className="bg-slate-800 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-705 pb-3">
                <h3 className="text-md sm:text-lg font-extrabold text-brand-red uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-red" />
                  Անցյալ Ժամանակների Քերականական Շպարգալկա
                </h3>
                <button 
                  onClick={() => setShowCheatSheet(false)}
                  className="text-xs text-slate-400 hover:text-white font-bold"
                >
                  [ Փակել ]
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Pretérito Perfecto */}
                <div className="sleek-card-bg p-4 rounded-xl border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono block">1. Pretérito Perfecto</span>
                  <p className="text-slate-300 text-2xs leading-relaxed">
                    Արտահայտում է մի գործողություն, որը կատարվել է դեռևս չավարտված ժամանակահատվածում (այսօր, այս շաբաթ) կամ կապ ունի ներկայի հետ (արդեն ավարտել է, դեռ չի արել):
                  </p>
                  <div className="text-[10px] bg-slate-900 p-2 rounded text-slate-400 font-mono border border-white/5">
                    <strong>Ցուցիչներ՝</strong> hoy, esta semana, este año, ya, todavía no, últimamente.
                  </div>
                  <p className="text-2xs text-amber-500 font-medium">
                    <em>Օրինակ՝</em> Hoy <strong>he comido</strong> paella (Այսօր ես պաելյա եմ կերել):
                  </p>
                </div>

                {/* Pretérito Indefinido */}
                <div className="sleek-card-bg p-4 rounded-xl border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-brand-red uppercase tracking-widest font-mono block">2. Pretérito Indefinido</span>
                  <p className="text-slate-300 text-2xs leading-relaxed">
                    Օգտագործվում է անցյալի կոնկրետ և ամբողջությամբ ավարտված պահին կատարված գործողությունն արտահայտելու համար (երեկ, անցյալ տարի, հանկարծակի):
                  </p>
                  <div className="text-[10px] bg-slate-900 p-2 rounded text-slate-400 font-mono border border-white/5">
                    <strong>Ցուցիչներ՝</strong> ayer, anoche, el año pasado, en 2020, de repente, el otro día.
                  </div>
                  <p className="text-2xs text-brand-red font-medium">
                    <em>Օրինակ՝</em> Ayer <strong>viajé</strong> a España (Երեկ ես ճանապարհորդեցի Իսպանիա):
                  </p>
                </div>

                {/* Pretérito Imperfecto */}
                <div className="sleek-card-bg p-4 rounded-xl border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono block">3. Pretérito Imperfecto</span>
                  <p className="text-slate-300 text-2xs leading-relaxed">
                    Ծառայում է անցյալում հանգամանքների, եղանակի, վիճակների, բնութագրերի, սովորույթների կամ պարբերաբար կրկնվող գործողությունների նկարագրության համար:
                  </p>
                  <div className="text-[10px] bg-slate-900 p-2 rounded text-slate-400 font-mono border border-white/5">
                    <strong>Ցուցիչներ՝</strong> antes, siempre, todos los días, mientras, de niño, los lunes.
                  </div>
                  <p className="text-2xs text-brand-blue font-medium">
                    <em>Օրինակ՝</em> Antes <strong>cantábamos</strong> mucho (Առաջ մենք շատ էինք երգում):
                  </p>
                </div>

              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* INTERACTIVE NAVIGATION TABS FOR THE 3 GAMES */}
        <div id="game-tabs-bar" className="bg-slate-800 p-2 rounded-2xl border border-white/5 flex flex-wrap gap-1 md:gap-2">
          
          <button
            id="tab-btn-race"
            onClick={() => setActiveTab('race')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'race'
                ? 'bg-gradient-to-r from-brand-red to-orange-500 text-white shadow-lg shadow-brand-red/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            🏎️ Ֆորմուլա-1
          </button>

          <button
            id="tab-btn-translation"
            onClick={() => setActiveTab('translation')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'translation'
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-lg shadow-brand-blue/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <Languages className="w-4 h-4" />
            📖 Թարգմանիչ
          </button>

          <button
            id="tab-btn-crossword"
            onClick={() => setActiveTab('crossword')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'crossword'
                ? 'bg-gradient-to-r from-brand-green to-emerald-600 text-white shadow-lg shadow-brand-green/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            🧩 Խաչբառ 3D
          </button>

        </div>

        {/* ACTIVE GAME CANVAS WITH SLIDE-DOWN FADE ANIMATION */}
        <section id="game-canvas-block" className="relative min-h-120">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeTab === 'race' && <RaceGame />}
              {activeTab === 'translation' && <TranslationGame />}
              {activeTab === 'crossword' && <CrosswordGame />}
            </motion.div>
          </AnimatePresence>
        </section>

      </main>

      {/* FOOTER METRICS INFO */}
      <footer id="main-footer" className="bg-slate-800 border-t border-white/5 py-8 text-center text-xs text-slate-400 font-mono space-y-2 mt-12">
        <div className="flex justify-center items-center gap-3 animate-fade-in flex-wrap px-4">
          <span>🏎️ Նախագծված է Գոռի և Գայանեի համար</span>
          <span>•</span>
          <span>🇦🇲 Պատրաստված է սիրով</span>
          <span>•</span>
          <span>🇪🇸 Անցյալ ժամանակը հաղթահարվա՛ծ է:</span>
        </div>
        <p className="text-3xs text-slate-500">
          © 2026 Spanish Grammar Grand Prix Game. Բոլոր իրավունքները պաշտպանված են:
        </p>
      </footer>

    </div>
  );
}
