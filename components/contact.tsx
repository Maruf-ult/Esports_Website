"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, RevealContainer, RevealText } from "@/components/reveal";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 px-6 md:px-12 py-16 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="font-mono text-[10px] text-arena-muted tracking-[0.24em] mb-3">
            START A CONVERSATION
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex items-center justify-center gap-2.5">
            <span className="text-arena-fg relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-arena-accent">
              <RevealText text="GET IN" as="span" />
            </span>
            <RevealText text="TOUCH" as="span" className="text-arena-accent" />
          </h2>
        </div>

        <Reveal type="scale-in">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-arena-border border border-arena-border">
            <div className="md:col-span-5 bg-arena-bg p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-arena-accent origin-top-left scale-100 md:scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
              <div className="relative z-10">
                <div className="space-y-3">
                  <div className="mb-4 flex items-center">
                    <div className="logo-mask bg-purple-900 hover:bg-purple-700 transition-colors duration-300 h-13 w-20" aria-label="Logo" />
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-arena-bg md:text-arena-fg leading-[1.05] tracking-tight group-hover:text-arena-bg transition-colors duration-300">
                    LET&apos;S BUILD<br />
                    <span className="text-arena-bg md:text-arena-accent group-hover:text-arena-bg transition-colors duration-300">SOMETHING</span><br />
                    <span className="text-arena-bg md:text-arena-accent group-hover:text-arena-bg transition-colors duration-300">LIVE.</span>
                  </h2>
                  <p className="mt-5 text-sm text-arena-bg/70 md:text-arena-muted leading-relaxed max-w-xs group-hover:text-arena-bg/70 transition-colors duration-300">
                    Bring us your next event, campaign, broadcast, or bold idea.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-arena-surface p-8 md:p-10">
              {status === "sent" ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-arena-accent mb-2 animate-bounce" />
                  <h3 className="font-display text-lg text-arena-fg mb-1">MESSAGE SENT</h3>
                  <p className="font-mono text-xs text-arena-muted">
                    WE&apos;LL BE IN TOUCH WITH YOU SHORTLY.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <RevealContainer staggerDelay={0.08} className="space-y-4">
                    <Reveal type="fade-up">
                      <div>
                        <label className="block font-mono text-xs text-arena-muted uppercase tracking-wider mb-1.5">
                          Name
                        </label>
                        <Input
                          name="name"
                          placeholder="Your Name"
                          required
                          className="bg-arena-bg border-arena-border text-arena-fg placeholder:text-arena-muted/50 focus:border-arena-accent rounded-sm h-11 text-xs px-4"
                        />
                      </div>
                    </Reveal>

                    <Reveal type="fade-up">
                      <div>
                        <label className="block font-mono text-xs text-arena-muted uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          required
                          className="bg-arena-bg border-arena-border text-arena-fg placeholder:text-arena-muted/50 focus:border-arena-accent rounded-sm h-11 text-xs px-4"
                        />
                      </div>
                    </Reveal>

                    <Reveal type="fade-up">
                      <div>
                        <label className="block font-mono text-xs text-arena-muted uppercase tracking-wider mb-1.5">
                          Message
                        </label>
                        <Textarea
                          name="message"
                          placeholder="Enter your message"
                          required
                          rows={4}
                          className="bg-arena-bg border-arena-border text-arena-fg placeholder:text-arena-muted/50 focus:border-arena-accent rounded-sm text-xs p-3.5 resize-none"
                        />
                      </div>
                    </Reveal>

                    {/* Bottom Right Send Button matching screenshot position */}
                    <Reveal type="fade-up" className="flex items-center justify-between pt-1">
                      {status === "error" ? (
                        <div className="flex items-center gap-1.5 font-mono text-xs text-red-400">
                          <AlertCircle className="w-4 h-4" />
                          <span>SOMETHING WENT WRONG.</span>
                        </div>
                      ) : <div />}

                      <Button
                        type="submit"
                        disabled={status === "sending"}
                        className="group bg-arena-accent text-arena-bg hover:bg-white font-mono font-bold text-xs tracking-wider uppercase h-10 px-6 rounded-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
                      >
                        <span>{status === "sending" ? "SENDING..." : "SEND"}</span>
                        <motion.span
                          className="inline-block"
                          whileHover={{ x: 5, y: -5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 350, damping: 10 }}
                        >
                          <Send className="w-3.5 h-3.5 transition-transform duration-300" />
                        </motion.span>
                      </Button>
                    </Reveal>
                  </RevealContainer>
                </form>
              )}
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
