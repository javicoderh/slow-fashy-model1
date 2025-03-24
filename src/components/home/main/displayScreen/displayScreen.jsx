import { useEffect, useState, useMemo } from 'react'
import './displayScreen.css'
import img1 from '../../../../assets/img1.avif'
import img2 from '../../../../assets/img2.avif'
import img3 from '../../../../assets/img3.avif'

const slides = [
  {
    img: img1,
    text: 'Vístete con tiempo, no con prisa.',
  },
  {
    img: img3,
    text: 'Cada prenda, una historia que respira.',
  },
  {
    img: img2,
    text: 'Moda lenta, alma libre.',
  },
]

const DisplayScreen = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentSlide = useMemo(() => slides[index], [index])

  return (
    <div className="displayScreen">
      <div className="slide fade" key={index}>
        <img
          src={currentSlide.img}
          alt={`Slide ${index + 1}`}
        />
        <div className="caption">{currentSlide.text}</div>
      </div>
    </div>
  )
}

export default DisplayScreen
