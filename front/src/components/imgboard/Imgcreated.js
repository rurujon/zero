import React, { useEffect, useState } from 'react';
import './Imgcreated.css'
import axios from 'axios';

const Imgcreated = () => {
//const Imgcreated = ({userId}) => { //login에서 userId 받아야함



// userId, cate, title, content, filePath,created,saveFileName, originalFileName, pwd 


    const [userId, setUserId] = useState('');
    const [cate, setCate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [filePath, setFilePath] = useState('');
    const [saveFileName, setSaveFileName] = useState('');
    const [originalFileName, setOriginalFileName] = useState('');
    const [pwd, setPwd] = useState('');

    const [data, setData] = useState([])
    
    useEffect(()=>{
        axios.get('/api/imgboard/imgcreated')
        .then(res=> { 
            setData(res.data)
        })
        .catch(error=>console.log(error));

    },[])













//btn 부분 ---------


    const sendIt = () => {
        alert('게시물이 등록되었습니다!');  
    };


    //다시입력
    const boardReset = () => {
        setUserId('')
        setCate('')
        setTitle('')
        setContent('')
        setFilePath('')
        setSaveFileName('')
        setOriginalFileName('')
        setPwd('');
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
                                    size="35"
                                    maxLength="20"
                                    className="boxTF"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
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
                                    size="35"
                                    maxLength="50"
                                    className="boxTF"
                                    value={cate}
                                    onChange={(e) => setCate(e.target.value)}
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
                                    size="60"
                                    maxLength="100"
                                    className="boxTF"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
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
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </dd>
                        </dl>
                    </div>


                    <div>
                        <dl>
                            <dt>파일</dt>
                            <dd>
                                <input type='file'
                                  name="file"
                                  size="35"
                                  className="boxTF"
                                  value={originalFileName}
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
                                    onChange={(e) => setPwd(e.target.value)}
                                />
                                &nbsp;(게시물 수정 및 삭제 시 필요!!)
                            </dd>
                        </dl>
                    </div>
                </div>

                <div>
                    <label>파일 선택:</label>
                    <input type="file" onChange={handleFileChange} />
                    {originalFileName && (
                        <div className="file-info">
                            <p>선택된 파일: {originalFileName}</p>
                        </div>
                    )}
                </div>
                <div className="file-details">
                    <p>원본 파일명: {originalFileName}</p>
                    <p>저장 파일명: {saveFileName}</p>
                </div>
   

                <div id="bbsCreated_footer">
                    <input
                        type="button"
                        value=" 등록하기 "
                        className="btn2"
                        onClick={sendIt}
                    />
                    <input
                        type="reset"
                        value=" 다시입력 "
                        className="btn2"
                        onClick={boardReset}
                    />
                    <input
                        type="button"
                        value=" 작성취소 "
                        className="btn2"
                        onClick={() => (window.location.href = '/list.action')}
                    />
                </div>
            </form>
        </div>
    )
}

export default Imgcreated;
