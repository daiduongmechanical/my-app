import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const UpAnimation = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const showVariants = {
    visible: { y: 0, opacity: 1, transition: { duration: 1 }, delay: 1 },
    start: { y: 20, opacity: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={showVariants}
      initial="start"
      animate={controls}
      exit={{ y: -20, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default UpAnimation;
