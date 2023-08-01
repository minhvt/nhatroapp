import axios from 'axios';
import React, { useEffect, useState } from 'react';
import fmtCurrency from './Utils';

function DanhSachPhong(props) {
    const baseUrl = "https://64a6783d096b3f0fcc7fd63a.mockapi.io"; // /phongtro /hoadon
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
                    <td>{fmtCurrency.format(item.phithue)}</td>
                    <td>{fmtCurrency.format(item.giadien)}</td>
                    <td>{fmtCurrency.format(item.gianuoc)}</td>
                    <td>{item.ghichu}</td>
                </tr>))}
            </table>

        </div>
    );
}

export default DanhSachPhong;