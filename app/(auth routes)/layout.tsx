"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        router.refresh();
        setLoading(false);
    }, [router]);

    return loading ? <Loading /> : children;
}