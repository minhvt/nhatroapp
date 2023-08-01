import axios from 'axios';
import React, { useEffect, useState } from 'react';
import cash from '../images/Dollar-icon.png';
import imgUpdate from '../images/Pencil-icon.png';
import imgDelete from '../images/delete-1-icon.png';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import fmtCurrency from './Utils';

function DanhSachHoaDon(props) {
    const baseUrl = "https://nhatroapi.onrender.com"; // /phongtro /hoadon
    const [data, setData] = useState();
    const navigate = useNavigate();

    const loadHoaDon = () => {
        let url = baseUrl + "/hoadon?_sort=thang&_order=desc";
        axios.get(url)
            .then((res) => setData(res.data));
    }

    const fmtDate = (strD) => {
        let d = new Date(strD);
        return d.getMonth() + 1;
    }

    const thanhToan = (obj, idphong, thangThue) => {
        console.log("idphong: " + idphong);
        let thang = fmtDate(thangThue);
        let thangTruoc = 1;
        if (thang == 1) {
            thangTruoc = 11; // Tương ứng tháng
        } else {
            thangTruoc = thang - 2;
        }
        console.log("thangTruoc: " + thangTruoc);
        console.log(thangThue.toISOString().split('T')[0]);
        let monthPre = new Date();
        monthPre.setDate(1);
        monthPre.setMonth(thangTruoc);
        console.log("monthPre.getMonth(): " + monthPre.getMonth());
        if (thang == 1) {
            console.log("--------------------");
            console.log("thangThue.getFullYear(): " + thangThue.getFullYear());
            monthPre.setFullYear(thangThue.getFullYear() - 1);
        }

        console.log("monthPre: " + monthPre.toISOString().split('T')[0]);

        let strThang = monthPre.toISOString().split('T')[0];
        let url = baseUrl + "/hoadon?idphong=" + idphong + "&thang=" + strThang;
        console.log(url);

        axios.get(url)
            .then(res => {
                let objPre = res.data[0];
                if (objPre != null) {
                    let chiSoDien = obj.sodien - objPre.sodien;
                    let chiSoNuoc = obj.sonuoc - objPre.sonuoc;
                    console.log("chiSoDien: " + chiSoDien);
                    console.log("chiSoNuoc: " + chiSoNuoc);
                    tinhHoaDon(obj, idphong, chiSoDien, chiSoNuoc);
                } else {
                    alert("Không tìm thấy dữ liệu tháng trước");
                }
            });
    }

    const tinhHoaDon = (objHD, idPhong, chiSoDien, chiSoNuoc) => {
        // Lấy thông tin phòng
        let url = baseUrl + "/phongtro/" + idPhong;
        console.log("Chi tiết phòng: " + url);
        axios.get(url)
            .then(res => {
                let phong = res.data;
                let tienDien = phong.giadien * chiSoDien;
                let tienNuoc = phong.gianuoc * chiSoNuoc;
                // console.log(phong);
                // console.log("Giá điện: " + phong.giadien);
                // console.log("Giá nước: " + phong.gianuoc);
                // console.log("Điện tháng này: " + (phong.giadien * chiSoDien));
                // console.log("Nước tháng này: " + (phong.gianuoc * chiSoNuoc));
                objHD.tiendien = tienDien;
                objHD.tiennuoc = tienNuoc;
                updateHoaDon(objHD);
            });
    }

    const updateHoaDon = (objHD) => {
        let url = baseUrl + "/hoadon/" + objHD.id;
        axios.put(url, objHD)
            .then(res => {
                console.log("Cập nhật hóa đơn thành công");
                navigate("/hoadon-ds");
            });
    }

    const initUpdateHoaDon = (objHD) => {
        navigate("/hoadon-ds/insert/" + objHD.id);
    }

    const initDeleteHoaDon = (objHD) => {
        let isOk = window.confirm("Sẽ hóa Hóa Đơn phòng " + objHD.idphong + " của tháng " + objHD.thang);
        if (isOk) {
            let url = baseUrl + "/hoadon/" + objHD.id;
            axios.delete(url)
                .then(res => {
                    alert("Xóa thành công!");
                    navigate("/hoadon-ds");
                })
                .catch(err => {
                    alert("Lỗi: " + err);
                });
        }
    }

    let location = useLocation();
    useEffect(loadHoaDon, [location]);

    return (
        <div>
            <h2>Danh sách hóa đơn</h2>
            <Link to="/hoadon-ds/insert">Thêm mới</Link>
            <hr />
            <Outlet />
            <hr />
            <table border="1" style={{ width: "100%" }}>
                <thead>
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
                        <th>Cập nhật</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, key) => (<tr key={key}>
                        <td>{item.id}</td>
                        <td>{item.idphong}</td>
                        <td>{item.thang}</td>
                        <td>{item.sodien}</td>
                        <td>{item.sonuoc}</td>
                        <td>{fmtCurrency.format(item.tiendien)}</td>
                        <td>{fmtCurrency.format(item.tiennuoc)}</td>
                        <td>{item.ghichu}</td>
                        <td align='center'>
                            <img onClick={() => thanhToan(item, item.idphong, new Date(item.thang))} src={cash} alt='Thanh toán' />
                        </td>
                        <td align='center'>
                            <img onClick={() => initUpdateHoaDon(item)} src={imgUpdate} alt='Cập nhật' />
                        </td>
                        <td align='center'>
                            <img onClick={() => initDeleteHoaDon(item)} src={imgDelete} alt='Xóa' />
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}

export default DanhSachHoaDon;