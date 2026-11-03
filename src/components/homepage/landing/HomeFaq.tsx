export const FAQ_ITEMS = [
  {
    question: "What is XSEE?",
    answer: "XSEE is an early-stage cloud security company focused on evidence-led attack-path validation for AWS.",
  },
  {
    question: "What does XSEE help teams understand?",
    answer:
      "XSEE helps teams understand how AWS identities, permissions and network exposures connect, so they can prioritize paths to review.",
  },
  {
    question: "Does XSEE require agents?",
    answer: "XSEE uses a read-only IAM role for assessment and does not require agents on your workloads.",
  },
  {
    question: "Does XSEE make changes in my AWS account?",
    answer: "Your team decides on and applies remediation. XSEE can reassess the relevant path after a change.",
  },
] as const;

export default function HomeFaq() {
  return (
    <section id="faq" className="lp-value lp-faq" aria-labelledby="lp-faq-title" data-nav-tone="dark">
      <div className="lp-value-inner">
        <div className="lp-value-head">
          <p className="lp-eyebrow">FAQ</p>
          <h2 id="lp-faq-title" className="lp-value-title text-balance">
            Common questions.
          </h2>
        </div>
        <ul className="lp-value-list lp-faq-list">
          {FAQ_ITEMS.map((item) => (
            <li key={item.question} className="lp-value-item">
              <h3>{item.question}</h3>
              <p className="text-pretty">{item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
