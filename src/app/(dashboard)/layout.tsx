import {ReactNode} from "react";
import {Navbar} from "@/components/Navbar";
import {DottedSeparator} from "@/components/dotted-separator";

export default function DashboardLayout({children}: { children: ReactNode }) {
    return (
        <div>
            <Navbar/>
            <DottedSeparator/>
            {children}
        </div>
    );
}