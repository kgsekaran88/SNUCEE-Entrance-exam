"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import {
  allQuestions,
  sectionLabels,
  getQuestionsBySource,
  type Question,
} from "@/data/questions";

type ExamState = "setup" | "running" | "finished";
type FilterYear = number | "all";
type ExamMode = "previous-year" | "full-practice";

const TOTAL_TIME_SECONDS = 2 * 60 * 60; // 2 hours
const MARKS_CORRECT = 1.25;
const MARKS_WRONG = -0.25;

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ExamPage() {
  const [examState, setExamState] = useState<ExamState>("setup");
  const [selectedYear, setSelectedYear] = useState<FilterYear>("all");
  const [examMode, setExamMode] = useState<ExamMode>("full-practice");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startExam = useCallback(() => {
    let qs: Question[];
    if (examMode === "previous-year") {
      qs = getQuestionsBySource("official");
    } else {
      qs = allQuestions;
    }
    if (selectedYear !== "all") {
      qs = qs.filter((q) => q.year === selectedYear);
    }
    qs = shuffleArray(qs);
    setQuestions(qs);
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(TOTAL_TIME_SECONDS);
    setMarkedForReview(new Set());
    setExamState("running");
  }, [selectedYear, examMode]);

  // Timer
  useEffect(() => {
    if (examState !== "running") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setExamState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState]);

  function handleAnswer(questionId: string, label: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: label }));
  }

  function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);
    setExamState("finished");
  }

  function toggleReview(questionId: string) {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  }

  // Score calculation
  const scoreData = useMemo(() => {
    if (examState !== "finished") return null;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const sectionScores: Record<string, { correct: number; wrong: number; total: number }> = {};

    for (const q of questions) {
      if (!sectionScores[q.section]) {
        sectionScores[q.section] = { correct: 0, wrong: 0, total: 0 };
      }
      sectionScores[q.section].total++;

      const ans = answers[q.id];
      if (!ans) {
        unanswered++;
      } else if (ans === q.correctAnswer) {
        correct++;
        sectionScores[q.section].correct++;
      } else {
        wrong++;
        sectionScores[q.section].wrong++;
      }
    }

    const totalMarks = correct * MARKS_CORRECT + wrong * MARKS_WRONG;
    const maxMarks = questions.length * MARKS_CORRECT;

    return { correct, wrong, unanswered, totalMarks, maxMarks, sectionScores };
  }, [examState, questions, answers]);

  const question = questions[currentIndex];

  // ── SETUP SCREEN ──
  if (examState === "setup") {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
        <header className="bg-[#0a1628] text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c8a951] flex items-center justify-center font-bold text-[#0a1628] text-sm">
                SNU
              </div>
              <span className="font-bold text-lg">Mock Exam</span>
            </Link>
            <Link href="/practice" className="text-[#c8a951] hover:underline text-sm">
              ← Practice Mode
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm max-w-lg w-full p-8">
            <h2 className="text-2xl font-bold text-[#0a1628] mb-2 text-center">
              SNUCEE Mock Exam
            </h2>
            <p className="text-gray-500 text-sm text-center mb-8">
              Simulate the real entrance exam conditions
            </p>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-2">
                  Exam Mode
                </label>
                <select
                  value={examMode}
                  onChange={(e) => setExamMode(e.target.value as ExamMode)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                >
                  <option value="full-practice">Full Practice (All Questions – Official + Prepared)</option>
                  <option value="previous-year">Previous Year Only (Official Papers)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-2">
                  Question Set
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) =>
                    setSelectedYear(
                      e.target.value === "all" ? "all" : Number(e.target.value)
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                >
                  <option value="all">All Questions (Shuffled)</option>
                  <option value="2025">2025 Paper</option>
                  <option value="2026">2026 Paper</option>
                </select>
              </div>

              <div className="bg-[#f5f5f5] rounded-lg p-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold">2 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Correct Answer</span>
                  <span className="font-semibold text-green-600">+1.25 marks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Wrong Answer</span>
                  <span className="font-semibold text-red-500">−0.25 marks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Unanswered</span>
                  <span className="font-semibold">0 marks</span>
                </div>
              </div>

              <button
                onClick={startExam}
                className="w-full bg-[#c8a951] text-[#0a1628] py-4 rounded-lg font-bold text-lg hover:bg-[#e8d48b] transition"
              >
                Start Exam
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── RESULTS SCREEN ──
  if (examState === "finished" && scoreData) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
        <header className="bg-[#0a1628] text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c8a951] flex items-center justify-center font-bold text-[#0a1628] text-sm">
                SNU
              </div>
              <span className="font-bold text-lg">Exam Results</span>
            </div>
            <div className="flex gap-4 text-sm">
              <Link href="/practice" className="text-[#c8a951] hover:underline">
                Practice Mode
              </Link>
              <button
                onClick={() => setExamState("setup")}
                className="text-[#c8a951] hover:underline"
              >
                Retake Exam
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          {/* Score Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-6 text-center">
            <h2 className="text-2xl font-bold text-[#0a1628] mb-1">Your Score</h2>
            <div className="text-6xl font-bold text-[#1a3a6b] my-4">
              {scoreData.totalMarks.toFixed(2)}
            </div>
            <div className="text-gray-500 mb-6">
              out of {scoreData.maxMarks.toFixed(2)} marks
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {scoreData.correct}
                </div>
                <div className="text-xs text-green-700">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-500">
                  {scoreData.wrong}
                </div>
                <div className="text-xs text-red-600">Wrong</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-500">
                  {scoreData.unanswered}
                </div>
                <div className="text-xs text-gray-500">Unanswered</div>
              </div>
            </div>
          </div>

          {/* Section-wise Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-bold text-[#0a1628] mb-4">Section-wise Performance</h3>
            <div className="space-y-3">
              {Object.entries(scoreData.sectionScores).map(([section, data]) => {
                const pct =
                  data.total > 0
                    ? Math.round((data.correct / data.total) * 100)
                    : 0;
                return (
                  <div key={section} className="flex items-center gap-4">
                    <div className="w-44 text-sm font-medium text-gray-700 shrink-0">
                      {sectionLabels[section as Question["section"]] ?? section}
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-[#1a3a6b] h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-600 w-20 text-right">
                      {data.correct}/{data.total} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review Answers */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-[#0a1628] mb-4">Review Answers</h3>
            <div className="space-y-4">
              {questions.map((q, i) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`border rounded-lg p-4 ${
                      !userAns
                        ? "border-gray-200"
                        : isCorrect
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold bg-gray-200 px-2 py-0.5 rounded">
                            Q{i + 1}
                          </span>
                          <span className="text-xs text-gray-500">
                            {sectionLabels[q.section]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 line-clamp-2">
                          {q.questionText}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        {!userAns ? (
                          <span className="text-xs text-gray-400">Skipped</span>
                        ) : isCorrect ? (
                          <span className="text-sm font-bold text-green-600">
                            ✓ {userAns}
                          </span>
                        ) : (
                          <div>
                            <span className="text-sm font-bold text-red-500 line-through">
                              {userAns}
                            </span>
                            <span className="text-sm font-bold text-green-600 ml-2">
                              {q.correctAnswer}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {(userAns && !isCorrect) && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── EXAM RUNNING SCREEN ──
  if (!question) return null;

  const isAnswered = !!answers[question.id];
  const isReview = markedForReview.has(question.id);
  const answeredCount = Object.keys(answers).length;
  const timeWarning = timeLeft < 600; // under 10 minutes

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      {/* Sticky Header */}
      <header className="bg-[#0a1628] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c8a951] flex items-center justify-center font-bold text-[#0a1628] text-xs">
              SNU
            </div>
            <span className="font-bold hidden sm:inline">SNUCEE Mock Exam</span>
          </div>
          <div
            className={`font-mono text-xl font-bold ${
              timeWarning ? "text-red-400 animate-pulse" : "text-[#c8a951]"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              {answeredCount}/{questions.length} answered
            </span>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to submit the exam?")) {
                  handleSubmit();
                }
              }}
              className="bg-[#c8a951] text-[#0a1628] px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-[#e8d48b] transition"
            >
              Submit
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Question Area */}
        <main className="flex-1 px-4 py-6 lg:pr-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Question header bar */}
            <div className="bg-[#0f2044] text-white px-6 py-3 flex items-center justify-between text-sm">
              <span>
                {sectionLabels[question.section]} · {question.source === "prepared" ? "Prepared" : question.year}
              </span>
              <span>
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>

            <div className="p-6">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line text-[15px] mb-6">
                {question.questionText}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((opt) => {
                  const isSelected = answers[question.id] === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(question.id, opt.label)}
                      className={`w-full text-left border-2 rounded-lg p-4 transition-all flex items-start gap-3 ${
                        isSelected
                          ? "border-[#1a3a6b] bg-blue-50"
                          : "border-gray-200 hover:border-[#1a3a6b] hover:bg-blue-50"
                      } cursor-pointer`}
                    >
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isSelected
                            ? "bg-[#1a3a6b] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-[15px] pt-1">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => currentIndex > 0 && setCurrentIndex((i) => i - 1)}
                disabled={currentIndex === 0}
                className="px-5 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ← Previous
              </button>
              <button
                onClick={() => toggleReview(question.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isReview
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                    : "bg-gray-100 text-gray-600 hover:bg-yellow-50"
                }`}
              >
                {isReview ? "★ Marked" : "☆ Mark for Review"}
              </button>
              <button
                onClick={() =>
                  currentIndex < questions.length - 1 &&
                  setCurrentIndex((i) => i + 1)
                }
                disabled={currentIndex === questions.length - 1}
                className="px-5 py-2 rounded-lg text-sm font-medium bg-[#1a3a6b] text-white hover:bg-[#0f2044] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Clear answer */}
          {isAnswered && (
            <div className="mt-3 text-center">
              <button
                onClick={() =>
                  setAnswers((prev) => {
                    const next = { ...prev };
                    delete next[question.id];
                    return next;
                  })
                }
                className="text-sm text-gray-400 hover:text-red-500 transition"
              >
                Clear Answer
              </button>
            </div>
          )}
        </main>

        {/* Question Palette (Sidebar) */}
        <aside className="w-full lg:w-64 px-4 py-6 lg:pl-2">
          <div className="bg-white rounded-xl shadow-sm p-4 sticky top-16">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Question Palette
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {questions.map((q, i) => {
                const isActive = i === currentIndex;
                const hasAnswer = !!answers[q.id];
                const isMarked = markedForReview.has(q.id);
                let bg = "bg-gray-100 text-gray-500";
                if (isActive) bg = "bg-[#1a3a6b] text-white";
                else if (hasAnswer && isMarked)
                  bg = "bg-yellow-300 text-yellow-900 ring-2 ring-green-400";
                else if (hasAnswer) bg = "bg-green-500 text-white";
                else if (isMarked) bg = "bg-yellow-300 text-yellow-900";
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition ${bg}`}
                    title={`Q${i + 1} – ${sectionLabels[q.section]}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="text-xs space-y-1.5 text-gray-500 border-t pt-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#1a3a6b] inline-block" />
                Current
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-green-500 inline-block" />
                Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-yellow-300 inline-block" />
                Marked for Review
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-gray-100 inline-block" />
                Not Visited
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
