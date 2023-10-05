import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function InsertHoaDon(props) {
    const { idhd } = useParams();
    const [inputs, setInputs] = useState({
        thang: (new Date()).toISOString().substring(0, 10),
        idphong: 1,
        sodien: 0,
        sonuoc: 0,
        ghichu: ""
    });
    const [mess, setMess] = useState("");
    const navigate = useNavigate();

    const baseUrl = "https://64a6783d096b3f0fcc7fd63a.mockapi.io"; // /phongtro /hoadon
    const [data, setData] = useState();

    const onload = () => {
        loadPhongTro();
        loadHoaDonDetail();
    }

    const loadHoaDonDetail = () => {
        console.log(idhd);
        if (idhd != null) {
            // alert(idhd);
            let url = baseUrl + "/hoadon/" + idhd;
            axios.get(url)
                .then(res => {
                    setInputs(res.data);
                });
            // navigate("/hoadon-ds");
        }
    }

    const loadPhongTro = () => {
        let url = baseUrl + "/phongtro";
        axios.get(url)
            .then((res) => setData(res.data));
    }

    const checkHoaDon = (e) => {
        let url = baseUrl + "/hoadon";
        if (idhd != null) {
            // Cập nhật
            url += "/" + inputs.id;
            axios.put(url, inputs)
                .then(res => {
                    setMess("CẬP NHẬT THÀNH CÔNG");
                    console.log("Cập nhật hóa đơn thành công");
                    navigate("/hoadon-ds");
                })
                .catch(err => {
                    setMess("Lỗi: " + err);
                    console.log("Thất bại do: " + err);
                });
        } else {            
            // Thêm mới
            let thangThue = new Date(inputs.thang);
            thangThue.setDate(1); // Cài đặt lại về ngày mùng 1 đầu tháng
            inputs.thang = thangThue.toISOString().substring(0, 10);
            url += "?idphong=" + inputs.idphong + "&thang=" + thangThue.toISOString().substring(0, 10);
            console.log(url);
            axios.get(url)
                .then(res => {
                    // MockAPI ngu vãi nồi
                    // if (res.data.length > 0) {
                    //     console.log(res.data);
                    //     alert("Đã có hóa đơn tháng này");
                    // } else {
                    //     // Thêm mới
                    //     themMoi();
                    //     console.log("THÊM MỚI");
                    // }
                    // Thêm mới
                    themMoi();
                    console.log("THÊM MỚI");
                });
        }
    }

    const themMoi = () => {
        let url = baseUrl + "/hoadon";
        // Thêm mới
        axios.post(url, inputs)
            .then(res => {
                setMess("THÊM THÀNH CÔNG");
                console.log("THÊM THÀNH CÔNG");
                navigate("/hoadon-ds");
            })
            .catch(
                err => { setMess("Lỗi: " + err); }
            );
    }
    let location = useLocation();
    useEffect(onload, [location]);

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        if (id != "thang" && id != "ghichu") {
            value = parseInt(e.target.value);
        }

        setInputs({ ...inputs, [id]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        checkHoaDon();
    }
    return (
        <div>
            <h3>{mess}</h3>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend><h2>{idhd != null ? "Cập nhật Hóa Đơn" : "Hóa đơn mới"}</h2></legend>
                    <table>
                        <thead>
                            <tr>
                                <th>Tháng</th>
                                <td>
                                    <input type="date" id="thang" value={inputs.thang} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>Phòng</th>
                                <td>
                                    <select id='idphong' onChange={handleChange}>
                                        {data?.map((item, index) => <option key={index} value={item.id} selected={item.id == inputs.idphong}>{item.sophong}</option>)}
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th>Số điện</th>
                                <td>
                                    <input type="number" step="1" id="sodien" min="0" value={inputs.sodien} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>Số nước</th>
                                <td>
                                    <input type="number" step="1" id="sonuoc" min="0" value={inputs.sonuoc} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>Ghi chú</th>
                                <td>
                                    <input type="text" id="ghichu" value={inputs.ghichu} onChange={handleChange} />
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <button>{idhd != null ? "Cập nhật" : "Thêm"}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </form>
        </div>
    );
}

export default InsertHoaDon;