/**
 * Common type definitions for the portfolio
 */

export interface WindowDimensions {
  width: number | null;
  height: number | null;
}

export interface Project {
  id: number;
  title: string;
  images: string[];
  smalldesc: string;
  desc: string;
  responsibilities: string[];
  tags: string[];
  link: string;
}

export interface AnimationState {
  hero: boolean;
  about: boolean;
  projects: boolean;
  contact: boolean;
}

export type ScrollDirection = "up" | "down";

export interface UseScrollDirectionOptions {
  initialDirection: ScrollDirection;
  thresholdPixels: number;
}
