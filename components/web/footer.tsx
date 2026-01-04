export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BuildWithOchife
        </p>
        <p className="text-sm text-muted-foreground">
          Designed & built with care.
        </p>
      </div>
    </footer>
  );
}
