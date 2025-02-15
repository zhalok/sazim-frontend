import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationBarProps {
  currentPage: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function PaginationBar({
  currentPage,
  totalItems,
  limit,
  onPageChange,
}: PaginationBarProps) {
  const totalPages = Math.ceil(totalItems / limit);

  const renderPageButton = (pageNumber: number) => (
    <Button
      key={pageNumber}
      variant={currentPage === pageNumber ? "default" : "outline"}
      size="icon"
      onClick={() => onPageChange(pageNumber)}
      aria-label={`Go to page ${pageNumber}`}
      aria-current={currentPage === pageNumber ? "page" : undefined}
    >
      {pageNumber}
    </Button>
  );

  const renderEllipsis = (key: string) => (
    <Button key={key} variant="outline" size="icon" disabled>
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      buttons.push(renderPageButton(1));

      if (currentPage > 3) {
        buttons.push(renderEllipsis("start-ellipsis"));
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(renderPageButton(i));
      }

      if (currentPage < totalPages - 2) {
        buttons.push(renderEllipsis("end-ellipsis"));
      }

      buttons.push(renderPageButton(totalPages));
    }

    return buttons;
  };

  return (
    <nav
      className="flex items-center justify-center space-x-2"
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {renderPaginationButtons()}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
