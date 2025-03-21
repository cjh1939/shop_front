
import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './components/UserLayout'
import AdminLayout from './components/AdminLayout'
import ItemForm from './components/ItemForm'
import CateManage from './components/CateManage'
import { useEffect, useState } from 'react'
import Modal from './components/Modal'
import State변경함수흐름 from './components/practice/State변경함수흐름'
import Axios흐름 from './components/practice/Axios흐름'
import ShopButton from './common_component/ShopButton'
import ShopInput from './common_component/ShopInput'
import Join from './components/Join'
import ShopSelect from './common_component/ShopSelect'
import State변경함수흐름2 from './components/practice/State변경함수흐름2'
import State변경함수흐름3 from './components/practice/State변경함수흐름3'
import Login from './components/Login'
import StorageTest from './components/practice/StorageTest'
import UploadTest from './components/practice/UploadTest'

function App() {
  
//로그인 정보를 저장할 state 변수
const [loginInfo,setLoginInfo] =useState(null);
  //Login.jsx에서 로그인을 성공하면 setLoginInfo () 함수에 이용해서
  //로그인한 정보를 loginInfo변수에 저장한다.
  //하지만 이 상태에서 새로고침(f5)하면 loginInfo변수에 저장된 로그인 정보가 사라진다
  //그래서 새로고침을 하더라도 sessionStorage 에 저장된 데이터로 로그인 정보를 유지 시켜주기위해 
  //아래의 useEffect 안에서 한번더 로그인 정보를 가져온다 .
useEffect(()=>{

  //sessionStorage에 있는 loginInfo 데이터 가져오기
  //login 데이터가 없다면 로그인 안한것 -> null
  //이렇게 가져온 데이터는 josn형태이다

  const strLoginInfo =sessionStorage.getItem('loginInfo');

  //sessionStorage에 로그인 정보가 있으면 
  if(strLoginInfo != null){
    //sessionStorage에서 받은 Json데이터를 객체로 변환한다.
    //변환된 loginInfo 객체에는 로그인한 회원의 아이디, 이름, 권한정보가 들어있다.
    setLoginInfo(JSON.parse(strLoginInfo));
    
    }
  },[]);



  return (

      

        <div className='container'>

        {/* <StorageTest/> */}
        <UploadTest/>
      <Routes>
        {/* 유저가 접속하는 페이지 */} 
        <Route path='/' element={ <UserLayout  loginInfo={loginInfo} setLoginInfo={setLoginInfo} /> }>
        
          {/* 상품목록 페이지 */}
          <Route path='' element={ <div>상품 목록 페이지</div> }/>

            {/* 회원가입 페이지 */}
          <Route path='/join' element={ <Join/> }/>

            {/* 로그인 페이지 */}
          <Route path='/login' element={ <Login setLoginInfo={setLoginInfo}/> }/>

          {/* 상품 상세 페이지 */}
          <Route path='detail' element={<div>상품 상세 페이지</div>}/>
        </Route>


        {/* 관리자가 접속하는 페이지 */}  
          <Route path='/admin' element={ <AdminLayout  loginInfo={loginInfo} setLoginInfo={setLoginInfo}/> }>
          {/* 상품등록 */}
          <Route path='reg-item' element={ <ItemForm /> }/>

          {/* 카테고리 관리 */}
          <Route path='cate-manage' element={ <CateManage /> }/>

          {/* 회원관리 */}
          <Route path='user-manage' element={<div>회원관리</div>}/>
          </Route>
      </Routes>
    </div>
  )
}

export default App
