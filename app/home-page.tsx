import { AgendaDisplay } from "./agenda-display.jsx";
import { BrandLogo } from "./brand-logo";
import {
  address,
  businessName,
  mapsHref,
  phoneDisplay,
  phoneE164,
  phoneHref,
  seoDescriptions,
  services,
  siteUrl,
  whatsappHref,
} from "./seo";

export type Locale = "fr" | "ar" | "en";
type Copy = Record<Locale, string>;
const copy = (fr: string, ar: string, en: string): Copy => ({ fr, ar, en });
const trialMessages: Copy = copy(
  "Bonjour, je veux essayer un cours chez Grappling Garage. Quel créneau me conseillez-vous ?",
  "مرحبا، أريد تجربة حصة في Grappling Garage. ما هو الموعد المناسب لي؟",
  "Hello, I would like to try a class at Grappling Garage. Which session do you recommend?",
);
const localeRoutes: Array<{ locale: Locale; label: string; href: string; hrefLang: string }> = [
  { locale: "fr", label: "FR", href: "/", hrefLang: "fr-TN" },
  { locale: "ar", label: "عربي", href: "/ar/", hrefLang: "ar-TN" },
  { locale: "en", label: "EN", href: "/en/", hrefLang: "en" },
];

function T({ locale, value, block = false }: { locale: Locale; value: Copy; block?: boolean }) {
  return (
    <span lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={block ? "block" : "inline"}>
      {value[locale]}
    </span>
  );
}

function PhotoSlot({
  locale,
  number,
  label,
  className = "",
}: {
  locale: Locale;
  number: string;
  label: Copy;
  className?: string;
}) {
  return (
    <figure className={`copy-align relative flex min-h-64 overflow-hidden border border-[#58707c] bg-[#18313d] p-5 text-white ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(217,255,69,0.14)_48%,rgba(217,255,69,0.14)_52%,transparent_52%)]" />
      <figcaption className="relative mt-auto flex w-full items-end justify-between gap-4">
        <span className="text-xs font-black uppercase text-[#d9ff45]"><T locale={locale} value={label} /></span>
        <strong className="text-4xl font-black text-white/30">{number}</strong>
      </figcaption>
    </figure>
  );
}

const programs = [
  {
    number: "01",
    title: copy("BJJ / Jiu-jitsu brésilien", "الجيوجيتسو البرازيلية", "Brazilian Jiu-Jitsu"),
    line: copy("Contrôle. Technique. Sang-froid.", "سيطرة. تقنية. هدوء.", "Control. Technique. Composure."),
    text: copy(
      "Apprends à contrôler au sol, sortir des mauvaises positions et rester lucide quand la pression monte. Gi ou no-gi, chaque détail compte.",
      "تعلّم السيطرة على الأرض، الخروج من الوضعيات الصعبة والبقاء هادئا تحت الضغط. كل تفصيل يصنع الفرق.",
      "Learn ground control, escape bad positions and stay sharp under pressure. Gi or no-gi, every detail matters.",
    ),
  },
  {
    number: "02",
    title: copy("Wrestling / Lutte", "المصارعة", "Wrestling"),
    line: copy("Explosivité. Équilibre. Impact.", "قوة. توازن. تأثير.", "Explosiveness. Balance. Impact."),
    text: copy(
      "Travaille tes entrées, projections et défenses. Tu construis un corps plus solide et une présence qu’on sent dès le premier contact.",
      "طوّر الدخولات والإسقاطات والدفاع. ابن جسما أقوى وحضورا يظهر من أول احتكاك.",
      "Build your entries, takedowns and defense. Develop a stronger body and a presence people feel on first contact.",
    ),
  },
  {
    number: "03",
    title: copy("Grappling no-gi", "غرابلينغ بدون كيمونو", "No-gi grappling"),
    line: copy("Vitesse. Transitions. Rounds.", "سرعة. انتقالات. جولات.", "Speed. Transitions. Rounds."),
    text: copy(
      "Enchaîne lutte et travail au sol dans un style rapide, athlétique et direct. Tu apprends en bougeant, puis tu testes en round.",
      "اربط المصارعة بالعمل الأرضي بأسلوب سريع ورياضي. تتعلم بالحركة ثم تختبر مهاراتك في الجولات.",
      "Connect wrestling and ground work in a fast, athletic style. Learn through movement, then test it in live rounds.",
    ),
  },
];

const outcomes = [
  {
    problem: copy("La salle classique t’ennuie", "مللت من قاعة الرياضة التقليدية", "Regular gyms bore you"),
    answer: copy("Ici, aucun round ne se ressemble. Tu apprends, tu bouges, tu testes.", "هنا لا توجد جولتان متشابهتان. تتعلم، تتحرك وتختبر نفسك.", "No two rounds feel the same. Learn, move and test yourself."),
  },
  {
    problem: copy("Tu veux un corps qui sert vraiment", "تريد جسما قويا وعمليا", "You want a body that performs"),
    answer: copy("Cardio, force, mobilité, réflexes: tout progresse en même temps.", "لياقة، قوة، مرونة وردود فعل: كل شيء يتطور معا.", "Cardio, strength, mobility and reactions improve together."),
  },
  {
    problem: copy("Tu veux savoir te défendre", "تريد أن تعرف كيف تدافع عن نفسك", "You want practical self-defense"),
    answer: copy("Apprends à contrôler, sortir et réagir proprement quand ça bouge vite.", "تعلم السيطرة والخروج والتصرف الصحيح عندما تسرع الأمور.", "Learn to control, escape and react cleanly when things move fast."),
  },
  {
    problem: copy("Tu veux enfin être régulier", "تريد أخيرا أن تصبح منضبطا", "You want real consistency"),
    answer: copy("Un planning clair, des partenaires et des rounds qui donnent envie de revenir.", "برنامج واضح، شركاء وجولات تجعلك تريد العودة.", "A clear schedule, training partners and rounds that keep you coming back."),
  },
];

const sessionFlow = [
  {
    number: "01",
    title: copy("Comprends le mouvement", "افهم الحركة", "Understand the movement"),
    text: copy("Le coach montre le détail qui change tout: placement, timing et réaction attendue.", "يشرح المدرب التفصيل الذي يصنع الفرق: الوضعية، التوقيت ورد الفعل.", "The coach breaks down the detail that changes everything: position, timing and reaction."),
  },
  {
    number: "02",
    title: copy("Répète jusqu’à le sentir", "كرر حتى تتقنه", "Drill until it clicks"),
    text: copy("Tu travailles avec un partenaire, tu ajustes et le geste devient plus propre à chaque répétition.", "تتدرب مع شريك، تعدل الحركة وتصبح أدق مع كل تكرار.", "Work with a partner, adjust and make the movement cleaner with every repetition."),
  },
  {
    number: "03",
    title: copy("Teste dans un vrai round", "اختبره في جولة حقيقية", "Test it in a real round"),
    text: copy("Tu mets la technique en action face à une résistance adaptée. C’est là que le progrès devient réel.", "تطبق التقنية أمام مقاومة تناسب مستواك. هنا يصبح التطور حقيقيا.", "Put the technique to work against suitable resistance. That is where progress becomes real."),
  },
];

const gains = [
  {
    title: copy("Un physique athlétique", "جسم رياضي", "An athletic body"),
    text: copy("Force utile, cardio, mobilité et coordination construits ensemble, pas muscle par muscle.", "قوة عملية، لياقة، مرونة وتنسيق تتطور معا.", "Useful strength, cardio, mobility and coordination built together, not one muscle at a time."),
  },
  {
    title: copy("Des réflexes qui répondent", "ردود فعل سريعة", "Reactions that work"),
    text: copy("Tu lis le mouvement, prends une décision et agis sans rester bloqué à réfléchir.", "تقرأ الحركة، تتخذ قرارا وتتصرف دون تردد.", "Read movement, make a decision and act without freezing to think."),
  },
  {
    title: copy("Une progression visible", "تطور تلاحظه", "Progress you can feel"),
    text: copy("Une sortie plus propre, un meilleur contrôle, un round mieux géré: chaque séance te donne un nouveau repère.", "خروج أنظف، سيطرة أفضل وجولة أذكى: كل حصة تعطيك دليلا جديدا على تقدمك.", "A cleaner escape, better control, a smarter round: every class gives you a new marker of progress."),
  },
  {
    title: copy("L’habitude de ne pas lâcher", "عادة عدم الاستسلام", "The habit of staying in it"),
    text: copy("Tu apprends à respirer, t’adapter et chercher la prochaine solution quand le round devient dur.", "تتعلم التنفس، التكيف والبحث عن الحل التالي عندما تصبح الجولة صعبة.", "Learn to breathe, adapt and find the next solution when the round gets hard."),
  },
];

const faqs = [
  {
    question: copy("Je suis débutant total. Je peux venir ?", "أنا مبتدئ تماما، هل يمكنني الحضور؟", "I am a complete beginner. Can I join?"),
    answer: copy("Oui. Les bases sont expliquées étape par étape et les rounds sont adaptés à ton niveau.", "نعم. نشرح الأساسيات خطوة بخطوة والجولات تناسب مستواك.", "Yes. Basics are taught step by step and rounds match your level."),
  },
  {
    question: copy("Je dois être en forme avant de commencer ?", "هل يجب أن أكون لائقا قبل أن أبدأ؟", "Do I need to be fit before starting?"),
    answer: copy("Non. Le grappling va justement construire ton cardio, ta force et ta mobilité.", "لا. الغرابلينغ سيبني لياقتك وقوتك ومرونتك.", "No. Grappling will build your cardio, strength and mobility."),
  },
  {
    question: copy("Quel cours choisir entre BJJ et lutte ?", "أي حصة أختار: الجيوجيتسو أم المصارعة؟", "Should I choose BJJ or wrestling?"),
    answer: copy("Écris-nous ton objectif. On te conseille le cours qui correspond à ton niveau et à ce que tu veux développer.", "أرسل لنا هدفك وسنقترح الحصة المناسبة لمستواك.", "Tell us your goal and we will recommend the class that fits your level."),
  },
  {
    question: copy("Proposez-vous des cours de MMA à Tunis ?", "هل تقدمون حصص الفنون القتالية المختلطة (MMA) في تونس؟", "Do you offer MMA classes in Tunis?"),
    answer: copy(
      "Non. Grappling Garage ne propose pas de cours de MMA. Nos cours de BJJ, grappling et lutte développent toutefois des bases essentielles utilisées en MMA : amenées au sol, contrôle, défense et travail au sol.",
      "لا. لا يقدم Grappling Garage حصص MMA. لكن حصص الجيوجيتسو والغرابلينغ والمصارعة تبني أساسيات مهمة مستخدمة في MMA، مثل الإسقاطات والسيطرة والدفاع والعمل الأرضي.",
      "No. Grappling Garage does not offer MMA classes. Our BJJ, grappling and wrestling classes do build essential foundations used in MMA, including takedowns, control, defense and ground work.",
    ),
  },
];

const localizedServices: Record<Locale, string[]> = {
  fr: services,
  ar: [
    "حصص مصارعة في تونس",
    "حصص جيوجيتسو برازيلية في تونس",
    "غرابلينغ نو-غي في تونس",
    "لياقة بدنية للغرابلينغ",
    "حصص أطفال في تونس",
    "حصص للكبار المبتدئين",
    "نادي غرابلينغ في تونس",
    "نادي جيوجيتسو في تونس",
    "تدريب مصارعة في تونس",
  ],
  en: [
    "Wrestling classes in Tunis",
    "Brazilian Jiu-Jitsu classes in Tunis",
    "No-gi grappling in Tunis",
    "Grappling fitness and conditioning",
    "Kids classes in Tunis",
    "Beginner adult classes",
    "Grappling club in Tunis",
    "BJJ club in Tunis",
    "Wrestling training in Tunis",
  ],
};

function createStructuredData(locale: Locale) {
  const pageUrl = locale === "fr" ? `${siteUrl}/` : `${siteUrl}/${locale}/`;
  const serviceNames = localizedServices[locale];

  return {
    "@context": "https://schema.org",
    "@graph": [
    {
      "@type": ["SportsActivityLocation", "LocalBusiness"],
      "@id": `${siteUrl}/#club`,
      name: businessName,
      alternateName: "Club BJJ Grappling Garage Tunis",
      url: pageUrl,
      image: `${siteUrl}/opengraph-image.png`,
      telephone: phoneE164,
      description: seoDescriptions[locale],
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        postalCode: address.postalCode,
        addressCountry: address.addressCountry,
      },
      hasMap: mapsHref,
      areaServed: ["Tunis", "Tunisie"],
      sport: ["Brazilian Jiu-Jitsu", "Grappling", "Wrestling"],
      knowsAbout: serviceNames,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: copy(
          "Cours de BJJ, grappling et lutte à Tunis",
          "حصص جيوجيتسو وغرابلينغ ومصارعة في تونس",
          "BJJ, grappling and wrestling classes in Tunis",
        )[locale],
        itemListElement: serviceNames.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, areaServed: "Tunis, Tunisie" },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: businessName,
      url: siteUrl,
      inLanguage: ["fr-TN", "ar-TN", "en"],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: locale === "fr" ? "fr-TN" : locale === "ar" ? "ar-TN" : "en",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question[locale],
        acceptedAnswer: { "@type": "Answer", text: answer[locale] },
      })),
    },
    ],
  };
}

export function HomePage({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const structuredData = createStructuredData(locale);
  const trialWhatsappHref = `${whatsappHref}?text=${encodeURIComponent(trialMessages[locale])}`;

  return (
    <main lang={locale} dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#f2f7fa] pb-20 text-[#071923] sm:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-[#071923] text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label={copy("Navigation principale", "التنقل الرئيسي", "Main navigation")[locale]} className="flex h-24 items-center justify-between border-b border-white/15">
            <a href="#top" aria-label={businessName} className="h-20 w-20 py-2">
              <BrandLogo priority inverted className="h-full w-auto object-contain" />
            </a>
            <div aria-label={copy("Choisir la langue", "اختر اللغة", "Choose language")[locale]} className="flex gap-1 rounded-md border border-white/20 p-1 text-xs font-black">
              {localeRoutes.map((item) => (
                <a
                  key={item.locale}
                  href={item.href}
                  hrefLang={item.hrefLang}
                  lang={item.locale}
                  aria-current={locale === item.locale ? "page" : undefined}
                  className={`rounded px-3 py-2 ${locale === item.locale ? "bg-[#d9ff45] text-[#071923]" : "text-white"}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div id="top" className="grid min-h-[680px] content-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="copy-align max-w-4xl">
              <p className="mb-5 text-sm font-black uppercase text-[#d9ff45]">
                <T locale={locale} value={copy("Tunis • BJJ • Grappling • Wrestling", "تونس • جيوجيتسو • غرابلينغ • مصارعة", "Tunis • BJJ • Grappling • Wrestling")} />
              </p>
              <h1 className="text-5xl font-black leading-[0.95] tracking-normal sm:text-7xl lg:text-8xl">
                <T locale={locale} block value={copy("Club de BJJ, grappling et lutte à Tunis", "نادي جيوجيتسو وغرابلينغ ومصارعة في تونس", "BJJ, grappling and wrestling club in Tunis")} />
              </h1>
              <p className="mt-6 max-w-3xl text-2xl font-black leading-tight text-[#d9ff45] sm:text-3xl">
                <T locale={locale} block value={copy("Deviens plus fort. Bouge mieux. Garde ton calme sous pression.", "كن أقوى. تحرك أفضل. حافظ على هدوئك تحت الضغط.", "Get stronger. Move better. Stay calm under pressure.")} />
              </p>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#c5d4db]">
                <T locale={locale} block value={copy("Apprends une vraie compétence. Deviens solide. Progresse à chaque round. Rejoins une équipe qui vient pour travailler et avancer.", "تعلّم مهارة حقيقية. كن أقوى. تطور في كل جولة. انضم إلى فريق يأتي للعمل والتقدم.", "Learn a real skill. Get solid. Improve every round. Join a team that shows up to work and move forward.")} />
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={trialWhatsappHref} className="inline-flex h-13 items-center justify-center rounded-md bg-[#d9ff45] px-6 text-sm font-black uppercase text-[#071923]">
                  <T locale={locale} value={copy("Je réserve mon essai", "أحجز حصتي التجريبية", "Book my trial class")} />
                </a>
                <a href="#agenda" className="inline-flex h-13 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-black uppercase text-white">
                  <T locale={locale} value={copy("Voir les horaires", "شاهد المواعيد", "See the schedule")} />
                </a>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <PhotoSlot locale={locale} number="01" label={copy("BJJ en action", "جيوجيتسو في الحركة", "BJJ in action")} className="min-h-72" />
                <PhotoSlot locale={locale} number="02" label={copy("Rounds de lutte", "جولات المصارعة", "Wrestling rounds")} className="min-h-72 translate-y-8" />
              </div>
              <div className="mt-8 grid grid-cols-2 border border-white/20">
                {[
                  ["7/7", copy("Cours toute la semaine", "حصص طوال الأسبوع", "Classes all week")],
                  ["5–15", copy("Groupes enfants", "مجموعات أطفال", "Kids groups")],
                  ["0", copy("Expérience requise", "خبرة مطلوبة", "Experience required")],
                  ["1", copy("Message pour commencer", "رسالة واحدة للبدء", "Message to start")],
                ].map(([value, label]) => (
                  <div key={value as string} className="copy-align min-h-32 border border-white/10 p-4">
                    <strong className="block text-4xl font-black text-[#d9ff45]">{value as string}</strong>
                    <span className="mt-3 block text-xs font-bold text-[#c5d4db]"><T locale={locale} block value={label as Copy} /></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#c7d5dc] bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="copy-align max-w-4xl">
            <p className="text-sm font-black uppercase text-[#08777a]"><T locale={locale} value={copy("Choisis ton terrain", "اختر مجالك", "Choose your game")} /></p>
            <h2 className="mt-3 text-4xl font-black sm:text-6xl"><T locale={locale} block value={copy("BJJ, lutte ou no-gi: construis un style qui te ressemble", "جيوجيتسو، مصارعة أو نو-غي: ابن أسلوبك", "BJJ, wrestling or no-gi: build your own style")} /></h2>
          </div>
          <div className="mt-10 grid border-l border-t border-[#9fb3bd] lg:grid-cols-3">
            {programs.map((program) => (
              <article key={program.number} className="copy-align border-b border-r border-[#9fb3bd] p-6 sm:p-8">
                <span className="text-sm font-black text-[#08777a]">{program.number}</span>
                <h3 className="mt-12 text-3xl font-black"><T locale={locale} block value={program.title} /></h3>
                <p className="mt-3 text-lg font-black text-[#08777a]"><T locale={locale} block value={program.line} /></p>
                <p className="mt-5 font-semibold leading-7 text-[#385463]"><T locale={locale} block value={program.text} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#08777a] py-14 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="copy-align grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase text-[#d9ff45]"><T locale={locale} value={copy("Une séance au Grappling Garage", "حصة في غرابلينغ غاراج", "A session at Grappling Garage")} /></p>
              <h2 className="mt-3 text-4xl font-black sm:text-6xl"><T locale={locale} block value={copy("Pas de temps perdu. Tu apprends, tu répètes, tu passes à l’action.", "لا وقت ضائع. تتعلم، تكرر ثم تطبق.", "No wasted time. Learn it, drill it, put it to work.")} /></h2>
            </div>
            <p className="font-bold leading-7 text-white/85"><T locale={locale} block value={copy("Tu ne viens pas regarder une démonstration pendant une heure. Tu bouges, tu poses tes questions et tu construis une compétence que tu peux réellement utiliser.", "لا تأتي لمشاهدة عرض طويل. تتحرك، تسأل وتبني مهارة تستطيع استخدامها فعلا.", "You do not come to watch a long demonstration. You move, ask questions and build a skill you can actually use.")} /></p>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            <PhotoSlot locale={locale} number="03" label={copy("Démonstration du coach", "شرح المدرب", "Coach demonstration")} className="min-h-80" />
            <PhotoSlot locale={locale} number="04" label={copy("Travail en binôme", "تدريب مع شريك", "Partner drills")} className="min-h-80 lg:translate-y-8" />
            <PhotoSlot locale={locale} number="05" label={copy("Mise en situation", "تطبيق عملي", "Live practice")} className="min-h-80" />
          </div>

          <div className="mt-16 grid border-l border-t border-white/30 lg:grid-cols-3">
            {sessionFlow.map((step) => (
              <article key={step.number} className="copy-align border-b border-r border-white/30 p-6 sm:p-8">
                <span className="text-sm font-black text-[#d9ff45]">{step.number}</span>
                <h3 className="mt-8 text-2xl font-black"><T locale={locale} block value={step.title} /></h3>
                <p className="mt-4 font-semibold leading-7 text-white/80"><T locale={locale} block value={step.text} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f7fa] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="copy-align max-w-4xl">
            <p className="text-sm font-black uppercase text-[#08777a]"><T locale={locale} value={copy("Pourquoi tu vas accrocher", "لماذا ستستمر", "Why you will stick with it")} /></p>
            <h2 className="mt-3 text-4xl font-black sm:text-6xl"><T locale={locale} block value={copy("Pas juste transpirer. Devenir vraiment meilleur.", "ليس مجرد عرق. بل أن تصبح أفضل فعلا.", "Not just sweat. Actually get better.")} /></h2>
          </div>
          <div className="mt-10 grid gap-px bg-[#9fb3bd] md:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <article key={outcome.problem.fr} className="copy-align bg-white p-6 sm:p-8">
                <span className="text-sm font-black text-[#08777a]">0{index + 1}</span>
                <h3 className="mt-8 text-3xl font-black"><T locale={locale} block value={outcome.problem} /></h3>
                <p className="mt-4 text-lg font-bold leading-7 text-[#385463]"><T locale={locale} block value={outcome.answer} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#c7d5dc] bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="copy-align max-w-5xl">
            <p className="text-sm font-black uppercase text-[#08777a]"><T locale={locale} value={copy("Ce que tu construis", "ماذا ستبني", "What you build")} /></p>
            <h2 className="mt-3 text-4xl font-black sm:text-6xl"><T locale={locale} block value={copy("Le genre de progrès que tu ressens sur le tapis et en dehors", "تطور تشعر به فوق البساط وخارجه", "The kind of progress you feel on and off the mat")} /></h2>
            <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#385463]"><T locale={locale} block value={copy("Tu commences pour apprendre à combattre. Tu continues parce que ton corps répond mieux, tes décisions deviennent plus rapides et chaque semaine t’apporte quelque chose de concret.", "تبدأ لتتعلم القتال. وتستمر لأن جسمك يستجيب أفضل، قراراتك تصبح أسرع وكل أسبوع يعطيك نتيجة ملموسة.", "You start to learn how to fight. You stay because your body responds better, decisions get faster and every week gives you something concrete.")} /></p>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-12">
            <PhotoSlot locale={locale} number="06" label={copy("Force en mouvement", "قوة في الحركة", "Strength in motion")} className="lg:col-span-5 lg:min-h-[30rem]" />
            <div className="grid gap-px bg-[#9fb3bd] lg:col-span-7 lg:grid-cols-2">
              {gains.map((gain, index) => (
                <article key={gain.title.fr} className="copy-align bg-[#f2f7fa] p-6 sm:p-8">
                  <span className="text-sm font-black text-[#08777a]">0{index + 1}</span>
                  <h3 className="mt-8 text-2xl font-black"><T locale={locale} block value={gain.title} /></h3>
                  <p className="mt-4 font-semibold leading-7 text-[#385463]"><T locale={locale} block value={gain.text} /></p>
                </article>
              ))}
            </div>
            <PhotoSlot locale={locale} number="07" label={copy("Le détail technique", "التفصيل التقني", "The technical detail")} className="lg:col-span-7 lg:min-h-72" />
            <PhotoSlot locale={locale} number="08" label={copy("Finir le round", "إنهاء الجولة", "Finish the round")} className="lg:col-span-5 lg:min-h-72" />
          </div>

          <div className="copy-align mt-10 flex flex-col gap-5 border-l-4 border-[#d9ff45] bg-[#071923] p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h3 className="text-3xl font-black"><T locale={locale} block value={copy("Tu n’as pas besoin d’attendre d’être prêt.", "لا تحتاج إلى الانتظار حتى تصبح جاهزا.", "You do not need to wait until you are ready.")} /></h3>
              <p className="mt-3 font-semibold text-[#c5d4db]"><T locale={locale} block value={copy("Le premier cours sert justement à commencer. Viens comme tu es, on s’occupe de la suite.", "الحصة الأولى موجودة لتبدأ. تعال كما أنت ونحن نهتم بالباقي.", "That is what the first class is for. Come as you are and we will handle the rest.")} /></p>
            </div>
            <a href={trialWhatsappHref} className="inline-flex h-13 shrink-0 items-center justify-center rounded-md bg-[#d9ff45] px-6 text-sm font-black uppercase text-[#071923]"><T locale={locale} value={copy("Je choisis mon cours", "أختار حصتي", "Choose my class")} /></a>
          </div>
        </div>
      </section>

      <section className="bg-[#071923] py-14 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="copy-align flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase text-[#d9ff45]"><T locale={locale} value={copy("Dans le garage", "داخل القاعة", "Inside the garage")} /></p>
              <h2 className="mt-3 text-4xl font-black sm:text-6xl"><T locale={locale} block value={copy("Regarde l’énergie. Imagine-toi dans le prochain round.", "شاهد الطاقة. تخيل نفسك في الجولة القادمة.", "See the energy. Picture yourself in the next round.")} /></h2>
            </div>
            <p className="max-w-sm font-bold leading-7 text-[#c5d4db]"><T locale={locale} block value={copy("Du travail sérieux, une bonne ambiance et des partenaires qui veulent progresser avec toi.", "عمل جدي، أجواء جيدة وشركاء يريدون التقدم معك.", "Serious work, a good atmosphere and training partners who want to improve with you.")} /></p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
            <PhotoSlot locale={locale} number="09" label={copy("Technique BJJ", "تقنية الجيوجيتسو", "BJJ technique")} className="lg:col-span-7 lg:min-h-96" />
            <PhotoSlot locale={locale} number="10" label={copy("Takedowns", "الإسقاطات", "Takedowns")} className="lg:col-span-5 lg:min-h-96" />
            <PhotoSlot locale={locale} number="11" label={copy("Équipe", "الفريق", "Team")} className="lg:col-span-4" />
            <PhotoSlot locale={locale} number="12" label={copy("No-gi", "نو-غي", "No-gi")} className="lg:col-span-4" />
            <PhotoSlot locale={locale} number="13" label={copy("Après le round", "بعد الجولة", "After the round")} className="lg:col-span-4" />
          </div>
        </div>
      </section>

      <section className="bg-[#f2f7fa] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="copy-align grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase text-[#08777a]"><T locale={locale} value={copy("Tu viens seul. Tu ne t’entraînes jamais seul.", "تأتي وحدك. لكنك لا تتدرب وحدك أبدا.", "You arrive alone. You never train alone.")} /></p>
              <h2 className="mt-3 text-4xl font-black sm:text-6xl"><T locale={locale} block value={copy("Une équipe qui travaille dur sans jouer les durs", "فريق يتدرب بقوة دون استعراض", "A team that trains hard without acting tough")} /></h2>
            </div>
            <p className="text-lg font-bold leading-8 text-[#385463]"><T locale={locale} block value={copy("Le bon partenaire ne cherche pas à te prouver quelque chose. Il te donne une résistance honnête, protège ton apprentissage et te pousse juste assez pour que tu progresses.", "الشريك الجيد لا يحاول إثبات شيء عليك. يعطيك مقاومة حقيقية، يحمي تعلمك ويدفعك بالقدر الذي يجعلك تتطور.", "A good partner is not trying to prove something against you. They give honest resistance, protect your learning and push just enough to help you improve.")} /></p>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-12">
            <PhotoSlot locale={locale} number="14" label={copy("Accueil des débutants", "استقبال المبتدئين", "Welcoming beginners")} className="lg:col-span-4 lg:min-h-80" />
            <PhotoSlot locale={locale} number="15" label={copy("Partenaires de round", "شركاء الجولة", "Round partners")} className="lg:col-span-8 lg:min-h-80" />
            <PhotoSlot locale={locale} number="16" label={copy("Conseils du coach", "نصائح المدرب", "Coach feedback")} className="lg:col-span-7 lg:min-h-80" />
            <PhotoSlot locale={locale} number="17" label={copy("Photo d’équipe", "صورة الفريق", "Team photo")} className="lg:col-span-5 lg:min-h-80" />
          </div>

          <div className="mt-10 grid border-l border-t border-[#9fb3bd] md:grid-cols-3">
            {[
              {
                title: copy("Respect d’abord", "الاحترام أولا", "Respect first"),
                text: copy("On s’entraîne sérieusement, on contrôle son intensité et on prend soin de ses partenaires.", "نتدرب بجدية، نتحكم في الشدة ونحافظ على سلامة شركائنا.", "Train seriously, control the intensity and look after your partners."),
              },
              {
                title: copy("L’ego reste dehors", "اترك الأنا في الخارج", "Leave the ego outside"),
                text: copy("Taper, recommencer et poser une question font partie du travail. C’est comme ça qu’on devient bon.", "الاستسلام، المحاولة من جديد وطرح الأسئلة جزء من التدريب. هكذا تصبح أفضل.", "Tap, restart and ask questions. That is part of the work and how you get good."),
              },
              {
                title: copy("Chacun fait avancer l’autre", "كل شخص يطور الآخر", "Everyone moves the team forward"),
                text: copy("Débutant ou confirmé, tu apportes quelque chose au round et tu repars avec quelque chose de nouveau.", "مبتدئا أو متقدما، تضيف شيئا للجولة وتغادر بشيء جديد.", "Beginner or experienced, you bring something to the round and leave with something new."),
              },
            ].map((item) => (
              <article key={item.title.fr} className="copy-align border-b border-r border-[#9fb3bd] bg-white p-6 sm:p-8">
                <h3 className="text-2xl font-black"><T locale={locale} block value={item.title} /></h3>
                <p className="mt-4 font-semibold leading-7 text-[#385463]"><T locale={locale} block value={item.text} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d9ff45] py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="copy-align">
            <p className="text-sm font-black uppercase"><T locale={locale} value={copy("Ton premier cours", "حصتك الأولى", "Your first class")} /></p>
            <h2 className="mt-3 text-4xl font-black sm:text-6xl"><T locale={locale} block value={copy("Viens. Apprends. Fais ton premier round.", "تعال. تعلم. خض أول جولة.", "Show up. Learn. Do your first round.")} /></h2>
          </div>
          <div className="grid gap-px bg-[#071923]">
            {[
              copy("Écris-nous sur WhatsApp. On te donne le bon créneau.", "راسلنا على واتساب ونحدد لك الوقت المناسب.", "Message us on WhatsApp. We give you the right class time."),
              copy("Viens en tenue de sport. Aucun équipement compliqué.", "تعال بملابس رياضية. لا معدات معقدة.", "Come in sportswear. No complicated gear."),
              copy("Apprends les bases, fais ton premier round, repars avec une vraie envie de revenir.", "تعلم الأساسيات، خض أول جولة وارجع برغبة حقيقية في العودة.", "Learn the basics, do your first round and leave wanting to come back."),
            ].map((step, index) => (
              <div key={step.fr} className="copy-align grid grid-cols-[3rem_1fr] gap-4 bg-[#d9ff45] py-5">
                <span className="text-2xl font-black">0{index + 1}</span>
                <p className="text-xl font-black leading-snug"><T locale={locale} block value={step} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="bg-[#071923] py-14 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="copy-align mb-10 max-w-4xl">
            <p className="text-sm font-black uppercase text-[#d9ff45]"><T locale={locale} value={copy("Planning en direct", "البرنامج المباشر", "Live schedule")} /></p>
            <h2 className="mt-3 text-4xl font-black sm:text-6xl"><T locale={locale} block value={copy("Horaires BJJ et lutte à Tunis", "مواعيد الجيوجيتسو والمصارعة في تونس", "BJJ and wrestling schedule in Tunis")} /></h2>
            <p className="mt-4 max-w-2xl font-semibold text-[#c5d4db]"><T locale={locale} block value={copy("Choisis ton créneau. Pour un premier cours, écris-nous avant de venir: on te guide vers la séance qui te correspond.", "اختر وقتك. للحصة الأولى راسلنا قبل الحضور لنوجهك إلى الحصة المناسبة.", "Pick your time. For a first class, message us before coming and we will guide you to the right session.")} /></p>
          </div>
          <AgendaDisplay locale={locale} />
        </div>
      </section>

      <section id="adresses" className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div className="copy-align border-l-4 border-[#d9ff45] pl-6">
            <p className="text-sm font-black uppercase text-[#08777a]"><T locale={locale} value={copy("Enfants 5 à 15 ans", "أطفال من 5 إلى 15 سنة", "Children aged 5 to 15")} /></p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl"><T locale={locale} block value={copy("De l’énergie, mais avec du contrôle", "طاقة مع تحكم", "Energy with control")} /></h2>
            <p className="mt-5 font-semibold leading-7 text-[#385463]"><T locale={locale} block value={copy("Des groupes adaptés à leur âge pour développer coordination, écoute, confiance et respect. Ils bougent, apprennent et rentrent fiers de ce qu’ils savent faire.", "مجموعات حسب العمر لتطوير التنسيق والإصغاء والثقة والاحترام. يتحركون ويتعلمون ويعودون فخورين بما أنجزوه.", "Age-based groups that build coordination, listening, confidence and respect. They move, learn and go home proud of what they can do.")} /></p>
            <PhotoSlot locale={locale} number="18" label={copy("Cours enfants", "حصص الأطفال", "Kids class")} className="mt-8 min-h-80" />
          </div>
          <div className="copy-align border-l-4 border-[#08777a] pl-6">
            <p className="text-sm font-black uppercase text-[#08777a]"><T locale={locale} value={copy("Hay Rafaha, Tunis", "حي الرفاهة، تونس", "Hay Rafaha, Tunis")} /></p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl"><T locale={locale} block value={copy("Un vrai club. Une vraie équipe. À Tunis.", "ناد حقيقي. فريق حقيقي. في تونس.", "A real club. A real team. In Tunis.")} /></h2>
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="mt-5 block font-semibold leading-7 text-[#385463] underline decoration-[#d9ff45] decoration-4 underline-offset-4">{address.display}</a>
            <a href={phoneHref} className="mt-5 inline-block text-xl font-black underline decoration-[#d9ff45] decoration-4 underline-offset-4">{phoneDisplay}</a>
            <PhotoSlot locale={locale} number="19" label={copy("Le club à Hay Rafaha", "النادي في حي الرفاهة", "The club in Hay Rafaha")} className="mt-8 min-h-80" />
          </div>
        </div>
      </section>

      <section className="border-y border-[#c7d5dc] bg-[#f2f7fa] py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="copy-align text-4xl font-black"><T locale={locale} block value={copy("Avant de monter sur le tapis", "قبل الصعود إلى البساط", "Before stepping on the mat")} /></h2>
          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {faqs.map(({ question, answer }) => (
              <article key={question.fr} className="copy-align border border-[#9fb3bd] bg-white p-6">
                <h3 className="text-xl font-black"><T locale={locale} block value={question} /></h3>
                <p className="mt-4 font-semibold leading-7 text-[#385463]"><T locale={locale} block value={answer} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#08777a] py-14 text-white lg:py-20">
        <div className="copy-align mx-auto max-w-5xl px-5 text-center sm:px-8">
          <p className="text-sm font-black uppercase text-[#d9ff45]"><T locale={locale} value={copy("Assez repoussé", "كفاك تأجيلا", "Stop putting it off")} /></p>
          <h2 className="mt-4 text-5xl font-black leading-none sm:text-7xl"><T locale={locale} block value={copy("Ton premier round commence à Tunis", "أول جولة لك تبدأ في تونس", "Your first round starts in Tunis")} /></h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold text-white/85"><T locale={locale} block value={copy("Envoie “je veux essayer”. On te donne le bon créneau. Ensuite, place au tapis.", "اكتب: أريد أن أجرب. نعطيك الوقت المناسب. ثم نلتقي على البساط.", "Send “I want to try.” We give you the right time. Then it is time to hit the mat.")} /></p>
          <a href={trialWhatsappHref} className="mt-8 inline-flex h-14 items-center justify-center rounded-md bg-[#d9ff45] px-8 text-sm font-black uppercase text-[#071923]"><T locale={locale} value={copy("Commencer sur WhatsApp", "ابدأ عبر واتساب", "Start on WhatsApp")} /></a>
        </div>
      </section>

      <footer className="bg-[#071923] py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4"><BrandLogo inverted className="h-16 w-auto" /><strong>{businessName}</strong></div>
          <p className="text-sm font-semibold text-[#c5d4db]"><T locale={locale} value={copy("BJJ • Grappling • Wrestling • Tunis, Tunisie", "جيوجيتسو • غرابلينغ • مصارعة • تونس", "BJJ • Grappling • Wrestling • Tunis, Tunisia")} /></p>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50 hidden w-48 gap-2 sm:grid">
        <a href={trialWhatsappHref} className="flex h-12 items-center justify-center rounded-md bg-[#d9ff45] px-4 text-sm font-black uppercase text-[#071923] shadow-xl ring-1 ring-[#071923]/20">WhatsApp</a>
        <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center rounded-md bg-[#08777a] px-4 text-sm font-black uppercase text-white shadow-xl ring-1 ring-[#071923]/20"><T locale={locale} value={copy("Itinéraire", "الاتجاهات", "Directions")} /></a>
        <a href={phoneHref} aria-label={copy(`Appeler Grappling Garage au ${phoneDisplay}`, `اتصل بـ Grappling Garage على ${phoneDisplay}`, `Call Grappling Garage at ${phoneDisplay}`)[locale]} className="flex h-12 items-center justify-center rounded-md bg-white px-4 text-sm font-black uppercase text-[#071923] shadow-xl ring-1 ring-[#071923]/20"><T locale={locale} value={copy("Appeler", "اتصل", "Call")} /></a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-px bg-[#071923] p-2 sm:hidden">
        <a href={phoneHref} className="flex h-12 items-center justify-center bg-white px-1 text-xs font-black uppercase text-[#071923]"><T locale={locale} value={copy("Appeler", "اتصل", "Call")} /></a>
        <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center bg-[#08777a] px-1 text-xs font-black uppercase text-white"><T locale={locale} value={copy("Itinéraire", "الاتجاهات", "Directions")} /></a>
        <a href={trialWhatsappHref} className="flex h-12 items-center justify-center bg-[#d9ff45] px-1 text-xs font-black uppercase text-[#071923]">WhatsApp</a>
      </div>
    </main>
  );
}
