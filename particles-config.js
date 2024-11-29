particlesJS("particles-js", {
  particles: {
    number: {
      value: 800,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: ["#FFFFFF", "#4FACFE", "#B465DA", "#6F86D6", "#A1C4FD"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 10,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        opacity_min: 0.7,
        sync: false
      }
    },
    size: {
      value: 4,
      random: true,
      animation: {
        enable: true,
        speed: 2,
        size_min: 2,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 65,
      color: "#A1C4FD",
      opacity: 0.9,
      width: 0.5
    },
    move: {
      enable: true,
      speed: 10,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "bounce",
      bounce: true,
      attract: {
        enable: false,
        rotateX: 1200,
        rotateY: 1200,
        distance: 40
      },
      warp: false
    },
    array: []
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 80,
        duration: 0.05,
        speed: 1,
        easing: "ease-out-quad"
      },
      push: {
        particles_nb: 3
      },
      grab: {
        distance: 90,
        line_linked: {
          opacity: 0.8
        }
      }
    }
  },
  retina_detect: true,
  fps_limit: 60,
  particles_nb: {
    enable: true,
    value: 220,
    density: {
      enable: true,
      value_area: 1200
    }
  }
}); 