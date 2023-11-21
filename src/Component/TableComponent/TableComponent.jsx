
import { Button, Divider,  Table } from 'antd';
import React, { useMemo, useState } from 'react'
import Loading from '../LoadingComponent/Loading';
import { Excel } from "antd-table-saveas-excel";



const TableComponent = (props) => {
    const {selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns =[], handleDeleteMany} = props 
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    
    const newColumnExport = useMemo(()=>{
        const arr = columns?.filter((col)=> col.dataIndex !== 'action')
        return arr
    }, [columns])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) =>({
        //     disabled: record.name === 'Disabled User',
        //     name: record.name,
        // }),
    };
    const handleDeleteAll = () =>{
        handleDeleteMany(rowSelectedKeys)
    }

    const handleExportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet("test")
          .addColumns(newColumnExport)
          .addDataSource(dataSource, {
            str2Percent: true
          })
          .saveAs("Excel.xlsx");
      };
  return (
    <div>
        <Divider />
        <Loading isLoading={isLoading}>
            {rowSelectedKeys.length > 0 &&(
                 <div style={{
                    background: '#ccc',
                    color: 'black',
                    fontWeight: 'bold',
                    padding: '18px',
                    cursor: 'pointer'
                }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>
            )}
            <Button style={{margin: '10px', background: '#ccc'}} onClick={handleExportExcel}>Export</Button>
           
        <Table 
            rowSelection={{
                type: selectionType,
                ...rowSelection,
            }}
            columns={columns}
            dataSource={dataSource}
            {...props}
        ></Table>
        </Loading>
    </div>
  )
}

export default TableComponent