type color = {
  light: string;
  dark: string;
  darker: string;
};

export const getPriorityColor = (priority: string): color => {
  const defaultColor = {
    light: 'white',
    dark: 'gray.50',
    darker: 'gray.200',
  };

  const priorityColors: { [key: string]: color } = {
    A: {
      light: 'red.500',
      dark: 'red.600',
      darker: 'red.700',
    },
    B: {
      light: 'orange.400',
      dark: 'orange.500',
      darker: 'orange.600',
    },
    C: {
      light: 'blue.500',
      dark: 'blue.600',
      darker: 'blue.700',
    },
    D: {
      light: 'green.500',
      dark: 'green.600',
      darker: 'green.700',
    },
  };

  return priorityColors[priority] || defaultColor;
};
