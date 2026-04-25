"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

function renderLine(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  while (remaining.length > 0) {
    const boldIdx = remaining.indexOf("**");
    const linkIdx = remaining.indexOf("[");

    if (boldIdx === -1 && linkIdx === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    const firstIdx = boldIdx === -1 ? linkIdx : linkIdx === -1 ? boldIdx : Math.min(boldIdx, linkIdx);

    if (firstIdx === boldIdx) {
      const closeIdx = remaining.indexOf("**", boldIdx + 2);
      if (closeIdx === -1) { parts.push(<span key={key++}>{remaining}</span>); break; }
      if (boldIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, boldIdx)}</span>);
      parts.push(<strong key={key++}>{remaining.slice(boldIdx + 2, closeIdx)}</strong>);
      remaining = remaining.slice(closeIdx + 2);
    } else {
      const closeLabel = remaining.indexOf("]", linkIdx);
      const openParen = closeLabel !== -1 ? remaining.indexOf("(", closeLabel) : -1;
      const closeParen = openParen !== -1 ? remaining.indexOf(")", openParen) : -1;
      if (closeLabel === -1 || openParen !== closeLabel + 1 || closeParen === -1) {
        parts.push(<span key={key++}>{remaining}</span>); break;
      }
      if (linkIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, linkIdx)}</span>);
      const label = remaining.slice(linkIdx + 1, closeLabel);
      const href = remaining.slice(openParen + 1, closeParen);
      const isExternal = href.startsWith("http");
      parts.push(
        <a key={key++} href={href} className="underline text-[#c07a00] hover:text-[#ffa900]"
          target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
          {label}
        </a>
      );
      remaining = remaining.slice(closeParen + 1);
    }
  }
  return parts;
}

function renderText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {renderLine(line)}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

type Message = {
  id: string;
  role: "user" | "barti";
  text: string;
  ts: number;
  streaming?: boolean;
};

type HistoryEntry = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_REPLIES = [
  "Fahrzeuge ansehen",
  "Probefahrt buchen",
  "Finanzierung anfragen",
  "Öffnungszeiten",
];

const GREETING: Message = {
  id: "greeting",
  role: "barti",
  text: "Hallo! Ich bin Barti 🐻 – dein persönlicher Assistent bei Bartels Automobile. Wie kann ich dir helfen?",
  ts: Date.now(),
};

function randomId() {
  return Math.random().toString(36).slice(2);
}

export function BartiChat() {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(randomId);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const historyRef = useRef<HistoryEntry[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hash-basiertes Öffnen (#barti = Chat öffnen, #barti-fullscreen = direkt fullscreen)
  const checkHash = useCallback(() => {
    const hash = window.location.hash;
    if (hash === "#barti" || hash === "#barti-fullscreen") {
      setOpen(true);
      if (hash === "#barti-fullscreen") setFullscreen(true);
    }
  }, []);

  useEffect(() => {
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [checkHash]);

  // Sprechblase nach 3 Sekunden
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open && !bubbleDismissed) setBubbleVisible(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [open, bubbleDismissed]);

  useEffect(() => {
    if (open) {
      setBubbleVisible(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Body-Scroll sperren im Fullscreen
  useEffect(() => {
    if (fullscreen && open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [fullscreen, open]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const trimmed = text.trim();
    const userMsg: Message = { id: randomId(), role: "user", text: trimmed, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const replyId = randomId();
    setMessages((m) => [...m, { id: replyId, role: "barti", text: "", ts: Date.now(), streaming: true }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
          history: historyRef.current,
        }),
      });

      if (!res.body) throw new Error("Kein Stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const payload = JSON.parse(line.slice(6)) as { type: string; text?: string; fullText?: string; message?: string };
            if (payload.type === "text" && payload.text) {
              fullText += payload.text;
              const snapshot = fullText;
              setMessages((m) => m.map((msg) => msg.id === replyId ? { ...msg, text: snapshot } : msg));
            } else if (payload.type === "done") {
              fullText = payload.fullText ?? fullText;
              setMessages((m) => m.map((msg) => msg.id === replyId ? { ...msg, text: fullText, streaming: false } : msg));
            } else if (payload.type === "error") {
              setMessages((m) => m.map((msg) => msg.id === replyId ? { ...msg, text: payload.message ?? "Fehler", streaming: false } : msg));
            }
          } catch {
            // skip malformed lines
          }
        }
      }

      historyRef.current = [
        ...historyRef.current,
        { role: "user", content: trimmed },
        { role: "assistant", content: fullText },
      ];
    } catch {
      setMessages((m) => m.map((msg) =>
        msg.id === replyId
          ? { ...msg, text: "Kurze Verbindungspause – versuch es gleich nochmal!", streaming: false }
          : msg
      ));
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function dismissBubble(e: React.MouseEvent) {
    e.stopPropagation();
    setBubbleVisible(false);
    setBubbleDismissed(true);
  }

  function toggleFullscreen() {
    setFullscreen((v) => !v);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function closeChat() {
    setOpen(false);
    setFullscreen(false);
    // Hash entfernen
    if (window.location.hash.startsWith("#barti")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  // ── Fullscreen Overlay ──────────────────────────────────────────────────────
  if (fullscreen && open) {
    return (
      <>
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-fade-in" />

        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <div
            className="flex flex-col w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#ffa900]/20"
            style={{ height: "min(85vh, 820px)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-[#1d1d1b] shrink-0">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#ffa900] shrink-0">
                <Image src="/brand/barti.jpeg" alt="Barti" fill className="object-cover object-center" sizes="44px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold leading-tight">Barti</p>
                <p className="text-[#ffa900] text-xs font-medium">Bartels Automobile · Online</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />

              {/* Fullscreen verlassen */}
              <button
                onClick={toggleFullscreen}
                title="Kleinere Ansicht"
                className="ml-2 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" />
                  <line x1="10" y1="14" x2="3" y2="21" /><line x1="21" y1="3" x2="14" y2="10" />
                </svg>
              </button>

              {/* Schließen */}
              <button
                onClick={closeChat}
                title="Schließen"
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-[#f9f6f1]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.role === "barti" && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#ffa900] shrink-0 mb-0.5">
                      <Image src="/brand/barti.jpeg" alt="Barti" fill className="object-cover object-center" sizes="32px" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#ffa900] text-[#1d1d1b] font-medium rounded-br-sm"
                        : "bg-white text-[#1d1d1b] rounded-bl-sm border border-gray-100"
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.text === "" && (
                <div className="flex items-end gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#ffa900] shrink-0">
                    <Image src="/brand/barti.jpeg" alt="Barti" fill className="object-cover object-center" sizes="32px" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-5 py-3 shadow-sm">
                    <div className="flex gap-1.5 items-center h-4">
                      <span className="w-2 h-2 rounded-full bg-[#ffa900] animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-[#ffa900] animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-[#ffa900] animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && !loading && (
              <div className="px-6 py-3 bg-[#f9f6f1] border-t border-gray-100 flex gap-2 flex-wrap shrink-0">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#ffa900] text-[#1d1d1b] hover:bg-[#ffa900] hover:text-white transition-colors duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-4 bg-white border-t border-gray-100 shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Nachricht schreiben…"
                disabled={loading}
                className="flex-1 bg-[#f9f6f1] rounded-full px-5 py-3 text-sm text-[#1d1d1b] placeholder:text-gray-400 outline-none border border-transparent focus:border-[#ffa900]/50 transition-colors disabled:opacity-50"
              />
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                aria-label="Senden"
                className="w-11 h-11 rounded-full bg-[#ffa900] flex items-center justify-center shrink-0 hover:bg-[#e09800] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#ffa900]/30"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes bartiBounce {
            0%, 100% { transform: translateY(0) scale(1); }
            30%       { transform: translateY(-10px) scale(1.05); }
            60%       { transform: translateY(-4px) scale(1.02); }
          }
          .animate-barti-bounce { animation: bartiBounce 2.8s ease-in-out infinite; }
        `}</style>
      </>
    );
  }

  // ── Widget-Modus (normal, nicht fullscreen) ─────────────────────────────────
  return (
    <>
      {/* Sprechblase */}
      <div
        className={`fixed bottom-[108px] right-6 z-50 transition-all duration-500 ${
          bubbleVisible && !open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="relative bg-white rounded-2xl rounded-br-sm shadow-xl border border-[#ffa900]/30 px-4 py-3 max-w-[220px]">
          <button
            onClick={dismissBubble}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center hover:bg-gray-300 transition-colors"
            aria-label="Schließen"
          >
            ×
          </button>
          <p className="text-sm text-gray-700 leading-snug font-medium">
            Hallo! Ich bin Barti 👋<br />
            <span className="text-[#ffa900] font-semibold">Kann ich dir helfen?</span>
          </p>
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b border-[#ffa900]/30 rotate-45" />
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Barti Chat öffnen"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className={`relative w-[72px] h-[72px] ${!open ? "animate-barti-bounce" : ""}`}>
          {!open && <span className="absolute inset-0 rounded-full bg-[#ffa900]/30 animate-ping" />}
          <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-[#ffa900] shadow-2xl shadow-[#ffa900]/40 bg-white transition-transform duration-300 group-hover:scale-110">
            <Image src="/brand/barti.jpeg" alt="Barti" fill className="object-cover object-center" sizes="72px" priority />
          </div>
          {open && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#1d1d1b]/70 backdrop-blur-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          )}
        </div>
      </button>

      {/* Chat-Fenster */}
      <div
        className={`fixed bottom-[96px] right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] transition-all duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-[#ffa900]/20" style={{ height: "520px" }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#1d1d1b] shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#ffa900] shrink-0">
              <Image src="/brand/barti.jpeg" alt="Barti" fill className="object-cover object-center" sizes="40px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">Barti</p>
              <p className="text-[#ffa900] text-xs font-medium">Bartels Automobile · Online</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              title="Vollbild"
              className="ml-1 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f9f6f1]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "barti" && (
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-[#ffa900] shrink-0 mb-0.5">
                    <Image src="/brand/barti.jpeg" alt="Barti" fill className="object-cover object-center" sizes="28px" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#ffa900] text-[#1d1d1b] font-medium rounded-br-sm"
                      : "bg-white text-[#1d1d1b] rounded-bl-sm border border-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.text === "" && (
              <div className="flex items-end gap-2">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-[#ffa900] shrink-0">
                  <Image src="/brand/barti.jpeg" alt="Barti" fill className="object-cover object-center" sizes="28px" />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffa900] animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffa900] animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffa900] animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && !loading && (
            <div className="px-4 py-2 bg-[#f9f6f1] border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-[#ffa900] text-[#1d1d1b] hover:bg-[#ffa900] hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-gray-100 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Nachricht schreiben…"
              disabled={loading}
              className="flex-1 bg-[#f9f6f1] rounded-full px-4 py-2.5 text-sm text-[#1d1d1b] placeholder:text-gray-400 outline-none border border-transparent focus:border-[#ffa900]/50 transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              aria-label="Senden"
              className="w-9 h-9 rounded-full bg-[#ffa900] flex items-center justify-center shrink-0 hover:bg-[#e09800] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#ffa900]/30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bartiBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          30%       { transform: translateY(-10px) scale(1.05); }
          60%       { transform: translateY(-4px) scale(1.02); }
        }
        .animate-barti-bounce { animation: bartiBounce 2.8s ease-in-out infinite; }
      `}</style>
    </>
  );
}
