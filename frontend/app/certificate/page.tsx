"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Search,
  Download,
  Eye,
  Filter,
  Calendar,
  User,
  LogOut,
  CheckCircle,
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import NotificationBell from "@/components/NotificationBell";
import UserAvatar from "@/components/UserAvatar";

interface Certificate {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  event_id: number;
  event_title: string;
  event_date: string;
  issued_date: string;
  certificate_url: string;
  status: "Generated" | "Downloaded" | "Pending";
}

export default function CertificatePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data - Replace with actual API call
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const mockData: Certificate[] = [
          {
            id: 1,
            user_id: 101,
            user_name: "John Doe",
            user_email: "john@example.com",
            event_id: 1,
            event_title: "Tech Workshop 2024",
            event_date: "2024-12-15",
            issued_date: "2024-12-16",
            certificate_url: "/certificates/cert1.pdf",
            status: "Generated",
          },
          {
            id: 2,
            user_id: 102,
            user_name: "Jane Smith",
            user_email: "jane@example.com",
            event_id: 2,
            event_title: "Annual Sports Day",
            event_date: "2024-12-10",
            issued_date: "2024-12-11",
            certificate_url: "/certificates/cert2.pdf",
            status: "Downloaded",
          },
          {
            id: 3,
            user_id: 103,
            user_name: "Mike Johnson",
            user_email: "mike@example.com",
            event_id: 3,
            event_title: "Cultural Fest",
            event_date: "2024-12-08",
            issued_date: "2024-12-09",
            certificate_url: "/certificates/cert3.pdf",
            status: "Generated",
          },
          {
            id: 4,
            user_id: 104,
            user_name: "Sarah Williams",
            user_email: "sarah@example.com",
            event_id: 4,
            event_title: "Coding Competition",
            event_date: "2024-12-05",
            issued_date: "2024-12-06",
            certificate_url: "/certificates/cert4.pdf",
            status: "Pending",
          },
          {
            id: 5,
            user_id: 105,
            user_name: "David Brown",
            user_email: "david@example.com",
            event_id: 5,
            event_title: "Guest Lecture Series",
            event_date: "2024-12-01",
            issued_date: "2024-12-02",
            certificate_url: "/certificates/cert5.pdf",
            status: "Downloaded",
          },
        ];

        setCertificates(mockData);
        setFilteredCertificates(mockData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load certificates",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = certificates;

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((cert) => cert.status === filterStatus);
    }

    // Search by name, email, or event
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (cert) =>
          cert.user_name.toLowerCase().includes(query) ||
          cert.user_email.toLowerCase().includes(query) ||
          cert.event_title.toLowerCase().includes(query)
      );
    }

    setFilteredCertificates(filtered);
  }, [searchQuery, filterStatus, certificates]);

  const handleDownload = (certificateId: number) => {
    toast({
      title: "Download Started",
      description: "Certificate is being downloaded...",
    });
    // TODO: Implement actual download logic
  };

  const handleView = (certificateId: number) => {
    toast({
      title: "Opening Certificate",
      description: "Opening certificate in new window...",
    });
    // TODO: Implement view logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Generated":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Downloaded":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "Pending":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <AdminSidebar activePage="certificates" />

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 sticky top-0 z-40 bg-white/10 backdrop-blur-xl shadow-lg border-b border-white/20">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Certificate Management
            </h2>
            <p className="text-sm text-slate-300">
              View and manage user certificates
            </p>
          </div>

          <div className="flex items-center gap-5">
            <NotificationBell />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-white">
                  {user?.name}
                </div>
                <div className="text-xs text-slate-400 capitalize">
                  {user?.role}
                </div>
              </div>

              <button
                onClick={() => router.push("/profile")}
                className="rounded-full overflow-hidden border-2 border-transparent shadow hover:ring-2 hover:ring-indigo-500 transition-all cursor-pointer"
                title="View Profile"
              >
                <UserAvatar size="md" />
              </button>

              <button
                className="p-2 rounded-lg hover:bg-white/10 text-white"
                onClick={logout}
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-8 py-10">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">
                      Total Certificates
                    </p>
                    <p className="text-4xl font-bold text-white mt-2">
                      {certificates.length}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Award className="text-blue-200" size={28} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">
                      Downloaded
                    </p>
                    <p className="text-4xl font-bold text-white mt-2">
                      {certificates.filter((c) => c.status === "Downloaded").length}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-200" size={28} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 border-yellow-700 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-300 text-sm font-medium">
                      Pending
                    </p>
                    <p className="text-4xl font-bold text-white mt-2">
                      {certificates.filter((c) => c.status === "Pending").length}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Calendar className="text-yellow-200" size={28} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="bg-slate-800 border-slate-700 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, or event..."
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setFilterStatus("all")}
                    variant={filterStatus === "all" ? "default" : "outline"}
                    className={
                      filterStatus === "all"
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                    }
                  >
                    All
                  </Button>
                  <Button
                    onClick={() => setFilterStatus("Generated")}
                    variant={filterStatus === "Generated" ? "default" : "outline"}
                    className={
                      filterStatus === "Generated"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                    }
                  >
                    Generated
                  </Button>
                  <Button
                    onClick={() => setFilterStatus("Downloaded")}
                    variant={filterStatus === "Downloaded" ? "default" : "outline"}
                    className={
                      filterStatus === "Downloaded"
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                    }
                  >
                    Downloaded
                  </Button>
                  <Button
                    onClick={() => setFilterStatus("Pending")}
                    variant={filterStatus === "Pending" ? "default" : "outline"}
                    className={
                      filterStatus === "Pending"
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                    }
                  >
                    Pending
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates Table */}
          <Card className="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-slate-700">
              <CardTitle className="flex items-center gap-2 text-white">
                <Award size={24} />
                User Certificates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-slate-400">Loading certificates...</div>
                </div>
              ) : filteredCertificates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Award className="text-slate-600 mb-4" size={48} />
                  <p className="text-slate-400">No certificates found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900/50 border-b border-slate-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Event Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Issued Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredCertificates.map((cert) => (
                        <tr
                          key={cert.id}
                          className="hover:bg-slate-700/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {cert.user_name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {cert.user_name}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {cert.user_email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-white font-medium">
                              {cert.event_title}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-300">
                              {new Date(cert.event_date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-300">
                              {new Date(cert.issued_date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              className={`${getStatusColor(
                                cert.status
                              )} text-white font-semibold px-3 py-1 shadow-lg`}
                            >
                              {cert.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleView(cert.id)}
                                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                              >
                                <Eye size={16} className="mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleDownload(cert.id)}
                                className="bg-indigo-600 hover:bg-indigo-700"
                              >
                                <Download size={16} className="mr-1" />
                                Download
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
