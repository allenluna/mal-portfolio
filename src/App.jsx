import { useState, useEffect, useRef } from 'react'
import './App.css'
import About from './About'

const NAV_LINKS = ['home', 'about', 'projects', 'skills', 'contact']

const PROJECTS = [
  {
    num: '01',
    title: 'VXI Recruitment CRM & AI Chatbot',
    desc: 'A recruitment CRM that automatically saves applicant information collected through Facebook Messenger, manages applicant conversations, and uses Dialogflow CX and Vertex AI to generate AI-powered replies to questions outside the standard chatbot flow.',
    stack: [
      'React',
      'Vite',
      'Django REST Framework',
      'PostgreSQL',
      'Dialogflow CX',
      'Vertex AI',
      'Python',
    ],
    year: '2026',
    images: [
      {
        src: '/images/vxi-recruitment-crm-dashboard.png',
        alt: 'VXI Recruitment CRM applicants dashboard, messaging inbox, and AI assistant',
        label: 'Recruitment CRM application',
      },
      {
        src: '/images/vxi-crm-architecture.png',
        alt: 'Architecture flow from Facebook Messenger and Dialogflow CX through Vertex AI to the CRM and PostgreSQL',
        label: 'Chatbot and CRM architecture flow',
      },
    ],
    link: '#',
  },
  {
    num: '02',
    title: 'Coaching Quality Analysis Platform',
    desc: 'A coaching quality dashboard for reviewing coaching records, tracking quality scores, and surfacing trends across teams. Integrated with Vertex AI to analyze coaching records and generate quality insights.',
    stack: ['Django', 'React', 'JavaScript', 'Vite', 'PostgreSQL', 'Vertex AI'],
    year: '2026',
    images: [
      {
        src: '/images/coaching-quality-analyzer.png',
        alt: 'Coaching Quality Analysis Platform dashboard with AI analysis metrics, score charts, and coaching quality distribution',
        label: 'Coaching quality dashboard',
      },
    ],
    link: '#',
  },
  {
    num: '03',
    title: 'Memo Tracker',
    desc: 'A memo management app for assigning memos, tracking pending acknowledgements, and reviewing completed records from a centralized dashboard.',
    stack: ['Django', 'React', 'JavaScript', 'Vite', 'PostgreSQL'],
    year: '2026',
    images: [
      {
        src: '/images/memo-tracker.png',
        alt: 'Memo Tracker application with memo status summary and assigned memo list',
        label: 'Memo tracking dashboard',
      },
    ],
    link: '#',
  },
  {
    num: '04',
    title: 'Document Shipment Tracker',
    desc: 'A shipment tracking dashboard for monitoring document transmittals and returns, with shipment records, courier and site breakdowns, and reporting views.',
    stack: ['Django', 'React', 'JavaScript', 'Vite', 'PostgreSQL'],
    year: '2026',
    images: [
      {
        src: '/images/document-shipment-tracker.png',
        alt: 'Document Shipment Tracker dashboard with transmittal and return summaries, courier chart, and site report',
        label: 'Shipment tracking dashboard',
      },
    ],
    link: '#',
  },
]

const PROJECT_IMAGES = PROJECTS.flatMap(project =>
  project.images.map(image => ({ ...image, projectTitle: project.title }))
)

const SKILLS = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Tailwind CSS'] },
  { category: 'Backend', items: [ 'Django', 'Flask', 'Node.js', 'Express', 'GraphQL', 'REST APIs', 'WebSockets'] },
  { category: 'Infra & Tools', items: ['Docker', 'PostgreSQL', 'Redis', 'Git', 'CI/CD'] },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#home" className="navbar__logo">
        <span className="logo-mark">MAL</span>
      </a>
      <ul className="navbar__links">
        {NAV_LINKS.map(link => (
          <li key={link}>
            <a
              href={`#${link}`}
              className={`navbar__link ${active === link ? 'navbar__link--active' : ''}`}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Hero() {
  const [ref, inView] = useInView(0.1)
  return (
    <section id="home" className="hero" ref={ref}>
      <div className={`hero__inner ${inView ? 'reveal' : ''}`}>
        <div className="hero__tag">
          <span className="dot" /> Available for work
        </div>
        <h1 className="hero__name">
          <span className="hero__first">Mark Allen</span>
          <span className="hero__last">Luna</span>
        </h1>
        <p className="hero__role">
          <span className="mono-label">{'</>'}</span> Software Developer
        </p>
        <p className="hero__bio">
          I build robust, scalable systems and clean, thoughtful interfaces.
          Focused on developer experience, performance, and shipping things that last.
          Based in the Philippines — working globally.
        </p>
        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary">View Work</a>
          <a href="#contact" className="btn btn--ghost">Get in Touch</a>
        </div>
        <div className="hero__scroll-hint">
          <span className="mono-label">scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
      <div className="hero__bg-text" aria-hidden="true">DEV</div>
    </section>
  )
}

function Projects() {
  const [ref, inView] = useInView(0.05)
  const [activeImage, setActiveImage] = useState(null)
  const imageDialogRef = useRef(null)

  useEffect(() => {
    if (activeImage !== null && !imageDialogRef.current.open) {
      imageDialogRef.current.showModal()
    }
  }, [activeImage])

  const closeImageDialog = () => imageDialogRef.current?.close()
  const showNextImage = () => {
    setActiveImage(index => (index + 1) % PROJECT_IMAGES.length)
  }
  const showPreviousImage = () => {
    setActiveImage(index => (index - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length)
  }

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className={`section__inner ${inView ? 'reveal' : ''}`}>
        <div className="section__header">
          <span className="mono-label">02. projects</span>
          <h2 className="section__title">Selected Work</h2>
        </div>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.num}
              className="project-card"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="project-card__top">
                <span className="project-card__num">{p.num}</span>
                <span className="project-card__year">{p.year}</span>
              </div>
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>
              <div className="project-card__stack">
                {p.stack.map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
              {p.images && (
                <div className={`project-card__gallery ${p.images.length === 1 ? 'project-card__gallery--single' : ''}`}>
                  {p.images.map(image => (
                    <button
                      key={image.src}
                      type="button"
                      className="project-card__image-link"
                      onClick={() => {
                        setActiveImage(PROJECT_IMAGES.findIndex(
                          projectImage => projectImage.src === image.src
                        ))
                      }}
                      aria-label={`Open image: ${image.label}`}
                    >
                      <img
                        className="project-card__image"
                        src={image.src}
                        alt={image.alt}
                      />
                      <span className="project-card__image-caption">
                        <span>{image.label}</span>
                        <span>View image ↗</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <dialog
        ref={imageDialogRef}
        className="project-image-modal"
        aria-label="Project image viewer"
        onClose={() => setActiveImage(null)}
        onClick={event => {
          if (event.target === imageDialogRef.current) closeImageDialog()
        }}
      >
        {activeImage !== null && (
          <>
            <div className="project-image-modal__header">
              <span>
                {PROJECT_IMAGES[activeImage].projectTitle} — {PROJECT_IMAGES[activeImage].label}
              </span>
              <button
                type="button"
                className="project-image-modal__close"
                onClick={closeImageDialog}
                autoFocus
                aria-label="Close image viewer"
              >
                Close ×
              </button>
            </div>
            <img
              className="project-image-modal__image"
              src={PROJECT_IMAGES[activeImage].src}
              alt={PROJECT_IMAGES[activeImage].alt}
            />
            <div className="project-image-modal__controls">
              <button type="button" onClick={showPreviousImage}>
                ← Previous
              </button>
              <span>{activeImage + 1} / {PROJECT_IMAGES.length}</span>
              <button type="button" onClick={showNextImage}>
                Next →
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  )
}

function Skills() {
  const [ref, inView] = useInView(0.1)
  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className={`section__inner ${inView ? 'reveal' : ''}`}>
        <div className="section__header">
          <span className="mono-label">03. skills</span>
          <h2 className="section__title">Tech Stack</h2>
        </div>
        <div className="skills__grid">
          {SKILLS.map((group, i) => (
            <div
              key={group.category}
              className="skill-group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="skill-group__cat">{group.category}</h3>
              <ul className="skill-group__list">
                {group.items.map(item => (
                  <li key={item} className="skill-item">
                    <span className="skill-item__dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [ref, inView] = useInView(0.1)
  const [copied, setCopied] = useState(false)
  const email = 'allenluna1111@gmail.com'

  const copy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className={`section__inner ${inView ? 'reveal' : ''}`}>
        <div className="section__header">
          <span className="mono-label">04. contact</span>
          <h2 className="section__title">Let's Build</h2>
        </div>
        <p className="contact__sub">
          Open to freelance, full-time, and collaboration opportunities.
          Drop a message — I usually respond within 24 hours.
        </p>
        <div className="contact__email" onClick={copy}>
          <span className="contact__email-text">{email}</span>
          <span className="contact__copy">{copied ? 'Copied!' : 'Copy'}</span>
        </div>
        <div className="contact__links">
          <a href="https://github.com/allenluna" target="_blank" rel="noreferrer" className="contact__link">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/mark-allen-luna-9b2594206/" target="_blank" rel="noreferrer" className="contact__link">
            LinkedIn ↗
          </a>
          <a href="#" className="contact__link">
            Resume ↗
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <span className="mono-label">© 2025 Mark Allen Luna</span>
      <span className="mono-label">Built with React + Vite</span>
    </footer>
  )
}

export default function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    NAV_LINKS.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
