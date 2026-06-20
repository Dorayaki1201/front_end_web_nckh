'use client';

import React from 'react';
import { Button, Table, Tag, Avatar, Select } from 'antd';
import {
    FilterOutlined,
    DownloadOutlined,
    FolderOutlined,
    FileExclamationOutlined,
    LineChartOutlined,
    SafetyCertificateOutlined,
    MessageOutlined,
    FormOutlined,
    ArrowRightOutlined,
    BellOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';

export default function ProgressAndGradingPage() {

    // ================= MOCK DATA =================
    const tableData = [
        {
            key: '1',
            studentName: 'Nguyễn Văn Nam',
            studentId: 'AT160243 • Cơ sở Hà Nội',
            avatar: 'https://i.pravatar.cc/150?img=11',
            topic: 'Phân tích & thiết kế hệ thống quản lý NCKH sinh...',
            stage: 'BÁO CÁO GIỮA KỲ',
            stageColor: 'bg-orange-50 text-orange-600',
            progress: 65,
            progressColor: 'bg-[#A31D1D]',
        },
        {
            key: '2',
            studentName: 'Lê Thị Mai Anh',
            studentId: 'CT150312 • Cơ sở HCM',
            avatar: 'https://i.pravatar.cc/150?img=5',
            topic: 'Ứng dụng Blockchain trong bảo mật hồ sơ bệnh...',
            stage: 'NGHIỆM THU',
            stageColor: 'bg-green-50 text-green-600',
            progress: 92,
            progressColor: 'bg-green-500',
        },
        {
            key: '3',
            studentName: 'Trần Minh Quân',
            studentId: 'DT170119 • Cơ sở Hà Nội',
            avatar: 'https://i.pravatar.cc/150?img=12',
            topic: 'Tối ưu hóa thuật toán nhận diện khuôn mặt trong điều...',
            stage: 'ĐỀ CƯƠNG',
            stageColor: 'bg-gray-100 text-gray-500',
            progress: 30,
            progressColor: 'bg-gray-400',
        },
    ];

    const columns = [
        {
            title: 'SINH VIÊN',
            key: 'student',
            width: '25%',
            render: (record: any) => (
                <div className="flex items-center gap-3">
                    <Avatar src={record.avatar} size="large" shape="square" className="rounded-md" />
                    <div>
                        <div className="font-bold text-gray-800 text-sm">{record.studentName}</div>
                        <div className="text-[10px] text-gray-500">{record.studentId}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'ĐỀ TÀI NGHIÊN CỨU',
            dataIndex: 'topic',
            key: 'topic',
            width: '30%',
            render: (text: string) => (
                <div className="font-medium text-gray-700 text-sm pr-4 line-clamp-2">{text}</div>
            ),
        },
        {
            title: 'GIAI ĐOẠN',
            dataIndex: 'stage',
            key: 'stage',
            render: (stage: string, record: any) => (
                <span className={`font-bold px-3 py-1 rounded text-[10px] uppercase tracking-wider ${record.stageColor}`}>
                    {stage}
                </span>
            ),
        },
        {
            title: 'TIẾN ĐỘ %',
            dataIndex: 'progress',
            key: 'progress',
            render: (percent: number, record: any) => (
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${percent >= 90 ? 'text-green-600' : percent >= 50 ? 'text-[#A31D1D]' : 'text-gray-500'}`}>
                        {percent}%
                    </span>
                    <div className="w-24 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className={`${record.progressColor} h-full rounded-full`} style={{ width: `${percent}%` }}></div>
                    </div>
                </div>
            ),
        },
        {
            title: 'THAO TÁC',
            key: 'action',
            align: 'center' as const,
            render: () => (
                <div className="flex items-center justify-center gap-2">
                    <Button icon={<MessageOutlined />} className="text-gray-500 border-gray-300" />
                    <Button type="primary" icon={<FormOutlined />} className="bg-[#A31D1D] hover:bg-red-800 border-none" />
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-6">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Theo dõi Tiến độ & Chấm điểm</h1>
                    <p className="text-gray-500 text-sm">
                        Bạn có <span className="font-bold text-[#A31D1D]">5 báo cáo mới</span> cần phê duyệt trong hôm nay.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button icon={<FilterOutlined />} className="font-semibold text-gray-600 h-10 px-4 rounded-lg">
                        Lọc dữ liệu
                    </Button>
                    <Button type="primary" icon={<DownloadOutlined />} className="font-semibold bg-[#A31D1D] border-none h-10 px-4 rounded-lg shadow-sm">
                        Xuất báo cáo (Excel)
                    </Button>
                </div>
            </div>

            {/* ================= STATS CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4 shadow-sm h-[100px]">
                    <div className="bg-gray-50 p-3 rounded-lg text-gray-500 text-xl"><FolderOutlined /></div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tổng số nhóm</div>
                        <div className="text-2xl font-black text-gray-800 leading-none">12</div>
                    </div>
                </div>

                {/* Card Cần duyệt gấp (Có viền đỏ trên dưới) */}
                <div className="bg-white p-5 rounded-xl border-t-2 border-b-2 border-t-[#A31D1D] border-b-[#A31D1D] border-l border-r border-gray-100 flex items-center gap-4 shadow-md h-[100px]">
                    <div className="bg-red-50 p-3 rounded-lg text-[#A31D1D] text-xl relative">
                        <FileExclamationOutlined />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-[#A31D1D] uppercase tracking-wider mb-1">Cần duyệt gấp</div>
                        <div className="text-2xl font-black text-[#A31D1D] leading-none">05</div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4 shadow-sm h-[100px]">
                    <div className="bg-green-50 p-3 rounded-lg text-green-500 text-xl"><LineChartOutlined /></div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tiến độ TB</div>
                        <div className="text-2xl font-black text-gray-800 leading-none">68%</div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4 shadow-sm h-[100px]">
                    <div className="bg-blue-50 p-3 rounded-lg text-blue-500 text-xl"><SafetyCertificateOutlined /></div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Đã hoàn thành</div>
                        <div className="text-2xl font-black text-gray-800 leading-none">02</div>
                    </div>
                </div>

            </div>

            {/* ================= TABLE ================= */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                {/* Table Header */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Danh sách nghiên cứu sinh</h2>
                        <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">12 Nhóm</span>
                    </div>
                    <Avatar.Group
                        size="small"
                        max={{ count: 2, style: { color: '#666', backgroundColor: '#f0f0f0', fontSize: '10px' } }}
                    >
                        <Avatar src="https://i.pravatar.cc/150?img=11" />
                        <Avatar src="https://i.pravatar.cc/150?img=5" />
                        <Avatar src="https://i.pravatar.cc/150?img=12" />
                        <Avatar src="https://i.pravatar.cc/150?img=33" />
                    </Avatar.Group>
                </div>

                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    className="custom-table-header"
                />

                {/* Custom Pagination Footer */}
                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        Hiển thị
                        <Select defaultValue="10" size="small" className="w-[70px]">
                            <Select.Option value="10">10</Select.Option>
                            <Select.Option value="20">20</Select.Option>
                        </Select>
                        kết quả
                    </div>
                    <div className="flex gap-1">
                        <Button size="small" disabled className="text-xs">&lt;</Button>
                        <Button size="small" type="primary" className="bg-[#A31D1D] text-xs">1</Button>
                        <Button size="small" className="text-xs">2</Button>
                        <Button size="small" className="text-xs">&gt;</Button>
                    </div>
                </div>
            </div>

            {/* ================= BOTTOM WIDGETS ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN (Spans 2/3) */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Nhận xét gần đây */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2 uppercase tracking-wide text-sm">
                                <MessageOutlined className="text-[#A31D1D]" /> Nhận xét gần đây nhất
                            </h3>
                            <span className="text-xs text-gray-400 font-medium">10/06/2024</span>
                        </div>

                        <div className="border-l-4 border-[#A31D1D] pl-4 py-1 relative z-10">
                            <p className="text-sm text-gray-600 italic leading-relaxed">
                                "Nhóm đã hoàn thành tốt các mục tiêu nghiên cứu trong giai đoạn 2. Tuy nhiên cần chú trọng hơn vào phần thực nghiệm và so sánh kết quả với các công trình nghiên cứu trước đó. Nhớ chuẩn bị kỹ bài thuyết trình cho buổi báo cáo tuần sau."
                            </p>
                        </div>
                        <div className="text-8xl text-gray-50 absolute right-4 top-8 font-serif leading-none select-none z-0">
                            "
                        </div>

                        <div className="mt-4 text-right">
                            <a href="#" className="text-xs font-bold text-[#A31D1D] hover:underline flex items-center justify-end gap-1">
                                Xem toàn bộ lịch sử trao đổi <ArrowRightOutlined />
                            </a>
                        </div>
                    </div>

                    {/* Thông báo quan trọng */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2 uppercase tracking-wide text-sm">
                            <BellOutlined className="text-[#A31D1D]" /> Thông báo quan trọng
                        </h3>

                        <div className="flex flex-col gap-4">
                            {/* Alert 1 */}
                            <div className="flex items-start gap-4 p-3 rounded-lg bg-red-50/50 hover:bg-red-50 transition-colors">
                                <div className="bg-white text-red-500 p-2 rounded-full shadow-sm">
                                    <ExclamationCircleOutlined />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-gray-800 text-sm">Hạn chót phê duyệt báo cáo tuần 8</h4>
                                        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Hôm nay</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Hệ thống sẽ đóng cổng phê duyệt vào 17:00 ngày 15/05/2024.</p>
                                </div>
                            </div>

                            {/* Alert 2 */}
                            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="bg-blue-50 text-blue-500 p-2 rounded-full">
                                    <CheckCircleOutlined />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-gray-800 text-sm">Nhóm 12 đã hoàn tất hồ sơ nghiệm thu</h4>
                                        <span className="text-gray-400 text-[10px] font-medium">Hôm qua</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Sinh viên Lê Thị Mai Anh đã tải lên toàn bộ mã nguồn và báo cáo cuối kỳ.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN (Spans 1/3) */}
                <div className="lg:col-span-1">
                    {/* Thời hạn sắp tới */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800 uppercase tracking-wide text-sm">Thời hạn sắp tới</h3>
                            <ClockCircleOutlined className="text-[#A31D1D]" />
                        </div>

                        <div className="flex flex-col gap-5 flex-1">
                            {/* Event 1 */}
                            <div className="flex gap-4 items-start">
                                <div className="flex flex-col items-center justify-center border border-gray-200 rounded-lg min-w-[50px] overflow-hidden">
                                    <div className="bg-gray-50 text-[9px] font-bold text-gray-500 w-full text-center py-1 uppercase border-b border-gray-200">Tháng 5</div>
                                    <div className="text-lg font-black text-gray-800 py-1">20</div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm mb-1">Chốt điểm giữa kỳ</h4>
                                    <p className="text-[10px] font-bold text-[#A31D1D]">• Còn 5 ngày</p>
                                </div>
                            </div>

                            {/* Event 2 */}
                            <div className="flex gap-4 items-start">
                                <div className="flex flex-col items-center justify-center border border-gray-200 rounded-lg min-w-[50px] overflow-hidden opacity-60">
                                    <div className="bg-gray-50 text-[9px] font-bold text-gray-500 w-full text-center py-1 uppercase border-b border-gray-200">Tháng 6</div>
                                    <div className="text-lg font-black text-gray-800 py-1">05</div>
                                </div>
                                <div className="opacity-80">
                                    <h4 className="font-bold text-gray-800 text-sm mb-1">Họp hội đồng cơ sở</h4>
                                    <p className="text-[10px] text-gray-500">Cần chuẩn bị slide</p>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full mt-6 text-[#A31D1D] font-bold text-xs uppercase tracking-wider border-gray-200 hover:border-[#A31D1D]">
                            Xem toàn bộ lịch hẹn
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    );
}