export function formatDuration(seconds: number, { compact = true } = {}) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (compact) {
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  if (hrs > 0) {
    // Kalau ada jam → hanya tampilkan jam & menit
    return `${hrs} hr${mins ? ` ${mins} min` : ""}`;
  }

  // Kalau belum sampai jam → tampilkan min & sec
  return `${mins} min${secs ? ` ${secs} sec` : mins === 0 ? ` ${secs} sec` : ""}`;
}
