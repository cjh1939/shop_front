import React from 'react'
import styles from'./ShopButton.module.css'


//쇼핑몰 프로젝트에 사용한 버튼 컴포넌트
//...props :앞에서 직접 선언하지않는 나머지를 데이터를 받음
//size: samall,normal,large
const ShopButton = ({title='버튼', size='normal', click}) => {
  

  return (
    <>

    <button type='button'
      className ={[styles.btn, styles[size]].join(' ')}
      onClick={(e)=>{click()}}
    >
      {title}
    </button>


    </>
  )
}

export default ShopButton













