import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-[var(--c-header-border)] bg-[var(--c-bg)] sticky top-0 z-50">
      <Link
        href="/blog"
        className="text-xl font-black tracking-tight text-[var(--c-text)] hover:opacity-80 transition-opacity"
      >
        <span className="line-through">immoral</span>
        <span className="text-[var(--c-accent)]">ia</span>
      </Link>
      <ThemeToggle />
    </header>
  )
}
