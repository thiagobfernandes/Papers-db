import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataTable } from "../../components/data-table";
import {
  PapersColumns,
} from "../../components/columns";
import { Paginated } from "../../components/pagination";
import { FormModal } from "../../components/form-modal";
import { DeletePaperAlert } from "../papers/delete-paper-alert";
import { useGetPapersUser } from "../../hook/papers/use-get-papers-user.hook";
import { FormModalUpdate } from "../../components/form-modal-update";

export function UserPostsPage() {
  
  const {
    papers,
    loading: loadingPapers,
    page: paperPage,
    pageSize: paperPageSize,
    total: paperTotal,
    setPage: setPaperPage,
    setPageSize: setPaperPageSize,
    refetch: refetchPapers,
  } = useGetPapersUser();


  const navigate = useNavigate();
  const { tab } = useParams();
  const [modalKey] = useState(0);

  const [activeTab, setActiveTab] = useState<"papers" | undefined>();

  useEffect(() => {
    if (tab === "papers") setActiveTab("papers");
  }, [tab]);

  const handleTabChange = (value: string) => {
    if (value === "papers") navigate("/user/posts/papers");
  };
  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">Meus Posts</h1>

      <Tabs
        value={tab ?? "papers"}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="flex gap-2">
       
          <TabsTrigger
            value="papers"
            className="cursor-pointer data-[state=active]:font-bold data-[state=inactive]:hover:text-blue-500 transition-colors"
          >
            Papers
          </TabsTrigger>
          
        </TabsList>

        <div className="flex justify-end py-2">
          {activeTab && <FormModal
            key={modalKey}
            type={activeTab}
            onSuccess={
              activeTab === "papers"
                ? refetchPapers : () =>  console.log("none")
            }
          />}
        </div>

      

        <TabsContent value="papers">
          <DataTable
            data={papers ?? []}
            columns={PapersColumns}
            loading={loadingPapers}
            actions={(paper) => (
              <>
                <FormModalUpdate
                  type="papers"
                  data={paper}
                  onSuccess={refetchPapers}
                />
                <DeletePaperAlert id={paper.id} onSuccess={refetchPapers} />
              </>
            )}
          />
          <Paginated
            current={paperPage}
            pageSize={paperPageSize}
            total={paperTotal}
            onChange={(newPage, newSize) => {
              setPaperPage(newPage);
              setPaperPageSize(newSize);
            }}
          />
        </TabsContent>

      </Tabs>
    </div>
  );
}
