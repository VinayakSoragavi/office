import { Building, FileText, ClipboardList, ShieldAlert, Phone, Banknote, Users, MapPin, Folder, AlertTriangle, Lock } from "lucide-react";

export const contractorMenu = [
    { href: "/contractor/basic-details", icon: Building, label: "Contractor Basic Details" },
    { href: "/contractor/license", icon: ClipboardList, label: "Contractor License" },
    { href: "/contractor/work-orders", icon: FileText, label: "Work Orders" },
    { href: "/contractor/wc-policy", icon: ShieldAlert, label: "WC Policy" },
    { href: "/contractor/important-numbers", icon: Phone, label: "Important No." },
    { href: "/contractor/bank-details", icon: Banknote, label: "Bank Details" },
    { href: "/contractor/security-deposit", icon: Lock, label: "Security Deposit" },
    { href: "/contractor/site-supervisor", icon: Users, label: "Site Supervisor" },
    { href: "/contractor/address", icon: MapPin, label: "Address" },
    { href: "/contractor/document", icon: Folder, label: "Document" },
    { href: "/contractor/penalty-fine", icon: AlertTriangle, label: "Penalty/Fine", className: "text-red-500 hover:text-red-600 hover:bg-red-50" },
];
