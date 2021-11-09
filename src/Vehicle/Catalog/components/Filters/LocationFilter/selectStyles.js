export const citySelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '2px 2px 0 0',
    '@media only screen and (min-width: 576px)': {
      ...provided['@media only screen and (min-width: 576px)'],
      borderRadius: '2px 0 0 2px',
    },
  }),
};

export const radiusSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0 0 2px 2px',
    borderTopWidth: 0,
    '@media only screen and (min-width: 576px)': {
      ...provided['@media only screen and (min-width: 576px)'],
      borderRadius: '0 2px 2px 0',
      borderLeft: 0,
      borderTopWidth: '1px',
    },
  }),
};
