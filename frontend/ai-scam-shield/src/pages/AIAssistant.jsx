import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Sparkles } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import { cn } from "../lib/utils.js";

const SUGGESTED = [
  "How do I spot a phishing email?",
  "Someone called claiming to be my bank — what now?",
  "Is this link safe: bit.ly/claim-prize",
  "What makes a strong password?",
];

const KB = [
  {
    match: /phish/i,
    reply:
      "Phishing emails usually push urgency, ask you to click a link or 'verify' an account, and come from a sender address that almost—but not quite—matches a real company. Before clicking anything: hover the link to see the real destination, check the sender's full email address (not just the display name), and if it claims to be from a company you use, go to that company's site directly instead of clicking through.",
  },
  {
    match: /bank|call(ed)?|phone/i,
    reply:
      "Hang up and call your bank back using the number on your card or their official website — never a number given to you during the call. Real banks won't ask you to move money to a 'safe account,' read out a one-time passcode, or pay via gift cards. If they created urgency or fear, that's itself a strong signal it was a scam attempt.",
  },
  {
    match: /link|url|bit\.ly|http/i,
    reply:
      "Paste it into the URL Scanner and I'll break down the domain structure, TLD risk, and whether it impersonates a known brand. As a rule of thumb: shortened links hide their real destination, and any link paired with urgency ('claim now', 'expires today') deserves extra scrutiny before you click.",
  },
  {
    match: /password/i,
    reply:
      "Aim for length over complexity — a random 4-5 word passphrase beats 'P@ssw0rd1'. Use a unique password per account (a password manager makes this painless), and turn on two-factor authentication anywhere it's offered. That second factor is what stops a leaked password from actually being used against you.",
  },
  {
    match: /qr/i,
    reply:
      "Treat QR codes like unlabeled links — you can't see where they go until you scan them. Be especially cautious of QR codes on parking meters, flyers, or stickers placed over a legitimate one. Use the QR Scanner here to check the decoded destination before opening it on your main device.",
  },
];

function reply(userText) {
  const hit = KB.find((k) => k.match.test(userText));
  if (hit) return hit.reply;
  return "I don't have a specific pattern match for that, but the general rule holds: slow down, verify through a channel you already trust (not one given to you in the suspicious message), and never act under pressure created by the message itself. Want to run it through one of the scanners for a structural check?";
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl bg-white/[0.05] px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-muted"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function StreamingText({ text }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 12);
    return () => clearInterval(id);
  }, [text]);

  return <p className="font-body text-sm leading-relaxed text-ink-primary">{shown}</p>;
}

function Bubble({ role, content, streaming }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-white/10 text-ink-muted" : "bg-gradient-to-br from-cyan-glow to-violet-glow text-void"
        )}
      >
        {isUser ? <User size={15} /> : <Bot size={15} />}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser ? "bg-white/[0.06] text-ink-primary" : "border border-white/10 bg-white/[0.03]"
        )}
      >
        {streaming ? <StreamingText text={content} /> : (
          <p className="font-body text-sm leading-relaxed text-ink-primary">{content}</p>
        )}
      </div>
    </motion.div>
  );
}

function AssistantContent() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm your AI Cyber Assistant. Ask me about a suspicious message, call, link, or general security question — I'll help you think it through.",
      streaming: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function send(text) {
    const value = (text ?? input).trim();
    if (!value || thinking) return;
    setMessages((prev) => [...prev, { role: "user", content: value, streaming: false }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      setMessages((prev) => [...prev, { role: "assistant", content: reply(value), streaming: true }]);
    }, 900);
  }

  return (
    <div className="flex h-[calc(100vh-160px)] flex-col rounded-2xl border border-white/10 bg-white/[0.03]">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <Bubble key={i} role={m.role} content={m.content} streaming={m.streaming} />
          ))}
          {thinking && (
            <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-glow to-violet-glow text-void">
                <Bot size={15} />
              </div>
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 px-6 pb-3">
          {SUGGESTED.map((s, i) => (
            <motion.button
              key={s}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => send(s)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-body text-xs text-ink-muted transition-colors hover:border-cyan-glow/40 hover:text-ink-primary"
            >
              <Sparkles size={11} className="text-cyan-glow" />
              {s}
            </motion.button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 border-t border-white/5 p-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about a message, call, or link…"
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 font-body text-sm text-ink-primary placeholder:text-ink-faint focus:border-cyan-glow/50 focus:outline-none"
        />
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => send()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-glow to-blue-neon text-void shadow-glow-blue"
        >
          <Send size={16} />
        </motion.button>
      </div>
    </div>
  );
}

export default function AIAssistant() {
  return (
    <DashboardLayout title="AI Cyber Assistant" subtitle="Talk through anything that feels off — I'll help you check it.">
      <AssistantContent />
    </DashboardLayout>
  );
}
