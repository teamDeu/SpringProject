import React from 'react';
import styled from 'styled-components';
const StyledTable = styled.table.attrs((props) => ({
  style: {
    // props로 받아온 값을 스타일로만 적용
    '--id-column-width': props.idColumnWidth,
    '--title-column-width': props.titleColumnWidth,
    '--deadline-column-width': props.deadlineColumnWidth,
    '--manage-column-width': props.manageColumnWidth,
  },
}))`
  width: 1500px;
  border-collapse: collapse;
  table-layout: fixed;
  text-align: center;
  font-family: 'Nanum Square Neo', sans-serif;
  font-size: 16px;
  margin-top: 10px;
  margin-left: 20px;

  th, td {
    border: 1px solid #959595;
    padding: ${(props) => props.cellPadding || '20px'};
    word-wrap: break-word;
    vertical-align: middle;
    line-height: 20px;
  }

  th {
    background-color: #d1d1d1;
    font-weight: bold;
  }
  td {
    font-size:15px;
  }

  /* 스타일 변수 적용 */
  th:nth-child(1), td:nth-child(1) {
    width: var(--id-column-width, auto);
  }
  th:nth-child(3), td:nth-child(3) {
    width: var(--title-column-width, auto);
  }
  th:nth-child(5), td:nth-child(5) {
    width: var(--deadline-column-width, auto);
  }
  th:nth-child(6), td:nth-child(6) {
    width: var(--deadline-column-width, auto);
  }
  th:nth-child(7), td:nth-child(7) {
    width: var(--manage-column-width, auto);
  }
`;


const Table = ({ columns, data, renderRowActions, className, cellPadding, ...props }) => {
    return (
      <StyledTable className={className} cellPadding={cellPadding} {...props}>
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={idx} style={column.headerStyle}>{column.header}</th>
            ))}
            {renderRowActions && <th>관리</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((column, colIdx) => (
                <td key={colIdx}>
                  {column.Cell ? column.Cell(row) : row[column.accessor]}
                </td>
              ))}
              {renderRowActions && (
                <td>{renderRowActions(row, idx)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    );
};

export default Table;