import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export const LANGUAGE_STORAGE_KEY = 'chon-language'
export const supportedLanguages = ['es', 'en']

export const translations = {
  es: {
    meta: {
      title: 'Chon tiene espacio — Publicidad canina de alto impacto',
      description: 'Reservá un espacio publicitario en el cono o la pechera de Chon: ocho lugares, seis tamaños y atención garantizada.',
    },
    brand: { ariaLabel: 'Chon tiene espacio', descriptor: 'publicidad canina para marcas|con ambición y presupuesto' },
    language: {
      group: 'Selector de idioma',
      current: 'Idioma actual: español',
      switchTo: 'Cambiar a {{language}}',
      spanish: 'español',
      english: 'inglés',
    },
    nav: { main: 'Navegación principal', sizes: 'Tamaños', ranking: 'Ranking', how: 'Cómo funciona', reserve: 'Reservar lugar' },
    hero: {
      titleBefore: 'Tu marca vive en el',
      titleEmphasis: 'cono',
      titleAfter: 'de Chon.',
      lede: 'Convertí el accesorio médico más visible del barrio en el soporte publicitario que tu marca todavía no sabía que necesitaba.',
      reserve: 'Reservar mi lugar',
      seeSizes: 'Ver tamaños y precios',
      activeBrands: 'Marcas activas',
      availableSpots: 'Lugares libres',
      attention: 'Atención',
      videoBadge: 'Espacio publicitario premium',
      videoCaption: 'Hago publicidad de pelos',
      videoAlt: 'Chon, perro negro usando un cono médico',
    },
    ticker: ['un cono', 'ocho lugares', 'seis tamaños', 'atención garantizada', 'un perro con agenda propia', 'esto va a pagar mi Royal Canin'],
    turntable: {
      viewOf: 'Vista de {{label}}',
      stickerPreview: 'Vista previa del sticker: {{content}}',
      localFile: 'Vista previa del archivo local',
      availableZone: 'Zona disponible para el sticker',
      choose: 'Elegir {{label}}',
      picker: 'Elegí un lugar para el sticker',
    },
    groups: { cone: '4 lados del cono', harness: '4 lados de la pechera' },
    zones: {
      'cone-front': { label: 'Frente del cono', detail: 'La superficie que más se ve de frente.', spot: 'Cono · frente' },
      'cone-right': { label: 'Lateral derecho del cono', detail: 'La cara derecha del cono, visible al pasear.', spot: 'Cono · lateral derecho' },
      'cone-back': { label: 'Dorso del cono', detail: 'La cara posterior del cono, también disponible.', spot: 'Cono · dorso' },
      'cone-left': { label: 'Lateral izquierdo del cono', detail: 'La cara izquierda del cono, con la misma superficie.', spot: 'Cono · lateral izquierdo' },
      'harness-front': { label: 'Frente de la pechera', detail: 'La placa frontal de la pechera.', spot: 'Pechera · frente' },
      'harness-right': { label: 'Lateral derecho de la pechera', detail: 'El costado derecho de la pechera.', spot: 'Pechera · lateral derecho' },
      'harness-back': { label: 'Dorso de la pechera', detail: 'La parte superior posterior de la pechera.', spot: 'Pechera · dorso' },
      'harness-left': { label: 'Lateral izquierdo de la pechera', detail: 'El costado izquierdo de la pechera.', spot: 'Pechera · lateral izquierdo' },
    },
    ranking: {
      eyebrow: 'Ranking en vivo',
      title: 'El cono ya tiene favoritos.',
      body: 'Las marcas que llegaron primero se quedaron con los lugares que Chon mira con menos desprecio.',
      occupancy: 'Ocupación',
      views: '{{count}} vistas',
      available: 'Lugar disponible',
      emptyTitle: 'Tu marca, si llegás a tiempo',
      emptyBody: 'Hay un lugar con tu nombre. Todavía.',
      reserve: 'Reservarlo',
      sponsors: { croquetas: 'M · Cono frontal', paseo: 'S · Pechera frontal' },
    },
    how: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos. Un cono con agenda propia.',
      body: 'Tu marca, un perro convaleciente y una oportunidad comercial que nadie pidió.',
      steps: [
        { title: 'Diseñá tu marca', body: 'Escribí algo memorable, usá tu arroba o subí el archivo que Chon merece.' },
        { title: 'Elegí territorio', body: 'Hay ocho lugares: cuatro en el cono y cuatro en la pechera. La humildad es opcional.' },
        { title: 'Cerrá el trato', body: 'Revisá el pedido, pagá tu lugar y preparate para una exposición difícil de medir.' },
      ],
    },
    sizes: {
      eyebrow: 'Menú de espacios',
      title: 'Seis tamaños. Ocho lugares.',
      body: 'Elegí cuánto protagonismo puede soportar tu marca sin opacar al dueño del cono.',
      note: 'Medido con precisión. Aprobado con indiferencia.',
      notes: { xs: 'firma mínima', s: 'presencia puntual', m: 'el equilibrio', l: 'buena lectura', xl: 'se ve venir', xxxl: 'máxima presencia' },
      location: 'Ubicación',
    },
    purchase: {
      eyebrow: 'Reservá tu lugar',
      title: 'Diseñá el anuncio que va a acompañar a Chon.',
      body: 'Cuatro pasos para ocupar una propiedad publicitaria con patas.',
      previewLabel: 'Tu marca vive acá',
      steps: ['Diseño', 'Tamaño', 'Lugar', 'Pagar'],
      stepOneTitle: 'Tu marca',
      stepOneBody: 'Dale a Chon algo digno de llevar puesto.',
      textMode: 'Texto',
      socialMode: 'Red social',
      uploadMode: 'Mi archivo',
      uploadReady: 'Archivo listo',
      uploadPrompt: 'Subir PNG, SVG, JPG o WEBP',
      uploadNote: 'Máximo 5 MB. Chon se reserva el derecho a juzgar.',
      brandLabel: 'Lo que dice la marca',
      socialLabel: 'Tu usuario',
      brandPlaceholder: 'TU MARCA',
      fontLabel: 'Estilo de letra',
      fontOptions: { space: 'Space Grotesk · sans', archivo: 'Archivo Black · display', mono: 'DM Mono · mono' },
      approveDesign: 'Aprobar diseño',
      stepTwoTitle: 'Elegí el tamaño',
      stepTwoBody: 'Cuanto más grande, más difícil que Chon finja que no trabaja para vos.',
      back: 'Atrás',
      chooseLocation: 'Elegir lugar',
      stepThreeTitle: 'Elegí territorio',
      stepThreeBody: 'Cono o pechera. Frente, dorso o perfil dramático.',
      reviewOrder: 'Revisar pedido',
      stepFourTitle: 'Revisá y pagá',
      stepFourBody: 'Tu lugar está listo. Chon espera una decisión ejecutiva.',
      pay: 'Pagar con Mercado Pago',
      successEyebrow: 'Caíste con elegancia',
      successTitle: 'El pedido nunca existió.',
      successBody: 'No hubo cobro, proceso de pago ni datos enviados. Pero tu marca le quedaba bastante bien a Chon.',
      tryAgain: 'Caer de nuevo',
    },
    errors: {
      uploadRequired: 'Elegí un archivo para poder previsualizarlo en el sticker.',
      brandRequired: 'Escribí algo para mostrar en el sticker.',
      fileTooLarge: 'El archivo supera el máximo de 5 MB.',
      invalidFile: 'Elegí una imagen PNG, SVG, JPG o WEBP.',
    },
    modal: {
      eyebrow: 'plot twist',
      close: 'Cerrar aviso',
      title: 'No promociono a mi perro.',
      description: 'Solo me subí a la tendencia viral de esta semana. No hubo Mercado Pago, no se procesó ningún cobro y nada de lo que cargaste salió de tu navegador.',
      follow: 'Si te reíste, seguime.',
    },
    real: {
      eyebrow: 'El talento',
      title: 'Este es Chon.',
      body: 'Está recuperándose con un cono gigante, una pechera y la seguridad de alguien que acaba de descubrir su valor de mercado.',
      facts: ['Negro, curioso, profesional', 'Disponible para campañas absurdamente específicas'],
      imageAlt: 'Chon, perro negro con su cono blanco, descansando después de su operación',
      stamp: 'Hola soy Chon',
      cta: 'Contratar su cono',
    },
    footer: {
      body: 'Publicidad canina de alto impacto. Literalmente a la altura de un perro.',
      social: 'Redes y página personal',
      website: 'Página personal',
      note: 'Hecho con paciencia y un cono enorme.',
    },
  },
  en: {
    meta: {
      title: 'Chon has space — High-impact canine advertising',
      description: 'Reserve advertising space on Chon\'s cone or harness: eight spots, six sizes, and guaranteed attention.',
    },
    brand: { ariaLabel: 'Chon has space', descriptor: 'canine advertising for brands|with ambition and budget' },
    language: {
      group: 'Language selector',
      current: 'Current language: English',
      switchTo: 'Switch to {{language}}',
      spanish: 'Spanish',
      english: 'English',
    },
    nav: { main: 'Main navigation', sizes: 'Sizes', ranking: 'Ranking', how: 'How it works', reserve: 'Reserve a spot' },
    hero: {
      titleBefore: 'Your brand lives on Chon\'s',
      titleEmphasis: 'cone',
      titleAfter: '.',
      lede: 'Turn the neighborhood\'s most visible medical accessory into the advertising surface your brand never knew it needed.',
      reserve: 'Reserve my spot',
      seeSizes: 'See sizes and prices',
      activeBrands: 'Active brands',
      availableSpots: 'Spots available',
      attention: 'Attention',
      videoBadge: 'Premium ad space',
      videoCaption: 'I make fur famous',
      videoAlt: 'Chon, a black dog wearing a medical cone',
    },
    ticker: ['a cone', 'eight spots', 'six sizes', 'guaranteed attention', 'a dog with his own schedule', 'this will pay for my Royal Canin'],
    turntable: {
      viewOf: 'View of {{label}}',
      stickerPreview: 'Sticker preview: {{content}}',
      localFile: 'Local file preview',
      availableZone: 'Available sticker zone',
      choose: 'Choose {{label}}',
      picker: 'Choose a sticker spot',
    },
    groups: { cone: '4 cone sides', harness: '4 harness sides' },
    zones: {
      'cone-front': { label: 'Front of the cone', detail: 'The surface most visible from the front.', spot: 'Cone · front' },
      'cone-right': { label: 'Right side of the cone', detail: 'The right face of the cone, visible on walks.', spot: 'Cone · right side' },
      'cone-back': { label: 'Back of the cone', detail: 'The rear face of the cone, also available.', spot: 'Cone · back' },
      'cone-left': { label: 'Left side of the cone', detail: 'The left face of the cone, with the same surface area.', spot: 'Cone · left side' },
      'harness-front': { label: 'Front of the harness', detail: 'The front plate of the harness.', spot: 'Harness · front' },
      'harness-right': { label: 'Right side of the harness', detail: 'The right side of the harness.', spot: 'Harness · right side' },
      'harness-back': { label: 'Back of the harness', detail: 'The upper rear part of the harness.', spot: 'Harness · back' },
      'harness-left': { label: 'Left side of the harness', detail: 'The left side of the harness.', spot: 'Harness · left side' },
    },
    ranking: {
      eyebrow: 'Live ranking',
      title: 'The cone already has favorites.',
      body: 'The brands that arrived first claimed the spots Chon looks at with the least contempt.',
      occupancy: 'Occupancy',
      views: '{{count}} views',
      available: 'Spot available',
      emptyTitle: 'Your brand, if you get here in time',
      emptyBody: 'There is a spot with your name on it. For now.',
      reserve: 'Reserve it',
      sponsors: { croquetas: 'M · Front of cone', paseo: 'S · Front of harness' },
    },
    how: {
      eyebrow: 'How it works',
      title: 'Three steps. One cone with its own schedule.',
      body: 'Your brand, a recovering dog, and a business opportunity nobody asked for.',
      steps: [
        { title: 'Design your brand', body: 'Write something memorable, use your handle, or upload the file Chon deserves.' },
        { title: 'Choose your territory', body: 'There are eight spots: four on the cone and four on the harness. Humility is optional.' },
        { title: 'Close the deal', body: 'Review the order, pay for your spot, and prepare for exposure that is hard to measure.' },
      ],
    },
    sizes: {
      eyebrow: 'Space menu',
      title: 'Six sizes. Eight spots.',
      body: 'Choose how much attention your brand can handle without overshadowing the cone\'s owner.',
      note: 'Measured precisely. Approved with indifference.',
      notes: { xs: 'minimal signature', s: 'focused presence', m: 'the balance', l: 'easy to read', xl: 'hard to miss', xxxl: 'maximum presence' },
      location: 'Location',
    },
    purchase: {
      eyebrow: 'Reserve your spot',
      title: 'Design the ad that will accompany Chon.',
      body: 'Four steps to occupy an advertising property with legs.',
      previewLabel: 'Your brand lives here',
      steps: ['Design', 'Size', 'Spot', 'Pay'],
      stepOneTitle: 'Your brand',
      stepOneBody: 'Give Chon something worthy to wear.',
      textMode: 'Text',
      socialMode: 'Social handle',
      uploadMode: 'My file',
      uploadReady: 'File ready',
      uploadPrompt: 'Upload PNG, SVG, JPG, or WEBP',
      uploadNote: 'Maximum 5 MB. Chon reserves the right to judge.',
      brandLabel: 'What the brand says',
      socialLabel: 'Your handle',
      brandPlaceholder: 'YOUR BRAND',
      fontLabel: 'Font style',
      fontOptions: { space: 'Space Grotesk · sans', archivo: 'Archivo Black · display', mono: 'DM Mono · mono' },
      approveDesign: 'Approve design',
      stepTwoTitle: 'Choose the size',
      stepTwoBody: 'The bigger it gets, the harder it is for Chon to pretend he does not work for you.',
      back: 'Back',
      chooseLocation: 'Choose spot',
      stepThreeTitle: 'Choose your territory',
      stepThreeBody: 'Cone or harness. Front, back, or dramatic profile.',
      reviewOrder: 'Review order',
      stepFourTitle: 'Review and pay',
      stepFourBody: 'Your spot is ready. Chon is waiting for an executive decision.',
      pay: 'Pay with Mercado Pago',
      successEyebrow: 'You fell for it elegantly',
      successTitle: 'The order never existed.',
      successBody: 'There was no charge, checkout, or data sent anywhere. But your brand looked pretty good on Chon.',
      tryAgain: 'Fall for it again',
    },
    errors: {
      uploadRequired: 'Choose a file so it can be previewed on the sticker.',
      brandRequired: 'Write something to show on the sticker.',
      fileTooLarge: 'The file exceeds the 5 MB maximum.',
      invalidFile: 'Choose a PNG, SVG, JPG, or WEBP image.',
    },
    modal: {
      eyebrow: 'plot twist',
      close: 'Close notice',
      title: 'I am not promoting my dog.',
      description: 'I only jumped on this week\'s viral trend. There was no Mercado Pago, no charge was processed, and nothing you entered left your browser.',
      follow: 'If you laughed, follow me.',
    },
    real: {
      eyebrow: 'The talent',
      title: 'This is Chon.',
      body: 'He is recovering with a giant cone, a harness, and the confidence of someone who just discovered his market value.',
      facts: ['Black, curious, professional', 'Available for absurdly specific campaigns'],
      imageAlt: 'Chon, a black dog with his white cone, resting after his operation',
      stamp: 'Hi, I am Chon',
      cta: 'Hire his cone',
    },
    footer: {
      body: 'High-impact canine advertising. Literally at a dog\'s height.',
      social: 'Social links and personal site',
      website: 'Personal site',
      note: 'Made with patience and a huge cone.',
    },
  },
}

function getValue(language, key) {
  return key.split('.').reduce((value, part) => value?.[part], translations[language])
}

function interpolate(value, variables = {}) {
  if (typeof value !== 'string') return value
  return value.replace(/{{(\w+)}}/g, (_, name) => variables[name] ?? '')
}

export function detectLanguage() {
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'es'
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (supportedLanguages.includes(stored)) return stored
  } catch {
    // A blocked or unavailable localStorage should not prevent the page from loading.
  }
  return detectLanguage()
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)
  const setLanguage = useCallback((nextLanguage) => {
    const next = supportedLanguages.includes(nextLanguage) ? nextLanguage : 'es'
    setLanguageState(next)
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next)
    } catch {
      // Keep the language change working for the current session.
    }
  }, [])
  const t = useCallback((key, variables) => interpolate(getValue(language, key), variables), [language])
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t])

  useEffect(() => {
    const copy = translations[language]
    document.documentElement.lang = language
    document.title = copy.meta.title
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', copy.meta.description)
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage debe usarse dentro de LanguageProvider')
  return value
}
