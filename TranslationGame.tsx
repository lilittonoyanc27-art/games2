/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Sparkles, CheckCircle, ArrowRight, Award, Flame, RefreshCw, XCircle
} from 'lucide-react';
import { TRANSLATION_WORDS } from './data';
import { TranslationWord } from './types';

export default function TranslationGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answersState, setAnswersState] = useState<{ [key: number]: 'correct' | 'wrong' | null }>({});
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false);
  const [customDeck, setCustomDeck] = useState<TranslationWord[]>(TRANSLATION_WORDS);

  // Turn Active ('gor' starts, then alternates)
  const [turnActive, setTurnActive] = useState<'gor' | 'gayane'>('gor');

  // Individual Scores
  const [gorScore, setGorScore] = useState(0);
  const [gorTotal, setGorTotal] = useState(0);
  const [gayaneScore, setGayaneScore] = useState(0);
  const [gayaneTotal, setGayaneTotal] = useState(0);

  const currentWord = customDeck[currentIdx];

  // Generate 4 randomized options for the current translation question
  const generateOptions = (word: TranslationWord) => {
    const correct = word.spanish;
    const filtered = TRANSLATION_WORDS.filter(w => w.spanish !== correct);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const distractors = shuffled.slice(0, 3).map(w => w.spanish);
    return [correct, ...distractors].sort(() => 0.5 - Math.random());
  };

  const [options, setOptions] = useState<string[]>(() => {
    return TRANSLATION_WORDS.length > 0 ? generateOptions(TRANSLATION_WORDS[0]) : [];
  });

  const loadQuestion = (idx: number, deckToUse = customDeck) => {
    if (idx < deckToUse.length) {
      setOptions(generateOptions(deckToUse[idx]));
      setSelectedOpt(null);
      setIsRevealed(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleSelect = (option: string) => {
    if (isRevealed) return;
    setSelectedOpt(option);
  };

  const handleCheck = () => {
    if (!selectedOpt || !currentWord) return;
    setIsRevealed(true);

    const isCorrect = selectedOpt === currentWord.spanish;
    const wordId = currentWord.id;

    if (turnActive === 'gor') {
      setGorTotal(prev => prev + 1);
      if (isCorrect) {
        setGorScore(prev => prev + 1);
        setAnswersState(prev => ({ ...prev, [wordId]: 'correct' }));
      } else {
        setAnswersState(prev => ({ ...prev, [wordId]: 'wrong' }));
      }
    } else {
      setGayaneTotal(prev => prev + 1);
      if (isCorrect) {
        setGayaneScore(prev => prev + 1);
        setAnswersState(prev => ({ ...prev, [wordId]: 'correct' }));
      } else {
        setAnswersState(prev => ({ ...prev, [wordId]: 'wrong' }));
      }
    }
  };

  const handleNext = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx < customDeck.length) {
      setCurrentIdx(nextIdx);
      loadQuestion(nextIdx);
      // Toggle active player turn for next question
      setTurnActive(prev => prev === 'gor' ? 'gayane' : 'gor');
    } else {
      setIsCompleted(true);
    }
  };

  const restartGame = () => {
    setCustomDeck(TRANSLATION_WORDS);
    setCurrentIdx(0);
    setAnswersState({});
    setIsCompleted(false);
    setShowOnlyIncorrect(false);
    setTurnActive('gor');
    setGorScore(0);
    setGorTotal(0);
    setGayaneScore(0);
    setGayaneTotal(0);
    loadQuestion(0, TRANSLATION_WORDS);
  };

  const startIncorrectOnly = () => {
    const missed = TRANSLATION_WORDS.filter(w => answersState[w.id] === 'wrong');
    if (missed.length === 0) return;
    
    setCustomDeck(missed);
    setCurrentIdx(0);
    setAnswersState({});
    setIsCompleted(false);
    setShowOnlyIncorrect(true);
    setTurnActive('gor');
    setGorScore(0);
    setGorTotal(0);
    setGayaneScore(0);
    setGayaneTotal(0);
    loadQuestion(0, missed);
  };

  const totalInDeck = customDeck.length;
  const progressPercent = totalInDeck > 0 ? Math.round((currentIdx / totalInDeck) * 100) : 0;

  // Final Results
  let translationWinnerText = "";
  let translationWinnerDetails = "";
  if (gorScore > gayaneScore) {
    translationWinnerText = "🏆 Գոռը (Gor) հաղթեց թարգմանչական մենամարտը:";
    translationWinnerDetails = "Գոռը ցուցաբերեց իսպաներեն բառապաշարի և թարգմանչական հմտությունների գերազանց տիրապետում:";
  } else if (gayaneScore > gorScore) {
    translationWinnerText = "🏆 Գայանեն (Gayane) հաղթեց թարգմանչական մենամարտը:";
    translationWinnerDetails = "Գայանեն ցուցաբերեց լեզվի անբասիր իմացություն և փայլուն թարգմանեց բոլոր բառերը:";
  } else {
    translationWinnerText = "🤝 Հավասար պայքար. Ոչ-ոքի:";
    translationWinnerDetails = "Գոռն ու Գայանեն ունեն բացարձակ հավասար արդյունքներ: Երկուսն էլ հիանալի թարգմանիչներ են:";
  }

  return (
    <div id="translation-game-root" className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-white">
      
      {/* Title block */}
      <div className="bg-gradient-to-r from-red-650 via-blue-650 to-amber-600 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="bg-black/30 border border-white/20 text-yellow-300 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full inline-block mb-1">
            20 ԲԱՌԱՅԻՆ ՄԱՐՏԱՀՐԱՎԵՐ • Հերթափոխով
          </span>
          <h2 className="text-2xl font-black text-white">Գոռի և Գայանեի Թարգմանչական Արհեստանոց</h2>
          <p className="text-white/85 text-xs sm:text-sm mt-1">
            Թարգմանե՛ք արտահայտությունները <span className="text-yellow-300 font-bold">հերթափոխով պատասխանելու սկզբունքով</span> և պարզե՛ք, թե ով է լավագույն թարգմանիչը:
          </p>
        </div>
        
        {/* Dynamic scoreboard in the header */}
        <div className="flex items-center gap-3 bg-black/35 px-4 py-2 rounded-xl border border-white/10">
          <div className="text-center px-1.5">
            <span className="text-[9px] text-red-450 block uppercase font-mono font-bold">Գոռ 🔴</span>
            <span className="text-sm font-bold text-white">{gorScore}</span>
          </div>
          <div className="text-slate-550 select-none text-xs">vs</div>
          <div className="text-center px-1.5">
            <span className="text-[9px] text-indigo-400 block uppercase font-mono font-bold">Գայանե ⚡</span>
            <span className="text-sm font-bold text-white">{gayaneScore}</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        currentWord ? (
          <div className="p-5 sm:p-8 space-y-6">
            
            {/* Turn tracker showing whose turn it is inside the card */}
            <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
              turnActive === 'gor' 
                ? 'bg-red-950/20 border-red-900/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                : 'bg-indigo-950/20 border-indigo-900/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-bounce">
                  {turnActive === 'gor' ? '🔴' : '⚡'}
                </span>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-mono">Ակտիվ Մասնակից՝</span>
                  <span className={`text-sm sm:text-base font-black uppercase tracking-wide ${
                    turnActive === 'gor' ? 'text-red-400' : 'text-indigo-400'
                  }`}>
                    {turnActive === 'gor' ? 'Գոռ (Gor)' : 'Գայանե (Gayane)'}
                  </span>
                </div>
              </div>
              <span className="text-[10px] bg-slate-950/60 text-amber-500 font-bold px-3 py-1 rounded-full border border-slate-800">
                Անցեք քննությունը հերթով
              </span>
            </div>

            {/* PROGRESS AREA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Քարտ {currentIdx + 1} / {totalInDeck}</span>
                <span>Ավարտված է՝ {progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-rose-500 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* MAIN CARD WITH INTERMEDIATE WORD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Word display */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between min-h-60 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 text-9xl select-none text-slate-800/10 font-bold font-mono">
                  ES
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 font-bold uppercase tracking-widest font-mono">
                      {currentWord.tense === 'perfecto' ? 'Perfecto' : currentWord.tense === 'indefinido' ? 'Indefinido' : 'Imperfecto'}
                    </span>
                    <span className="text-2xs text-slate-500 font-mono">ID #{currentWord.id}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-2xs text-amber-500 font-mono uppercase tracking-widest font-semibold block">Արտահայտությունը հայերենով՝</span>
                    <h3 className="text-3xl font-black text-white tracking-tight break-words leading-snug">
                      {currentWord.armenian}
                    </h3>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-850 mt-4 flex items-center gap-2.5">
                  <span className="text-lg">🏕️</span>
                  <div>
                    <span className="text-3xs text-slate-500 block uppercase font-mono">Իրադրության համատեքստը</span>
                    <span className="text-xs text-slate-400 italic font-medium">{currentWord.context}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Choices */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-2xs text-slate-400 font-semibold uppercase tracking-wider block">Ընտրե՛ք ճիշտ թարգմանությունը իսպաներենով՝</span>
                
                <div className="grid grid-cols-1 gap-3">
                  {options.map((opt, i) => {
                    const isSelected = selectedOpt === opt;
                    let optionStyle = "border-slate-800 bg-slate-950 hover:bg-slate-850 text-slate-300 hover:border-slate-700";
                    
                    if (isRevealed) {
                      if (opt === currentWord.spanish) {
                        optionStyle = "border-green-600 bg-green-950/40 text-green-200 ring-2 ring-green-500/30";
                      } else if (isSelected) {
                        optionStyle = "border-red-600 bg-red-950/40 text-red-200 ring-2 ring-red-500/30";
                      } else {
                        optionStyle = "border-slate-850 bg-slate-950/30 text-slate-550 cursor-not-allowed";
                      }
                    } else if (isSelected) {
                      optionStyle = "border-rose-500 bg-rose-500/10 text-white ring-2 ring-rose-500/30";
                    }

                    return (
                      <button
                        id={`opt-btn-${i}`}
                        key={i}
                        disabled={isRevealed}
                        onClick={() => handleSelect(opt)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm font-semibold flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {isRevealed && opt === currentWord.spanish && (
                          <CheckCircle className="w-5 h-5 text-green-400 shrink-0 ml-2" />
                        )}
                        {isRevealed && isSelected && opt !== currentWord.spanish && (
                          <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Confirm or next controls */}
                <div className="flex justify-end pt-2">
                  {!isRevealed ? (
                    <button
                      id="check-translation-btn"
                      disabled={!selectedOpt}
                      onClick={handleCheck}
                      className={`px-6 py-3 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                        selectedOpt 
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md cursor-pointer' 
                          : 'bg-slate-850 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Ստուգել պատասխանը
                    </button>
                  ) : (
                    <button
                      id="next-translation-btn"
                      onClick={handleNext}
                      className="bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold px-6 py-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-md"
                    >
                      <span>Հաջորդ բառը</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* GRAMMAR BLOCK SHOWN IMMEDIATELY WHEN REVEALED */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-start gap-4"
                >
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded text-xl shrink-0 mt-0.5 select-none">
                    🎓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1 font-mono">
                      Քերականական հետադարձ կապ և կանոններ՝
                    </h4>
                    <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-normal select-text">
                      {currentWord.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ) : null
      ) : (
        /* FINISHED SCOREBOARD AND REVIEW BOX */
        <div className="p-6 sm:p-10 text-center space-y-6">
          <div className="inline-block p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <Award className="w-16 h-16 text-emerald-400 animate-pulse" />
          </div>

          <h3 className="text-3xl font-black text-white">{translationWinnerText}</h3>
          
          <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-normal">
            {translationWinnerDetails} Դուք համատեղ ավարտեցիք {showOnlyIncorrect ? 'սխալների վրա աշխատանքը' : 'բառերի առաջին փուլը'}:
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto font-normal text-left">
            {/* Gor's End Stats */}
            <div className="bg-slate-950 p-4 border border-red-950/40 rounded-xl space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔴</span>
                <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-red-400">Գոռ</span>
              </div>
              <p className="text-2xs text-slate-450 font-mono">Ճիշտ պատասխաններ՝</p>
              <p className="text-xl font-black font-mono text-white">{gorScore} / {gorTotal}</p>
            </div>

            {/* Gayane's End Stats */}
            <div className="bg-slate-950 p-4 border border-indigo-950/40 rounded-xl space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-indigo-400">Գայանե</span>
              </div>
              <p className="text-2xs text-slate-450 font-mono">Ճիշտ պատասխաններ՝</p>
              <p className="text-xl font-black font-mono text-white">{gayaneScore} / {gayaneTotal}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
            <button
              id="restart-translation-btn"
              onClick={restartGame}
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Սկսել Նորից
            </button>

            {TRANSLATION_WORDS.filter(w => answersState[w.id] === 'wrong').length > 0 && (
              <button
                id="missed-only-btn"
                onClick={startIncorrectOnly}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-600 to-rose-650 hover:from-amber-500 hover:to-rose-550 text-white font-bold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Flame className="w-4 h-4 text-yellow-300 fill-current" />
                Ուղղել Սխալները
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
