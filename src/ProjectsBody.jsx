import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// eslint-disable-next-line react/prop-types
export default function ProjectBody({ open }) {
  const menuRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    if (open) {
      tl.to(menuRef.current, {
        left: "0%",
        duration: 1,
        ease: "power3.inOut",
      });
    } else {
      tl.to(menuRef.current, {
        left: "-100%",
        duration: 1,
        ease: "power3.inOut",
      });
    }
  }, [open]);

  // eslint-disable-next-line no-unused-vars
  const handleClick = (linkUrl) => {
    window.open(linkUrl, '_blank');
  };

  return (
    <section ref={menuRef} className="projects-section">
      <div className="projects-section-content">
        <h1 className="projects-section-title" >Projects</h1>
        <div className="projects-section-container">

          <div className="project" onClick={() => handleClick('https://www.instagram.com/dialedweb/')} >
            <div className="project-image">
              <img src="/project1.png" alt="Project 1" />
            </div>
            <div className="project-text-container">
              <div className="project-text-container-title">
                <p className="project-text-title" >Environmental Branding & Way Finding System</p>
              </div>
              <p className="project-text-description">Visual Identity</p>
              <p className="project-text-description">(2022)</p>
            </div>
          </div>

          <div className="project" onClick={() => handleClick('https://www.instagram.com/dialedweb/')} >
            <div className="project-image">
              <img src="/project2.png" alt="Project 2" />
            </div>
            <div className="project-text-container">
              <div className="project-text-container-title">
                <p className="project-text-title" >Milk Network Grow Brands - Campaign Edition</p>
              </div>
              <p className="project-text-description">Campaign</p>
              <p className="project-text-description">(2024)</p>
            </div>
          </div>

          <div className="project" onClick={() => handleClick('https://www.instagram.com/dialedweb/')}>
            <div className="project-image">
              <img src="/project3.png" alt="Project 3" />
            </div>
            <div className="project-text-container">
              <div className="project-text-container-title">
                <p className="project-text-title" >Saudi Venture Capital</p>
              </div>
              <p className="project-text-description">Editorial</p>
              <p className="project-text-description">(2021)</p>
            </div>
          </div>

          <div className="project" onClick={() => handleClick('https://www.instagram.com/dialedweb/')}>
            <div className="project-image">
              <img src="/project4.png" alt="Project 4" />
            </div>
            <div className="project-text-container">
              <div className="project-text-container-title">
                <p className="project-text-title" >Cultural Talents Tournaments</p>
              </div>
              <p className="project-text-description">Visual Identity, Naming</p>
              <p className="project-text-description">(2023)</p>
            </div>
          </div>

          <div className="project" onClick={() => handleClick('https://www.instagram.com/dialedweb/')}>
            <div className="project-image">
              <img src="/project1.png" alt="Project 5" />
            </div>
            <div className="project-text-container">
              <div className="project-text-container-title">
                <p className="project-text-title" >Boost</p>
              </div>
              <p className="project-text-description">Strategy, Naming, Rebranding</p>
              <p className="project-text-description">(2020)</p>
            </div>
          </div>

          <div className="project" onClick={() => handleClick('https://www.instagram.com/dialedweb/')}>
            <div className="project-image">
              <img src="/project2.png" alt="Project 1" />
            </div>
            <div className="project-text-container">
              <div className="project-text-container-title">
                <p className="project-text-title" >Core Fitness</p>
              </div>
              <p className="project-text-description">Websites</p>
              <p className="project-text-description">(2024)</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

