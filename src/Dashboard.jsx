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

export default function Dashboard() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!window.Chart) return
    if (chartInstance.current) chartInstance.current.destroy()
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'
    const labelColor = isDark ? '#aaa' : '#888'
    chartInstance.current = new window.Chart(chartRef.current, {
      type: 'radar',
      data: {
        labels: ['Frontend', 'Backend', 'Cloud/DevOps', 'AI & Data', 'Databases', 'Auth & Security'],
        datasets: [{
          data: [95, 88, 80, 75, 82, 78],
          backgroundColor: 'rgba(24, 95, 165, 0.15)',
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
            ticks: { display: false },
            grid: { color: gridColor },
            angleLines: { color: gridColor },
            pointLabels: { font: { size: 11 }, color: labelColor },
          },
        },
      },
    })
    return () => chartInstance.current?.destroy()
  }, [])

  return (
    <section id="dashboard" className="db-section">
      <div className="db-wrap">

        {/* Header */}
        <div className="db-header">
          <div className="db-avatar">MAL</div>
          <div>
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
              <div className="db-card-title">Skill distribution</div>
              <div className="db-timeline">
                <div className="db-tl-right">
                  <div className="db-chart-wrap">
                    <canvas ref={chartRef} />
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Radar chart */}
        {/* <div className="db-card">
          <div className="db-card-title">Skill distribution</div>
          <div className="db-chart-wrap">
            <canvas ref={chartRef} />
          </div>
        </div> */}

        {/* Stack + Contact */}
        <div className="db-row3">
          <div className="db-card">
            <div className="db-card-title">Tech stack</div>
            {STACK.map(group => (
              <div key={group.label} className="db-stack-group">
                <div className="db-stack-label">{group.label}</div>
                <div className="db-stack-pills">
                  {group.items.map(item => (
                    <span key={item} className={`db-pill db-pill--${group.color}`}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
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
