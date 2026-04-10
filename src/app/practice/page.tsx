"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  allQuestions,
  sectionLabels,
  type Question,
} from "@/data/questions";

type FilterSection = Question["section"] | "all";
type FilterYear = number | "all";

export default function PracticePage() {
  const [selectedSection, setSelectedSection] = useState<FilterSection>("all");
  const [selectedYear, setSelectedYear] = useState<FilterYear>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, total: 0 });

  const filteredQuestions = useMemo(() => {
    let qs = allQuestions;
    if (selectedSection !== "all") {
      qs = qs.filter((q) => q.section === selectedSection);
    }
    if (selectedYear !== "all") {
      qs = qs.filter((q) => q.year === selectedYear);
    }
    return qs;
  }, [selectedSection, selectedYear]);

  const question = filteredQuestions[currentIndex];

  function handleFilterChange(section: FilterSection, year: FilterYear) {
    setSelectedSection(section);
    setSelectedYear(year);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
  }

  function handleOptionClick(label: string) {
    if (answered) return;
    setSelectedAnswer(label);
    setAnswered(true);
    setStats((prev) => ({
      correct: prev.correct + (label === question.correctAnswer ? 1 : 0),
      wrong: prev.wrong + (label !== question.correctAnswer ? 1 : 0),
      total: prev.total + 1,
    }));
  }

  function handleNext() {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }

  function handleReset() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setStats({ correct: 0, wrong: 0, total: 0 });
  }

  function getOptionClass(label: string) {
    if (!answered) {
      return "border-gray-200 hover:border-[#1a3a6b] hover:bg-blue-50 cursor-pointer";
    }
    if (label === question.correctAnswer) {
      return "option-correct";
    }
    if (label === selectedAnswer && label !== question.correctAnswer) {
      return "option-wrong";
    }
    return "border-gray-200 opacity-60";
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c8a951] flex items-center justify-center font-bold text-[#0a1628] text-sm">
              SNU
            </div>
            <span className="font-bold text-lg">Practice Mode</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-400">
              ✓ {stats.correct}
            </span>
            <span className="text-red-400">
              ✗ {stats.wrong}
            </span>
            <span className="text-gray-400">
              {stats.total}/{filteredQuestions.length}
            </span>
            <Link href="/exam" className="text-[#c8a951] hover:underline hidden sm:inline">
              Mock Exam →
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) =>
                  handleFilterChange(e.target.value as FilterSection, selectedYear)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="all">All Sections</option>
                {(Object.keys(sectionLabels) as Question["section"][]).map((key) => (
                  <option key={key} value={key}>
                    {sectionLabels[key]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) =>
                  handleFilterChange(
                    selectedSection,
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="all">All Years</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div className="ml-auto">
              <button
                onClick={handleReset}
                className="text-sm text-[#1a3a6b] hover:underline"
              >
                Reset Progress
              </button>
            </div>
          </div>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No questions found for this filter combination.
          </div>
        ) : (
          <>
            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Question Header */}
              <div className="bg-[#0f2044] text-white px-6 py-3 flex items-center justify-between text-sm">
                <span>
                  {sectionLabels[question.section]} · {question.year}
                </span>
                <span>
                  Question {currentIndex + 1} of {filteredQuestions.length}
                </span>
              </div>

              {/* Question Body */}
              <div className="p-6">
                <div className="mb-6">
                  <span className="inline-block bg-[#e8d48b] text-[#0a1628] text-xs font-bold px-2 py-1 rounded mb-3">
                    Q{question.questionNumber}
                    {question.chapter && (
                      <span className="font-normal ml-2">· {question.chapter}</span>
                    )}
                  </span>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line text-[15px]">
                    {question.questionText}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleOptionClick(opt.label)}
                      disabled={answered}
                      className={`w-full text-left border-2 rounded-lg p-4 transition-all flex items-start gap-3 ${getOptionClass(
                        opt.label
                      )}`}
                    >
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          answered && opt.label === question.correctAnswer
                            ? "bg-green-500 text-white"
                            : answered &&
                              opt.label === selectedAnswer &&
                              opt.label !== question.correctAnswer
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-[15px] pt-1">{opt.text}</span>
                    </button>
                  ))}
                </div>

                {/* Explanation */}
                {answered && (
                  <div
                    className={`mt-6 rounded-lg p-5 ${
                      selectedAnswer === question.correctAnswer
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAnswer === question.correctAnswer ? (
                        <span className="text-green-600 font-bold text-lg">
                          ✓ Correct!
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold text-lg">
                          ✗ Incorrect — Answer: {question.correctAnswer}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {question.explanation}
                    </p>
                    {question.chapter && (
                      <p className="mt-3 text-xs text-gray-500">
                        📘 Chapter: {question.chapter}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-5 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ← Previous
                </button>
                <span className="text-sm text-gray-400">
                  {currentIndex + 1} / {filteredQuestions.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === filteredQuestions.length - 1}
                  className="px-5 py-2 rounded-lg text-sm font-medium bg-[#1a3a6b] text-white hover:bg-[#0f2044] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Question Navigation Grid */}
            <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Question Navigator
              </h4>
              <div className="flex flex-wrap gap-2">
                {filteredQuestions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      setSelectedAnswer(null);
                      setAnswered(false);
                    }}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition ${
                      i === currentIndex
                        ? "bg-[#1a3a6b] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
