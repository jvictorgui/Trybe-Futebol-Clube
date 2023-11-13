export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'UNAUTHORIZED': return 401;
    case 'NOT_FOUND': return 404;
    case 'CREATED': return 201;
    case 'INVALID_DATA': return 400;
    default: return 500;
  }
}
