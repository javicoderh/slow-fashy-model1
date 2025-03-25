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
  const [currentSlide, setCurrentSlide] = useState(slides[0])
  const [isVisible, setIsVisible] = useState(true)
  const [readyToShow, setReadyToShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setReadyToShow(false)

      const nextIndex = (slides.indexOf(currentSlide) + 1) % slides.length
      const nextSlide = slides[nextIndex]
      const preloadImg = new Image()
      preloadImg.src = nextSlide.img

      preloadImg.onload = () => {
        setTimeout(() => {
          setCurrentSlide(nextSlide)
          requestAnimationFrame(() => {
            setReadyToShow(true)
            setTimeout(() => {
              setIsVisible(true)
            }, 50) // Espera mínima para asegurar layout estable
          })
        }, 300) // Fade-out terminado
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <div className="displayScreen">
      <div className={`slide ${isVisible ? 'fade-in' : 'fade-out'}`}>
        {readyToShow && (
          <>
            <img src={currentSlide.img} alt={currentSlide.text} />
            <div className="caption">{currentSlide.text}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default DisplayScreen
