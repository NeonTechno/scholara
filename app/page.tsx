'use client';

import { useMemo, useState } from 'react';

type ResourceType = 'Notes' | 'Past Questions' | 'Video' | 'Study Guide';
type Course = { code: string; title: string; faculty: string; department: string; level: string; semester: string; icon: string; resources: ResourceType[] };

const faculties = [
  'Administration','Agriculture','Arts','Allied Health Sciences','Basic Clinical Sciences','Basic Medical Sciences','Clinical Sciences','Dental Surgery','Education','Engineering','Environmental Design','Law','Life Sciences','Pharmaceutical Sciences','Physical Sciences','Social Sciences','Veterinary Medicine','ABU Business School / Management Sciences'
];

const courses: Course[] = [
  { code:'LAW 224', title:'Constitutional Law II', faculty:'Law', department:'Public Law', level:'200 Level', semester:'Second Semester', icon:'⚖', resources:['Notes','Past Questions','Study Guide'] },
  { code:'ECO 202', title:'Principles of Economics II', faculty:'Social Sciences', department:'Economics', level:'200 Level', semester:'Second Semester', icon:'↗', resources:['Notes','Past Questions','Video'] },
  { code:'ACC 201', title:'Financial Accounting I', faculty:'Administration', department:'Accounting', level:'200 Level', semester:'First Semester', icon:'▣', resources:['Notes','Past Questions','Study Guide'] },
  { code:'CSC 207', title:'Data Structures', faculty:'Physical Sciences', department:'Computer Science', level:'200 Level', semester:'First Semester', icon:'</>', resources:['Notes','Video','Past Questions'] },
  { code:'EEE 201', title:'Circuit Theory I', faculty:'Engineering', department:'Electrical Engineering', level:'200 Level', semester:'First Semester', icon:'⌁', resources:['Notes','Past Questions','Video'] },
  { code:'AGR 201', title:'Crop Production', faculty:'Agriculture', department:'Crop Production', level:'200 Level', semester:'First Semester', icon:'✿', resources:['Notes','Past Questions','Study Guide'] },
  { code:'BIO 205', title:'Cell Biology', faculty:'Life Sciences', department:'Biological Sciences', level:'200 Level', semester:'Second Semester', icon:'◉', resources:['Notes','Video','Study Guide'] },
  { code:'EDU 203', title:'Educational Psychology', faculty:'Education', department:'Education', level:'200 Level', semester:'Second Semester', icon:'✦', resources:['Notes','Past Questions','Study Guide'] },
];

function Logo({ compact=false }: {compact?: boolean}) {
  return <div className={`brand ${compact ? 'compact':''}`}><div className="brand-mark"><span>∫</span><i>✦</i></div><div><strong>SCHOLARA</strong>{!compact && <small>Your Academic World, One Place.</small>}</div></div>
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [faculty, setFaculty] = useState('All Faculties');
  const [selected, setSelected] = useState<Course | null>(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [toast, setToast] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = useMemo(() => courses.filter(c => {
    const q = query.toLowerCase();
    return (faculty === 'All Faculties' || c.faculty === faculty) && (!q || `${c.code} ${c.title} ${c.department} ${c.faculty}`.toLowerCase().includes(q));
  }), [query, faculty]);

  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(''), 2800); }

  return <main>
    <header className="nav-wrap">
      <nav className="nav container">
        <a href="#home" aria-label="SCHOLARA home"><Logo compact /></a>
        <button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">☰</button>
        <div className={`links ${mobileMenu ? 'open':''}`}>
          {['Home','Faculties','Courses','Resources','Past Questions','Videos','About Us'].map(x => <a key={x} href={`#${x.toLowerCase().replaceAll(' ','-')}`} onClick={()=>setMobileMenu(false)}>{x}</a>)}
          <button className="login-btn" onClick={()=>setShowPricing(true)}>Get Started</button>
        </div>
      </nav>
    </header>

    <section className="hero" id="home"><div className="container hero-grid">
      <div className="hero-copy">
        <div className="eyebrow">ACADEMIC RESOURCE HUB FOR ABU STUDENTS</div>
        <h1>Your Academic<br/><span>World, One Place.</span></h1>
        <p>Find lecture notes, past questions, video lectures and other study materials for your ABU courses — quickly and easily.</p>
        <div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for courses, topics, notes..."/><button onClick={()=>document.getElementById('courses')?.scrollIntoView({behavior:'smooth'})}>Search</button></div>
        <div className="quick-actions">
          {[['▣','Browse Courses'],['▤','Lecture Notes'],['?','Past Questions'],['▶','Video Lectures'],['▱','Study Resources']].map(([i,t])=><button key={t} onClick={()=>{setQuery(t === 'Lecture Notes' ? '':query);document.getElementById('resources')?.scrollIntoView({behavior:'smooth'})}}><b>{i}</b><span>{t}</span></button>)}
        </div>
      </div>
      <div className="hero-art" aria-label="Graduation cap on books illustration"><div className="book book-a"></div><div className="book book-b"></div><div className="cap"><div className="cap-top"></div><div className="cap-base"></div><div className="tassel"></div></div><div className="dots"></div></div>
    </div></section>

    <section className="content container" id="courses">
      <div className="section-head"><div><div className="eyebrow">EXPLORE</div><h2>Popular Courses</h2></div><button className="text-btn" onClick={()=>setFaculty('All Faculties')}>View all →</button></div>
      <div className="filter-row"><select value={faculty} onChange={e=>setFaculty(e.target.value)}><option>All Faculties</option>{faculties.map(f=><option key={f}>{f}</option>)}</select><span>{filtered.length} sample courses</span></div>
      <div className="course-grid">{filtered.map(c=><article className="course-card" key={c.code} onClick={()=>setSelected(c)}><div className="course-icon">{c.icon}</div><div className="course-info"><strong>{c.code}</strong><h3>{c.title}</h3><span>{c.level} · {c.semester}</span></div><span className="arrow">→</span></article>)}</div>
      {!filtered.length && <div className="empty">No courses found. Try a different code, title or faculty.</div>}
    </section>

    <section className="resources" id="resources"><div className="container">
      <div className="section-head"><div><div className="eyebrow">ONE PLACE FOR EVERYTHING</div><h2>Study smarter with trusted resources</h2></div></div>
      <div className="resource-grid">{[['▤','Lecture Notes','PDFs and class materials organized by course.'],['?','Past Questions','Practice with previous examination questions.'],['▶','Video Lectures','Curated YouTube lectures and explainers.'],['▱','Study Guides','Revision guides and recommended resources.']].map(([i,t,d])=><div className="resource-card" key={t}><div className="resource-icon">{i}</div><h3>{t}</h3><p>{d}</p><button onClick={()=>notify(`${t} browser is ready for the full database.`)}>Explore →</button></div>)}</div>
    </div></section>

    <section className="path container" id="faculties"><div className="path-copy"><div className="eyebrow">ORGANIZED FOR YOU</div><h2>Find exactly what you need.</h2><p>Navigate your academic world the way your programme is structured: Faculty → Department → Level → Semester → Course.</p><button className="primary" onClick={()=>document.getElementById('courses')?.scrollIntoView({behavior:'smooth'})}>Browse faculties →</button></div><div className="path-steps">{['Faculty','Department','Level','Semester','Course'].map((x,i)=><div key={x} className="step"><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong>{i<4&&<b>→</b>}</div>)}</div></section>

    <section className="pricing" id="about-us"><div className="container pricing-inner"><div><div className="eyebrow">SCHOLARA PLUS</div><h2>Everything you need to study better.</h2><p>Start with a 7-day free trial, then continue for <strong>$5/month</strong>. Cancel anytime.</p></div><button className="primary" onClick={()=>setShowPricing(true)}>Start 7-day free trial →</button></div></section>

    <section className="submit container" id="submit-a-resource"><div><div className="eyebrow">HELP BUILD SCHOLARA</div><h2>Have a useful academic resource?</h2><p>Submit lecture notes, past questions, study guides or useful links. Our team reviews submissions before publishing.</p></div><button className="secondary" onClick={()=>setShowSubmit(true)}>Submit a Resource +</button></section>

    <footer><div className="container footer-grid"><Logo/><div><strong>Explore</strong><a href="#faculties">Faculties</a><a href="#courses">Courses</a><a href="#resources">Resources</a></div><div><strong>Community</strong><a href="#submit-a-resource">Submit a Resource</a><a href="#about-us">Pricing</a><a href="#home">About SCHOLARA</a></div></div><div className="container copyright">© 2026 SCHOLARA · Digital academic resource hub for ABU students.</div></footer>

    {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><div className="course-icon large">{selected.icon}</div><div className="eyebrow">{selected.faculty} · {selected.department}</div><h2>{selected.code}: {selected.title}</h2><p>{selected.level} · {selected.semester}</p><div className="modal-resources">{selected.resources.map(r=><button key={r} onClick={()=>notify(`${r} access selected for ${selected.code}.`)}><span>{r==='Video'?'▶':r==='Past Questions'?'?':'▤'}</span>{r}<b>→</b></button>)}</div><small>Sample prototype content. Full ABU resources can be connected through an admin-managed database.</small></div></div>}

    {showSubmit && <div className="modal-backdrop" onClick={()=>setShowSubmit(false)}><div className="modal form" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setShowSubmit(false)}>×</button><div className="eyebrow">RESOURCE SUBMISSION</div><h2>Share with your fellow students.</h2><input placeholder="Your name"/><input placeholder="Resource title"/><select><option>Lecture Notes</option><option>Past Questions</option><option>Video / YouTube link</option><option>Study Guide</option></select><input placeholder="Course code (e.g. CSC 207)"/><textarea placeholder="Resource link or a short description" rows={4}></textarea><button className="primary" onClick={()=>{setShowSubmit(false);notify('Resource submitted for admin approval.')}}>Submit for approval</button></div></div>}

    {showPricing && <div className="modal-backdrop" onClick={()=>setShowPricing(false)}><div className="modal pricing-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setShowPricing(false)}>×</button><div className="eyebrow">SCHOLARA PLUS</div><h2>7 days free. Then $5/month.</h2><ul><li>✓ Full academic resource library</li><li>✓ Past questions & revision materials</li><li>✓ Curated video lectures</li><li>✓ Save and organize your study resources</li></ul><button className="primary" onClick={()=>{setShowPricing(false);notify('Trial signup flow is ready for payment integration.')}}>Start free trial →</button><small>No payment is collected in this prototype.</small></div></div>}
    {toast && <div className="toast">✓ {toast}</div>}
  </main>
}
