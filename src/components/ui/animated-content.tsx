import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedContentProps {
  children: ReactNode
  isVisible: boolean
}

export function AnimatedContent({ children, isVisible }: AnimatedContentProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}