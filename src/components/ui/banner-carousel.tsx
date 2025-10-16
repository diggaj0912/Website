'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'
import Image from 'next/image'
import Link from 'next/link'

interface Banner {
  id: number
  title: string
  description: string
  imageUrl: string
  buttonText: string
  buttonLink: string
}

const BANNERS: Banner[] = [
  {
    id: 1,
    title: "New Arrivals",
    description: "Check out our latest collection of amazing products",
    imageUrl: "/images/banner1.jpg",
    buttonText: "Shop Now",
    buttonLink: "/new-arrivals"
  },
  {
    id: 2,
    title: "Featured Collection",
    description: "Explore our handpicked selection of premium products",
    imageUrl: "/images/banner2.jpg",
    buttonText: "Explore",
    buttonLink: "/featured"
  },
  {
    id: 3,
    title: "Special Offers",
    description: "Up to 50% off on selected items",
    imageUrl: "/images/banner3.jpg",
    buttonText: "View Deals",
    buttonLink: "/deals"
  }
]

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Banner Slides */}
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: 'transform 500ms ease-out'
        }}
      >
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            {/* Image */}
            <div className="absolute inset-0">
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
              <div className="container h-full mx-auto px-4 flex flex-col justify-center">
                <div className="max-w-xl text-white">
                  <h2 className="text-5xl font-bold mb-4">{banner.title}</h2>
                  <p className="text-xl mb-8">{banner.description}</p>
                  <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                    <Link href={banner.buttonLink}>
                      {banner.buttonText}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
