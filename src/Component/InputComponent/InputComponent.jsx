import React from 'react';
import {Input } from 'antd';

const InputComponent = ({size, placeholder, style, ...rests}) => {
  return (
    
        <Input 
            size={size} 
            placeholder = {placeholder} 
            bordered={false}
            style={style}
            {...rests}
        />
    
  )
}

export default InputComponent