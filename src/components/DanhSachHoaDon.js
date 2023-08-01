import axios from 'axios';
import React, { useEffect, useState } from 'react';
import cash from '../images/Dollar-icon.png';

function DanhSachHoaDon(props) {
    const baseUrl = "https://nhatroapi.onrender.com"; // /phongtro /hoadon
    const [data, setData] = useState();
    const loadHoaDon = () => {
        let url = baseUrl + "/hoadon";
        axios.get(url)
            .then((res) => setData(res.data));
    }

    const fmtDate = (strD) => {
        let d = new Date(strD);
        return d.getMonth() + 1;
    }

    const thanhToan = (idphong, thang) => {
        console.log("idphong: " + idphong);
        console.log("thang: " + thang);
        let intThang = 1;
        if (thang == 1) {
            intThang = 12;
        } else {
            intThang = thang - 1;
        }
        let d = new Date();
        console.log(d.toISOString().split('T')[0]);
        if (thang == 1) {
            console.log("--------------------");
            d.setFullYear(d.getFullYear() - 1);
        }

        console.log("intThang: " + intThang);
        d.setMonth(intThang);
        d.setDate(1);
        // d.setFullYear(2023);

        console.log("d.getFullYear()" + d.getFullYear());


        let strThang = d.toISOString().split('T')[0];
        let url = baseUrl + "?idphong=" + idphong + "&thang=" + strThang;

        console.log(url);
    }

    useEffect(loadHoaDon, []);

    return (
        <div>
            <h2>Danh sách hóa đơn</h2>
            <table border="1" style={{ width: "100%" }}>
                <tr>
                    <th>ID</th>
                    <th>Phòng</th>
                    <th>Tháng</th>
                    <th>Số điện</th>
                    <th>Số nước</th>
                    <th>Tiền điện</th>
                    <th>Tiền nước</th>
                    <th>Ghi chú</th>
                    <th>Tính tiền</th>
                </tr>
                {data?.map((item, key) => (<tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.idphong}</td>
                    <td>{fmtDate(item.thang)}</td>
                    <td>{item.sodien}</td>
                    <td>{item.sonuoc}</td>
                    <td>{item.tiendien}</td>
                    <td>{item.tiennuoc}</td>
                    <td>{item.ghichu}</td>
                    <td align='center'>
                        <img onClick={() => thanhToan(item.idphong, fmtDate(item.thang))} src={cash} alt='Thanh toán' />
                    </td>
                </tr>))}
            </table>
        </div>
    );
}

export default DanhSachHoaDon;