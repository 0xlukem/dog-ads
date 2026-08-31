import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, ArrowUpRight, CaretRight, Check, CircleNotch, Eye,
  Heart, LockKey, MapPin, PawPrint, Plus,
  ShieldCheck, Sparkle, UploadSimple,
} from '@phosphor-icons/react'
import './styles.css'
import { LanguageProvider, useLanguage } from './i18n.jsx'

const sizes = [
  { id: 'xs', label: 'XS', dimensions: '1,4 × 1 cm', area: '1,4 cm²', price: 4500 },
  { id: 's', label: 'S', dimensions: '2,2 × 2,2 cm', area: '4,8 cm²', price: 10000 },
  { id: 'm', label: 'M', dimensions: '3,8 × 3 cm', area: '11,4 cm²', price: 25000 },
  { id: 'l', label: 'L', dimensions: '5,2 × 3,8 cm', area: '19,8 cm²', price: 50000 },
  { id: 'xl', label: 'XL', dimensions: '6,8 × 4,5 cm', area: '30,6 cm²', price: 90000 },
  { id: 'xxxl', label: 'XXXL', dimensions: '9 × 6 cm', area: '54 cm²', price: 150000 },
]

const zones = [
  { id: 'cone-front', group: 'cone', multiplier: 1 },
  { id: 'cone-right', group: 'cone', multiplier: 0.86 },
  { id: 'cone-back', group: 'cone', multiplier: 0.72 },
  { id: 'cone-left', group: 'cone', multiplier: 0.86 },
  { id: 'harness-front', group: 'harness', multiplier: 1.05 },
  { id: 'harness-right', group: 'harness', multiplier: 0.72 },
  { id: 'harness-back', group: 'harness', multiplier: 0.72 },
  { id: 'harness-left', group: 'harness', multiplier: 0.72 },
]

const spotGroups = [{ id: 'cone' }, { id: 'harness' }]
const demoSponsors = [
  { rank: '01', name: 'Croquetas Cósmicas', tagKey: 'croquetas', amount: '$ 25.000', color: '#d5673f', initials: 'CC', views: '1.248' },
  { rank: '02', name: 'Paseo Lunar', tagKey: 'paseo', amount: '$ 13.500', color: '#3b4b45', initials: 'PL', views: '842' },
]
const turnaroundViews = [
  { id: 'cone-front', group: 'cone', src: '/assets/chon-placement-v2/cone-front.png', width: 1024, height: 1536, anchor: { left: 32, top: 39, width: 28, rotate: -5 } },
  { id: 'cone-right', group: 'cone', src: '/assets/chon-placement-v2/cone-right.png', width: 1024, height: 1536, anchor: { left: 79, top: 30, width: 24, rotate: 10 } },
  { id: 'cone-back', group: 'cone', src: '/assets/chon-placement-v2/cone-back.png', width: 1024, height: 1536, anchor: { left: 76, top: 20, width: 25, rotate: 7 } },
  { id: 'cone-left', group: 'cone', src: '/assets/chon-placement-v2/cone-left.png', width: 1024, height: 1536, anchor: { left: 21, top: 30, width: 24, rotate: -10 } },
  { id: 'harness-front', group: 'harness', src: '/assets/chon-placement-v2/harness-front.png', width: 1024, height: 1536, anchor: { left: 50, top: 58, width: 24, rotate: 0 } },
  { id: 'harness-right', group: 'harness', src: '/assets/chon-placement-v2/harness-right.png', width: 1536, height: 1024, anchor: { left: 61, top: 32, width: 20, rotate: 0 } },
  { id: 'harness-back', group: 'harness', src: '/assets/chon-placement-v2/harness-back.png', width: 1024, height: 1536, anchor: { left: 54, top: 40, width: 24, rotate: 0 } },
  { id: 'harness-left', group: 'harness', src: '/assets/chon-placement-v2/harness-left.png', width: 1536, height: 1024, anchor: { left: 39, top: 32, width: 20, rotate: 0 } },
]
const stickerFonts = { space: "'Space Grotesk', sans-serif", archivo: "'Arial Black', Arial, sans-serif", mono: "'DM Mono', monospace" }
const money = (value) => `$ ${new Intl.NumberFormat('es-AR').format(Math.round(value))}`

function BrandMark({ animated = false }) {
  const { t } = useLanguage()
  return <div className="brand-mark" aria-label={t('brand.ariaLabel')}><img className="brand-mark__icon" src="/favicon-dog.svg" alt="" /><span className={animated ? 'brand-mark__word brand-mark__word--animated' : 'brand-mark__word'} aria-hidden="true">{'CHON'.split('').map((letter, index) => <span key={`${letter}-${index}`} style={{ '--letter-index': index }}>{letter}</span>)}</span></div>
}

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()
  return <div className="language-toggle" role="group" aria-label={t('language.group')}>
    {['es', 'en'].map((code) => <button key={code} type="button" aria-pressed={language === code} aria-label={language === code ? t('language.current') : t('language.switchTo', { language: code === 'es' ? t('language.spanish') : t('language.english') })} className={language === code ? 'language-toggle__option language-toggle__option--active' : 'language-toggle__option'} onClick={() => setLanguage(code)}>{code.toUpperCase()}</button>)}
  </div>
}

function HeroVideo() {
  const { t } = useLanguage()
  const videoRef = useRef(null)
  const [paused] = useState(prefersReducedMotion)
  useEffect(() => { if (paused) videoRef.current?.pause() }, [paused])
  return <div className="hero-video"><video ref={videoRef} autoPlay={!paused} muted loop playsInline preload="metadata" poster="/assets/chon-hero-poster.png" aria-label={t('hero.videoAlt')}><source src="/assets/chon-hero.mp4" type="video/mp4" /></video><div className="hero-video__veil" /><div className="hero-video__copy"><strong>{t('hero.videoBadge')}</strong><span>{t('hero.videoCaption')}</span></div></div>
}

function Ticker() {
  const { t } = useLanguage()
  const items = t('ticker')
  const group = (prefix, hidden = false) => <div className="ticker-group" aria-hidden={hidden || undefined}>{items.map((item) => <span key={`${prefix}-${item}`}>{item}</span>)}</div>
  return <div className="ticker"><div className="ticker-track">{group('primary')}{group('copy', true)}</div></div>
}

function TurntableSticker({ anchor, label, mode = 'text', imageSrc = '', active = false, scale = 1, fontFamily = stickerFonts.space }) {
  const { t } = useLanguage()
  if (!anchor) return null
  const content = mode === 'social' ? `@${label.replace(/^@/, '')}` : label
  return <div className={`turntable-sticker ${active ? 'turntable-sticker--active' : ''}`} style={{ left: `${anchor.left}%`, top: `${anchor.top}%`, width: `${anchor.width}%`, fontFamily, transform: `translate(-50%, -50%) rotate(${anchor.rotate}deg) scale(${scale})` }} aria-label={t('turntable.stickerPreview', { content })}>
    {imageSrc ? <img src={imageSrc} alt={t('turntable.localFile')} /> : <span>{(content || t('purchase.brandPlaceholder')).slice(0, 18).toUpperCase()}</span>}
  </div>
}

function Turntable({ selectedSpot, onSpotSelect, compact = false, stickerText = 'TU MARCA', stickerMode = 'text', stickerSize = 'm', stickerImage = '', stickerFont = 'space' }) {
  const { t } = useLanguage()
  const initialViewIndex = Math.max(0, turnaroundViews.findIndex((item) => item.id === selectedSpot))
  const [viewIndex, setViewIndex] = useState(initialViewIndex)
  const view = turnaroundViews[viewIndex] || turnaroundViews[0]
  const requestedStickerScale = { xs: 0.58, s: 0.72, m: 1, l: 1.25, xl: 1.5, xxxl: 1.82 }[stickerSize] || 1
  const selectedAnchor = view.id === selectedSpot ? view.anchor : null
  const boundedStickerScale = selectedAnchor ? Math.min(requestedStickerScale, Math.max(0.82, Math.min((selectedAnchor.left * 2) / selectedAnchor.width, ((100 - selectedAnchor.left) * 2) / selectedAnchor.width, (selectedAnchor.top * 4) / selectedAnchor.width, ((100 - selectedAnchor.top) * 4) / selectedAnchor.width) * 0.9)) : requestedStickerScale
  useEffect(() => { const nextIndex = turnaroundViews.findIndex((item) => item.id === selectedSpot); if (nextIndex >= 0 && nextIndex !== viewIndex) setViewIndex(nextIndex) }, [selectedSpot, viewIndex])
  const selectView = (nextIndex) => { setViewIndex(nextIndex); onSpotSelect?.(turnaroundViews[nextIndex].id) }
  const viewLabel = t(`zones.${view.id}.spot`)
  return <div className={`chon-canvas ${compact ? 'chon-canvas--compact' : ''}`}><div className={`turntable-stage turntable-stage--${view.group} turntable-stage--${view.id}`}><div className="turntable" aria-label={t('turntable.viewOf', { label: viewLabel })}><div className={`turntable-art turntable-art--${view.id}`} key={view.id} style={{ aspectRatio: `${view.width} / ${view.height}`, '--art-ratio': view.width / view.height }}><img src={view.src} alt={t('turntable.viewOf', { label: viewLabel })} draggable="false" /><div className="turntable-hotspots" aria-label={t('turntable.availableZone')}><button type="button" className="turntable-hotspot turntable-hotspot--selected" aria-label={t('turntable.choose', { label: t(`zones.${view.id}.label`) })} style={{ left: `${view.anchor.left}%`, top: `${view.anchor.top}%`, width: `${Math.min(view.anchor.width * 0.48, 16)}%`, height: `${Math.max(view.anchor.width * 0.42, 9)}%`, transform: `translate(-50%, -50%) rotate(${view.anchor.rotate}deg)` }} onClick={() => onSpotSelect?.(view.id)} /></div><TurntableSticker anchor={view.id === selectedSpot ? view.anchor : null} label={stickerText || t('purchase.brandPlaceholder')} mode={stickerMode} imageSrc={stickerImage} active scale={boundedStickerScale} fontFamily={stickerFonts[stickerFont] || stickerFonts.space} /></div></div></div><div className="turntable-view-picker" role="tablist" aria-label={t('turntable.picker')}>{spotGroups.map((group) => <div className="turntable-view-group" key={group.id}><span className="turntable-view-group__label">{t(`groups.${group.id}`)}</span><div className="turntable-view-group__options">{turnaroundViews.filter((item) => item.group === group.id).map((item) => { const index = turnaroundViews.findIndex((viewItem) => viewItem.id === item.id); return <button type="button" role="tab" aria-selected={viewIndex === index} key={item.id} className={viewIndex === index ? 'turntable-view-button turntable-view-button--active' : 'turntable-view-button'} onClick={() => selectView(index)}><img className={`turntable-thumb--${item.id}`} src={item.src} alt="" /><span>{t(`zones.${item.id}.spot`).replace(`${group.id === 'cone' ? 'Cono' : 'Pechera'} · `, '').replace(`${group.id === 'cone' ? 'Cone' : 'Harness'} · `, '')}</span></button> })}</div></div>)}</div></div>
}

function ChonCanvas({ selectedSpot, onSpotSelect, compact = false, stickerText, stickerMode, stickerSize, stickerImage, stickerFont }) {
  return compact ? <Turntable selectedSpot={selectedSpot} onSpotSelect={onSpotSelect} compact stickerText={stickerText} stickerMode={stickerMode} stickerSize={stickerSize} stickerImage={stickerImage} stickerFont={stickerFont} /> : null
}

function Button({ children, onClick, variant = 'primary', type = 'button', className = '' }) { return <button type={type} className={`button button--${variant} ${className}`} onClick={onClick}>{children}</button> }

function SectionIntro({ title, body, align = 'left' }) { return <header className={`section-intro section-intro--${align}`}><h2>{title}</h2>{body && <p className="section-intro__body">{body}</p>}</header> }

function Ranking({ onChooseSpot }) {
  const { t } = useLanguage()
  return <section className="section section--ranking" id="ranking"><div className="section-shell"><div className="ranking-head"><SectionIntro eyebrow={t('ranking.eyebrow')} title={t('ranking.title')} body={t('ranking.body')} /><div className="ranking-live"><span className="live-dot" /> {t('ranking.occupancy')} <strong>25%</strong></div></div><div className="ranking-list">{demoSponsors.map((sponsor) => <article className="ranking-row" key={sponsor.rank}><span className="ranking-rank">{sponsor.rank}</span><span className="ranking-avatar" style={{ background: sponsor.color }}>{sponsor.initials}</span><div className="ranking-name"><strong>{sponsor.name}</strong><span>{t(`ranking.sponsors.${sponsor.tagKey}`)}</span></div><span className="ranking-views"><Eye size={15} /> {t('ranking.views', { count: sponsor.views })}</span><strong className="ranking-amount">{sponsor.amount}</strong><ArrowUpRight size={19} weight="bold" className="ranking-arrow" /></article>)}<article className="ranking-row ranking-row--empty"><span className="ranking-rank">03</span><span className="ranking-avatar ranking-avatar--empty"><Plus size={20} /></span><div className="ranking-name"><strong>{t('ranking.emptyTitle')}</strong><span>{t('ranking.emptyBody')}</span></div><span className="ranking-views">{t('ranking.available')}</span><Button variant="text" onClick={onChooseSpot}>{t('ranking.reserve')} <ArrowRight size={16} /></Button></article></div></div></section>
}

function HowItWorks() {
  const { t } = useLanguage()
  const icons = [Sparkle, MapPin, LockKey]
  return <section className="section section--how" id="como-funciona"><div className="section-shell"><SectionIntro eyebrow={t('how.eyebrow')} title={t('how.title')} body={t('how.body')} /><div className="how-grid">{t('how.steps').map((step, index) => { const Icon = icons[index]; return <article className="how-step" key={step.title}><div className="how-step__top"><span>0{index + 1}</span><Icon size={23} weight="duotone" /></div><h3>{step.title}</h3><p>{step.body}</p></article> })}</div></div></section>
}

function SizeSheet({ selectedSize, onSelectSize, selectedZone, onSelectZone }) {
  const { t } = useLanguage()
  const activeZone = zones.find((item) => item.id === selectedZone) || zones[0]
  return <section className="section section--sizes" id="tamanos"><div className="section-shell"><SectionIntro eyebrow={t('sizes.eyebrow')} title={t('sizes.title')} body={t('sizes.body')} /><div className="size-grid">{sizes.map((size, index) => <button type="button" aria-pressed={selectedSize === size.id} className={`size-card ${selectedSize === size.id ? 'size-card--active' : ''}`} key={size.id} onClick={() => onSelectSize(size.id)}><span className="size-card__index">0{index + 1}</span><strong>{size.label}</strong><div className="size-card__sample" style={{ '--sample-scale': `${0.24 + index * 0.12}` }} /><span className="size-card__dimensions">{size.dimensions}</span><span className="size-card__area">{size.area} · {t(`sizes.notes.${size.id}`)}</span><span className="size-card__price">{money(size.price)}</span></button>)}</div><p className="size-note"><ShieldCheck size={16} /> {t('sizes.note')}</p><div className="zone-picker" role="radiogroup" aria-label={t('turntable.picker')}><div className="zone-picker__intro"><span>{t('sizes.location')}</span><strong>{t(`zones.${activeZone.id}.label`)}</strong></div>{spotGroups.map((group) => <div className="zone-picker__group" key={group.id}><span className="zone-picker__group-label">{t(`groups.${group.id}`)}</span><div className="zone-picker__group-options">{zones.filter((item) => item.group === group.id).map((item) => <button type="button" role="radio" aria-checked={selectedZone === item.id} key={item.id} className={`zone-choice ${selectedZone === item.id ? 'zone-choice--active' : ''}`} onClick={() => onSelectZone(item.id)}><span>{t(`zones.${item.id}.label`)}</span><small>× {item.multiplier.toFixed(2).replace('.', ',')}</small></button>)}</div></div>)}</div></div></section>
}

function SocialLinks({ className = '' }) {
  const { t } = useLanguage()
  return <div className={`social-links ${className}`} aria-label={t('footer.social')}><a href="https://www.lucasmalizia.xyz" target="_blank" rel="noreferrer">{t('footer.website')}</a><a href="https://x.com/0xlukem" target="_blank" rel="noreferrer">X</a><a href="https://www.linkedin.com/in/lucasmalizia" target="_blank" rel="noreferrer">LinkedIn</a></div>
}

function PurchaseFlow({ selectedSpot, setSelectedSpot, selectedSize, setSelectedSize, selectedZone, setSelectedZone }) {
  const { language, t } = useLanguage()
  const [step, setStep] = useState(0)
  const [designMode, setDesignMode] = useState('text')
  const [brand, setBrand] = useState(() => t('purchase.brandPlaceholder'))
  const [brandEdited, setBrandEdited] = useState(false)
  const [stickerFont, setStickerFont] = useState('space')
  const [stickerImage, setStickerImage] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showTrendNotice, setShowTrendNotice] = useState(false)
  const closeRef = useRef(null)
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)
  const size = sizes.find((item) => item.id === selectedSize) || sizes[2]
  const zone = zones.find((item) => item.id === selectedZone) || zones[0]
  const total = Math.round(size.price * zone.multiplier)
  useEffect(() => { if (!brandEdited) setBrand(t('purchase.brandPlaceholder')) }, [language, brandEdited, t])
  useEffect(() => () => { if (stickerImage) URL.revokeObjectURL(stickerImage) }, [stickerImage])
  useEffect(() => { if (selectedSpot && selectedSpot !== selectedZone) setSelectedZone(selectedSpot) }, [selectedSpot, selectedZone, setSelectedZone])
  useEffect(() => { if (!showTrendNotice) return undefined; previousFocusRef.current = document.activeElement; const previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; const timer = window.setTimeout(() => closeRef.current?.focus(), 0); const onKey = (event) => { if (event.key === 'Escape') { closeTrendNotice(); return } if (event.key !== 'Tab') return; const focusable = [...(modalRef.current?.querySelectorAll('button, a[href]') || [])].filter((element) => !element.disabled); if (!focusable.length) return; const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() } }; document.addEventListener('keydown', onKey); return () => { window.clearTimeout(timer); document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow } }, [showTrendNotice])
  const closeTrendNotice = () => { setShowTrendNotice(false); window.setTimeout(() => previousFocusRef.current?.focus?.(), 0) }
  const next = () => { setError(''); if (step === 0) { if (designMode === 'upload' && !stickerImage) { setError('uploadRequired'); return } if (!brand.trim()) { setError('brandRequired'); return } } setStep((current) => Math.min(3, current + 1)) }
  const back = () => { setError(''); setStep((current) => Math.max(0, current - 1)) }
  const handleFile = (event) => { const file = event.target.files?.[0]; if (!file) return; if (file.size > 5 * 1024 * 1024) { setError('fileTooLarge'); return } if (!['image/png', 'image/svg+xml', 'image/jpeg', 'image/webp'].includes(file.type)) { setError('invalidFile'); return } setError(''); setStickerImage(URL.createObjectURL(file)); setBrand(file.name.replace(/\.[^/.]+$/, '').slice(0, 24)); setBrandEdited(true) }
  const handlePay = (event) => { event.preventDefault(); setError(''); setSubmitted(true); setShowTrendNotice(true) }
  return <section className="section section--buy" id="comprar"><div className="section-shell"><div className="buy-head"><SectionIntro eyebrow={t('purchase.eyebrow')} title={t('purchase.title')} body={t('purchase.body')} /><div className="buy-meta"><CircleNotch size={16} className="spin" /> {step + 1} / 4</div></div><div className="stepper" aria-label={t('purchase.steps').join(', ')}>{t('purchase.steps').map((label, index) => <button type="button" key={label} aria-current={step === index ? 'step' : undefined} disabled={index > step} className={step === index ? 'stepper__item stepper__item--active' : `stepper__item ${step > index ? 'stepper__item--done' : ''}`} onClick={() => setStep(index)}><span>{step > index ? <Check size={14} weight="bold" /> : index + 1}</span>{label}</button>)}</div><div className="buy-layout"><div className="buy-preview"><ChonCanvas selectedSpot={selectedZone} onSpotSelect={(spot) => { setSelectedZone(spot); setSelectedSpot(spot) }} compact stickerText={brand || t('purchase.brandPlaceholder')} stickerMode={designMode} stickerSize={selectedSize} stickerImage={stickerImage} stickerFont={stickerFont} /><div className="preview-label"><span>{t('purchase.previewLabel')}</span></div></div><div className="buy-panel">
    {step === 0 && <div className="flow-step"><div className="flow-step__heading"><span>01</span><div><h3>{t('purchase.stepOneTitle')}</h3><p>{t('purchase.stepOneBody')}</p></div></div><div className="mode-tabs"><button type="button" aria-pressed={designMode === 'text'} className={designMode === 'text' ? 'active' : ''} onClick={() => { setDesignMode('text'); setStickerImage('') }}>{t('purchase.textMode')}</button><button type="button" aria-pressed={designMode === 'social'} className={designMode === 'social' ? 'active' : ''} onClick={() => { setDesignMode('social'); setStickerImage('') }}>{t('purchase.socialMode')}</button><button type="button" aria-pressed={designMode === 'upload'} className={designMode === 'upload' ? 'active' : ''} onClick={() => setDesignMode('upload')}>{t('purchase.uploadMode')}</button></div>{designMode === 'upload' ? <label className="upload-box"><UploadSimple size={22} /><strong>{stickerImage ? t('purchase.uploadReady') : t('purchase.uploadPrompt')}</strong><small>{t('purchase.uploadNote')}</small><input type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp" onChange={handleFile} /></label> : <label className="field"><span>{designMode === 'social' ? t('purchase.socialLabel') : t('purchase.brandLabel')}</span><input value={brand} onChange={(event) => { setBrand(event.target.value); setBrandEdited(true) }} maxLength={24} placeholder={t('purchase.brandPlaceholder')} /></label>}<label className="field"><span>{t('purchase.fontLabel')}</span><select value={stickerFont} onChange={(event) => setStickerFont(event.target.value)}><option value="space">{t('purchase.fontOptions.space')}</option><option value="archivo">{t('purchase.fontOptions.archivo')}</option><option value="mono">{t('purchase.fontOptions.mono')}</option></select></label>{error && <p className="form-error" role="alert">{t(`errors.${error}`)}</p>}<Button onClick={next}>{t('purchase.approveDesign')} <ArrowRight size={18} /></Button></div>}
    {step === 1 && <div className="flow-step"><div className="flow-step__heading"><span>02</span><div><h3>{t('purchase.stepTwoTitle')}</h3><p>{t('purchase.stepTwoBody')}</p></div></div><div className="size-options">{sizes.map((item) => <button type="button" aria-pressed={selectedSize === item.id} key={item.id} className={selectedSize === item.id ? 'selected' : ''} onClick={() => setSelectedSize(item.id)}><span><strong>{item.label}</strong><small>{item.dimensions}</small></span><b>{money(item.price)}</b></button>)}</div><div className="flow-actions"><Button variant="secondary" onClick={back}>{t('purchase.back')}</Button><Button onClick={next}>{t('purchase.chooseLocation')} <ArrowRight size={18} /></Button></div></div>}
    {step === 2 && <div className="flow-step"><div className="flow-step__heading"><span>03</span><div><h3>{t('purchase.stepThreeTitle')}</h3><p>{t('purchase.stepThreeBody')}</p></div></div><div className="zone-options">{spotGroups.map((group) => <div className="zone-options__group" key={group.id}><span className="zone-options__label">{t(`groups.${group.id}`)}</span>{zones.filter((item) => item.group === group.id).map((item) => <button type="button" aria-pressed={selectedZone === item.id} key={item.id} className={selectedZone === item.id ? 'selected' : ''} onClick={() => { setSelectedZone(item.id); setSelectedSpot(item.id) }}><span><strong>{t(`zones.${item.id}.label`)}</strong><small>{t(`zones.${item.id}.detail`)}</small></span><b>× {item.multiplier.toFixed(2).replace('.', ',')}</b></button>)}</div>)}</div><div className="flow-actions"><Button variant="secondary" onClick={back}>{t('purchase.back')}</Button><Button onClick={next}>{t('purchase.reviewOrder')} <ArrowRight size={18} /></Button></div></div>}
    {step === 3 && submitted && <div className="flow-step success-state" role="status"><div className="success-state__icon"><Check size={24} weight="bold" /></div><h3>{t('purchase.successTitle')}</h3><p>{t('purchase.successBody')}</p><Button onClick={() => { setSubmitted(false); setStep(0) }}>{t('purchase.tryAgain')} <ArrowRight size={18} /></Button></div>}
    {step === 3 && !submitted && <form className="flow-step" onSubmit={handlePay}><div className="flow-step__heading"><span>04</span><div><h3>{t('purchase.stepFourTitle')}</h3><p>{t('purchase.stepFourBody')}</p></div></div><div className="order-summary"><div><span>{brand || t('purchase.brandPlaceholder')}</span><small>{size.label} · {t(`zones.${zone.id}.spot`)}</small></div><strong>{money(total)}</strong></div>{error && <p className="form-error" role="alert">{t(`errors.${error}`)}</p>}<div className="flow-actions"><Button variant="secondary" onClick={back}>{t('purchase.back')}</Button><Button type="submit">{t('purchase.pay')} <ArrowUpRight size={18} /></Button></div></form>}
  </div></div>{showTrendNotice && <div className="trend-notice" role="dialog" aria-modal="true" aria-labelledby="trend-notice-title" aria-describedby="trend-notice-description" onClick={(event) => { if (event.target === event.currentTarget) closeTrendNotice() }}><div ref={modalRef} className="trend-notice__card" onClick={(event) => event.stopPropagation()}><button ref={closeRef} type="button" className="trend-notice__close" aria-label={t('modal.close')} onClick={closeTrendNotice}>×</button><span className="trend-notice__eyebrow"><Sparkle size={15} /> {t('modal.eyebrow')}</span><h3 id="trend-notice-title">{t('modal.title')}</h3><p id="trend-notice-description">{t('modal.description')}</p><strong>{t('modal.follow')}</strong><SocialLinks className="trend-notice__links" /></div></div>}</div></section>
}

function ChonReal() {
  const { t } = useLanguage()
  return <section className="section section--real" id="chon-real"><div className="section-shell real-grid"><div className="real-photo"><img src="/assets/chon-real.png" loading="lazy" width="1316" height="1016" alt={t('real.imageAlt')} /><span className="photo-stamp">{t('real.stamp')}</span></div><div className="real-copy"><h2>{t('real.title')}</h2><p>{t('real.body')}</p><div className="real-facts"><span><PawPrint size={17} /> {t('real.facts')[0]}</span><span><Heart size={17} /> {t('real.facts')[1]}</span></div><a className="button button--secondary" href="/404.html">{t('real.cta')} <ArrowRight size={18} /></a></div></div></section>
}

function App() {
  const { language, t } = useLanguage()
  const [selectedSpot, setSelectedSpot] = useState('cone-front')
  const [selectedSize, setSelectedSize] = useState('m')
  const [selectedZone, setSelectedZone] = useState('cone-front')
  const descriptor = t('brand.descriptor').split('|')
  return <div className={`site-shell site-shell--${language}`}><div className="noise" aria-hidden="true" /><header className="site-header"><a href="#top" className="brand-link"><BrandMark animated /><span className="brand-link__descriptor">{descriptor[0]}<br />{descriptor[1]}</span></a><nav className="site-nav" aria-label={t('nav.main')}><button type="button" onClick={() => scrollToSection('tamanos')}>{t('nav.sizes')}</button><button type="button" onClick={() => scrollToSection('ranking')}>{t('nav.ranking')}</button><button type="button" onClick={() => scrollToSection('como-funciona')}>{t('nav.how')}</button></nav><div className="site-header__actions"><LanguageToggle /><Button onClick={() => scrollToSection('comprar')}>{t('nav.reserve')} <ArrowUpRight size={17} /></Button></div></header><main id="top"><section className="hero section"><div className="hero-shell section-shell"><div className="hero-copy"><h1>{t('hero.titleBefore')} <em className="hero-title__word" aria-hidden="true">{t('hero.titleEmphasis').split('').map((letter, index) => <span key={`${letter}-${index}`} style={{ '--letter-index': index, '--letter-wobble': `${index % 2 === 0 ? -14 : 12}deg` }}>{letter}</span>)}</em><span className="sr-only">{t('hero.titleEmphasis')}</span> {t('hero.titleAfter')}</h1><p className="hero-lede">{t('hero.lede')}</p><div className="hero-actions"><Button onClick={() => scrollToSection('comprar')}>{t('hero.reserve')} <ArrowRight size={18} /></Button><button type="button" className="text-link" onClick={() => scrollToSection('tamanos')}>{t('hero.seeSizes')} <CaretRight size={16} /></button></div><div className="hero-stats"><div><span>{t('hero.activeBrands')}</span><strong>02</strong></div><div><span>{t('hero.availableSpots')}</span><strong>06</strong></div><div><span>{t('hero.attention')}</span><strong>100%</strong></div></div></div><div className="hero-visual"><HeroVideo /></div></div></section><Ticker /><Ranking onChooseSpot={() => scrollToSection('comprar')} /><HowItWorks /><PurchaseFlow selectedSpot={selectedSpot} setSelectedSpot={setSelectedSpot} selectedSize={selectedSize} setSelectedSize={setSelectedSize} selectedZone={selectedZone} setSelectedZone={setSelectedZone} /><SizeSheet selectedSize={selectedSize} onSelectSize={setSelectedSize} selectedZone={selectedZone} onSelectZone={(zone) => { setSelectedZone(zone); setSelectedSpot(zone) }} /><ChonReal /></main><footer className="site-footer"><div className="section-shell footer-grid"><div><BrandMark /><p>{t('footer.body')}</p></div><SocialLinks /><span className="footer-note">{t('footer.note')}</span></div></footer></div>
}

const rootElement = document.getElementById('root')
const root = import.meta.hot?.data.root ?? createRoot(rootElement)
if (import.meta.hot) import.meta.hot.data.root = root
root.render(<React.StrictMode><LanguageProvider><App /></LanguageProvider></React.StrictMode>)
