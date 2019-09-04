type Colors = {
  [color: string]: {[colorId: number]: string},
}

export const theme: { colors: Colors } = {
  colors: {
    red: {
      [600]: '#c2112c',
    },
    green: {
      [200]: '#beefd2',
      [300]: '#89e3ae',
    },
    grey: {
      [200]: '#edeef0',
    },
    black: '#000000',
    white: '#ffffff',
  },
}
