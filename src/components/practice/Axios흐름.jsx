
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Axios흐름 = () => {
  //게시글 번호를 서버에서 받은 후, 
  //받은 게시글 번호에 해당하는 댓글 목록 조회

  const [num, setNum] = useState(0);

  useEffect(() => {
    if(num != 0){
      //받은 게시글 번호에 달린 댓글 목록 조회
      axios.get(`/api/replies/${num}`)
      .then().catch();
    }
  }, [num])

  useEffect(() => {
 

    
  }, []);


  return (
    <div>Axios흐름</div>
  )
}

export default Axios흐름