// Replace public/logo.svg to change the logo across the whole site.
export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.svg" alt="Learning Access Initiative" className={className} />;
}
