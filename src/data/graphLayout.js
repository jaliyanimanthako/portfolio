// Settle a deterministic spring layout once, with room for labels.
export function graphLayout(nodes, edges, width, height) {
  const points = nodes.map((node, index) => {
    const angle = index * 2.3999632297;
    const radius = 85 + Math.sqrt(index / nodes.length) * 260;
    return { ...node, x: width / 2 + Math.cos(angle) * radius, y: height / 2 + Math.sin(angle) * radius, vx: 0, vy: 0 };
  });
  const byId = new Map(points.map((point) => [point.id, point]));
  for (let step = 0; step < 500; step++) {
    for (let a = 0; a < points.length; a++) {
      for (let b = a + 1; b < points.length; b++) {
        const first = points[a];
        const second = points[b];
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.max(Math.hypot(dx, dy), 1);
        const force = 1600 / (distance * distance) + Math.max(0, 112 - distance) * .035;
        first.vx -= dx / distance * force;
        first.vy -= dy / distance * force;
        second.vx += dx / distance * force;
        second.vy += dy / distance * force;
      }
    }
    for (const edge of edges) {
      const source = byId.get(edge.source);
      const target = byId.get(edge.target);
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.max(Math.hypot(dx, dy), 1);
      const force = (distance - 145) * .006;
      source.vx += dx / distance * force;
      source.vy += dy / distance * force;
      target.vx -= dx / distance * force;
      target.vy -= dy / distance * force;
    }
    for (const point of points) {
      point.vx = (point.vx + (width / 2 - point.x) * .0007) * .76;
      point.vy = (point.vy + (height / 2 - point.y) * .0007) * .76;
      point.x = Math.max(88, Math.min(width - 88, point.x + point.vx));
      point.y = Math.max(55, Math.min(height - 90, point.y + point.vy));
    }
  }
  return Object.fromEntries(points.map(({ id, x, y }, index) => [id, {
    x, y,
    // Spread the settled network through depth without sacrificing its initial spacing.
    z: Math.sin(index * 2.3999632297) * 170 + Math.cos(index * 1.17) * 55,
  }]));
}
