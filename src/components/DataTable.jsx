export default function DataTable({ data }) {
  const getStatusBadge = (status) => {
    const styles = {
      'Solicitado': { bg: 'success', text: 'Solicitado' },
      'Medido': { bg: 'warning', text: 'Medido' },
      'Altal': { bg: 'danger', text: 'Altal' },
      'High': { bg: 'warning', text: 'High' },
      'Medium': { bg: 'info', text: 'Medium' },
      'Extrusora 9': { bg: 'secondary', text: 'Extrusora 9' },
      'Selladora FMC': { bg: 'secondary', text: 'Selladora FMC' },
      'Mezcladora': { bg: 'secondary', text: 'Mezcladora' }
    };

    const style = styles[status] || { bg: 'secondary', text: status };
    return <span className={`badge bg-${style.bg}`}>{style.text}</span>;
  };

  return (
    <div className="container-fluid p-3 p-md-4">
      <table className="table table-striped table-hover table-sm">
        <thead className="table-light">
          <tr>
            <th>Notaventa</th>
            <th>Línea</th>
            <th>OP</th>
            <th>Vencimiento</th>
            <th>Cliente</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Solicitado</th>
            <th>Programado</th>
            <th>Metros</th>
            <th>Maquina</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.notaventa}</td>
              <td>{item.linea}</td>
              <td>{item.op}</td>
              <td>{item.vencimiento}</td>
              <td>{item.cliente}</td>
              <td>{item.codigo}</td>
              <td>{item.descripcion}</td>
              <td>{item.solicitado}</td>
              <td>{item.programado}</td>
              <td>{item.metros}</td>
              <td>{getStatusBadge(item.maquina)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
