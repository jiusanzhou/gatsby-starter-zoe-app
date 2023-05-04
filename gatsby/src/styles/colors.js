

export const colors = [
    'green', 'teal', 'blue',
    'red', 'orange', 'yellow',
    'cyan', 'purple', 'pink'
]

export const genColor = (a) => colors[a % colors.length]