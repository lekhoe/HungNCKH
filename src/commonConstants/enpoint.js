const API_PROTOCOL_ON= 'https://api.quanlydoan.live/api/';
const API_PROTOCOL_OFF= 'http://localhost:8006/api/';

const API_SEMESTER={
    INSERT_API_SEMESTER: API_PROTOCOL_ON +  `Hocky/InsertAsyncHocKy/{0}`
}

const API_TEACHER={
    GET_API_TEACHER: API_PROTOCOL_OFF + 'GiangVien/get-thongtin_giangvien',
    GET_API_TEACHER_CHOOSE: API_PROTOCOL_ON + 'GiangVienHuongDan/GetAllGiangVienHuongDan/{0}',
    INSERT_API_LIST_TEACHER: API_PROTOCOL_ON + 'GiangVienHuongDan/',
    INSERT_API_TEACHER: API_PROTOCOL_ON + `GiangVienHuongDan/{0}/{1}`,
    UPDATE_API_TEACHER: API_PROTOCOL_ON + `GiangVienHuongDan/UpDate/{0}/{1}`,
    DELETE_API_TEACHER: API_PROTOCOL_ON + `GiangVienHuongDan/Delete/{0}`
}

const API_STUDENT={
    GET_API_STUDENT: API_PROTOCOL_OFF + 'SinhVien/get-thongtin_sinhvien_byIdChuyenNganh/{0}',
    GET_API_STUDENT_CHOOSE: API_PROTOCOL_ON + 'SinhVien/SinhVienGetAll/{0}',
    INSERT_API_LIST_STUDENT: API_PROTOCOL_ON + 'SinhVien/SinhVienList/{0}',
    INSERT_API_STUDENT: API_PROTOCOL_ON + `GiangVienHuongDan/{0}/{1}`,
    UPDATE_API_STUDENT: API_PROTOCOL_ON + `SinhVien/ListDonViTTAsync/{0}`,
    DELETE_API_STUDENT: API_PROTOCOL_ON + `GiangVienHuongDan/Delete/{0}`
}

const API_COUNCIL={
    GET_API_COUNCIL_OF_SUBJECT: API_PROTOCOL_ON + 'HoiDongTotNghiep/GetAllHoiDong/{0}/{1}',
    GET_API_COUNCIL_DETAIL_LIST_PERSON: API_PROTOCOL_ON + `ChiTietHoiDong/GetAllThanhVien/{0}`,
    POST_API_COUNCIL_OF_SUBJECT: API_PROTOCOL_ON + 'PhanCongHoiDong/PhanCongHoiDongListDetai/{0}/{1}/{2}',
    POST_API_COUNCIL_LIST_PERSON: API_PROTOCOL_ON + `ChiTietHoiDong/InsertListChiTietHoiDong/{0}/{1}/{2}`,
    DELETE_API_COUNCIL_PERSON: API_PROTOCOL_ON + `ChiTietHoiDong/DeleteChiTietHoiDong/{0}`,
    POST_API_COUNCIL_POINT: API_PROTOCOL_ON + `HoiDongTotNghiep/DiemHoiDong/{0}/{1}`,
}

const API_TOPIC={
    GET_API_TOPIC: API_PROTOCOL_ON + 'DeTai/GetPhanHoiDong/{0}/{1}',
    DELETE_API_TOPIC: API_PROTOCOL_ON + 'DeTai/Delete/{0}',
    GET_API_TOPIC_DETAIL_LIST: API_PROTOCOL_ON + 'ChiTietDeTai/SerchByIdDeTai/{0}',
    PUT_API_TOPIC_SCORING: API_PROTOCOL_ON + 'DeTai/UpdateDiemTBC/{0}/{1}',
    GET_API_TOPIC_ALL: API_PROTOCOL_ON + 'DeTai/GetAllByMonHocInHocKy/{0}/{1}',
    GET_API_TOPIC_ASSIGN_FEEDBACK: API_PROTOCOL_ON + 'DeTai/PhanPhanBien/{0}/{1}/{2}',
}

const API_FILE={
    GET_API_DOWNLOAD_FILE_COUNCIL: API_PROTOCOL_ON + 'File/downloadsDiemHoiDong/{0}/{1}',
    GET_API_DOWNLOAD_FILE_REVIEWL: API_PROTOCOL_ON + 'File/downloadsDiemPhanBien/{0}/{1}',
    GET_API_DOWNLOAD_FILE: API_PROTOCOL_ON + 'File/downloads/{0}',
    GET_API_FILE_LIST: API_PROTOCOL_ON + 'File/SearchAll/FolderName/{0}',
    POST_API_FILE: API_PROTOCOL_ON + 'File/uploads/{0}',
}

const API_FOLDER={
    GET_API_FOLDER: API_PROTOCOL_ON + 'Folder/SelectAll',
    POST_API_FOLDER: API_PROTOCOL_ON + 'Folder/Insert/{0}',
}

const API_FEEDBACK={
    // GET_API_COUNCIL_OF_SUBJECT: API_PROTOCOL_ON + 'HoiDongTotNghiep/GetAllHoiDong/{0}/{1}',
    // GET_API_COUNCIL_DETAIL_LIST_PERSON: API_PROTOCOL_ON + `ChiTietHoiDong/GetAllThanhVien/{0}`,
    POST_API_FEEDBACK_LIST_TOPIC: API_PROTOCOL_ON + 'PhanBien/DeTaitoPhanBien/{0}/{1}/{2}',
    POST_API_FEEDBACK_POINT: API_PROTOCOL_ON + 'PhanBien/PhanBien/{0}',
    // DELETE_API_COUNCIL_PERSON: API_PROTOCOL_ON + `ChiTietHoiDong/DeleteChiTietHoiDong/{0}`,
    // POST_API_COUNCIL_POINT: API_PROTOCOL_ON + `HoiDongTotNghiep/DiemHoiDong/{0}/{1}`,
}
export {
    API_SEMESTER,
    API_TEACHER,
    API_STUDENT,
    API_COUNCIL,
    API_TOPIC,
    API_FOLDER,
    API_FILE,
    API_FEEDBACK
}