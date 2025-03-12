
import React, { useEffect, useState } from 'react'


/**
 * sessionStorage , localStorage 는 웹상에 데이터를 저장할수있는 공간이다
 * 이 두곳에 저장된 데이터는 개발자모드의 application 탭에서 확인가능
 * localStorage 와 sessionStorage는 새로고침해도 데이터 살아있음 
 * 
 * localStorage 는 탭 간에도 데이터를 공유 한다.(o)
 *sessionStorage는 탭간에 데이터를 공유 안한다.(x)


 *  localStorage 는 웹브라우저가 종료 되도 데이터가 살아있다. (영구보존)
 * sessionStorage는 웹브라우저가 종료 되면 데이터 삭제됨.
 * 
 * 이 두곳에는 객체 데이터저장이 불가. 하지만 다른 방법으로 객체를 사용 가능
 * 
 * 
 * */


const StorageTest = () => {

  //localStorage에 데이터를 저장하는법
    useEffect(()=>{
    localStorage.setItem( 'name', 'hong' );
    //localStorage.setItem( 'name', 'kim' );
    localStorage.setItem( 'age', 20 );

    sessionStorage.setItem('addr','울산시')
    },[])

    
  



  return (
    <>

    <div>StorageTest</div>

    <button type='button' onClick={()=>{
      localStorage.removeItem('name');
      sessionStorage.removeItem('addr');
    }}>데이터삭제 버튼</button>


    <button type='button' onClick={()=>{
      const  age = localStorage.getItem('age');
      const addr = sessionStorage.getItem('addr');
      alert(`age = ${age}, addr = ${addr}`);
    }}>데이터확인 버튼</button>

    </>
  )
}

export default StorageTest