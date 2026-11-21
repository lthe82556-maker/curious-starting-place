import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Flame, House, Menu, Play, Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { ChannelAvatar } from "./ChannelAvatar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { channels } from "@/lib/videos";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Vidora home">
      <span className="flex size-8 items-center justify-center rounded-lg bg-ember shadow-glow">
        <Play className="size-4 fill-current text-primary-foreground" />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight">Vidora</span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const item =
    "flex items-center gap-4 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent";
  const active = { className: "bg-secondary font-semibold" };
  return (
    <nav className="flex flex-col gap-1 p-3" onClick={onNavigate}>
      <Link to="/" className={item} activeProps={active} activeOptions={{ exact: true }}>
        <House className="size-5" /> Home
      </Link>
      <Link to="/trending" className={item} activeProps={active}>
        <Flame className="size-5" /> Trending
      </Link>
      <div className="my-3 border-t" />
      <p className="px-3 pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Channels
      </p>
      {channels.map((c) => (
        <Link
          key={c.id}
          to="/channel/$channelId"
          params={{ channelId: c.id }}
          className={item}
          activeProps={active}
        >
          <ChannelAvatar channel={c} className="size-6 text-[10px]" />
          <span className="truncate">{c.name}</span>
        </Link>
      ))}
    </nav>
  );
}

function SearchBar({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const currentQ = useRouterState({
    select: (s) => (s.location.pathname === "/search" ? String((s.location.search as { q?: string }).q ?? "") : ""),
  });
  const [q, setQ] = useState(currentQ);
  useEffect(() => setQ(currentQ), [currentQ]);

  return (
    <form
      role="search"
      className="flex w-full max-w-xl items-center"
      onSubmit={(e) => {
        e.preventDefault();
        const query = q.trim();
        if (!query) return;
        navigate({ to: "/search", search: { q: query } });
        onDone?.();
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search videos"
        aria-label="Search videos"
        className="h-10 w-full rounded-l-full border border-input bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex h-10 w-16 shrink-0 items-center justify-center rounded-r-full border border-l-0 border-input bg-secondary transition-colors hover:bg-accent"
      >
        <Search className="size-5" />
      </button>
    </form>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/90 px-3 backdrop-blur sm:px-4">
        {mobileSearch ? (
          <>
            <button
              aria-label="Close search"
              onClick={() => setMobileSearch(false)}
              className="rounded-full p-2 hover:bg-accent"
            >
              <X className="size-5" />
            </button>
            <SearchBar onDone={() => setMobileSearch(false)} />
          </>
        ) : (
          <>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 hover:bg-accent lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            <Logo />
            <div className="hidden flex-1 justify-center sm:flex">
              <SearchBar />
            </div>
            <div className="flex-1 sm:hidden" />
            <button
              aria-label="Search"
              onClick={() => setMobileSearch(true)}
              className="rounded-full p-2 hover:bg-accent sm:hidden"
            >
              <Search className="size-5" />
            </button>
            <div className="hidden w-32 sm:block" />
          </>
        )}
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex h-16 items-center px-5">
            <Logo />
          </div>
          <NavLinks onNavigate={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto lg:block">
          <NavLinks />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
