"use client"
import { Card } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { SettingsSidebar } from "@/components/SettingsSidebar";
import { contractor, department } from "@/json/form-data/department";
import { contractorMenu } from "@/json/menu/contractor"
import SampleForm from "@/components/common/Form/SampleForm";

export default function Home() {
  
  return (
    <><div className="h-full">
    <div className="flex items-center justify-between px-8 py-4 border-b">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Pages</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/account"> /Account</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage> /Contractor</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Contractors</h1>

      {/* <Tabs defaultValue="messages">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
      </Tabs> */}

      <div className="mt-6 grid grid-cols-4 gap-6">
        <Card className="col-span-1">
          <SettingsSidebar settingsOptions={contractorMenu}/>
        </Card>

        <Card className="col-span-3 p-6">
          {/* <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img src="/placeholder.svg" alt="Profile" className="h-16 w-16 rounded-full object-cover" />
              <div>
                <h2 className="text-xl font-semibold">Alex Thompson</h2>
                <p className="text-sm text-muted-foreground">CEO / Co-Founder</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Switch to invisible</span>
              <Switch />
            </div>
          </div> */}
          {/* <SampleFormThree formValue={department} individualValue={contractor}/> */}
          <SampleForm department={department}/>
          {/* <BasicInfoForm /> */}
        </Card>
      </div>
    </div>
  </div>
    </>
  );
}
