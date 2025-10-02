export const slideUp = {
    initial: {
        opacity: 0,
        y: 50
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 800
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 600
        }
    }
}

export const slideDown = {
    initial: {
        opacity: 0,
        y: -50
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 800
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 600
        }
    }
}

export const slideLeft = {
    initial: {
        opacity: 0,
        x: -50
    },
    enter: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 800
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 600
        }
    }
}

export const slideRight = {
    initial: {
        opacity: 0,
        x: 50
    },
    enter: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 800
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 600
        }
    }
}

export const fadeIn = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 800
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 600
        }
    }
}

export const scaleIn = {
    initial: {
        opacity: 0,
        scale: 0.8
    },
    enter: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 800
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 600
        }
    }
}

export const rotateIn = {
    initial: {
        opacity: 0,
        rotate: -90
    },
    enter: {
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 500
        }
    },
    visible: {
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 400
        }
    }
}

export const createDelayedAnimation = (baseAnimation, delay = 0) => ({
    ...baseAnimation,
    enter: {
        ...baseAnimation.enter,
        transition: {
            ...baseAnimation.enter.transition,
            delay
        }
    },
    visible: {
        ...baseAnimation.visible,
        transition: {
            ...baseAnimation.visible.transition,
            delay: delay / 2
        }
    }
})

export const createStaggeredAnimation = (baseAnimation, index, staggerDelay = 100) =>
    createDelayedAnimation(baseAnimation, index * staggerDelay)

export const hoverScale = {
    hover: {
        scale: 1.05,
        transition: {
            duration: 200
        }
    }
}

export const hoverLift = {
    hover: {
        scale: 1.1,
        y: -5,
        transition: {
            duration: 300
        }
    }
}

export const hoverGlow = {
    hover: {
        scale: 1.02,
        transition: {
            duration: 200
        }
    }
}

export const springScale = {
    initial: {
        opacity: 0,
        scale: 0.5
    },
    enter: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 500,
            type: 'spring',
            stiffness: 200
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 400,
            type: 'spring'
        }
    }
}

export const bottomToTop = createDelayedAnimation(slideUp, 200)
export const centerScale = createDelayedAnimation(scaleIn, 600)
export const bottomToTopDelayed = createDelayedAnimation(slideUp, 800)
export const rightToLeft = createDelayedAnimation(slideLeft, 1200)
export const leftToRight = createDelayedAnimation(slideRight, 1400)
export const rotateEntry = createDelayedAnimation(rotateIn, 1600)
export const fadeEntry = createDelayedAnimation(fadeIn, 1700)

export const createStatAnimation = (index, containerAnim = slideUp, numberAnim = springScale, labelAnim = slideUp) => ({
    container: createDelayedAnimation(containerAnim, 1800 + (index * 150)),
    number: createDelayedAnimation(numberAnim, 2100 + (index * 150)),
    label: createDelayedAnimation(labelAnim, 2200 + (index * 150))
})

export const quickSlideUp = {
    initial: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 500
        }
    }
}

export const quickFadeIn = {
    initial: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 400
        }
    }
}

export const quickScaleIn = {
    initial: {
        opacity: 0,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 400
        }
    }
}

export const presets = {
    hero: {
        title: bottomToTop,
        subtitle: centerScale,
        description: bottomToTopDelayed,
        cta: {
            ...rightToLeft,
            ...hoverScale
        },
        search: {
            ...leftToRight,
            ...hoverGlow
        },
        searchIcon: rotateEntry,
        searchInput: fadeEntry
    },

    card: {
        container: {
            ...quickSlideUp,
            ...hoverLift
        },
        title: quickFadeIn,
        content: quickScaleIn
    },

    button: {
        primary: {
            ...quickScaleIn,
            ...hoverScale
        },
        secondary: {
            ...quickSlideUp,
            ...hoverGlow
        }
    }
}

export default {
    slideUp,
    slideDown,
    slideLeft,
    slideRight,
    fadeIn,
    scaleIn,
    rotateIn,
    hoverScale,
    hoverLift,
    hoverGlow,
    springScale,
    createDelayedAnimation,
    createStaggeredAnimation,
    createStatAnimation,
    bottomToTop,
    centerScale,
    bottomToTopDelayed,
    rightToLeft,
    leftToRight,
    rotateEntry,
    fadeEntry,
    presets
}