'use client';

import React from 'react';
import { Button, Avatar, Table, Tag } from 'antd';
import {
    FilterOutlined,
    PlusOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    WarningOutlined,
    FileTextOutlined,
    MoreOutlined,
    CalendarOutlined,
    MessageOutlined,
    ClockCircleOutlined,
    SyncOutlined,
    EyeOutlined,
    EditOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';

export default function GuidedGroupsPage() {

    // ================= MOCK DATA =================
    const tableData = [
        {
            key: '1',
            topic: 'Xây dựng hệ thống phát hiện xâm...',
            code: 'DT-2024-0012',
            class: 'AT16B',
            memberCount: 3,
            leader: 'Lê Anh Tuấn',
            progress: 45,
            status: 'ĐANG NGHIÊN CỨU',
            statusColor: 'bg-blue-50 text-blue-600',
        },
        {
            key: '2',
            topic: 'Tối ưu hóa thuật toán mật mã trên...',
            code: 'DT-2024-0015',
            class: 'AT16C',
            memberCount: 2,
            leader: 'Hoàng Minh',
            progress: 80,
            status: 'GIAI ĐOẠN CUỐI',
            statusColor: 'bg-[#F6FFED] text-[#389E0D]',
        },
    ];

    const columns = [
        {
            title: 'ĐỀ TÀI NGHIÊN CỨU',
            dataIndex: 'topic',
            key: 'topic',
            width: '40%',
            render: (text: string, record: any) => (
                <div>
                    <div className="font-bold text-gray-800 text-sm mb-1">{text}</div>
                    <div className="text-[11px] text-gray-500">Mã: {record.code} | {record.class}</div>
                </div>
            ),
        },
        {
            title: 'THÀNH VIÊN',
            key: 'members',
            render: (record: any) => (
                <div>
                    <div className="font-bold text-gray-800 text-sm mb-1">{record.memberCount} sinh viên</div>
                    <div className="text-[11px] text-gray-500">{record.leader}, +{record.memberCount - 1}</div>
                </div>
            ),
        },
        {
            title: 'TIẾN ĐỘ',
            dataIndex: 'progress',
            key: 'progress',
            render: (percent: number) => (
                <div className="flex items-center gap-3">
                    <div className="w-20 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#A31D1D] h-full rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-800">{percent}%</span>
                </div>
            ),
        },
        {
            title: 'TRẠNG THÁI',
            dataIndex: 'status',
            key: 'status',
            render: (status: string, record: any) => (
                <Tag className={`font-bold border-none px-2.5 py-1 text-[10px] ${record.statusColor}`}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'TÙY CHỌN',
            key: 'action',
            align: 'center' as const,
            render: () => (
                <div className="flex items-center justify-center gap-3 text-gray-500 text-lg">
                    <EyeOutlined className="cursor-pointer hover:text-[#A31D1D] transition-colors" />
                    <EditOutlined className="cursor-pointer hover:text-[#A31D1D] transition-colors" />
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-8">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Nhóm hướng dẫn</h1>
                    <p className="text-gray-500 text-sm">Chào TS. Lê Văn A, bạn đang quản lý 08 nhóm nghiên cứu trong kỳ này.</p>
                </div>
                <div className="flex gap-3">
                    <Button icon={<FilterOutlined />} className="font-semibold text-gray-600 h-10 px-4 rounded-lg">
                        Bộ lọc
                    </Button>
                    <Button type="primary" icon={<PlusOutlined />} className="font-semibold bg-[#A31D1D] border-none h-10 px-4 rounded-lg shadow-sm">
                        Giao nhiệm vụ mới
                    </Button>
                </div>
            </div>

            {/* ================= 4 STATS CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Card 1: Tổng số (Nền hơi hồng) */}
                <div className="bg-[#FFF5F5] p-5 rounded-xl border border-red-100 flex flex-col justify-between h-[120px]">
                    <div className="flex justify-between items-start">
                        <div className="bg-white text-[#A31D1D] p-2 rounded-lg shadow-sm">
                            <TeamOutlined className="text-lg" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tổng số</span>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-gray-900 leading-none mb-1">08</div>
                        <div className="text-xs text-gray-500 font-medium">Nhóm hướng dẫn</div>
                    </div>
                </div>

                {/* Card 2: Tiến độ */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col justify-between h-[120px] shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                            <CheckCircleOutlined className="text-lg" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tiến độ</span>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-green-600 leading-none mb-1">06</div>
                        <div className="text-xs text-gray-500 font-medium">Đúng kế hoạch</div>
                    </div>
                </div>

                {/* Card 3: Cảnh báo */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col justify-between h-[120px] shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="bg-red-50 text-red-500 p-2 rounded-lg">
                            <WarningOutlined className="text-lg" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Cảnh báo</span>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-red-500 leading-none mb-1">02</div>
                        <div className="text-xs text-gray-500 font-medium">Cần nhắc nhở</div>
                    </div>
                </div>

                {/* Card 4: Báo cáo */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col justify-between h-[120px] shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="bg-blue-50 text-blue-500 p-2 rounded-lg">
                            <FileTextOutlined className="text-lg" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Báo cáo</span>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-blue-600 leading-none mb-1">12</div>
                        <div className="text-xs text-gray-500 font-medium">Chưa phê duyệt</div>
                    </div>
                </div>

            </div>

            {/* ================= 2 CARDS DANH SÁCH NHÓM HIỆN TẠI ================= */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Danh sách nhóm hiện tại</h2>
                    <a href="#" className="text-xs font-bold text-[#A31D1D] hover:underline flex items-center gap-1">
                        Xem tất cả <ArrowRightOutlined />
                    </a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Nhóm 1: Đúng tiến độ */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-green-50 text-green-600 font-bold text-[10px] px-3 py-1 rounded uppercase tracking-wider">
                                Đúng tiến độ
                            </span>
                            <MoreOutlined className="text-xl text-gray-400 cursor-pointer" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-4 leading-snug line-clamp-2">
                            Nghiên cứu ứng dụng Blockchain trong quản lý văn bằng chứng chỉ
                        </h3>

                        <div className="flex items-center gap-4 mb-6">
                            <Avatar.Group size="large" maxCount={3} maxStyle={{ color: '#A31D1D', backgroundColor: '#FFF5F5' }}>
                                <Avatar src="https://i.pravatar.cc/150?img=33" />
                                <Avatar src="https://i.pravatar.cc/150?img=47" />
                                <Avatar src="https://i.pravatar.cc/150?img=12" />
                            </Avatar.Group>
                            <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase">Lớp</div>
                                <div className="text-sm font-bold text-gray-800">AT16D</div>
                            </div>
                        </div>

                        <div className="mb-6 mt-auto">
                            <div className="flex justify-between items-end mb-2 text-xs font-bold">
                                <span className="text-gray-500">Tiến độ tổng quát</span>
                                <span className="text-gray-800">65%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-[#A31D1D] h-full rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                            <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                                <CalendarOutlined /> Hạn kế tiếp: <strong className="text-gray-800">15/05/2026</strong>
                            </span>
                            <a href="#" className="text-[#A31D1D] font-bold flex items-center gap-1 hover:underline">
                                Chi tiết <ArrowRightOutlined />
                            </a>
                        </div>
                    </div>

                    {/* Nhóm 2: Cần nhắc nhở */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-orange-50 text-orange-500 font-bold text-[10px] px-3 py-1 rounded uppercase tracking-wider">
                                Cần nhắc nhở
                            </span>
                            <MoreOutlined className="text-xl text-gray-400 cursor-pointer" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-4 leading-snug line-clamp-2">
                            Phân tích lỗ hổng Zero-day trên các thiết bị IoT gia đình
                        </h3>

                        <div className="flex items-center gap-4 mb-6">
                            <Avatar.Group size="large">
                                <Avatar src="https://i.pravatar.cc/150?img=11" />
                                <Avatar src="https://i.pravatar.cc/150?img=59" />
                            </Avatar.Group>
                            <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase">Lớp</div>
                                <div className="text-sm font-bold text-gray-800">AT17E</div>
                            </div>
                        </div>

                        <div className="mb-6 mt-auto">
                            <div className="flex justify-between items-end mb-2 text-xs font-bold">
                                <span className="text-red-500 flex items-center gap-1"><ClockCircleOutlined /> Trễ hạn 2 ngày</span>
                                <span className="text-gray-800">32%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-red-500 h-full rounded-full" style={{ width: '32%' }}></div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                            <span className="text-gray-500 flex items-center gap-1.5 font-medium line-clamp-1">
                                <MessageOutlined /> Trao đổi mới nhất: <strong className="text-gray-800">"Chưa nộp báo cáo..."</strong>
                            </span>
                            <a href="#" className="text-[#A31D1D] font-bold flex items-center gap-1 hover:underline shrink-0 pl-2">
                                Phản hồi <ArrowRightOutlined />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* ================= TABLE DANH SÁCH CHI TIẾT ================= */}
            <div className="bg-white rounded-xl border border-red-200/50 shadow-sm overflow-hidden flex flex-col">
                {/* Table Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-1">Danh sách chi tiết</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Đang hiển thị 08 đề tài hướng dẫn</p>
                    </div>
                    <SyncOutlined className="text-[#A31D1D] text-lg cursor-pointer hover:rotate-180 transition-transform duration-500" />
                </div>

                {/* The Table */}
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    className="custom-table-header"
                />

                {/* Table Footer Link */}
                <div className="p-4 border-t border-red-50 text-center bg-gray-50/50 mt-auto">
                    <a href="#" className="text-xs font-bold text-[#A31D1D] hover:underline">
                        Tải danh sách (.xlsx)
                    </a>
                </div>
            </div>

        </div>
    );
}