import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Join.module.css'
import ShopSelect from '../common_component/ShopSelect';
import ShopInput from '../common_component/ShopInput';
import ShopButton from '../common_component/ShopButton';
import { regUser } from '../apis/userApi';


const Join = () => {

  const[userName1,setUserName1] = useState('');

  const {userId} =useParams();

  //id입력이 잘못되었을때 나타나는 에러 메세지 
  const [errorMsg,setErrorMsg] = useState({
    userId : '',
    userPw: '',
    userTel: ''
  });

  

  const nav = useNavigate();

  const [insetuser,setInsertuser] = useState({
    userId: '',
    userPw: '',
    userName: '',
    userEmail: '', //완성된 이메일
    email1: '', 
    email2: '@gmail.com', 
    userTel: '', //완성된 연락처 010-2222-1111
    tel1 : '',
    tel2 : '',
    tel3 : ''
  });






//email1,email2 값이 변경될때만 실행
useEffect(()=>{
  setInsertuser({
    ...insetuser,
    userEmail: insetuser.email1 +insetuser.email2
  });
},[insetuser.email1,insetuser.email2]);


//tel1,tel2,tel3 값이 변경될때만 실행
useEffect(()=>{
  setInsertuser({
    ...insetuser,
    userTel : [insetuser.tel1,insetuser.tel2,insetuser.tel3].join('-')
  })
},[insetuser.tel1,insetuser.tel2,insetuser.tel3]);


const change = (e) =>{
  
    setInsertuser({...insetuser,
      [e.target.name] : e.target.value,
    }); 
}


      //회원가입 전 유효성 검사
const joinValidate = ()=>{

  let result = 0;

  setErrorMsg((state)=>{
    return{
      userPw: '',
      userId: '',
      userTel : ''
    }
  });

  //4~16글자의 영문자로만 이루어진 정규식
  const regex_id = /^[a-zA-Z]{4,16}$/;

  if(!regex_id.test(insetuser.userId)){
    result =1;

    setErrorMsg((state)=>{
      return{
        ...state,
        userId : '잘못된 아이디입니다.' 
        
      }
    });
  }

  // 영어는 대문자나 소문자 + 숫자는 포함 
  const regex_pw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

  if(!regex_pw.test(insetuser.userPw)){
    result =1;

    setErrorMsg((state)=>{
      return{
        ...state,
        userPw: '잘못된 비밀번호입니다'
      }
    });
  }

  const regex_Tel =  /^(01[0-9]-\d{3,4}-\d{4}|0[2-9]-\d{3,4}-\d{4})$/;
  if(!regex_Tel.test(insetuser.userTel)){
    result =1;

    setErrorMsg((state)=>{
      return{
        ...state,
        userTel: '잘못된 연락처입니다'
      }
    });
  }
  return result;
}


const userName = ()=>{
  axios.get(`/api/${userId  }`)
  .then((res)=>{
    setUserName1(res.data);
  }).catch()
}




//가입 버튼 클릭시 회원가입 진행
const join = ()=>{
  
  //유효성 검사
const result = joinValidate();


  if(result === 0){
    regUser(insetuser)
  .then((res) => {
    //회원가입 됐을때
    if(res.data){
      alert('성공')

    }
    //회원가입 안됐다 = 아이디가 중복일때
    else{
      setErrorMsg({
        ...errorMsg,
        userId : '중복된 아이디입니다'
      })
    }
    

  })
  .catch(error => console.log(error));
  }
  
}





console.log(insetuser);
console.log(errorMsg);

  return (
    <>

    <h3 >회원 가입하기</h3>

    <div className={styles.Join}>
      <table>
        <thead>

          <tr>
            <td>아이디<br/> 
            <ShopInput  type="text" name='userId' value={insetuser.userId} onChange={(e)=>{change(e)}}/>
              {
                errorMsg.userId && <p className='error-msg'>{errorMsg.userId}</p>
              }
            
            </td>
          </tr>

            {/* 영어 숫자를 포함한 6~20글자 */}
          <tr>
            <td>비밀번호 <br/>
            <ShopInput type="password" name='userPw' value={insetuser.userPw} onChange={(e)=>{change(e)}}/>
              {
                errorMsg.userPw && <p className='error-msg'>{errorMsg.userPw}</p>
              }
              
            </td>
          </tr>

          <tr>
            <td>이름 <br/> 
            <ShopInput type="text" name='userName' value={insetuser.userName} onChange={(e)=>{change(e)}}/>
            </td>
          </tr>

          <tr>
            <td>이메일 <br/> 
            <ShopInput type="text" name='email1' value={insetuser.email1} onChange={(e)=>{change(e)}}/>
            
          
            <ShopSelect 
            name='email2' 
            value={insetuser.email2} 
            onChange={(e)=>{change(e)}}>

              <option value='@gmail.com'>@gmail.com</option>
              <option value='@naver.com'>@naver.com</option>

            </ShopSelect>

            </td>
          </tr>

          <tr>
            <td>연락처  <br/>
            <ShopInput  type="text"name='tel1' value={insetuser.tel1}  onChange={(e)=>{change(e)}}/>-

            <ShopInput type="text"name='tel2' value={insetuser.tel2} onChange={(e)=>{change(e)}}/>-

            <ShopInput type="text"name='tel3' value={insetuser.tel3} onChange={(e)=>{change(e)}}/>
            {
              errorMsg.userTel && <p className='error-msg'>{errorMsg.userTel}</p>
            }
            </td>
          </tr>
        </thead>
      </table>
      <ShopButton type='button' 
      click={(e)=>{join()}}
          
        >
            가입
      </ShopButton>
      
    </div>


        

    </>
  )
}

export default Join