'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Divider, Form, Skeleton, message } from 'antd';
import {
    PhoneOutlined, MailOutlined, LockOutlined, EnvironmentOutlined,
    BookOutlined, CheckCircleOutlined, TrophyOutlined, FormOutlined,
    SafetyCertificateFilled, SaveOutlined
} from '@ant-design/icons';

// 1. Định nghĩa khuôn mẫu dữ liệu Sinh viên
interface UserProfile {
    id: string;
    name: string;
    studentId: string;
    class: string;
    department: string;
    status: string;
    achievements: string;
    phone: string;
    email: string;
    address: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // Dùng Form Hook của Antd để quản lý dữ liệu nhập liệu
    const [form] = Form.useForm();

    // 2. Giả lập gọi API lấy thông tin người dùng
    useEffect(() => {
        const fetchProfile = () => {
            setTimeout(() => {
                const mockData = {
                    id: 'USER-001',
                    name: 'Nguyễn Văn Nam',
                    studentId: '12345678',
                    class: 'AT18 - An toàn thông tin',
                    department: 'An toàn thông tin',
                    status: 'Đang theo học',
                    achievements: 'Đạt 01 giải thưởng cấp Học viện.',
                    phone: '0987 654 321',
                    email: 'anv.at16d@actvn.edu.vn',
                    address: '141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội',
                };
                setProfile(mockData);
                // Đổ dữ liệu API vào Form

                setLoading(false);
            }, 800);
        };
        fetchProfile();
    }, [form]);

    // 3. Hàm xử lý khi bấm nút "Lưu thay đổi"
    const handleSave = (values: any) => {
        setSaving(true);
        console.log('Dữ liệu chuẩn bị gửi lên API:', values);

        // Giả lập delay lưu API
        setTimeout(() => {
            setSaving(false);
            messageApi.success('Đã cập nhật thông tin tài khoản thành công!');
        }, 1000);
    };

    if (loading || !profile) {
        return <div className="p-10"><Skeleton active avatar paragraph={{ rows: 8 }} /></div>;
    }

    return (
        <div className="max-w-[1400px] mx-auto">
            {contextHolder}
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 mb-1">Hồ sơ cá nhân</h1>
                <p className="text-gray-500 text-sm">Quản lý thông tin tài khoản và bảo mật của bạn tại ACTVN Research.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ================= CỘT TRÁI: HIỂN THỊ THÔNG TIN CỐ ĐỊNH ================= */}
                <div className="lg:col-span-1">
                    <Card
                        className="rounded-xl shadow-sm overflow-hidden"
                        styles={{ body: { padding: 0 }, }}
                        style={{ border: "1px solid #A31D1D4D" }}
                    >
                        <div className="h-28 bg-[#FFF5F5]"></div>

                        <div className="px-6 pb-6">
                            <div className="-mt-14 mb-4">
                                <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-28 h-28 rounded-2xl border-4 border-white shadow-md object-cover bg-white" />
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                                <p className="text-[#A31D1D] font-bold text-sm mt-1">MSSV: {profile.studentId}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-3">
                                    <BookOutlined className="text-[#A31D1D] text-lg mt-0.5" />
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Lớp</div>
                                        <div className="text-sm font-bold text-gray-800">{profile.class}</div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-3">
                                    <EnvironmentOutlined className="text-[#A31D1D] text-lg mt-0.5" />
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Khoa</div>
                                        <div className="text-sm font-bold text-gray-800">{profile.department}</div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-3">
                                    <CheckCircleOutlined className="text-[#A31D1D] text-lg mt-0.5" />
                                    <div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Trạng thái</div>
                                        <div className="text-sm font-bold text-[#A31D1D]">{profile.status}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#FFFBE6] border border-[#FFE58F] rounded-lg p-4 mt-6 flex items-start gap-3">
                                <TrophyOutlined className="text-[#D48806] text-lg mt-0.5" />
                                <div>
                                    <div className="text-[10px] font-bold text-[#D48806] uppercase tracking-wider mb-1">Thành tích nghiên cứu</div>
                                    <div className="text-sm font-medium text-gray-800">{profile.achievements}</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>


                {/* ================= CỘT PHẢI: FORM CẬP NHẬT ================= */}
                <div className="lg:col-span-2 space-y-8">
                    <Card
                        className="rounded-xl shadow-sm"
                        styles={{ body: { padding: '32px' } }}
                        style={{ border: "1px solid #A31D1D4D" }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <FormOutlined className="text-[#A31D1D] text-xl" />
                            <h2 className="text-xl font-bold text-gray-800">Cập nhật thông tin tài khoản</h2>
                        </div>

                        <Divider className="my-6" />

                        {/* Form của Ant Design quản lý State tự động */}
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSave}
                            initialValues={{
                                phone: profile.phone,
                                email: profile.email,
                                address: profile.address,
                            }}
                        >
                            <div className="space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                    <Form.Item
                                        name="phone"
                                        label={<span className="text-xs font-bold text-gray-600">Số điện thoại</span>}
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                    >
                                        <Input size="large" prefix={<PhoneOutlined className="text-gray-400 mr-2" />} className="bg-gray-50 rounded-lg font-medium text-gray-700" />
                                    </Form.Item>

                                    <Form.Item
                                        name="email"
                                        label={<span className="text-xs font-bold text-gray-600">Email liên hệ</span>}
                                        rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}
                                    >
                                        <Input size="large" prefix={<MailOutlined className="text-gray-400 mr-2" />} className="bg-gray-50 rounded-lg font-medium text-gray-700" />
                                    </Form.Item>
                                </div>

                                <Form.Item
                                    name="password"
                                    label={<span className="text-xs font-bold text-gray-600">Đổi mật khẩu</span>}
                                >
                                    <Input.Password size="large" prefix={<LockOutlined className="text-gray-400 mr-2" />} placeholder="Nhập mật khẩu mới (để trống nếu không đổi)" className="bg-gray-50 rounded-lg" />
                                </Form.Item>

                                <Form.Item
                                    name="address"
                                    label={<span className="text-xs font-bold text-gray-600">Địa chỉ thường trú</span>}
                                >
                                    <Input size="large" prefix={<EnvironmentOutlined className="text-gray-400 mr-2" />} className="bg-gray-50 rounded-lg font-medium text-gray-700" />
                                </Form.Item>
                            </div>

                            <Divider className="my-8" />

                            <div className="flex justify-end gap-4 mb-8">
                                <Button className="font-bold text-[#A31D1D] border-[#A31D1D] rounded-lg h-10 px-8 hover:bg-red-50" onClick={() => form.resetFields()}>
                                    Hủy bỏ
                                </Button>
                                {/* Nút Submit của Form */}
                                <Button htmlType="submit" loading={saving} type="primary" icon={<SaveOutlined />} className="bg-[#A31D1D] text-white font-bold rounded-lg h-10 px-8 border-none shadow-md hover:opacity-90">
                                    Lưu thay đổi
                                </Button>
                            </div>
                        </Form>

                        {/* Khung Bảo mật (Security Box) */}
                        <div className="border-2 border-dashed border-gray-300 bg-gray-50/50 rounded-xl p-6 flex flex-col sm:flex-row gap-5 items-start">
                            <div className="bg-red-100 p-3 rounded-xl">
                                <SafetyCertificateFilled className="text-[#A31D1D] text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-800 mb-1">Bảo mật tài khoản</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                    Lần cuối thay đổi mật khẩu là 3 tháng trước. Chúng tôi khuyên bạn nên cập nhật mật khẩu định kỳ để bảo vệ dữ liệu nghiên cứu.
                                </p>
                                <a href="#" className="text-[#A31D1D] font-bold text-sm hover:underline flex items-center gap-1">
                                    Kích hoạt xác thực 2 lớp (2FA) →
                                </a>
                            </div>
                        </div>

                    </Card>
                </div>

            </div>
        </div>
    );
}