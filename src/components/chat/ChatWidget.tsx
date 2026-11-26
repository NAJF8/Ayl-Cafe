"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { answerQuestion } from "@/lib/assistant";
import { useLanguage } from "@/lib/language-context";
import { brand } from "@/data/brand";

type Message = { id: string; role: "user" | "assistant"; text: string; quickReplies?: string[] };

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function ChatWidget() {
  const { pick, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting = answerQuestion(pick("مرحبا", "hello"), lang);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time greeting shown the first time the panel opens
      setMessages([{ id: makeId(), role: "assistant", text: greeting.text, quickReplies: greeting.quickReplies }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: makeId(), role: "user", text: trimmed };
    const reply = answerQuestion(trimmed, lang);
    const assistantMsg: Message = { id: makeId(), role: "assistant", text: reply.text, quickReplies: reply.quickReplies };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={pick("مساعد أيل", "Ayl assistant")}
        className="fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-cream shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5h16v11H8l-4 4V5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={pick("مساعد أيل", "Ayl assistant")}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-24 z-40 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:inset-x-auto sm:end-5 sm:w-96"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="font-display text-base text-primary">{brand.shortNameAr}</span>
              <span className="text-sm text-text-muted">{pick("مساعد الكافيه", "Café assistant")}</span>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-ee-sm bg-primary px-3.5 py-2 text-sm text-cream"
                        : "max-w-[85%] rounded-2xl rounded-ss-sm bg-surface-raised px-3.5 py-2 text-sm text-text"
                    }
                  >
                    {m.text}
                    {m.quickReplies && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.quickReplies.map((q) =>
                          q === pick("افتح المنيو", "Open menu") ? (
                            <Link
                              key={q}
                              href="/menu"
                              className="rounded-full border border-primary/50 px-2.5 py-1 text-xs text-primary hover:bg-primary hover:text-cream"
                            >
                              {q}
                            </Link>
                          ) : (
                            <button
                              key={q}
                              type="button"
                              onClick={() => send(q)}
                              className="rounded-full border border-border px-2.5 py-1 text-xs text-text-muted hover:text-text"
                            >
                              {q}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 300))}
                placeholder={pick("اكتب سؤالك...", "Ask a question...")}
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                aria-label={pick("إرسال", "Send")}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-cream transition-opacity hover:opacity-90"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M14 2L2 7l5 2 2 5 5-12z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
