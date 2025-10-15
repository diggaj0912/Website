import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { CartPreview } from '@/components/cart-preview'
import { AnimatedContent } from '@/components/ui/animated-content'
import { SearchBar } from '@/components/ui/search-bar'
import { ProfileMenu } from '@/components/ui/profile-menu'
import { auth } from '@/auth'

const categories = [
  { name: 'Clothing', href: '/category/clothing' },
  { name: 'Electronics', href: '/category/electronics' },
  { name: 'Accessories', href: '/category/accessories' },
  { name: 'Home & Living', href: '/category/home-living' },
]

export async function Header() {
  const session = await auth()

  return (
    <div className="container py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Store Logo" className="h-8 w-8" />
          <span className="font-semibold text-xl hidden sm:inline-block">Your Store</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {categories.map((category) => (
                      <li key={category.href}>
                        <Link
                          href={category.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/deals" className="navigation-menu-link">Deals</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/new-arrivals" className="navigation-menu-link">New Arrivals</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <SearchBar />
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center space-x-4">
          <CartPreview />

          {session ? (
            <ProfileMenu user={session.user} />
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="default">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center space-x-4">
          <CartPreview />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <AnimatedContent isVisible={true}>
                <div className="px-4 py-6 border-b">
                  <SearchBar />
                </div>                  <nav className="flex-1 px-4 py-6 space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Categories</h4>
                      {categories.map((category, index) => (
                        <AnimatedContent 
                          key={category.href} 
                          isVisible={true}
                        >
                          <Link
                            href={category.href}
                            className="block text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {category.name}
                          </Link>
                        </AnimatedContent>
                      ))}
                    </div>

                    <AnimatedContent isVisible={true}>
                      <div className="space-y-3">
                        <Link href="/deals" className="block text-muted-foreground hover:text-foreground transition-colors">
                          Deals
                        </Link>
                        <Link href="/new-arrivals" className="block text-muted-foreground hover:text-foreground transition-colors">
                          New Arrivals
                        </Link>
                      </div>
                    </AnimatedContent>

                    <AnimatedContent isVisible={true}>
                      <div className="space-y-3">
                        {session ? (
                          <div className="relative w-fit">
                            <ProfileMenu user={session.user} />
                          </div>
                        ) : (
                          <>
                            <Link href="/auth/signin" className="block text-muted-foreground hover:text-foreground transition-colors">
                              Sign In
                            </Link>
                            <Link href="/auth/signup" className="block text-muted-foreground hover:text-foreground transition-colors">
                              Sign Up
                            </Link>
                          </>
                        )}
                      </div>
                    </AnimatedContent>
                  </nav>
                </AnimatedContent>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}