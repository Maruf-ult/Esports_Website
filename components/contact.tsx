"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <section id="contact" className="scroll-mt-24 px-6 md:px-12 py-24">
      <div className="font-mono text-xs text-arena-accent mb-4">
        GET IN TOUCH
      </div>
      <h2 className="font-display text-3xl md:text-5xl mb-10 max-w-lg leading-tight">
        LET&apos;S BUILD
        <br />
        SOMETHING <span className="text-arena-accent">LIVE.</span>
      </h2>

      {status === "sent" ? (
        <p className="font-mono text-sm text-arena-accent">
          MESSAGE SENT — WE&apos;LL BE IN TOUCH.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <Input
            name="name"
            placeholder="Name"
            required
            className="bg-arena-surface border-arena-border text-arena-fg placeholder:text-arena-muted"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="bg-arena-surface border-arena-border text-arena-fg placeholder:text-arena-muted"
          />
          <Textarea
            name="message"
            placeholder="Message"
            required
            rows={4}
            className="bg-arena-surface border-arena-border text-arena-fg placeholder:text-arena-muted"
          />
          <Button
            type="submit"
            disabled={status === "sending"}
            className="bg-arena-accent text-arena-bg hover:bg-arena-accent/90 font-mono text-xs disabled:opacity-50"
          >
            {status === "sending" ? "SENDING..." : "SEND"}
          </Button>
          {status === "error" && (
            <p className="font-mono text-xs text-red-400">
              SOMETHING WENT WRONG — TRY AGAIN.
            </p>
          )}
        </form>
      )}
    </section>
  );
}