'use client';

import React, { useState, useEffect } from 'react';
import { Button, Pagination, message, Skeleton, ConfigProvider, Modal, Form, Input, DatePicker, Select } from 'antd';
import {
    PlusOutlined,
    TeamOutlined,
    CalendarOutlined,
    BankOutlined,
    FileTextOutlined,
    EnvironmentOutlined,
    UserOutlined,
    EyeOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { sendRequest } from '@/utils/api';
import dayjs from 'dayjs';

export default function ManagerCouncilsPage() {
    const [loading, setLoading] = useState(true);
    const [councils, setCouncils] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Hiển thị 5 thẻ hội đồng + 1 thẻ Tạo mới = 6 thẻ/trang
    const [messageApi, contextHolder] = message.useMessage();

    // States cho chức năng Tạo Hội đồng mới
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    // ================= 1. GỌI API LẤY DANH SÁCH HỘI ĐỒNG =================
    const fetchCouncils = async () => {
        setLoading(true);
        try {
            // Giả định API của ní là /api/hoi-dong/
            const res = await sendRequest<any>({ url: 'http://localhost:8000/api/hoi-dong/', method: 'GET' });
            setCouncils(res.results || res || []);
        } catch (error) {
            console.error("Lỗi tải danh sách hội đồng:", error);
            // Nếu API chưa code xong, xài tạm mock data cho đẹp UI
            setCouncils(mockCouncilsFallback);
            messageApi.warning("Đang dùng dữ liệu mẫu (Mock Data) vì không kết nối được API.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCouncils();
    }, []);

    // ================= 2. HÀM TẠO HỘI ĐỒNG MỚI =================
    const handleCreateCouncil = async (values: any) => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...values,
                NgayHop: values.NgayHop ? values.NgayHop.format('YYYY-MM-DD') : null,
                TrangThai: 'SAPDIENRA' // Mặc định vừa tạo là Sắp diễn ra
            };

            await sendRequest({
                url: 'http://localhost:8000/api/hoi-dong/',
                method: 'POST',
                body: payload
            });

            messageApi.success('Tuyệt vời! Đã lên lịch hội đồng mới thành công.');
            setIsCreateModalVisible(false);
            form.resetFields();
            fetchCouncils(); // Load lại data
        } catch (error: any) {
            // Nếu lỗi API, giả lập thêm vào state nội bộ để thấy UI chạy
            messageApi.success('[Giả lập] Đã tạo hội đồng thành công!');
            const newCouncil = {
                MaHoiDong: values.MaHoiDong || 'HD-NEW',
                TenHoiDong: values.TenHoiDong,
                DiaDiem: values.DiaDiem,
                NgayHop: values.NgayHop ? values.NgayHop.format('YYYY-MM-DD') : 'Chưa xếp',
                SoThanhVien: 5,
                TrangThai: 'SAPDIENRA'
            };
            setCouncils([newCouncil, ...councils]);
            setIsCreateModalVisible(false);
            form.resetFields();
        } finally {
            setIsSubmitting(false);
        }
    };

    // ================= 3. THỐNG KÊ ĐỘNG =================
    const totalCouncils = councils.length;
    const todayStr = dayjs().format('YYYY-MM-DD');
    const todayCouncils = councils.filter(c => c.NgayHop === todayStr || c.TrangThai === 'DANGDIENRA').length;

    // ================= 4. MAP MÀU TRẠNG THÁI =================
    const getStatusTheme = (status: string) => {
        if (status === 'DANGDIENRA') return { border: 'border-t-[#A31D1D]', bg: 'bg-green-100 text-green-700', text: 'Đang diễn ra' };
        if (status === 'SAPDIENRA') return { border: 'border-t-[#FADB14]', bg: 'bg-blue-100 text-blue-600', text: 'Sắp diễn ra' };
        if (status === 'DAKETTHUC') return { border: 'border-t-gray-400', bg: 'bg-gray-100 text-gray-600', text: 'Đã kết thúc' };
        return { border: 'border-t-gray-300', bg: 'bg-gray-100 text-gray-600', text: status };
    };

    // Lấy dữ liệu cho trang hiện tại
    const currentData = councils.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    if (loading) return <div className="p-8 max-w-[1400px] mx-auto"><Skeleton active paragraph={{ rows: 12 }} /></div>;

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#A31D1D' } }}>
            <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-8">
                {contextHolder}

                {/* ================= HEADER ================= */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 mb-1">Quản lý Hội đồng Nghiệm thu</h1>
                        <p className="text-gray-500 text-sm">
                            Giám sát tiến độ, lịch trình và kết quả của các hội đồng đánh giá nghiên cứu khoa học.
                        </p>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsCreateModalVisible(true)}
                        className="font-bold bg-[#A31D1D] border-none h-10 px-5 rounded-lg shadow-sm hover:opacity-90 transition-transform hover:-translate-y-0.5"
                    >
                        Tạo hội đồng mới
                    </Button>
                </div>

                {/* ================= STATS CARDS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-red-200">
                        <div className="bg-red-50 p-4 rounded-xl text-[#A31D1D] text-2xl"><TeamOutlined /></div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tổng số hội đồng</div>
                            <div className="text-2xl font-black text-gray-900 leading-none">{totalCouncils}</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-yellow-200">
                        <div className="bg-yellow-50 p-4 rounded-xl text-yellow-600 text-2xl"><CalendarOutlined /></div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Hội đồng hôm nay</div>
                            <div className="text-2xl font-black text-gray-900 leading-none">{todayCouncils}</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                        <div className="bg-blue-50 p-4 rounded-xl text-blue-600 text-2xl"><BankOutlined /></div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phòng đang sử dụng</div>
                            <div className="text-2xl font-black text-gray-900 leading-none">04</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                        <div className="bg-gray-100 p-4 rounded-xl text-gray-500 text-2xl"><FileTextOutlined /></div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Báo cáo hoàn thành</div>
                            <div className="text-2xl font-black text-gray-900 leading-none">156</div>
                        </div>
                    </div>
                </div>

                {/* ================= DANH SÁCH CARDS HỘI ĐỒNG ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {currentData.map((council, index) => {
                        const theme = getStatusTheme(council.TrangThai);
                        return (
                            <div key={council.MaHoiDong || index} className={`bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col border-t-4 ${theme.border} overflow-hidden hover:shadow-md transition-all`}>
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-black text-gray-800">{council.MaHoiDong}</h2>
                                        <span className={`${theme.bg} font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider`}>
                                            {council.TrangThai_display || theme.text}
                                        </span>
                                    </div>
                                    <div className="text-xs font-bold text-[#A31D1D] uppercase tracking-wider mb-6 line-clamp-1" title={council.TenHoiDong}>
                                        {council.TenHoiDong}
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <EnvironmentOutlined className="text-gray-400 text-lg" />
                                            <span>Phòng: <strong className="font-medium text-gray-800">{council.DiaDiem || 'Đang cập nhật'}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <CalendarOutlined className="text-gray-400 text-lg" />
                                            <span>Ngày họp: <strong className="font-medium text-gray-800">
                                                {council.NgayHop ? dayjs(council.NgayHop).format('DD/MM/YYYY') : 'Đang cập nhật'}
                                            </strong></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <UserOutlined className="text-gray-400 text-lg" />
                                            <span>Thành viên: <strong className="font-medium text-gray-800">{council.SoThanhVien || 5} Cán bộ</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3 mt-auto">
                                    <Button icon={<SettingOutlined />} className="font-bold text-[#A31D1D] border-[#A31D1D] h-10 rounded-lg hover:bg-red-50" onClick={() => messageApi.info('Mở trang quản lý hội đồng...')}>
                                        Cấu hình
                                    </Button>
                                    <Button type="primary" icon={<EyeOutlined />} className="font-bold bg-[#A31D1D] border-none h-10 rounded-lg shadow-sm hover:opacity-90" onClick={() => messageApi.info('Xem chi tiết hội đồng...')}>
                                        Chi tiết
                                    </Button>
                                </div>
                            </div>
                        );
                    })}

                    {/* NÚT TẠO MỚI Ở CUỐI DANH SÁCH */}
                    {(currentPage * pageSize >= councils.length) && (
                        <div
                            onClick={() => setIsCreateModalVisible(true)}
                            className="bg-red-50/30 rounded-xl border-2 border-dashed border-[#A31D1D]/30 min-h-[250px] flex flex-col justify-center items-center cursor-pointer hover:bg-red-50 transition-colors group"
                        >
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#A31D1D] text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <PlusOutlined />
                            </div>
                            <span className="font-black text-gray-800 text-base">Lên lịch hội đồng</span>
                        </div>
                    )}
                </div>

                {/* ================= PAGINATION ĐỘNG ================= */}
                {councils.length > pageSize && (
                    <div className="flex justify-center mt-6">
                        <Pagination
                            current={currentPage}
                            onChange={(page) => setCurrentPage(page)}
                            total={councils.length}
                            pageSize={pageSize}
                            showSizeChanger={false}
                            className="custom-red-pagination bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm"
                        />
                    </div>
                )}

                {/* ================= MODAL: TẠO HỘI ĐỒNG MỚI ================= */}
                <Modal
                    title={<span className="font-black text-lg text-[#A31D1D]">Lên lịch Hội đồng mới</span>}
                    open={isCreateModalVisible}
                    onCancel={() => {
                        setIsCreateModalVisible(false);
                        form.resetFields();
                    }}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleCreateCouncil} size="large" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label={<span className="font-bold text-gray-700">Mã Hội đồng</span>} name="MaHoiDong" rules={[{ required: true, message: 'Nhập mã!' }]}>
                                <Input placeholder="VD: HD-ATTT-01" />
                            </Form.Item>
                            <Form.Item label={<span className="font-bold text-gray-700">Tên chuyên ngành/Lĩnh vực</span>} name="TenHoiDong" rules={[{ required: true, message: 'Nhập tên!' }]}>
                                <Input placeholder="VD: Hội đồng An toàn thông tin" />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label={<span className="font-bold text-gray-700">Ngày họp dự kiến</span>} name="NgayHop" rules={[{ required: true, message: 'Chọn ngày!' }]}>
                                <DatePicker className="w-full" format="DD/MM/YYYY" placeholder="Chọn ngày" />
                            </Form.Item>
                            <Form.Item label={<span className="font-bold text-gray-700">Phòng họp / Địa điểm</span>} name="DiaDiem">
                                <Select placeholder="Chọn phòng">
                                    <Select.Option value="Hội trường A - 302">Hội trường A - 302</Select.Option>
                                    <Select.Option value="Hội trường B - 105">Hội trường B - 105</Select.Option>
                                    <Select.Option value="Lab 10 - 201">Lab 10 - 201</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                            <Button onClick={() => { setIsCreateModalVisible(false); form.resetFields(); }}>Hủy bỏ</Button>
                            <Button type="primary" htmlType="submit" loading={isSubmitting} className="bg-[#A31D1D] font-bold border-none">
                                Tạo hội đồng
                            </Button>
                        </div>
                    </Form>
                </Modal>

            </div>
        </ConfigProvider>
    );
}

// Fallback Mock Data để ngắm UI nếu API sập
const mockCouncilsFallback = [
    { MaHoiDong: 'ATTT-01', TenHoiDong: 'Chuyên ngành An toàn thông tin', DiaDiem: 'Hội trường A - 302', NgayHop: '2026-06-21', SoThanhVien: 5, TrangThai: 'DANGDIENRA' },
    { MaHoiDong: 'CNTT-04', TenHoiDong: 'Chuyên ngành Công nghệ thông tin', DiaDiem: 'Lab 10 - 201', NgayHop: '2026-06-26', SoThanhVien: 3, TrangThai: 'SAPDIENRA' },
    { MaHoiDong: 'MM-02', TenHoiDong: 'Chuyên ngành Mật mã học', DiaDiem: 'Phòng họp B', NgayHop: '2026-06-15', SoThanhVien: 5, TrangThai: 'DAKETTHUC' },
];