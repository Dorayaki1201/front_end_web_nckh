'use client';

import React from 'react';
import { Layout, Input, Avatar, Badge, ConfigProvider } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    FolderOutlined,
    BookOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    SearchOutlined,
    BellOutlined
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const menuItems = [
        { icon: <HomeOutlined />, key: '/' },
        { icon: <AppstoreOutlined />, key: '/dashboard' },
        { icon: <FolderOutlined />, key: '/dashboard/projects' },
        { icon: <BookOutlined />, key: '/dashboard/library' },
        { icon: <UserOutlined />, key: '/dashboard/profile' },
    ];
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#A31D1D', fontFamily: 'inherit' } }}>
            <Layout className="min-h-screen bg-[#F8F9FA]">
                <Sider
                    width={55}
                    theme="light"
                    className="border-r border-gray-200 sticky top-0 h-screen z-50 shadow-sm"
                >
                    <div className="flex flex-col h-full items-center py-6">
                        <div className="mb-10 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push('/')}>
                            <img src="/logo-kma.png" alt="Logo" className="w-10 h-10 object-contain" />
                        </div>
                        <div className="flex flex-col gap-3 w-full items-center flex-1">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.key || (pathname.startsWith(item.key) && item.key !== '/');
                                return (
                                    <div
                                        key={item.key}
                                        onClick={() => router.push(item.key)}
                                        className="relative w-full flex justify-center items-center py-2 cursor-pointer group"
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#A31D1D] rounded-r-md"></div>
                                        )}
                                        <div className={`w-11 h-11 flex justify-center items-center rounded-xl transition-all duration-200 ${isActive
                                            ? 'bg-red-50 text-[#A31D1D] shadow-sm'
                                            : 'text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-700'
                                            }`}>
                                            <div className="text-[20px] leading-none">
                                                {item.icon}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col gap-6 items-center text-gray-400 text-[20px] w-full">
                            <div className="w-11 h-11 flex justify-center items-center rounded-xl hover:bg-gray-100 hover:text-gray-700 cursor-pointer transition-all">
                                <SettingOutlined />
                            </div>
                            <div
                                className="w-11 h-11 flex justify-center items-center rounded-xl hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all"
                                onClick={() => router.push('/login')}
                            >
                                <LogoutOutlined />
                            </div>
                        </div>
                    </div>
                </Sider>
                <Layout>
                    <header
                        className="border-b border-gray-200 h-16 flex items-center justify-between sticky top-0 z-40"
                        style={{ backgroundColor: '#ffffff', padding: '0 24px' }}
                    >
                        <div className="flex items-center gap-2 font-bold text-sm shrink-0">
                            <span className="text-[#A31D1D] tracking-wide">WORKSPACE</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-600">Sinh viên</span>
                        </div>
                        <div className="flex-1 max-w-xl mx-8 hidden md:block">
                            <Input
                                prefix={<SearchOutlined className="text-gray-400 mr-2" />}
                                placeholder="Tìm kiếm đề tài, tài liệu..."
                                className="bg-gray-50 hover:bg-gray-100 border-transparent focus:border-[#A31D1D] rounded-lg h-10 transition-colors"
                            />
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                            <Badge dot color="#A31D1D" offset={[-2, 4]}>
                                <BellOutlined className="text-[20px] text-gray-600 cursor-pointer hover:text-[#A31D1D] transition-colors" />
                            </Badge>
                            <div className="h-6 w-[1px] bg-gray-200"></div>
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="text-right hidden sm:block whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-800 leading-tight group-hover:text-[#A31D1D] transition-colors">SV. Nguyễn Văn Nam</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">AT160243 • Cơ sở HN</div>
                                </div>
                                <Avatar src="https://i.pravatar.cc/150?img=11" className="border border-gray-200" />
                            </div>
                        </div>
                    </header>
                    <Content className="p-6 md:p-8 min-h-screen">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}