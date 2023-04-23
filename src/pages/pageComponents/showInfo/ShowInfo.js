import { motion, AnimatePresence } from "framer-motion";

const ShowInfo = ({ show, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: "auto",
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className="font-light"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShowInfo;
