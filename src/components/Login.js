import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [acc, setAcc] = useState({
        uname: "minhvt",
        upass: "1234$"
    });
    const [inputs, setInputs] = useState({});
    const [logged, setLogged] = useState(false);
    const navigation = useNavigate();

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;

        setInputs({ ...inputs, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputs.txtUsername == acc.uname && inputs.txtPassword == acc.upass) {
            //alert("Đúng tài khoản");
            setLogged(true);
            navigation("/phong-ds");
        } else {
            alert("SAI THÔNG TIN TÀI KHOẢN");
        }
    }

    return (
        <div>
            {/* {logged ? <b>[{acc.uname}]</b> : <b>[Cần phải đăng nhập]</b>} */}
            <form onSubmit={handleSubmit}>
                <table border={1} style={{ margin: "0 auto" }}>
                    <caption>
                        <h2>Đăng nhập</h2>
                    </caption>
                    <tr>
                        <th>Tài khoản</th>
                        <td>
                            <input type="text" id="txtUsername" value={inputs.txtUsername} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>Mật khẩu</th>
                        <td>
                            <input type="password" id="txtPassword" value={inputs.txtPassword} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button>Đăng nhập</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}

export default Login;