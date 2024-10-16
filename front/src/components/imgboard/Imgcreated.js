import React, { useState } from 'react';
import '../../assets/css/Imgcreated.css';
import axios from 'axios';

const Imgcreated = () => {
//const Imgcreated = ({memId}) => { //login에서 memId 받아야함


//( memId, cate, title, content, created) 
// (img 테이블)(-)
 const[imgData, setImgData] = useState({
     memId: 'memId연동(-)',cate: '',title: '',content: '' 
 })
 const { memId, cate, title, content} = imgData 



    const changeInput =(evt)=>{
        const{value,name} = evt.target;
        setImgData({
            ...imgData,
            [name]:value
        })
    }
    


//btn  ---------

     const onSubmit = () => {
         
        //유효성 검사 코딩 (-)
     
        axios.post('/imgboard/created', imgData)
        .then(res=>{ 

            //from controller
            alert(res.data)  
            
            //redirecrt
            window.location.href ='/imgboard/list'

        })
        .catch(error=>{
            console.error(error)
            alert("에러임 : " + error)
        })
    }

    const boardReset = () => { //(imgPostId, cate, title, content, created) //file(-)
        setImgData({
            imgPostId: '',cate:'',title: '',content: '',created: ''
        });
    }
    
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
                                    name="memId"
                                    className="boxTF"
                                    value={memId}
                                    readOnly
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
                </div>

            {/*  파일 업로드  */}

            <div id="bbsCreated_footer">
                    <input
                        type="button"
                        value=" 등록하기 "
                        className="btn2"
                        onClick={onSubmit}
                    />
                    <input
                        type="button"
                        value="다시입력 "
                        className="btn2"
                        onClick={boardReset}
                    />
                    <input
                        type="button"
                        value=" 작성취소 "
                        className="btn2"
                        onClick={() => (window.location.href = '/imglist.action')}
                    />
                </div>



            </form>
        </div>
    )
}

export default Imgcreated;
