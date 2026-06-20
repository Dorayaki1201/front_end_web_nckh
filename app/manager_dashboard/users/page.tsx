'use client';

import React from 'react';
import { Button, Pagination } from 'antd';
import {
    PlusOutlined,
    TeamOutlined,
    CalendarOutlined,
    BankOutlined,
    FileTextOutlined,
    EnvironmentOutlined,
    UserOutlined
} from '@ant-design/icons';

export default function ManagerCouncilsPage() {
    return (
        <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-8">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Quản lý Hội đồng</h1>
                    <p className="text-gray-500 text-sm">
                        Giám sát và quản lý các hội đồng đánh giá nghiên cứu khoa học.
                    </p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="font-bold bg-[#A31D1D] border-none h-10 px-5 rounded-lg shadow-sm hover:opacity-90"
                >
                    Tạo hội đồng mới
                </Button>
            </div>

            {/* ================= STATS CARDS (4 Cột) ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Card 1: Tổng số hội đồng */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="bg-red-50 p-4 rounded-xl text-[#A31D1D] text-2xl">
                        <TeamOutlined />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tổng số hội đồng</div>
                        <div className="text-2xl font-black text-gray-900 leading-none">24</div>
                    </div>
                </div>

                {/* Card 2: Hội đồng hôm nay */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="bg-yellow-50 p-4 rounded-xl text-yellow-600 text-2xl">
                        <CalendarOutlined />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Hội đồng hôm nay</div>
                        <div className="text-2xl font-black text-gray-900 leading-none">08</div>
                    </div>
                </div>

                {/* Card 3: Phòng đang sử dụng */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="bg-red-50 p-4 rounded-xl text-[#A31D1D] text-2xl">
                        <BankOutlined />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phòng đang sử dụng</div>
                        <div className="text-2xl font-black text-gray-900 leading-none">12</div>
                    </div>
                </div>

                {/* Card 4: Báo cáo hoàn thành */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="bg-gray-100 p-4 rounded-xl text-gray-500 text-2xl">
                        <FileTextOutlined />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Báo cáo hoàn thành</div>
                        <div className="text-2xl font-black text-gray-900 leading-none">156</div>
                    </div>
                </div>

            </div>

            {/* ================= DANH SÁCH CARDS HỘI ĐỒNG ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Hội đồng 1: ĐANG DIỄN RA (Viền đỏ) */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col border-t-4 border-t-[#A31D1D] overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xl font-black text-gray-800">ATTT-01</h2>
                            <span className="bg-green-100 text-green-700 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                                Đang diễn ra
                            </span>
                        </div>
                        <div className="text-xs font-bold text-[#A31D1D] uppercase tracking-wider mb-6">
                            An toàn thông tin
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <EnvironmentOutlined className="text-gray-400 text-lg" />
                                <span>Phòng họp: <strong className="font-medium text-gray-800">Hội trường A - 302</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CalendarOutlined className="text-gray-400 text-lg" />
                                <span>Ngày họp: <strong className="font-medium text-gray-800">24/10/2023</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <UserOutlined className="text-gray-400 text-lg" />
                                <span>Thành viên: <strong className="font-medium text-gray-800">05 Giáo sư</strong></span>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3 mt-auto">
                        <Button className="font-bold text-[#A31D1D] border-[#A31D1D] h-10 rounded-lg hover:bg-red-50">
                            Quản lý
                        </Button>
                        <Button type="primary" className="font-bold bg-[#A31D1D] border-none h-10 rounded-lg shadow-sm hover:opacity-90">
                            Chi tiết
                        </Button>
                    </div>
                </div>

                {/* Hội đồng 2: SẮP DIỄN RA (Viền vàng) */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col border-t-4 border-t-[#FADB14] overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xl font-black text-gray-800">CNTT-04</h2>
                            <span className="bg-blue-100 text-blue-600 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                                Sắp diễn ra
                            </span>
                        </div>
                        <div className="text-xs font-bold text-[#A31D1D] uppercase tracking-wider mb-6">
                            Công nghệ thông tin
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <EnvironmentOutlined className="text-gray-400 text-lg" />
                                <span>Phòng họp: <strong className="font-medium text-gray-800">Lab 10 - 201</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CalendarOutlined className="text-gray-400 text-lg" />
                                <span>Ngày họp: <strong className="font-medium text-gray-800">26/10/2023</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <UserOutlined className="text-gray-400 text-lg" />
                                <span>Thành viên: <strong className="font-medium text-gray-800">03 Giáo sư</strong></span>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3 mt-auto">
                        <Button className="font-bold text-[#A31D1D] border-[#A31D1D] h-10 rounded-lg hover:bg-red-50">
                            Quản lý
                        </Button>
                        <Button type="primary" className="font-bold bg-[#A31D1D] border-none h-10 rounded-lg shadow-sm hover:opacity-90">
                            Chi tiết
                        </Button>
                    </div>
                </div>

                {/* Card 3: NÚT TẠO MỚI (Viền đứt khúc) */}
                <div className="bg-red-50/30 rounded-xl border-2 border-dashed border-[#A31D1D]/30 min-h-[250px] flex flex-col justify-center items-center cursor-pointer hover:bg-red-50 transition-colors group">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#A31D1D] text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <PlusOutlined />
                    </div>
                    <span className="font-black text-gray-800 text-base">Lên lịch hội đồng</span>
                </div>

            </div>

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-center mt-6">
                <Pagination
                    defaultCurrent={1}
                    total={120}
                    pageSize={10}
                    showSizeChanger={false}
                    className="custom-red-pagination"
                />
            </div>

        </div>
    );
}