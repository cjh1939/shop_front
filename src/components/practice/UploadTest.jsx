import axios from 'axios';
import React, { useState } from 'react'

const UploadTest = () => {


//첨부파일 input태그에서 선택한 파일을 저장할변수
  const [firstFile,setFirstFile] = useState(null);

  //자바로 데이터를전달 할때 문자뿐만 아니라 파일 데이터도 가져간다는것을 설정
  const fileConfig = {header:{'content-Type' : 'multipart/form-data'}} //첨부파일설정 ****

  
  
const sendFile =()=>{
    //첨부파일 데이터를 자바로 전달하기위해서는 Formdata () 객체를 사용해야함
    //formdata 데이터 객체 생성 : 첨부파일, input 태그 등의 모든데이터를 자바로 가져갈수있는 객체
    const form = new FormData();
    form.append('bookName','hong');
    form.append('bookPrice', 2000);
    form.append('firstFile', firstFile); //파일 데이터 담기 

  //post()메서드의 세번째 매개변수로 fileConfig 를 전달 (이거해야 파일첨부 됨)
  axios.post(
    '/api/test/upload1'
    , form
    , fileConfig)
  .then().catch()
}




  return (
    <>

    <div>
      <input type='file' 
     // multiple //이속성을 사용하면 한번에 여러파일 선택 가능
        
        onChange={(e)=>{
        //e.target.files : 선택한 파일들의정보
        console.log(e.target.files);
        console.log(e.target.files[0]);
        
        //파일을 선택할때마다 선택한 파일을 firstFile 에 저장한다 
        setFirstFile(e.target.files[0]);

        

      }}
    />
      <button type='button' onClick={()=>{sendFile()}}>파일전송</button>
    </div>

    </>
  )
}

export default UploadTest