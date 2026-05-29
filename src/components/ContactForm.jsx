import { memo, useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { SectionKicker } from './ui'
import { AwwwardsButton } from './ui/AwwwardsButton'
import { maxWidth, sectionShell } from '../lib/layout'
import FadeIn from './ui/FadeIn'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const EASE = [0.16, 1, 0.3, 1]

/* ── Validation ── */
function validateForm(data) {
  const errs = {}
  if (!data.Name.trim()) errs.Name = 'What should we call you?'
  if (!data.Email.trim()) errs.Email = 'We need your email to respond'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Email))
    errs.Email = "That doesn't look like a valid email"
  if (!data.Interest) errs.Interest = 'Pick one that fits best'
  return errs
}

/* ── Constants ── */
const FIELDS = [
  { label: 'Name', type: 'text', placeholder: 'Your name' },
  { label: 'Email', type: 'email', placeholder: 'your@email.com' },
]

const OPTIONS = ['Partnership', 'Venture enquiry', 'Collaboration', 'Social impact']

const INITIAL = { Name: '', Email: '', Interest: '', Message: '' }

/* ── Single form field ── */
function Field({ label, type, value, onChange, onBlur, placeholder, error, touched }) {
  const showError = error && touched

  return (
    <motion.div
      animate={showError ? { x: [0, -5, 5, -5, 5, -3, 3, 0] } : { x: 0 }}
      transition={showError ? { duration: 0.45, ease: EASE } : { duration: 0.2, ease: EASE }}
    >
      <label
        htmlFor={`contact-${label}`}
        className="block text-[11px] font-bold uppercase tracking-[0.18em] text-stone/55 mb-2"
      >
        {label}
      </label>
      <div
        className={`relative border-b transition-colors duration-300 ${
          showError ? 'border-red-500' : 'border-ink/12'
        }`}
      >
        <input
          id={`contact-${label}`}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="peer w-full bg-transparent pb-3 pt-1 text-base text-ink outline-none placeholder:text-stone/25"
        />
        <span
          className={`absolute left-0 bottom-0 h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full ${
            showError
              ? 'w-full bg-red-500'
              : 'w-0 bg-bronze'
          }`}
        />
      </div>

      <AnimatePresence mode="wait">
        {showError && (
          <motion.p
            key={`err-${label}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-1.5 text-xs leading-snug text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Custom select dropdown ── */
function CustomSelect({ value, options, onChange, error, touched }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const showError = error && touched

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <motion.div
      animate={showError ? { x: [0, -5, 5, -5, 5, -3, 3, 0] } : { x: 0 }}
      transition={showError ? { duration: 0.45, ease: EASE } : { duration: 0.2, ease: EASE }}
    >
      <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-stone/55 mb-2">
        Interest
      </label>
      <div
        ref={ref}
        className={`relative border-b transition-colors duration-300 ${
          showError ? 'border-red-500' : 'border-ink/12'
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className={`peer flex w-full items-center justify-between bg-transparent pb-3 pt-1 text-base outline-none transition-colors duration-300 ${
            value ? 'text-ink' : 'text-stone/25'
          }`}
        >
          <span>{value || 'Select one'}</span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            aria-hidden="true"
            className={`text-stone/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span
          className={`absolute left-0 bottom-0 h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full ${
            showError
              ? 'w-full bg-red-500'
              : 'w-0 bg-bronze'
          }`}
        />

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
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                      opt === value
                        ? 'text-bronze font-semibold'
                        : 'text-stone hover:text-ink hover:bg-ivory'
                    }`}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {showError && (
          <motion.p
            key="err-interest"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-1.5 text-xs leading-snug text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Main form component ── */
const ContactForm = memo(function ContactForm() {
  /* ── State ── */
  const [data, setData] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  /* ── Refs ── */
  const dataRef = useRef(data)
  dataRef.current = data
  const pageLoad = useRef(Date.now())
  const honeypotRef = useRef(null)

  /* ── Handlers ── */
  const update = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const copy = { ...prev }
      delete copy[field]
      return copy
    })
    setFormError('')
  }, [])

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setFormError('')

    const current = dataRef.current
    const errs = validateForm(current)
    const allTouched = { Name: true, Email: true, Interest: true, Message: true }

    setErrors(errs)
    setTouched((prev) => ({ ...prev, ...allTouched }))

    if (Object.keys(errs).length > 0) return

    setSubmitting(true)

    try {
      await axios.post(`${API}/contact`, {
        name: current.Name,
        email: current.Email,
        interest: current.Interest,
        message: current.Message,
        botcheck: honeypotRef.current?.value || '',
        _timestamp: btoa(String(pageLoad.current)),
      })

      setSubmitted(true)
      setErrors({})
      setTouched({})
    } catch (err) {
      if (err.response) {
        const status = err.response.status

        if (status === 422 && err.response.data?.errors) {
          const mapped = {}
          for (const msg of err.response.data.errors) {
            const lc = msg.toLowerCase()
            if (lc.includes('name')) mapped.Name = msg
            else if (lc.includes('email')) mapped.Email = msg
            else if (lc.includes('interest')) mapped.Interest = msg
            else if (lc.includes('message')) mapped.Message = msg
          }
          if (Object.keys(mapped).length > 0) {
            setErrors(mapped)
            setTouched((prev) => ({ ...prev, ...Object.fromEntries(Object.keys(mapped).map((k) => [k, true])) }))
          } else {
            setFormError(err.response.data.error || 'Validation failed. Please check your input.')
          }
        } else if (status === 429) {
          setFormError("You're moving too fast! Please wait a moment and try again.")
        } else if (status >= 500) {
          setFormError('Our server hit a snag. We\'ve been notified and are on it.')
        } else {
          setFormError(err.response.data?.error || 'Something went wrong. Please try again.')
        }
      } else if (err.code === 'ERR_NETWORK') {
        setFormError('Unable to reach the server. Check your connection and refresh.')
      } else if (err.code === 'ECONNABORTED') {
        setFormError('The request timed out. Please try again.')
      } else {
        setFormError('Something unexpected happened. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }, [])

  /* ── Success screen ── */
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
                    setFormError('')
                    setErrors({})
                    setTouched({})
                    pageLoad.current = Date.now()
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
          {/* ── Left column ── */}
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

          {/* ── Right column ── */}
          <FadeIn delay={0.15}>
            <form onSubmit={handleSubmit} noValidate className="space-y-7 sm:space-y-8">
              {/* Form-level error banner */}
              <AnimatePresence mode="wait">
                {formError && (
                  <motion.div
                    key="form-error"
                    initial={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex items-start gap-2.5 rounded-[10px] border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm leading-snug text-red-600"
                  >
                    <span className="mt-0.5 shrink-0 text-base">!</span>
                    <span>{formError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Honeypot — invisible to humans, bots love it */}
              <input
                ref={honeypotRef}
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
              />

              {/* Fields */}
              {FIELDS.map(({ label, type, placeholder }) => (
                <Field
                  key={label}
                  label={label}
                  type={type}
                  value={data[label]}
                  onChange={(e) => update(label, e.target.value)}
                  onBlur={() => handleBlur(label)}
                  placeholder={placeholder}
                  error={errors[label]}
                  touched={touched[label]}
                />
              ))}

              {/* Interest */}
              <CustomSelect
                value={data.Interest}
                options={OPTIONS}
                onChange={(val) => update('Interest', val)}
                error={errors.Interest}
                touched={touched.Interest}
              />

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-Message"
                  className="block text-[11px] font-bold uppercase tracking-[0.18em] text-stone/55 mb-2"
                >
                  Message
                </label>
                <div
                  className={`relative border-b transition-colors duration-300 ${
                    errors.Message && touched.Message ? 'border-red-500' : 'border-ink/12'
                  }`}
                >
                  <textarea
                    id="contact-Message"
                    value={data.Message}
                    onChange={(e) => update('Message', e.target.value)}
                    onBlur={() => handleBlur('Message')}
                    rows={4}
                    placeholder="Tell us about your vision..."
                    className="peer w-full resize-none bg-transparent pb-3 pt-1 text-base text-ink outline-none placeholder:text-stone/25"
                  />
                  <span
                    className={`absolute left-0 bottom-0 h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full ${
                      errors.Message && touched.Message
                        ? 'w-full bg-red-500'
                        : 'w-0 bg-bronze'
                    }`}
                />
                </div>
                <AnimatePresence mode="wait">
                  {errors.Message && touched.Message && (
                    <motion.p
                      key="err-message"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="mt-1.5 text-xs leading-snug text-red-600"
                    >
                      {errors.Message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <motion.div
                  whileHover={!submitting ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.97 } : {}}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`${submitting ? 'pointer-events-none opacity-60' : ''} inline-block`}
                >
                  <AwwwardsButton
                    type="submit"
                    variant="primary"
                    size="pill"
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Send Enquiry'}
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
