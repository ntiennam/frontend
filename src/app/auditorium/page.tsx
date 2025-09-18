"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/session";

export default function AuditoriumPage() {
  const router = useRouter();
  const { studentCode, email } = useSessionStore();

  useEffect(() => {
    if (!studentCode || !email) {
      router.replace("/book");
    }
  }, [studentCode, email, router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Sơ đồ ghế – đang dựng</h1>
        <p className="text-gray-600">Bước kế tiếp: render 17 hàng × 33 ghế, số tăng từ phải → trái.</p>
      </div>
    </main>
  );
}
