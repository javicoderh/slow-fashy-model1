import { useEffect, useState } from 'react';
import './manifiesto.css';

const frases = [
  "“Un estilo que perdura no se cose con prisa, sino con conciencia, tiempo y alma.”",
  "“Las manos forjan una historia dibujada por la mente; la tuya merece ser original.”",
  "“Vestir lento es amar cada textura, cada trazo, cada momento vivido.”",
  "“El estilo hand made no solo luce el cuerpo, también contorna el alma.”",
  "“La moda consciente florece donde la prisa se detiene a crear belleza.”"
];

const Manifiesto = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % frases.length);
        setVisible(true);
      }, 500); // tiempo que dura el fade-out
    }, 5500); // intervalo total para cambiar la frase

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="manifiesto-container">
      <div className="manifiesto-overlay">
        <blockquote className={`fade ${visible ? 'fade-in' : 'fade-out'}`}>
          {frases[index]}
        </blockquote>
        <p className="firma">— Slow Fashion Collective</p>
      </div>
    </section>
  );
};

export default Manifiesto;
