/* eslint-disable react/prop-types */
import {AnimatePresence, motion as m} from "framer-motion";


function NavAnimation({id,children}) {
  return (
    <AnimatePresence mode="wait">
      <m.main
        key={id}
        initial={{x:"-100vw", opacity:0}}
        animate={{x:0, opacity:1, transition:{
          duration: .5
        }}}
        exit={{y:"100vh", opacity:0, transition:{
          duration: .2
        }}}
    >
      {children}
      </m.main>
    </AnimatePresence>
  )
}

export default NavAnimation
