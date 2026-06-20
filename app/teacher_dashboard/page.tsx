'use client';

import React from 'react';
import { Button, Table, Tag, Avatar } from 'antd';
import {
    CheckCircleFilled,
    CalendarOutlined,
    ExclamationCircleOutlined,
    MessageOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    UserOutlined
} from '@ant-design/icons';

export default function TeacherDashboardPage() {

    // 1. Dữ liệu mảng: Nhóm nghiên cứu
    const groupData = [
        {
            key: '1',
            id: 'N24-AT16',
            name: 'Hệ thống phát hiện xâm nhập AI',
            leader: 'Lê Minh Tuấn',
            progress: 75,
            status: 'ĐANG THỰC HIỆN',
        },
        {
            key: '2',
            id: 'N24-MM02',
            name: 'Ứng dụng Blockchain trong IoT',
            leader: 'Nguyễn Thị Mai',
            progress: 45,
            status: 'CHỜ BÁO CÁO',
        },
    ];

    // Cấu hình cột cho bảng Nhóm nghiên cứu
    const columns = [
        {
            title: 'MÃ NHÓM',
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => <span className="font-bold text-gray-800">{text}</span>,
        },
        {
            title: 'TÊN ĐỀ TÀI',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            render: (text: string) => <span className="text-gray-600 font-medium">{text}</span>,
        },
        {
            title: 'TRƯỞNG NHÓM',
            dataIndex: 'leader',
            key: 'leader',
            render: (text: string) => (
                <span className="text-gray-600 text-sm">{text.split('\n').map((line, i) => <div key={i}>{line}</div>)}</span>
            ),
        },
        {
            title: 'TIẾN ĐỘ',
            dataIndex: 'progress',
            key: 'progress',
            render: (percent: number) => (
                <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#A31D1D] h-full rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-[#A31D1D]">{percent}%</span>
                </div>
            ),
        },
        {
            title: 'TRẠNG THÁI',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const isProcessing = status === 'ĐANG THỰC HIỆN';
                return (
                    <Tag className={`font-bold border-none px-2.5 py-1 text-[10px] ${isProcessing ? 'bg-blue-50 text-blue-600' : 'bg-[#FFFBE6] text-[#D48806]'}`}>
                        {status}
                    </Tag>
                );
            },
        },
    ];

    return (
        <div className="max-w-[1400px] mx-auto pb-10">

            {/* ================= LỜI CHÀO HEADER ================= */}
            <div className="mb-8 border-b border-gray-200/60 pb-6">
                <h1 className="text-2xl font-black text-gray-900 mb-2">Chào buổi sáng, A! 👋</h1>
                <p className="text-gray-500 text-sm">
                    Bạn có <span className="font-bold text-gray-700">3</span> hội đồng nghiệm thu trong đợt này. Hãy kiểm tra lịch trình và hồ sơ đề tài.
                </p>
            </div>

            {/* ================= KHUNG LƯỚI CHÍNH ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ================= CỘT TRÁI (Chiếm 2 phần) ================= */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* 1. THỐNG KÊ TỔNG QUAN */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-[10px] font-bold text-[#A31D1D] uppercase tracking-wider mb-1">Tổng quan hướng dẫn</h3>
                                <h2 className="text-lg font-bold text-gray-800">Thống kê & Tiến độ chung</h2>
                            </div>
                            <div className="bg-[#F6FFED] text-[#389E0D] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#389E0D]"></div>
                                Đang hoạt động tốt
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs font-medium text-gray-500 mb-2">Tổng số nhóm</p>
                                <p className="text-3xl font-black text-gray-800">12</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs font-medium text-gray-500 mb-2">Tiến độ trung bình</p>
                                <p className="text-3xl font-black text-gray-800">68%</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs font-medium text-gray-500 mb-2">Đề tài hoàn thành</p>
                                <p className="text-3xl font-black text-[#A31D1D]">08</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. NHÓM NGHIÊN CỨU HIỆN TẠI */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-base font-bold text-gray-800">Nhóm nghiên cứu hiện tại</h2>
                            <a href="#" className="text-xs font-bold text-[#A31D1D] hover:underline">Xem tất cả</a>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={groupData}
                            pagination={false}
                            className="custom-table-header"
                        />
                    </div>

                    {/* 3. PHẢN HỒI MỚI NHẤT */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                <MessageOutlined className="text-[#A31D1D]" /> Phản hồi mới nhất từ sinh viên
                            </h2>
                            <a href="#" className="text-xs font-bold text-[#A31D1D] hover:underline">Xem tất cả</a>
                        </div>

                        <div className="space-y-6">
                            {/* Item Phản hồi 1 */}
                            <div className="flex gap-4">
                                <Avatar size={40} icon={<UserOutlined />} className="bg-red-50 text-[#A31D1D]" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <span className="font-bold text-gray-800 text-sm mr-2">Lê Minh Tuấn</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase">(N24-AT16)</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-medium">10:45 AM</span>
                                    </div>
                                    <p className="text-sm italic text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        "Thưa Thầy, nhóm em đã bổ sung phần mô phỏng tấn công Dos vào chương 3 như Thầy góp ý. Kính nhờ Thầy xem qua..."
                                    </p>
                                </div>
                            </div>

                            {/* Item Phản hồi 2 */}
                            <div className="flex gap-4">
                                <Avatar size={40} icon={<UserOutlined />} className="bg-red-50 text-[#A31D1D]" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <span className="font-bold text-gray-800 text-sm mr-2">Nguyễn Thị Mai</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase">(N24-MM02)</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-medium">Hôm qua</span>
                                    </div>
                                    <p className="text-sm italic text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        "Dạ em đã gửi báo cáo tiến độ tuần 4, Thầy kiểm tra giúp em trong Workspace nhé ạ."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ================= CỘT PHẢI (Chiếm 1 phần) ================= */}
                <div className="lg:col-span-1 flex flex-col gap-6">

                    {/* 1. LỊCH HỘI ĐỒNG SẮP TỚI */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <CalendarOutlined className="text-[#A31D1D]" /> Lịch hội đồng sắp tới
                        </h2>

                        <div className="space-y-4 mb-6">
                            {/* Lịch 1 */}
                            <div className="flex gap-4 items-center border border-gray-100 p-3 rounded-xl hover:border-red-200 transition-colors cursor-pointer">
                                <div className="bg-[#A31D1D] text-white rounded-lg w-12 h-12 flex flex-col items-center justify-center shrink-0">
                                    <span className="text-[9px] font-bold uppercase">TH5</span>
                                    <span className="text-lg font-black leading-none">22</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">Nghiệm thu Đề tài N23-MM12</h4>
                                    <div className="text-[10px] text-gray-500 flex items-center gap-1 mb-0.5">
                                        <EnvironmentOutlined /> Phòng 102 - Nhà A1
                                    </div>
                                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                        <ClockCircleOutlined /> 08:30 - 11:30
                                    </div>
                                </div>
                            </div>

                            {/* Lịch 2 */}
                            <div className="flex gap-4 items-center border border-gray-100 p-3 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                                <div className="bg-gray-100 text-gray-500 rounded-lg w-12 h-12 flex flex-col items-center justify-center shrink-0">
                                    <span className="text-[9px] font-bold uppercase">TH7</span>
                                    <span className="text-lg font-black leading-none">24</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">Bảo vệ Đề cương Nhóm N24-AT</h4>
                                    <div className="text-[10px] text-gray-500 flex items-center gap-1 mb-0.5">
                                        <EnvironmentOutlined /> Giảng đường A - Tầng 2
                                    </div>
                                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                        <ClockCircleOutlined /> 14:00 - 16:30
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full text-[#A31D1D] font-bold text-xs border border-[#A31D1D] hover:bg-red-50 rounded-lg h-9">
                            Xem toàn bộ lịch trình
                        </Button>
                    </div>

                    {/* 2. ĐỀ TÀI CẦN XỬ LÝ GẤP */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <ExclamationCircleOutlined className="text-[#A31D1D]" /> Đề tài cần xử lý gấp
                        </h2>

                        <div className="space-y-4 mb-6">
                            {/* Item Gấp 1 */}
                            <div className="border border-gray-100 p-3.5 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-gray-800 text-sm">Lê Minh Tuấn</span>
                                    <span className="bg-[#A31D1D] text-white text-[9px] font-bold px-2 py-0.5 rounded">HẾT HẠN HÔM NAY</span>
                                </div>
                                <p className="text-[11px] text-gray-500 line-clamp-1">N24-AT16: Hệ thống phát hiện xâm nhập AI</p>
                            </div>

                            {/* Item Gấp 2 */}
                            <div className="border border-gray-100 p-3.5 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-gray-800 text-sm">Nguyễn Thị Mai</span>
                                    <span className="bg-red-50 text-[#A31D1D] text-[9px] font-bold px-2 py-0.5 rounded">CÒN 1 NGÀY</span>
                                </div>
                                <p className="text-[11px] text-gray-500 line-clamp-1">N24-MM02: Ứng dụng Blockchain trong IoT</p>
                            </div>

                            {/* Item Gấp 3 */}
                            <div className="border border-gray-100 p-3.5 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-gray-800 text-sm">Trần Văn Bình</span>
                                    <span className="bg-red-50 text-[#A31D1D] text-[9px] font-bold px-2 py-0.5 rounded">CÒN 2 NGÀY</span>
                                </div>
                                <p className="text-[11px] text-gray-500 line-clamp-1">N23-MM12: Bảo mật mạng 5G</p>
                            </div>
                        </div>

                        <div className="text-center">
                            <a href="#" className="text-xs font-bold text-[#A31D1D] hover:underline">Xem tất cả yêu cầu</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}