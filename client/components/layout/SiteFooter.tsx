export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-muted/20">
      <div className="container py-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {year} Skills Institute. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="#admissions-tables" className="hover:text-foreground">
            Reports
          </a>
          <a href="#batches" className="hover:text-foreground">
            Batches
          </a>
          <a href="#certificates" className="hover:text-foreground">
            Certificates
          </a>
        </nav>
      </div>
    </footer>
  );
}
