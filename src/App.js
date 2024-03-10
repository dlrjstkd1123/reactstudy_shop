import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Route, Routes, Link, useNavigate, Outlet, json } from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/cart.js'

export let Context1 = createContext();

function App() {
  
  
  useEffect(() => {
    let watchedItems = localStorage.getItem('watched');
    if (watchedItems === null) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  let [shoes, setShoes] = useState(data);
  const [watchedItems1, setWatchedItems] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    // localStorage에서 watchedItems 가져오기
    const watchedItemsFromStorage = localStorage.getItem('watched');
    if (watchedItemsFromStorage) {
      setWatchedItems(JSON.parse(watchedItemsFromStorage));
    }
  }, []);

  useEffect(() => {
    // watchedItems에 해당하는 상품 정보 가져오기
    const watchedShoes = shoes.filter(shoes => watchedItems1.includes(shoes.id));
    console.log(watchedShoes);
    // watchedShoes를 화면에 표시하는 로직 추가
  }, [shoes, watchedItems1]);
  
  let [count, setCount] = useState(2);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">




      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" className='navlogo'>GS SHOP</Navbar.Brand>
          <Link to="/" className='link'>홈</Link>
          <Link to="detail/0" className='link'>상세페이지</Link>
          <Link to="cart" className='link'>cart</Link>
          <button onClick={() => {
            let copyshoes = [...shoes]
            copyshoes.sort(function (a, b) {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
                
              }
              return 0;
            });
            setShoes(copyshoes);
          }}>정렬</button>
          <Nav className="me-auto">
            {/* <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Cart</Nav.Link> */}


          </Nav>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={<div><ShoesList shoes={shoes} />
          <button onClick={() => {

            setCount(prevCount => prevCount + 1)
            if (count >= 4) {
              alert('상품이 없음')
            }

            axios.get(`https://codingapple1.github.io/shop/data${count}.json`)
              .then((result) => {
                // let copy = [...shoes, ...result.data]
                // setShoes(copy) 오브젝트 합치기 편법...  
                setShoes(prevShoes => prevShoes.concat(result.data));
              })
              .catch(() => {
                //실패했을때
              })
          }}>버튼</button>
        </div>
        }></Route>
        <Route path="/detail/:id" element={
          <Context1.Provider value={{재고,shoes}}>
            <Detail shoes={shoes} />
          </Context1.Provider>}></Route>


        <Route path="/event" element={<Event />}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>

        </Route>
        <Route path= "/cart" element={<Cart></Cart>}>

        </Route>

      </Routes>


    </div>

  );
}
function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}
function ShoesList(props) {
  return (
    <div>
      <div className='main-bg'></div>
      <div className="container">
        <div className="row" >
          {
            props.shoes.map(function (a, i) {
              return (
                
                <Shoes shoes={props.shoes[i]} a={a} i={i}></Shoes>
                
              )
            })

          }

        </div>
      </div>
    </div>
  )


}
function Shoes(props) {
  return (
    <div className="col-md-4">
      <Link to={`detail/${props.i}`}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width="80%" />
      </Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.a.content}</p>
    </div>
  )
}
// function Detail() {
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
//         </div>
//         <div className="col-md-6">
//           <h4 className="pt-5">상품명</h4>
//           <p>상품설명</p>
//           <p>120000원</p>
//           <button className="btn btn-danger">주문하기</button>
//         </div>
//       </div>
//     </div>
//   )
// } Detail.js
export default App;
