import Pagination from './components/Pagination';

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
  const page = parseInt(searchParams.page || '1');

  return <Pagination itemCount={100} pageSize={10} currentPage={page} />;
}
