import React, { useState } from 'react';

const FileUpload = ( {form,changeInput,onSubmit,boardReset}) => {


    const handleFile=(evt)=>{
       
        const file = evt.target.files[0]

        if(file){
            setSelectFile(file)
            setOriginalFileName(file.name)
            setSaveFileName(file.name)
            //저장할 파일명 난수로 만들기 ? (-)
            
        }
    }





    return (
        <div>
            <div>
                <label>파일 선택:</label>
                <input type="file" onChange={handleFile}/>
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
                        onClick={onSubmit}
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
        </div>
    );
};

export default FileUpload;