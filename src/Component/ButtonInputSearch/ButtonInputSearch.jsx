import React from 'react';
import { Button } from 'antd';
import {SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent';

const ButtonInputSearch = (props) => {
    const {size, placeholder, textButton,bordered = 'false', 
        colorButton ,
        backgroundColorInput = '#fff',
        backgroundColorButton ='rgb(237 208 20)'} = props
  return (
    <div style={{display: 'flex', backgroundColor: '#fff'}}>
        <InputComponent
            size={size} 
            placeholder = {placeholder} 
           
            style={{backgroundColor: backgroundColorInput}}
            {...props}
        />
        <Button 
            size={size} 
            bordered={bordered}
            style={{backgroundColor: backgroundColorButton, color: colorButton, borderRadius: '0', border: '0'}}
            icon={<SearchOutlined style={{color: colorButton}}/> } >
                <span>{textButton}</span>
        </Button>

    </div>
  )
}

export default ButtonInputSearch