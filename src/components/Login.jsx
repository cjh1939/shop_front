import React, { useState } from 'react'
import styles from './Login.module.css'
import ShopInput from '../common_component/ShopInput'
import ShopButton from '../common_component/ShopButton'
import axios from 'axios'
import { loginUser } from '../apis/userApi'
import { data, useNavigate } from 'react-router-dom'


/**
 *  axios.get으로 여러 데이터를 전달하는 방법
 * axios.get('url',{params: 전달할 데이터})
 * 
 * 전달할 데이터는 객체형식으로 전달 
 * 
 * 위 방식으로 전달할 데이턴느 스프링에서 
 * 1. ReQuestParam 어노테이션을 사용해서 받거나,
 * 2.DTO 객체로 데이터를 받으면 된다.
 * PS. 리액트 2번 PDF Query String 으로 전달된 데이터를 받는 방식과 일치
 * (페이지 번호 23번)
 */
const Login = ({setLoginInfo}) => {
  
  const nav = useNavigate();
  
  const [loginData,setLoginData] = useState({
    userId: '',
    userPw : ''
    
  });  
    
  const changeLoginData = (e)=>{
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  }




const login =()=>{

  loginUser(loginData)
  .then((res)=>{
    console.log(res.data)
    //자바에서 null데이터가 넘어오면 ''(빈문자) 로 받는다.
    if(res.data == ''){
      alert('실패');
      
    }else{
      alert('성공');

      //로그인에 성공하면 
      //세션스토리지에 로그인하는 회원의 아이디,이름 권한정보를 저장한다.
      // sessionStorage.setItem('회원아이디', res.data.userId);
      // sessionStorage.setItem('회원이름', res.data.userName);
      // sessionStorage.setItem('회원권한', res.data.userRoll);

      //로그인한 회원의 아이디,이름,권한정보만 가진 객체 생성
      const loginInfo ={
        userId : res.data.userId,
        userName: res.data.userName,
        userRoll : res.data.userRoll
      }

      //loginInfo 객체를 json (객체형태로 생긴 문자열)으로 변환 후 세션에 저장     
      //JOSN.stringify(객체) -> 객체를 문자열화 한다(josn) 한다
      //JOSN>parse(json) -> josn 데이터를 객체로 변환한다
      sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo)); 
      setLoginInfo(loginInfo); //로그인 성공시 app 재랜더링
      //로그인한 유조의 권한에 따라 이동할 페이지 지정 
      
      //일반 회원 : 상품 목록 페이지, 관리자: 상품등록 페이지 
      nav(loginInfo.userRoll === 'USER' ? '/' : '/admin/reg-item');

    }

    
  })
  .catch(()=>{})
  
}



  return (
    <>

    <div className={styles.container}> 
      <h3>로그인</h3>
      <div className={styles.contentContainer}>

        <div>
          <p>아이디</p>
          <ShopInput size='wide'
          type='text'
          name='userId'
          value={loginData.userId}
          onChange={(e)=>{ changeLoginData(e)}}
          />
        </div>

        <div>
        <p>비밀번호</p>
        <ShopInput size='wide' 
        type='password'
        name='userPw'
        value={loginData.userPw}
        onChange={(e)=>{ changeLoginData(e)}}
        />
        </div>

        <div>
          <ShopButton title='로그인' type='button' click={(e)=>{
            login()
            
          }}/>
        </div>

      </div>
    </div>






    </>
  )
}

export default Login