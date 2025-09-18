"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/session";
import { codeRegex, emailRegex } from "@/lib/validators";

export default function BookPage() {
  const router = useRouter();
  const { studentCode, email, setStudentCode, setEmail, setSessionId } = useSessionStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codeRegex.test(studentCode)) {
      setError("Mã học sinh phải theo định dạng VNWIS + 6 chữ số (ví dụ VNWIS012345).");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      // TODO: sau này gọi BE: POST /session để lấy sessionId thật
      const mockSessionId = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
      setSessionId(mockSessionId);
      router.push("/auditorium");
    } catch {
      setError("Không thể tạo phiên. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow w-full max-w-md space-y-5">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">Đặt ghế Auditorium</h1>
          <p className="text-sm text-gray-500">Nhập Mã HS và Email để tiếp tục</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="studentCode">Mã học sinh</Label>
          <Input
            id="studentCode"
            placeholder="VNWIS123456"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value.trim().toUpperCase())}
            autoComplete="off"
          />
          <p className="text-xs text-gray-500">Định dạng: VNWIS + 6 chữ số.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="phuhuynh@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            autoComplete="email"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Đang xử lý..." : "Tiếp tục"}
        </Button>

        <p className="text-center text-xs text-gray-500">
          Khi tiếp tục, bạn đồng ý sử dụng thông tin để đặt ghế cho sự kiện.
        </p>
      </form>
    </main>
  );
}
