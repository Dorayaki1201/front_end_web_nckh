'use client';

import React from 'react';
import { Progress } from 'antd';
import {
    EyeOutlined,
    ArrowRightOutlined,
    ReadOutlined,
    TeamOutlined,
    FileDoneOutlined,
    WarningOutlined,
    DatabaseOutlined,
    MailOutlined,
    CloudServerOutlined
} from '@ant-design/icons';

export default function ManagerDashboard() {
    const recentTopics = [
        { id: 'DT-2023-0045', name: 'Phát hiện tấn công mạng bằng AI/ML', leader: 'TS. Nguyễn Văn A', status: 'CHỜ DUYỆT', statusColor: 'bg-yellow-100 text-yellow-700' },
        { id: 'DT-2023-0042', name: 'Giao thức bảo mật cho IoT công nghiệp', leader: 'ThS. Lê Thị B', status: 'CHỜ BỔ SUNG', statusColor: 'bg-orange-100 text-orange-700' },
        { id: 'DT-2023-0039', name: 'Nghiên cứu mật mã sau lượng tử', leader: 'TS. Trần Quang C', status: 'ĐÃ DUYỆT', statusColor: 'bg-green-100 text-green-700' },
        { id: 'DT-2023-0035', name: 'Hệ thống giám sát an ninh tòa nhà thông minh', leader: 'ThS. Phạm Hùng D', status: 'ĐÃ HỦY', statusColor: 'bg-red-100 text-red-700' },
    ];

    return (
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">

            {/* 1. Header Lời chào */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    Chào buổi sáng, B! <span className="text-2xl">👋</span>
                </h1>
                <p className="text-gray-500 mt-1">
                    Hệ thống đang hoạt động ổn định. Bạn có <span className="font-semibold text-gray-700">3 nhiệm vụ mới</span> cần xử lý trong hôm nay.
                </p>
            </div>

            {/* 2. Các thẻ Thống kê (Grid 4 cột) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-[#A31D1D] relative">
                    <div className="flex justify-between items-start mb-4">
                        <ReadOutlined className="text-2xl text-[#A31D1D]" />
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md">+12%</span>
                    </div>
                    <div className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Tổng số nhà nghiên cứu</div>
                    <div className="text-2xl font-bold text-[#A31D1D]">1,284</div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-[#8B7D3A] relative">
                    <div className="flex justify-between items-start mb-4">
                        <TeamOutlined className="text-2xl text-[#8B7D3A]" />
                    </div>
                    <div className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Hội đồng đang hoạt động</div>
                    <div className="text-2xl font-bold text-[#8B7D3A]">15</div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-red-400 relative">
                    <div className="flex justify-between items-start mb-4">
                        <FileDoneOutlined className="text-2xl text-red-400" />
                        <span className="text-xs font-bold bg-red-50 text-red-500 px-2 py-1 rounded-md">Cần xử lý</span>
                    </div>
                    <div className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Đề tài chờ phê duyệt</div>
                    <div className="text-2xl font-bold text-red-500">08</div>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-[#A31D1D] relative">
                    <div className="flex justify-between items-start mb-4">
                        <WarningOutlined className="text-2xl text-[#A31D1D]" />
                    </div>
                    <div className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Cảnh báo hệ thống</div>
                    <div className="text-2xl font-bold text-[#A31D1D]">02</div>
                </div>
            </div>

            {/* 3. Phần Nội dung chính (Grid 2 cột lệch: 2/3 và 1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* CỘT TRÁI: Bảng Đề tài (Chiếm 2 phần) */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h2 className="text-lg font-bold text-gray-800">Đề tài mới gửi gần đây</h2>
                        <button className="text-[#A31D1D] text-sm font-semibold hover:underline flex items-center gap-1">
                            Xem tất cả <ArrowRightOutlined />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                                    <th className="px-5 py-4 border-b border-gray-100">Mã đề tài</th>
                                    <th className="px-5 py-4 border-b border-gray-100">Tên đề tài</th>
                                    <th className="px-5 py-4 border-b border-gray-100">Chủ nhiệm</th>
                                    <th className="px-5 py-4 border-b border-gray-100">Trạng thái</th>
                                    <th className="px-5 py-4 border-b border-gray-100 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-700">
                                {recentTopics.map((topic, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
                                        <td className="px-5 py-4 font-mono text-xs text-gray-500">{topic.id}</td>
                                        <td className="px-5 py-4 font-medium max-w-[200px] truncate" title={topic.name}>{topic.name}</td>
                                        <td className="px-5 py-4">{topic.leader}</td>
                                        <td className="px-5 py-4">
                                            <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${topic.statusColor}`}>
                                                {topic.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#A31D1D] hover:bg-red-50 transition-colors mx-auto">
                                                <EyeOutlined className="text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CỘT PHẢI: Trạng thái & Tin tức (Chiếm 1 phần) */}
                <div className="lg:col-span-1 flex flex-col gap-6">

                    {/* Box Trạng thái hệ thống */}
                    <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <DatabaseOutlined className="text-green-600" /> Trạng thái hệ thống
                        </h2>

                        <div className="mb-6">
                            <div className="flex justify-end text-xs font-bold text-gray-600 mb-1">85%</div>
                            <Progress percent={85} showInfo={false} strokeColor="#A31D1D" trailColor="#f0f0f0" className="m-0" />
                        </div>

                        <div className="flex justify-between items-center mb-2 text-sm">
                            <span className="text-gray-500">Băng thông mạng</span>
                            <span className="text-gray-800 font-semibold">Ổn định</span>
                        </div>
                        <div className="flex gap-1 mb-6">
                            <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                            <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                            <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                            <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                        </div>

                        <ul className="flex flex-col gap-3 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Database: Hoạt động bình thường
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Email Server: Đã kết nối
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                Backup: Đang tiến hành (60%)
                            </li>
                        </ul>
                    </div>

                    {/* Box Tin nổi bật */}
                    <div
                        className="rounded-xl overflow-hidden relative h-[180px] group cursor-pointer border border-transparent hover:border-[#A31D1D] transition-all shadow-sm"
                        style={{
                            backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#6e1414] via-[#851818]/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-5">
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1 block">Tin nổi bật</span>
                            <h3 className="text-white text-lg font-bold">Kế hoạch nghiên cứu 2024</h3>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}