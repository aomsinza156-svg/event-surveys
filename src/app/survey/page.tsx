"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { MobileHeader, MobileShell } from "@/components/mobile-header";
import { cn } from "@/components/ui";
import { publicEvent as ev, surveyQuestions } from "@/lib/mock-data";

type Answer = string | string[] | number | undefined;

export default function SurveyPage() {
  // TODO(API): GET /public/events/{slug}/survey → คำถามจริง (ตอนนี้ใช้ mock เดียวกับ Survey Builder)
  const questions = surveyQuestions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [done, setDone] = useState(false);

  const q = questions[step];
  const answer = answers[q.id];
  const setAnswer = (a: Answer) => setAnswers((s) => ({ ...s, [q.id]: a }));
  const isLast = step === questions.length - 1;
  const answered = Array.isArray(answer) ? answer.length > 0 : answer !== undefined && answer !== "";

  function next() {
    if (!isLast) return setStep(step + 1);
    // TODO(API): POST /public/events/{slug}/survey-responses { answers }
    setDone(true);
  }

  if (done) {
    return (
      <MobileShell>
        <MobileHeader title={ev.name} subtitle="Survey" />
        <div className="flex flex-1 flex-col items-center justify-center px-7 pb-24 text-center">
          <span className="flex size-24 items-center justify-center rounded-full bg-success text-white"><Check className="size-12" strokeWidth={2.5} /></span>
          <h1 className="mt-5 text-[26px] font-bold">Thank you!</h1>
          <p className="mt-3 text-[15px] text-muted">Your answers help us make the next event even better.</p>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <MobileHeader title={ev.name} subtitle={`Survey · Question ${step + 1} of ${questions.length}`}>
        <div className="mt-4 h-1.5 w-full rounded-full bg-white/30">
          <div className="h-full rounded-full bg-white transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
        </div>
      </MobileHeader>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-6">
        <h1 className="text-[22px] font-bold leading-snug text-ink">{q.title}</h1>
        <p className="mt-1 text-sm text-muted">
          {q.type === "multiple" ? `Select up to ${q.maxSelect ?? q.options.length}` : q.type === "rating" ? "1 = not satisfied, 5 = very satisfied" : q.type === "text" ? "Optional, up to 200 characters" : "Select one"}
        </p>

        <div className="mt-5 space-y-3">
          {(q.type === "single" || q.type === "multiple" || q.type === "dropdown") &&
            q.options.map((opt) => {
              const multi = q.type === "multiple";
              const selected = multi ? ((answer as string[]) ?? []).includes(opt) : answer === opt;
              return (
                <button
                  key={opt}
                  onClick={() => {
                    if (!multi) return setAnswer(opt);
                    const cur = (answer as string[]) ?? [];
                    if (cur.includes(opt)) setAnswer(cur.filter((x) => x !== opt));
                    else if (cur.length < (q.maxSelect ?? Infinity)) setAnswer([...cur, opt]);
                  }}
                  className={cn(
                    "flex h-[52px] w-full items-center gap-3 rounded-xl border px-4 text-left text-[15px]",
                    selected ? "border-brand bg-brand-soft font-semibold" : "border-line bg-white",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center border",
                      multi ? "rounded" : "rounded-full",
                      selected ? "border-brand bg-brand text-white" : "border-gray-300",
                    )}
                  >
                    {selected && (multi ? <Check className="size-3.5" strokeWidth={3} /> : <span className="size-2 rounded-full bg-white" />)}
                  </span>
                  {opt}
                </button>
              );
            })}

          {q.type === "rating" && (
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setAnswer(n)}
                  className={cn("size-14 rounded-full border text-lg font-semibold", answer === n ? "border-brand bg-brand text-white" : "border-line bg-white")}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          {q.type === "text" && (
            <textarea
              rows={5}
              maxLength={200}
              value={(answer as string) ?? ""}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full rounded-xl border border-line p-4 text-[15px] outline-none focus:border-brand"
            />
          )}
        </div>

        <div className="flex-1" />
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex h-[50px] items-center justify-center gap-2 rounded-xl border border-line bg-white text-base font-semibold disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          <button
            onClick={next}
            disabled={q.required && q.type !== "text" && !answered}
            className="flex h-[50px] items-center justify-center gap-2 rounded-xl bg-brand text-base font-semibold text-white disabled:opacity-50"
          >
            {isLast ? "Submit" : "Next"} <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </MobileShell>
  );
}
