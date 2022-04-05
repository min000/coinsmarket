import styled from 'styled-components';
import React from 'react';

const Select = styled.select`
    border: 0;
    right: 35px;
    position: absolute;
    font-weight: 900;
    float: right;
    top: 75px;
    cursor: pointer;
`;

function SelectBox(props) {

    const onChange = (e) => {
        e.preventDefault();
        console.log("onChange");
        console.log(e.target.value);
        props.setCurrency(e.target.value)
        
    };
    return (
        <Select onChange={onChange}>
            {props.options.map((option) => (
                
                <option
                    key={option.value}
                    value={option.value}
                    defaultValue={props.defaultValue === option.value}
                >
                    {option.name}
                </option>
            ))}
        </Select>
    );
  }
  
  export default SelectBox;