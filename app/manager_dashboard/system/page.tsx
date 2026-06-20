'use client';

import React from 'react';
import { Button, Select, Table, Pagination, Avatar } from 'antd';
import {
    UserAddOutlined,
    SafetyOutlined,
    BookOutlined,
    TeamOutlined,
    LockOutlined,
    IdcardOutlined,
    ControlOutlined,
    FilterOutlined,
    EditOutlined,
    UnlockOutlined
} from '@ant-design/icons';

export default function UserRoleManagementPage() {

    // ================= MOCK DATA =================
    const tableData = [
        {
            key: '1',
            name: 'Nguyễn Văn Hùng',
            email: 'hung.nv@actvn.edu.vn',
            userId: 'USR-2024-001',
            role: 'Admin',
            status: 'HOẠT ĐỘNG',
        },
        {
            key: '2',
            name: 'Trần Thị Lan',
            email: 'lan.tt@actvn.edu.vn',
            userId: 'USR-2024-042',
            role: 'Giảng viên',
            status: 'HOẠT ĐỘNG',
        },
        {
            key: '3',
            name: 'Đỗ Duy Anh',
            email: 'anh.dd@actvn.edu.vn',
            userId: 'USR-2023-912',
            role: 'Sinh viên',
            status: 'ĐÃ KHÓA',
        },
        {
            key: '4',
            name: 'Lê Hoàng Anh',
            email: 'anh.lh@actvn.edu.vn',
            userId: 'USR-2024-112',
            role: 'Giảng viên',
            status: 'HOẠT ĐỘNG',
        },
        {
            key: '5',
            name: 'Phạm Minh Tuấn',
            email: 'tuan.pm@actvn.edu.vn',
            userId: 'USR-2024-585',
            role: 'Admin',
            status: 'HOẠT ĐỘNG',
        },
        {
            key: '6',
            name: 'Hoàng Thùy Linh',
            email: 'linh.ht@actvn.edu.vn',
            userId: 'USR-2023-088',
            role: 'Sinh viên',
            status: 'ĐÃ KHÓA',
        },
    ];

    const columns = [
        {
            title: 'HỌ VÀ TÊN',
            key: 'name',
            width: '30%',
            render: (record: any) => {
                // Lấy 2 chữ cái đầu làm Avatar (VD: Đỗ Duy Anh -> DA)
                const initials = record.name.split(' ').map((n: string) => n[0]).slice(-2).join('').toUpperCase();

                return (
                    <div className="flex items-center gap-3">
                        <Avatar size="large" className="bg-gray-100 text-gray-600 font-bold border border-gray-200">
                            {initials}
                        </Avatar>
                        <div>
                            <div className="font-bold text-gray-800 text-sm">{record.name}</div>
                            <div className="text-[11px] text-gray-400">{record.email}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'MÃ NGƯỜI DÙNG',
            dataIndex: 'userId',
            key: 'userId',
            render: (text: string) => <span className="text-gray-500 font-mono text-xs">{text}</span>,
        },
        {
            title: 'VAI TRÒ',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => {
                let bgColor = 'bg-gray-100';
                let textColor = 'text-gray-600';

                if (role === 'Admin') {
                    bgColor = 'bg-red-50';
                    textColor = 'text-red-500';
                } else if (role === 'Sinh viên') {
                    bgColor = 'bg-[#FFFBE6]';
                    textColor = 'text-[#D48806]';
                }

                return (
                    <span className={`font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${bgColor} ${textColor}`}>
                        {role}
                    </span>
                );
            },
        },
        {
            title: 'TRẠNG THÁI',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const isActive = status === 'HOẠT ĐỘNG';
                return (
                    <div className="flex items-center gap-2">
                        {isActive ? (
                            <>
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">{status}</span>
                            </>
                        ) : (
                            <>
                                <LockOutlined className="text-red-500" />
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{status}</span>
                            </>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'HÀNH ĐỘNG',
            key: 'action',
            align: 'right' as const,
            render: (record: any) => {
                const isLocked = record.status === 'ĐÃ KHÓA';
                return (
                    <div className="flex items-center justify-end gap-4 text-lg pr-4">
                        <EditOutlined className="text-gray-500 cursor-pointer hover:text-[#A31D1D] transition-colors" />
                        {isLocked ? (
                            <LockOutlined className="text-red-500 cursor-pointer hover:opacity-70 transition-opacity" title="Mở khóa" />
                        ) : (
                            <UnlockOutlined className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors" title="Khóa tài khoản" />
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-6">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Phân quyền người dùng</h1>
                    <p className="text-gray-500 text-sm">
                        Quản lý vai trò, trạng thái bảo mật và quyền truy cập hệ thống ACTVN.
                    </p>
                </div>
                <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    className="font-bold bg-[#A31D1D] border-none h-10 px-5 rounded-lg shadow-sm hover:opacity-90"
                >
                    Thêm người dùng mới
                </Button>
            </div>

            {/* ================= STATS CARDS (4 Cột) ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Card 1: Admin */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="bg-red-50 p-4 rounded-xl text-[#A31D1D] text-2xl">
                        <SafetyOutlined />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tổng quản trị viên</div>
                        <div className="text-2xl font-black text-gray-900 leading-none">12</div>
                    </div>
                </div>

                {/* Card 2: Giảng viên */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="bg-[#FFFBE6] p-4 rounded-xl text-[#D48806] text-2xl">
                        <BookOutlined />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Giảng viên hoạt động</div>
                        <div className="text-2xl font-black text-gray-900 leading-none">45</div>
                    </div>
                </div>

                {/* Card 3: Sinh viên */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="bg-red-50 p-4 rounded-xl text-red-400 text-2xl">
                        <TeamOutlined />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Sinh viên đã xác thực</div>
                        <div className="text-2xl font-black text-gray-900 leading-none">628</div>
                    </div>
                </div>

                {/* Card 4: Bị khóa */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="bg-red-50 p-4 rounded-xl text-red-500 text-2xl">
                        <LockOutlined />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tài khoản bị khóa</div>
                        <div className="text-2xl font-black text-[#A31D1D] leading-none">03</div>
                    </div>
                </div>

            </div>

            {/* ================= FILTERS ================= */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
                {/* Filter 1 */}
                <div className="bg-white border border-gray-200 rounded-lg h-10 flex items-center px-3 gap-2 shadow-sm cursor-pointer hover:border-[#A31D1D] transition-colors">
                    <IdcardOutlined className="text-[#A31D1D]" />
                    <Select
                        defaultValue="all"
                        bordered={false}
                        className="w-36 font-medium text-gray-700"
                    >
                        <Select.Option value="all">Tất cả vai trò</Select.Option>
                        <Select.Option value="admin">Quản trị viên</Select.Option>
                        <Select.Option value="teacher">Giảng viên</Select.Option>
                        <Select.Option value="student">Sinh viên</Select.Option>
                    </Select>
                </div>

                {/* Filter 2 */}
                <div className="bg-white border border-gray-200 rounded-lg h-10 flex items-center px-3 gap-2 shadow-sm cursor-pointer hover:border-[#A31D1D] transition-colors">
                    <ControlOutlined className="text-[#A31D1D]" />
                    <Select
                        defaultValue="all_status"
                        bordered={false}
                        className="w-40 font-medium text-gray-700"
                    >
                        <Select.Option value="all_status">Trạng thái: Tất cả</Select.Option>
                        <Select.Option value="active">Hoạt động</Select.Option>
                        <Select.Option value="locked">Đã khóa</Select.Option>
                    </Select>
                </div>

                {/* Filter Button */}
                <Button
                    icon={<FilterOutlined />}
                    className="h-10 w-10 flex items-center justify-center rounded-lg border-gray-200 text-gray-500 shadow-sm hover:text-[#A31D1D] hover:border-[#A31D1D]"
                />
            </div>

            {/* ================= DATA TABLE ================= */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col mt-2">

                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    className="custom-table-header"
                    rowClassName="hover:bg-gray-50/50 transition-colors"
                />

                {/* Custom Pagination Footer */}
                <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
                    <div className="text-xs font-medium text-gray-500">
                        Hiển thị 1-10 trong số 128 người dùng
                    </div>

                    <Pagination
                        defaultCurrent={1}
                        total={128}
                        pageSize={10}
                        showSizeChanger={false}
                        className="custom-red-pagination"
                    />
                </div>

            </div>

        </div>
    );
}