export const containerVariants = {
  hidden:{
    opacity:0
  },
  show:{
    opacity:1,
    transition:{
      delayChildren:.3,
      staggerChildren: 0.2
    }
  },
  exit:{
    opacity:0,
    transition:{
      duration:.5,
      staggerChildren: 0.2
    }
  }
}

export const childVariants = {
  hidden:{
    x:"-100vw"
  },
  show:{
    x:0
  },
  exit:{
    x:"50vw"
  }
}