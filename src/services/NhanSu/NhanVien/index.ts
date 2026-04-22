const KHO_LOCAL_STORAGE = 'danh-sach-nhan-vien';

const DU_LIEU_MAU: NhanVien.RecordNV[] = [
	{
		id: '1',
		maNhanVien: 'NV0001',
		hoTen: 'Nguyễn Văn An',
		chucVu: 'Trưởng phòng',
		phongBan: 'Kinh doanh',
		luong: 28000000,
		trangThai: 'DA_KY_HOP_DONG',
		ngayVaoLam: new Date('2024-01-10').toISOString(),
		ghiChu: '<p>Phụ trách nhóm kinh doanh miên Bắc</p>',
		createdAt: new Date('2024-01-10').toISOString(),
		updatedAt: new Date('2024-01-10').toISOString(),
	},
	{
		id: '2',
		maNhanVien: 'NV0002',
		hoTen: 'Trần Thị Bình',
		chucVu: 'Nhân viên',
		phongBan: 'Nhân sự',
		luong: 16000000,
		trangThai: 'THU_VIEC',
		ngayVaoLam: new Date('2025-02-01').toISOString(),
		ghiChu: '<p>Đang trong thời gian thử việc 2 tháng</p>',
		createdAt: new Date('2025-02-01').toISOString(),
		updatedAt: new Date('2025-02-01').toISOString(),
	},
];

const readDanhSach = (): NhanVien.RecordNV[] => {
	const dataRaw = localStorage.getItem(KHO_LOCAL_STORAGE);
	if (!dataRaw) {
		localStorage.setItem(KHO_LOCAL_STORAGE, JSON.stringify(DU_LIEU_MAU));
		return DU_LIEU_MAU;
	}

	try {
		const data = JSON.parse(dataRaw) as NhanVien.RecordNV[];
		if (!Array.isArray(data)) throw new Error('Invalid data');
		return data;
	} catch (error) {
		localStorage.setItem(KHO_LOCAL_STORAGE, JSON.stringify(DU_LIEU_MAU));
		return DU_LIEU_MAU;
	}
};

const writeDanhSach = (danhSach: NhanVien.RecordNV[]) => {
	localStorage.setItem(KHO_LOCAL_STORAGE, JSON.stringify(danhSach));
};

const taoMaNhanVien = (danhSach: NhanVien.RecordNV[]) => {
	const maxSoThuTu = danhSach.reduce((max, item) => {
		const so = Number(item.maNhanVien.replace('NV', ''));
		if (Number.isNaN(so)) return max;
		return so > max ? so : max;
	}, 0);

	return `NV${String(maxSoThuTu + 1).padStart(4, '0')}`;
};

export const layDanhSachNhanVien = async (): Promise<NhanVien.RecordNV[]> => {
	const data = readDanhSach();
	return data;
};

export const taoNhanVien = async (payload: NhanVien.FormValues): Promise<NhanVien.RecordNV> => {
	const danhSach = readDanhSach();
	const now = new Date().toISOString();
	const nhanVienMoi: NhanVien.RecordNV = {
		id: `${Date.now()}`,
		maNhanVien: taoMaNhanVien(danhSach),
		hoTen: payload.hoTen.trim(),
		chucVu: payload.chucVu,
		phongBan: payload.phongBan,
		luong: Number(payload.luong),
		trangThai: payload.trangThai,
		ngayVaoLam: payload.ngayVaoLam ?? null,
		ghiChu: payload.ghiChu,
		createdAt: now,
		updatedAt: now,
	};
	const dataMoi = [...danhSach, nhanVienMoi];
	writeDanhSach(dataMoi);
	return nhanVienMoi;
};

export const capNhatNhanVien = async (id: string, payload: NhanVien.FormValues): Promise<NhanVien.RecordNV> => {
	const danhSach = readDanhSach();
	const index = danhSach.findIndex((item) => item.id === id);
	if (index < 0) throw new Error('Không tìm thấy nhân viên');

	const nhanVienDaCapNhat: NhanVien.RecordNV = {
		...danhSach[index],
		hoTen: payload.hoTen.trim(),
		chucVu: payload.chucVu,
		phongBan: payload.phongBan,
		luong: Number(payload.luong),
		trangThai: payload.trangThai,
		ngayVaoLam: payload.ngayVaoLam ?? null,
		ghiChu: payload.ghiChu,
		updatedAt: new Date().toISOString(),
	};
	const dataMoi = [...danhSach];
	dataMoi[index] = nhanVienDaCapNhat;
	writeDanhSach(dataMoi);
	return nhanVienDaCapNhat;
};

export const xoaNhanVien = async (id: string): Promise<void> => {
	const danhSach = readDanhSach();
	const dataMoi = danhSach.filter((item) => item.id !== id);
	writeDanhSach(dataMoi);
};
