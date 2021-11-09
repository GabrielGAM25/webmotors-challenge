const styles = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontWeight: 700,
    marginLeft: '4px',
    color: '#555',
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: 'flex',
    flexWrap: 'nowrap',
    paddingTop: 0,
    height: '4rem',
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: '2px',
    height: '4rem',
    minHeight: '4rem',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '4rem',
  }),
};

export default styles;
