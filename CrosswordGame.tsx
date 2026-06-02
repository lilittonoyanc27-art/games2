/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, HelpCircle, Check, BookOpen, 
  RefreshCw, Award, ArrowUp, ArrowLeft
} from 'lucide-react';
import { CROSSWORD_CLUES } from './data';
import { CrosswordClue } from './types';

interface UserCellInput {
  [key: string]: string; // key is 'row-col', value is UPPERCASE letter
}

export default function CrosswordGame() {
  const [selectedClue, setSelectedClue] = useState<CrosswordClue | null>(null);
  const [inputs, setInputs] = useState<UserCellInput>({});
  const [validated, setValidated] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);

  // Normalize Spanish letters for comparison (accents and N/Ñ)
  const normalizeChar = (char: string): string => {
    if (!char) return "";
    const upper = char.toUpperCase();
    const map: { [key: string]: string } = {
      'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
      'Ñ': 'N',
    };
    return map[upper] || upper;
  };

  // Initialize clues and grid bounds
  const rowsCount = 8;
  const colsCount = 8;

  // Find which cells belong to the crossword
  const getCellClues = (r: number, c: number) => {
    return CROSSWORD_CLUES.filter(clue => {
      if (clue.direction === 'horizontal') {
        return r === clue.row && c >= clue.col && c < clue.col + clue.length;
      } else {
        return c === clue.col && r >= clue.row && r < clue.row + clue.length;
      }
    });
  };

  // Find the exact correct letter for a cell
  const getCorrectLetter = (r: number, c: number): string | null => {
    const clues = getCellClues(r, c);
    if (clues.length === 0) return null;
    
    // Choose the letter index
    const firstClue = clues[0];
    if (firstClue.direction === 'horizontal') {
      const charIndex = c - firstClue.col;
      return firstClue.answer[charIndex];
    } else {
      const charIndex = r - firstClue.row;
      return firstClue.answer[charIndex];
    }
  };

  // Build list of active cells
  const activeCells: { [key: string]: { starterNum?: number; correctChar: string } } = {};
  
  CROSSWORD_CLUES.forEach(clue => {
    const key = `${clue.row}-${clue.col}`;
    if (!activeCells[key]) {
      activeCells[key] = { starterNum: clue.number, correctChar: clue.answer[0] };
    } else {
      activeCells[key].starterNum = clue.number; // prioritized
    }

    for (let i = 0; i < clue.length; i++) {
      const curRow = clue.direction === 'horizontal' ? clue.row : clue.row + i;
      const curCol = clue.direction === 'horizontal' ? clue.col + i : clue.col;
      const cellKey = `${curRow}-${curCol}`;
      const correctChar = clue.direction === 'horizontal' ? clue.answer[i] : clue.answer[i];
      
      if (!activeCells[cellKey]) {
        activeCells[cellKey] = { correctChar };
      }
    }
  });

  // Phonetic and key mapping for Armenian & Russian keyboards to standard Latin/Spanish letters
  const mapToLatin = (char: string): string => {
    const map: { [key: string]: string } = {
      // Armenian layout (QWERTY phonetic)
      'ա': 'a', 'Ա': 'A',
      'բ': 'b', 'Բ': 'B',
      'ց': 'c', 'Ց': 'C',
      'դ': 'd', 'Դ': 'D',
      'ե': 'e', 'Ե': 'E',
      'ֆ': 'f', 'Ֆ': 'F',
      'գ': 'g', 'Գ': 'G',
      'հ': 'h', 'Հ': 'H',
      'ի': 'i', 'Ի': 'I',
      'յ': 'j', 'Յ': 'J',
      'կ': 'k', 'Կ': 'K',
      'լ': 'l', 'Լ': 'L',
      'մ': 'm', 'Մ': 'M',
      'ն': 'n', 'Ն': 'N',
      'օ': 'o', 'Օ': 'O',
      'պ': 'p', 'Պ': 'P',
      'ք': 'q', 'Ք': 'Q',
      'ր': 'r', 'Ր': 'R',
      'ս': 's', 'Ս': 'S',
      'տ': 't', 'Տ': 'T',
      'ւ': 'u', 'Ւ': 'U',
      'վ': 'v', 'Վ': 'V',
      'խ': 'x', 'Խ': 'X',
      'ը': 'y', 'Ը': 'Y',
      'զ': 'z', 'Զ': 'Z',
      'ռ': 'r', 'Ռ': 'R',
      'շ': 's', 'Շ': 'S',
      'չ': 'c', 'Չ': 'C',
      'ջ': 'j', 'Ջ': 'J',
      'ժ': 'z', 'Ժ': 'Z',
      'ծ': 'c', 'Ծ': 'C',
      'ձ': 'd', 'Ձ': 'D',
      'ղ': 'g', 'Ղ': 'G',
      'ճ': 'c', 'Ճ': 'C',
      'ո': 'o', 'Ո': 'O',
      'ու': 'u', 'ՈՒ': 'U',
      'փ': 'p', 'Փ': 'P',

      // Russian keyboard Standard matching position (most standard Russian layout)
      'ф': 'a', 'Ф': 'A',
      'и': 'b', 'И': 'B',
      'с': 'c', 'С': 'C',
      'в': 'd', 'В': 'D',
      'у': 'e', 'У': 'E',
      'а': 'f', 'А': 'F',
      'п': 'g', 'П': 'G',
      'р': 'h', 'Р': 'H',
      'ш': 'i', 'Ш': 'I',
      'о': 'o', 'О': 'O',
      'л': 'k', 'Л': 'K',
      'д': 'l', 'Д': 'L',
      'ь': 'm', 'Ь': 'M',
      'т': 'n', 'Т': 'N',
      'щ': 'o', 'Щ': 'O',
      'з': 'p', 'З': 'P',
      'й': 'q', 'Й': 'Q',
      'к': 'r', 'К': 'R',
      'ы': 's', 'Ы': 'S',
      'е': 't', 'Е': 'T',
      'г': 'u', 'Г': 'U',
      'м': 'v', 'М': 'V',
      'ц': 'w', 'Ц': 'W',
      'ч': 'x', 'Ч': 'X',
      'н': 'y', 'Н': 'Y',
      'я': 'z', 'Я': 'Z',
      'ж': 'ñ', 'Ж': 'Ñ',
      'б': 'b', 'Б': 'B',
      'ю': 'u', 'Ю': 'U',
      'х': 'á', 'Х': 'Á',
      'ъ': 'é', 'Ъ': 'É',
      'э': 'í', 'Э': 'Í',
    };
    return map[char] || char;
  };

  const autoAdvance = (r: number, c: number) => {
    if (!selectedClue) return;
    if (selectedClue.direction === 'horizontal') {
      const nextCol = c + 1;
      if (nextCol < selectedClue.col + selectedClue.length) {
        setFocusedCell({ row: r, col: nextCol });
        setTimeout(() => {
          const nextEl = document.getElementById(`crossword-input-${r}-${nextCol}`);
          nextEl?.focus();
        }, 15);
      }
    } else {
      const nextRow = r + 1;
      if (nextRow < selectedClue.row + selectedClue.length) {
        setFocusedCell({ row: nextRow, col: c });
        setTimeout(() => {
          const nextEl = document.getElementById(`crossword-input-${nextRow}-${c}`);
          nextEl?.focus();
        }, 15);
      }
    }
  };

  const autoRegress = (r: number, c: number) => {
    if (!selectedClue) return;
    if (selectedClue.direction === 'horizontal') {
      const prevCol = c - 1;
      if (prevCol >= selectedClue.col) {
        setFocusedCell({ row: r, col: prevCol });
        setTimeout(() => {
          const prevEl = document.getElementById(`crossword-input-${r}-${prevCol}`);
          prevEl?.focus();
        }, 15);
      }
    } else {
      const prevRow = r - 1;
      if (prevRow >= selectedClue.row) {
        setFocusedCell({ row: prevRow, col: c });
        setTimeout(() => {
          const prevEl = document.getElementById(`crossword-input-${prevRow}-${c}`);
          prevEl?.focus();
        }, 15);
      }
    }
  };

  // Keyboard Rows layout for virtual Spanish typing keys
  const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Z", "X", "C", "V", "B", "N", "M", "⌫"],
    ["Á", "É", "Í", "Ó", "Ú"]
  ];

  const handleVirtualKeyPress = (char: string) => {
    if (!focusedCell) return;
    const { row: r, col: c } = focusedCell;
    const cellKey = `${r}-${c}`;

    if (char === '⌫') {
      setInputs(prev => {
        const copy = { ...prev };
        delete copy[cellKey];
        return copy;
      });
      setValidated(false);
      autoRegress(r, c);
    } else {
      setInputs(prev => ({
        ...prev,
        [cellKey]: char.toUpperCase()
      }));
      setValidated(false);
      autoAdvance(r, c);
    }
  };

  // Handle key inputs
  const handleCellChange = (r: number, c: number, val: string) => {
    let lastChar = val.slice(-1);
    
    // Map keyboard layout phonetic letters to Latin Spanish equivalents
    lastChar = mapToLatin(lastChar);
    
    const cleaned = lastChar.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ]/g, '').toUpperCase();
    const cellKey = `${r}-${c}`;
    
    if (cleaned) {
      setInputs(prev => ({
        ...prev,
        [cellKey]: cleaned
      }));
      setValidated(false);
      // Auto advance to next cell when a character has been entered
      autoAdvance(r, c);
    } else {
      setInputs(prev => {
        const copy = { ...prev };
        delete copy[cellKey];
        return copy;
      });
      setValidated(false);
    }
  };

  // Check the answer entries
  const handleValidate = () => {
    let allSucceed = true;
    
    // Check all active cells
    Object.keys(activeCells).forEach(key => {
      const [rStr, cStr] = key.split('-');
      const r = parseInt(rStr);
      const c = parseInt(cStr);
      const correct = getCorrectLetter(r, c);
      const input = inputs[key] || '';
      
      if (normalizeChar(input) !== normalizeChar(correct || '')) {
        allSucceed = false;
      }
    });

    setValidated(true);
    setIsWon(allSucceed);
  };

  const handleReset = () => {
    setInputs({});
    setValidated(false);
    setIsWon(false);
    setSelectedClue(null);
  };

  const handleClueSelect = (clue: CrosswordClue) => {
    setSelectedClue(clue);
    setFocusedCell({ row: clue.row, col: clue.col });
  };

  // Check if a cell is highlighted for the selected clue
  const isCellHighlighted = (r: number, c: number) => {
    if (!selectedClue) return false;
    if (selectedClue.direction === 'horizontal') {
      return r === selectedClue.row && c >= selectedClue.col && c < selectedClue.col + selectedClue.length;
    } else {
      return c === selectedClue.col && r >= selectedClue.row && r < selectedClue.row + selectedClue.length;
    }
  };

  return (
    <div id="crossword-game-root" className="w-full max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 text-left">
      
      {/* Visual Header */}
      <div className="text-center py-4 border-b border-slate-800 mb-6 font-normal">
        <span className="text-3s bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 font-normal">
          <Sparkles className="w-3 h-3" />
          Կրոսվորդ 3D
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">Գոռի և Գայանեի Քերականական Կրոսվորդը</h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-1 font-normal">
          Լուծե՛ք անցյալ ժամանակի հատվող բառերը։ Ընտրե՛ք հուշումը և լրացրե՛ք տառերը։ Ճիշտ բառերը լուսավորվում են ոսկեգույնով։
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in font-normal">
        
        {/* CROSSWORD BOARD CONTAINER (Isometric/3D inspired grid) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative p-6 bg-slate-950 rounded-2xl border border-slate-850 shadow-inner w-full flex items-center justify-center overflow-x-auto">
            
            {/* 3D Grid Perspective Wrap */}
            <div 
              id="crossword-isometric-grid"
              className="grid gap-1.5 sm:gap-2 relative p-2"
              style={{
                gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
                transform: 'perspective(800px) rotateX(12deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {Array.from({ length: rowsCount }).map((_, r) => 
                Array.from({ length: colsCount }).map((_, c) => {
                  const cellKey = `${r}-${c}`;
                  const activeCell = activeCells[cellKey];
                  const hasInput = activeCell !== undefined;
                  const value = inputs[cellKey] || "";
                  const correctChar = activeCell?.correctChar;
                  const isCorrect = validated && normalizeChar(value) === normalizeChar(correctChar || "");
                  const isWrong = validated && value !== "" && normalizeChar(value) !== normalizeChar(correctChar || "");
                  const highlighted = isCellHighlighted(r, c);
                  const isFocused = focusedCell && focusedCell.row === r && focusedCell.col === c;

                  if (!hasInput) {
                    return (
                      <div 
                        key={cellKey} 
                        className="w-8 h-8 sm:w-11 sm:h-11 bg-slate-900/40 rounded border border-slate-850/65"
                        style={{ transform: 'translateZ(-5px)' }}
                      ></div>
                    );
                  }

                  return (
                    <div 
                      key={cellKey}
                      className="relative"
                    >
                      {/* Cell number indicator */}
                      {activeCell.starterNum && (
                        <span className="absolute top-0.5 left-1 text-[8px] font-bold text-amber-500 z-20 font-mono">
                          {activeCell.starterNum}
                        </span>
                      )}

                      <input
                        id={`crossword-input-${r}-${c}`}
                        type="text"
                        maxLength={1}
                        value={value}
                        onFocus={() => {
                          setFocusedCell({ row: r, col: c });
                          const associated = getCellClues(r, c);
                          if (associated.length > 0) {
                            setSelectedClue(associated[0]);
                          }
                        }}
                        onChange={(e) => handleCellChange(r, c, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace') {
                            const cellKey = `${r}-${c}`;
                            if (!inputs[cellKey]) {
                              // Go back to the previous cell
                              autoRegress(r, c);
                              e.preventDefault();
                            }
                          }
                        }}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="characters"
                        inputMode="text"
                        className={`w-8 h-8 sm:w-11 sm:h-11 text-center font-mono font-black text-xs sm:text-lg uppercase rounded transition-all duration-300 transform outline-none border focus:ring-1 cursor-pointer ${
                          isCorrect 
                            ? 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300 text-slate-950 shadow-[0_5px_15px_rgba(245,158,11,0.4)] translate-z-10' 
                            : isWrong
                              ? 'bg-red-950 border-red-500 text-red-100'
                              : highlighted
                                ? 'bg-slate-800 border-rose-500 text-white shadow-md'
                                : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                        } ${isFocused ? 'ring-2 ring-amber-400 translate-z-5' : ''}`}
                        style={{
                          transformStyle: 'preserve-3d',
                          boxShadow: isCorrect ? '0 10px 20px -5px rgba(245,158,11,0.5), inset 0 -4px 0 #b45309' : 'none',
                        }}
                      />
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Active Helper hints */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-normal">
            <span className="flex items-center gap-1.5 bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-full text-slate-400 font-normal">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
              Ընտրված բառը
            </span>
            <span className="flex items-center gap-1.5 bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-full text-slate-400 font-normal">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
              Իսպաներեն բառը
            </span>
          </div>

          {/* Virtual Spanish Keyboard for easy phonetic and mobile tap input */}
          <div className="mt-5 w-full bg-slate-950 p-2 sm:p-3 rounded-xl border border-slate-850 space-y-2 select-none mx-auto max-w-sm">
            <div className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500 flex items-center justify-between">
              <span>Իսպաներեն Վիրտուալ Ստեղնաշար</span>
              {focusedCell ? (
                <span className="text-amber-500 font-bold font-mono">
                  Վանդակ՝ [{focusedCell.row + 1}, {focusedCell.col + 1}]
                </span>
              ) : (
                <span className="text-slate-600">Ընտրեք վանդակը</span>
              )}
            </div>
            
            <div className="space-y-1.5">
              {KEYBOARD_ROWS.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-1">
                  {row.map((char) => {
                    const isBackspace = char === "⌫";
                    return (
                      <button
                        key={char}
                        type="button"
                        onClick={() => handleVirtualKeyPress(char)}
                        disabled={!focusedCell}
                        className={`font-mono font-bold text-2xs sm:text-xs rounded select-none flex items-center justify-center transition-all ${
                          isBackspace 
                            ? 'px-2 h-7 sm:h-8 bg-red-950/45 hover:bg-red-900/45 text-red-200 border border-red-900/30' 
                            : 'w-6 h-7 sm:w-8 sm:h-8 bg-slate-900 hover:bg-slate-850 active:bg-slate-800 text-slate-200 border border-slate-800'
                        } ${!focusedCell ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer active:scale-95 hover:border-slate-600'}`}
                        style={{ touchAction: 'manipulation' }}
                      >
                        {char}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HINTS AND CLUES SELECT PANEL */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 font-mono">
              <HelpCircle className="w-4 h-4 text-rose-500" />
              Կրոսվորդի հուշումներ
            </h4>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {CROSSWORD_CLUES.map((clue) => {
                const isSelected = selectedClue?.id === clue.id;
                // Check if all cells for this clue are filled
                let filledCount = 0;
                for (let i = 0; i < clue.length; i++) {
                  const checkR = clue.direction === 'horizontal' ? clue.row : clue.row + i;
                  const checkC = clue.direction === 'horizontal' ? clue.col + i : clue.col;
                  if (inputs[`${checkR}-${checkC}`]) filledCount++;
                }
                const isCompleted = filledCount === clue.length;

                return (
                  <button
                    id={`clue-row-${clue.id}`}
                    key={clue.id}
                    onClick={() => handleClueSelect(clue)}
                    className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2.5 cursor-pointer ${
                      isSelected 
                        ? 'bg-rose-950/20 border-rose-500 text-white' 
                        : isCompleted
                          ? 'bg-slate-900 border-slate-800 text-slate-500'
                          : 'bg-slate-900/60 border-slate-850 text-slate-300 hover:border-slate-800'
                    }`}
                  >
                    <span className={`inline-flex shrink-0 w-5 h-5 items-center justify-center font-black rounded-full text-[10px] ${
                      isSelected ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {clue.number}
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-amber-500 block">
                        {clue.direction === 'horizontal' ? 'Հորիզոնական' : 'Ուղղահայաց'} • {clue.length} տառ
                      </span>
                      <span className="font-normal">{clue.question}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action validation panel */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
            <div className="flex justify-between items-center">
              <button
                id="reset-crossword-btn"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Մաքրել
              </button>

              <button
                id="check-crossword-btn"
                onClick={handleValidate}
                className="bg-gradient-to-r from-amber-500 to-rose-655 hover:from-amber-400 hover:to-rose-555 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Ստուգել բոլոր տառերը
              </button>
            </div>

            {/* Validation Outcome dialogue */}
            {validated && (
              <div 
                id="crossword-feedback"
                className={`p-3 rounded-lg border text-xs leading-relaxed ${
                  isWon 
                    ? 'bg-green-950/30 border-green-500 text-green-300' 
                    : 'bg-amber-950/35 border-amber-500 text-amber-300'
                }`}
              >
                {isWon ? (
                  <div className="flex items-start gap-2 text-left">
                    <span className="text-lg">🏆</span>
                    <div className="font-normal">
                      <span className="font-bold block text-green-400">Կրոսվորդն ամբողջությամբ լուծված է՛:</span>
                      Գոռը և Գայանեն արժանացան պատվավոր ոսկե մեդալների: Դուք անթերի լրացրեցիք անցյալ ժամանակների բոլոր վերջավորությունները։
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-left border-amber-600/30">
                    <span className="text-lg">⚠️</span>
                    <div className="font-normal">
                      <span className="font-bold block text-amber-500">Կան անճշտություններ կամ դատարկ վանդակներ:</span>
                      Որոշ վանդակներ կարմիր են։ Ստուգե՛ք քերականական հուշումները և փորձե՛ք փոխել տառերը։
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* SELECTED WORD EXPLANATION PREVIEW BOX */}
      {selectedClue && (
        <div id="selected-clue-expl" className="mt-6 bg-slate-950/90 border border-slate-850 p-4 rounded-xl flex items-start gap-3.5 animate-fade-in">
          <div className="p-2.5 bg-slate-900 border border-slate-800 text-yellow-500 rounded-lg text-xl shrink-0">
            📖
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xs font-bold uppercase tracking-widest text-slate-500 font-mono">
                Գոռի և Գայանեի վերլուծությունը #{selectedClue.number} բառի համար՝
              </span>
              <span className="text-3s bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold capitalize font-mono">
                {selectedClue.tense}
              </span>
            </div>
            <h5 className="font-bold text-white text-sm mb-1 font-normal">
              Ճիշտ պատասխանը՝ <span className="text-amber-400 tracking-wider font-mono font-bold">{selectedClue.answer}</span>
            </h5>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal font-mono">
              {selectedClue.explanation}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
