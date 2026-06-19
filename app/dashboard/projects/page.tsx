'use client';

import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Input, Select, Space, Tooltip, Skeleton } from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EyeOutlined,
    EditOutlined,
    FilterOutlined,
    DeleteOutlined
} from '@ant-design/icons';

const { Search } = Input;

// 1. Định nghĩa cấu trúc dữ liệu cho Bảng
interface ProjectItem {
    id: string;
    name: string;
    leader: string;
    instructor: string;
    status: 'Chờ duyệt' | 'Đang thực hiện' | 'Đã hoàn thành' | 'Đã hủy';
    registeredDate: string;
}

export default function ProjectsManagementPage() {
    const [data, setData] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);

    // 2. Giả lập gọi API lấy danh sách đề tài
    useEffect(() => {
        const fetchProjects = () => {
            setTimeout(() => {
                setData([
                    {
                        id: 'DT24-001',
                        name: 'Phân tích và thiết kế hệ thống quản lý NCKH sinh viên',
                        leader: 'Nguyễn Văn Nam',
                        instructor: 'TS. Lê Văn A',
                        status: 'Đang thực hiện',
                        registeredDate: '15/01/2024',
                    },
                    {
                        id: 'DT24-002',
                        name: 'Ứng dụng AI trong chẩn đoán và phát hiện mã độc',
                        leader: 'Trần Thị Bích',
                        instructor: 'PGS.TS Phạm Văn C',
                        status: 'Chờ duyệt',
                        registeredDate: '10/05/2024',
                    },
                    {
                        id: 'DT24-003',
                        name: 'Nghiên cứu giao thức mã hóa lượng tử ứng dụng cho IoT',
                        leader: 'Lê Hoàng Hải',
                        instructor: 'TS. Nguyễn Thị D',
                        status: 'Đã hoàn thành',
                        registeredDate: '02/11/2023',
                    },
                ]);
                setLoading(false);
            }, 800);
        };

        fetchProjects();
    }, []);

    // 3. Định nghĩa các cột cho Ant Design Table
    const columns = [
        {
            title: 'Mã ĐT',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: (text: string) => <span className="font-bold text-gray-600">{text}</span>,
        },
        {
            title: 'Tên đề tài',
            dataIndex: 'name',
            key: 'name',
            width: '35%',
            render: (text: string) => (
                <a className="text-[#A31D1D] font-bold hover:underline line-clamp-2">
                    {text}
                </a>
            ),
        },
        {
            title: 'Chủ nhiệm',
            dataIndex: 'leader',
            key: 'leader',
            width: '15%',
        },
        {
            title: 'GV Hướng dẫn',
            dataIndex: 'instructor',
            key: 'instructor',
            width: '15%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (status: string) => {
                let color = 'default';
                if (status === 'Đang thực hiện') color = 'processing';
                if (status === 'Chờ duyệt') color = 'warning';
                if (status === 'Đã hoàn thành') color = 'success';
                if (status === 'Đã hủy') color = 'error';

                return <Tag color={color} className="font-bold">{status}</Tag>;
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '10%',
            render: (_: any, record: ProjectItem) => (
                <Space size="middle">
                    <Tooltip title="Xem chi tiết">
                        <Button type="text" icon={<EyeOutlined className="text-blue-600 text-lg" />} className="flex items-center justify-center" />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Button type="text" icon={<EditOutlined className="text-amber-500 text-lg" />} className="flex items-center justify-center" />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button type="text" danger icon={<DeleteOutlined className="text-lg" />} className="flex items-center justify-center" />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="max-w-[1400px] mx-auto">

            {/* Tiêu đề trang */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Quản lý Đề tài Nghiên cứu</h1>
                    <p className="text-gray-500 text-sm">Xem và quản lý danh sách các đề tài NCKH của sinh viên.</p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="bg-[#A31D1D] font-bold h-10 px-6 shadow-md rounded-md"
                >
                    Đăng ký đề tài mới
                </Button>
            </div>

            {/* Khung chứa Bảng dữ liệu */}
            <Card
                className="rounded-xl border border-gray-200 shadow-sm"
                styles={{ body: { padding: '24px' } }}
            >

                {/* Khu vực Bộ lọc và Tìm kiếm */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <Space size="middle" className="w-full md:w-auto">
                        <Select
                            defaultValue="all"
                            style={{ width: 180 }}
                            options={[
                                { value: 'all', label: 'Tất cả trạng thái' },
                                { value: 'waiting', label: 'Chờ duyệt' },
                                { value: 'processing', label: 'Đang thực hiện' },
                                { value: 'done', label: 'Đã hoàn thành' },
                            ]}
                            suffixIcon={<FilterOutlined />}
                            size="large"
                        />
                        <Select
                            defaultValue="2024"
                            style={{ width: 120 }}
                            options={[
                                { value: '2024', label: 'Năm 2024' },
                                { value: '2023', label: 'Năm 2023' },
                            ]}
                            size="large"
                        />
                    </Space>

                    <Search
                        placeholder="Tìm kiếm theo mã, tên đề tài..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        className="w-full md:max-w-md"
                    />
                </div>

                {/* Bảng Dữ liệu */}
                {loading ? (
                    <Skeleton active paragraph={{ rows: 8 }} />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        pagination={{
                            pageSize: 5,
                            showTotal: (total) => `Tổng cộng ${total} đề tài`,
                        }}
                        className="overflow-x-auto"
                        rowClassName="hover:bg-gray-50 transition-colors"
                    />
                )}

            </Card>
        </div>
    );
}