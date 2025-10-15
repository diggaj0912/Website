import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

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
    title: "Summer Collection 2025",
    description: "Discover the latest trends in summer fashion",
    imageUrl: "/images/banners/summer-collection.jpg",
    buttonText: "Shop Now",
    buttonLink: "/category/summer-collection"
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Be the first to get our newest items",
    imageUrl: "/images/banners/new-arrivals.jpg",
    buttonText: "Explore",
    buttonLink: "/new-arrivals"
  },
  {
    id: 3,
    title: "Special Offers",
    description: "Up to 50% off on selected items",
    imageUrl: "/images/banners/special-offers.jpg",
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
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Banner Slides */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="w-full h-full flex-shrink-0 relative"
            style={{
              backgroundImage: `url(${banner.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
              <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
              <p className="text-xl mb-8">{banner.description}</p>
              <Button variant="default" size="lg" asChild>
                <a href={banner.buttonLink}>{banner.buttonText}</a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}