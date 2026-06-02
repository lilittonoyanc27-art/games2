/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Flag, Zap, RotateCcw, CheckCircle2, XCircle, 
  AlertCircle, ArrowRight, Gauge, Play
} from 'lucide-react';
import { CHARACTERS, RACE_QUESTIONS } from './data';
import { RaceQuestion } from './types';

export default function RaceGame() {
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // Question and Answer State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Turn Active ('gor' starts, then alternates)
  const [turnActive, setTurnActive] = useState<'gor' | 'gayane'>('gor');

  // Gor's Stats
  const [gorPos, setGorPos] = useState(0);
  const [gorSpeed, setGorSpeed] = useState(120);
  const [gorStreak, setGorStreak] = useState(0);
  const [gorCorrect, setGorCorrect] = useState(0);
  const [gorTotal, setGorTotal] = useState(0);

  // Gayane's Stats
  const [gayanePos, setGayanePos] = useState(0);
  const [gayaneSpeed, setGayaneSpeed] = useState(120);
  const [gayaneStreak, setGayaneStreak] = useState(0);
  const [gayaneCorrect, setGayaneCorrect] = useState(0);
  const [gayaneTotal, setGayaneTotal] = useState(0);

  const [raceLogs, setRaceLogs] = useState<string[]>([]);

  const startRace = () => {
    setIsRaceStarted(true);
    setCurrentQuestionIdx(0);
    setGorPos(0);
    setGorSpeed(120);
    setGorStreak(0);
    setGorCorrect(0);
    setGorTotal(0);

    setGayanePos(0);
    setGayaneSpeed(120);
    setGayaneStreak(0);
    setGayaneCorrect(0);
    setGayaneTotal(0);

    setTurnActive('gor'); // Gor starts first
    setIsFinished(false);
    setIsAnswered(false);
    setSelectedOption(null);
    setRaceLogs([
      "🏎️ Մրցարշավը սկսվա՛ծ է: Գոռն ու Գայանեն մտան ստարտային ուղի: Կանաչ լույսը վառվեց:",
      "🚨 Հերթը Գոռինն է (Կարմիր բոլիդ):"
    ]);
  };

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const question = RACE_QUESTIONS[currentQuestionIdx];
    const isCorrect = optionIdx === question.correctIndex;

    const activeName = turnActive === 'gor' ? 'Գոռը' : 'Գայանեն';
    const activeIcon = turnActive === 'gor' ? '🔴' : '⚡';

    if (turnActive === 'gor') {
      setGorTotal(prev => prev + 1);
      if (isCorrect) {
        const newStreak = gorStreak + 1;
        setGorStreak(newStreak);
        setGorCorrect(prev => prev + 1);
        setGorPos(prev => Math.min(30, prev + 2)); // Moves 2 km per correct answer
        
        const speedIncrease = 20 * newStreak;
        const newSpeed = Math.min(320, 120 + speedIncrease);
        setGorSpeed(newSpeed);

        setRaceLogs(prev => [
          `🟢 Ճիշտ է: ${activeName} ${activeIcon} հիանալի լուծեց շրջադարձը և արագացավ մինչև ${newSpeed} կմ/ժ: (${question.tense})`,
          ...prev
        ]);
      } else {
        setGorStreak(0);
        setGorSpeed(80); // Drops speed to pit-stop mode
        setRaceLogs(prev => [
          `🔴 Սխալ է: ${activeName} ${activeIcon} մտավ պիտ-ստոպ՝ քերականությունը վերանայելու: (Արագությունն ընկավ՝ 80 կմ/ժ)`,
          ...prev
        ]);
      }
    } else {
      setGayaneTotal(prev => prev + 1);
      if (isCorrect) {
        const newStreak = gayaneStreak + 1;
        setGayaneStreak(newStreak);
        setGayaneCorrect(prev => prev + 1);
        setGayanePos(prev => Math.min(30, prev + 2)); // Moves 2 km
        
        const speedIncrease = 20 * newStreak;
        const newSpeed = Math.min(320, 120 + speedIncrease);
        setGayaneSpeed(newSpeed);

        setRaceLogs(prev => [
          `🟢 Ճիշտ է: ${activeName} ${activeIcon} հիանալի լուծեց շրջադարձը և արագացավ մինչև ${newSpeed} կմ/ժ: (${question.tense})`,
          ...prev
        ]);
      } else {
        setGayaneStreak(0);
        setGayaneSpeed(80); // Drops speed
        setRaceLogs(prev => [
          `🔴 Սխալ է: ${activeName} ${activeIcon} մտավ պիտ-ստոպ՝ քերականությունը վերանայելու: (Արագությունն ընկավ՝ 80 կմ/ժ)`,
          ...prev
        ]);
      }
    }
  };

  const handleNextQuestion = () => {
    // Check if finished
    const nextIdx = currentQuestionIdx + 1;
    
    const isPlayerPosReached = gorPos >= 30 || gayanePos >= 30;
    const isQuestionsEnd = nextIdx >= RACE_QUESTIONS.length;

    if (isPlayerPosReached || isQuestionsEnd) {
      setIsFinished(true);
    } else {
      setCurrentQuestionIdx(nextIdx);
      setIsAnswered(false);
      setSelectedOption(null);
      
      // Toggle active turn
      const nextTurn = turnActive === 'gor' ? 'gayane' : 'gor';
      setTurnActive(nextTurn);
      const nextDriverName = nextTurn === 'gor' ? 'Գոռը' : 'Գայանեն';
      const nextIcon = nextTurn === 'gor' ? '🔴' : '⚡';

      setRaceLogs(prev => [
        `🚨 Հաջորդ շրջադարձը: Ղեկին է ${nextDriverName} ${nextIcon}:`,
        ...prev
      ]);
    }
  };

  const currentQuestion: RaceQuestion = RACE_QUESTIONS[currentQuestionIdx];

  // Determine winner for the finish screen
  let winnerText = "";
  let winnerDetails = "";
  let winnerAvatar = "🏆";

  if (gorPos > gayanePos) {
    winnerText = "🏆 Գոռը (Gor) հաղթեց մրցարշավը:";
    winnerDetails = "Գոռը ավելի արագ հաղթահարեց բոլոր անցյալ ժամանակների շրջադարձերը և առաջինը հատեց վերջնագիծը իր կարմիր բոլիդով:";
    winnerAvatar = "🏎️🔴";
  } else if (gayanePos > gorPos) {
    winnerText = "🏆 Գայանեն (Gayane) հաղթեց մրցարշավը:";
    winnerDetails = "Գայանեն ցուցաբերեց լեզվի անբասիր իմացություն և իր կապույտ տորնադոյով առաջինը սլացավ դեպի վերջնագիծ:";
    winnerAvatar = "🏎️⚡";
  } else {
    winnerText = "🤝 Հավասար մրցարշավ. Ոչ-ոքի:";
    winnerDetails = "Գոռն ու Գայանեն ցուցադրեցին բացարձակ հավասար արդյունքներ: Երկուսն էլ անցյալ ժամանակների իսկական չեմպիոններ են:";
    winnerAvatar = "🏁🤝🏁";
  }

  return (
    <div id="race-game-root" className="w-full max-w-5xl mx-auto bg-slate-800 border border-white/5 text-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6">
      
      {!isRaceStarted ? (
        <div id="race-intro" className="flex flex-col items-center justify-center py-8 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-3 bg-brand-red/10 text-brand-red border border-brand-red/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 font-mono"
          >
            <Gauge className="w-4 h-4 animate-pulse text-brand-red" />
            Formula 1 Spanish Turn-Based Grand Prix
          </motion.div>

          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-amber-450 to-brand-blue mb-2 uppercase tracking-wide">
            Հերթափոխով Մրցարշավ. Գոռ և Գայանե
          </h2>
          <p className="text-slate-350 max-w-xl text-sm sm:text-base leading-relaxed mb-8 font-normal">
            Բարի գալուստ Ֆորմուլա-1-ի Մեծ Գավաթ: Գոռն ու Գայանեն այժմ մրցում են <span className="text-amber-500 font-bold">հերթով պատասխանելու սկզբունքով</span>: Յուրաքանչյուր ճիշտ պատասխան առաջ է մղում տվյալ մասնակցի բոլիդը <span className="text-green-400 font-bold">2 կմ-ով</span> և զգալիորեն բարձրացնում արագությունը: Սխալ պատասխանը ձեզ ուղարկում է պիտ-ստոպ:
          </p>

          <h3 className="text-md sm:text-lg font-extrabold text-slate-200 mb-4 uppercase tracking-widest text-xs font-mono">Մրցարշավի մասնակիցները`</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8 font-normal">
            {CHARACTERS.map((char) => {
              return (
                <div 
                  id={`char-card-${char.id}`}
                  key={char.id}
                  className={`p-5 rounded-xl border border-white/10 bg-slate-900/60 text-left transition-all duration-300 hover:border-white/20`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl">{char.avatar}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      char.id === 'gor' ? 'bg-brand-red/10 text-brand-red border border-brand-red/20' : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                    }`}>
                      {char.id === 'gor' ? 'Կարմիր Կայծակներ' : 'Կապույտ Տորնադո'}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold uppercase tracking-wide text-white mb-1">{char.name}</h4>
                  <p className="text-xs text-amber-500 font-mono mb-2">{char.vehicle}</p>
                  <p className="text-xs text-slate-350 leading-relaxed">{char.bio}</p>
                </div>
              );
            })}
          </div>

          <button
            id="start-race-btn"
            onClick={startRace}
            className="flex items-center gap-3 px-8 py-4 rounded-xl text-md font-bold uppercase tracking-wider transition-all duration-300 sleek-btn-accent text-white cursor-pointer shadow-lg hover:shadow-brand-red/20 hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5 fill-current" />
            Գործարկե՛լ Շարժիչները և Սկսել
          </button>
        </div>
      ) : isFinished ? (
        <div id="race-finished" className="text-center py-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
            className="inline-block p-4 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6"
          >
            <span className="text-6xl filter drop-shadow-md select-none">{winnerAvatar}</span>
          </motion.div>

          <h2 className="text-3xl font-black text-white mb-2 tracking-wide uppercase">{winnerText}</h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base mb-8 leading-relaxed font-normal px-4">
            {winnerDetails}
          </p>

          <div className="bg-slate-900 p-5 rounded-2xl max-w-lg mx-auto border border-white/5 mb-8 font-normal space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center border-b border-white/5 pb-2 font-mono">
              Մրցարշավի վերջնական արդյունքները՝
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Gor's End stats */}
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-brand-red/10 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏎️🔴</span>
                  <span className="font-extrabold text-white text-sm uppercase tracking-wide">Գոռ</span>
                </div>
                <div className="text-2xs space-y-1 font-mono text-slate-350">
                  <p>Անցած ճանապարհ՝ <span className="text-white font-bold">{gorPos} կմ</span></p>
                  <p>Ճիշտ պատասխան՝ <span className="text-emerald-400 font-bold">{gorCorrect} / {gorTotal}</span></p>
                  <p>Առավելագույն արագություն՝ <span className="text-amber-500 font-bold">{gorSpeed} կմ/ժ</span></p>
                </div>
              </div>

              {/* Gayane's End stats */}
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-indigo-500/10 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏎️⚡</span>
                  <span className="font-extrabold text-white text-sm uppercase tracking-wide">Գայանե</span>
                </div>
                <div className="text-2xs space-y-1 font-mono text-slate-350">
                  <p>Անցած ճանապարհ՝ <span className="text-white font-bold">{gayanePos} կմ</span></p>
                  <p>Ճիշտ պատասխան՝ <span className="text-emerald-400 font-bold">{gayaneCorrect} / {gayaneTotal}</span></p>
                  <p>Առավելագույն արագություն՝ <span className="text-amber-500 font-bold">{gayaneSpeed} կմ/ժ</span></p>
                </div>
              </div>
            </div>
          </div>

          <button
            id="reset-race-finished-btn"
            onClick={startRace}
            className="sleek-btn-accent text-white font-bold px-8 py-4 rounded-xl transition hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 max-w-xs mx-auto text-xs sm:text-sm uppercase tracking-wider cursor-pointer font-sans"
          >
            <RotateCcw className="w-5 h-5" />
            Սկսել Մրցարշավը Նորից
          </button>
        </div>
      ) : (
        <div id="race-active-hud-and-board" className="space-y-6">
          {/* Header Progress / HUD */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-white/5 font-normal">
            
            {/* Active turn indicator with matching colored border & glow */}
            <div className={`flex items-center gap-3 px-4 py-2 bg-slate-950 rounded-xl border transition-all duration-300 ${
              turnActive === 'gor' 
                ? 'border-brand-red/40 shadow-[0_0_15px_rgba(239,68,68,0.15)] ring-1 ring-brand-red/10' 
                : 'border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/10'
            }`}>
              <span className="text-3xl animate-bounce">
                {turnActive === 'gor' ? '🏎️🔴' : '🏎️⚡'}
              </span>
              <div>
                <span className="text-[10px] text-slate-450 block uppercase font-mono font-bold">Ղեկին է (Ակտիվ հերթ)</span>
                <span className={`font-black text-white text-base sm:text-lg uppercase tracking-wider font-sans ${
                  turnActive === 'gor' ? 'text-red-400' : 'text-indigo-350'
                }`}>
                  {turnActive === 'gor' ? 'Գոռ' : 'Գայանե'}
                </span>
              </div>
            </div>

            {/* Speeds of Both on screen */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Gor Speed */}
              <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-brand-red/20 flex items-center gap-2">
                <span className="text-brand-red font-mono font-bold text-xs">Գոռ՝</span>
                <span className="text-white font-mono text-xs font-bold">{gorSpeed} կմ/ժ</span>
                {gorStreak > 0 && <span className="text-amber-500 text-2xs">🔥 {gorStreak}</span>}
              </div>

              {/* Gayane Speed */}
              <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-indigo-500/20 flex items-center gap-2">
                <span className="text-indigo-350 font-mono font-bold text-xs">Գայանե՝</span>
                <span className="text-white font-mono text-xs font-bold">{gayaneSpeed} կմ/ժ</span>
                {gayaneStreak > 0 && <span className="text-amber-500 text-2xs">🔥 {gayaneStreak}</span>}
              </div>
            </div>

            {/* Progress Turn indicator */}
            <div className="text-right">
              <span className="text-xs text-slate-550 block font-mono uppercase font-bold">Մրցուղու հատված</span>
              <span className="text-white font-mono font-black">{currentQuestionIdx + 1} / {RACE_QUESTIONS.length}</span>
            </div>
          </div>

          {/* Interactive 3D styled Race Track! */}
          <div className="relative bg-slate-900 border border-white/5 rounded-xl py-6 px-4 overflow-hidden shadow-inner h-56 flex flex-col justify-between">
            {/* Grid styling background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
            
            {/* Horizon mountain visual styling */}
            <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-brand-red/10 to-transparent flex items-center justify-between px-8 text-[11px] font-mono text-slate-450 font-bold">
              <span>⛰️ ՀԱՅԱՍՏԱՆԻ ԳԵՂԵՑԿՈՒԹՅՈՒՆԸ (ԱՐԱՐԱՏ ԼԵՌ)</span>
              <span>🏎️ YEREVAN-TRACK F1 (2-PLAYER)</span>
            </div>

            {/* Simulated Track Lanes */}
            <div className="relative flex-1 flex flex-col justify-center space-y-6 mt-6 z-10">
              {/* Gayane Track Lane */}
              <div className="relative h-12 bg-slate-800/80 rounded border-y border-white/5 flex items-center px-4">
                <div className="absolute inset-y-0 right-10 w-2 border-r border-dashed border-white/10"></div>
                
                {/* Finish Line Checkers background */}
                <div className="absolute inset-y-0 right-0 w-8 bg-[repeating-linear-gradient(45deg,#000,#000_6px,#fff_6px,#fff_12px)] opacity-20"></div>
                <div className="absolute left-2 text-[9px] text-indigo-400 font-mono font-bold tracking-widest">LANE GAYANE</div>
                
                {/* Gayane Car Moving */}
                <motion.div 
                  className="absolute"
                  animate={{ left: `${(gayanePos / 30) * 85 + 10}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                >
                  <div className="flex flex-col items-center font-mono">
                    <span className="text-2xl filter drop-shadow-[0_2px_8px_rgba(59,130,246,0.3)] select-none">
                      🏎️⚡
                    </span>
                    <span className="text-[10px] bg-brand-blue text-white font-bold px-2 py-0.5 rounded shadow mt-1 uppercase tracking-wider">
                      Գայանե
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Gor Track Lane */}
              <div className="relative h-12 bg-slate-800/90 rounded border-y border-white/5 flex items-center px-4">
                <div className="absolute inset-y-0 right-10 w-2 border-r border-dashed border-white/10"></div>
                
                {/* Finish Line Checkers background */}
                <div className="absolute inset-y-0 right-0 w-8 bg-[repeating-linear-gradient(45deg,#000,#000_6px,#fff_6px,#fff_12px)] opacity-30"></div>
                <div className="absolute left-2 text-[9px] text-brand-red font-mono font-bold tracking-widest">LANE GOR</div>

                {/* Gor Car Moving */}
                <motion.div 
                  className="absolute"
                  animate={{ left: `${(gorPos / 30) * 85 + 10}%` }}
                  transition={{ type: 'spring', stiffness: 70 }}
                >
                  <div className="flex flex-col items-center font-mono">
                    <span className="text-3xl filter drop-shadow-[0_2px_12px_rgba(239,68,68,0.5)] select-none">
                      🏎️🇦🇲
                    </span>
                    <span className="text-[10px] bg-brand-red text-white font-bold px-2 py-0.5 rounded shadow mt-1 flex items-center gap-1 ring-1 ring-white/10 uppercase tracking-wider">
                      Գոռ
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Checkered flag icon at the finish line */}
            <div className="absolute right-3 bottom-12 z-20">
              <Flag className="w-8 h-8 text-amber-500 animate-pulse" />
            </div>

            {/* Live positioning statement */}
            <div className="text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between z-10 px-2 mt-2 gap-2 font-bold">
              <span>Գոռն անցել է՝ {gorPos} / 30 կմ</span>
              <span>Գայանեն անցել է՝ {gayanePos} / 30  կմ</span>
              <span className="text-brand-red font-extrabold uppercase tracking-wide text-xs">
                {gorPos > gayanePos && '⚡ ԳՈՌՆ ԱՌԱՋԱՏԱՐ Է:'}
                {gayanePos > gorPos && '⚡ ԳԱՅԱՆԵՆ ԱՌԱՋԱՏԱՐ Է:'}
                {gorPos === gayanePos && '🤝 ՀԱՎԱՍԱՐ ՊԱՅՔԱՐ'}
              </span>
            </div>
          </div>

          {/* Current Question Block */}
          <div className="bg-slate-800 border border-white/5 rounded-xl overflow-hidden shadow-lg p-5">
            <div className="flex items-center justify-between gap-4 mb-4 font-mono select-text">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border bg-slate-900 border-white/10 text-white`}>
                {currentQuestion.tense === 'perfecto' ? 'Pretérito Perfecto' : currentQuestion.tense === 'indefinido' ? 'Pretérito Indefinido' : 'Pretérito Imperfecto'}
              </span>
              {currentQuestion.cueWord && (
                <span className="text-xs bg-slate-900 text-amber-400 border border-white/5 px-3 py-1 rounded-md font-bold">
                  ՑՈՒՑԻՉ՝ "{currentQuestion.cueWord.toUpperCase()}"
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-white mb-6 leading-relaxed select-text">
              {currentQuestion.question}
            </h3>

            {/* Interactive Answer Choices */}
            <div className="grid grid-cols-1 gap-3.5 mb-6">
              {currentQuestion.options.map((option, idx) => {
                let btnStyle = "border-white/10 bg-slate-900 hover:bg-slate-705 text-slate-200 hover:border-white/20";
                
                if (isAnswered) {
                  if (idx === currentQuestion.correctIndex) {
                    btnStyle = "border-green-600 bg-green-950/40 text-green-200 font-bold shadow-lg shadow-green-950/20 ring-1 ring-green-500/30";
                  } else if (idx === selectedOption) {
                    btnStyle = "border-brand-red bg-brand-red/10 text-brand-red ring-1 ring-brand-red/30";
                  } else {
                    btnStyle = "border-white/5 bg-slate-900/40 text-slate-500 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    id={`f1-option-${idx}`}
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm sm:text-base font-bold flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === currentQuestion.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 ml-2" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                      <XCircle className="w-5 h-5 text-brand-red shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box on answered */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-slate-900 border border-white/5 rounded-xl p-4 mb-6 select-text"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-1.5 border bg-slate-850 border-white/10 rounded mt-0.5">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-amber-500 uppercase tracking-widest mb-1 font-mono">
                        Քերականական բացատրություն և թարգմանություն՝
                      </h4>
                      <p className="text-slate-200 text-sm font-semibold mb-2">
                        {currentQuestion.translation ? `«${currentQuestion.translation}»` : ''}
                      </p>
                      <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-normal">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Control panel button */}
            {isAnswered && (
              <div className="flex justify-end">
                <button
                  id="f1-next-btn"
                  onClick={handleNextQuestion}
                  className="sleek-btn-accent text-white font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 transition hover:-translate-y-0.5 shadow-md hover:shadow-brand-red/10 cursor-pointer uppercase text-xs tracking-wider"
                >
                  {currentQuestionIdx === RACE_QUESTIONS.length - 1 ? 'Ավարտել Գրան-պրին' : 'Հաջորդ շրջադարձը'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Race log console at the bottom */}
          <div className="bg-slate-900 p-4 rounded-xl border border-white/5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-ping"></span>
              Ռադիոկապ (Մրցարշավի տեղեկամատյան).
            </h4>
            <div className="h-28 overflow-y-auto space-y-1 text-xs font-mono text-slate-300 scrollbar-thin scrollbar-thumb-slate-800 font-normal">
              {raceLogs.map((log, i) => (
                <p key={i} className={i === 0 ? 'text-white font-semibold' : 'opacity-80'}>{log}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
