import { memo, useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionKicker } from './ui'
import { AwwwardsButton } from './ui/AwwwardsButton'
import { maxWidth, sectionShell } from '../lib/layout'
import FadeIn from './ui/FadeIn'

const FIELDS = [
  { label: 'Name', type: 'text', placeholder: 'Your name' },
  { label: 'Email', type: 'email', placeholder: 'your@email.com' },
]

const OPTIONS = ['Partnership', 'Venture enquiry', 'Collaboration', 'Social impact']

const INITIAL = { Name: '', Email: '', Interest: '', Message: '' }

/* ── Form field with bottom-border and left-to-right animated underline ── */
function Field({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label
        htmlFor={`contact-${label}`}
        className="block text-[11px] font-bold uppercase tracking-[0.18em] text-stone/55 mb-2"
      >
        {label}
      </label>
      <div className="relative border-b border-ink/12">
        <input
          id={`contact-${label}`}
          type={type}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className="peer w-full bg-transparent pb-3 pt-1 text-base text-ink outline-none placeholder:text-stone/25"
        />
        <span className="absolute left-0 bottom-0 h-px w-0 bg-bronze transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full" />
      </div>
    </div>
  )
}

/* ── Custom themed dropdown ── */
function CustomSelect({ value, options, onChange, label }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on click outside
  useEffect(() => {
    if (!open) return
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  const selected = options.find((o) => o === value)

  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-stone/55 mb-2">
        Interest
      </label>
      <div ref={ref} className="relative border-b border-ink/12">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className={`peer flex w-full items-center justify-between bg-transparent pb-3 pt-1 text-base outline-none transition-colors duration-300 ${value ? 'text-ink' : 'text-stone/25'}`}
        >
          <span>{selected || 'Select one'}</span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            aria-hidden="true"
            className={`text-stone/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="absolute left-0 bottom-0 h-px w-0 bg-bronze transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full" />

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-[10px] border border-ink/8 bg-paper py-1 shadow-[0_12px_40px_-8px_rgba(17,16,14,0.18)]"
            >
              {options.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt)
                      setOpen(false)
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 ${opt === value ? 'text-bronze font-semibold' : 'text-stone hover:text-ink hover:bg-ivory'}`}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Main Contact Form ── */
const ContactForm = memo(function ContactForm() {
  const [data, setData] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const update = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (data.Name && data.Email && data.Message) {
      setSubmitted(true)
    }
  }, [data])

  /* ── Success state ── */
  if (submitted) {
    return (
      <section id="contact" className={`${sectionShell} bg-paper`}>
        <div className={maxWidth}>
          <FadeIn>
            <div className="mx-auto max-w-xl text-center">
              <SectionKicker>Thank You</SectionKicker>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.92] tracking-tight text-ink mt-2">
                Message sent.
                <br />
                <span className="text-bronze">We&rsquo;ll be in touch.</span>
              </h2>
              <p className="mt-6 text-base leading-[1.7] text-stone sm:text-lg">
                We review every enquiry personally and will respond within 48 hours.
              </p>
              <div className="mt-10">
                <AwwwardsButton
                  type="button"
                  variant="primary"
                  size="pill"
                  onClick={() => {
                    setData(INITIAL)
                    setSubmitted(false)
                  }}
                >
                  Send Another
                </AwwwardsButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className={`${sectionShell} bg-paper`}>
      <div className={maxWidth}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 xl:gap-24">
          {/* Left: heading + intro */}
          <FadeIn>
            <SectionKicker>Get in Touch</SectionKicker>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[0.92] tracking-tight text-ink">
              Let&rsquo;s shape
              <br />
              <span className="text-bronze">what comes next.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.7] text-stone sm:text-lg">
              For partnerships, ventures, collaborations, and strategic enquiries — connect with
              Rudhram.
            </p>
          </FadeIn>

          {/* Right: form */}
          <FadeIn delay={0.15}>
            <form onSubmit={handleSubmit} noValidate className="space-y-7 sm:space-y-8">
              {FIELDS.map(({ label, type, placeholder }) => (
                <Field
                  key={label}
                  label={label}
                  type={type}
                  value={data[label]}
                  onChange={(e) => update(label, e.target.value)}
                  placeholder={placeholder}
                />
              ))}

              <CustomSelect
                value={data.Interest}
                options={OPTIONS}
                onChange={(v) => update('Interest', v)}
              />

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-Message"
                  className="block text-[11px] font-bold uppercase tracking-[0.18em] text-stone/55 mb-2"
                >
                  Message
                </label>
                <div className="relative border-b border-ink/12">
                  <textarea
                    id="contact-Message"
                    value={data.Message}
                    onChange={(e) => update('Message', e.target.value)}
                    rows={4}
                    required
                    placeholder="Tell us about your vision..."
                    className="peer w-full resize-none bg-transparent pb-3 pt-1 text-base text-ink outline-none placeholder:text-stone/25"
                  />
                  <span className="absolute left-0 bottom-0 h-px w-0 bg-bronze transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full" />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AwwwardsButton type="submit" variant="primary" size="pill">
                    Send Enquiry
                  </AwwwardsButton>
                </motion.div>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
})

export default ContactForm
