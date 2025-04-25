import { Form, Pagination } from "react-bootstrap";
import { ReactNode } from "react";

interface CustomPaginationProps {
  currentPage: number;
  pagesTotal: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onGoToPage: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
}

export const CustomPagination = ({
  currentPage,
  pagesTotal,
  onPreviousPage,
  onNextPage,
  onGoToPage,
  itemsPerPage,
  onItemsPerPageChange,
}: CustomPaginationProps) => {
  const paginationItems: ReactNode[] = [];

  if (pagesTotal <= 4) {
    for (let i = 1; i <= pagesTotal; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onGoToPage(i)}
          aria-current={i === currentPage ? "page" : undefined}
          aria-label={`Ir para a página ${i}`}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    paginationItems.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => onGoToPage(1)}
        aria-label="Ir para a página 1"
      >
        1
      </Pagination.Item>
    );

    const showStartEllipsis = currentPage > 2;
    const showEndEllipsis = currentPage < pagesTotal - 1;

    if (showStartEllipsis) {
      paginationItems.push(
        <Pagination.Ellipsis
          key="ellipsis-start"
          aria-label="Páginas omitidas no início"
          disabled
        />
      );
    }

    const start = Math.max(2, currentPage);
    const end = Math.min(pagesTotal - 1, currentPage);

    for (let i = start; i <= end; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onGoToPage(i)}
          aria-label={`Ir para a página ${i}`}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (showEndEllipsis) {
      paginationItems.push(
        <Pagination.Ellipsis
          key="ellipsis-end"
          aria-label="Páginas omitidas no final"
          disabled
        />
      );
    }

    paginationItems.push(
      <Pagination.Item
        key={pagesTotal}
        active={pagesTotal === currentPage}
        onClick={() => onGoToPage(pagesTotal)}
        aria-label={`Ir para a página ${pagesTotal}`}
      >
        {pagesTotal}
      </Pagination.Item>
    );
  }

  return (
    <div className="pagination-container">
      <span className="pagination-text">
        Página {currentPage} de {pagesTotal}
      </span>
      <Pagination aria-label="Controlos de paginação">
        <Pagination.Prev
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          aria-label={`Página anterior, actualmente página ${currentPage}`}
        >
          Anterior
        </Pagination.Prev>
        {paginationItems}
        <Pagination.Next
          onClick={onNextPage}
          disabled={currentPage === pagesTotal}
          aria-label={`Próxima página, actualmente página ${currentPage} de ${pagesTotal}`}
        >
          Seguinte
        </Pagination.Next>
        <Form.Select
          aria-label="Selecionar número de itens por página"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
        >
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="24">24</option>
        </Form.Select>
      </Pagination>
    </div>
  );
};
