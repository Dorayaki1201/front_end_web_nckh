'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Progress, Timeline, Tag, Upload, Modal, Input, message, Skeleton } from 'antd';
import {
    FolderOpenOutlined,
    UserOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    UploadOutlined,
    CheckCircleOutlined,
    MessageOutlined,
    TeamOutlined,
    SendOutlined,
    FileTextOutlined
} from '@ant-design/icons';

// 1. Định nghĩa khuôn mẫu dữ liệu Đề tài Sinh viên
interface StudentProject {
    code: string;
    title: string;
    field: string;
    status: string;
    progress: number;
    startDate: string;
    endDate: string;
    instructor: {
        name: string;
        title: string;
        email: string;
    };
    teamMembers: {
        name: string;
        role: string;
        avatar: string;
    }[];
}

export default function StudentProjectsPage() {
    const [project, setProject] = useState<StudentProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // 2. Giả lập gọi API lấy đề tài hiện tại của sinh viên
    useEffect(() => {
        setTimeout(() => {
            setProject({
                code: 'DT-2026-0412',
                title: 'Phân tích và thiết kế hệ thống quản lý nghiên cứu khoa học tại Học viện Kỹ thuật Mật mã',
                field: 'Phát triển phần mềm / Hệ thống thông tin',
                status: 'ĐÚNG TIẾN ĐỘ',
                progress: 65,
                startDate: '15/01/2026',
                endDate: '15/06/2026',
                instructor: {
                    name: 'Lê Văn A',
                    title: 'TS.',
                    email: 'levana@actvn.edu.vn'
                },
                teamMembers: [
                    { name: 'Nguyễn Văn Nam', role: 'Trưởng nhóm', avatar: 'https://i.pravatar.cc/150?img=11' },
                    { name: 'Lê Anh Tuấn', role: 'Thành viên', avatar: 'https://i.pravatar.cc/150?img=12' },
                    { name: 'Trần Thị Bích', role: 'Thành viên', avatar: 'https://i.pravatar.cc/150?img=5' }
                ]
            });
            setLoading(false);
        }, 600);
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const onFinishSubmit = () => {
        setSubmitLoading(true);
        setTimeout(() => {
            setSubmitLoading(false);
            setIsModalOpen(false);
            messageApi.success('Đã nộp báo cáo tiến độ thành công!');
        }, 1000);
    };

    if (loading || !project) {
        return <div className="p-10"><Skeleton active paragraph={{ rows: 10 }} /></div>;
    }

    return (
        <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-6">
            {contextHolder}

            {/* ================= HEADER ĐỀ TÀI ================= */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider">{project.code}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs font-semibold text-gray-500">{project.field}</span>
                        <Tag color="green" className="font-bold text-[10px] uppercase border-none px-2.5 py-0.5 rounded-full tracking-wider bg-green-50 text-green-600">
                            {project.status}
                        </Tag>
                    </div>
                    <h1 className="text-2xl font-black text-gray-800 leading-snug max-w-4xl">
                        {project.title}
                    </h1>
                </div>
                <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    onClick={handleOpenModal}
                    className="bg-[#A31D1D] hover:bg-red-800 border-none h-11 px-6 font-bold rounded-lg shadow-sm shrink-0 w-full md:w-auto"
                >
                    Nộp báo cáo tiến độ
                </Button>
            </div>

            {/* ================= BỐ CỤC CHÍNH ĐỒ HỌA ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* CỘT TRÁI: TIẾN ĐỘ & LỘ TRÌNH (Chiếm 2/3) */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Khối Tiến độ tổng quát */}
                    <Card className="rounded-xl border border-gray-200 shadow-sm" styles={{ body: { padding: '24px' } }}>
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-6 flex items-center gap-2">
                            <FolderOpenOutlined className="text-[#A31D1D]" /> Tiến độ tổng quát đề tài
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center gap-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                            <Progress
                                type="circle"
                                percent={project.progress}
                                strokeColor="#A31D1D"
                                trailColor="#f0f0f0"
                                strokeWidth={8}
                                width={120}
                                className="font-black"
                            />
                            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                                <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Ngày bắt đầu</div>
                                    <div className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                                        <CalendarOutlined className="text-gray-400" /> {project.startDate}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Hạn nghiệm thu</div>
                                    <div className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                                        <ClockCircleOutlined className="text-gray-400" /> {project.endDate}
                                    </div>
                                </div>
                                <div className="col-span-2 border-t border-gray-200/60 pt-3 mt-1">
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        * Đề tài đang thực hiện đúng lộ trình. Cần hoàn thành giai đoạn thử nghiệm hệ thống trước ngày báo cáo giữa kỳ kế tiếp.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Khối Nhật ký nhiệm vụ & Lịch trình */}
                    <Card className="rounded-xl border border-gray-200 shadow-sm" styles={{ body: { padding: '24px' } }}>
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-6 flex items-center gap-2">
                            <CheckCircleOutlined className="text-[#A31D1D]" /> Các mốc lộ trình nghiên cứu
                        </h2>

                        <Timeline
                            className="mt-4 custom-timeline-red pl-2"
                            items={[
                                {
                                    color: 'green',
                                    children: (
                                        <div className="pb-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <strong className="font-bold text-gray-800 text-sm">Khởi động & Xây dựng Đề cương</strong>
                                                <Tag color="success" className="border-none font-bold text-[9px] rounded px-1.5 py-0.2 bg-green-50 text-green-600">ĐÃ XONG</Tag>
                                            </div>
                                            <p className="text-xs text-gray-500">Hoàn thiện khảo sát hiện trạng quản lý NCKH, bảo vệ thành công đề cương chi tiết trước hội đồng.</p>
                                            <span className="text-[10px] font-semibold text-gray-400 block mt-1">Hoàn thành: 20/02/2026</span>
                                        </div>
                                    ),
                                },
                                {
                                    color: 'red',
                                    children: (
                                        <div className="pb-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <strong className="font-bold text-gray-800 text-sm">Phân tích yêu cầu & Thiết kế sơ đồ Use Case</strong>
                                                <Tag color="processing" className="border-none font-bold text-[9px] rounded px-1.5 py-0.2 bg-blue-50 text-blue-600">ĐANG LÀM</Tag>
                                            </div>
                                            <p className="text-xs text-gray-500">Thiết kế sơ đồ chức năng hệ thống, viết đặc tả các tác nhân Sinh viên, Giảng viên hướng dẫn và Cán bộ quản lý.</p>
                                            <span className="text-[10px] font-semibold text-red-500 block mt-1">Hạn chót: 15/05/2026 (Còn 5 ngày)</span>
                                        </div>
                                    ),
                                },
                                {
                                    color: 'gray',
                                    children: (
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <strong className="font-bold text-gray-400 text-sm">Hiện thực hóa giao diện mẫu & Viết báo cáo tổng kết</strong>
                                            </div>
                                            <p className="text-xs text-gray-400">Xây dựng ứng dụng hoàn chỉnh, chạy thử nghiệm trên cơ sở dữ liệu giả lập và đóng quyển báo cáo đồ án gửi thầy.</p>
                                            <span className="text-[10px] font-medium text-gray-400 block mt-1">Dự kiến: Trước 05/06/2026</span>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </Card>

                </div>

                {/* CỘT PHẢI: GIẢNG VIÊN & THÀNH VIÊN NHÓM (Chiếm 1/3) */}
                <div className="lg:col-span-1 flex flex-col gap-6">

                    {/* Box Giảng viên hướng dẫn */}
                    <Card className="rounded-xl border border-gray-200 shadow-sm" styles={{ body: { padding: '20px' } }}>
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Giảng viên hướng dẫn</h3>
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#A31D1D] text-xl font-bold">
                                {project.instructor.title}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{project.instructor.title} {project.instructor.name}</h4>
                                <p className="text-xs text-gray-500">{project.instructor.email}</p>
                            </div>
                        </div>
                        <Button
                            icon={<MessageOutlined />}
                            className="w-full text-xs font-bold text-[#A31D1D] border-[#A31D1D] hover:bg-red-50 h-9 rounded-lg"
                        >
                            Gửi tin nhắn trao đổi
                        </Button>
                    </Card>

                    {/* Box Thành viên nhóm nghiên cứu */}
                    <Card className="rounded-xl border border-gray-200 shadow-sm" styles={{ body: { padding: '20px' } }}>
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Thành viên nhóm ({project.teamMembers.length})</h3>
                        <div className="flex flex-col gap-3.5">
                            {project.teamMembers.map((member, idx) => (
                                <div key={idx} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-none last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-xl object-cover border border-gray-100" />
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm leading-tight">{member.name}</h4>
                                            <span className="text-[10px] font-medium text-gray-400">ACTVN Student</span>
                                        </div>
                                    </div>
                                    <Tag className={`border-none font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded ${member.role === 'Trưởng nhóm' ? 'bg-red-50 text-[#A31D1D]' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {member.role}
                                    </Tag>
                                </div>
                            ))}
                        </div>
                    </Card>

                </div>
            </div>

            {/* ================= MODAL NỘP BÁO CÁO ================= */}
            <Modal
                title={
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4 text-gray-800">
                        <FileTextOutlined className="text-[#A31D1D]" />
                        <span className="font-bold text-lg">Nộp báo cáo tiến độ định kỳ</span>
                    </div>
                }
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="cancel" className="rounded-lg font-semibold px-5" onClick={handleCloseModal}>
                        Hủy bỏ
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        icon={<SendOutlined />}
                        loading={submitLoading}
                        onClick={onFinishSubmit}
                        className="bg-[#A31D1D] border-none rounded-lg font-bold px-6 shadow-sm hover:opacity-90"
                    >
                        Nộp báo cáo
                    </Button>
                ]}
                width={550}
                className="custom-modal-layout"
            >
                <div className="flex flex-col gap-4 py-2">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Tiêu đề đợt báo cáo</label>
                        <Input size="large" placeholder="Ví dụ: Báo cáo tiến độ tuần 8 - Thiết kế sơ đồ chức năng" className="rounded-lg bg-gray-50 font-medium" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Nội dung tóm tắt / Ghi chú</label>
                        <Input.TextArea rows={4} placeholder="Tóm tắt ngắn gọn các công việc nhóm đã hoàn thành và khó khăn gặp phải nếu có..." className="rounded-lg bg-gray-50 font-medium" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Tệp đính kèm tài liệu (.pdf, .docx, .zip)</label>
                        <Upload.Dragger maxCount={1} accept=".pdf,.docx,.doc,.zip,.rar" className="bg-gray-50 hover:border-[#A31D1D] transition-colors rounded-xl py-6">
                            <p className="ant-upload-drag-icon text-3xl text-[#A31D1D]/70 mb-2">
                                <UploadOutlined />
                            </p>
                            <p className="text-sm font-bold text-gray-700">Kéo thả tệp tin hoặc nhấn vào đây để tải lên</p>
                            <p className="text-[11px] text-gray-400 mt-1">Hỗ trợ định dạng PDF, Word hoặc file nén dung lượng tối đa 25MB</p>
                        </Upload.Dragger>
                    </div>
                </div>
            </Modal>

        </div>
    );
}