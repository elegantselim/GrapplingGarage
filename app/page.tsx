import type { Metadata } from "next";
import Link from "next/link";
import { AgendaDisplay } from "./employe.jsx";
import {
  address,
  businessName,
  phoneDisplay,
  phoneE164,
  phoneHref,
  seoDescription,
  services,
  siteUrl,
  whatsappHref,
} from "./seo";

type Copy = {
  fr: string;
  ar: string;
  en: string;
};

const copy = (fr: string, ar: string, en: string): Copy => ({ fr, ar, en });

function T({
  value,
  block = false,
  className = "",
}: {
  value: Copy;
  block?: boolean;
  className?: string;
}) {
  const mode = block ? "lang-block" : "lang-inline";

  return (
    <>
      <span className={`lang-copy lang-fr ${mode} ${className}`}>
        {value.fr}
      </span>
      <span
        dir="rtl"
        lang="ar"
        className={`lang-copy lang-ar ${mode} ${className}`}
      >
        {value.ar}
      </span>
      <span
        lang="en"
        className={`lang-copy lang-en ${mode} ${className}`}
      >
        {value.en}
      </span>
    </>
  );
}

const gallery = [
  {
    label: copy("Tapis principal", "البساط الرئيسي", "Main mat"),
    color: "bg-[#bfefff]",
    detail: copy(
      "Là où les premiers rounds commencent",
      "هنا تبدأ أول الجولات بثقة",
      "Where first rounds begin",
    ),
  },
  {
    label: copy("BJJ adultes", "جيوجيتسو للكبار", "Adult BJJ"),
    color: "bg-[#a8d8ff]",
    detail: copy(
      "Technique, calme et contrôle",
      "تقنية، هدوء وسيطرة",
      "Technique, calm and control",
    ),
  },
  {
    label: copy("Fitness", "لياقة بدنية", "Fitness"),
    color: "bg-[#f5d48a]",
    detail: copy(
      "Un corps plus solide, séance après séance",
      "جسم أقوى مع كل حصة",
      "A stronger body, one session at a time",
    ),
  },
  {
    label: copy("No-gi rounds", "جولات نو-غي", "No-gi rounds"),
    color: "bg-[#d7f8f0]",
    detail: copy(
      "Apprendre à rester lucide sous pression",
      "تعلم الهدوء تحت الضغط",
      "Learning to stay clear under pressure",
    ),
  },
  {
    label: copy("Coachs", "المدربون", "Coaches"),
    color: "bg-[#c8f1ff]",
    detail: copy(
      "Des consignes simples et proches",
      "توجيه واضح وقريب",
      "Simple, close coaching",
    ),
  },
  {
    label: copy("Progression", "تطور", "Progress"),
    color: "bg-[#d7f8f0]",
    detail: copy(
      "Des bases claires, puis des victoires visibles",
      "أساسيات واضحة ثم تقدم ملموس",
      "Clear basics, then visible wins",
    ),
  },
  {
    label: copy("Open mat", "تدريب مفتوح", "Open mat"),
    color: "bg-[#9ce3df]",
    detail: copy(
      "Pratiquer, tester, progresser",
      "تدرّب، جرّب، وتطوّر",
      "Practice, test, progress",
    ),
  },
  {
    label: copy("Le garage", "القاعة", "The garage"),
    color: "bg-[#e8f5ff]",
    detail: copy(
      "Un lieu à compléter avec vos photos",
      "مكان ستظهر صوره قريبا",
      "Ready for your real photos",
    ),
  },
  {
    label: copy("Équipe", "الفريق", "Team"),
    color: "bg-[#cfe0ff]",
    detail: copy(
      "Débutants, réguliers, coachs et énergie collective",
      "مبتدئون، مواظبون، مدربون وطاقة جماعية",
      "Beginners, regulars, coaches, and team energy",
    ),
  },
];

const programs = [
  {
    title: copy("Wrestling", "المصارعة", "Wrestling"),
    kicker: copy("Lutte", "تحكم وثبات", "Stand-up control"),
    text: copy(
      "Tu veux être plus stable, plus explosif, moins perdu quand quelqu’un te saisit ? La lutte t’apprend à tenir debout, entrer proprement, défendre, et sentir que ton corps répond enfin.",
      "هل تريد ثباتا أكثر، قوة في الحركة، وهدوءا عندما يمسك بك شخص؟ المصارعة تعلّمك الوقوف بثقة، الدخول بطريقة صحيحة، الدفاع، والشعور أن جسمك يستجيب.",
      "Want to feel more stable, explosive, and less lost when someone grabs you? Wrestling teaches you how to stand strong, enter cleanly, defend, and feel your body respond.",
    ),
    points: [
      copy("Takedowns", "إسقاطات", "Takedowns"),
      copy("Équilibre", "توازن", "Balance"),
      copy("Confiance", "ثقة", "Confidence"),
    ],
  },
  {
    title: copy("Brazilian Jiu-Jitsu", "الجيوجيتسو البرازيلية", "Brazilian Jiu-Jitsu"),
    kicker: copy("BJJ", "تقنية وهدوء", "Technique and calm"),
    text: copy(
      "Tu veux apprendre à te défendre sans brutalité ? Le BJJ te donne du calme sous pression: respirer, contrôler, sortir d’une mauvaise position, et comprendre qu’un petit détail peut tout changer.",
      "هل تريد تعلم الدفاع عن نفسك دون عنف زائد؟ الجيوجيتسو تمنحك هدوءا تحت الضغط: تنفس، سيطرة، خروج من الوضعيات الصعبة، وفهم أن تفصيلا صغيرا يغيّر كل شيء.",
      "Want to learn self-defense without ego or brutality? BJJ gives you calm under pressure: breathe, control, escape bad positions, and learn how one small detail can change everything.",
    ),
    points: [
      copy("Gi & no-gi", "بدون و مع الكيمونو", "Gi & no-gi"),
      copy("Contrôle", "سيطرة", "Control"),
      copy("Soumissions", "إخضاعات", "Submissions"),
    ],
  },
  {
    title: copy("Fitness", "لياقة بدنية", "Fitness"),
    kicker: copy("Force utile", "قوة نافعة", "Useful strength"),
    text: copy(
      "Tu n’aimes pas les salles de fitness froides ou répétitives ? Ici, tu bouges avec un but: plus de souffle, plus de force, moins de raideur, et cette sensation de reprendre ton corps en main.",
      "لا تحب قاعات اللياقة الباردة أو التمارين المملة؟ هنا تتحرك بهدف: نفس أفضل، قوة أكثر، تيبس أقل، وإحساس أنك تستعيد السيطرة على جسمك.",
      "Do regular gyms feel cold or repetitive? Here you move with purpose: more cardio, more strength, less stiffness, and the feeling that your body is yours again.",
    ),
    points: [
      copy("Force", "قوة", "Strength"),
      copy("Mobilité", "مرونة", "Mobility"),
      copy("Cardio", "تحمّل", "Cardio"),
    ],
  },
];

const audiences = [
  {
    title: copy("Kids", "الأطفال", "Kids"),
    text: copy(
      "Ton enfant a trop d’énergie, manque de confiance, ou a besoin d’un cadre positif ? Ici, il apprend à bouger, écouter, se contrôler, tomber sans peur et respecter les autres.",
      "هل طفلك كثير الحركة، يحتاج إلى ثقة أكثر أو إلى إطار إيجابي؟ هنا يتعلم الحركة، الإصغاء، التحكم في نفسه، الوقوع دون خوف واحترام الآخرين.",
      "Does your child have too much energy, low confidence, or need a positive structure? Here they learn to move, listen, control themselves, fall without fear, and respect others.",
    ),
  },
  {
    title: copy("Adults", "الكبار", "Adults"),
    text: copy(
      "Tu veux perdre la peur de commencer, retrouver la forme, apprendre à te défendre ou juste sortir du stress ? Tu viens à ton niveau. On ne te juge pas, on te construit.",
      "هل تريد تجاوز خوف البداية، استعادة لياقتك، تعلم الدفاع عن نفسك أو الخروج من الضغط؟ تأتي بمستواك. لا نحكم عليك، بل نبنيك خطوة بخطوة.",
      "Want to get past the fear of starting, get fit again, learn self-defense, or escape stress? You come at your level. We do not judge you, we build with you.",
    ),
  },
];

const steps = [
  copy(
    "Écris: “je veux essayer”.",
    "اكتب: أريد أن أجرب.",
    "Send: “I want to try”.",
  ),
  copy(
    "On te dit quoi porter et quand venir.",
    "نخبرك ماذا ترتدي ومتى تأتي.",
    "We tell you what to wear and when to come.",
  ),
  copy(
    "Tu fais le premier cours sans pression.",
    "تقوم بأول حصة دون ضغط.",
    "You take the first class with no pressure.",
  ),
];

const needs = [
  {
    title: copy(
      "Je veux apprendre à me défendre",
      "أريد أن أتعلم الدفاع عن نفسي",
      "I want to learn self-defense",
    ),
    text: copy(
      "On t’apprend à rester calme, à créer de l’espace et à reprendre le contrôle sans jouer au dur.",
      "نعلّمك كيف تبقى هادئا، تخلق مساحة، وتستعيد السيطرة دون تمثيل القوة.",
      "We teach you how to stay calm, create space, and regain control without acting tough.",
    ),
  },
  {
    title: copy(
      "Je veux me remettre en forme",
      "أريد استعادة لياقتي",
      "I want to get fit again",
    ),
    text: copy(
      "Tu ne fais pas des exercices au hasard. Tu luttes, tu bouges, tu transpires, et ton corps comprend pourquoi.",
      "لا تقوم بتمارين عشوائية. تصارع، تتحرك، تتعب، وجسمك يفهم لماذا.",
      "You are not doing random exercises. You wrestle, move, sweat, and your body understands why.",
    ),
  },
  {
    title: copy(
      "J’ai peur d’être ridicule",
      "أخاف أن أبدو مضحكا",
      "I am afraid I will look silly",
    ),
    text: copy(
      "C’est normal. Le cours est fait pour les vrais débuts: explications simples, rythme progressif, partenaires respectueux.",
      "هذا طبيعي. الحصة مصممة للبدايات الحقيقية: شرح بسيط، نسق تدريجي، وشركاء محترمون.",
      "That is normal. The class is built for real beginnings: simple explanations, gradual pace, respectful partners.",
    ),
  },
];

const places = [address.display];

const localReasons = [
  copy(
    "Un club accessible à Hay Rafaha, Tunis, pour t’entraîner sans perdre une demi-journée dans le trajet.",
    "ناد في حي الرفاهة، تونس، لتتدرب دون أن تضيع نصف يومك في الطريق.",
    "A club in Hay Rafaha, Tunis, so training does not cost you half a day in traffic.",
  ),
  copy(
    "Un premier contact simple par WhatsApp avant de venir: horaire, entrée, tenue, tout est confirmé.",
    "تواصل بسيط على واتساب قبل القدوم: الوقت، المدخل، اللباس، كل شيء نؤكده لك.",
    "A simple WhatsApp check before coming: time, entrance, clothing, everything confirmed.",
  ),
  copy(
    "Des cours pensés pour les vrais débutants comme pour ceux qui veulent pousser plus loin.",
    "حصص مناسبة للبدايات الحقيقية ولمن يريد التطور أكثر.",
    "Classes built for real beginners and for people who want to push further.",
  ),
];

const faqItems = [
  {
    question: copy(
      "Je n’ai jamais fait de sport de combat. Est-ce que je peux venir ?",
      "لم أمارس رياضة قتالية من قبل. هل يمكنني القدوم؟",
      "I have never trained combat sports. Can I come?",
    ),
    answer: copy(
      "Oui. Les cours sont pensés pour expliquer clairement, progresser par étapes et éviter l’ambiance intimidante. Tu viens pour apprendre, pas pour prouver quelque chose.",
      "نعم. الحصص مبنية على شرح واضح وتدرج في النسق دون أجواء مخيفة. تأتي لتتعلم، لا لتثبت شيئا.",
      "Yes. Classes are built around clear explanations, gradual progress, and a non-intimidating atmosphere. You come to learn, not to prove anything.",
    ),
  },
  {
    question: copy(
      "Quelle est la différence entre wrestling, BJJ et fitness ?",
      "ما الفرق بين المصارعة، الجيوجيتسو واللياقة؟",
      "What is the difference between wrestling, BJJ, and fitness?",
    ),
    answer: copy(
      "Le wrestling t’apprend à contrôler debout et à défendre les projections. Le BJJ t’apprend à contrôler au sol et à rester calme sous pression. Le fitness renforce ton souffle, ta mobilité et ta condition physique.",
      "المصارعة تعلمك التحكم واقفا والدفاع ضد الإسقاطات. الجيوجيتسو تعلمك السيطرة أرضا والهدوء تحت الضغط. اللياقة تقوي النفس، الحركة والبدن.",
      "Wrestling teaches stand-up control and takedown defense. BJJ teaches ground control and calm under pressure. Fitness builds cardio, mobility, and conditioning.",
    ),
  },
  {
    question: copy(
      "Où se trouve Grappling Garage à Tunis ?",
      "أين يوجد Grappling Garage في تونس؟",
      "Where is Grappling Garage in Tunis?",
    ),
    answer: copy(
      "Le club est à Rue Abdallah Farhat, Hay Rafaha, Tunis, Tunisie. Avant ton premier cours, écris-nous pour confirmer le créneau et l’entrée.",
      "النادي في نهج عبد الله فرحات، حي الرفاهة، تونس. قبل أول حصة، راسلنا لتأكيد الوقت والمدخل.",
      "The club is at Rue Abdallah Farhat, Hay Rafaha, Tunis, Tunisia. Before your first class, message us to confirm the time and entrance.",
    ),
  },
  {
    question: copy(
      "Est-ce adapté aux enfants ?",
      "هل الحصص مناسبة للأطفال؟",
      "Is it suitable for children?",
    ),
    answer: copy(
      "Oui. La section enfants est pensée pour canaliser l’énergie, développer l’écoute, le respect, la coordination et la confiance, sans casser la personnalité de l’enfant.",
      "نعم. قسم الأطفال مخصص لتوجيه الطاقة، تطوير الإصغاء، الاحترام، التناسق والثقة دون كسر شخصية الطفل.",
      "Yes. The children section is built to channel energy, develop listening, respect, coordination, and confidence without breaking the child’s personality.",
    ),
  },
];

export const metadata: Metadata = {
  title: "Club de Grappling à Tunis | BJJ, Wrestling et Fitness",
  description: seoDescription,
  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SportsActivityLocation", "LocalBusiness"],
      "@id": `${siteUrl}/#grappling-garage`,
      name: businessName,
      url: siteUrl,
      telephone: phoneE164,
      description: seoDescription,
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        addressCountry: address.addressCountry,
      },
      areaServed: [
        {
          "@type": "City",
          name: "Tunis",
        },
        {
          "@type": "Country",
          name: "Tunisia",
        },
      ],
      sport: ["Wrestling", "Brazilian Jiu-Jitsu", "Grappling", "Fitness"],
      knowsAbout: services,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: phoneE164,
        contactType: "customer service",
        areaServed: "TN",
        availableLanguage: ["French", "Arabic", "English"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Cours Grappling Garage à Tunis",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
            areaServed: "Tunis",
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: businessName,
      url: siteUrl,
      inLanguage: ["fr-TN", "ar-TN", "en"],
      about: {
        "@id": `${siteUrl}/#grappling-garage`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question.fr,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer.fr,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#eef8ff] pb-20 text-[#061826] sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <style>{`
        .lang-control { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
        .lang-copy { display: none; }
        main:has(#lang-fr:checked) .lang-fr.lang-inline,
        main:has(#lang-ar:checked) .lang-ar.lang-inline,
        main:has(#lang-en:checked) .lang-en.lang-inline { display: inline; }
        main:has(#lang-fr:checked) .lang-fr.lang-block,
        main:has(#lang-ar:checked) .lang-ar.lang-block,
        main:has(#lang-en:checked) .lang-en.lang-block { display: block; }
        main:has(#lang-fr:checked) .lang-button-fr,
        main:has(#lang-ar:checked) .lang-button-ar,
        main:has(#lang-en:checked) .lang-button-en { background: #f5d48a; color: #061826; }
        main:has(#lang-ar:checked) .copy-align { text-align: right; }
      `}</style>

      <div className="site">
        <section className="relative overflow-hidden bg-[#061826] text-white">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[#eef8ff]" />
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#0ea5a4]/30 blur-3xl" />
          <div className="absolute bottom-24 right-0 h-72 w-72 rounded-full bg-[#2f80ed]/25 blur-3xl" />

          <div className="relative mx-auto grid min-h-[92svh] max-w-7xl content-between gap-8 px-5 py-5 sm:px-8 lg:min-h-[760px] lg:grid-cols-[0.92fr_1fr] lg:gap-10 lg:py-8">
            <nav
              aria-label="Navigation principale"
              className="flex items-center justify-between gap-4"
            >
              <a
                href="#top"
                className="text-base font-black uppercase tracking-normal"
              >
                Grappling Garage
              </a>
              <div
                aria-label="Choisir la langue"
                className="flex rounded-full bg-white/10 p-1 text-xs font-black text-white shadow-sm ring-1 ring-white/15"
              >
                <label className="lang-button-fr cursor-pointer rounded-full px-3 py-2">
                  <input
                    id="lang-fr"
                    className="lang-control"
                    type="radio"
                    name="language"
                    defaultChecked
                  />
                  FR
                </label>
                <label
                  className="lang-button-ar cursor-pointer rounded-full px-3 py-2"
                  dir="rtl"
                  lang="ar"
                >
                  <input
                    id="lang-ar"
                    className="lang-control"
                    type="radio"
                    name="language"
                  />
                  عربي
                </label>
                <label
                  className="lang-button-en cursor-pointer rounded-full px-3 py-2"
                  lang="en"
                >
                  <input
                    id="lang-en"
                    className="lang-control"
                    type="radio"
                    name="language"
                  />
                  EN
                </label>
              </div>
            </nav>

            <div
              id="top"
              className="copy-align grid content-center gap-8 py-8 lg:col-start-1 lg:py-14"
            >
              <div className="space-y-5">
                <p className="w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-black uppercase text-[#c8f1ff] shadow-sm ring-1 ring-white/15">
                  <T
                    value={copy(
                      "Wrestling • BJJ • Fitness",
                      "مصارعة • جيوجيتسو • لياقة",
                      "Wrestling • BJJ • Fitness",
                    )}
                  />
                </p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal sm:text-7xl lg:text-8xl">
                  <T
                    block
                    value={copy(
                      "Apprends à te sentir capable.",
                      "تعلّم أن تشعر أنك قادر.",
                      "Learn to feel capable.",
                    )}
                  />
                </h1>
                <div className="grid gap-3 text-xl font-extrabold leading-tight text-[#e8f5ff] sm:text-2xl">
                  <T
                    block
                    value={copy(
                      "Wrestling, BJJ et fitness à Tunis, dans une ambiance qui te pousse sans t’écraser.",
                      "مصارعة، جيوجيتسو ولياقة في تونس، في أجواء تدفعك للأمام دون ضغط زائد.",
                      "Wrestling, BJJ, and fitness in Tunis, in a place that pushes you without crushing you.",
                    )}
                  />
                </div>
                <p className="max-w-2xl text-base font-semibold leading-7 text-[#b9d8e8]">
                  <T
                    block
                    value={copy(
                      "Si tu repousses depuis des mois, c’est probablement parce que tu imagines que tu dois déjà être en forme. Ici, tu viens pour le devenir.",
                      "إذا كنت تؤجل منذ أشهر، فربما لأنك تظن أنك يجب أن تكون جاهزا من البداية. هنا تأتي لتصبح جاهزا.",
                      "If you have been postponing for months, it is probably because you think you need to be fit first. Here, you come to become fit.",
                    )}
                  />
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#0ea5a4] px-6 text-sm font-black uppercase text-white shadow-sm transition hover:translate-y-[-1px]"
                >
                  <T
                    value={copy(
                      "Écrire sur WhatsApp",
                      "راسلنا على واتساب",
                      "Message on WhatsApp",
                    )}
                  />
                </a>
                <a
                  href="#agenda"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-black uppercase text-[#061826] shadow-sm transition hover:translate-y-[-1px]"
                >
                  <T value={copy("Voir les cours", "شاهد الحصص", "See classes")} />
                </a>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-3 pb-8 lg:col-start-2 lg:row-span-2 lg:self-center lg:pb-0">
              {gallery.slice(0, 4).map((item, index) => (
                <figure
                  key={item.label.fr}
                  className={`${item.color} aspect-[4/5] overflow-hidden rounded-lg border-4 border-white/80 text-[#061826] shadow-sm`}
                >
                  <div className="flex h-full flex-col justify-between p-4">
                    <span className="w-fit rounded-full bg-white/90 px-3 py-2 text-xs font-black uppercase">
                      <T
                        value={copy(
                          `Photo ${index + 1}`,
                          `صورة ${index + 1}`,
                          `Photo ${index + 1}`,
                        )}
                      />
                    </span>
                    <figcaption className="copy-align">
                      <p className="text-lg font-black">
                        <T value={item.label} />
                      </p>
                      <p className="mt-1 text-xs font-bold text-[#25465c]">
                        <T block value={item.detail} />
                      </p>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="copy-align mb-6 max-w-3xl">
            <p className="text-sm font-black uppercase text-[#0e7490]">
              <T
                value={copy(
                  "Ce que tu vas gagner",
                  "ما الذي ستكسبه",
                  "What you gain",
                )}
              />
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
              <T
                block
                value={copy(
                  "Chaque séance doit te donner quelque chose de réel.",
                  "كل حصة يجب أن تمنحك شيئا حقيقيا.",
                  "Every session should give you something real.",
                )}
              />
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-[#31556d]">
              <T
                block
                value={copy(
                  "Pas seulement transpirer. Comprendre une technique. Sentir ton souffle revenir. Te dire en sortant: aujourd’hui, j’ai avancé.",
                  "ليس مجرد تعب. بل فهم تقنية، الشعور بتحسن النفس، والخروج بفكرة: اليوم تقدمت.",
                  "Not just sweating. Understanding a technique. Feeling your breath come back. Leaving with the thought: today, I moved forward.",
                )}
              />
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.title.fr}
                className="copy-align rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#c9e3f2]"
              >
                <p className="text-sm font-black uppercase text-[#0e7490]">
                  <T value={program.kicker} />
                </p>
                <h3 className="mt-6 text-3xl font-black">
                  <T block value={program.title} />
                </h3>
                <p className="mt-4 text-base font-semibold leading-7 text-[#31556d]">
                  <T block value={program.text} />
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {program.points.map((point) => (
                    <li
                      key={point.fr}
                      className="rounded-full bg-[#e4f7ff] px-3 py-2 text-xs font-black uppercase text-[#0a4965]"
                    >
                      <T value={point} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#0b2d46] py-12 text-white lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.78fr_1fr] lg:items-start">
            <div className="copy-align max-w-xl">
              <p className="text-sm font-black uppercase text-[#7ee7e0]">
                <T
                  value={copy(
                    "Ce que tu viens chercher",
                    "ما الذي تبحث عنه",
                    "What you are really looking for",
                  )}
                />
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
                <T
                  block
                  value={copy(
                    "Pas un cours de plus. Une réponse à ce qui te bloque.",
                    "ليست مجرد حصة أخرى. بل إجابة لما يوقفك.",
                    "Not just another class. An answer to what is holding you back.",
                  )}
                />
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#c8e4f2]">
                <T
                  block
                  value={copy(
                    "Les gens ne cherchent pas seulement une discipline. Ils cherchent un endroit où reprendre confiance, apprendre quelque chose d’utile, et sentir qu’ils avancent vraiment.",
                    "الناس لا يبحثون فقط عن رياضة. يبحثون عن مكان يستعيدون فيه الثقة، يتعلمون شيئا نافعا، ويشعرون أنهم يتقدمون فعلا.",
                    "People are not only looking for a discipline. They are looking for a place to rebuild confidence, learn something useful, and feel real progress.",
                  )}
                />
              </p>
            </div>
            <div className="grid gap-4">
              {needs.map((need) => (
                <article
                  key={need.title.fr}
                  className="copy-align rounded-lg bg-[#eef8ff] p-6 text-[#061826]"
                >
                  <h3 className="text-2xl font-black">
                    <T block value={need.title} />
                  </h3>
                  <p className="mt-3 text-base font-semibold leading-7 text-[#31556d]">
                    <T block value={need.text} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="copy-align mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase text-[#0e7490]">
                <T value={copy("Ambiance", "الأجواء", "Vibe")} />
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
                <T
                  block
                  value={copy(
                    "Un garage, une équipe, beaucoup de petites victoires.",
                    "قاعة، فريق، وكثير من الانتصارات الصغيرة.",
                    "One garage, one team, many small wins.",
                  )}
                />
              </h2>
            </div>
            <p className="max-w-md text-sm font-semibold leading-6 text-[#31556d]">
              <T
                block
                value={copy(
                  "Les photos réelles remplaceront ces blocs: le tapis, les coachs, les rounds, la zone fitness et les moments où quelqu’un comprend enfin une technique.",
                  "الصور الحقيقية ستعوض هذه الأماكن: البساط، المدربون، الجولات، منطقة اللياقة، وتلك اللحظة الجميلة عندما يفهم أحدهم التقنية أخيرا.",
                  "Real photos will replace these blocks: the mat, coaches, rounds, fitness area, and the moment someone finally understands a technique.",
                )}
              />
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((item, index) => (
              <figure
                key={item.label.fr}
                className={`${item.color} aspect-square rounded-lg p-4 text-[#061826] shadow-sm ring-1 ring-white/60`}
              >
                <figcaption className="copy-align flex h-full flex-col justify-between">
                  <span className="text-xs font-black uppercase text-[#31556d]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong className="block text-base font-black">
                      <T value={item.label} />
                    </strong>
                    <span className="mt-1 block text-xs font-bold text-[#31556d]">
                      <T block value={item.detail} />
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="bg-[#c8f1ff] py-12 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:items-center">
            <div className="copy-align">
              <p className="text-sm font-black uppercase text-[#0e7490]">
                <T
                  value={copy(
                    "Section enfants",
                    "قسم الأطفال",
                    "Children section",
                  )}
                />
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
                <T
                  block
                  value={copy(
                    "Pour canaliser l’énergie sans casser la personnalité.",
                    "لتوجيه الطاقة دون كسر شخصية الطفل.",
                    "Channel energy without breaking personality.",
                  )}
                />
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#31556d]">
                <T block value={audiences[0].text} />
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                copy("Écouter", "الإصغاء", "Listen"),
                copy("Oser", "الشجاعة", "Try"),
                copy("Respecter", "الاحترام", "Respect"),
              ].map((value) => (
                <article
                  key={value.fr}
                  className="copy-align rounded-lg bg-white p-5 text-center shadow-sm ring-1 ring-white/70"
                >
                  <p className="text-2xl font-black text-[#061826]">
                    <T value={value} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#dff5ff] py-12 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div className="copy-align">
              <p className="text-sm font-black uppercase text-[#0e7490]">
                <T value={copy("Premier cours", "أول حصة", "First class")} />
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
                <T
                  block
                  value={copy(
                    "Simple: tu viens, on t’accueille, tu essayes.",
                    "ببساطة: تأتي، نستقبلك، وتجرب.",
                    "Simple: you show up, we welcome you, you try.",
                  )}
                />
              </h2>
            </div>
            <div className="grid gap-3">
              {steps.map((step, index) => (
                <article
                  key={step.fr}
                  className="copy-align grid gap-3 rounded-lg bg-white p-5 shadow-sm sm:grid-cols-[auto_1fr] sm:items-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0b2d46] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-base font-black text-[#061826]">
                    <T block value={step} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="adresses" className="bg-[#eef8ff] py-12 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.75fr_1fr]">
            <div className="copy-align">
              <p className="text-sm font-black uppercase text-[#0e7490]">
                <T value={copy("Adresses", "العناوين", "Locations")} />
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
                <T
                  block
                  value={copy(
                    "Grappling Garage est à Tunis, Hay Rafaha.",
                    "Grappling Garage في تونس، حي الرفاهة.",
                    "Grappling Garage is in Tunis, Hay Rafaha.",
                  )}
                />
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#31556d]">
                <T
                  block
                  value={copy(
                    "L’adresse du club est Rue Abdallah Farhat, Hay Rafaha, Tunis. Avant ton premier cours, écris-nous sur WhatsApp: on te confirme le créneau, l’entrée et ce qu’il faut apporter.",
                    "عنوان النادي هو نهج عبد الله فرحات، حي الرفاهة، تونس. قبل أول حصة، راسلنا على واتساب لنؤكد لك الوقت، المدخل، وما تحتاج إلى إحضاره.",
                    "The club address is Rue Abdallah Farhat, Hay Rafaha, Tunis. Before your first class, message us on WhatsApp so we confirm the time, entrance, and what to bring.",
                  )}
                />
              </p>
            </div>
            <div className="grid gap-3">
              {places.map((place, index) => (
                <article
                  key={place}
                  className="grid gap-3 rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#c9e3f2] sm:grid-cols-[auto_1fr_auto] sm:items-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c8f1ff] text-sm font-black">
                    {index + 1}
                  </span>
                  <div className="copy-align">
                    <h3 className="font-black">
                      <T
                        value={copy(
                          "Adresse du club",
                          "عنوان النادي",
                          "Club address",
                        )}
                      />
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-[#31556d]">
                      {place}
                    </p>
                  </div>
                  <a
                    href={whatsappHref}
                    className="text-sm font-black uppercase text-[#0e7490]"
                  >
                    <T value={copy("Confirmer", "تأكيد", "Confirm")} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="agenda" className="bg-[#061826] py-12 text-white lg:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="copy-align mb-6 max-w-3xl">
              <p className="text-sm font-black uppercase text-[#7ee7e0]">
                <T value={copy("Agenda", "الجدول", "Schedule")} />
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
                <T
                  block
                  value={copy(
                    "Repère le bon jour, le bon horaire, puis viens essayer.",
                    "اختر اليوم والوقت المناسبين، ثم تعال للتجربة.",
                    "Find the right day, the right time, then come try.",
                  )}
                />
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#c8e4f2]">
                <T
                  block
                  value={copy(
                    "Chaque journée regroupe ses cours pour que tu voies rapidement ce qui existe: enfants, BJJ, wrestling, no-gi, fitness ou open mat. Écris-nous avant de venir pour confirmer le créneau.",
                    "كل يوم يجمع حصصه حتى ترى بسرعة ما هو متاح: أطفال، جيوجيتسو، مصارعة، نو-غي، لياقة أو تدريب مفتوح. راسلنا قبل القدوم للتأكيد.",
                    "Each day groups its classes so you can quickly see what is available: children, BJJ, wrestling, no-gi, fitness, or open mat. Message us before coming to confirm the slot.",
                  )}
                />
              </p>
            </div>
            <AgendaDisplay />
          </div>
        </section>

        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div className="copy-align">
              <p className="text-sm font-black uppercase text-[#0e7490]">
                <T
                  value={copy(
                    "Pourquoi ici, à Tunis",
                    "لماذا هنا في تونس",
                    "Why here in Tunis",
                  )}
                />
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
                <T
                  block
                  value={copy(
                    "Un endroit proche, clair, et assez humain pour vraiment commencer.",
                    "مكان قريب، واضح وإنساني بما يكفي لتبدأ فعلا.",
                    "A close, clear, human place where starting feels possible.",
                  )}
                />
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#31556d]">
                <T
                  block
                  value={copy(
                    "À Tunis, beaucoup de personnes veulent apprendre à se défendre ou reprendre le sport, mais hésitent parce qu’elles ne savent pas où commencer. Grappling Garage existe pour rendre ce premier pas plus simple.",
                    "في تونس، كثيرون يريدون تعلم الدفاع عن النفس أو العودة للرياضة، لكنهم يترددون لأنهم لا يعرفون من أين يبدأون. Grappling Garage موجود لتسهيل هذه الخطوة الأولى.",
                    "In Tunis, many people want to learn self-defense or get back into sport, but hesitate because they do not know where to start. Grappling Garage exists to make that first step simpler.",
                  )}
                />
              </p>
            </div>
            <div className="grid gap-3">
              {localReasons.map((reason) => (
                <article
                  key={reason.fr}
                  className="copy-align rounded-lg bg-[#eef8ff] p-5 shadow-sm ring-1 ring-[#c9e3f2]"
                >
                  <p className="text-base font-black leading-7 text-[#061826]">
                    <T block value={reason} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eef8ff] py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="copy-align mb-6 max-w-3xl">
              <p className="text-sm font-black uppercase text-[#0e7490]">
                <T
                  value={copy(
                    "Questions avant de venir",
                    "أسئلة قبل القدوم",
                    "Questions before coming",
                  )}
                />
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
                <T
                  block
                  value={copy(
                    "Le plus important est d’arriver sans te sentir perdu.",
                    "الأهم أن تصل دون أن تشعر أنك ضائع.",
                    "The most important thing is arriving without feeling lost.",
                  )}
                />
              </h2>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              {faqItems.map((item) => (
                <article
                  key={item.question.fr}
                  className="copy-align rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#c9e3f2]"
                >
                  <h3 className="text-xl font-black leading-tight text-[#061826]">
                    <T block value={item.question} />
                  </h3>
                  <p className="mt-3 text-base font-semibold leading-7 text-[#31556d]">
                    <T block value={item.answer} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#dff5ff] px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#c9e3f2] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="copy-align">
              <p className="text-sm font-black uppercase text-[#0e7490]">
                <T value={copy("Contact", "تواصل", "Contact")} />
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal">
                <T
                  block
                  value={copy(
                    "Ton premier cours peut commencer par un simple message.",
                    "أول حصة يمكن أن تبدأ برسالة بسيطة.",
                    "Your first class can start with one simple message.",
                  )}
                />
              </h2>
              <p className="mt-3 text-base font-semibold leading-7 text-[#31556d]">
                <T
                  block
                  value={copy(
                    "Envoie “je veux essayer” sur WhatsApp. On te répond simplement, sans pression, avec le créneau qui te convient.",
                    "اكتب لنا على واتساب: أريد أن أجرب. سنجيبك ببساطة وبدون ضغط بالوقت المناسب لك.",
                    "Send “I want to try” on WhatsApp. We will answer simply, without pressure, with the slot that fits you.",
                  )}
                />
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={whatsappHref}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#0ea5a4] px-6 text-sm font-black uppercase text-white"
              >
                WhatsApp
              </a>
              <a
                href={phoneHref}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#061826] px-6 text-sm font-black uppercase text-white"
              >
                {phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-[#061826] px-5 py-8 text-white sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-black">Grappling Garage</p>
              <p className="mt-1 text-sm font-semibold text-[#c8e4f2]">
                Rue Abdallah Farhat, Hay Rafaha, Tunis, Tunisie
              </p>
            </div>
            <Link
              href="/espace-employe"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-black uppercase text-white"
            >
              Espace employé
            </Link>
          </div>
        </footer>

        <div className="fixed inset-x-4 bottom-4 z-50 grid grid-cols-2 gap-3 sm:inset-x-auto sm:right-4 sm:grid-cols-1">
          <a
            href={phoneHref}
            aria-label={`Appeler Grappling Garage au ${phoneDisplay}`}
            className="flex h-12 items-center justify-center rounded-full bg-[#061826] px-5 text-sm font-black uppercase text-white shadow-lg sm:h-14"
          >
            Call
          </a>
          <a
            href={whatsappHref}
            aria-label={`Contacter Grappling Garage sur WhatsApp au ${phoneDisplay}`}
            className="flex h-12 items-center justify-center rounded-full bg-[#0ea5a4] px-5 text-sm font-black uppercase text-white shadow-lg sm:h-14"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
