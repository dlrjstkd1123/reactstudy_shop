import { json, useParams } from "react-router-dom";
// import styled from 'styled-components'
import { useContext, useEffect, useState } from "react";
import { Nav } from 'react-bootstrap';
import { Context1 } from "../App";
import { addItem } from "../store";
import { useDispatch } from "react-redux";

// let Box = styled.div`
//   background : grey;
//   padding : 10px;

// `
// //스타일 컴포넌트 재사용(props) 문법
// let Button = styled.button`
//   background : ${props => props.bg};//외우셈
//   color : ${props => props.bg == 'blue' ? 'white' : 'black'};
//   padding : 20px;
// `
// let CopyButton = styled.button(Button)``


//styled 컴포넌트 복사






function Detail(props) {
  let {재고} = useContext(Context1);
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id
  })
  let [alert1, setAlert] = useState(true)
  let [num, setNum] = useState('')
  let [tab,setTab] = useState(0);
  let [fade2,setFade2] = useState('');
  let dispatch = useDispatch();

  
  useEffect(()=>{
    
    let 꺼낸상품 =localStorage.getItem('watched')
    꺼낸상품 = JSON.parse(꺼낸상품)
    꺼낸상품.push(찾은상품.id)
    꺼낸상품 = new Set(꺼낸상품)
    꺼낸상품 = Array.from(꺼낸상품)
    localStorage.setItem('watched',JSON.stringify(꺼낸상품))
    


  },[])
  
  useEffect(()=>{
      setTimeout(() => {
        setFade2('end')
      }, 100);
    return()=>{
      setFade2('')
    }
  },[])

  useEffect(() => { //장착, 및 업데이트 때 실행 => html렌더링이 다 끝나고 실행
    let a = setTimeout(function () {
      setAlert(false)
    }, 2000);

    return () => {
      //useEffect 가 실행되기 전에 실행 
      clearTimeout(a) //기존 타이머 제거

    }
  }, []) //[]는 1회만 실행하고 싶을때
  useEffect(() => {
    if (isNaN(num) == true) {
      alert("그러지마세e요");
    }
  }, [num])


  // useEffect(()=>{ 실행할코드 }) 이러면 재렌더링마다 코드를 실행가능합니다.

  // useEffect(()=>{ 실행할코드 }, []) 이러면 컴포넌트 mount시 (로드시) 1회만 실행가능합니다.

  // useEffect(()=>{  
  //   return ()=>{
  //     실행할코드
  //   }
  // }) //이러면 useEffect 안의 코드 실행 전에 항상 실행됩니다. 

  // useEffect(()=>{ 
  //   return ()=>{
  //     실행할코드
  //   }
  // }, [])//이러면 컴포넌트 unmount시 1회 실행됩니다.

  // useEffect(()=>{ 
  //   실행할코드
  // }, [state1]) 이러면 state1이 변경될 때만 실행됩니다.


  return (
    <div className={`container start ${fade2}`}>
      {
        alert1 == true
          ? <div className="alert alert-warning">
            2초 이내 구매시 할인
          </div> : null
      }
      {/* <Box>
        <Button bg="yellow">버튼</Button>
        <Button bg ="blue">버튼</Button>
      </Box> */}
      <div className="row">
      
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${찾은상품.id + 1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <input type="text" onChange={function (e) {
            setNum(e.target.value)
          }} style={{ 'margin-top': '10px' }} />
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem({id : 찾은상품.id+1, name : 찾은상품.title , count : 1}))
          }}>주문하기</button>
        </div>
      </div>



      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=>{
            setTab(0)
          }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=>{
            setTab(1)
          }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=>{
            setTab(2)
          }}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}></TabContent>


      {/* {
        tab ==0 ? <div>내용0</div>:null
      }
      {
        tab ==1 ? <div>내용1</div>:null
      }
      {
        tab ==2 ? <div>내용2</div>:null
      } */}
      

    </div>
  )
}
function TabContent(props){ //props대신 {tab}하면 props변수 앞에 안붙여도 됨
  let [fade,setFade] = useState('')
  useEffect(()=>{ //바로 이어져 있으면 안됨 setFade
    setTimeout(()=>{setFade('end'); },300)
     
    return()=>{
      setFade('');
    }
  },[props.tab])
  if(props.tab == 0){
    return <div className={`start ${fade}`}>내용0</div>
  }
  else if(props.tab == 1){
    return <div className={`start ${fade}`}>내용1</div>
  }
  else if(props.tab == 2){
    return <div className={`start ${fade}`}>내용2</div>
  }
  
}
export default Detail;