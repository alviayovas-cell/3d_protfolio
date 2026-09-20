import { Check, Send } from "lucide-react";
import { useId, useRef, useState } from "react";
import { PROFILE } from "../../../data/profile";
import { cn } from "../../../lib/cn";
import { Button } from "../../ui/Button";

const PROJECT_TYPES = [
  "Full stack web app",
  "AI application",
  "Backend / API",
  "Developer tool",
  "Data / analytics",
  "Something else",
];

const BUDGETS = ["Not sure yet", "Under ₹10,000", "₹10,000 – ₹50,000", "₹50,000+", "Let's discuss"];

const TIMELINES = ["As soon as possible", "Within a month", "1–3 months", "Flexible"];

interface Fields {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  description: string;
  timeline: string;
  message: string;
}

const EMPTY: Fields = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  description: "",
  timeline: "",
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!values.email.trim()) errors.email = "Please add an email so I can reply.";
  // Deliberately loose: the only reliable test of an address is sending to it.
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "That doesn't look like an email address.";
  if (!values.projectType) errors.projectType = "Pick the closest match.";
  if (!values.description.trim()) errors.description = "A sentence or two is plenty.";
  else if (values.description.trim().length < 15)
    errors.description = "Could you add a little more detail?";
  return errors;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-mist-100 outline-none transition-colors placeholder:text-mist-600 focus:border-iris-400/60 focus:bg-white/[0.06]";

/**
 * Project inquiry form. There is no backend, so rather than fake a POST it validates
 * and hands off to the visitor's mail client with everything pre-filled — nothing is
 * transmitted anywhere by the page itself, which the form says plainly.
 */
export function InquiryForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formId = useId();
  const errorSummaryRef = useRef<HTMLParagraphElement>(null);

  const set = (key: keyof Fields) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      errorSummaryRef.current?.focus();
      return;
    }

    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Project type: ${values.projectType}`,
      values.budget && `Budget: ${values.budget}`,
      values.timeline && `Timeline: ${values.timeline}`,
      "",
      "Description:",
      values.description,
      values.message && `\nAnything else:\n${values.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    const href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      `Project inquiry — ${values.name}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
  };

  const fieldId = (key: string) => `${formId}-${key}`;
  const errorId = (key: string) => `${formId}-${key}-error`;

  const describedBy = (key: keyof Fields) => (errors[key] ? errorId(key) : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <p
        ref={errorSummaryRef}
        tabIndex={-1}
        role="alert"
        className={cn("text-sm text-rose-300", Object.keys(errors).length === 0 && "sr-only")}
      >
        {Object.keys(errors).length > 0
          ? "Some details are missing — see the fields marked below."
          : ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-mist-400">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={cn(fieldClass, errors.name && "border-rose-400/60")}
            placeholder="Your name"
          />
          {errors.name && (
            <p id={errorId("name")} className="mt-1.5 text-xs text-rose-300">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldId("email")} className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-mist-400">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={cn(fieldClass, errors.email && "border-rose-400/60")}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id={errorId("email")} className="mt-1.5 text-xs text-rose-300">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldId("projectType")} className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-mist-400">
            Project type <span aria-hidden="true">*</span>
          </label>
          <select
            id={fieldId("projectType")}
            name="projectType"
            required
            value={values.projectType}
            onChange={(e) => set("projectType")(e.target.value)}
            aria-invalid={!!errors.projectType}
            aria-describedby={describedBy("projectType")}
            className={cn(fieldClass, errors.projectType && "border-rose-400/60")}
          >
            <option value="">Choose one…</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-ink-800">
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p id={errorId("projectType")} className="mt-1.5 text-xs text-rose-300">
              {errors.projectType}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldId("budget")} className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-mist-400">
            Budget
          </label>
          <select
            id={fieldId("budget")}
            name="budget"
            value={values.budget}
            onChange={(e) => set("budget")(e.target.value)}
            className={fieldClass}
          >
            <option value="">Optional</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-ink-800">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("description")} className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-mist-400">
          What are you building? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={fieldId("description")}
          name="description"
          required
          rows={4}
          value={values.description}
          onChange={(e) => set("description")(e.target.value)}
          aria-invalid={!!errors.description}
          aria-describedby={describedBy("description")}
          className={cn(fieldClass, "resize-y", errors.description && "border-rose-400/60")}
          placeholder="A short description of the project and what you need built."
        />
        {errors.description && (
          <p id={errorId("description")} className="mt-1.5 text-xs text-rose-300">
            {errors.description}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("timeline")} className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-mist-400">
            Timeline
          </label>
          <select
            id={fieldId("timeline")}
            name="timeline"
            value={values.timeline}
            onChange={(e) => set("timeline")(e.target.value)}
            className={fieldClass}
          >
            <option value="">Optional</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t} className="bg-ink-800">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={fieldId("message")} className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-mist-400">
            Anything else
          </label>
          <input
            id={fieldId("message")}
            name="message"
            type="text"
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
            className={fieldClass}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" size="md" icon={<Send size={16} />}>
          Send inquiry
        </Button>
        <p className="text-xs leading-relaxed text-mist-600">
          Opens your email app with the details filled in — nothing is sent or stored by
          this page.
        </p>
      </div>

      {/* Politely announced, since the mail client opening in a new window is easy to miss. */}
      <p role="status" className={cn("flex items-center gap-2 text-sm text-iris-300", !sent && "sr-only")}>
        {sent && (
          <>
            <Check size={16} />
            Your email app should have opened with the details filled in.
          </>
        )}
      </p>
    </form>
  );
}
