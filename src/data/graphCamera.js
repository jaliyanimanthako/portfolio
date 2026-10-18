export const DEFAULT_CAMERA = { yaw: -0.16, pitch: 0.1, zoom: 1, panX: 0, panY: 0 };
export const MIN_ZOOM = 0.45;
export const MAX_ZOOM = 3.5;

// Idle drift: the network sways a few degrees each way so it reads as a space
// at rest rather than a flat diagram. Applied as a delta, so it rocks around
// whichever angle the viewer last left the camera at instead of pulling back
// to DEFAULT_CAMERA. amplitude is radians (.09 ~ 5 degrees), period is seconds.
export const AUTO_ROTATE = { amplitude: 0.09, period: 24 };
export const autoRotateOffset = (seconds) =>
  AUTO_ROTATE.amplitude * Math.sin(2 * Math.PI * seconds / AUTO_ROTATE.period);

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// Rotate real XYZ positions, then project them into screen coordinates.
// Both the SVG edges and the HTML logo nodes use this same projection.
export function projectPoint(point, camera, viewport) {
  const x = point.x - 560;
  const y = point.y - 390;
  const z = point.z;
  const rotatedX = x * Math.cos(camera.yaw) + z * Math.sin(camera.yaw);
  const yawZ = -x * Math.sin(camera.yaw) + z * Math.cos(camera.yaw);
  const rotatedY = y * Math.cos(camera.pitch) - yawZ * Math.sin(camera.pitch);
  const depth = y * Math.sin(camera.pitch) + yawZ * Math.cos(camera.pitch);
  const perspective = 1100 / (1100 - depth);
  // Compact markers leave more room for the network in the split viewport.
  const fit = Math.min((viewport.width - 80) / 820, (viewport.height - 70) / 670);
  const scale = fit * camera.zoom * perspective;
  return {
    x: viewport.width / 2 + rotatedX * scale + camera.panX,
    y: viewport.height / 2 + rotatedY * scale + camera.panY,
    depth,
    perspective,
    opacity: clamp(0.78 + depth / 1200, 0.48, 1),
  };
}
