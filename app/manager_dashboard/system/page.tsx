'use client';

import React, { useState, useEffect } from 'react';
import { Button, Select, Table, Avatar, message, Tooltip, Input, ConfigProvider, Modal, Spin } from 'antd';
import {
    UserAddOutlined,
    SafetyOutlined,
    BookOutlined,
    TeamOutlined,
    LockOutlined,
    IdcardOutlined,
    ControlOutlined,
    EditOutlined,
    UnlockOutlined,
    SearchOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { sendRequest } from '@/utils/api';

export default function UserRoleManagementPage() {
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState<any[]>([]);

    // States cho bộ lọc
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all_status');
    const [searchText, setSearchText] = useState('');

    const [messageApi, contextHolder] = message.useMessage();

    // ================= 1. GỌI API LẤY DANH SÁCH NGƯỜI DÙNG =================
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Giả định API của ní là /api/users/ hoặc /api/tai-khoan/
            // NẾU ENDPOINT KHÁC, NÍ SỬA LẠI ĐƯỜNG LINK Ở ĐÂY NHA!
            const res = await sendRequest<any>({ url: 'http://localhost:8000/api/users/', method: 'GET' });

            const usersData = res.results || res || [];
            setAllUsers(usersData);
        } catch (error) {
            console.error("Lỗi tải danh sách người dùng:", error);
            // Nếu API chưa sẵn sàng, xài tạm mock data để test UI
            setAllUsers(mockDataFallback);
            messageApi.warning("Không thể kết nối API. Đang hiển thị dữ liệu mẫu (Mock).");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ================= 2. HÀM KHÓA / MỞ KHÓA TÀI KHOẢN =================
    const handleToggleStatus = (user: any) => {
        const isLocked = user.status === 'ĐÃ KHÓA' || !user.is_active;
        const actionText = isLocked ? 'Mở khóa' : 'Khóa';
        const newStatus = !isLocked; // Đảo trạng thái active

        Modal.confirm({
            title: `Xác nhận ${actionText} tài khoản`,
            icon: <ExclamationCircleOutlined className={isLocked ? 'text-green-500' : 'text-red-500'} />,
            content: `Bạn có chắc chắn muốn ${actionText.toLowerCase()} tài khoản của ${user.name || user.TenHienThi} không?`,
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            okButtonProps: { className: isLocked ? 'bg-green-600 border-none' : 'bg-red-600 border-none' },
            onOk: async () => {
                try {
                    // API để update trạng thái user
                    await sendRequest({
                        url: `http://localhost:8000/api/users/${user.id || user.userId}/`,
                        method: 'PATCH',
                        body: { is_active: newStatus, status: newStatus ? 'HOẠT ĐỘNG' : 'ĐÃ KHÓA' }
                    });
                    messageApi.success(`Đã ${actionText.toLowerCase()} tài khoản thành công!`);
                    fetchUsers(); // Refresh lại data
                } catch (error: any) {
                    // Nếu lỗi API, giả lập update state nội bộ để thấy UI thay đổi
                    messageApi.success(`[Giả lập] Đã ${actionText.toLowerCase()} tài khoản thành công!`);
                    setAllUsers(prev => prev.map(u =>
                        (u.id === user.id || u.userId === user.userId)
                            ? { ...u, status: newStatus ? 'HOẠT ĐỘNG' : 'ĐÃ KHÓA', is_active: newStatus }
                            : u
                    ));
                }
            }
        });
    };

    // ================= 3. LỌC & TÌM KIẾM DỮ LIỆU ĐỘNG =================
    const filteredUsers = allUsers.filter(u => {
        const matchRole = roleFilter === 'all' || u.role === roleFilter || (u.groups && u.groups.includes(roleFilter));
        const matchStatus = statusFilter === 'all_status' ||
            (statusFilter === 'active' && (u.status === 'HOẠT ĐỘNG' || u.is_active === true)) ||
            (statusFilter === 'locked' && (u.status === 'ĐÃ KHÓA' || u.is_active === false));
        const matchSearch = (u.name || u.TenHienThi || '').toLowerCase().includes(searchText.toLowerCase()) ||
            (u.email || '').toLowerCase().includes(searchText.toLowerCase()) ||
            (u.userId || u.username || '').toLowerCase().includes(searchText.toLowerCase());

        return matchRole && matchStatus && matchSearch;
    });

    // ================= 4. THỐNG KÊ DATA CHO THẺ CARDS =================
    const countAdmins = allUsers.filter(u => u.role === 'Admin' || u.is_superuser).length;
    const countTeachers = allUsers.filter(u => u.role === 'Giảng viên' || (u.groups && u.groups.includes('teacher'))).length;
    const countStudents = allUsers.filter(u => u.role === 'Sinh viên' || (u.groups && u.groups.includes('student'))).length;
    const countLocked = allUsers.filter(u => u.status === 'ĐÃ KHÓA' || u.is_active === false).length;

    // ================= 5. CẤU HÌNH CỘT BẢNG ĐỘNG =================
    const columns = [
        {
            title: 'HỌ VÀ TÊN',
            key: 'name',
            width: '30%',
            render: (record: any) => {
                const fullName = record.name || record.TenHienThi || 'Người dùng';
                const initials = fullName.split(' ').map((n: string) => n[0]).slice(-2).join('').toUpperCase();

                return (
                    <div className="flex items-center gap-3">
                        <Avatar size="large" className="bg-gray-100 text-[#A31D1D] font-bold border border-red-100 shrink-0">
                            {initials}
                        </Avatar>
                        <div>
                            <div className="font-bold text-gray-800 text-sm">{fullName}</div>
                            <div className="text-[11px] text-gray-400">{record.email || record.username || 'Chưa cập nhật email'}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'MÃ NGƯỜI DÙNG',
            key: 'userId',
            render: (record: any) => <span className="text-gray-500 font-mono text-xs font-semibold">{record.userId || record.username}</span>,
        },
        {
            title: 'VAI TRÒ',
            key: 'role',
            render: (record: any) => {
                const role = record.role || (record.is_superuser ? 'Admin' : 'Sinh viên');
                let bgColor = 'bg-gray-100';
                let textColor = 'text-gray-600';

                if (role === 'Admin' || role === 'admin') {
                    bgColor = 'bg-red-50';
                    textColor = 'text-red-600';
                } else if (role === 'Giảng viên' || role === 'teacher') {
                    bgColor = 'bg-blue-50';
                    textColor = 'text-blue-600';
                } else if (role === 'Sinh viên' || role === 'student') {
                    bgColor = 'bg-[#FFFBE6]';
                    textColor = 'text-[#D48806]';
                }

                return (
                    <span className={`font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-wider border border-transparent ${bgColor} ${textColor}`}>
                        {role}
                    </span>
                );
            },
        },
        {
            title: 'TRẠNG THÁI',
            key: 'status',
            render: (record: any) => {
                const isActive = record.status === 'HOẠT ĐỘNG' || record.is_active !== false;
                return (
                    <div className="flex items-center gap-2">
                        {isActive ? (
                            <>
                                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]"></span>
                                <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">HOẠT ĐỘNG</span>
                            </>
                        ) : (
                            <>
                                <LockOutlined className="text-red-500" />
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">ĐÃ KHÓA</span>
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
                const isLocked = record.status === 'ĐÃ KHÓA' || record.is_active === false;
                return (
                    <div className="flex items-center justify-end gap-4 text-lg pr-4">
                        <Tooltip title="Chỉnh sửa hồ sơ">
                            <EditOutlined className="text-gray-400 cursor-pointer hover:text-[#A31D1D] transition-colors" />
                        </Tooltip>
                        {isLocked ? (
                            <Tooltip title="Mở khóa tài khoản">
                                <LockOutlined
                                    className="text-red-500 cursor-pointer hover:opacity-70 transition-opacity"
                                    onClick={() => handleToggleStatus(record)}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Khóa tài khoản">
                                <UnlockOutlined
                                    className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => handleToggleStatus(record)}
                                />
                            </Tooltip>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#A31D1D' } }}>
            <div className="max-w-[1400px] mx-auto pb-10 flex flex-col gap-6">
                {contextHolder}

                {/* ================= HEADER ================= */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2 border-b border-gray-200/60 pb-6">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 mb-1">Phân quyền người dùng</h1>
                        <p className="text-gray-500 text-sm">
                            Quản lý vai trò, trạng thái bảo mật và quyền truy cập hệ thống ACTVN.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Input
                            prefix={<SearchOutlined className="text-gray-400" />}
                            placeholder="Tìm kiếm Email hoặc Họ tên..."
                            allowClear
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full md:w-64 rounded-lg h-10"
                        />
                        <Button
                            type="primary"
                            icon={<UserAddOutlined />}
                            className="font-bold bg-[#A31D1D] border-none h-10 px-5 rounded-lg shadow-sm hover:opacity-90 shrink-0"
                            onClick={() => messageApi.info("Mở form thêm người dùng...")}
                        >
                            Thêm mới
                        </Button>
                    </div>
                </div>

                {/* ================= STATS CARDS (4 Cột) ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md border-l-4 border-l-red-600">
                        <div className="bg-red-50 p-4 rounded-xl text-red-600 text-2xl"><SafetyOutlined /></div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Quản trị viên</div>
                            <div className="text-2xl font-black text-gray-900 leading-none">{countAdmins}</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md border-l-4 border-l-blue-500">
                        <div className="bg-blue-50 p-4 rounded-xl text-blue-600 text-2xl"><BookOutlined /></div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Giảng viên</div>
                            <div className="text-2xl font-black text-gray-900 leading-none">{countTeachers}</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md border-l-4 border-l-yellow-500">
                        <div className="bg-[#FFFBE6] p-4 rounded-xl text-[#D48806] text-2xl"><TeamOutlined /></div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Sinh viên</div>
                            <div className="text-2xl font-black text-gray-900 leading-none">{countStudents}</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md border-l-4 border-l-gray-400">
                        <div className="bg-gray-100 p-4 rounded-xl text-gray-500 text-2xl"><LockOutlined /></div>
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Bị khóa</div>
                            <div className="text-2xl font-black text-gray-600 leading-none">{countLocked}</div>
                        </div>
                    </div>
                </div>

                {/* ================= FILTERS & BẢNG DANH SÁCH ================= */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col mt-2">
                    {/* Filter Bar */}
                    <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3 bg-gray-50/50">
                        <div className="bg-white border border-gray-200 rounded-lg h-9 flex items-center px-3 gap-2 shadow-sm">
                            <IdcardOutlined className="text-[#A31D1D]" />
                            <Select
                                value={roleFilter}
                                onChange={setRoleFilter}
                                bordered={false}
                                className="w-36 font-medium text-gray-700"
                            >
                                <Select.Option value="all">Tất cả vai trò</Select.Option>
                                <Select.Option value="Admin">Quản trị viên</Select.Option>
                                <Select.Option value="Giảng viên">Giảng viên</Select.Option>
                                <Select.Option value="Sinh viên">Sinh viên</Select.Option>
                            </Select>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg h-9 flex items-center px-3 gap-2 shadow-sm">
                            <ControlOutlined className="text-[#A31D1D]" />
                            <Select
                                value={statusFilter}
                                onChange={setStatusFilter}
                                bordered={false}
                                className="w-40 font-medium text-gray-700"
                            >
                                <Select.Option value="all_status">Trạng thái: Tất cả</Select.Option>
                                <Select.Option value="active">Hoạt động</Select.Option>
                                <Select.Option value="locked">Đã khóa</Select.Option>
                            </Select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-10"><Spin size="large" className="block mx-auto" /></div>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={filteredUsers}
                            rowKey={(record) => record.userId || record.id || record.key}
                            pagination={{
                                pageSize: 10,
                                showTotal: (total, range) => <span className="font-medium text-gray-500">Hiển thị {range[0]}-{range[1]} / {total} người dùng</span>,
                                className: "px-5 py-4 m-0 border-t border-gray-100 bg-gray-50/30 custom-red-pagination"
                            }}
                            className="custom-table-header"
                            rowClassName="hover:bg-gray-50/50 transition-colors"
                            locale={{ emptyText: 'Không tìm thấy người dùng nào phù hợp.' }}
                        />
                    )}
                </div>
            </div>
        </ConfigProvider>
    );
}

// Fallback Mock Data trong trường hợp API chưa chạy
const mockDataFallback = [
    { key: '1', name: 'Nguyễn Văn Hùng', email: 'hung.nv@actvn.edu.vn', userId: 'USR-2024-001', role: 'Admin', status: 'HOẠT ĐỘNG', is_active: true },
    { key: '2', name: 'Trần Thị Lan', email: 'lan.tt@actvn.edu.vn', userId: 'USR-2024-042', role: 'Giảng viên', status: 'HOẠT ĐỘNG', is_active: true },
    { key: '3', name: 'Đỗ Duy Anh', email: 'anh.dd@actvn.edu.vn', userId: 'USR-2023-912', role: 'Sinh viên', status: 'ĐÃ KHÓA', is_active: false },
    { key: '4', name: 'Lê Hoàng Anh', email: 'anh.lh@actvn.edu.vn', userId: 'USR-2024-112', role: 'Giảng viên', status: 'HOẠT ĐỘNG', is_active: true },
    { key: '5', name: 'Phạm Minh Tuấn', email: 'tuan.pm@actvn.edu.vn', userId: 'USR-2024-585', role: 'Admin', status: 'HOẠT ĐỘNG', is_active: true },
    { key: '6', name: 'Hoàng Thùy Linh', email: 'linh.ht@actvn.edu.vn', userId: 'USR-2023-088', role: 'Sinh viên', status: 'ĐÃ KHÓA', is_active: false },
];