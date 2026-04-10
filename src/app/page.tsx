"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#c8a951] flex items-center justify-center font-bold text-[#0a1628] text-lg">
              SNU
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">
                SNUCEE Practice
              </h1>
              <p className="text-xs text-[#c8a951]">
                Shiv Nadar University · Entrance Exam Preparation
              </p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="text-[#c8a951] font-semibold">
              Home
            </Link>
            <Link href="/practice" className="hover:text-[#c8a951] transition">
              Practice Mode
            </Link>
            <Link href="/exam" className="hover:text-[#c8a951] transition">
              Mock Exam
            </Link>
          </nav>
          {/* Mobile menu */}
          <div className="md:hidden flex gap-4 text-sm">
            <Link href="/practice" className="text-[#c8a951]">Practice</Link>
            <Link href="/exam" className="text-[#c8a951]">Exam</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f2044] to-[#1a3a6b] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Master the{" "}
            <span className="text-[#c8a951]">SNUCEE Entrance Exam</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Practice with real sample questions from SNUSAT &amp; APT papers,
            plus expertly prepared Chemistry and Computer Science questions.
            Detailed explanations, timed mock tests, and instant feedback to
            help you ace the Shiv Nadar University Common Entrance Examination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/practice"
              className="bg-[#c8a951] text-[#0a1628] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#e8d48b] transition shadow-lg"
            >
              Start Practice Mode
            </Link>
            <Link
              href="/exam"
              className="border-2 border-[#c8a951] text-[#c8a951] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#c8a951] hover:text-[#0a1628] transition"
            >
              Take Mock Exam
            </Link>
          </div>
        </div>
      </section>

      {/* Exam Pattern Info */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-[#0a1628] mb-12">
            SNUCEE Exam Pattern
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f5f5f5] rounded-xl p-6 border-l-4 border-[#c8a951]">
              <h4 className="text-xl font-bold text-[#0a1628] mb-4">
                Part A – Aptitude Test (SNUSAT)
              </h4>
              <p className="text-gray-600 mb-4">Required for all UG programs</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Logical Reasoning</span>
                  <span className="text-[#1a3a6b] font-semibold">20 Qs · 45 min</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Quantitative Aptitude</span>
                  <span className="text-[#1a3a6b] font-semibold">20 Qs · 45 min</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-bold">Total</span>
                  <span className="text-[#c8a951] font-bold">40 Qs · 90 min</span>
                </div>
              </div>
            </div>
            <div className="bg-[#f5f5f5] rounded-xl p-6 border-l-4 border-[#1a3a6b]">
              <h4 className="text-xl font-bold text-[#0a1628] mb-4">
                Part B – Subject Matter Test (APT)
              </h4>
              <p className="text-gray-600 mb-4">Required for BTech &amp; BS CS</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Mathematics</span>
                  <span className="text-[#1a3a6b] font-semibold">20 Qs · 30 min</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Physics</span>
                  <span className="text-[#1a3a6b] font-semibold">20 Qs · 30 min</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Chemistry</span>
                  <span className="text-[#1a3a6b] font-semibold">20 Qs · 30 min</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Computer Science</span>
                  <span className="text-[#1a3a6b] font-semibold">20 Qs · 30 min</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-bold">Subjects per student</span>
                  <span className="text-[#c8a951] font-bold">2 subjects · 60 min</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-[#0a1628] text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-[#c8a951]">2 hrs</div>
              <div className="text-sm mt-1 text-gray-300">Total Duration</div>
            </div>
            <div className="bg-[#0a1628] text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-[#c8a951]">100</div>
              <div className="text-sm mt-1 text-gray-300">Total Marks</div>
            </div>
            <div className="bg-[#0a1628] text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-[#c8a951]">120</div>
              <div className="text-sm mt-1 text-gray-300">Questions</div>
            </div>
            <div className="bg-[#0a1628] text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-[#ef4444]">−0.25</div>
              <div className="text-sm mt-1 text-gray-300">Negative Marking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-[#0a1628] mb-12">
            How to Prepare
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#e8d48b] flex items-center justify-center mb-4 text-2xl">
                📖
              </div>
              <h4 className="text-lg font-bold text-[#0a1628] mb-2">Practice Mode</h4>
              <p className="text-gray-600">
                Go through questions at your own pace. Get instant feedback with
                detailed explanations and chapter references.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#e8d48b] flex items-center justify-center mb-4 text-2xl">
                ⏱️
              </div>
              <h4 className="text-lg font-bold text-[#0a1628] mb-2">Timed Mock Exam</h4>
              <p className="text-gray-600">
                Simulate the real SNUCEE exam with a 2-hour timer, negative
                marking, and comprehensive score report.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#e8d48b] flex items-center justify-center mb-4 text-2xl">
                📊
              </div>
              <h4 className="text-lg font-bold text-[#0a1628] mb-2">Detailed Analysis</h4>
              <p className="text-gray-600">
                See correct answers with logical explanations, chapter
                references, and topic-wise performance breakdown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Question Bank Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-[#0a1628] mb-8">Question Bank</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="text-4xl font-bold text-[#1a3a6b]">20</div>
              <div className="text-sm text-gray-500 mt-1">Logical Reasoning</div>
              <div className="text-xs text-gray-400">Official</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-[#1a3a6b]">20</div>
              <div className="text-sm text-gray-500 mt-1">Quantitative Aptitude</div>
              <div className="text-xs text-gray-400">Official</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-[#1a3a6b]">20</div>
              <div className="text-sm text-gray-500 mt-1">APT Mathematics</div>
              <div className="text-xs text-gray-400">Official</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-[#1a3a6b]">20</div>
              <div className="text-sm text-gray-500 mt-1">APT Physics</div>
              <div className="text-xs text-gray-400">Official</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-[#c8a951]">20</div>
              <div className="text-sm text-gray-500 mt-1">APT Chemistry</div>
              <div className="text-xs text-[#c8a951]">Prepared</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-[#c8a951]">20</div>
              <div className="text-sm text-gray-500 mt-1">APT Computer Science</div>
              <div className="text-xs text-[#c8a951]">Prepared</div>
            </div>
          </div>
          <p className="text-gray-500 mt-4">
            120 questions — 80 from official SNUSAT &amp; APT sample papers (2025–2026)
            + 40 prepared questions for Chemistry &amp; Computer Science
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1628] text-white py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            This is an unofficial practice tool. Official questions are sourced from
            publicly available SNUSAT &amp; APT sample papers. Prepared questions are
            based on the official SNU syllabus.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Not affiliated with Shiv Nadar University
          </p>
        </div>
      </footer>
    </div>
  );
}
