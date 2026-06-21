'use client';

import React, { useState, useEffect } from 'react';
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
import { sendRequest } from '@/utils/api';
import { Button, Avatar, Table, Tag, Modal, Input, message } from 'antd';


const { TextArea } = Input;

export default function GuidedGroupsPage() {
    const [loading, setLoading] = useState(true);
    const [teacherInfo, setTeacherInfo] = useState<any>(null);
    const [projectList, setProjectList] = useState<any[]>([]);
    const [tienDoList, setTienDoList] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTienDo, setSelectedTienDo] = useState<string | null>(null);
    const [nhanXet, setNhanXet] = useState('');
    const [diemGVHD, setDiemGVHD] = useState<number | ''>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const [meRes, deTaiRes, tienDoRes] = await Promise.all([
                    sendRequest<any>({ url: 'http://localhost:8000/api/me/', method: 'GET' }),
                    sendRequest<any>({ url: 'http://localhost:8000/api/de-tai/', method: 'GET' }),
                    sendRequest<any>({ url: 'http://localhost:8000/api/tien-do/', method: 'GET' })
                ]);
                setTeacherInfo(meRes);
                setProjectList(deTaiRes.results || []);
                setTienDoList(tienDoRes.results || []);
            } catch (error) {
                console.error("Lỗi tải dữ liệu giảng viên:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherData();
    }, [refreshKey]);

    const openFeedbackModal = (maDeTai: string) => {
        const tienDo = tienDoList.find((td: any) => td.MaDeTai === maDeTai);
        if (!tienDo) {
            messageApi.warning('Nhóm này chưa nộp báo cáo tiến độ nào!');
            return;
        }
        setSelectedTienDo(tienDo.MaTienDo);
        setNhanXet(tienDo.NhanXetGVHD || '');
        setDiemGVHD(tienDo.DiemGVHD || '');
        setIsModalVisible(true);
    };
    const handleFeedbackSubmit = async () => {
        if (!nhanXet.trim()) {
            return messageApi.error('Thầy/Cô vui lòng nhập nhận xét cho sinh viên!');
        }
        setIsSubmitting(true);
        try {
            await sendRequest({
                url: `http://localhost:8000/api/tien-do/${selectedTienDo}/nhan-xet/`,
                method: 'PATCH',
                body: {
                    NhanXetGVHD: nhanXet,
                    DiemGVHD: diemGVHD === '' ? null : diemGVHD
                }
            });
            messageApi.success('Đã gửi nhận xét và điểm thành công!');
            setIsModalVisible(false);

            // Xoay chìa khóa để useEffect tự động kéo lại data mới nhất
            setRefreshKey(prev => prev + 1);
        } catch (error: any) {
            messageApi.error(error.message || 'Lỗi khi gửi nhận xét!');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tableData = projectList.map((item) => {
        const tienDoCuaNhom = tienDoList.find((td: any) => td.MaDeTai === item.MaDeTai);
        const percent = tienDoCuaNhom ? tienDoCuaNhom.TyLeHoanThanh : 0;
        return {
            key: item.MaDeTai,
            topic: item.TenDeTai,
            code: item.MaDeTai,
            class: 'ACTVN',
            memberCount: 1,
            leader: item.chu_nhiem,
            progress: percent,
            status: item.TrangThai_display.toUpperCase(),
            statusColor: item.TrangThai === 'DANGTHUCHIEN'
                ? 'bg-blue-50 text-blue-600'
                : item.TrangThai === 'DA_NGHIEM_THU'
                    ? 'bg-[#F6FFED] text-[#389E0D]'
                    : 'bg-gray-100 text-gray-600',
        };
    });
    const totalGroups = projectList.length;
    const goodProgressCount = projectList.filter(p => {
        const td = tienDoList.find(t => t.MaDeTai === p.MaDeTai);
        return td && td.TyLeHoanThanh >= 50;
    }).length;
    const warningCount = totalGroups - goodProgressCount;
    const pendingReportsCount = tienDoList.filter(td => !td.NhanXetGVHD).length;


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
            render: (_: any, record: any) => (
                <div className="flex items-center justify-center gap-3 text-gray-500 text-lg">
                    <EyeOutlined className="cursor-pointer hover:text-[#A31D1D] transition-colors" />
                    <EditOutlined
                        className="cursor-pointer hover:text-[#A31D1D] transition-colors"
                        onClick={() => openFeedbackModal(record.code)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Nhóm hướng dẫn</h1>
                    <p className="text-gray-500 text-sm">Chào {teacherInfo?.TenHienThi || 'Thầy/Cô'}, bạn đang quản lý {projectList.length < 10 ? `0${projectList.length}` : projectList.length} nhóm nghiên cứu trong kỳ này.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FFF5F5] p-5 rounded-xl border border-red-100 flex flex-col justify-between h-[120px]">
                    <div className="flex justify-between items-start">
                        <div className="bg-white text-[#A31D1D] p-2 rounded-lg shadow-sm">
                            <TeamOutlined className="text-lg" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tổng số</span>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-gray-900 leading-none mb-1">
                            {String(totalGroups).padStart(2, '0')}`
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Nhóm hướng dẫn</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col justify-between h-[120px] shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                            <CheckCircleOutlined className="text-lg" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tiến độ</span>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-green-600 leading-none mb-1">
                            {String(goodProgressCount).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Đúng kế hoạch</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col justify-between h-[120px] shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="bg-red-50 text-red-500 p-2 rounded-lg">
                            <WarningOutlined className="text-lg" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Cảnh báo</span>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-red-500 leading-none mb-1">
                            {String(warningCount).padStart(2, '0')}
                        </div>
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
                        <div className="text-3xl font-black text-blue-600 leading-none mb-1">
                            {String(pendingReportsCount).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Chưa phê duyệt</div>
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projectList.slice(0, 2).map((project, index) => {
                    const tienDo = tienDoList.find((td: any) => td.MaDeTai === project.MaDeTai);
                    const percent = tienDo ? tienDo.TyLeHoanThanh : 0;
                    const isGood = percent >= 50;
                    return (
                        <div key={project.MaDeTai} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col hover:border-[#A31D1D]/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`${isGood ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'} font-bold text-[10px] px-3 py-1 rounded uppercase tracking-wider`}>
                                    {isGood ? 'Đúng tiến độ' : 'Cần tăng tốc'}
                                </span>
                                <MoreOutlined className="text-xl text-gray-400 cursor-pointer hover:text-[#A31D1D]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4 leading-snug line-clamp-2">
                                {project.TenDeTai}
                            </h3>
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar.Group size="large" maxCount={3} maxStyle={{ color: '#A31D1D', backgroundColor: '#FFF5F5' }}>
                                    <Avatar src={`https://i.pravatar.cc/150?img=${11 + index}`} />
                                </Avatar.Group>
                                <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase">Chủ nhiệm</div>
                                    <div className="text-sm font-bold text-gray-800">{project.chu_nhiem || 'Đang cập nhật'}</div>
                                </div>
                            </div>
                            <div className="mb-6 mt-auto">
                                <div className="flex justify-between items-end mb-2 text-xs font-bold">
                                    <span className="text-gray-500">Tiến độ tổng quát</span>
                                    <span className={`${isGood ? 'text-gray-800' : 'text-orange-500'}`}>{percent}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div className={`${isGood ? 'bg-[#A31D1D]' : 'bg-orange-500'} h-full rounded-full transition-all duration-700`} style={{ width: `${percent}%` }}></div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                                <span className="text-gray-500 flex items-center gap-1.5 font-medium line-clamp-1">
                                    <MessageOutlined /> Trạng thái: <strong className="text-gray-800 uppercase text-[10px]">{project.TrangThai_display}</strong>
                                </span>
                                <a
                                    onClick={(e) => { e.preventDefault(); openFeedbackModal(project.MaDeTai); }}
                                    className="text-[#A31D1D] font-bold flex items-center gap-1 hover:underline shrink-0 pl-2 cursor-pointer"
                                >
                                    Phản hồi <ArrowRightOutlined />
                                </a>
                            </div>
                        </div>
                    );
                })}
                {projectList.length === 0 && (
                    <div className="col-span-2 text-center py-10 text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-xl">
                        Thầy chưa được phân công hướng dẫn nhóm nào.
                    </div>
                )}
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
            {/* Lệnh này để cho phép hiện Popup Toast Success/Error */}
            {contextHolder}

            {/* HỘP THOẠI CHẤM TIẾN ĐỘ */}
            <Modal
                title={<span className="font-black text-lg text-gray-800">Đánh giá tiến độ sinh viên</span>}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Hủy bỏ
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={isSubmitting}
                        onClick={handleFeedbackSubmit}
                        className="bg-[#A31D1D] font-bold border-none"
                    >
                        Lưu nhận xét
                    </Button>
                ]}
            >
                <div className="py-4 flex flex-col gap-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide">
                            ĐIỂM ĐÁNH GIÁ (HỆ 10)
                        </label>
                        <Input
                            type="number"
                            min={0} max={10} step={0.5}
                            value={diemGVHD}
                            onChange={(e) => setDiemGVHD(e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Ví dụ: 8.5"
                            className="w-full rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide">
                            LỜI NHẬN XÉT CỦA GIẢNG VIÊN
                        </label>
                        <TextArea
                            rows={4}
                            value={nhanXet}
                            onChange={(e) => setNhanXet(e.target.value)}
                            placeholder="Góp ý, chỉnh sửa hoặc động viên nhóm..."
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </Modal>

        </div>

    );
}