import styled from 'styled-components';
import React from 'react';

const Text = styled.span`
  text-align: center;
  display: block;
  color: black;t
`;

function SelectBox(props) {

    const onChange = (e) => {
        e.preventDefault();
        console.log("onChange");
        console.log(e.target.value);
        props.setCurrency(e.target.value)
        
    };
    return (
        <select onChange={onChange}>
            {props.options.map((option) => (
                
                <option
                    key={option.value}
                    value={option.value}
                    defaultValue={props.defaultValue === option.value}
                >
                    {option.name}
                </option>
            ))}
        </select>
    );
  }
  
  export default SelectBox;