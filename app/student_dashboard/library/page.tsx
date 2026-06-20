'use client';

import React, { useState } from 'react';
import { Button, Pagination, Divider } from 'antd';
import {
    FilePdfFilled,
    FileWordFilled,
    BookFilled,
    DownloadOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';

// 1. Khai báo cấu trúc dữ liệu Tài liệu
interface DocumentItem {
    id: string;
    title: string;
    description: string;
    category: 'Quy định' | 'Biểu mẫu' | 'Hướng dẫn';
    fileType: 'pdf' | 'doc' | 'book';
    updatedAt: string;
}

// 2. Mock Data (Dữ liệu giả lập khớp với thiết kế)
const mockDocuments: DocumentItem[] = [
    {
        id: 'DOC-01',
        title: 'Quy chế Quản lý Nghiên cứu Khoa học Sinh viên...',
        description: 'Chi tiết về các bước đăng ký, thẩm định và nghiệm thu đề tài cấp học viện.',
        category: 'Quy định',
        fileType: 'pdf',
        updatedAt: '15/10/2023',
    },
    {
        id: 'DOC-02',
        title: 'Mẫu thuyết minh đề tài NCKH (BM01-SV)',
        description: 'Mẫu chuẩn cho sinh viên trình bày đề cương nghiên cứu ban đầu.',
        category: 'Biểu mẫu',
        fileType: 'doc',
        updatedAt: '02/09/2023',
    },
    {
        id: 'DOC-03',
        title: 'Hướng dẫn trích dẫn tài liệu theo chuẩn IEEE',
        description: 'Yêu cầu bắt buộc về hình thức trích dẫn cho các bài báo khoa học.',
        category: 'Hướng dẫn',
        fileType: 'book',
        updatedAt: '20/08/2023',
    },
    {
        id: 'DOC-04',
        title: 'Báo cáo tiến độ thực hiện đề tài (Tháng/Quý)',
        description: 'Biểu mẫu dành cho các nhóm trưởng cập nhật tình hình nghiên cứu định kỳ.',
        category: 'Biểu mẫu',
        fileType: 'doc',
        updatedAt: '12/10/2023',
    },
    {
        id: 'DOC-05',
        title: 'Quy định về Định mức chi hỗ trợ NCKH Sinh viên',
        description: 'Văn bản chi tiết về các khoản phụ cấp, hỗ trợ kinh phí mua vật tư nghiên cứu.',
        category: 'Quy định',
        fileType: 'pdf',
        updatedAt: '05/01/2024',
    },
    {
        id: 'DOC-06',
        title: 'Mẫu báo cáo tổng kết đề tài NCKH (BM05-SV)',
        description: 'Định dạng file báo cáo cuối cùng để nộp cho Hội đồng nghiệm thu.',
        category: 'Biểu mẫu',
        fileType: 'doc',
        updatedAt: '18/12/2023',
    },
];

export default function LibraryPage() {
    // State quản lý bộ lọc (Tất cả, Biểu mẫu, Quy định, Hướng dẫn)
    const [activeFilter, setActiveFilter] = useState<string>('Tất cả');
    // State quản lý trang hiện tại
    const [currentPage, setCurrentPage] = useState<number>(1);

    const filters = ['Tất cả', 'Biểu mẫu', 'Quy định', 'Hướng dẫn'];

    // Logic lọc dữ liệu: Nếu chọn "Tất cả" thì lấy hết, nếu không thì lọc theo category
    const filteredDocs = activeFilter === 'Tất cả'
        ? mockDocuments
        : mockDocuments.filter(doc => doc.category === activeFilter);

    // Hàm render Icon dựa trên loại file
    const renderFileIcon = (type: string) => {
        if (type === 'pdf') {
            return <FilePdfFilled className="text-3xl" style={{ color: '#ff4d4f' }} />
        }
        if (type === 'doc') {
            return <FileWordFilled className="text-3xl" style={{ color: '#1677ff' }} />
        }
        return <BookFilled className="text-3xl" style={{ color: '#52c41a' }} />
    }

    // Hàm render màu Tag dựa trên danh mục
    const renderTagStyle = (category: string) => {
        if (category === 'Quy định') return 'bg-[#FFFBE6] text-[#D48806]';
        if (category === 'Biểu mẫu') return 'bg-[#FFF0F6] text-[#C41D7F]';
        return 'bg-[#F6FFED] text-[#389E0D]';
    };

    return (
        <div className="max-w-[1400px] mx-auto pb-10">

            {/* ================= HEADER & BỘ LỌC ================= */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-8 gap-6 border-b border-[#A31D1D]/30 pb-6 -mx-6 md:-mx-8 px-6 md:px-8">
                <div className="max-w-2xl">
                    <h1 className="text-2xl md:text-[28px] font-black text-gray-900 mb-2">Thư viện tài liệu</h1>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Tổng hợp các biểu mẫu, quy định và hướng dẫn phục vụ hoạt động nghiên cứu khoa học sinh viên tại Học viện Kỹ thuật Mật mã.
                    </p>
                </div>

                {/* Nhóm nút bấm lọc (Pills) */}
                <div className="flex flex-wrap gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => {
                                setActiveFilter(filter);
                                setCurrentPage(1); // Reset về trang 1 khi đổi bộ lọc
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${activeFilter === filter
                                ? 'bg-[#A31D1D] text-white shadow-md'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* ================= LƯỚI TÀI LIỆU ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                {filteredDocs.map((doc) => (
                    <div
                        key={doc.id}
                        className="bg-white rounded-xl border border-[#A31D1D]/30 hover:border-red-300 hover:shadow-lg transition-all duration-300 flex flex-col p-5 group"
                    >
                        {/* Cụm Header Card (Icon + Tag) */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                                {renderFileIcon(doc.fileType)}
                            </div>
                            <div className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${renderTagStyle(doc.category)}`}>
                                {doc.category}
                            </div>
                        </div>

                        {/* Nội dung Card */}
                        <div className="flex-1">
                            <h3 className="text-base font-bold text-gray-800 mb-2 leading-snug line-clamp-2 group-hover:text-[#A31D1D] transition-colors">
                                {doc.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                                {doc.description}
                            </p>
                        </div>

                        <Divider className="my-4" style={{ borderColor: '#f0f0f0' }} />

                        {/* Cụm Footer Card (Ngày + Nút tải) */}
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400 flex items-center gap-1.5 font-medium">
                                <ClockCircleOutlined /> Cập nhật: {doc.updatedAt}
                            </span>
                            <button className="text-[#A31D1D] font-bold flex items-center gap-1 hover:underline">
                                Tải về <DownloadOutlined className="text-[14px]" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= PHÂN TRANG ================= */}
            {filteredDocs.length > 0 ? (
                <div className="flex justify-center mt-12">
                    <Pagination
                        current={currentPage}
                        onChange={(page) => setCurrentPage(page)}
                        total={50} // Giả lập tổng số lượng để hiện ra nhiều trang
                        pageSize={12}
                        showSizeChanger={false}
                    />
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400 font-medium">
                    Không tìm thấy tài liệu nào trong thư mục này.
                </div>
            )}

        </div>
    );
}