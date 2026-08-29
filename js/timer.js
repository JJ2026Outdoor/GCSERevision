// Counts UP (a stopwatch) rather than down — there's no time limit on a
// session, just a record of how long it took.
export class Stopwatch {
  constructor({ onTick } = {}) {
    this.elapsed = 0;
    this.onTick = onTick || (() => {});
    this.handle = null;
  }

  start() {
    this.onTick(this.elapsed);
    this.handle = setInterval(() => {
      this.elapsed += 1;
      this.onTick(this.elapsed);
    }, 1000);
  }

  stop() {
    if (this.handle) {
      clearInterval(this.handle);
      this.handle = null;
    }
    return this.elapsed;
  }
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
