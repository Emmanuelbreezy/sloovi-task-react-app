import React from 'react'
import Select from 'react-select';

interface SelectDropdownPropsType {
  options: {label: string; value:string}[];
  value: string;
  className: string;
  placeholder: string;
  isLoading: boolean;
  isDisabled?: boolean;
  reference?: any;
  noOptionsMessage: (obj: {inputValue: string;}) => React.ReactNode | undefined;
  onChanged: (value:string) => any;
  onBlur:(e: React.FocusEvent<any, Element>) => void;
}


 const SelectDropdown = ({isDisabled,reference,onChanged,onBlur,noOptionsMessage,isLoading,placeholder,options,value,className}:SelectDropdownPropsType) => {
       
    const defaultValue = (options:{label:string;value:string}[], value:string) => {
        return options ? options.find((option:any) => option.value === value): "";
    }
    
    const styles = {
        menu: (base:any) => ({
          ...base,
          fontSize: "14px",
          
        }),
        control: (base: any) => ({
          ...base,
          "&:hover": {
            borderColor: '#ddd',
            color: "red"
          }
        }),
      };

  return (
    <div className={className}>
        <Select 
            ref={reference ? reference : null}
            isClearable
            isDisabled={isDisabled}
            placeholder={placeholder}
            options={options}
            value={defaultValue(options,value)} 
            onChange={(value:any) => onChanged(value)}
            isLoading={isLoading}
            noOptionsMessage={noOptionsMessage}
            onBlur={onBlur}
            isSearchable
            styles={styles}
        />
      </div>
  )
}

export default SelectDropdown;
