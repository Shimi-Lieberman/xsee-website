import type { ReactNode } from "react";

type Props = {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({ id, num, title, children }: Props) {
  return (
    <section id={`section-${id}`} data-section={id} className="legal-section">
      <div className="legal-section-head">
        <span className="legal-section-num">{num}</span>
        <h2 className="legal-section-title">{title}</h2>
      </div>
      <div className="legal-body">{children}</div>
    </section>
  );
}
