'use client';

import React from 'react';
import { Button, Select, Table, Tag, Avatar, Pagination } from 'antd';
import {
    FilterOutlined,
    FolderOpenOutlined,
    ExportOutlined,
    HourglassOutlined,
    DashboardOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    UserOutlined
} from '@ant-design/icons';

export default function ManagerProjectsPage() {

    // ================= MOCK DATA =================
    const tableData = [
        {
            key: '1',
            code: 'DT2024-001',
            name: 'Ứng dụng Blockchain trong bảo mật học bạ số',
            field: 'An toàn thông tin',
            leaderName: 'Trần Văn Lực',
            leaderClass: 'Lớp AT16A',
            leaderAvatar: null, // Không có ảnh -> dùng Initials
            date: '12/10/2023',
            type: 'Cấp Học viện',
        },
        {
            key: '2',
            code: 'DT2024-042',
            name: 'Nghiên cứu hệ mật mã dựa trên tinh thể Lattice',
            field: 'Mật mã học',
            leaderName: 'Nguyễn Minh Quân',
            leaderClass: 'Lớp MM15B',
            leaderAvatar: 'https://i.pravatar.cc/150?img=11', // Có ảnh
            date: '15/10/2023',
            type: 'Cấp Khoa',
        },
        {
            key: '3',
            code: 'DT2024-058',
            name: 'Tối ưu hóa thuật toán nhận diện khuôn mặt IR',
            field: 'Trí tuệ nhân tạo',
            leaderName: 'Lê Hoàng Anh',
            leaderClass: 'Lớp DT14C',
            leaderAvatar: null,
            date: '20/10/2023',
            type: 'Cấp Học viện',
        },
    ];

    const columns = [
        {
            title: 'MÃ ĐỀ TÀI',
            dataIndex: 'code',
            key: 'code',
            render: (text: string) => <span className="font-black text-[#A31D1D]">{text}</span>,
        },
        {
            title: 'TÊN ĐỀ TÀI',
            key: 'name',
            width: '35%',
            render: (record: any) => (
                <div>
                    <div className="font-bold text-gray-800 text-sm mb-0.5 pr-4 leading-snug">{record.name}</div>
                    <div className="text-[11px] text-gray-400">Lĩnh vực: {record.field}</div>
                </div>
            ),
        },
        {
            title: 'CHỦ NHIỆM',
            key: 'leader',
            render: (record: any) => {
                // Lấy 2 chữ cái đầu của tên nếu không có avatar (VD: Trần Văn Lực -> TL)
                const initials = record.leaderName.split(' ').map((n: string) => n[0]).slice(-2).join('').toUpperCase();

                return (
                    <div className="flex items-center gap-3">
                        {record.leaderAvatar ? (
                            <Avatar src={record.leaderAvatar} size="large" />
                        ) : (
                            <Avatar size="large" className="bg-gray-200 text-gray-600 font-bold">
                                {initials}
                            </Avatar>
                        )}
                        <div>
                            <div className="font-bold text-gray-800 text-sm">{record.leaderName}</div>
                            <div className="text-[11px] text-gray-400">{record.leaderClass}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'NGÀY GỬI',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => <span className="text-gray-600 font-medium text-sm">{text}</span>,
        },
        {
            title: 'PHÂN LOẠI',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => {
                const isHocVien = type === 'Cấp Học viện';
                return (
                    <Tag
                        className={`font-bold border-none px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${isHocVien ? 'bg-[#FFFBE6] text-[#D48806]' : 'bg-red-50 text-[#A31D1D]'
                            }`}
                    >
                        {type}
                    </Tag>
                );
            },
        },
        {
            title: 'THAO TÁC',
            key: 'action',
            align: 'center' as const,
            render: () => (
                <div className="flex items-center justify-center gap-4 text-lg">
                    <EyeOutlined className="text-gray-600 cursor-pointer hover:text-[#A31D1D] transition-colors" />
                    <CheckCircleOutlined className="text-[#A31D1D] cursor-pointer hover:opacity-70 transition-opacity" />
                    <CloseCircleOutlined className="text-[#A31D1D] cursor-pointer hover:opacity-70 transition-opacity" />
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-6">

            {/* ================= HEADER & ACTIONS ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Quản lý Đề tài</h1>
                    <p className="text-gray-500 text-sm">
                        Bạn có <span className="font-bold text-gray-700">24 đơn đăng ký</span> cần xét duyệt trong năm học này.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Custom Select 1 */}
                    <div className="bg-white border border-gray-200 rounded-lg h-10 flex items-center px-3 gap-2 shadow-sm cursor-pointer hover:border-[#A31D1D] transition-colors">
                        <FilterOutlined className="text-[#A31D1D]" />
                        <Select
                            defaultValue="all"
                            bordered={false}
                            className="w-32 font-medium text-gray-700"
                            dropdownStyle={{ borderRadius: '8px' }}
                        >
                            <Select.Option value="all">Tất cả Khoa</Select.Option>
                            <Select.Option value="it">Công nghệ thông tin</Select.Option>
                            <Select.Option value="attt">An toàn thông tin</Select.Option>
                        </Select>
                    </div>

                    {/* Custom Select 2 */}
                    <div className="bg-white border border-gray-200 rounded-lg h-10 flex items-center px-3 gap-2 shadow-sm cursor-pointer hover:border-[#A31D1D] transition-colors">
                        <FolderOpenOutlined className="text-[#A31D1D]" />
                        <Select
                            defaultValue="pending"
                            bordered={false}
                            className="w-40 font-medium text-gray-700"
                        >
                            <Select.Option value="pending">Trạng thái: Đang chờ</Select.Option>
                            <Select.Option value="approved">Trạng thái: Đã duyệt</Select.Option>
                        </Select>
                    </div>

                    {/* Export Button */}
                    <Button
                        type="primary"
                        icon={<ExportOutlined />}
                        className="font-bold bg-[#8B1515] border-none h-10 px-5 rounded-lg shadow-sm hover:opacity-90"
                    >
                        Xuất báo cáo
                    </Button>
                </div>
            </div>

            {/* ================= 3 STATS CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1 */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Tổng đề tài</div>
                        <div className="text-3xl font-black text-gray-800 leading-none">142</div>
                    </div>
                    <div className="bg-red-50 p-3.5 rounded-2xl text-[#A31D1D] text-2xl">
                        <FolderOpenOutlined />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Đang chờ duyệt</div>
                        <div className="text-3xl font-black text-[#A31D1D] leading-none">24</div>
                    </div>
                    <div className="bg-red-50 p-3.5 rounded-2xl text-[#A31D1D] text-2xl">
                        <HourglassOutlined />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Hiệu suất duyệt</div>
                        <div className="text-3xl font-black text-gray-800 leading-none">94%</div>
                    </div>
                    <div className="bg-red-50 p-3.5 rounded-2xl text-[#A31D1D] text-2xl">
                        <DashboardOutlined />
                    </div>
                </div>

            </div>

            {/* ================= DATA TABLE ================= */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">

                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false} // Tắt phân trang mặc định để custom lại Footer bên dưới
                    className="custom-table-header"
                    rowClassName="hover:bg-gray-50/50 transition-colors"
                />

                {/* Custom Pagination Footer (Chuẩn thiết kế) */}
                <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
                    <div className="text-xs font-medium text-gray-500">
                        Showing 1 to 10 of 24 entries
                    </div>

                    <Pagination
                        defaultCurrent={1}
                        total={24}
                        pageSize={10}
                        showSizeChanger={false}
                        // Thêm class này kết hợp với global CSS để đổi màu đỏ cho nút active
                        className="custom-red-pagination"
                    />
                </div>

            </div>

        </div>
    );
}