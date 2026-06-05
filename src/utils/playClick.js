export function playClick() {
  const audio = new Audio('/click.wav')
  audio.play().catch(() => {})
}

export function playShortClick() {
  const audio = new Audio('/short-click.wav')
  audio.play().catch(() => {})
}
