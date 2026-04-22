import { Card } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import BangNhanVien from './components/BangNhanVien';
import FormNhanVien from './components/FormNhanVien';
import ThongTinNhanVien from './components/ThongTinNhanVien';

const QuanLyNhanVienPage = () => {
  const {
    loading,
    dangSubmit,
    danhSachDaLoc,
    tuKhoa,
    setTuKhoa,
    locChucVu,
    setLocChucVu,
    locPhongBan,
    setLocPhongBan,
    recordDangSua,
    hienThiForm,
    recordChiTiet,
    setRecordChiTiet,
    taiDanhSach,
    moFormThemMoi,
    moFormChinhSua,
    dongForm,
    luuNhanVien,
    xoaNhanVienTheoDieuKien,
    danhSachChucVu,
    danhSachPhongBan,
    danhSachTrangThai,
    mapLabelTrangThai,
  } = useModel('nhansu.nhanvien');

  useEffect(() => {
    taiDanhSach();
  }, []);

  return (
    <Card title="Quan ly nhan vien">
      <BangNhanVien
        loading={loading}
        data={danhSachDaLoc}
        tuKhoa={tuKhoa}
        locChucVu={locChucVu}
        locPhongBan={locPhongBan}
        danhSachChucVu={danhSachChucVu}
        danhSachPhongBan={danhSachPhongBan}
        mapLabelTrangThai={mapLabelTrangThai}
        onChangeTuKhoa={setTuKhoa}
        onChangeLocChucVu={setLocChucVu}
        onChangeLocPhongBan={setLocPhongBan}
        onThemMoi={moFormThemMoi}
        onChinhSua={moFormChinhSua}
        onXoa={xoaNhanVienTheoDieuKien}
        onXemChiTiet={setRecordChiTiet}
      />

      <FormNhanVien
        visible={hienThiForm}
        record={recordDangSua}
        dangSubmit={dangSubmit}
        danhSachChucVu={danhSachChucVu}
        danhSachPhongBan={danhSachPhongBan}
        danhSachTrangThai={danhSachTrangThai}
        onCancel={dongForm}
        onSubmit={luuNhanVien}
      />

      <ThongTinNhanVien
        visible={!!recordChiTiet}
        record={recordChiTiet}
        mapLabelTrangThai={mapLabelTrangThai}
        onClose={() => setRecordChiTiet(undefined)}
      />
    </Card>
  );
};

export default QuanLyNhanVienPage;
