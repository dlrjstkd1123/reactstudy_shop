import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeName , increase,minusItem,numberUp} from "../store";


function Cart() {
    let state= useSelector((state) => { return state});//state.user하면 user state만 사용
    let dispatch = useDispatch()
    

    return (
        <div>
            <h6>{state.user.age}</h6>
            <button onClick={()=>{
                dispatch(increase(10))
            }}>버튼</button>
            <Table>

                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {state.storage.map(function (a, i) {
                        return (
                            <tr key={i}>
                                <td>{a.id}</td>
                                <td>{state.storage[i].name}</td>
                                <td>{state.storage[i].count}</td>
                                <td><button onClick={()=>{
                                   dispatch(numberUp(a.id)) 
                                }}>+</button></td>
                                <td><button onClick={()=>{
                                    dispatch(minusItem(a.name))
                                }}>-</button></td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>

        </div>
    )
}

export default Cart