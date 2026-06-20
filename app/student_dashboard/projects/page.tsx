'use client';

import React from 'react';
import { Button, Select, Table, Divider, Tag } from 'antd';
import {
    PlusOutlined,
    ClockCircleOutlined,
    MessageOutlined,
    CheckCircleFilled,
    MinusCircleOutlined,
    UserOutlined,
    CalendarOutlined,
    StarFilled,
    EyeOutlined,
    UploadOutlined,
    MoreOutlined
} from '@ant-design/icons';

export default function MyProjectsPage() {

    // Dữ liệu cho bảng "Danh sách đề tài khác" ở dưới cùng
    const otherProjects = [
        {
            key: '1',
            name: 'Ứng dụng Blockchain trong bảo mật dữ liệu IoT',
            year: 'Niên khóa: 2023 - 2024',
            teacher: 'ThS. Trần Ngọc N.',
            status: 'HOÀN THÀNH',
        },
        {
            key: '2',
            name: 'Xây dựng Website bán hàng thời trang (Đồ án cơ sở)',
            year: 'Niên khóa: 2022 - 2023',
            teacher: 'ThS. Hoàng Văn V.',
            status: 'LƯU TRỮ',
        },
    ];

    const columns = [
        {
            title: 'TÊN ĐỀ TÀI',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            render: (text: string, record: any) => (
                <div>
                    <div className="font-bold text-gray-800">{text}</div>
                    <div className="text-xs text-gray-400 mt-1">{record.year}</div>
                </div>
            ),
        },
        {
            title: 'GIÁO VIÊN',
            dataIndex: 'teacher',
            key: 'teacher',
            render: (text: string) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-50 text-[#A31D1D] flex items-center justify-center text-[10px] font-bold">
                        {text.split(' ').pop()?.[0]} {/* Lấy chữ cái đầu của tên */}
                    </div>
                    <span className="text-gray-600 font-medium">{text}</span>
                </div>
            ),
        },
        {
            title: 'TRẠNG THÁI',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const isDone = status === 'HOÀN THÀNH';
                return (
                    <Tag
                        className={`font-bold border-none px-3 py-1 ${isDone ? 'bg-[#F6FFED] text-[#389E0D]' : 'bg-gray-100 text-gray-500'}`}
                    >
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'THAO TÁC',
            key: 'action',
            align: 'center' as const,
            render: () => <MoreOutlined className="text-xl text-gray-400 cursor-pointer hover:text-gray-600" />,
        },
    ];

    return (
        <div className="max-w-[1400px] mx-auto pb-10">

            {/* ================= HEADER TÙY CHỌN ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-200/60 pb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Đề tài của tôi</h1>
                    <p className="text-gray-500 text-sm">Quản lý và theo dõi tiến độ các đề tài nghiên cứu khoa học đang thực hiện.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                        <span className="text-xs text-gray-500 font-medium">Năm học:</span>
                        <span className="text-sm font-bold text-gray-800">2025 - 2026</span>
                    </div>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                        <span className="text-xs text-gray-500 font-medium">Trạng thái:</span>
                        <span className="text-sm font-bold text-gray-800">Tất cả trạng thái</span>
                    </div>
                    <Button type="primary" icon={<PlusOutlined />} className="bg-[#A31D1D] font-bold h-9 shadow-md rounded-lg">
                        Gửi đề tài mới
                    </Button>
                </div>
            </div>

            {/* ================= KHỐI NỘI DUNG CHÍNH (GRID 2:1) ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* === CỘT TRÁI: CARD ĐỀ TÀI ĐANG THỰC HIỆN === */}
                <div className="lg:col-span-2">
                    {/* Card dùng relative và overflow-hidden để chứa cái vạch đỏ bên trái */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col h-full">
                        {/* Vạch đỏ viền trái */}
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#A31D1D]"></div>

                        <div className="p-6 md:p-8 pl-10 md:pl-12 flex-1 flex flex-col">

                            {/* Badges */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-red-50 text-[#A31D1D] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wide">
                                    Mã số: DT2024-042
                                </span>
                                <span className="bg-[#FFFBE6] text-[#D48806] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                                    <StarFilled /> Đề tài trọng điểm
                                </span>
                            </div>

                            {/* Tiêu đề */}
                            <h2 className="text-2xl font-black text-gray-800 leading-snug mb-6">
                                Phân tích & thiết kế hệ thống quản lý nghiên cứu khoa học sinh viên tích hợp AI
                            </h2>

                            {/* Thông tin phụ */}
                            <div className="flex flex-wrap gap-8 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded-full text-gray-500"><UserOutlined /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Giảng viên hướng dẫn</p>
                                        <p className="text-sm font-bold text-gray-800">TS. Lê Văn A</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-50 p-2 rounded-full text-[#A31D1D]"><CalendarOutlined /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Hạn nộp báo cáo tiếp theo</p>
                                        <p className="text-sm font-bold text-[#A31D1D]">15/05/2026</p>
                                    </div>
                                </div>
                            </div>

                            {/* Thanh tiến độ */}
                            <div className="mb-8 mt-auto">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-bold text-gray-800">Tiến độ thực hiện</span>
                                    <span className="text-lg font-black text-[#A31D1D]">65%</span>
                                </div>

                                {/* Vạch Progress Bar tự code bằng Tailwind */}
                                <div className="w-full bg-gray-100 rounded-full h-3 mb-3 relative overflow-hidden">
                                    <div className="bg-[#A31D1D] h-full rounded-full" style={{ width: '65%' }}></div>
                                </div>

                                {/* Các mốc thời gian */}
                                <div className="flex justify-between text-[11px] font-medium text-gray-500">
                                    <div className="flex items-center gap-1 text-[#389E0D]">
                                        <CheckCircleFilled /> Đã duyệt đề cương
                                    </div>
                                    <div className="flex items-center gap-1 text-[#A31D1D] translate-x-4">
                                        <MinusCircleOutlined /> Đang thực hiện
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-400">
                                        <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div> Báo cáo nghiệm thu
                                    </div>
                                </div>
                            </div>

                            {/* Các nút bấm */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button className="h-11 font-bold text-gray-600 bg-gray-50 border-none hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2">
                                    <EyeOutlined /> Chi tiết
                                </Button>
                                <Button type="primary" className="h-11 font-bold bg-[#A31D1D] shadow-md hover:opacity-90 border-none rounded-lg flex items-center justify-center gap-2">
                                    <UploadOutlined /> Nộp báo cáo
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* === CỘT PHẢI: STACK CARDS (Việc cần làm & Phản hồi) === */}
                <div className="lg:col-span-1 flex flex-col gap-6">

                    {/* Card Việc cần làm (Nền hồng nhạt) */}
                    <div className="bg-[#FFF5F5] rounded-xl border border-red-100 shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[#A31D1D] text-white p-2.5 rounded-lg">
                                <ClockCircleOutlined className="text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-[#A31D1D] uppercase tracking-wider">Việc cần làm</h3>
                                <p className="text-[10px] text-red-400 font-bold">CẬN DEADLINE</p>
                            </div>
                        </div>

                        <h4 className="font-bold text-gray-800 text-sm leading-relaxed mb-4">
                            Nộp báo cáo tiến độ 50% và biểu đồ UML cho hệ thống quản lý.
                        </h4>

                        <div className="flex justify-between items-center bg-white/60 p-2.5 rounded border border-red-50 mb-4">
                            <span className="text-xs text-gray-500">Tập tin dự thảo:</span>
                            <span className="text-xs font-bold text-[#A31D1D]">bao_cao_50.pdf</span>
                        </div>

                        <Button type="primary" className="w-full bg-[#A31D1D] font-bold border-none h-9 rounded-md shadow-sm">
                            Nộp bài ngay
                        </Button>
                    </div>

                    {/* Card Phản hồi */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[#8A6D3B] text-white p-2.5 rounded-lg">
                                <MessageOutlined className="text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-[#8A6D3B] uppercase tracking-wider">Phản hồi</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Từ TS. Lê Văn A</p>
                            </div>
                        </div>

                        <div className="border-l-4 border-[#E6DBB3] pl-3 py-1 mb-4">
                            <p className="text-sm italic text-gray-600 leading-relaxed font-medium">
                                "Nhóm làm biểu đồ Use Case khá tốt, tuy nhiên cần xem lại luồng đăng nhập. Nhớ nộp báo cáo đúng hạn nhé."
                            </p>
                        </div>

                        <p className="text-[10px] font-bold text-gray-800 mb-4">Cập nhật: 10/05/2026</p>

                        <a href="#" className="text-[#A31D1D] font-bold text-xs flex items-center gap-1 hover:underline">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                            Trả lời giảng viên
                        </a>
                    </div>

                </div>
            </div>

            {/* ================= KHỐI BẢNG: DANH SÁCH ĐỀ TÀI KHÁC ================= */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Danh sách đề tài khác</h3>
                    <a href="#" className="text-xs font-bold text-[#A31D1D] hover:underline">Xem tất cả lịch sử &gt;</a>
                </div>

                <Table
                    columns={columns}
                    dataSource={otherProjects}
                    pagination={false}
                    className="custom-table-header"
                    rowClassName="hover:bg-gray-50 transition-colors cursor-pointer"
                />
            </div>

        </div>
    );
}