'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { LeadFormPayload } from '@/lib/types';

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().max(2000).optional(),
  interest: z.enum(['buy', 'rent', 'invest', 'general']).default('general'),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  source?: string;
  property?: string;
  project?: string;
  variant?: 'light' | 'dark';
  title?: string;
  description?: string;
};

export default function LeadForm({
  source = 'website',
  property,
  project,
  variant = 'light',
  title = 'Speak with a senior advisor',
  description = 'Tell us what you’re looking for. We’ll be in touch within one business day.',
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { interest: 'general' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || 'Please check the form.');
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;
    const payload: LeadFormPayload = {
      ...parsed.data,
      source,
      property,
      project,
    };

    if (!endpoint) {
      // Static phase: no backend wired yet. Optimistically show success
      // so the form is testable; nothing leaves the browser.
      // eslint-disable-next-line no-console
      console.info('[LeadForm] no NEXT_PUBLIC_LEADS_ENDPOINT — payload:', payload);
      setSubmitted(true);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setSubmitted(true);
    } catch (e) {
      setError((e as Error).message || 'Could not submit. Please try again.');
    }
  });

  const dark = variant === 'dark';
  const inputClass = dark ? 'input-dark' : 'input';

  if (submitted) {
    return (
      <div
        className={`p-8 ${dark ? 'border border-white/10 bg-white/5 text-cream' : 'border border-ink-100 bg-white'}`}
      >
        <p className="eyebrow text-gold-500">Thank you</p>
        <h3 className="mt-2 font-display text-2xl font-bold">We’ve received your enquiry.</h3>
        <p className={`mt-4 text-sm ${dark ? 'text-cream/75' : 'text-ink-500'}`}>
          A member of our team will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`p-8 ${dark ? 'border border-white/10 bg-white/5 text-cream' : 'border border-ink-100 bg-white'}`}
      noValidate
    >
      <p className="eyebrow text-gold-500">Get in touch</p>
      <h3
        className={`mt-2 font-display text-2xl font-bold ${dark ? 'text-cream' : 'text-ink-900'}`}
      >
        {title}
      </h3>
      {description && (
        <p className={`mt-2 text-sm ${dark ? 'text-cream/70' : 'text-ink-500'}`}>{description}</p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="label">Full name</label>
          <input className={inputClass} {...register('name', { required: true })} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className={inputClass}
            {...register('email', { required: true })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">Phone</label>
          <input className={inputClass} {...register('phone')} />
        </div>
        <div>
          <label className="label">Interest</label>
          <select className={inputClass} {...register('interest')}>
            <option value="buy">Buying</option>
            <option value="rent">Renting</option>
            <option value="invest">Investing</option>
            <option value="general">General enquiry</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="label">Message</label>
          <textarea rows={4} className={inputClass} {...register('message')} />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary mt-6 w-full md:w-auto">
        {isSubmitting ? 'Sending…' : 'Submit Enquiry'}
      </button>
    </form>
  );
}
