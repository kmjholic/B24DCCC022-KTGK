import MyDatePicker from '@/components/MyDatePicker';
import TinyEditor from '@/components/TinyEditor';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useEffect } from 'react';

type Props = {
	visible: boolean;
	dangSubmit: boolean;
	record?: NhanVien.RecordNV;
	danhSachChucVu: string[];
	danhSachPhongBan: string[];
	danhSachTrangThai: { value: NhanVien.TrangThai; label: string }[];
	onCancel: () => void;
	onSubmit: (values: NhanVien.FormValues) => Promise<void>;
};

const FormNhanVien = (props: Props) => {
	const { visible, dangSubmit, record, danhSachChucVu, danhSachPhongBan, danhSachTrangThai, onCancel, onSubmit } =
		props;
	const [form] = Form.useForm<NhanVien.FormValues>();

	useEffect(() => {
		if (visible) {
			form.setFieldsValue({
				hoTen: record?.hoTen,
				chucVu: record?.chucVu,
				phongBan: record?.phongBan,
				luong: record?.luong,
				trangThai: record?.trangThai,
				ngayVaoLam: record?.ngayVaoLam ?? null,
				ghiChu: record?.ghiChu,
			});
		} else {
			form.resetFields();
		}
	}, [visible, record, form]);

	return (
		<Modal
			visible={visible}
			title={record ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
			onCancel={onCancel}
			width={900}
			footer={null}
			destroyOnClose
		>
			<Form form={form} layout='vertical' onFinish={onSubmit}>
				<Form.Item
					label='Họ tên'
					name='hoTen'
					rules={[
						{ required: true, message: 'Bắt buộc' },
						{ max: 50, message: 'Họ tên tối đa 50 ký tự' },
						{
							pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
							message: 'Họ tên không được chứa ký tự đặc biệt',
						},
					]}
				>
					<Input maxLength={50} placeholder='Nhập họ tên nhân viên' />
				</Form.Item>

				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
					<Form.Item label='Chức vụ' name='chucVu' rules={[{ required: true, message: 'Bắt buộc' }]}>
						<Select
							showSearch
							optionFilterProp='label'
							options={danhSachChucVu.map((item) => ({ value: item, label: item }))}
							placeholder='Chọn chức vụ'
						/>
					</Form.Item>
					<Form.Item label='Phòng ban' name='phongBan' rules={[{ required: true, message: 'Bắt buộc' }]}>
						<Select
							showSearch
							optionFilterProp='label'
							options={danhSachPhongBan.map((item) => ({ value: item, label: item }))}
							placeholder='Chọn phòng ban'
						/>
					</Form.Item>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
					<Form.Item label='Lương' name='luong' rules={[{ required: true, message: 'Bắt buộc' }]}>
						<InputNumber style={{ width: '100%' }} min={0} step={500000} placeholder='Nhập lương' />
					</Form.Item>
					<Form.Item label='Trạng thái' name='trangThai' rules={[{ required: true, message: 'Bắt buộc' }]}>
						<Select options={danhSachTrangThai} placeholder='Chọn trạng thái' />
					</Form.Item>
					<Form.Item label='Ngày vào làm' name='ngayVaoLam'>
						<MyDatePicker placeholder='Chọn ngày vào làm' />
					</Form.Item>
				</div>

				<Form.Item label='Ghi chú' name='ghiChu'>
					<TinyEditor miniToolbar height={220} minHeight={120} />
				</Form.Item>

				<div className='form-footer'>
					<Button type='primary' htmlType='submit' loading={dangSubmit}>
						{record ? 'Lưu lại' : 'Thêm mới'}
					</Button>
					<Button onClick={onCancel}>Hủy</Button>
				</div>
			</Form>
		</Modal>
	);
};

export default FormNhanVien;
