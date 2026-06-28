/**
 * Brand logo. Renders /logo.svg from the public folder.
 *
 * To use your exact original artwork instead of this recreation, just overwrite
 * public/logo.svg with your file (or drop in public/logo.png and change the src
 * below to "/logo.png"). Everything across the site updates automatically.
 */
export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.svg" alt="Learning Access Initiative" className={className} />;
}
