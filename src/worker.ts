// Não implementado

self.onmessage = (msg) => {
  const positions = msg.data;
  const lines = [];

  for (let i = 0; i < positions.length; i++) {
    for (let y = i; y < positions.length; y++) {
      const fball = positions[i];
      const sball = positions[y];

      const dx = fball[0] - sball[0];
      const dy = fball[1] - sball[1];
      const dist = Math.sqrt(dx ** 2 + dy ** 2);

      if (dist < 100) {
        lines.push([[fball[0], fball[1]], [sball[0], sball[1]]]);
      } else continue;
    }
  }

  self.postMessage(lines);
}
