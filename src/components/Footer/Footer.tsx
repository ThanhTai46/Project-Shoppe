export default function Footer() {
  return (
    <footer className='bg-[#f5f5f5] py-16'>
      <div className='container-1200 px-4 text-sm'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className='lg:col-span-2'>
            Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México
            Colombia Chile
          </div>
        </div>
        <div className='mt-10 flex flex-col text-center text-sm'>
          <span className=''>Công ty TNHH Shopee</span>
          <span className='mt-6 text-xs'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </span>
          <span className='mt-6 text-xs'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </span>
          <span className='mt-6 text-xs'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </span>
          <span className='mt-6 text-xs'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</span>
        </div>
      </div>
    </footer>
  );
}
