export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 flex-col border-r bg-gray-100/40 p-4 md:flex">
        <div className="font-bold text-lg mb-6">Tienda de tecnología</div>
        <nav className="space-y-2">
          <p className="text-sm text-gray-500">Menú principal</p>
        </nav>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
