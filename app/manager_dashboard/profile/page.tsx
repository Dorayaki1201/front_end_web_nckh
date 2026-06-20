'use client';

import React, { useState, useEffect } from 'react';
import SharedProfile from '@/components/shared/Profile';
import { BankOutlined, EnvironmentOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function ManagerProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Giả lập API lấy data cán bộ
        setTimeout(() => {
            setProfile({
                id: 'CB-001',
                name: 'CB. Trần Thị B',
                managerId: 'CB20240015',
                department: 'Khoa học - Công nghệ',
                office: 'P.502 - Nhà TB1',
                status: 'Đang công tác',
                phone: '0987 654 321',
                email: 'tranthib@actvn.edu.vn',
                address: '141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội',
            });
            setLoading(false);
        }, 800);
    }, []);

    const handleSave = async (values: any) => {
        console.log('Call API Update Cán bộ:', values);
        return new Promise<void>(resolve => setTimeout(resolve, 1000));
    };

    return (
        <SharedProfile
            isLoading={loading}
            pageTitle="Hồ sơ cá nhân"
            pageSubtitle="Quản lý thông tin tài khoản và bảo mật của bạn tại ACTVN Research."
            avatarUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop"
            fullName={profile?.name}
            idLabel="MÃ CB"
            idValue={profile?.managerId}
            initialFormValues={profile}
            onSave={handleSave}
            // Khai báo 3 cái box xám bên trái
            infoItems={[
                { icon: <BankOutlined />, label: 'Phòng', value: profile?.department },
                { icon: <EnvironmentOutlined />, label: 'Văn phòng', value: profile?.office },
                { icon: <CheckCircleOutlined />, label: 'Trạng thái', value: profile?.status, valueColorClass: 'text-[#A31D1D]' },
            ]}
        // KHÔNG truyền achievement vào đây -> Box màu vàng sẽ tự động biến mất!
        />
    );
}