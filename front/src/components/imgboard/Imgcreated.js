import React, { useEffect, useState } from 'react';
import './Imgcreated.css'
import axios from 'axios';
import FileUpload from './FileUpload';

const Imgcreated = () => {
//const Imgcreated = ({userId}) => { //login에서 userId 받아야함

useEffect(()=>{
    axios.get('/api/imgboard/imgcreated')
    .then(res=> { 
        setData(res.data)
    })
    .catch(error=>console.log(error));

},[])


// userId, cate, title, content,created,saveFileName, originalFileName, pwd 

    const [form,setForm] = useState({
        userId:'', cate:'',title:'',content:'', selectFile:null,saveFileName:'',
        originalFileName:'',pwd:'',
    })

    const {userId, cate, title, content,selectFile,saveFileName, originalFileName, pwd } = form
  
    const [data, setData] = useState([])
    
    const changeInput =(evt)=>{
        const{value,name} = evt.target
        setForm({
            ...form,
            [name]:value
        })
    }




//btn 부분 ---------


    const onSubmit = () => {
        alert('게시물이 등록되었습니다!');  
        //DB에 insert 및 리다이렉트 필요 (-)
    };


    //다시입력
    const boardReset = () => {
        setForm('')
        
    };

// ---------


    return (
        <div id="bbs">
            <div id="bbs_title">게 시 판</div>

            <form name="myForm">
                <div id="bbsCreated">
                    <div className="bbsCreated_bottomLine">
                        <dl>
                            <dt>작 성 자</dt>
                            <dd>
                                <input
                                    type="text"
                                    name="userId"
                                    className="boxTF"
                                    value={userId}
                                    onChange={changeInput}
                                />
                            </dd>
                        </dl>
                    </div>
                    <div className="bbsCreated_bottomLine">
                        <dl>
                            <dt>카테고리</dt>
                            <dd>
                                <input
                                    type="text"
                                    name="cate"                            
                                    className="boxTF"
                                    value={cate}
                                    onChange={changeInput}
                                />
                            </dd>
                        </dl>
                    </div>
                    <div className="bbsCreated_bottomLine">
                        <dl>
                            <dt>제&nbsp;&nbsp;&nbsp;&nbsp;목</dt>
                            <dd>
                                <input
                                    type="text"
                                    name="title"
                                  
                                    className="boxTF"
                                    value={title}
                                    onChange={changeInput}
                                />
                            </dd>
                        </dl>
                    </div>



                    <div id="bbsCreated_content">
                        <dl>
                            <dt>내&nbsp;&nbsp;&nbsp;&nbsp;용</dt>
                            <dd>
                                <textarea
                                    rows="12"
                                    cols="63"
                                    className="boxTA"
                                    name="content"
                                    style={{ resize: 'none', backgroundColor: '#ffffff' }}
                                    value={content}
                                    onChange={changeInput}
                                />
                            </dd>
                        </dl>
                    </div>


                    <div className="bbsCreated_noLine">
                        <dl>
                            <dt>패스워드</dt>
                            <dd>
                                <input
                                    type="password"
                                    name="pwd"
                                    size="35"
                                    maxLength="7"
                                    className="boxTF"
                                    value={pwd}
                                    onChange={changeInput}
                                />
                                &nbsp;게시물 수정 및 삭제 시 필요!!
                            </dd>
                        </dl>
                    </div>
                </div>

            {/*  파일 업로드  */}
                <FileUpload  form={setForm} changeInput={changeInput} sendIt={onSubmit}  boardReset={boardReset}/>

            </form>
        </div>
    )
}

export default Imgcreated;
