// Função para gerar cor consistente baseada no nome da empresa
export function getCompanyColor(companyName: string): string {
  const colors = [
    '#4F46E5', // Indigo
    '#7C3AED', // Purple
    '#DC2626', // Red
    '#EA580C', // Orange
    '#CA8A04', // Yellow
    '#16A34A', // Green
    '#0891B2', // Cyan
    '#0284C7', // Blue
    '#DB2777', // Pink
    '#C026D3', // Fuchsia
    '#65A30D', // Lime
    '#0D9488', // Teal
  ];
  
  // Gerar um hash simples do nome da empresa
  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Usar o hash para selecionar uma cor
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
