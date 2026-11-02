/**
 * Colour palette shared by the DOM and the 3D room.
 *
 * The site has two lighting states. Every colour below is defined for both,
 * so switching the theme re-lights the room instead of only recolouring the
 * page chrome.
 */
export type RoomTheme = "night" | "day";

export type RoomPalette = {
  /** Backdrop behind the whole room. */
  background: string;
  /** Ambient fill light colour. */
  ambient: string;
  /** Colour of the desk lamp, the warm key light. */
  lamp: string;
  /** Colour of light coming through the window. */
  window: string;
  /** Wall material colour. */
  wall: string;
  /** Floor material colour. */
  floor: string;
  /** Desk material colour. */
  desk: string;
  /** Secondary furniture colour, shelf and drawers. */
  furniture: string;
  /** Accent used for interactive props and the mug. */
  accent: string;
  /** Plant foliage colour. */
  foliage: string;
  /** Rug colour. */
  rug: string;
  /** Rug border colour. */
  rugTrim: string;
  /** Screen glow colour. */
  screen: string;
  /** How strong the lamp is relative to the scene. */
  lampIntensity: number;
  /** How strong the window light is. */
  windowIntensity: number;
  /** How bright the ambient fill is. */
  ambientIntensity: number;
};

export const roomPalettes: Record<RoomTheme, RoomPalette> = {
  night: {
    background: "#0d0f16",
    ambient: "#2b3350",
    lamp: "#f0a35e",
    window: "#6f8fb5",
    wall: "#20222e",
    floor: "#191b24",
    desk: "#3a2c23",
    furniture: "#262a38",
    accent: "#f0a35e",
    foliage: "#4a6b52",
    rug: "#2e2a3a",
    rugTrim: "#463b4d",
    screen: "#8fb8d9",
    lampIntensity: 26,
    windowIntensity: 3.2,
    ambientIntensity: 0.55,
  },
  day: {
    background: "#c3cad6",
    ambient: "#dfe6f2",
    lamp: "#ffc98a",
    window: "#eef4ff",
    wall: "#d3d8e2",
    floor: "#8b6a4e",
    desk: "#6b4a33",
    furniture: "#9aa3b4",
    accent: "#e08f42",
    foliage: "#5d8560",
    rug: "#4b4658",
    rugTrim: "#6b6478",
    screen: "#5f8fb8",
    lampIntensity: 8,
    windowIntensity: 4.5,
    ambientIntensity: 1.15,
  },
};
