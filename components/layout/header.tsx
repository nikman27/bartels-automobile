"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import * as LucideIcons from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { mainNavigation } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/data/site-config";
import { Logo } from "@/components/logo";
import { TikTokIcon, InstagramIcon } from "@/components/icons/social";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {mainNavigation.map((group) => (
              <NavigationMenuItem key={group.label}>
                {group.children ? (
                  <>
                    <NavigationMenuTrigger className="bg-transparent text-sm font-medium">
                      {group.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[420px] gap-1 p-2">
                        {group.children.map((child) => {
                          const Icon = child.icon
                            ? ((LucideIcons as unknown as Record<
                                string,
                                React.ComponentType<{ className?: string }>
                              >)[child.icon] ?? null)
                            : null;
                          return (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="group/item flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent focus:bg-accent"
                                >
                                  {Icon && (
                                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                                      <Icon className="size-4.5" />
                                    </span>
                                  )}
                                  <span className="flex flex-1 flex-col gap-0.5">
                                    <span className="text-sm font-semibold leading-tight">
                                      {child.label}
                                    </span>
                                    {child.description && (
                                      <span className="text-xs leading-snug text-muted-foreground">
                                        {child.description}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={group.href ?? "#"}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                        pathname === group.href && "text-foreground",
                      )}
                    >
                      {group.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5">
          <Link
            href={siteConfig.social.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
            aria-label="TikTok"
          >
            <TikTokIcon className="size-4" />
          </Link>
          <Link
            href={siteConfig.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
            aria-label="Instagram"
          >
            <InstagramIcon className="size-4" />
          </Link>
          <Button
            asChild
            size="sm"
            className="hidden lg:inline-flex"
          >
            <Link href="/fahrzeuge">Fahrzeuge</Link>
          </Button>

          {/* Mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menü öffnen">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(22rem,90vw)] p-0">
              <SheetHeader className="border-b p-6">
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4">
                {mainNavigation.map((group) => (
                  <div key={group.label} className="flex flex-col gap-0.5">
                    {group.href ? (
                      <SheetClose asChild>
                        <Link
                          href={group.href}
                          className="rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent"
                        >
                          {group.label}
                        </Link>
                      </SheetClose>
                    ) : (
                      <div className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {group.label}
                      </div>
                    )}
                    {group.children &&
                      group.children.map((child) => {
                        const Icon = child.icon
                          ? ((LucideIcons as unknown as Record<
                              string,
                              React.ComponentType<{ className?: string }>
                            >)[child.icon] ?? null)
                          : null;
                        return (
                          <SheetClose asChild key={child.href}>
                            <Link
                              href={child.href}
                              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                            >
                              {Icon && (
                                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                  <Icon className="size-4" />
                                </span>
                              )}
                              <span>{child.label}</span>
                            </Link>
                          </SheetClose>
                        );
                      })}
                  </div>
                ))}
                <div className="mt-4 flex items-center gap-2 border-t px-3 pt-4">
                  <Link
                    href={siteConfig.social.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="rounded-md p-2 hover:bg-accent"
                  >
                    <TikTokIcon className="size-5" />
                  </Link>
                  <Link
                    href={siteConfig.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="rounded-md p-2 hover:bg-accent"
                  >
                    <InstagramIcon className="size-5" />
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
