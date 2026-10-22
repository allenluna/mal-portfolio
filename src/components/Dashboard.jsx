import { useEffect, useRef } from 'react'
import './Dashboard.css'

const SKILLS = [
  { name: 'React / JavaScript', pct: 95, color: '#185FA5' },
  { name: 'Django / Flask (Python)', pct: 90, color: '#185FA5' },
  { name: 'PostgreSQL / BigQuery', pct: 85, color: '#378ADD' },
  { name: 'GCP (Cloud Run / Build)', pct: 80, color: '#378ADD' },
  { name: 'CI/CD / GitHub Actions', pct: 82, color: '#85B7EB' },
  { name: 'Generative AI / Vertex AI', pct: 75, color: '#85B7EB' },
]

const STACK = [
  { label: 'Frontend', items: ['ReactJS', 'JavaScript', 'HTML/CSS'], color: 'blue' },
  { label: 'Backend', items: ['Python', 'Django', 'Flask', 'REST APIs'], color: 'teal' },
  { label: 'AI & Data', items: ['Vertex AI', 'BigQuery', 'Pandas', 'NumPy'], color: 'amber' },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'], color: 'gray' },
]

const TIMELINE = [
  {
    role: 'Senior Software Developer',
    company: 'VXI Global Solutions',
    period: 'Jan 2024 – Present · 1 yr+',
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

const CONTACT = [
  { icon: '📧', label: 'Email', value: 'allenluna1111@gmail.com' },
  { icon: '📱', label: 'Phone', value: '+639455882257' },
  { icon: '📍', label: 'Location', value: 'Olongapo City, Philippines' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/allenluna' },
]

function RadarChart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let chart = null
    const load = () => {
      if (!window.Chart || !canvasRef.current) return
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'
      const labelColor = isDark ? '#aaa' : '#888'
      chart = new window.Chart(canvasRef.current, {
        type: 'radar',
        data: {
          labels: ['Frontend', 'Backend', 'Cloud/DevOps', 'AI & Data', 'Databases', 'Auth & Security'],
          datasets: [{
            data: [95, 88, 80, 75, 82, 78],
            backgroundColor: 'rgba(24,95,165,0.15)',
            borderColor: '#185FA5',
            borderWidth: 2,
            pointBackgroundColor: '#185FA5',
            pointRadius: 4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              min: 0, max: 100,
              ticks: { display: false, stepSize: 25 },
              grid: { color: gridColor },
              angleLines: { color: gridColor },
              pointLabels: { font: { size: 11 }, color: labelColor },
            },
          },
        },
      })
    }

    if (window.Chart) {
      load()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
      script.onload = load
      document.head.appendChild(script)
    }

    return () => { if (chart) chart.destroy() }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px' }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default function Dashboard() {
  return (
    <section id="dashboard" className="dashboard-section">
      <div className="db-wrap">

        {/* Header */}
        <div className="db-header">
          <div className="db-avatar">MAL</div>
          <div className="db-nameblock">
            <h2 className="db-name">Mark Allen Luna</h2>
            <p className="db-title">Senior Software Developer · Olongapo City, PH</p>
            <span className="db-badge">● Open to opportunities</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="db-metrics">
          {[
            { label: 'Experience', value: '6', sub: 'years total' },
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

        {/* Timeline + Proficiency */}
        <div className="db-row2">
          <div className="db-card">
            <p className="db-card-title">Experience timeline</p>
            <div className="db-timeline">
              {TIMELINE.map((t, i) => (
                <div key={i} className="db-tl-item">
                  <div className="db-tl-left">
                    <div className={`db-tl-dot ${t.active ? '' : 'gray'}`} />
                    {i < TIMELINE.length - 1 && <div className="db-tl-line" />}
                  </div>
                  <div className="db-tl-content">
                    <div className="db-tl-role">{t.role}</div>
                    <div className="db-tl-company">{t.company}</div>
                    <div className="db-tl-period">{t.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="db-card">
            <p className="db-card-title">Core proficiency</p>
            <div className="db-skills">
              {SKILLS.map(s => (
                <div key={s.name} className="db-skill-row">
                  <div className="db-skill-info">
                    <span className="db-skill-name">{s.name}</span>
                    <span className="db-skill-pct">{s.pct}%</span>
                  </div>
                  <div className="db-bar-track">
                    <div className="db-bar-fill" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Radar */}
        <div className="db-card">
          <p className="db-card-title">Skill distribution by area</p>
          <RadarChart />
        </div>

        {/* Stack + Contact */}
        <div className="db-row3">
          <div className="db-card">
            <p className="db-card-title">Tech stack</p>
            {STACK.map(g => (
              <div key={g.label} className="db-stack-group">
                <div className="db-stack-label">{g.label}</div>
                <div className="db-pills">
                  {g.items.map(item => (
                    <span key={item} className={`db-pill ${g.color}`}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="db-card">
            <p className="db-card-title">Contact</p>
            <div className="db-contact-list">
              {CONTACT.map(c => (
                <div key={c.label} className="db-contact-row">
                  <div className="db-c-icon">{c.icon}</div>
                  <div>
                    <div className="db-c-label">{c.label}</div>
                    <div className="db-c-value">{c.value}</div>
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
