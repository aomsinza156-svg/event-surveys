"use client";

import { useState } from "react";
import { Check, ChevronDown, Plus, Trash2, X } from "lucide-react";
import { Button, Card, Field, PageHeader, inputClass, cn } from "@/components/ui";
import { Toggle } from "@/components/toggle";
import { events, questionTypeLabel, surveyQuestions, type Question, type QuestionType } from "@/lib/mock-data";

export default function SurveyBuilderPage() {
  // TODO(API): GET /events/{eventId}/survey เพื่อโหลดคำถามที่มีอยู่
  const [questions, setQuestions] = useState<Question[]>(surveyQuestions);
  const [eventId, setEventId] = useState(events[0].id);
  const [published, setPublished] = useState(false);

  const update = (id: number, patch: Partial<Question>) =>
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));

  function addQuestion() {
    const id = Math.max(0, ...questions.map((q) => q.id)) + 1;
    setQuestions((qs) => [...qs, { id, title: "", type: "single", required: false, options: ["Option 1", "Option 2"] }]);
  }

  function publish() {
    // TODO(API): PUT /events/{eventId}/survey { questions }
    setPublished(true);
    setTimeout(() => setPublished(false), 2000);
  }

  const eventName = events.find((e) => e.id === eventId)?.name;

  return (
    <>
      <PageHeader
        title="Survey Builder"
        subtitle={`${eventName} · each question can have its own answer type and number of answers.`}
        actions={
          <Button onClick={publish}>
            <Check className="size-4" /> {published ? "Published!" : "Publish survey"}
          </Button>
        }
      />

      <div className="grid grid-cols-[1fr_340px] items-start gap-5">
        <div className="space-y-4">
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              index={i + 1}
              q={q}
              onChange={(p) => update(q.id, p)}
              onDelete={() => setQuestions((qs) => qs.filter((x) => x.id !== q.id))}
            />
          ))}
          <button
            onClick={addQuestion}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-light bg-brand-soft text-sm font-semibold text-brand-dark hover:border-brand"
          >
            <Plus className="size-4" /> Add question
          </button>
        </div>

        <Card className="p-5">
          <h2 className="text-[15px] font-semibold">Survey settings</h2>
          <div className="mt-4">
            <Field label="Event">
              <div className="relative">
                {/* TODO(API): รายการ event จาก GET /events */}
                <select value={eventId} onChange={(e) => setEventId(e.target.value)} className={cn(inputClass, "appearance-none pr-9")}>
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              </div>
            </Field>
          </div>
        </Card>
      </div>
    </>
  );
}

function QuestionCard({ index, q, onChange, onDelete }: { index: number; q: Question; onChange: (p: Partial<Question>) => void; onDelete: () => void }) {
  const hasOptions = q.type === "single" || q.type === "multiple" || q.type === "dropdown";
  const [rating, setRating] = useState(4);

  const summary =
    q.type === "rating"
      ? "Answers: 1 to 5 scale · attendee selects 1"
      : q.type === "text"
        ? "Answers: free text · up to 200 characters"
        : `Answers: ${q.options.length} options · attendee selects ${q.type === "multiple" ? `up to ${q.maxSelect ?? q.options.length}` : "1"}`;

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand-dark">{index}</span>
        <input value={q.title} placeholder="Type your question" onChange={(e) => onChange({ title: e.target.value })} className={cn(inputClass, "h-9 flex-1")} />
        <div className="relative">
          <select
            value={q.type}
            onChange={(e) => {
              const type = e.target.value as QuestionType;
              onChange({ type, options: q.options.length ? q.options : ["Option 1", "Option 2"] });
            }}
            className="h-7 appearance-none rounded-full bg-brand-soft px-3 text-xs font-medium text-brand-dark outline-none"
          >
            {Object.entries(questionTypeLabel).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <span className="text-xs text-muted">Required</span>
        <Toggle label="Required" checked={q.required} onChange={(v) => onChange({ required: v })} />
        <span className="h-6 w-px bg-line" />
        <button onClick={onDelete} aria-label="Delete question" className="flex size-8 items-center justify-center rounded-lg bg-danger-soft text-danger">
          <Trash2 className="size-4" />
        </button>
      </div>

      <p className="mb-3 ml-10 mt-3 text-xs text-muted">{summary}</p>

      <div className="ml-10">
        {hasOptions && (
          <>
            <ul className="space-y-2">
              {q.options.map((opt, i) => (
                <li key={i} className="flex h-[38px] items-center gap-3 rounded-lg border border-line px-3">
                  <span className={cn("size-4 shrink-0 border border-gray-300", q.type === "multiple" ? "rounded" : "rounded-full")} />
                  <input
                    value={opt}
                    onChange={(e) => onChange({ options: q.options.map((o, j) => (j === i ? e.target.value : o)) })}
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                  <button onClick={() => onChange({ options: q.options.filter((_, j) => j !== i) })} className="text-muted hover:text-danger" aria-label="Remove option">
                    <X className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onChange({ options: [...q.options, `Option ${q.options.length + 1}`] })}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-dark"
            >
              <Plus className="size-3.5" /> Add option
            </button>
          </>
        )}

        {q.type === "rating" && (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                className={cn("size-10 rounded-full border text-sm font-medium", n === rating ? "border-brand bg-brand text-white" : "border-line bg-white text-ink")}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {q.type === "text" && <input disabled placeholder="Attendee types their answer here..." className={cn(inputClass, "bg-white")} />}
      </div>
    </Card>
  );
}
