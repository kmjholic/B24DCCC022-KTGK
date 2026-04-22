import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Select, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

type Props = {
	loading: boolean;
	data: NhanVien.RecordNV[];
	tuKhoa: string;
	locChucVu?: string;
	locPhongBan?: string;
	danhSachChucVu: string[];
	danhSachPhongBan: string[];
	mapLabelTrangThai: Record<NhanVien.TrangThai, string>;
	onChangeTuKhoa: (value: string) => void;
	onChangeLocChucVu: (value?: string) => void;
	onChangeLocPhongBan: (value?: string) => void;
	onThemMoi: () => void;
	onChinhSua: (record: NhanVien.RecordNV) => void;
	onXoa: (record: NhanVien.RecordNV) => Promise<void>;
	onXemChiTiet: (record: NhanVien.RecordNV) => void;
};

const mauTrangThai: Record<NhanVien.TrangThai, string> = {
	THU_VIEC: 'gold',
	DA_KY_HOP_DONG: 'green',
	NGHI_PHEP: 'blue',
	DA_THOI_VIEC: 'red',
};

const BangNhanVien = (props: Props) => {
	const {
		loading,
		data,
		tuKhoa,
		locChucVu,
		locPhongBan,
		danhSachChucVu,
		danhSachPhongBan,
		mapLabelTrangThai,
		onChangeTuKhoa,
		onChangeLocChucVu,
		onChangeLocPhongBan,
		onThemMoi,
		onChinhSua,
		onXoa,
		onXemChiTiet,
	} = props;

	const columns: ColumnsType<NhanVien.RecordNV> = [
		{ title: 'Mã nhân viên', dataIndex: 'maNhanVien', key: 'maNhanVien', width: 130 },
		{ title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen', width: 220 },
		{ title: 'Chức vụ', dataIndex: 'chucVu', key: 'chucVu', width: 160 },
		{ title: 'Phòng ban', dataIndex: 'phongBan', key: 'phongBan', width: 160 },
		{
			title: 'Lương',
			dataIndex: 'luong',
			key: 'luong',
			width: 140,
			align: 'right',
			render: (value?: number) => (typeof value === 'number' ? `${value.toLocaleString('vi-VN')} VND` : '-'),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			width: 160,
			render: (value: NhanVien.TrangThai) => <Tag color={mauTrangThai[value]}>{mapLabelTrangThai[value]}</Tag>,
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 130,
			fixed: 'right',
			align: 'center',
			render: (_, record) => {
				const coTheXoa = ['THU_VIEC', 'DA_THOI_VIEC'].includes(record.trangThai);
				return (
					<Space size={0}>
						<Tooltip title='Xem chi tiết'>
							<Button type='link' icon={<EyeOutlined />} onClick={() => onXemChiTiet(record)} />
						</Tooltip>
						<Tooltip title='Chỉnh sửa'>
							<Button type='link' icon={<EditOutlined />} onClick={() => onChinhSua(record)} />
						</Tooltip>
						<Tooltip title={coTheXoa ? 'Xóa nhân viên' : 'Chỉ xóa khi trạng thái là Thử việc hoặc Đã thôi việc'}>
							<Popconfirm
								title='Bạn có chắc muốn xóa nhân viên này không?'
								okText='Đồng ý'
								cancelText='Hủy'
								onConfirm={() => onXoa(record)}
								disabled={!coTheXoa}
							>
								<Button type='link' danger icon={<DeleteOutlined />} disabled={!coTheXoa} />
							</Popconfirm>
						</Tooltip>
					</Space>
				);
			},
		},
	];

	return (
		<>
			<Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }} wrap>
				<Space wrap>
					<Input.Search
						allowClear
						style={{ width: 280 }}
						value={tuKhoa}
						onChange={(e) => onChangeTuKhoa(e.target.value)}
						placeholder='Tìm theo mã hoặc họ tên'
					/>
					<Select
						allowClear
						style={{ width: 180 }}
						value={locChucVu}
						placeholder='Lọc chức vụ'
						options={danhSachChucVu.map((item) => ({ value: item, label: item }))}
						onChange={(value) => onChangeLocChucVu(value)}
					/>
					<Select
						allowClear
						style={{ width: 180 }}
						value={locPhongBan}
						placeholder='Lọc phòng ban'
						options={danhSachPhongBan.map((item) => ({ value: item, label: item }))}
						onChange={(value) => onChangeLocPhongBan(value)}
					/>
				</Space>
				<Button type='primary' onClick={onThemMoi}>
					Thêm nhân viên mới
				</Button>
			</Space>

			<Table
				rowKey='id'
				loading={loading}
				dataSource={data}
				columns={columns}
				pagination={{ pageSize: 10, showSizeChanger: false }}
				scroll={{ x: 1100 }}
			/>
		</>
	);
};

export default BangNhanVien;
