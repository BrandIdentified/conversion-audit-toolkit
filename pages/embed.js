export async function getServerSideProps() {
  return {
    props: {},
    headers: {
      'X-Frame-Options': 'ALLOWALL',
    },
  };
}

export default function EmbedPage() {
  return (
    <div style={{ background: '#0f1722', color: 'white', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Embed Route Working</h1>
      <p>This confirms your custom embed page is live.</p>
    </div>
  );
}
