declare namespace NhanVien {
	type TrangThai = 'THU_VIEC' | 'DA_KY_HOP_DONG' | 'NGHI_PHEP' | 'DA_THOI_VIEC';

	interface RecordNV {
		id: string;
		maNhanVien: string;
		hoTen: string;
		chucVu: string;
		phongBan: string;
		luong: number;
		trangThai: TrangThai;
		ngayVaoLam?: string | null;
		ghiChu?: string;
		createdAt: string;
		updatedAt: string;
	}

	interface FormValues {
		hoTen: string;
		chucVu: string;
		phongBan: string;
		luong: number;
		trangThai: TrangThai;
		ngayVaoLam?: string | null;
		ghiChu?: string;
	}
}
