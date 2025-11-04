export function parseDMY(s){
  if(!s) return null;
  const m=String(s).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if(!m) return null;
  const[,d,mo,y]=m; const dt=new Date(+y,+mo-1,+d);
  return isNaN(dt.getTime())?null:dt;
}

export function isOverdue(venc){
  const dv=parseDMY(venc); if(!dv) return false;
  const t=new Date(); const a=new Date(t.getFullYear(),t.getMonth(),t.getDate());
  const b=new Date(dv.getFullYear(),dv.getMonth(),dv.getDate());
  return b.getTime()<a.getTime();
}
