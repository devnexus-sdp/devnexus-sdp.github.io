import { bootstrapApplication } from '@angular/platform-browser';
import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Role {
  title: string;
  dates: string;
  points: string[];
  tags: string[];
}

interface Company {
  name: string;
  meta: string;
  roles: Role[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="nav" [class.nav-scrolled]="scrolled">
      <a class="brand" href="#top" aria-label="Back to top">
        <span class="monogram">SP</span>
        <span class="brand-name">Shivam Paliwal</span>
      </a>
      <nav aria-label="Main navigation">
        <a *ngFor="let n of nav" [href]="'#' + n.id">{{ n.label }}</a>
      </nav>
      <a class="btn btn-ghost btn-sm" href="Shivam_Paliwal.pdf" download="Shivam_Paliwal_Resume.pdf">Résumé</a>
    </header>

    <main id="top">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="wrap hero-grid">
          <div class="hero-copy reveal">
            <p class="eyebrow"><span class="rule"></span>Solutions Engineer · Gurgaon, India</p>
            <h1>Shivam<br><em>Paliwal</em></h1>
            <p class="lede">I design and deliver enterprise solutions end-to-end, from Java and Spring Boot services and tuned
              MySQL &amp; Oracle databases to the Angular interfaces people rely on every day.</p>
            <div class="actions">
              <a class="btn btn-gold" href="#projects">View my work</a>
              <a class="btn btn-ghost" href="Shivam_Paliwal.pdf" download="Shivam_Paliwal_Resume.pdf">Download résumé</a>
            </div>
          </div>

          <aside class="profile reveal" aria-label="Profile summary">
            <div class="profile-head">
              <span class="monogram monogram-lg">SP</span>
              <div><p class="profile-name">Shivam Paliwal</p><p class="profile-role">Solutions Engineer</p></div>
            </div>
            <dl>
              <div><dt>Currently</dt><dd>Ascent Risk &amp; Resilience</dd></div>
              <div><dt>Experience</dt><dd>3+ years in engineering</dd></div>
              <div><dt>Focus</dt><dd>Java · Spring Boot · Angular</dd></div>
              <div><dt>Open source</dt><dd>3 reusable libraries</dd></div>
            </dl>
            <p class="profile-status"><span class="dot"></span>Open to meaningful opportunities</p>
          </aside>
        </div>
        <a class="scroll-cue" href="#about" aria-label="Scroll to about"><span></span></a>
      </section>

      <!-- Stats -->
      <section class="stats" aria-label="Highlights">
        <div class="wrap stats-grid">
          <div class="stat reveal" *ngFor="let m of metrics">
            <strong>{{ m.value }}</strong>
            <span>{{ m.title }}</span>
          </div>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="section">
        <div class="wrap">
          <header class="section-head reveal"><span class="num">I</span><p class="kicker">About</p></header>
          <div class="about-grid">
            <h2 class="display reveal">Building scalable systems, from <em>Trainee</em> to <em>Solutions Engineer</em>.</h2>
            <div class="about-text reveal">
              <p class="dropcap">I have spent more than three years building scalable, full-stack web applications for enterprise
                clients. My work centres on Java and Spring Boot REST APIs, MySQL and Oracle database design, and Angular
                front-ends, delivered end-to-end with Agile teams.</p>
              <p>Before engineering, I spent three years at ICICI Bank as a Branch Sales Manager. It taught me to keep the
                client's business in view, which is a big part of how I approach solutions work today.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section id="experience" class="section section-alt">
        <div class="wrap">
          <header class="section-head reveal"><span class="num">II</span><p class="kicker">Experience</p></header>
          <div class="timeline">
            <div class="company reveal" *ngFor="let c of companies">
              <div class="company-head">
                <h3>{{ c.name }}</h3>
                <span class="meta">{{ c.meta }}</span>
              </div>
              <details class="role" *ngFor="let r of c.roles; let first = first" [open]="first">
                <summary>
                  <span class="role-dot" aria-hidden="true"></span>
                  <span class="role-title">{{ r.title }}</span>
                  <span class="role-dates">{{ r.dates }}</span>
                  <span class="chev" aria-hidden="true"></span>
                </summary>
                <div class="role-body">
                  <ul><li *ngFor="let p of r.points">{{ p }}</li></ul>
                  <div class="tags"><span *ngFor="let t of r.tags">{{ t }}</span></div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="section">
        <div class="wrap">
          <header class="section-head reveal"><span class="num">III</span><p class="kicker">Selected work</p></header>
          <h2 class="display reveal">Open-source libraries that remove <em>repetitive work</em>.</h2>
          <div class="projects">
            <article class="project reveal" *ngFor="let p of projects; let i = index">
              <div class="project-top">
                <span class="project-no">0{{ i + 1 }}</span>
                <span class="project-kind">{{ p.kind }}</span>
              </div>
              <h3>{{ p.name }}</h3>
              <p class="project-desc">{{ p.description }}</p>
              <div class="project-stat" *ngIf="p.stat"><strong>{{ p.stat.value }}</strong><span>{{ p.stat.label }}</span></div>
              <ul><li *ngFor="let h of p.highlights">{{ h }}</li></ul>
              <div class="tags"><span *ngFor="let t of p.tags">{{ t }}</span></div>
              <div class="project-links">
                <a *ngFor="let l of p.links" [href]="l.url" target="_blank" rel="noopener noreferrer">{{ l.label }} <span>↗</span></a>
                <a [href]="p.doc" target="_blank" rel="noopener">Documentation <span>↗</span></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section id="skills" class="section section-alt">
        <div class="wrap">
          <header class="section-head reveal"><span class="num">IV</span><p class="kicker">Expertise</p></header>
          <div class="skills">
            <div class="skill reveal" *ngFor="let s of skills">
              <h3>{{ s.name }}</h3>
              <p><ng-container *ngFor="let it of s.items; let last = last">{{ it }}<span class="sep" *ngIf="!last">·</span></ng-container></p>
            </div>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section id="education" class="section">
        <div class="wrap">
          <header class="section-head reveal"><span class="num">V</span><p class="kicker">Education</p></header>
          <div class="edu-list">
            <div class="edu reveal" *ngFor="let e of education">
              <span class="edu-years">{{ e.years }}</span>
              <h3>{{ e.title }}</h3>
              <p>{{ e.place }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="contact">
        <div class="hero-glow glow-low" aria-hidden="true"></div>
        <div class="wrap contact-inner reveal">
          <p class="kicker">Contact</p>
          <h2>Let's build something<br><em>remarkable.</em></h2>
          <a class="contact-email" [href]="'mailto:' + email">{{ email }}</a>
          <div class="actions center">
            <button class="btn btn-gold" type="button" (click)="copyEmail()">{{ copied ? 'Copied ✓' : 'Copy email' }}</button>
            <a class="btn btn-ghost" [href]="'tel:' + phone.replace('-', '')">{{ phone }}</a>
          </div>
          <p class="contact-loc">Gurgaon, India</p>
        </div>
        <footer class="wrap footer">
          <span>© {{ currentYear }} Shivam Paliwal</span>
          <span class="monogram">SP</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>
    </main>
  `
})
export class AppComponent implements AfterViewInit, OnDestroy {
  currentYear = new Date().getFullYear();
  email = 'paliwalshivam93.vns@gmail.com';
  phone = '+91-7985015277';
  copied = false;

  scrolled = false;
  private observer?: IntersectionObserver;

  nav = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Work' },
    { id: 'skills', label: 'Expertise' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  skills = [
    { name: 'Languages', items: ['Java (Core & Advanced)', 'Java 8 Streams/Lambdas', 'JavaScript', 'SQL'] },
    { name: 'Frameworks', items: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'Angular'] },
    { name: 'Databases', items: ['MySQL', 'Oracle', 'Schema design', 'Query optimization', 'Indexing'] },
    { name: 'Tools & infra', items: ['Git', 'GitHub', 'Maven', 'Postman', 'IntelliJ IDEA', 'VS Code', 'JHipster'] },
    { name: 'Methodologies', items: ['Agile/Scrum', 'Code reviews', 'REST API design', 'Bootstrap', 'HTML5', 'CSS3'] }
  ];

  companies: Company[] = [
    {
      name: 'Ascent Risk & Resilience',
      meta: 'Enterprise Software Solutions · Gurgaon',
      roles: [
        {
          title: 'Solutions Engineer',
          dates: 'Jul 2025 – Present',
          points: [
            'Leading end-to-end development of RESTful APIs using Java and Spring Boot for enterprise-grade client applications.',
            'Designed and optimized complex MySQL and Oracle schemas, reducing query execution time by up to 30% through indexing and query restructuring.',
            'Mentored junior developers through structured code reviews, establishing team-wide coding standards and best practices.',
            'Led feature releases with zero rollback incidents through disciplined staging, QA collaboration, and feature-flag management.',
            'Collaborated with cross-functional teams to architect scalable backend modules consumed by Angular front-ends.'
          ],
          tags: ['Java', 'Spring Boot', 'MySQL', 'Oracle', 'Mentoring']
        },
        {
          title: 'Software Engineer I',
          dates: 'Jul 2024 – Jun 2025',
          points: [
            'Owned full-cycle feature development, building core modules for data management, workflow automation, and reporting dashboards.',
            'Reduced P95 API latency by ~25% through connection pool tuning, N+1 query elimination, and JPA fetch strategy optimization.',
            'Developed and maintained Angular components integrated with Spring Boot REST APIs.',
            'Delivered 10+ feature releases across enterprise environments through Agile sprints, QA collaboration, and rigorous testing.',
            'Performed database schema migrations and ensured data integrity across MySQL and Oracle environments.'
          ],
          tags: ['Spring Data JPA', 'Angular', 'Performance', 'Agile']
        },
        {
          title: 'Junior Software Engineer',
          dates: 'Jul 2023 – Jun 2024',
          points: [
            'Built and maintained RESTful endpoints for document management, notification systems, and workflow features.',
            'Improved average API response time by ~20% through query profiling and removing redundant database calls.',
            'Developed responsive Angular interfaces and integrated them with backend REST APIs.',
            'Worked with QA and UAT teams across multiple release cycles on defect resolution and go-live activities.',
            'Participated in Agile sprints, daily standups, and code reviews, delivering tasks on time every quarter.'
          ],
          tags: ['REST APIs', 'Angular', 'SQL', 'UAT']
        },
        {
          title: 'Trainee Engineer',
          dates: 'Jan 2023 – Jun 2023',
          points: [
            'Built internal tooling using Spring Boot and REST APIs; assisted senior engineers with API testing via Postman.',
            'Gained hands-on experience with Spring MVC, Hibernate, Angular, and Git through structured mentorship.'
          ],
          tags: ['Spring Boot', 'Hibernate', 'Postman', 'Git']
        }
      ]
    },
    {
      name: 'ICICI Bank Ltd',
      meta: 'Delhi-NCR',
      roles: [
        {
          title: 'Branch Sales Manager – Deputy Manager',
          dates: 'Jun 2019 – May 2022',
          points: [
            'Managed client relationships and business development across Wealth, Retail, and DMA channels.',
            'Used CRM software to track customer relationships, improving retention and satisfaction metrics.',
            'Handled data analysis and reporting in Excel and PowerPoint to support strategic decisions.'
          ],
          tags: ['Client relations', 'CRM', 'Data analysis']
        }
      ]
    }
  ];

  projects = [
    {
      name: 'Sticky Notes Library',
      kind: 'Angular · npm',
      description: 'A published Angular library with a standalone component for creating, editing and deleting rich-text notes linked to any page or record.',
      stat: null,
      highlights: [
        'Rich-text editing with Quill, UI built on PrimeNG',
        'View-only mode, customizable labels and messages',
        'Configurable REST service layer with a JHipster-style API contract'
      ],
      tags: ['Angular 16+', 'PrimeNG', 'Quill', 'RxJS', 'MIT'],
      links: [{ label: 'npm', url: 'https://www.npmjs.com/package/sticky-notes-lib' }],
      doc: 'docs/Sticky_Notes_Library_Documentation.pdf'
    },
    {
      name: 'Duplicate Check Annotation',
      kind: 'Spring Boot · Library',
      description: 'Entity-level duplicate prevention for JPA. Declare uniqueness rules on the entity and they are enforced automatically on every repository save.',
      stat: null,
      highlights: [
        '@CheckDuplicateEntity and @UniqueField annotations, enforced via Spring AOP',
        'Composite, conditional, nested-path and @ManyToMany collection rules',
        'Returns HTTP 409 Conflict; versions for Spring Boot 2 (javax) and 3 (jakarta)'
      ],
      tags: ['Spring Boot', 'Spring AOP', 'JPA Criteria', 'Java 17'],
      links: [{ label: 'GitHub', url: 'https://github.com/devnexus-sdp/duplicate_check_custom_annotation' }],
      doc: 'docs/Duplicate_Check_Annotation_Documentation.pdf'
    },
    {
      name: 'JHipster Entity Generator',
      kind: 'Developer tooling',
      description: 'Generates application entities straight from a JHipster JDL model, turning hours of repetitive boilerplate into a single fast step.',
      stat: { value: '4h → 2s', label: 'entity generation time' },
      highlights: [
        'JDL stays the single source of truth for the domain model',
        'Safe regeneration: re-running on an updated JDL keeps existing custom changes'
      ],
      tags: ['Java', 'JHipster', 'JDL', 'Automation'],
      links: [] as { label: string; url: string }[],
      doc: 'docs/JHipster_Entity_Generator_Documentation.pdf'
    }
  ];

  metrics = [
    { value: '30%', title: 'Faster queries', text: 'Up to 30% lower execution time from schema redesign, indexing and query restructuring on MySQL and Oracle.' },
    { value: '25%', title: 'Lower P95 latency', text: 'Connection pool tuning, N+1 elimination and better JPA fetch strategies.' },
    { value: '20%', title: 'Faster responses', text: 'Query profiling and removal of redundant database calls.' },
    { value: '10+', title: 'Feature releases', text: 'Shipped across enterprise environments through Agile sprints.' },
    { value: '0', title: 'Rollbacks', text: 'Disciplined staging, QA sign-off and feature flags on every release led.' },
    { value: '3+', title: 'Years engineering', text: 'From Trainee to Solutions Engineer at Ascent.' }
  ];

  education = [
    { years: '2017 – 2019', title: 'MBA – Marketing & Finance', place: 'School of Management Sciences, Varanasi' },
    { years: '2010 – 2014', title: 'B.Tech – Electronics & Communication', place: 'Kashi Institute of Technology, Varanasi' },
    { years: 'Certification', title: 'Java Full Stack Development', place: 'Ducat India' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }

  ngAfterViewInit(): void {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    document.documentElement.classList.add('reveal-ready');
    this.observer = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); this.observer?.unobserve(e.target); }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    } catch {
      window.location.href = 'mailto:' + this.email;
    }
  }
}

bootstrapApplication(AppComponent).catch(err => console.error(err));
