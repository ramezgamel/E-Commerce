/* eslint-disable react/prop-types */
import Select from 'react-select';

const colorStyles = {
  control: (baseStyles) => ({ ...baseStyles, backgroundColor: 'bg-main'}),
  option: (baseStyles, { isDisabled }) => ({
      ...baseStyles,
      color:"black",
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }
  )
};

export function Selector ({options, onChange}){
  return <Select
    isMulti
    options={options}
    styles={colorStyles}
    onChange={(e)=>onChange(e.map(i=>i.value))}
    />
}