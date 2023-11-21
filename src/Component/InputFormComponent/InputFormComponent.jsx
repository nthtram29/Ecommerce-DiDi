

// import React, {useState} from 'react'
import { WrapperInputStyle } from './style'

const InputFormComponent = (props) => {
    // const [valueInput, setValueInput] = useState('')
    // const [valueInput] = useState('')
    const {placeholder = 'Nhập text', ...rests} = props
    const handleOnChangeInput =(e) =>{
      props.onChange(e.target.value)
    }
  return (
    <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput}/>
  )
}

export default InputFormComponent