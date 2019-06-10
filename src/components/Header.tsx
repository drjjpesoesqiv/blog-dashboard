import React from 'react';

interface Props {
  text:string
}

const Header:React.FC<Props> = (props:any) => {
  return(
    <h1>{props.text}</h1>
  )
}

export default Header;