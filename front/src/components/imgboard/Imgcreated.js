import React, { useEffect, useState } from 'react';
import '../../assets/css/Imgcreated.css';
import axios from 'axios';

const Imgcreated = () => {
//const Imgcreated = ({userId}) => { //login에서 userId 받아야함

 const[imgData, setImgData] = useState({
  userId: '',cate: '',title: '',content: '',originalFileName: '',saveFileName: '',file:null
 })
 const {userId, cate, title, content, originalFileName,saveFileName } = imgData 


useEffect(()=>{
    axios.get('http://localhost:3000/api/imgboard/imgcreated.action')
    .then(res=> { setImgData(res.data.imgData)})
    .catch(error=>console.log(error));
},[])

    const changeInput =(evt)=>{
        const{value,name} = evt.target;
        setImgData({
            ...imgData,
            [name]:value
        })
    }
    const selectFile = (evt) => {
        const file = evt.target.files[0];

        if (file) {
            setImgData({ // 배열복사 아닌 객체복사 위해 {}
                ...imgData,
                originalFileName: file.name,
                saveFileName: file.name ,
                file:file
                
            })
        }
    }


//btn 부분 ---------

     const onSubmit = (evt) => {
        evt.preventDefault();

        const formData = new FormData()

        Object.keys(imgData).forEach(key =>{   
            formData.append(key,imgData[key])
            //imgData의 모든 속성가져와서 각 키에 해당하는 값 추가
        })

        axios.post('/api/imgboard/imgcreated', formData,{headers:{
            'Content-Type' : 'multipart/form-data' //파일 업로드를 위함 
        }})
        .then(res=>{
            alert('게시물이 등록되었습니다!');  
            window.location.href = '/api/imgboard/imglist.action'
        })
        .catch(error=>console.log(error))
    }

    const boardReset = () => {
        setImgData({
            userId: '',cate: '',title: '',content: '',originalFileName: '',saveFileName: '',file:null
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
                </div>

            {/*  파일 업로드  */}
<div>
                <label>파일 선택:</label>
                <input type="file"  onChange={selectFile}/>
                {originalFileName && (
                    <div className="file-info">
                        <p>선택된 파일: {originalFileName}</p>
                    </div>
                )}
            </div>
                 <div>
                <p>저장 파일명: {saveFileName}</p>
                </div> 
             

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
