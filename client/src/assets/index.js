import ai from "./ai.png";
import fileIcon from "./file.png";
import swatch from "./swatch.png";
import download from "./download.png";

import logoShirt from "./logo-tshirt.png";
import stylishShirt from "./stylish-tshirt.png";

const toDataURI = (svg) => `data:image/svg+xml;base64,${btoa(svg)}`;

export const patternIcon = toDataURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`);

export const textIcon = toDataURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5"><path d="M4 6h16M12 6v13M8 19h8"/></svg>`);

export const shareIcon = toDataURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`);

export const undoIcon = toDataURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5"><path d="M3 7h10a6 6 0 0 1 0 12H3"/><polyline points="7 3 3 7 7 11"/></svg>`);

export const redoIcon = toDataURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5"><path d="M21 7H11a6 6 0 0 0 0 12h10"/><polyline points="17 3 21 7 17 11"/></svg>`);

export { ai, fileIcon, swatch, download, logoShirt, stylishShirt };
