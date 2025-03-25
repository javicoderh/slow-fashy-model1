import { useEffect, useState } from 'react'
import './displayScreen.css'
import img1 from '../../../../assets/img1.avif'
import img2 from '../../../../assets/img2.avif'
import img3 from '../../../../assets/img3.avif'

const slides = [
  { img: img1, text: 'Vístete con tiempo, no con prisa.' },
  { img: img3, text: 'Cada prenda, una historia que respira.' },
  { img: img2, text: 'Moda lenta, alma libre.' }
]

const DisplayScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Precargar imágenes al inicio
    slides.forEach(slide => {
      const img = new Image()
      img.src = slide.img
    })

    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % slides.length)
        setIsVisible(true)
      }, 300) // Espera fade-out antes del cambio
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentSlide = slides[currentIndex]

  return (
    <div className="displayScreen">
      <div className={`slide ${isVisible ? 'fade-in' : 'fade-out'}`}>
        <img src={currentSlide.img} alt={currentSlide.text} />
        <div className="caption">{currentSlide.text}</div>
      </div>
    </div>
  )
}

export default DisplayScreen
