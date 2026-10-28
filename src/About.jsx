import './About.css'

const TIMELINE = [
  {
    role: 'Senior Software Developer',
    company: 'VXI Global Solutions',
    period: 'Jan 2024 – Present · 2 yrs 8 mos',
    active: true,
  },
  {
    role: 'Technical Support Engineer / Web Developer',
    company: 'Wistron InfoComm Philippines',
    period: 'Nov 2021 – Jan 2024 · 2 yrs 2 mos',
    active: true,
  },
  {
    role: 'BS Computer Engineering',
    company: 'Mondriaan Aura College',
    period: '2015 – 2020',
    active: false,
  },
]

export default function About() {
  return (
    <section id="about" className="db-section">
      <div className="db-wrap">
        <div className="db-section-heading">
          <span className="mono-label">01. about</span>
          <h2 className="section__title">About Me</h2>
        </div>
        <div className="db-header">
          <img
            className="db-profile-image"
            src="/images/mark-allen-luna.webp"
            alt="Mark Allen Luna"
          />
          <div>
            <h2 className="db-name">Mark Allen Luna</h2>
            <p className="db-title">Senior Software Developer · Olongapo City, Philippines</p>
            <span className="db-badge">● Open to opportunities</span>
          </div>
        </div>

        <div className="db-card db-about-card">
          <div className="db-card-title">Professional summary</div>
          <p className="db-about-copy">
            Software Developer with 6+ years of experience building scalable, reliable, and
            maintainable web applications. Specializing in ReactJS, Python, Django, Flask,
            and PostgreSQL, with expertise in front-end and back-end development, REST API
            integration, cloud deployment using Google Cloud Platform (GCP), and generative
            AI solutions. Currently developing and maintaining enterprise-level applications
            at VXI Global Solutions. Passionate about solving complex problems, exploring
            emerging technologies, and delivering high-quality software solutions.
          </p>
        </div>

        <div className="db-metrics">
          {[
            { label: 'Experience', value: '6+', sub: 'years total' },
            { label: 'Current role', value: 'Sr.', sub: '@ VXI Global' },
            { label: 'Tech skills', value: '20+', sub: 'tools & languages' },
            { label: 'Education', value: 'BS', sub: 'Computer Engineering' },
          ].map(m => (
            <div key={m.label} className="db-metric">
              <div className="db-metric-label">{m.label}</div>
              <div className="db-metric-value">{m.value}</div>
              <div className="db-metric-sub">{m.sub}</div>
            </div>
          ))}
        </div>

        <div className="db-row3">
          <div className="db-card">
            <div className="db-card-title">Experience timeline</div>
            <div className="db-timeline">
              {TIMELINE.map((item, i) => (
                <div key={i} className="db-tl-item">
                  <div className="db-tl-left">
                    <div className={`db-tl-dot ${item.active ? '' : 'db-tl-dot--gray'}`} />
                    {i < TIMELINE.length - 1 && <div className="db-tl-line" />}
                  </div>
                  <div className="db-tl-content">
                    <div className="db-tl-role">{item.role}</div>
                    <div className="db-tl-company">{item.company}</div>
                    <div className="db-tl-period">{item.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="db-card">
            <div className="db-card-title">Contact</div>
            <div className="db-contact-list">
              {[
                { icon: '📧', label: 'Email', value: 'allenluna1111@gmail.com' },
                { icon: '📱', label: 'Phone', value: '+639455882257' },
                { icon: '📍', label: 'Location', value: 'Olongapo City, PH' },
                { icon: '🐙', label: 'GitHub', value: 'github.com/allenluna' },
              ].map(c => (
                <div key={c.label} className="db-contact-row">
                  <div className="db-contact-icon">{c.icon}</div>
                  <div>
                    <div className="db-contact-label">{c.label}</div>
                    <div className="db-contact-value">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
