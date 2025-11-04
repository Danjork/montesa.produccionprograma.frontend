export function mapOrdenRows(rows) {
  return (rows || []).map((x, i) => ({
    Maquina:     x.maquina ?? x.Maquina ?? '',
    Notaventa:   x.notaventa ?? x.Notaventa ?? '',
    Linea:       toNum(x.linea ?? x.Linea),
    OP:          x.op ?? x.OP ?? x.ord_no ?? '',
    Vencimiento: x.vencimiento ?? x.Vencimiento ?? null,  // DD/MM/YYYY
    Cliente:     x.cliente ?? x.Cliente ?? '',
    Codigo:      x.codigo ?? x.Codigo ?? '',
    Descripcion: x.descripcion ?? x.Descripcion ?? '',
    Solicitado:  toNum(x.solicitado ?? x.Solicitado),
    Programado:  toNum(x.programado ?? x.Programado),
    Metros:      toNum(x.metros ?? x.Metros),
    Reportado:   toNum(x.reportado ?? x.Reportado),
    Faltante:    toNum(x.faltante ?? x.Faltante),
    Prioridad:   toNum(x.prioridad ?? x.Prioridad ?? 0),
    Status:      x.status ?? x.Status ?? 'N',
    id:          x.id ?? `${x.op || x.OP || 'row'}-${i}`,
  }));
}
function toNum(v){ const n=Number(v); return isFinite(n)?n:0; }
