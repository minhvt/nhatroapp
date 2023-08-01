import axios from 'axios';
import React, { useEffect, useState } from 'react';

function DanhSachPhong(props) {
    const baseUrl = "https://nhatroapi.onrender.com"; // /phongtro /hoadon
    const [data, setData] = useState();
    const loadPhongTro = () => {
        let url = baseUrl + "/phongtro";
        axios.get(url)
            .then((res) => setData(res.data));
    }

    useEffect(loadPhongTro, []);

    return (
        <div>
            <h2>Danh sách phòng trọ</h2>
            <table border="1" style={{ width: "100%" }}>
                <tr>
                    <th>ID</th>
                    <th>Phòng</th>
                    <th>Phí thuê</th>
                    <th>Giá điện</th>
                    <th>Giá nước</th>
                    <th>Ghi chú</th>
                </tr>
                {data?.map(item => (<tr>
                    <td>{item.id}</td>
                    <td>{item.sophong}</td>
                    <td>{item.phithue}</td>
                    <td>{item.giadien}</td>
                    <td>{item.gianuoc}</td>
                    <td>{item.ghichu}</td>
                </tr>))}
            </table>

        </div>
    );
}

export default DanhSachPhong;