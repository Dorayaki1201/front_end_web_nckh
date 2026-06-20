'use client';

import React from 'react';
import { Button } from 'antd';
import {
    DownloadOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    UserOutlined,
    IdcardOutlined,
    LinkOutlined,
    InfoCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';

export default function CouncilEvaluationPage() {
    return (
        <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-6">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Hội đồng Đánh giá & Nghiệm thu</h1>
                    <p className="text-gray-500 text-sm">
                        Xem danh sách các hội đồng tham gia và thực hiện nhập điểm đánh giá cho sinh viên.
                    </p>
                </div>
                <Button
                    icon={<DownloadOutlined />}
                    className="font-semibold text-gray-600 border-gray-300 h-10 px-4 rounded-lg hover:text-[#A31D1D] hover:border-[#A31D1D]"
                >
                    Xuất danh sách
                </Button>
            </div>

            {/* ================= KHUNG LƯỚI CHÍNH ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ================= CỘT TRÁI (DANH SÁCH HỘI ĐỒNG) ================= */}
                <div className="lg:col-span-2 flex flex-col gap-8">

                    {/* Sub-header của danh sách */}
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Hội đồng sắp tới (04)</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Học kỳ 2 - 2023-2024</span>
                    </div>

                    {/* ----- SECTION: HÔM NAY ----- */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="font-black text-gray-900 uppercase tracking-wider text-sm">Hôm nay</h3>
                            <div className="flex-1 border-b border-gray-100"></div>
                            <span className="text-xs font-medium text-gray-400">16 Tháng 05, 2024</span>
                        </div>

                        {/* Card Hội đồng 1 */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative overflow-hidden transition-all hover:shadow-md hover:border-[#A31D1D]/30">
                            {/* Vạch đỏ chỉ báo active */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A31D1D]"></div>

                            <div className="flex justify-between items-center mb-4 pl-2">
                                <div className="flex items-center gap-3">
                                    <span className="bg-red-50 text-[#A31D1D] font-bold text-[10px] px-2 py-1 rounded uppercase">Cấp khoa</span>
                                    <span className="text-gray-500 text-xs font-medium flex items-center gap-1.5">
                                        <ClockCircleOutlined /> 14:00 - 17:00
                                    </span>
                                </div>
                                <span className="text-green-600 font-bold text-[10px] bg-green-50 px-2 py-1 rounded uppercase flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Đang mở nhập điểm
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-6 leading-snug pl-2">
                                Phát triển hệ thống IDS dựa trên Machine Learning ứng dụng trong mạng nội bộ DN
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100 mb-6 ml-2">
                                <div className="flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-md shadow-sm text-gray-400"><UserOutlined /></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Sinh viên thực hiện</div>
                                        <div className="text-sm font-bold text-gray-800">Nguyễn Thành Trung, Lê Minh Quân</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-md shadow-sm text-[#A31D1D]"><IdcardOutlined /></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Vai trò của bạn</div>
                                        <div className="text-sm font-black text-[#A31D1D] uppercase">Chủ tịch hội đồng</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 pl-2 gap-4">
                                <div className="text-gray-500 text-sm font-medium flex items-center gap-1.5">
                                    <EnvironmentOutlined className="text-[#A31D1D]" /> Phòng 402, Nhà TA
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <Button className="font-semibold text-gray-600 h-9 px-5 flex-1 sm:flex-none">Xem hồ sơ</Button>
                                    <Button type="primary" className="font-semibold bg-[#A31D1D] border-none h-9 px-6 flex-1 sm:flex-none shadow-sm hover:opacity-90">Nhập điểm</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ----- SECTION: SẮP TỚI ----- */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="font-black text-gray-900 uppercase tracking-wider text-sm">Sắp tới</h3>
                            <div className="flex-1 border-b border-gray-100"></div>
                            <span className="text-xs font-medium text-gray-400">Thứ 4, 22 Tháng 05, 2024</span>
                        </div>

                        {/* Card Hội đồng 2 */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="bg-yellow-50 text-yellow-700 font-bold text-[10px] px-2 py-1 rounded uppercase">Cấp học viện</span>
                                    <span className="text-gray-500 text-xs font-medium flex items-center gap-1.5">
                                        <ClockCircleOutlined /> 08:30 - 11:30
                                    </span>
                                </div>
                                <span className="text-gray-500 font-bold text-[10px] bg-gray-100 px-2 py-1 rounded uppercase">
                                    Chưa bắt đầu
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-6 leading-snug">
                                Nghiên cứu ứng dụng Blockchain trong quản lý văn bằng tại các trường Đại học
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-md shadow-sm text-gray-400"><UserOutlined /></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Sinh viên thực hiện</div>
                                        <div className="text-sm font-bold text-gray-800">Trần Thị Bích (KMA-CT7)</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-md shadow-sm text-gray-500"><IdcardOutlined /></div>
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Vai trò của bạn</div>
                                        <div className="text-sm font-bold text-gray-700 uppercase">Ủy viên phản biện</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 gap-4">
                                <a href="#" className="text-[#A31D1D] font-bold text-sm flex items-center gap-1.5 hover:underline">
                                    <LinkOutlined /> Link trực tuyến (Google Meet)
                                </a>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <Button className="font-semibold text-gray-600 h-9 px-5 flex-1 sm:flex-none">Xem hồ sơ</Button>
                                    <Button disabled className="font-semibold bg-gray-100 text-gray-400 border-none h-9 px-6 flex-1 sm:flex-none">Chưa mở nhập điểm</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nút tải thêm */}
                    <div className="text-center mt-4">
                        <Button className="font-bold text-[#A31D1D] border-[#A31D1D] rounded-full px-8 h-10 hover:bg-red-50 mb-2">
                            TẢI THÊM LỊCH TRÌNH
                        </Button>
                        <p className="text-[10px] text-gray-400 font-medium">Đang hiển thị 2 hội đồng tiêu biểu cho tuần này</p>
                    </div>

                </div>

                {/* ================= CỘT PHẢI (WIDGETS) ================= */}
                <div className="lg:col-span-1 flex flex-col gap-6">

                    {/* Widget 1: Thống kê nhiệm vụ */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">Thống kê nhiệm vụ</h3>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                                <div className="text-3xl font-black text-gray-800 leading-none mb-1">02</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase">Chủ tịch</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                                <div className="text-3xl font-black text-gray-800 leading-none mb-1">05</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase">Phản biện</div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[11px] font-bold text-gray-800 uppercase">Tiến độ nhập điểm</span>
                                <span className="text-sm font-black text-[#A31D1D]">85%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mb-2">
                                <div className="bg-[#A31D1D] h-full rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <p className="text-[10px] text-gray-400 italic">* Đã hoàn thành 12/14 hồ sơ</p>
                        </div>
                    </div>

                    {/* Widget 2: Lưu ý nghiệp vụ (Nền đỏ) */}
                    <div className="bg-[#8B1515] rounded-xl shadow-md p-6 relative overflow-hidden text-white">
                        {/* Họa tiết trang trí mờ ở background */}
                        <div className="absolute -bottom-6 -right-4 opacity-10">
                            <IdcardOutlined style={{ fontSize: '120px' }} />
                        </div>

                        <h3 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <InfoCircleOutlined className="text-lg" /> Lưu ý nghiệp vụ
                        </h3>
                        <p className="text-sm leading-relaxed mb-6 font-medium text-red-50">
                            "Giảng viên vui lòng hoàn tất việc nhập điểm và nhận xét trực tuyến trong vòng tối đa 24h sau khi kết thúc phiên hội đồng để đảm bảo tiến độ xét duyệt cấp trường."
                        </p>
                        <a href="#" className="text-[10px] font-bold uppercase tracking-wider hover:underline flex items-center gap-1 text-white">
                            Xem chi tiết quy trình <ArrowRightOutlined />
                        </a>
                    </div>

                    {/* Widget 3: Hỗ trợ kỹ thuật */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-5">Hỗ trợ kỹ thuật</h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg text-gray-500 border border-gray-100">
                                    <MailOutlined className="text-lg" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-800 text-sm">nckh@actvn.edu.vn</div>
                                    <div className="text-[10px] text-gray-400 uppercase">Phòng Đào tạo & NCKH</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg text-[#A31D1D] border border-red-50">
                                    <PhoneOutlined className="text-lg" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-800 text-sm">(024) 3.553.1168</div>
                                    <div className="text-[10px] text-gray-400 uppercase">Hotline hỗ trợ Giảng viên</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}