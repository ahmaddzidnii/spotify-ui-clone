export function formatDuration(seconds: number, { compact = true } = {}) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  if (compact) {
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  const parts = [];
  if (mins) parts.push(`${mins} min`);
  if (secs || !mins) parts.push(`${secs} sec`);

  return parts.join(" ");
}
