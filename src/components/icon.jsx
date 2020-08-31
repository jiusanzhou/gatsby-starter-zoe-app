import React from 'react';
  
const Icon = ({ name, icon }) => {
    return <svg className={styles['icon']} viewBox={icon.viewBox}>
        <title>{name}</title>
        <path d={icon.path} />
    </svg>
}

Icon.protoTypes = {
    name: String,
    icon: {
      viewBox: String,
      path: String
    }
}
  
export default Icon;