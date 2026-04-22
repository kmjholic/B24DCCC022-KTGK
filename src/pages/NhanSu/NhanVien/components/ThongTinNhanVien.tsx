import { Descriptions, Drawer, Tag } from 'antd';
import moment from 'moment';

type Props = {
	visible: boolean;
	record?: NhanVien.RecordNV;
	mapLabelTrangThai: Record<NhanVien.TrangThai, string>;
	onClose: () => void;
};

const mauTrangThai: Record<NhanVien.TrangThai, string> = {
	THU_VIEC: 'gold',
	DA_KY_HOP_DONG: 'green',
	NGHI_PHEP: 'blue',
	DA_THOI_VIEC: 'red',
};

const ThongTinNhanVien = ({ visible, record, mapLabelTrangThai, onClose }: Props) => {
	return (
		<Drawer visible={visible} title='Thong tin chi tiet nhan vien' width={600} onClose={onClose} destroyOnClose>
			<Descriptions bordered column={1}>
				<Descriptions.Item label='Ma nhan vien'>{record?.maNhanVien || '-'}</Descriptions.Item>
				<Descriptions.Item label='Ho ten'>{record?.hoTen || '-'}</Descriptions.Item>
				<Descriptions.Item label='Chuc vu'>{record?.chucVu || '-'}</Descriptions.Item>
				<Descriptions.Item label='Phong ban'>{record?.phongBan || '-'}</Descriptions.Item>
				<Descriptions.Item label='Luong'>
					{record?.luong ? `${record.luong.toLocaleString('vi-VN')} VND` : '-'}
				</Descriptions.Item>
				<Descriptions.Item label='Trang thai'>
					{record?.trangThai ? (
						<Tag color={mauTrangThai[record.trangThai]}>{mapLabelTrangThai[record.trangThai]}</Tag>
					) : (
						'-'
					)}
				</Descriptions.Item>
				<Descriptions.Item label='Ngay vao lam'>
					{record?.ngayVaoLam ? moment(record.ngayVaoLam).format('DD/MM/YYYY') : '-'}
				</Descriptions.Item>
				<Descriptions.Item label='Ghi chu'>
					{record?.ghiChu ? <div dangerouslySetInnerHTML={{ __html: record.ghiChu }} /> : '-'}
				</Descriptions.Item>
			</Descriptions>
		</Drawer>
	);
};

export default ThongTinNhanVien;
