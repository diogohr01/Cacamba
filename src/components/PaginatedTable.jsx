import { Button, message, Space } from "antd";
import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { StyledTable, StyledPagination } from "./StylesTable/styles"; // Importando a nova paginação

const PaginatedTable = forwardRef(
    (
        {
            fetchData,
            initialPageSize = 5,
            disabled = false,
            columns,
            actions = [],
            rowKey = "id",
            rowSelection = null,
            expandable = null,
            scroll = { x: "max-content" },
            ...restProps
        },
        ref
    ) => {
        const [data, setData] = useState([]);
        const [pagination, setPagination] = useState({
            current: 1,
            pageSize: initialPageSize,
            total: 0,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
        });
        const [loading, setLoading] = useState(false);
        const [sorter, setSorter] = useState({ field: null, order: null });

        const getData = async (page, pageSize, sorterField, sortOrder) => {
            setLoading(true);
            try {
                const response = await fetchData(page, pageSize, sorterField, sortOrder);
                setData(response.data);
                setPagination((prev) => ({
                    ...prev,
                    current: page,
                    pageSize: pageSize,
                    total: response.total,
                }));
            } catch (error) {
                message.error("Erro ao carregar os dados.");
            } finally {
                setLoading(false);
            }
        };

        const handleTableChange = (newPagination, filters, newSorter) => {
            if (disabled) return;
            const { current, pageSize } = newPagination;
            const sorterField = newSorter?.field || null;
            const sortOrder = newSorter?.order || null;
            setSorter({ field: sorterField, order: sortOrder });
            getData(current, pageSize, sorterField, sortOrder);
        };

        useImperativeHandle(ref, () => ({
            reloadTable() {
                getData(pagination.current, pagination.pageSize, sorter?.field, sorter?.order);
            },
        }));

        useEffect(() => {
            getData(pagination.current, pagination.pageSize, sorter?.field, sorter?.order);
        }, []);

        const combinedColumns = columns.map((column) => ({
            ...column,
            sorter: column.dataIndex && column.dataIndex !== "actions",
            sortOrder: sorter.field === column.dataIndex ? sorter.order : null,
        }));

        return (
            <>
                <StyledTable
                    dataSource={data}
                    columns={combinedColumns}
                    pagination={false} // Removemos a paginação do Antd aqui
                    loading={loading}
                    onChange={handleTableChange}
                    rowKey={rowKey}
                    scroll={scroll}
                    rowSelection={rowSelection}
                    expandable={expandable}
                    {...restProps}
                    components={{
                        body: {
                            row: (props) => <tr {...props} className="custom-row" />,
                            cell: (props) => <td {...props} className="custom-cell" />,
                        },
                        header: {
                            cell: (props) => <th {...props} className="custom-header-cell" />,
                        },
                    }}
                />
                <StyledPagination
                    current={pagination.current}
                    total={pagination.total}
                    pageSize={pagination.pageSize}
                    onChange={(page, pageSize) => getData(page, pageSize, sorter?.field, sorter?.order)}
                    onShowSizeChange={(current, size) => getData(current, size, sorter?.field, sorter?.order)}
                    showSizeChanger
                    pageSizeOptions={pagination.pageSizeOptions}
                />
            </>
        );
    }
);

export default PaginatedTable;