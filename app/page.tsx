export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0c6303] mb-4">
            مرحباً بك في منصة نائبك
          </h1>
          <p className="text-lg text-[#333333] mb-8">
            منصة إلكترونية تربط المواطنين بنوابهم ومرشحيهم في مجلسي النواب والشيوخ
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#f5f5f5]">
              <div className="text-4xl mb-4">📨</div>
              <h3 className="text-xl font-bold text-[#0c6303] mb-2">تواصل مباشر</h3>
              <p className="text-[#666666]">
                أرسل رسائلك مباشرة إلى نوابك ومرشحيك
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#f5f5f5]">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-[#0c6303] mb-2">قدم شكواك</h3>
              <p className="text-[#666666]">
                قدم شكواك وتابع حالتها خطوة بخطوة
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#f5f5f5]">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-[#0c6303] mb-2">قيّم الأداء</h3>
              <p className="text-[#666666]">
                قيّم أداء نوابك بناءً على تجربتك
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
