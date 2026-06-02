/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SpanishTense = 'perfecto' | 'indefinido' | 'imperfecto';

export interface Character {
  id: 'gor' | 'gayane';
  name: string;
  avatar: string; // Emoji or representation
  color: string; // Tailwind color class
  bgGradient: string;
  vehicle: string; // F1 car visual
  bio: string;
}

export interface RaceQuestion {
  id: number;
  question: string;
  translation?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tense: SpanishTense;
  cueWord?: string; // e.g. "Ayer", "Siempre", "Hoy"
}

export interface TranslationWord {
  id: number;
  spanish: string;
  armenian: string;
  tense: SpanishTense;
  explanation: string;
  context: string;
}

export interface CrosswordClue {
  id: number;
  number: number;
  direction: 'horizontal' | 'vertical';
  row: number; // 0-based index
  col: number; // 0-based index
  length: number;
  question: string;
  answer: string; // UPPERCASE Spanish word (e.g. HABLABA)
  explanation: string;
  tense: SpanishTense;
}

export interface LabyrinthNode {
  id: number;
  row: number;
  col: number;
  type: 'start' | 'finish' | 'question' | 'path' | 'wall';
  questionId?: number;
  visited: boolean;
}

export interface LabyrinthQuestion {
  id: number;
  sentence: string; // Spanish sentence with blank
  options: string[];
  correctIndex: number;
  explanation: string;
  tense: SpanishTense;
}
