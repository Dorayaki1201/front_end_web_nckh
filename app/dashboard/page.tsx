'use client';

import React from 'react';
import { Card, Button, Input, Upload, Tag, Divider } from 'antd';
import {
    UserOutlined, CalendarOutlined, InboxOutlined, MessageOutlined,
    TrophyOutlined, FileTextOutlined, CheckOutlined, SyncOutlined, LockOutlined,
    RobotOutlined, FormOutlined, CloseOutlined
} from '@ant-design/icons';

const { TextArea } = Input;
const { Dragger } = Upload;

export default function StudentDashboardPage() {
    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Chào buổi sáng, Nam! 👋</h1>
                    <p className="text-gray-500 text-sm">Bạn có một hạn nộp báo cáo trong 5 ngày tới. Hãy kiểm tra tiến độ nhé.</p>
                </div>
                <Button type="primary" className="bg-[#A31D1D] font-bold h-10 px-6 shadow-md rounded-md">
                    + Nộp báo cáo định kỳ
                </Button>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                    <Card
                        style={{ borderTop: "4px solid #A31D1D", marginBottom: '80px' }}
                        className="rounded-xl shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-red-700 tracking-widest uppercase">Đề tài hiện tại</span>
                            <div className="bg-[#FEE2E2] text-[#A31D1D] font-bold px-3 py-1 rounded-full text-xs flex items-center">
                                <SyncOutlined spin className="mr-1.5" /> ĐANG THỰC HIỆN
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-snug pr-10">
                            Phân tích & thiết kế hệ thống quản lý NCKH sinh viên Học viện Kỹ thuật Mật mã
                        </h2>

                        <div className="flex gap-8 text-sm text-red-800 mb-12 font-medium">
                            <span className="flex items-center gap-2"><UserOutlined className="text-[#A31D1D]" /> GVHD: TS. Lê Văn A</span>
                            <span className="flex items-center gap-2"><CalendarOutlined className="text-[#A31D1D]" /> Bắt đầu: 15/01/2024</span>
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-12">
                                <span className="text-sm font-bold text-gray-800">Tiến độ thực hiện</span>
                                <span className="text-[#A31D1D] font-black text-lg">65%</span>
                            </div>
                            <div className="relative flex items-center justify-between w-full mt-2">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[65%] h-1 bg-[#A31D1D] z-0"></div>
                                <div className="z-10 flex flex-col items-center">
                                    <div className="w-6 h-6 bg-[#A31D1D] rounded flex items-center justify-center mb-2 shadow-sm"><CheckOutlined className="text-white text-xs font-bold" /></div>
                                    <span className="text-[10px] font-semibold text-gray-600">Đăng ký</span>
                                </div>
                                <div className="z-10 flex flex-col items-center">
                                    <div className="w-6 h-6 bg-[#A31D1D] rounded flex items-center justify-center mb-2 shadow-sm"><CheckOutlined className="text-white text-xs font-bold" /></div>
                                    <span className="text-[10px] font-semibold text-gray-600">Duyệt đề cương</span>
                                </div>
                                <div className="z-10 flex flex-col items-center">
                                    <div className="w-6 h-6 bg-white border-2 border-[#A31D1D] rounded flex items-center justify-center mb-2 shadow-sm"><SyncOutlined className="text-[#A31D1D] text-[10px] font-bold" /></div>
                                    <span className="text-[10px] font-bold text-[#A31D1D]">Báo cáo giữa kỳ</span>
                                </div>
                                <div className="z-10 flex flex-col items-center">
                                    <div className="w-6 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center mb-2"><LockOutlined className="text-gray-400 text-[10px]" /></div>
                                    <span className="text-[10px] font-medium text-gray-400">Nghiệm thu</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    {/* Card Form */}
                    <Card className="rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-50 p-2.5 rounded text-[#A31D1D]"><FileTextOutlined className="text-xl" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Nộp báo cáo tiến độ 50%</h3>
                                    <p className="text-xs text-gray-500">Yêu cầu hoàn thành các nội dung theo đề cương đã duyệt</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 text-gray-700 font-bold px-3 py-1.5 rounded text-xs">
                                Hạn: 15/05/2024
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2">Tóm tắt nội dung báo cáo</label>
                                <TextArea rows={4} placeholder="Nhập tóm tắt công việc đã thực hiện..." className="rounded-md" />
                            </div>

                            <Dragger className="bg-gray-50/50 border-dashed border border-gray-300 rounded-lg p-4">
                                <p className="ant-upload-drag-icon text-[#A31D1D] mb-2"><InboxOutlined className="text-3xl" /></p>
                                <p className="font-bold text-gray-800 text-sm">Kéo thả tệp hoặc click để chọn</p>
                                <p className="text-[10px] text-gray-500 mt-1">Hỗ trợ PDF, ZIP, RAR (Tối đa 25MB)</p>
                            </Dragger>

                            {/* Tệp đính kèm viền đỏ nhạt */}
                            <div className="flex items-center justify-between bg-white border border-red-200 px-4 py-2 rounded-md mt-2">
                                <div className="flex items-center gap-2 text-[#A31D1D] font-semibold text-sm">
                                    <FileTextOutlined /> bao_cao_50_final.pdf
                                </div>
                                <CloseOutlined className="text-[#A31D1D] hover:text-red-700 cursor-pointer text-xs" />
                            </div>

                            <Divider className="my-4" />

                            <div className="flex justify-between items-center">
                                {/* Nút màu kem vàng */}
                                <Button className="bg-[#F6F4EB] text-[#7A6A42] border-[#E8E1CD] font-bold text-xs h-9 flex items-center gap-1 rounded">
                                    <RobotOutlined /> AI Tóm tắt báo cáo
                                </Button>
                                <div className="flex gap-3">
                                    <Button className="font-bold text-gray-600 border-gray-300 rounded h-9">Lưu bản nháp</Button>
                                    <Button className="bg-[#A31D1D] text-white font-bold rounded h-9 px-8 border-none shadow-md">NỘP BÀI</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* CỘT PHẢI */}
                <div className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-bold text-gray-400 mb-1 tracking-wider">ĐIỂM GVHD</span>
                            <span className="text-2xl font-black text-[#A31D1D]">8.5</span>
                        </div>
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-bold text-[#A31D1D] mb-1 tracking-wider">THỜI HẠN CÒN</span>
                            <span className="text-2xl font-black text-[#A31D1D]">5 ngày</span>
                        </div>
                        <div className="col-span-2 bg-[#F6F4EB] p-4 rounded-xl border border-[#E8E1CD] flex justify-between items-center">
                            <div>
                                <span className="text-[10px] font-bold text-gray-500 mb-1 tracking-wider block">THÀNH TÍCH HIỆN TẠI</span>
                                <span className="text-sm font-bold text-[#6B5A30]">Top 5% sinh viên tiêu biểu</span>
                            </div>
                            <TrophyOutlined className="text-xl text-[#A3863C]" />
                        </div>
                    </div>

                    <Card className="rounded-xl border border-[#A31D1D] shadow-sm">
                        <div className="flex items-center gap-2 mb-3 text-[#A31D1D] font-bold text-xs tracking-wider uppercase">
                            <MessageOutlined /> Nhận xét mới nhất
                        </div>
                        <p className="text-sm text-gray-600 italic leading-relaxed mb-4">
                            "Nhóm làm biểu đồ Use Case khá tốt, tuy nhiên cần xem lại luồng đăng nhập. Nhớ nộp báo cáo đúng hạn nhé."
                        </p>
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-gray-400 font-bold">10/05/2024</span>
                            <span className="text-[#A31D1D] font-bold cursor-pointer hover:underline">Phản hồi ↵</span>
                        </div>
                    </Card>

                    <Card className="rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-5">Thời hạn sắp tới</h3>

                        <div className="space-y-4">
                            <div className="flex gap-3 items-center">
                                <div className="bg-red-50 p-2.5 rounded text-[#A31D1D]"><FileTextOutlined /></div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Báo cáo sơ đồ UML</h4>
                                    <p className="text-[10px] text-[#A31D1D] font-bold mt-0.5">Hết hạn trong 5 ngày</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-center">
                                <div className="bg-gray-100 p-2.5 rounded text-gray-500"><FormOutlined /></div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Phiếu khảo sát người dùng</h4>
                                    <p className="text-[10px] text-gray-500 font-medium mt-0.5">Hết hạn trong 14 ngày</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-center">
                                <div className="bg-gray-100 p-2.5 rounded text-gray-500"><FileTextOutlined /></div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Bản mô tả thuật toán</h4>
                                    <p className="text-[10px] text-gray-500 font-medium mt-0.5">Hết hạn trong 22 ngày</p>
                                </div>
                            </div>
                        </div>
                        <Divider className="my-4" />
                        <Button className="w-full text-[#A31D1D] font-bold text-xs border border-[#A31D1D] hover:bg-red-50 rounded">
                            Xem tất cả lịch hẹn
                        </Button>
                    </Card>
                </div>
            </div>
        </div >
    );
}