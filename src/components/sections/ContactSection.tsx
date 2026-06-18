'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { HiBadge } from '@/components/HiBadge'

export function ContactSection() {
  const t = useTranslations('contact')
  const tc = useTranslations('common')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: false }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, boolean> = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = true
    if (!formData.service) newErrors.service = true
    if (!formData.message.trim()) newErrors.message = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  const inputStyle = (field: string) => ({
    backgroundColor: 'var(--color-neutral-900)',
    color: 'var(--color-text-primary)',
    outline: errors[field] ? '2px solid var(--color-danger-500)' : 'none',
  })

  const labelStyle = {
    color: 'var(--color-primary)',
  }

  return (
    <section id="contact" className="px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left — Image + Badge */}
        <div className="relative mx-auto w-full max-w-md overflow-visible">
          <div
            className="overflow-hidden rounded-3xl"
            style={{
              height: 600,
              backgroundColor: 'var(--color-neutral-800)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-photo.jpg"
              alt="Gabriel Feliciano"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Badge */}
          <div className="absolute -bottom-10 -left-10 z-10">
            <HiBadge text={tc('hi')} size={120} />
          </div>
        </div>

        {/* Right — Form */}
        <div>
          <h2
            className="font-heading mb-4 text-3xl font-bold uppercase md:text-4xl"
            style={{
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h2>
          <p
            className="mb-8 text-base"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('subtitle')}
          </p>

          {submitted ? (
            <div
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: 'var(--color-neutral-900)' }}
            >
              <p
                className="font-heading text-xl font-bold"
                style={{ color: 'var(--color-primary)' }}
              >
                {t('success')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                    style={labelStyle}
                  >
                    {t('label_name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl p-4 text-base placeholder:opacity-40 focus:outline-2"
                    style={{
                      ...inputStyle('name'),
                      '--tw-ring-color': 'var(--color-primary)',
                    } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                    style={labelStyle}
                  >
                    {t('label_email')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johnsmith@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl p-4 text-base placeholder:opacity-40 focus:outline-2"
                    style={{
                      ...inputStyle('email'),
                      '--tw-ring-color': 'var(--color-primary)',
                    } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-medium"
                  style={labelStyle}
                >
                  {t('label_service')}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-2xl p-4 text-base focus:outline-2"
                  style={{
                    ...inputStyle('service'),
                    '--tw-ring-color': 'var(--color-primary)',
                  } as React.CSSProperties}
                >
                  <option value="" disabled>
                    {t('select_placeholder')}
                  </option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="graphic">Graphic Design</option>
                  <option value="web">Web Design</option>
                  <option value="branding">Branding</option>
                  <option value="other">{t('option_other')}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                  style={labelStyle}
                >
                  {t('label_message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={t('message_placeholder')}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-2xl p-4 text-base placeholder:opacity-40 focus:outline-2"
                  style={{
                    ...inputStyle('message'),
                    '--tw-ring-color': 'var(--color-primary)',
                  } as React.CSSProperties}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-fill-hover w-fit cursor-pointer rounded-full font-bold"
                style={{
                  border: '2px solid var(--color-primary)',
                  padding: 'var(--space-4) var(--space-8)',
                  color: 'var(--color-primary)',
                }}
              >
                <span
                  className="font-heading text-sm font-bold uppercase"
                  style={{ color: 'inherit' }}
                >
                  {t('submit')}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
