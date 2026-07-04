import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import {
  personal,
  stats,
  careerPath,
  education,
  theses,
  teachingSupervision,
  administrative,
  societies,
  projects,
  supervision,
  awards,
  conferences,
  trainings,
  publications,
  books,
  socialActivities,
} from "@/data/cv";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const nav = [
  { id: "about", label: "نبذة" },
  { id: "education", label: "المؤهلات" },
  { id: "career", label: "التدرج الوظيفي" },
  { id: "teaching", label: "التدريس والإشراف" },
  { id: "publications", label: "الأبحاث" },
  { id: "books", label: "المؤلفات" },
  { id: "conferences", label: "المؤتمرات" },
  { id: "trainings", label: "الدورات" },
  { id: "admin", label: "الأنشطة الإدارية" },
  { id: "social", label: "الأنشطة الاجتماعية" },
  { id: "contact", label: "التواصل" },
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-bold text-primary md:text-4xl">{title}</h2>
          <div className="divider-gold mt-4" />
        </div>
        {children}
      </div>
    </section>
  );
}

function Portfolio() {
  const [open, setOpen] = useState(false);
  const [showAllPubs, setShowAllPubs] = useState(false);
  const visiblePubs = showAllPubs ? publications : publications.slice(0, 12);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold font-bold text-primary">
              ز.أ
            </span>
            <span className="hidden text-sm font-semibold text-primary sm:block">
              أ.د. زينب محمد أمين
            </span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            className="rounded-md border border-border p-2 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
          >
            <span className="block h-0.5 w-5 bg-primary" />
            <span className="mt-1 block h-0.5 w-5 bg-primary" />
            <span className="mt-1 block h-0.5 w-5 bg-primary" />
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-6 py-4">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="top" className="relative overflow-hidden bg-gradient-hero text-white">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            بورتفوليو أكاديمي
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            {personal.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85 md:text-xl">
            {personal.title} — {personal.role}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
            جامعة المنيا · كلية التربية النوعية · قسم تكنولوجيا التعليم
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#publications"
              className="rounded-full bg-gradient-gold px-6 py-3 font-semibold text-primary shadow-elegant transition hover:brightness-105"
            >
              استعرض الأبحاث
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              تواصل معي
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <div className="text-2xl font-extrabold text-gold md:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-white/75 md:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="about" eyebrow="نبذة تعريفية" title="بيانات شخصية">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <p className="leading-loose text-foreground/85">
              أستاذة متخصصة في تكنولوجيا التعليم والعميد الأسبق لكلية التربية النوعية بجامعة
              المنيا، ولها إسهامات علمية بارزة على مدار أكثر من ثلاثة عقود في مجالات التعلم
              الإلكتروني، الوسائط المتعددة، بيئات التعلم الرقمية، والحوسبة السحابية في
              التعليم، مع خبرة تدريبية دولية بجامعة جورجيا الأمريكية.
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-3 rounded-2xl border border-border bg-card p-8 shadow-card sm:grid-cols-2">
            {[
              ["الجنسية", personal.nationality],
              ["الحالة الاجتماعية", personal.status],
              ["الميلاد", personal.birth],
              ["اللقب الأكاديمي", personal.title],
              ["الوظيفة", personal.role],
              ["تاريخ الدكتوراه", personal.phdDate],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-secondary/60 p-3">
                <dt className="text-xs font-semibold text-muted-foreground">{k}</dt>
                <dd className="mt-1 text-sm font-medium text-primary">{v}</dd>
              </div>
            ))}
            <div className="rounded-lg bg-secondary/60 p-3 sm:col-span-2">
              <dt className="text-xs font-semibold text-muted-foreground">عنوان العمل</dt>
              <dd className="mt-1 text-sm font-medium text-primary">{personal.address}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section id="education" eyebrow="التكوين الأكاديمي" title="المؤهلات العلمية">
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e) => (
            <article
              key={e.degree}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition hover:shadow-elegant"
            >
              <div className="absolute inset-y-0 right-0 w-1 bg-gradient-gold" />
              <p className="text-xs font-semibold text-gold">{e.date}</p>
              <h3 className="mt-2 text-lg font-bold text-primary">{e.degree}</h3>
              <p className="mt-1 text-sm text-muted-foreground">التخصص: {e.field}</p>
              <p className="mt-3 text-sm text-foreground/80">{e.place}</p>
              <p className="mt-2 text-xs font-semibold text-primary/80">التقدير: {e.grade}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-secondary/40 p-6">
            <p className="text-xs font-semibold uppercase text-gold">رسالة الماجستير</p>
            <p className="mt-2 leading-relaxed text-foreground/85">{theses.masters}</p>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/40 p-6">
            <p className="text-xs font-semibold uppercase text-gold">رسالة الدكتوراه</p>
            <p className="mt-2 leading-relaxed text-foreground/85">{theses.phd}</p>
          </div>
        </div>
      </Section>

      <Section id="career" eyebrow="المسيرة المهنية" title="التدرج الوظيفي">
        <ol className="relative border-r-2 border-gold/40 pr-6">
          {careerPath.map((c, i) => (
            <li key={i} className="relative mb-8 last:mb-0">
              <span className="absolute -right-[34px] top-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-gold text-xs font-bold text-primary shadow-card">
                {i + 1}
              </span>
              <p className="text-sm font-semibold text-gold">{c.period}</p>
              <p className="mt-1 text-base font-medium text-primary">{c.role}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="teaching"
        eyebrow="التدريس والتدريب"
        title="أنشطة التدريس والإشراف العلمي"
      >
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {supervision.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-card"
            >
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-lg font-bold text-primary">{s.value}</p>
            </div>
          ))}
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {teachingSupervision.map((t, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed shadow-card"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
              <span className="text-foreground/85">{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="publications"
        eyebrow="الإنتاج العلمي"
        title={`الأبحاث المنشورة (${publications.length})`}
      >
        <div className="space-y-4">
          {visiblePubs.map((p, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-border bg-card p-5 shadow-card transition hover:border-gold/50 hover:shadow-elegant"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      p.type === "فردي"
                        ? "bg-gold/20 text-primary"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {p.type}
                  </span>
                  <h3 className="mt-2 font-bold leading-relaxed text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.venue}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        {publications.length > 12 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAllPubs(!showAllPubs)}
              className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {showAllPubs ? "عرض أقل" : `عرض جميع الأبحاث (${publications.length})`}
            </button>
          </div>
        )}
      </Section>

      <Section id="books" eyebrow="المؤلفات" title={`الكتب المؤلفة (${books.length})`}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {books.map((b, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-gold" />
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base font-bold leading-relaxed text-primary">{b.title}</h3>
              <p className="mt-3 text-xs text-muted-foreground">{b.authors}</p>
              {b.publisher && (
                <p className="mt-1 text-xs italic text-foreground/60">{b.publisher}</p>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="conferences"
        eyebrow="المشاركات العلمية"
        title={`المؤتمرات والندوات (${conferences.length}+)`}
      >
        <div className="grid gap-3 md:grid-cols-2">
          {conferences.map((c, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm shadow-card"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/20 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <p className="leading-relaxed text-foreground/85">{c}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="trainings"
        eyebrow="التطوير المهني"
        title="الدورات التدريبية وورش العمل"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {trainings.map((t, i) => (
            <div
              key={i}
              className="rounded-xl border-r-4 border-gold bg-secondary/50 p-4 text-sm leading-relaxed text-foreground/85"
            >
              {t}
            </div>
          ))}
        </div>
      </Section>

      <Section id="admin" eyebrow="القيادة الأكاديمية" title="الأنشطة الإدارية والمهنية">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-4 text-lg font-bold text-primary">المناصب واللجان</h3>
              <ul className="space-y-2 text-sm">
                {administrative.map((a, i) => (
                  <li key={i} className="flex gap-2 text-foreground/85">
                    <span className="text-gold">◆</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-3 text-lg font-bold text-primary">الجمعيات العلمية</h3>
              <ul className="space-y-2 text-sm text-foreground/85">
                {societies.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">✦</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-3 text-lg font-bold text-primary">المشاريع البحثية</h3>
              <ul className="space-y-2 text-sm text-foreground/85">
                {projects.map((p, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="text-gold">›</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-hero p-6 text-white shadow-elegant">
              <h3 className="mb-3 text-lg font-bold text-gold">الجوائز والتكريم</h3>
              <ul className="space-y-3 text-sm">
                {awards.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-gold text-xs font-bold text-primary">
                      {a.year}
                    </span>
                    <span className="text-white/90">{a.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="social" eyebrow="الإسهام المجتمعي" title="الأنشطة الاجتماعية والتحكيم">
        <ul className="grid gap-3 md:grid-cols-2">
          {socialActivities.map((s, i) => (
            <li
              key={i}
              className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground/85 shadow-card"
            >
              <span className="mb-1 block text-xs font-bold text-gold">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <section id="contact" className="scroll-mt-24 bg-gradient-hero py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            التواصل الأكاديمي
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">للتواصل والتعاون العلمي</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-gold" />
          <p className="mx-auto mt-6 max-w-2xl text-white/85">
            يسعدني استقبال طلبات الإشراف على الرسائل العلمية، المشاركة في المؤتمرات
            والندوات، وأعمال التحكيم في مجال تكنولوجيا التعليم والدراسات التربوية.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-right backdrop-blur">
              <p className="text-xs font-semibold uppercase text-gold">عنوان العمل</p>
              <p className="mt-2 leading-relaxed text-white/90">{personal.address}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-right backdrop-blur">
              <p className="text-xs font-semibold uppercase text-gold">المنصب الحالي</p>
              <p className="mt-2 leading-relaxed text-white/90">{personal.role}</p>
              <p className="mt-1 text-sm text-white/70">{personal.title}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-navy-deep py-8 text-center text-sm text-white/60">
        <div className="mx-auto max-w-6xl px-6">
          © {new Date().getFullYear()} — {personal.name} · جميع الحقوق محفوظة
        </div>
      </footer>
    </div>
  );
}
