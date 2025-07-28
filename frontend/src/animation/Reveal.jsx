import { motion as m, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Reveal({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControl = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControl.start('visible');
    }
  }, [isInView]);

  return (
    <m.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 100, y: 0 },
      }}
      initial="hidden"
      animate={mainControl}
    >
      {children}
    </m.div>
  );
}

export default Reveal;
