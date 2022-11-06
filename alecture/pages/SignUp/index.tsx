// import useInput from '@hooks/useInput';
// import fetcher from '@utils/fetcher';
// import React, { useCallback, useState, VFC } from 'react';
// import axios from 'axios';
// import useSWR from 'swr';
// import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
// import { Link, Redirect } from 'react-router-dom';

// const SignUp = () => {
//   const { data, error, revalidate } = useSWR('/api/users', fetcher);

//   const [email, onChangeEmail] = useInput('');
//   const [nickname, onChangeNickname] = useInput('');
//   const [password, , setPassword] = useInput('');
//   const [passwordCheck, , setPasswordCheck] = useInput('');
//   const [mismatchError, setMismatchError] = useState(false);
//   const [signUpError, setSignUpError] = useState('');
//   const [signUpSuccess, setSignUpSuccess] = useState(false);

//   const onChangePassword = useCallback(
//     (e) => {
//       setPassword(e.target.value);
//       setMismatchError(e.target.value !== passwordCheck);
//     },
//     [passwordCheck],
//   );

//   const onChangePasswordCheck = useCallback(
//     (e) => {
//       setPasswordCheck(e.target.value);
//       setMismatchError(e.target.value !== password);
//     },
//     [password],
//   );

//   const onSubmit = useCallback(
//     (e) => {
//       e.preventDefault();
//       if (!mismatchError && nickname) {
//         console.log('서버로 회원가입하기');
//         setSignUpError('');
//         setSignUpSuccess(false);
//         axios
//           .post('/api/users', {
//             email,
//             nickname,
//             password,
//           })
//           .then((response) => {
//             console.log(response);
//             setSignUpSuccess(true);
//           })
//           .catch((error) => {
//             console.log(error.response);
//             setSignUpError(error.response.data);
//           })
//           .finally(() => {});
//       }
//     },
//     [email, nickname, password, passwordCheck, mismatchError],
//   );

//   if (data === undefined) {
//     return <div>로딩중...</div>;
//   }

//   if (data) {
//     return <Redirect to="/workspace/sleact/channel/일반" />;
//   }

//   return (
//     <div id="container">
//       <Header>Sleact</Header>
//       <Form onSubmit={onSubmit}>
//         <Label id="email-label">
//           <span>이메일 주소</span>
//           <div>
//             <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
//           </div>
//         </Label>
//         <Label id="nickname-label">
//           <span>닉네임</span>
//           <div>
//             <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
//           </div>
//         </Label>
//         <Label id="password-label">
//           <span>비밀번호</span>
//           <div>
//             <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
//           </div>
//         </Label>
//         <Label id="password-check-label">
//           <span>비밀번호 확인</span>
//           <div>
//             <Input
//               type="password"
//               id="password-check"
//               name="password-check"
//               value={passwordCheck}
//               onChange={onChangePasswordCheck}
//             />
//           </div>
//           {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
//           {!nickname && <Error>닉네임을 입력해주세요.</Error>}
//           {signUpError && <Error>{signUpError}</Error>}
//           {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
//         </Label>
//         <Button type="submit">회원가입</Button>
//       </Form>
//       <LinkContainer>
//         이미 회원이신가요?&nbsp;
//         <Link to="/login">로그인 하러가기</Link>
//       </LinkContainer>
//     </div>
//   );
// };

// export default SignUp;


import React, {useCallback, useState} from "react";
import { Success , Header, Form, Label, Input, Button, LinkContainer, Error } from './styles';
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';

//axios 추가
import axios from 'axios';

const SignUp = () => {
  //단순한 input 중복
  const [email, onChangeEmail] = useInput('');
  const [nickname,onChangeNickname] = useInput('');


  //커스터 마이징이 필요할 때 가운데를 빈 값으로 두면된다.
  const [password, ,setPassword] = useInput('');
  const [passwordCheck, ,setPasswordCheck] = useInput('');

  //비밀번호 , 비밀번호확인 같은지 여부 판단
  const [mismatchError, setMissmatchError] = useState(false);

  //서버에서 보내준 에러메세지 표시
  const [signUpError, setSignUpError ] = useState('');

  //서버에서 성공할 경우
  const [signUpSuccess, setSignUpSuccess] = useState(false);


  //비밀번호 변경 함수
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setMissmatchError(e.target.value !== passwordCheck)
  },[passwordCheck]);

  //비밀번호 확인 변경 함수
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setMissmatchError(e.target.value !== password)
  },[password]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
   
    if(mismatchError === false) {
      console.log(email,email, nickname, password, passwordCheck )
      console.log('서버로 회원가입하기');


      //요청 전 초기화
      setSignUpError('');
      setSignUpSuccess(false);
      //axios 작성
      axios.post('/api/users' , {
        email,
        nickname,
        password,
      })
        //성공시 실행
        .then((response) => {
          console.log(response);
          //성공시 signUpSuccess를 true로 바꿔준다.
          setSignUpSuccess(true);
        })
        //실패시 실행
        .catch((error) => {
          console.log(error.response)
          //에러일때 true
          setSignUpError(error.response.data);
          
        })
        //성공하던 실패하던 공통으로 실행 
        .finally(() => {})
    }
  },[email, nickname, password, passwordCheck, mismatchError]);


  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {/* 에러메세지 */}
          {signUpError && <Error>{signUpError}</Error>}
          
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
}

export default SignUp;