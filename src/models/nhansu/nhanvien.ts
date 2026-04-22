import { capNhatNhanVien, layDanhSachNhanVien, taoNhanVien, xoaNhanVien } from '@/services/NhanSu/NhanVien';
import { message } from 'antd';
import { useMemo, useState } from 'react';

const DANH_SACH_CHUC_VU = ['Nhân viên', 'Chuyên viên', 'Trưởng nhóm', 'Trưởng phòng', 'Giám đốc'];
const DANH_SACH_PHONG_BAN = ['Nhân sự', 'Kế toán', 'Kỹ thuật', 'Kinh doanh', 'Hành chính'];
const DANH_SACH_TRANG_THAI: { value: NhanVien.TrangThai; label: string }[] = [
	{ value: 'THU_VIEC', label: 'Thử việc' },
	{ value: 'DA_KY_HOP_DONG', label: 'Đã ký hợp đồng' },
	{ value: 'NGHI_PHEP', label: 'Nghỉ phép' },
	{ value: 'DA_THOI_VIEC', label: 'Đã thôi việc' },
];

const MAP_LABEL_TRANG_THAI: Record<NhanVien.TrangThai, string> = {
	THU_VIEC: 'Thử việc',
	DA_KY_HOP_DONG: 'Đã ký hợp đồng',
	NGHI_PHEP: 'Nghỉ phép',
	DA_THOI_VIEC: 'Đã thôi việc',
};

export default () => {
	const [danhSach, setDanhSach] = useState<NhanVien.RecordNV[]>([]);
	const [loading, setLoading] = useState(false);
	const [dangSubmit, setDangSubmit] = useState(false);
	const [tuKhoa, setTuKhoa] = useState('');
	const [locChucVu, setLocChucVu] = useState<string | undefined>();
	const [locPhongBan, setLocPhongBan] = useState<string | undefined>();
	const [recordDangSua, setRecordDangSua] = useState<NhanVien.RecordNV>();
	const [hienThiForm, setHienThiForm] = useState(false);
	const [recordChiTiet, setRecordChiTiet] = useState<NhanVien.RecordNV>();

	const danhSachDaLoc = useMemo(() => {
		const keyword = tuKhoa.trim().toLowerCase();

		return danhSach
			.filter((item) => (locChucVu ? item.chucVu === locChucVu : true))
			.filter((item) => (locPhongBan ? item.phongBan === locPhongBan : true))
			.filter((item) => {
				if (!keyword) return true;
				return item.maNhanVien.toLowerCase().includes(keyword) || item.hoTen.toLowerCase().includes(keyword);
			})
			.sort((a, b) => b.luong - a.luong);
	}, [danhSach, tuKhoa, locChucVu, locPhongBan]);

	const taiDanhSach = async () => {
		setLoading(true);
		try {
			const data = await layDanhSachNhanVien();
			setDanhSach(data);
		} catch (error) {
			message.error('Không tải được danh sách nhân viên');
		} finally {
			setLoading(false);
		}
	};

	const moFormThemMoi = () => {
		setRecordDangSua(undefined);
		setHienThiForm(true);
	};

	const moFormChinhSua = (record: NhanVien.RecordNV) => {
		setRecordDangSua(record);
		setHienThiForm(true);
	};

	const dongForm = () => setHienThiForm(false);

	const luuNhanVien = async (values: NhanVien.FormValues) => {
		setDangSubmit(true);
		try {
			if (recordDangSua) {
				await capNhatNhanVien(recordDangSua.id, values);
				message.success('Cập nhân nhân viên thành công');
			} else {
				await taoNhanVien(values);
				message.success('Thêm mới nhân viên thành công');
			}
			await taiDanhSach();
			setHienThiForm(false);
		} catch (error) {
			message.error('Lưu nhân viên thất bại');
			throw error;
		} finally {
			setDangSubmit(false);
		}
	};

	const xoaNhanVienTheoDieuKien = async (record: NhanVien.RecordNV) => {
		if (!['THU_VIEC', 'DA_THOI_VIEC'].includes(record.trangThai)) {
			message.warning('Chỉ được xóa ở trạng thái nhân viên Thử việc hoặc Đã thôi việc');
			return;
		}
		setLoading(true);
		try {
			await xoaNhanVien(record.id);
			message.success('Xoa nhân viên thành công');
			await taiDanhSach();
		} catch (error) {
			message.error('Xóa nhân viên thất bại');
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		dangSubmit,
		danhSach,
		danhSachDaLoc,
		tuKhoa,
		setTuKhoa,
		locChucVu,
		setLocChucVu,
		locPhongBan,
		setLocPhongBan,
		recordDangSua,
		hienThiForm,
		setHienThiForm,
		recordChiTiet,
		setRecordChiTiet,
		taiDanhSach,
		moFormThemMoi,
		moFormChinhSua,
		dongForm,
		luuNhanVien,
		xoaNhanVienTheoDieuKien,
		danhSachChucVu: DANH_SACH_CHUC_VU,
		danhSachPhongBan: DANH_SACH_PHONG_BAN,
		danhSachTrangThai: DANH_SACH_TRANG_THAI,
		mapLabelTrangThai: MAP_LABEL_TRANG_THAI,
	};
};
