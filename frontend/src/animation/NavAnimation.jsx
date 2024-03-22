/* eslint-disable react/prop-types */
import {motion as m} from "framer-motion"
function NavAnimation({children}) {
  return (
    <m.main
      initial={{y:"100vh", x:0}}
      animate={{y:0, x:0}}
      exit={{y:"-100vh",x:0 }}
      transition={{
        duration:.5,
      }}
    >
      {children}
    </m.main>
  )
}

export default NavAnimation
