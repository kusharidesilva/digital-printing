import Button from "@/components/shared/Button";
export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="eyebrow">404 · A LITTLE OFF THE PAGE</span>
      <h1>
        Let’s get you
        <br />
        back on paper.
      </h1>
      <p>
        We couldn’t find that page. Explore our printing services or head back
        home.
      </p>
      <div>
        <Button href="/">Back to home</Button>
        <Button href="/services/" variant="secondary">
          Our services
        </Button>
      </div>
    </section>
  );
}
