import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Paystep3 from './Paystep3';

const Paystep2 = ({setStep,memberInfo, setMemberInfo}) => {

    // const [member, setMember] = useState(null);     //회원 데이터 저장
    const [isMember, setIsMember] = useState(false);//회원여부
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setMemberInfo(prevState => ({
            ...prevState,
            [name]: value // 동적으로 상태 업데이트
        }));
    };



    const nextstep = () =>{
        setStep(3)
    }
    const prestep = () =>{
        setStep(1)
    }

    const getUserInfo  = () => {
        axios.get('/member/info')
        .then(response => {
            if(response && response.data)
            setMemberInfo(response.data);

            setIsMember(true); // 회원으로 설정

        })
        .catch(error => {
            console.error('회원 정보 조회 실패: ', error)
        })
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%', width:'80%'  }}>
            <div style={{width:'80%', height:'50%'}}>
                <div style={{ backgroundColor: "brown", display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px', marginLeft:'10px' }}>회원 구분*</label>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <input type='radio' name='memberType' value="회원" title="회원" checked={isMember} disabled={isMember}/>
                            <label>회원</label>
                        </div>
                        <div>
                            <input type='radio' name='memberType' value="비회원" title="비회원" checked={!isMember} disabled={!isMember}/>
                            <label>비회원</label>
                        </div>
                    </div>

                </div>

                <div style={{backgroundColor:"pink" , display: 'flex'   , flexDirection: 'row', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px', marginLeft:'10px' }}>후원회원명*</label>
                    <div>
                        <input 
                        type="text"
                        name="memName"
                        value={memberInfo.memName}
                        onChange={handleChange}
                        placeholder="이름" 
                        disabled={isMember}
                            style={{ margin: 'auto' }}/>
                    </div>
                </div>

                <div style={{backgroundColor:"blue" , display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px', marginLeft:'10px' }}>전화번호*</label>
                    <div>
                        <input type='text' 
                            value={memberInfo.tel} 
                            onChange={(e) => setMemberInfo({ ...memberInfo, tel: e.target.value })} 
                            disabled={isMember} 
                            style={{ margin: 'auto' }}/>
                    </div>
                </div>

                <div style={{backgroundColor:"yellow" , display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px', marginLeft:'10px' }}>이메일*</label>
                    <div>
                        <input type='text' 
                            value={memberInfo.email} 
                            onChange={(e) => setMemberInfo({ ...memberInfo, email: e.target.value })} 
                            disabled={isMember} 
                            style={{ margin: 'auto' }}/>
                    </div>
                </div>

                    <button onClick={prestep}>이전단계</button>
                    <button onClick={nextstep}>다음단계</button>
                    <hidden><Paystep3 /></hidden>
                </div>

        </div>
        
    );
};

export default Paystep2;