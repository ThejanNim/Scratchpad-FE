import type { DocumentStatus } from "@/pages/CollectionPage/types/documentStatus";
import CollectionHeader from "../CollectionHeader/CollectionHeader";
import DocumentCard from "../DocumentCard/DocumentCard";

interface DocumentGridProps {
  documents: {
    id: string;
    title: string;
    cover_image: string;
    status?: DocumentStatus;
  }[];
}

export default function DocumentGrid({ documents }: DocumentGridProps) {
  return (
    <div className="grid grid-cols-[8fr_minmax(300px,3fr)]">
      <div>
        <CollectionHeader />
        <div className="ease mb-xl flex grid-cols-12 duration-150 md:grid isolate max-w-screen-xl md:isolation-auto">
          <div className="col-span-12 w-full md:w-auto">
            <div className="gap-4 pb-8 flex grid-cols-3 flex-col md:grid">
              {documents.map((doc, index) => {
                const position = index + 1;

                const isLargeRight = position % 5 === 1;
                const isLargeLeft = position % 5 === 0;
                const isLarge = isLargeRight || isLargeLeft;

                return (
                  <DocumentCard
                    key={index}
                    id={doc.id}
                    title={doc.title}
                    size={isLarge ? "large" : "small"}
                    coverUrl={doc.cover_image}
                    status={doc.status}
                    align={
                      isLargeRight ? "right" : isLargeLeft ? "left" : undefined
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div>{/* <h1>World</h1> */}</div>
    </div>
  );
}
