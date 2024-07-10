import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Experience from "./Experience/Experience";
import "./project.css";
import ProjectBody from "./ProjectsBody";
import Lenis from 'lenis'
import gsap from "https://esm.sh/gsap";
import { vec2 } from "https://esm.sh/vecteur";

const HtmlComponent = () => {
  useEffect(() => {
    const canvasElement = document.querySelector(".web-gl");
    const app = new Experience(canvasElement);

    // Cleanup if necessary
    return () => {
      // Assuming Experience has a cleanup method
      if (app && typeof app.cleanup === "function") {
        app.cleanup();
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/style.css" />
      </Helmet>

      <canvas className="web-gl"></canvas>
    </>
  );
};

function Project() {

  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    console.log(e)
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {

    class Cursor {
      constructor(targetEl) {
        this.el = targetEl;
    
        this.position = {
          previous: vec2(-100, -100),
          current: vec2(-100, -100),
          target: vec2(-100, -100),
          lerpAmount: 0.1
        };
        this.scale = {
          previous: 1,
          current: 1,
          target: 1,
          lerpAmount: 0.1
        };
    
        this.isHovered = false;
        this.hoverEl = null;
    
        this.addListeners();
      }
    
      update() {
        this.position.current.lerp(this.position.target, this.position.lerpAmount);
        this.scale.current = gsap.utils.interpolate(
          this.scale.current,
          this.scale.target,
          this.scale.lerpAmount
        );
    
        const delta = this.position.current.clone().sub(this.position.previous);
    
        this.position.previous.copy(this.position.current);
        this.scale.previous = this.scale.current;
    
        gsap.set(this.el, {
          x: this.position.current.x,
          y: this.position.current.y
        });
    
        if (!this.isHovered) {
          const angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI);
          const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.04;
    
          gsap.set(this.el, {
            rotate: angle,
            scaleX: this.scale.current + Math.min(distance, 1),
            scaleY: this.scale.current - Math.min(distance, 0.3)
          });
        }
      }
    
      updateTargetPosition(x, y) {
        if (this.isHovered) {
          const bounds = this.hoverEl.getBoundingClientRect();
    
          const cx = bounds.x + bounds.width / 2;
          const cy = bounds.y + bounds.height / 2;
    
          const dx = x - cx;
          const dy = y - cy;
    
          this.position.target.x = cx + dx * 0.15;
          this.position.target.y = cy + dy * 0.15;
          this.scale.target = 2;
    
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const distance = Math.sqrt(dx * dx + dy * dy) * 0.01;
    
          gsap.set(this.el, { rotate: angle });
          gsap.to(this.el, {
            scaleX: this.scale.target + Math.pow(Math.min(distance, 0.6), 3) * 3,
            scaleY: this.scale.target - Math.pow(Math.min(distance, 0.3), 3) * 3,
            duration: 0.5,
            ease: "power4.out",
            overwrite: true
          });
        } else {
          this.position.target.x = x;
          this.position.target.y = y;
          this.scale.target = 1;
        }
      }
    
      addListeners() {
        gsap.utils.toArray("[data-hover]").forEach((hoverEl) => {
          // set hover states
          {
            const hoverBoundsEl = hoverEl.querySelector("[data-hover-bounds]");
            hoverBoundsEl.addEventListener("pointerover", () => {
              this.isHovered = true;
              this.hoverEl = hoverBoundsEl;
            });
            hoverBoundsEl.addEventListener("pointerout", () => {
              this.isHovered = false;
              this.hoverEl = null;
            });
          }
    
          // magnetic effect
          {
            const xTo = gsap.quickTo(hoverEl, "x", {
              duration: 1,
              ease: "elastic.out(1, 0.3)"
            });
            const yTo = gsap.quickTo(hoverEl, "y", {
              duration: 1,
              ease: "elastic.out(1, 0.3)"
            });
    
            hoverEl.addEventListener("pointermove", (event) => {
              const { clientX: cx, clientY: cy } = event;
              const { height, width, left, top } = hoverEl.getBoundingClientRect();
              const x = cx - (left + width / 2);
              const y = cy - (top + height / 2);
              xTo(x * 0.2);
              yTo(y * 0.2);
            });
    
            hoverEl.addEventListener("pointerout", () => {
              xTo(0);
              yTo(0);
            });
          }
        });
      }
    }
    
    const cursor = new Cursor(document.querySelector(".cursor"));
    
    const cta = document.querySelector(".cta");
    const menuBtn = document.querySelector(".menu-btn");
    
    onResize();
    
    function update() {
      cursor.update();
    }
    
    function onMouseMove(event) {
      const x = event.clientX;
      const y = event.clientY;
    
      cursor.updateTargetPosition(x, y);
    }
    
    function onResize() {
      const { x, y, width, height } = menuBtn.getBoundingClientRect();
    
      gsap.set(cta, {
        left: x - width,
        top: y + height
      });
    }
    
    gsap.ticker.add(update);
    window.addEventListener("pointermove", onMouseMove);
    window.addEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen">
        <HtmlComponent />
      </div>

      <ProjectBody open={open} setOpen={setOpen} />

      <div className="overlay-button-container">
        <button onClick={handleOpen} className="project-button btn menu-btn" data-hover >
          <div className="project-button-content">
            <span className="project-button-text">PROJECTS</span>
            <span className="project-button-text">PROJECTS</span>
          </div>
          <div data-hover-bounds></div>
        </button>
      </div>

      <div className="cursor"></div>
    </>
  );
}

export default Project;
