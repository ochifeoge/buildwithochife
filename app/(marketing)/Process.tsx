const steps = [
  {
    title: "Get clear",
    text: "We talk about your business, your customers and what needs to change. Then agree the scope, timeline and cost before the build begins.",
    output: "A shared plan",
  },
  {
    title: "Find the direction",
    text: "I map the pages, user journey and visual direction. You see how it will work and have a chance to give feedback early.",
    output: "Something you can see",
  },
  {
    title: "Build it properly",
    text: "I develop the site or application, with regular progress updates and checks across mobile, desktop and key user journeys.",
    output: "Something you can use",
  },
  {
    title: "Launch with clarity",
    text: "We review the finished work, put it live and walk through how to manage it. Handover and any ongoing support are agreed together.",
    output: "Ready for the real world",
  },
];
export function Process() {
  return (
    <section id="process" className="shell section-space process-section">
      <div className="section-heading">
        <p className="eyebrow">03 / THE PROCESS</p>
        <h2>
          No mystery.
          <br />
          Just <em>forward motion.</em>
        </h2>
        <p>
          You work directly with me.
          <br />
          You know what happens next.
        </p>
      </div>
      <div className="process-grid">
        {steps.map((s, i) => (
          <article key={s.title} data-reveal>
            <span className="process-number">
              0{i + 1}
              <span aria-hidden="true">↗</span>
            </span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <small>{s.output}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
