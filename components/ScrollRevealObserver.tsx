"use client";

import { useEffect } from "react";

/**
 * better-motion: exact one-time on-scroll animation observer.
 * Staggers entrances, uses 300ms ease-out with 12px translateY and 4px blur,
 * unobserves immediately after first reveal so it only runs once,
 * and respects prefers-reduced-motion.
 */
export function ScrollRevealObserver() {
  useEffect(() => {
    // If user prefers reduced motion, skip animations
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            // One-time only: immediately stop observing this element
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
